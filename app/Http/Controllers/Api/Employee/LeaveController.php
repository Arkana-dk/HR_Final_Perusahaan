<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\ApprovalStep;
use App\Models\Employee;
use App\Models\LeaveBalance;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Services\AuditLogService;
use App\Services\EmployeeStatusService;
use App\Services\FileStorageService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class LeaveController extends Controller
{
    use ApiResponse;
    use ResolvesEmployee;

    public function __construct(
        private readonly EmployeeStatusService $employeeStatusService,
        private readonly FileStorageService $fileStorageService,
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function types(Request $request)
    {
        $employee = $this->resolveEmployee($request);

        $leaveTypes = LeaveType::query()
            ->where('company_id', $employee->company_id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'code', 'name', 'category', 'default_allocation', 'requires_attachment'])
            ->map(fn ($type) => [
                'id' => $type->id,
                'code' => $type->code,
                'name' => $type->name,
                'category' => $type->category,
                'default_allocation' => $type->default_allocation,
                'requires_attachment' => $type->requires_attachment,
            ])
            ->values()
            ->all();

        return $this->successResponse(
            $leaveTypes,
            'Daftar jenis cuti berhasil diambil.',
        );
    }

    public function index(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $filters = $request->validate([
            'status' => ['nullable', 'string', 'max:30'],
            'leave_type_id' => ['nullable', 'integer'],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = LeaveRequest::with([
            'leaveType:id,name',
            'approvedBy:id,name',
            'approval.steps.approver:id,name',
        ])
            ->where('employee_id', $employee->id)
            ->orderByDesc('requested_at')
            ->orderByDesc('id');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['leave_type_id'])) {
            $query->where('leave_type_id', $filters['leave_type_id']);
        }

        if (!empty($filters['from'])) {
            $query->whereDate('start_date', '>=', $filters['from']);
        }

        if (!empty($filters['to'])) {
            $query->whereDate('end_date', '<=', $filters['to']);
        }

        $perPage = (int) ($filters['per_page'] ?? 10);
        $requests = $query->paginate($perPage)->withQueryString();

        return $this->successResponse(
            $requests->getCollection()
                ->map(fn (LeaveRequest $leaveRequest) => $this->mapLeaveRequest($leaveRequest))
                ->values()
                ->all(),
            'Riwayat pengajuan cuti berhasil diambil.',
            200,
            [
                'current_page' => $requests->currentPage(),
                'last_page' => $requests->lastPage(),
                'per_page' => $requests->perPage(),
                'total' => $requests->total(),
            ],
        );
    }

    public function show(Request $request, LeaveRequest $leaveRequest)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $leaveRequest);

        $leaveRequest->load([
            'leaveType:id,name',
            'approvedBy:id,name',
            'approval.steps.approver:id,name',
        ]);

        return $this->successResponse(
            $this->mapLeaveRequest($leaveRequest),
            'Detail pengajuan cuti berhasil diambil.',
        );
    }

    public function store(Request $request)
    {
        $employee = $this->resolveEmployee($request, true);
        $this->employeeStatusService->assertOperationallyActive(
            $employee,
            'Karyawan resign/terminated/inactive tidak dapat mengajukan cuti baru.',
        );

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
            throw ValidationException::withMessages([
                'leave_type_id' => 'Jenis cuti tidak valid atau sudah nonaktif untuk perusahaan Anda.',
            ]);
        }

        if ($leaveType->requires_attachment && !$request->hasFile('attachment')) {
            throw ValidationException::withMessages([
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
            throw ValidationException::withMessages([
                'start_date' => 'Anda masih memiliki pengajuan cuti aktif di rentang tanggal tersebut.',
            ]);
        }

        $year = (int) $start->format('Y');
        $balance = LeaveBalance::query()
            ->where('employee_id', $employee->id)
            ->where('leave_type_id', $leaveType->id)
            ->where('year', $year)
            ->first();

        $remaining = $balance
            ? (int) $balance->remaining
            : (int) $leaveType->default_allocation;

        if ($remaining > 0 && $remaining < $totalDays) {
            throw ValidationException::withMessages([
                'leave_type_id' => 'Saldo cuti tidak mencukupi untuk tanggal yang dipilih.',
            ]);
        }

        $path = null;
        if ($request->hasFile('attachment')) {
            $path = $this->fileStorageService->storePrivate(
                $request->file('attachment'),
                'leave-requests/'.$employee->id,
            );
        }

        $user = $request->user();
        $leaveRequest = null;

        DB::transaction(function () use (
            &$leaveRequest,
            $employee,
            $data,
            $totalDays,
            $path,
            $user
        ) {
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
                'requested_by_user_id' => $user->id,
                'requested_at' => now(),
            ]);

            foreach ($this->approvalStepsConfig($this->resolveRole($user)) as $step => $roles) {
                ApprovalStep::create([
                    'approval_id' => $approval->id,
                    'step' => $step,
                    'status' => 'pending',
                ]);
            }
        });

        $leaveRequest->load([
            'leaveType:id,name',
            'approvedBy:id,name',
            'approval.steps.approver:id,name',
        ]);

        $employee->loadMissing('manager');
        $reference = $this->notificationService->buildReference($leaveRequest);

        $this->notificationService->notifyApprovalAudience($employee, [
            ...$reference,
            'type' => 'leave.request.created',
            'title' => 'Pengajuan Cuti Baru',
            'message' => sprintf(
                '%s mengajukan cuti %s sampai %s.',
                $request->user()->name,
                Carbon::parse($leaveRequest->start_date)->format('Y-m-d'),
                Carbon::parse($leaveRequest->end_date)->format('Y-m-d'),
            ),
            'meta' => [
                'employee_id' => $employee->id,
                'leave_request_id' => $leaveRequest->id,
                'status' => $leaveRequest->status,
            ],
        ]);

        $this->auditLogService->fromRequest($request, 'leave_requests', 'leave.create', [
            'subject' => 'leave_request',
            'reference_type' => $leaveRequest::class,
            'reference_id' => $leaveRequest->id,
            'notes' => 'Pengajuan cuti dibuat dari mobile.',
            'after_data' => $leaveRequest->toArray(),
        ]);

        return $this->successResponse(
            $this->mapLeaveRequest($leaveRequest),
            'Pengajuan cuti berhasil dikirim.',
            201,
        );
    }

    public function cancel(Request $request, LeaveRequest $leaveRequest)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $leaveRequest);

        if ($leaveRequest->status !== 'pending') {
            throw ValidationException::withMessages([
                'status' => 'Hanya pengajuan pending yang dapat dibatalkan.',
            ]);
        }

        $before = $leaveRequest->toArray();

        DB::transaction(function () use ($leaveRequest) {
            $leaveRequest->update([
                'status' => 'cancelled',
            ]);

            $leaveRequest->approval()?->update([
                'status' => 'cancelled',
                'final_decided_at' => now(),
            ]);
        });

        $leaveRequest->refresh();
        $leaveRequest->load([
            'leaveType:id,name',
            'approvedBy:id,name',
            'approval.steps.approver:id,name',
        ]);

        $reference = $this->notificationService->buildReference($leaveRequest);
        $this->notificationService->notifyUsers([(int) $request->user()->id], [
            ...$reference,
            'type' => 'leave.request.cancelled',
            'title' => 'Pengajuan Cuti Dibatalkan',
            'message' => sprintf(
                'Pengajuan cuti %s sampai %s berhasil dibatalkan.',
                Carbon::parse($leaveRequest->start_date)->format('Y-m-d'),
                Carbon::parse($leaveRequest->end_date)->format('Y-m-d'),
            ),
        ]);

        $this->auditLogService->fromRequest($request, 'leave_requests', 'leave.cancel', [
            'subject' => 'leave_request',
            'reference_type' => $leaveRequest::class,
            'reference_id' => $leaveRequest->id,
            'notes' => 'Pengajuan cuti dibatalkan dari mobile.',
            'before_data' => $before,
            'after_data' => $leaveRequest->toArray(),
        ]);

        return $this->successResponse(
            $this->mapLeaveRequest($leaveRequest),
            'Pengajuan cuti dibatalkan.',
        );
    }

    private function assertOwnedByEmployee(Employee $employee, LeaveRequest $leaveRequest): void
    {
        if ((int) $leaveRequest->employee_id !== (int) $employee->id) {
            abort(404);
        }
    }

    private function mapLeaveRequest(LeaveRequest $leaveRequest): array
    {
        return [
            'id' => $leaveRequest->id,
            'leave_type' => $leaveRequest->leaveType?->name,
            'start_date' => optional($leaveRequest->start_date)->toDateString(),
            'end_date' => optional($leaveRequest->end_date)->toDateString(),
            'total_days' => (float) $leaveRequest->total_days,
            'status' => $leaveRequest->status,
            'reason' => $leaveRequest->reason,
            'requested_at' => optional($leaveRequest->requested_at)?->toDateTimeString(),
            'approved_at' => optional($leaveRequest->approved_at)?->toDateTimeString(),
            'approved_by' => $leaveRequest->approvedBy?->name,
            'approval_notes' => $leaveRequest->approval_notes,
            'has_attachment' => (bool) $leaveRequest->attachment_path,
            'attachment_url' => $leaveRequest->attachment_path
                ? url('/api/v1/secure-files/leave-attachments/'.$leaveRequest->id)
                : null,
            'approval' => $leaveRequest->approval
                ? [
                    'status' => $leaveRequest->approval->status,
                    'current_step' => $leaveRequest->approval->current_step,
                    'steps' => $leaveRequest->approval->steps
                        ->sortBy('step')
                        ->map(fn ($step) => [
                            'step' => $step->step,
                            'status' => $step->status,
                            'approver' => $step->approver?->name,
                            'decided_at' => optional($step->decided_at)?->toDateTimeString(),
                            'notes' => $step->notes,
                        ])
                        ->values()
                        ->all(),
                ]
                : null,
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
            'manager' => [
                1 => ['admin', 'superadmin'],
            ],
            default => [
                1 => ['manager', 'admin', 'superadmin'],
                2 => ['admin', 'superadmin'],
            ],
        };
    }

    private function resolveRole($user): string
    {
        if (!$user) {
            return 'employee';
        }

        if ($user->hasRole('superadmin')) {
            return 'superadmin';
        }

        if ($user->hasRole('admin')) {
            return 'admin';
        }

        if ($user->hasRole('manager')) {
            return 'manager';
        }

        return 'employee';
    }
}
