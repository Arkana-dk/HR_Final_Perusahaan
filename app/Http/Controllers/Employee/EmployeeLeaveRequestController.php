<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\ApprovalStep;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EmployeeLeaveRequestController extends Controller
{
    public function index(Request $request)
    {
        $employee = Employee::with('company:id,name')
            ->where('user_id', $request->user()->id)
            ->first();

        $requests = $employee
            ? LeaveRequest::with(['leaveType:id,name'])
                ->where('employee_id', $employee->id)
                ->orderByDesc('requested_at')
                ->paginate(10)
                ->withQueryString()
            : null;

        $leaveTypes = [];
        if ($employee?->company_id) {
            $leaveTypes = LeaveType::query()
                ->where('company_id', $employee->company_id)
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'requires_attachment', 'default_allocation'])
                ->map(fn ($type) => [
                    'id' => $type->id,
                    'name' => $type->name,
                    'requires_attachment' => $type->requires_attachment,
                    'default_allocation' => $type->default_allocation,
                ])
                ->all();
        }

        return Inertia::render('employee/leave-requests/index', [
            'employee' => [
                'name' => $request->user()->name,
                'employee_code' => $employee?->employee_code ?? '-',
                'company' => $employee?->company?->name,
            ],
            'employeeProfileMissing' => $employee === null,
            'requests' => $requests
                ? $this->paginationPayload($requests)
                : $this->emptyPagination(),
            'leaveTypes' => $leaveTypes,
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

        $data = $request->validate([
            'leave_type_id' => ['required', 'exists:leave_types,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'reason' => ['nullable', 'string', 'max:1000'],
            'attachment' => ['nullable', 'file', 'max:4096'],
        ]);

        $leaveType = LeaveType::query()
            ->whereKey($data['leave_type_id'])
            ->where('company_id', $employee->company_id)
            ->where('is_active', true)
            ->first();
        if (!$leaveType) {
            return back()->withErrors([
                'leave_type_id' => 'Jenis cuti tidak valid atau sudah nonaktif untuk perusahaan Anda.',
            ]);
        }

        if ($leaveType->requires_attachment && !$request->hasFile('attachment')) {
            return back()->withErrors([
                'attachment' => 'Lampiran wajib untuk jenis cuti ini.',
            ]);
        }

        $start = Carbon::parse($data['start_date']);
        $end = Carbon::parse($data['end_date']);
        $totalDays = $start->diffInDays($end) + 1;

        $hasOverlappingRequest = LeaveRequest::query()
            ->where('employee_id', $employee->id)
            ->whereIn('status', ['pending', 'approved'])
            ->whereDate('start_date', '<=', $end->toDateString())
            ->whereDate('end_date', '>=', $start->toDateString())
            ->exists();
        if ($hasOverlappingRequest) {
            return back()->withErrors([
                'start_date' => 'Anda masih memiliki pengajuan cuti aktif di rentang tanggal tersebut.',
            ]);
        }

        $path = null;
        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('leave-requests', 'public');
        }

        DB::transaction(function () use ($employee, $data, $totalDays, $path, $request) {
            $leaveRequest = LeaveRequest::create([
                'employee_id' => $employee->id,
                'leave_type_id' => $data['leave_type_id'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'total_days' => $totalDays,
                'reason' => $data['reason'] ?? null,
                'status' => 'pending',
                'requested_at' => now(),
                'attachment_path' => $path,
            ]);

            $approval = $leaveRequest->approval()->create([
                'status' => 'pending',
                'current_step' => 1,
                'requested_by_user_id' => $request->user()->id,
                'requested_at' => now(),
            ]);

            $requesterRole = $request->user()->role ?? 'employee';

            foreach ($this->approvalStepsConfig($requesterRole) as $step => $roles) {
                ApprovalStep::create([
                    'approval_id' => $approval->id,
                    'step' => $step,
                    'status' => 'pending',
                ]);
            }
        });

        return back()->with('success', 'Pengajuan cuti berhasil dikirim.');
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

    private function approvalStepsConfig(string $requesterRole): array
    {
        return match ($requesterRole) {
            'admin' => [
                1 => ['superadmin'],
            ],
            'superadmin' => [
                1 => ['superadmin'],
            ],
            default => [
                1 => ['admin', 'superadmin'],
                2 => ['superadmin'],
            ],
        };
    }
}
