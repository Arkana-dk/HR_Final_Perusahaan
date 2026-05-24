<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use App\Models\WorkSchedule;
use App\Services\AuditLogService;
use App\Services\EmployeeStatusService;
use App\Services\NotificationService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EmployeeOvertimeController extends Controller
{
    public function __construct(
        private readonly EmployeeStatusService $employeeStatusService,
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $employee = Employee::with('company:id,name')
            ->where('user_id', $request->user()->id)
            ->first();

        $requests = $employee
            ? OvertimeRequest::where('employee_id', $employee->id)
                ->orderByDesc('work_date')
                ->paginate(10)
                ->withQueryString()
            : null;

        return Inertia::render('employee/overtime/index', [
            'employee' => [
                'name' => $request->user()->name,
                'employee_code' => $employee?->employee_code ?? '-',
                'company' => $employee?->company?->name,
            ],
            'employeeProfileMissing' => $employee === null,
            'requests' => $requests
                ? $this->paginationPayload($requests)
                : $this->emptyPagination(),
        ]);
    }

    public function store(Request $request)
    {
        $employee = Employee::where('user_id', $request->user()->id)->first();
        if (!$employee) {
            return back()->withErrors([
                'employee' => 'Profil karyawan belum terhubung. Hubungi admin HR untuk melengkapi data karyawan Anda.',
            ]);
        }
        $this->employeeStatusService->assertOperationallyActive(
            $employee,
            'Karyawan resign/terminated/inactive tidak dapat mengajukan lembur baru.',
        );

        $data = $request->validate([
            'work_date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i'],
            'reason' => ['nullable', 'string', 'max:1000'],
        ]);

        $start = Carbon::parse($data['work_date'].' '.$data['start_time']);
        $end = Carbon::parse($data['work_date'].' '.$data['end_time']);

        if ($end->lessThanOrEqualTo($start)) {
            $end->addDay();
        }

        $totalHours = round($start->diffInMinutes($end) / 60, 2);
        $totalMinutes = $start->diffInMinutes($end);
        $minMinutes = max(1, (int) config('hr.overtime.min_minutes', 30));
        $maxMinutes = max($minMinutes, (int) config('hr.overtime.max_minutes', 360));

        if ($totalMinutes < $minMinutes) {
            return back()->withErrors([
                'end_time' => sprintf('Durasi lembur minimal %d menit.', $minMinutes),
            ]);
        }

        if ($totalMinutes > $maxMinutes) {
            return back()->withErrors([
                'end_time' => sprintf('Durasi lembur maksimal %d menit.', $maxMinutes),
            ]);
        }

        $schedule = WorkSchedule::query()
            ->with('shift:id,start_time,end_time,is_overnight')
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $data['work_date'])
            ->first();

        if (!$schedule || $schedule->status !== 'scheduled') {
            return back()->withErrors([
                'work_date' => 'Pengajuan lembur hanya dapat dibuat pada hari kerja terjadwal.',
            ]);
        }

        $hasApprovedLeave = LeaveRequest::query()
            ->where('employee_id', $employee->id)
            ->where('status', 'approved')
            ->whereDate('start_date', '<=', $data['work_date'])
            ->whereDate('end_date', '>=', $data['work_date'])
            ->exists();

        if ($hasApprovedLeave) {
            return back()->withErrors([
                'work_date' => 'Tanggal lembur bentrok dengan cuti yang telah disetujui.',
            ]);
        }

        if ($schedule->shift) {
            $shiftStart = Carbon::parse($data['work_date'].' '.$schedule->shift->start_time);
            $shiftEnd = Carbon::parse($data['work_date'].' '.$schedule->shift->end_time);
            if ($schedule->shift->is_overnight && $shiftEnd->lessThanOrEqualTo($shiftStart)) {
                $shiftEnd->addDay();
            }

            if ($start->lt($shiftEnd)) {
                return back()->withErrors([
                    'start_time' => 'Jam mulai lembur harus setelah jam selesai shift kerja.',
                ]);
            }
        }

        $overtimeRequest = null;
        DB::transaction(function () use (&$overtimeRequest, $employee, $data, $totalHours) {
            $overtimeRequest = OvertimeRequest::create([
                'employee_id' => $employee->id,
                'work_date' => $data['work_date'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
                'total_hours' => $totalHours,
                'reason' => $data['reason'] ?? null,
                'status' => 'pending',
                'requested_at' => now(),
            ]);
        });

        if ($overtimeRequest) {
            $employee->loadMissing('manager');
            $reference = $this->notificationService->buildReference($overtimeRequest);

            $this->notificationService->notifyApprovalAudience($employee, [
                ...$reference,
                'type' => 'overtime.request.created',
                'title' => 'Pengajuan Lembur Baru',
                'message' => sprintf(
                    '%s mengajukan lembur pada %s (%s - %s).',
                    $request->user()->name,
                    Carbon::parse($overtimeRequest->work_date)->format('Y-m-d'),
                    $overtimeRequest->start_time,
                    $overtimeRequest->end_time,
                ),
            ]);

            $this->auditLogService->fromRequest($request, 'overtime_requests', 'overtime.create.web', [
                'subject' => 'overtime_request',
                'reference_type' => $overtimeRequest::class,
                'reference_id' => $overtimeRequest->id,
                'notes' => 'Pengajuan lembur dibuat dari web self-service.',
                'after_data' => $overtimeRequest->toArray(),
            ]);
        }

        return back()->with('success', 'Pengajuan lembur berhasil dikirim.');
    }

    private function paginationPayload(LengthAwarePaginator $paginator): array
    {
        return [
            'data' => $paginator->items(),
            'links' => $paginator->linkCollection()
                ->map(fn ($link) => [
                    'url' => $link['url'],
                    'label' => $link['label'],
                    'active' => $link['active'],
                ])
                ->values()
                ->all(),
            'meta' => [
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
            ],
        ];
    }

    private function emptyPagination(): array
    {
        return [
            'data' => [],
            'links' => [],
            'meta' => [
                'from' => null,
                'to' => null,
                'total' => 0,
            ],
        ];
    }
}
