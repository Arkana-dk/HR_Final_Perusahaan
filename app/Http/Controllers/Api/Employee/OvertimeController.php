<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\OvertimeRequest;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OvertimeController extends Controller
{
    use ApiResponse;
    use ResolvesEmployee;

    public function __construct(
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $filters = $request->validate([
            'status' => ['nullable', 'string', 'max:30'],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = OvertimeRequest::with('approvedBy:id,name')
            ->where('employee_id', $employee->id)
            ->orderByDesc('work_date')
            ->orderByDesc('id');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['from'])) {
            $query->whereDate('work_date', '>=', $filters['from']);
        }

        if (!empty($filters['to'])) {
            $query->whereDate('work_date', '<=', $filters['to']);
        }

        $perPage = (int) ($filters['per_page'] ?? 10);
        $requests = $query->paginate($perPage)->withQueryString();

        return $this->successResponse(
            $requests->getCollection()
                ->map(fn (OvertimeRequest $item) => $this->mapRequest($item))
                ->values()
                ->all(),
            'Riwayat lembur berhasil diambil.',
            200,
            [
                'current_page' => $requests->currentPage(),
                'last_page' => $requests->lastPage(),
                'per_page' => $requests->perPage(),
                'total' => $requests->total(),
            ],
        );
    }

    public function show(Request $request, OvertimeRequest $overtimeRequest)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $overtimeRequest);
        $overtimeRequest->load('approvedBy:id,name');

        return $this->successResponse(
            $this->mapRequest($overtimeRequest),
            'Detail lembur berhasil diambil.',
        );
    }

    public function store(Request $request)
    {
        $employee = $this->resolveEmployee($request);
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

        $overtime = null;
        DB::transaction(function () use (&$overtime, $employee, $data, $totalHours) {
            $overtime = OvertimeRequest::create([
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

        $employee->loadMissing('manager');
        $reference = $this->notificationService->buildReference($overtime);
        $this->notificationService->notifyApprovalAudience($employee, [
            ...$reference,
            'type' => 'overtime.request.created',
            'title' => 'Pengajuan Lembur Baru',
            'message' => sprintf(
                '%s mengajukan lembur pada %s (%s - %s).',
                $request->user()->name,
                Carbon::parse($overtime->work_date)->format('Y-m-d'),
                $overtime->start_time,
                $overtime->end_time,
            ),
            'meta' => [
                'employee_id' => $employee->id,
                'overtime_request_id' => $overtime->id,
            ],
        ]);

        $this->auditLogService->fromRequest($request, 'overtime_requests', 'overtime.create', [
            'subject' => 'overtime_request',
            'reference_type' => $overtime::class,
            'reference_id' => $overtime->id,
            'notes' => 'Pengajuan lembur dibuat dari mobile.',
            'after_data' => $overtime->toArray(),
        ]);

        return $this->successResponse(
            $this->mapRequest($overtime),
            'Pengajuan lembur berhasil dikirim.',
            201,
        );
    }

    public function cancel(Request $request, OvertimeRequest $overtimeRequest)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $overtimeRequest);

        if ($overtimeRequest->status !== 'pending') {
            throw ValidationException::withMessages([
                'status' => 'Hanya pengajuan pending yang dapat dibatalkan.',
            ]);
        }

        $before = $overtimeRequest->toArray();
        $overtimeRequest->update([
            'status' => 'cancelled',
        ]);

        $reference = $this->notificationService->buildReference($overtimeRequest);
        $this->notificationService->notifyUsers([(int) $request->user()->id], [
            ...$reference,
            'type' => 'overtime.request.cancelled',
            'title' => 'Pengajuan Lembur Dibatalkan',
            'message' => 'Pengajuan lembur Anda berhasil dibatalkan.',
        ]);

        $this->auditLogService->fromRequest($request, 'overtime_requests', 'overtime.cancel', [
            'subject' => 'overtime_request',
            'reference_type' => $overtimeRequest::class,
            'reference_id' => $overtimeRequest->id,
            'notes' => 'Pengajuan lembur dibatalkan dari mobile.',
            'before_data' => $before,
            'after_data' => $overtimeRequest->toArray(),
        ]);

        return $this->successResponse(
            $this->mapRequest($overtimeRequest),
            'Pengajuan lembur dibatalkan.',
        );
    }

    private function assertOwnedByEmployee(Employee $employee, OvertimeRequest $request): void
    {
        if ((int) $request->employee_id !== (int) $employee->id) {
            abort(404);
        }
    }

    private function mapRequest(OvertimeRequest $request): array
    {
        return [
            'id' => $request->id,
            'work_date' => optional($request->work_date)->toDateString(),
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'total_hours' => (float) $request->total_hours,
            'status' => $request->status,
            'reason' => $request->reason,
            'approval_notes' => $request->approval_notes,
            'requested_at' => optional($request->requested_at)?->toDateTimeString(),
            'approved_at' => optional($request->approved_at)?->toDateTimeString(),
            'approved_by' => $request->approvedBy?->name,
        ];
    }
}
