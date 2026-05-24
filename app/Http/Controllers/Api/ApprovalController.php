<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Approval;
use App\Models\ApprovalStep;
use App\Models\AttendanceCorrection;
use App\Models\AttendanceLog;
use App\Models\Employee;
use App\Models\LeaveBalance;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use App\Models\ReimburseRequest;
use App\Models\WorkSchedule;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ApprovalController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly ScopeAuthorizationService $scopeAuthorizationService,
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function pending(Request $request)
    {
        $filters = $request->validate([
            'type' => ['nullable', 'string', 'max:50'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $perPage = (int) ($filters['per_page'] ?? 20);
        $type = trim((string) ($filters['type'] ?? ''));

        $items = collect();

        if ($type === '' || $type === 'leave') {
            $items = $items->merge($this->pendingLeaves($request->user()));
        }

        if ($type === '' || $type === 'overtime') {
            $items = $items->merge($this->pendingOvertimes($request->user()));
        }

        if ($type === '' || $type === 'reimburse') {
            $items = $items->merge($this->pendingReimburses($request->user()));
        }

        if ($type === '' || $type === 'attendance') {
            $items = $items->merge($this->pendingAttendances($request->user()));
        }

        if ($type === '' || $type === 'attendance_correction') {
            $items = $items->merge($this->pendingCorrections($request->user()));
        }

        $sorted = $items
            ->sortByDesc('requested_at')
            ->values();

        $currentPage = max(1, (int) $request->integer('page', 1));
        $total = $sorted->count();
        $offset = ($currentPage - 1) * $perPage;
        $pageRows = $sorted->slice($offset, $perPage)->values()->all();

        return $this->successResponse(
            $pageRows,
            'Daftar approval pending berhasil diambil.',
            200,
            [
                'current_page' => $currentPage,
                'last_page' => max(1, (int) ceil($total / $perPage)),
                'per_page' => $perPage,
                'total' => $total,
            ],
        );
    }

    public function approve(Request $request, string $type, int $id)
    {
        return match ($type) {
            'leave' => $this->approveLeave($request, $id),
            'overtime' => $this->approveOvertime($request, $id),
            'reimburse' => $this->approveReimburse($request, $id),
            'attendance' => $this->approveAttendance($request, $id),
            'attendance_correction' => $this->approveAttendanceCorrection($request, $id),
            default => $this->errorResponse('Tipe approval tidak dikenali.', [
                'type' => ['Tipe approval tidak dikenali.'],
            ], 404),
        };
    }

    public function reject(Request $request, string $type, int $id)
    {
        $request->validate([
            'notes' => ['required', 'string', 'max:500'],
        ]);

        return match ($type) {
            'leave' => $this->rejectLeave($request, $id),
            'overtime' => $this->rejectOvertime($request, $id),
            'reimburse' => $this->rejectReimburse($request, $id),
            'attendance' => $this->rejectAttendance($request, $id),
            'attendance_correction' => $this->rejectAttendanceCorrection($request, $id),
            default => $this->errorResponse('Tipe approval tidak dikenali.', [
                'type' => ['Tipe approval tidak dikenali.'],
            ], 404),
        };
    }

    private function pendingLeaves($user)
    {
        $rows = LeaveRequest::query()
            ->with([
                'employee.user:id,name,email',
                'leaveType:id,name',
                'approval.steps.approver:id,name',
            ])
            ->where('status', 'pending')
            ->orderByDesc('requested_at')
            ->limit(200)
            ->get();

        return $rows
            ->filter(function (LeaveRequest $row) use ($user) {
                return $this->canApproveLeave($user, $row);
            })
            ->map(function (LeaveRequest $row) {
                return [
                    'type' => 'leave',
                    'id' => $row->id,
                    'request_no' => 'LEAVE-'.$row->id,
                    'employee' => $row->employee?->user?->name,
                    'employee_id' => $row->employee_id,
                    'requested_at' => optional($row->requested_at)?->toDateTimeString(),
                    'status' => $row->status,
                    'summary' => sprintf(
                        '%s - %s (%s hari)',
                        Carbon::parse($row->start_date)->format('Y-m-d'),
                        Carbon::parse($row->end_date)->format('Y-m-d'),
                        (float) $row->total_days,
                    ),
                    'detail' => [
                        'leave_type' => $row->leaveType?->name,
                        'reason' => $row->reason,
                        'current_step' => $row->approval?->current_step,
                    ],
                ];
            });
    }

    private function pendingOvertimes($user)
    {
        $rows = OvertimeRequest::query()
            ->with('employee.user:id,name,email')
            ->where('status', 'pending')
            ->orderByDesc('requested_at')
            ->limit(200)
            ->get();

        return $rows
            ->filter(fn (OvertimeRequest $row) => $this->canApproveByEmployee($user, $row->employee))
            ->map(function (OvertimeRequest $row) {
                return [
                    'type' => 'overtime',
                    'id' => $row->id,
                    'request_no' => 'OT-'.$row->id,
                    'employee' => $row->employee?->user?->name,
                    'employee_id' => $row->employee_id,
                    'requested_at' => optional($row->requested_at)?->toDateTimeString(),
                    'status' => $row->status,
                    'summary' => sprintf(
                        '%s %s-%s (%s jam)',
                        Carbon::parse($row->work_date)->format('Y-m-d'),
                        $row->start_time,
                        $row->end_time,
                        (float) $row->total_hours,
                    ),
                    'detail' => [
                        'reason' => $row->reason,
                    ],
                ];
            });
    }

    private function pendingReimburses($user)
    {
        $rows = ReimburseRequest::query()
            ->with('employee.user:id,name,email')
            ->where('status', 'pending')
            ->orderByDesc('requested_at')
            ->limit(200)
            ->get();

        return $rows
            ->filter(fn (ReimburseRequest $row) => $this->canApproveByEmployee($user, $row->employee))
            ->map(function (ReimburseRequest $row) {
                return [
                    'type' => 'reimburse',
                    'id' => $row->id,
                    'request_no' => 'RB-'.$row->id,
                    'employee' => $row->employee?->user?->name,
                    'employee_id' => $row->employee_id,
                    'requested_at' => optional($row->requested_at)?->toDateTimeString(),
                    'status' => $row->status,
                    'summary' => sprintf('%s %.2f', strtoupper((string) $row->currency), (float) $row->amount),
                    'detail' => [
                        'category' => $row->category,
                        'title' => $row->title,
                    ],
                ];
            });
    }

    private function pendingAttendances($user)
    {
        $rows = AttendanceLog::query()
            ->with('employee.user:id,name,email')
            ->where('approval_status', 'pending')
            ->where(function (Builder $query) {
                $query->where('is_early_leave', true)
                    ->orWhere('status', 'late');
            })
            ->orderByDesc('work_date')
            ->limit(200)
            ->get();

        return $rows
            ->filter(fn (AttendanceLog $row) => $this->canApproveByEmployee($user, $row->employee))
            ->map(function (AttendanceLog $row) {
                return [
                    'type' => 'attendance',
                    'id' => $row->id,
                    'request_no' => 'AT-'.$row->id,
                    'employee' => $row->employee?->user?->name,
                    'employee_id' => $row->employee_id,
                    'requested_at' => optional($row->updated_at)?->toDateTimeString(),
                    'status' => $row->approval_status,
                    'summary' => sprintf(
                        '%s check-in %s check-out %s',
                        Carbon::parse($row->work_date)->format('Y-m-d'),
                        optional($row->check_in_at)?->format('H:i') ?? '-',
                        optional($row->check_out_at)?->format('H:i') ?? '-',
                    ),
                    'detail' => [
                        'attendance_status' => $row->status,
                        'is_early_leave' => (bool) $row->is_early_leave,
                        'early_leave_reason' => $row->early_leave_reason,
                    ],
                ];
            });
    }

    private function pendingCorrections($user)
    {
        $rows = AttendanceCorrection::query()
            ->with([
                'employee.user:id,name,email',
                'approval.steps.approver:id,name',
            ])
            ->where('status', 'pending')
            ->orderByDesc('requested_at')
            ->limit(200)
            ->get();

        return $rows
            ->filter(fn (AttendanceCorrection $row) => $this->canApproveAttendanceCorrection($user, $row))
            ->map(function (AttendanceCorrection $row) {
                return [
                    'type' => 'attendance_correction',
                    'id' => $row->id,
                    'request_no' => $row->request_no,
                    'employee' => $row->employee?->user?->name,
                    'employee_id' => $row->employee_id,
                    'requested_at' => optional($row->requested_at)?->toDateTimeString(),
                    'status' => $row->status,
                    'summary' => sprintf(
                        '%s in:%s out:%s',
                        Carbon::parse($row->work_date)->format('Y-m-d'),
                        optional($row->requested_check_in_at)?->format('H:i') ?? '-',
                        optional($row->requested_check_out_at)?->format('H:i') ?? '-',
                    ),
                    'detail' => [
                        'reason' => $row->reason,
                        'current_step' => $row->approval?->current_step,
                    ],
                ];
            });
    }

    private function approveLeave(Request $request, int $id)
    {
        $leaveRequest = LeaveRequest::query()
            ->with(['employee.user:id,name'])
            ->findOrFail($id);

        $before = $leaveRequest->toArray();
        $finalized = false;
        $approverUserId = (int) $request->user()->id;

        DB::transaction(function () use (&$finalized, $leaveRequest, $request, $approverUserId) {
            $approval = $this->ensureApprovalFlow($leaveRequest, $this->leaveApprovalConfig($leaveRequest));
            if (in_array($approval->status, ['approved', 'rejected', 'cancelled'], true)) {
                return;
            }

            $this->assertCanApproveLeaveStep($request->user(), $leaveRequest, $approval);
            $this->assertNotSelfApproval($approverUserId, $approval);
            $this->assertUniqueApproverByStep($approval, (int) $approval->current_step, $approverUserId);

            $step = $approval->steps()->where('step', $approval->current_step)->first();
            if ($step && $step->status !== 'approved') {
                $step->update([
                    'status' => 'approved',
                    'approver_user_id' => $approverUserId,
                    'decided_at' => now(),
                ]);
            }

            $stepsCount = count($this->leaveApprovalConfig($leaveRequest));
            if ((int) $approval->current_step < $stepsCount) {
                $approval->update([
                    'status' => 'in_review',
                    'current_step' => (int) $approval->current_step + 1,
                ]);

                return;
            }

            $approval->update([
                'status' => 'approved',
                'final_decided_at' => now(),
            ]);

            $this->reserveLeaveBalance($leaveRequest);

            $leaveRequest->update([
                'status' => 'approved',
                'approved_by_user_id' => $approverUserId,
                'approved_at' => now(),
            ]);

            $finalized = true;
        });

        $leaveRequest->refresh();

        if ($finalized) {
            $reference = $this->notificationService->buildReference($leaveRequest);
            $requesterUserId = (int) ($leaveRequest->employee?->user_id ?? 0);

            if ($requesterUserId > 0) {
                $this->notificationService->notifyUsers([$requesterUserId], [
                    ...$reference,
                    'type' => 'leave.request.approved',
                    'title' => 'Pengajuan Cuti Disetujui',
                    'message' => sprintf(
                        'Pengajuan cuti %s sampai %s telah disetujui.',
                        Carbon::parse($leaveRequest->start_date)->format('Y-m-d'),
                        Carbon::parse($leaveRequest->end_date)->format('Y-m-d'),
                    ),
                ]);
            }

            $this->auditLogService->fromRequest($request, 'leave_requests', 'leave.approve.mobile', [
                'subject' => 'leave_request',
                'reference_type' => $leaveRequest::class,
                'reference_id' => $leaveRequest->id,
                'notes' => 'Pengajuan cuti disetujui dari mobile approval.',
                'before_data' => $before,
                'after_data' => $leaveRequest->toArray(),
            ]);
        }

        return $this->successResponse([
            'id' => $leaveRequest->id,
            'status' => $leaveRequest->status,
            'approved_at' => optional($leaveRequest->approved_at)?->toDateTimeString(),
            'approval_status' => $leaveRequest->approval?->status,
            'current_step' => $leaveRequest->approval?->current_step,
        ], 'Approval cuti berhasil diproses.');
    }

    private function rejectLeave(Request $request, int $id)
    {
        $leaveRequest = LeaveRequest::query()
            ->with('employee:id,user_id')
            ->findOrFail($id);

        $before = $leaveRequest->toArray();
        $approverUserId = (int) $request->user()->id;
        $notes = trim((string) $request->input('notes', ''));

        DB::transaction(function () use ($leaveRequest, $request, $approverUserId, $notes) {
            $approval = $this->ensureApprovalFlow($leaveRequest, $this->leaveApprovalConfig($leaveRequest));
            if (in_array($approval->status, ['approved', 'rejected', 'cancelled'], true)) {
                return;
            }

            $this->assertCanApproveLeaveStep($request->user(), $leaveRequest, $approval);
            $this->assertNotSelfApproval($approverUserId, $approval);
            $this->assertUniqueApproverByStep($approval, (int) $approval->current_step, $approverUserId);

            $step = $approval->steps()->where('step', $approval->current_step)->first();
            if ($step) {
                $step->update([
                    'status' => 'rejected',
                    'approver_user_id' => $approverUserId,
                    'decided_at' => now(),
                    'notes' => $notes !== '' ? $notes : $step->notes,
                ]);
            }

            $approval->update([
                'status' => 'rejected',
                'final_decided_at' => now(),
                'notes' => $notes !== '' ? $notes : $approval->notes,
            ]);

            $leaveRequest->update([
                'status' => 'rejected',
                'approved_by_user_id' => $approverUserId,
                'approved_at' => now(),
                'approval_notes' => $notes !== '' ? $notes : $leaveRequest->approval_notes,
            ]);
        });

        $leaveRequest->refresh();

        if ($leaveRequest->status === 'rejected') {
            $reference = $this->notificationService->buildReference($leaveRequest);
            $requesterUserId = (int) ($leaveRequest->employee?->user_id ?? 0);

            if ($requesterUserId > 0) {
                $this->notificationService->notifyUsers([$requesterUserId], [
                    ...$reference,
                    'type' => 'leave.request.rejected',
                    'title' => 'Pengajuan Cuti Ditolak',
                    'message' => 'Pengajuan cuti Anda ditolak.',
                    'meta' => [
                        'approval_notes' => $leaveRequest->approval_notes,
                    ],
                ]);
            }

            $this->auditLogService->fromRequest($request, 'leave_requests', 'leave.reject.mobile', [
                'subject' => 'leave_request',
                'reference_type' => $leaveRequest::class,
                'reference_id' => $leaveRequest->id,
                'notes' => 'Pengajuan cuti ditolak dari mobile approval.',
                'before_data' => $before,
                'after_data' => $leaveRequest->toArray(),
            ]);
        }

        return $this->successResponse([
            'id' => $leaveRequest->id,
            'status' => $leaveRequest->status,
            'approved_at' => optional($leaveRequest->approved_at)?->toDateTimeString(),
            'approval_notes' => $leaveRequest->approval_notes,
        ], 'Rejection cuti berhasil diproses.');
    }

    private function approveOvertime(Request $request, int $id)
    {
        $record = OvertimeRequest::query()->with('employee:id,user_id,manager_id')->findOrFail($id);
        if ($record->status !== 'pending') {
            return $this->successResponse([
                'id' => $record->id,
                'status' => $record->status,
            ], 'Pengajuan lembur sudah diproses sebelumnya.');
        }

        if (!$this->canApproveByEmployee($request->user(), $record->employee)) {
            abort(403, 'Anda tidak berhak meng-approve pengajuan ini.');
        }

        if ((int) ($record->employee?->user_id ?? 0) === (int) $request->user()->id) {
            abort(403, 'Anda tidak dapat meng-approve pengajuan Anda sendiri.');
        }

        $before = $record->toArray();
        $record->update([
            'status' => 'approved',
            'approved_by_user_id' => $request->user()->id,
            'approved_at' => now(),
        ]);

        $reference = $this->notificationService->buildReference($record);
        $requesterUserId = (int) ($record->employee?->user_id ?? 0);
        if ($requesterUserId > 0) {
            $this->notificationService->notifyUsers([$requesterUserId], [
                ...$reference,
                'type' => 'overtime.request.approved',
                'title' => 'Pengajuan Lembur Disetujui',
                'message' => 'Pengajuan lembur Anda telah disetujui.',
            ]);
        }

        $this->auditLogService->fromRequest($request, 'overtime_requests', 'overtime.approve.mobile', [
            'subject' => 'overtime_request',
            'reference_type' => $record::class,
            'reference_id' => $record->id,
            'notes' => 'Pengajuan lembur disetujui dari mobile approval.',
            'before_data' => $before,
            'after_data' => $record->toArray(),
        ]);

        return $this->successResponse([
            'id' => $record->id,
            'status' => $record->status,
            'approved_at' => optional($record->approved_at)?->toDateTimeString(),
        ], 'Approval lembur berhasil diproses.');
    }

    private function rejectOvertime(Request $request, int $id)
    {
        $record = OvertimeRequest::query()->with('employee:id,user_id,manager_id')->findOrFail($id);
        if ($record->status !== 'pending') {
            return $this->successResponse([
                'id' => $record->id,
                'status' => $record->status,
            ], 'Pengajuan lembur sudah diproses sebelumnya.');
        }

        if (!$this->canApproveByEmployee($request->user(), $record->employee)) {
            abort(403, 'Anda tidak berhak meng-approve pengajuan ini.');
        }

        if ((int) ($record->employee?->user_id ?? 0) === (int) $request->user()->id) {
            abort(403, 'Anda tidak dapat meng-approve pengajuan Anda sendiri.');
        }

        $before = $record->toArray();
        $notes = trim((string) $request->input('notes', ''));

        $record->update([
            'status' => 'rejected',
            'approved_by_user_id' => $request->user()->id,
            'approved_at' => now(),
            'approval_notes' => $notes !== '' ? $notes : $record->approval_notes,
        ]);

        $reference = $this->notificationService->buildReference($record);
        $requesterUserId = (int) ($record->employee?->user_id ?? 0);
        if ($requesterUserId > 0) {
            $this->notificationService->notifyUsers([$requesterUserId], [
                ...$reference,
                'type' => 'overtime.request.rejected',
                'title' => 'Pengajuan Lembur Ditolak',
                'message' => 'Pengajuan lembur Anda ditolak.',
                'meta' => [
                    'approval_notes' => $record->approval_notes,
                ],
            ]);
        }

        $this->auditLogService->fromRequest($request, 'overtime_requests', 'overtime.reject.mobile', [
            'subject' => 'overtime_request',
            'reference_type' => $record::class,
            'reference_id' => $record->id,
            'notes' => 'Pengajuan lembur ditolak dari mobile approval.',
            'before_data' => $before,
            'after_data' => $record->toArray(),
        ]);

        return $this->successResponse([
            'id' => $record->id,
            'status' => $record->status,
            'approved_at' => optional($record->approved_at)?->toDateTimeString(),
            'approval_notes' => $record->approval_notes,
        ], 'Rejection lembur berhasil diproses.');
    }

    private function approveReimburse(Request $request, int $id)
    {
        $record = ReimburseRequest::query()->with('employee:id,user_id,manager_id')->findOrFail($id);
        if ($record->status !== 'pending') {
            return $this->successResponse([
                'id' => $record->id,
                'status' => $record->status,
            ], 'Pengajuan reimburse sudah diproses sebelumnya.');
        }

        if (!$this->canApproveByEmployee($request->user(), $record->employee)) {
            abort(403, 'Anda tidak berhak meng-approve pengajuan ini.');
        }

        if ((int) ($record->employee?->user_id ?? 0) === (int) $request->user()->id) {
            abort(403, 'Anda tidak dapat meng-approve pengajuan Anda sendiri.');
        }

        $before = $record->toArray();
        $record->update([
            'status' => 'approved',
            'approved_by_user_id' => $request->user()->id,
            'approved_at' => now(),
        ]);

        $reference = $this->notificationService->buildReference($record);
        $requesterUserId = (int) ($record->employee?->user_id ?? 0);
        if ($requesterUserId > 0) {
            $this->notificationService->notifyUsers([$requesterUserId], [
                ...$reference,
                'type' => 'reimburse.request.approved',
                'title' => 'Pengajuan Reimburse Disetujui',
                'message' => 'Pengajuan reimburse Anda telah disetujui.',
            ]);
        }

        $this->auditLogService->fromRequest($request, 'reimburse_requests', 'reimburse.approve.mobile', [
            'subject' => 'reimburse_request',
            'reference_type' => $record::class,
            'reference_id' => $record->id,
            'notes' => 'Pengajuan reimburse disetujui dari mobile approval.',
            'before_data' => $before,
            'after_data' => $record->toArray(),
        ]);

        return $this->successResponse([
            'id' => $record->id,
            'status' => $record->status,
            'approved_at' => optional($record->approved_at)?->toDateTimeString(),
        ], 'Approval reimburse berhasil diproses.');
    }

    private function rejectReimburse(Request $request, int $id)
    {
        $record = ReimburseRequest::query()->with('employee:id,user_id,manager_id')->findOrFail($id);
        if ($record->status !== 'pending') {
            return $this->successResponse([
                'id' => $record->id,
                'status' => $record->status,
            ], 'Pengajuan reimburse sudah diproses sebelumnya.');
        }

        if (!$this->canApproveByEmployee($request->user(), $record->employee)) {
            abort(403, 'Anda tidak berhak meng-approve pengajuan ini.');
        }

        if ((int) ($record->employee?->user_id ?? 0) === (int) $request->user()->id) {
            abort(403, 'Anda tidak dapat meng-approve pengajuan Anda sendiri.');
        }

        $before = $record->toArray();
        $notes = trim((string) $request->input('notes', ''));

        $record->update([
            'status' => 'rejected',
            'approved_by_user_id' => $request->user()->id,
            'approved_at' => now(),
            'approval_notes' => $notes !== '' ? $notes : $record->approval_notes,
        ]);

        $reference = $this->notificationService->buildReference($record);
        $requesterUserId = (int) ($record->employee?->user_id ?? 0);
        if ($requesterUserId > 0) {
            $this->notificationService->notifyUsers([$requesterUserId], [
                ...$reference,
                'type' => 'reimburse.request.rejected',
                'title' => 'Pengajuan Reimburse Ditolak',
                'message' => 'Pengajuan reimburse Anda ditolak.',
                'meta' => [
                    'approval_notes' => $record->approval_notes,
                ],
            ]);
        }

        $this->auditLogService->fromRequest($request, 'reimburse_requests', 'reimburse.reject.mobile', [
            'subject' => 'reimburse_request',
            'reference_type' => $record::class,
            'reference_id' => $record->id,
            'notes' => 'Pengajuan reimburse ditolak dari mobile approval.',
            'before_data' => $before,
            'after_data' => $record->toArray(),
        ]);

        return $this->successResponse([
            'id' => $record->id,
            'status' => $record->status,
            'approved_at' => optional($record->approved_at)?->toDateTimeString(),
            'approval_notes' => $record->approval_notes,
        ], 'Rejection reimburse berhasil diproses.');
    }

    private function approveAttendance(Request $request, int $id)
    {
        $record = AttendanceLog::query()->with(['employee:id,user_id,manager_id'])->findOrFail($id);

        if ($record->approval_status !== 'pending') {
            return $this->successResponse([
                'id' => $record->id,
                'approval_status' => $record->approval_status,
            ], 'Presensi sudah diproses sebelumnya.');
        }

        if (!$this->canApproveByEmployee($request->user(), $record->employee)) {
            abort(403, 'Anda tidak berhak meng-approve presensi ini.');
        }

        if ((int) ($record->employee?->user_id ?? 0) === (int) $request->user()->id) {
            abort(403, 'Anda tidak dapat meng-approve presensi Anda sendiri.');
        }

        $before = $record->toArray();

        $record->update([
            'approval_status' => 'approved',
            'approved_by_user_id' => $request->user()->id,
            'approved_at' => now(),
        ]);

        $reference = $this->notificationService->buildReference($record);
        $requesterUserId = (int) ($record->employee?->user_id ?? 0);

        if ($requesterUserId > 0) {
            $this->notificationService->notifyUsers([$requesterUserId], [
                ...$reference,
                'type' => 'attendance.approval.approved',
                'title' => 'Approval Presensi Disetujui',
                'message' => 'Approval presensi Anda telah disetujui.',
            ]);
        }

        $this->auditLogService->fromRequest($request, 'attendance_logs', 'attendance.approve.mobile', [
            'subject' => 'attendance_log',
            'reference_type' => $record::class,
            'reference_id' => $record->id,
            'notes' => 'Presensi disetujui dari mobile approval.',
            'before_data' => $before,
            'after_data' => $record->toArray(),
        ]);

        return $this->successResponse([
            'id' => $record->id,
            'approval_status' => $record->approval_status,
            'approved_at' => optional($record->approved_at)?->toDateTimeString(),
        ], 'Approval presensi berhasil diproses.');
    }

    private function rejectAttendance(Request $request, int $id)
    {
        $record = AttendanceLog::query()->with(['employee:id,user_id,manager_id'])->findOrFail($id);

        if ($record->approval_status !== 'pending') {
            return $this->successResponse([
                'id' => $record->id,
                'approval_status' => $record->approval_status,
            ], 'Presensi sudah diproses sebelumnya.');
        }

        if (!$this->canApproveByEmployee($request->user(), $record->employee)) {
            abort(403, 'Anda tidak berhak meng-approve presensi ini.');
        }

        if ((int) ($record->employee?->user_id ?? 0) === (int) $request->user()->id) {
            abort(403, 'Anda tidak dapat meng-approve presensi Anda sendiri.');
        }

        $before = $record->toArray();
        $notes = trim((string) $request->input('notes', ''));

        $record->update([
            'approval_status' => 'rejected',
            'approved_by_user_id' => $request->user()->id,
            'approved_at' => now(),
            'notes' => $notes !== '' ? $notes : $record->notes,
        ]);

        $reference = $this->notificationService->buildReference($record);
        $requesterUserId = (int) ($record->employee?->user_id ?? 0);

        if ($requesterUserId > 0) {
            $this->notificationService->notifyUsers([$requesterUserId], [
                ...$reference,
                'type' => 'attendance.approval.rejected',
                'title' => 'Approval Presensi Ditolak',
                'message' => 'Approval presensi Anda ditolak.',
                'meta' => [
                    'notes' => $record->notes,
                ],
            ]);
        }

        $this->auditLogService->fromRequest($request, 'attendance_logs', 'attendance.reject.mobile', [
            'subject' => 'attendance_log',
            'reference_type' => $record::class,
            'reference_id' => $record->id,
            'notes' => 'Presensi ditolak dari mobile approval.',
            'before_data' => $before,
            'after_data' => $record->toArray(),
        ]);

        return $this->successResponse([
            'id' => $record->id,
            'approval_status' => $record->approval_status,
            'approved_at' => optional($record->approved_at)?->toDateTimeString(),
            'notes' => $record->notes,
        ], 'Rejection presensi berhasil diproses.');
    }

    private function approveAttendanceCorrection(Request $request, int $id)
    {
        $correction = AttendanceCorrection::query()
            ->with([
                'employee.user:id,name',
                'attendanceLog.shift:id,name,start_time,end_time,is_overnight,grace_minutes',
                'attendanceLog.workLocation:id,name',
                'approval.steps',
                'requestedBy.roles:id,slug',
            ])
            ->findOrFail($id);

        $before = $correction->toArray();
        $approverUserId = (int) $request->user()->id;
        $finalized = false;

        DB::transaction(function () use (&$finalized, $correction, $request, $approverUserId) {
            if ($correction->status !== 'pending') {
                return;
            }

            $approval = $this->ensureApprovalFlow(
                $correction,
                $this->attendanceCorrectionApprovalConfig($correction),
            );

            $this->assertCanApproveAttendanceCorrection($request->user(), $correction);
            $this->assertNotSelfApproval($approverUserId, $approval);
            $this->assertUniqueApproverByStep($approval, (int) $approval->current_step, $approverUserId);

            $step = $approval->steps()->where('step', $approval->current_step)->first();
            if ($step && $step->status !== 'approved') {
                $step->update([
                    'status' => 'approved',
                    'approver_user_id' => $approverUserId,
                    'decided_at' => now(),
                ]);
            }

            $stepsCount = count($this->attendanceCorrectionApprovalConfig($correction));
            if ((int) $approval->current_step < $stepsCount) {
                $approval->update([
                    'status' => 'in_review',
                    'current_step' => (int) $approval->current_step + 1,
                ]);

                return;
            }

            [$updatedLog, $snapshot] = $this->applyAttendanceCorrection($correction, $request->user()->id);

            $approval->update([
                'status' => 'approved',
                'final_decided_at' => now(),
            ]);

            $correction->update([
                'status' => 'approved',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
                'corrected_snapshot' => $snapshot,
                'attendance_log_id' => $updatedLog->id,
                'rejected_reason' => null,
            ]);

            $finalized = true;
        });

        $correction->refresh();
        $correction->loadMissing('employee:id,user_id');

        if ($finalized) {
            $reference = $this->notificationService->buildReference($correction);
            $requesterUserId = (int) ($correction->employee?->user_id ?? 0);

            if ($requesterUserId > 0) {
                $this->notificationService->notifyUsers([$requesterUserId], [
                    ...$reference,
                    'type' => 'attendance.correction.approved',
                    'title' => 'Koreksi Presensi Disetujui',
                    'message' => sprintf('Pengajuan koreksi %s telah disetujui.', $correction->request_no),
                ]);
            }

            $this->auditLogService->fromRequest($request, 'attendance_corrections', 'attendance_correction.approve.mobile', [
                'subject' => 'attendance_correction',
                'reference_type' => $correction::class,
                'reference_id' => $correction->id,
                'notes' => 'Koreksi presensi disetujui dari mobile approval.',
                'before_data' => $before,
                'after_data' => $correction->toArray(),
            ]);
        }

        return $this->successResponse([
            'id' => $correction->id,
            'status' => $correction->status,
            'approved_at' => optional($correction->approved_at)?->toDateTimeString(),
            'attendance_log_id' => $correction->attendance_log_id,
        ], 'Approval koreksi presensi berhasil diproses.');
    }

    private function rejectAttendanceCorrection(Request $request, int $id)
    {
        $correction = AttendanceCorrection::query()
            ->with([
                'employee:id,user_id,manager_id',
                'approval.steps',
            ])
            ->findOrFail($id);

        if ($correction->status !== 'pending') {
            return $this->successResponse([
                'id' => $correction->id,
                'status' => $correction->status,
            ], 'Koreksi presensi sudah diproses sebelumnya.');
        }

        $before = $correction->toArray();
        $approverUserId = (int) $request->user()->id;
        $notes = trim((string) $request->input('notes', ''));

        DB::transaction(function () use ($correction, $request, $approverUserId, $notes) {
            $approval = $this->ensureApprovalFlow(
                $correction,
                $this->attendanceCorrectionApprovalConfig($correction),
            );

            $this->assertCanApproveAttendanceCorrection($request->user(), $correction);
            $this->assertNotSelfApproval($approverUserId, $approval);
            $this->assertUniqueApproverByStep($approval, (int) $approval->current_step, $approverUserId);

            $step = $approval->steps()->where('step', $approval->current_step)->first();
            if ($step) {
                $step->update([
                    'status' => 'rejected',
                    'approver_user_id' => $approverUserId,
                    'decided_at' => now(),
                    'notes' => $notes !== '' ? $notes : $step->notes,
                ]);
            }

            $approval->update([
                'status' => 'rejected',
                'final_decided_at' => now(),
                'notes' => $notes !== '' ? $notes : $approval->notes,
            ]);

            $correction->update([
                'status' => 'rejected',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
                'rejected_reason' => $notes,
            ]);
        });

        $correction->refresh();
        $correction->loadMissing('employee:id,user_id');

        $reference = $this->notificationService->buildReference($correction);
        $requesterUserId = (int) ($correction->employee?->user_id ?? 0);

        if ($requesterUserId > 0) {
            $this->notificationService->notifyUsers([$requesterUserId], [
                ...$reference,
                'type' => 'attendance.correction.rejected',
                'title' => 'Koreksi Presensi Ditolak',
                'message' => sprintf('Pengajuan koreksi %s ditolak.', $correction->request_no),
                'meta' => [
                    'rejected_reason' => $correction->rejected_reason,
                ],
            ]);
        }

        $this->auditLogService->fromRequest($request, 'attendance_corrections', 'attendance_correction.reject.mobile', [
            'subject' => 'attendance_correction',
            'reference_type' => $correction::class,
            'reference_id' => $correction->id,
            'notes' => 'Koreksi presensi ditolak dari mobile approval.',
            'before_data' => $before,
            'after_data' => $correction->toArray(),
        ]);

        return $this->successResponse([
            'id' => $correction->id,
            'status' => $correction->status,
            'approved_at' => optional($correction->approved_at)?->toDateTimeString(),
            'rejected_reason' => $correction->rejected_reason,
        ], 'Rejection koreksi presensi berhasil diproses.');
    }

    /**
     * @return array{0: AttendanceLog, 1: array<string,mixed>}
     */
    private function applyAttendanceCorrection(AttendanceCorrection $correction, int $approverUserId): array
    {
        $workDate = Carbon::parse($correction->work_date)->toDateString();

        $schedule = WorkSchedule::query()
            ->with('shift:id,name,start_time,end_time,is_overnight,grace_minutes')
            ->where('employee_id', $correction->employee_id)
            ->whereDate('work_date', $workDate)
            ->first();

        $log = $correction->attendanceLog
            ?? AttendanceLog::query()
                ->where('employee_id', $correction->employee_id)
                ->whereDate('work_date', $workDate)
                ->first();

        $originalSnapshot = $this->attendanceSnapshot($log);

        if (!$log) {
            $log = new AttendanceLog();
            $log->employee_id = $correction->employee_id;
            $log->work_date = $workDate;
            $log->shift_id = $schedule?->shift_id;
            $log->work_location_id = $schedule?->work_location_id;
            $log->check_in_method = 'manual';
            $log->check_out_method = 'manual';
            $log->approval_status = 'approved';
        }

        $checkInAt = $correction->requested_check_in_at ?? $log->check_in_at;
        $checkOutAt = $correction->requested_check_out_at ?? $log->check_out_at;
        $shift = $schedule?->shift ?? $log->shift;

        $status = 'present';
        $lateMinutes = 0;
        $overtimeMinutes = 0;
        $isEarlyLeave = false;

        if (!$checkInAt) {
            $status = 'absent';
        }

        if ($shift && $checkInAt) {
            $shiftStart = Carbon::parse($workDate.' '.$shift->start_time);
            $shiftEnd = Carbon::parse($workDate.' '.$shift->end_time);

            if ($shift->is_overnight && $shiftEnd->lessThanOrEqualTo($shiftStart)) {
                $shiftEnd->addDay();
            }

            $grace = (int) ($shift->grace_minutes ?? 0);
            if ($checkInAt->gt($shiftStart->copy()->addMinutes($grace))) {
                $status = 'late';
                $lateMinutes = $shiftStart->diffInMinutes($checkInAt);
            }

            if ($checkOutAt) {
                if ($checkOutAt->lt($shiftEnd)) {
                    $isEarlyLeave = true;
                }

                if ($checkOutAt->gt($shiftEnd)) {
                    $overtimeMinutes = $shiftEnd->diffInMinutes($checkOutAt);
                }
            }
        }

        $notes = trim((string) $log->notes);
        $append = sprintf(
            '[CORRECTION %s] approved by user:%d at %s',
            $correction->request_no,
            $approverUserId,
            now()->format('Y-m-d H:i:s'),
        );
        $notes = $notes !== '' ? $notes."\n".$append : $append;

        $log->fill([
            'shift_id' => $log->shift_id ?? $schedule?->shift_id,
            'work_location_id' => $log->work_location_id ?? $schedule?->work_location_id,
            'check_in_at' => $checkInAt,
            'check_out_at' => $checkOutAt,
            'status' => $status,
            'late_minutes' => $lateMinutes,
            'overtime_minutes' => $overtimeMinutes,
            'is_early_leave' => $isEarlyLeave,
            'early_leave_reason' => $isEarlyLeave ? $correction->reason : null,
            'approval_status' => 'approved',
            'approved_by_user_id' => $approverUserId,
            'approved_at' => now(),
            'notes' => $notes,
        ]);
        $log->save();

        return [$log, [
            'before' => $originalSnapshot,
            'after' => $this->attendanceSnapshot($log),
        ]];
    }

    private function attendanceSnapshot(?AttendanceLog $log): ?array
    {
        if (!$log) {
            return null;
        }

        return [
            'id' => $log->id,
            'work_date' => optional($log->work_date)?->toDateString(),
            'status' => $log->status,
            'approval_status' => $log->approval_status,
            'check_in_at' => optional($log->check_in_at)?->toDateTimeString(),
            'check_out_at' => optional($log->check_out_at)?->toDateTimeString(),
            'late_minutes' => (int) $log->late_minutes,
            'overtime_minutes' => (int) $log->overtime_minutes,
            'is_early_leave' => (bool) $log->is_early_leave,
            'early_leave_reason' => $log->early_leave_reason,
            'notes' => $log->notes,
        ];
    }

    private function canApproveByEmployee($user, ?Employee $employee): bool
    {
        if (!$employee || !$user) {
            return false;
        }

        if (!$this->scopeAuthorizationService->canAccessEmployee($user, $employee)) {
            return false;
        }

        if ($user->hasRole('superadmin')) {
            return true;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('manager')) {
            $employee->loadMissing('manager.user:id');

            return (int) ($employee->manager?->user_id ?? 0) === (int) $user->id;
        }

        return false;
    }

    private function canApproveLeave($user, LeaveRequest $leaveRequest): bool
    {
        $approval = $this->ensureApprovalFlow($leaveRequest, $this->leaveApprovalConfig($leaveRequest));

        if (in_array($approval->status, ['approved', 'rejected', 'cancelled'], true)) {
            return false;
        }

        try {
            $this->assertCanApproveLeaveStep($user, $leaveRequest, $approval);
        } catch (\Throwable) {
            return false;
        }

        return true;
    }

    private function canApproveAttendanceCorrection($user, AttendanceCorrection $correction): bool
    {
        if ($correction->status !== 'pending') {
            return false;
        }

        try {
            $this->assertCanApproveAttendanceCorrection($user, $correction);
        } catch (\Throwable) {
            return false;
        }

        return true;
    }

    private function assertCanApproveAttendanceCorrection($user, AttendanceCorrection $correction): void
    {
        $approval = $this->ensureApprovalFlow(
            $correction,
            $this->attendanceCorrectionApprovalConfig($correction),
        );

        $currentStep = (int) ($approval->current_step ?? 1);
        $rolesByStep = $this->attendanceCorrectionApprovalConfig($correction);
        $allowed = $rolesByStep[$currentStep] ?? [];

        if (in_array('manager', $allowed, true) && $this->canApproveByEmployee($user, $correction->employee)) {
            return;
        }

        if ($user->hasRole('superadmin') && in_array('superadmin', $allowed, true)) {
            return;
        }

        if ($user->hasRole('admin') && in_array('admin', $allowed, true)) {
            return;
        }

        abort(403, 'Anda tidak memiliki akses untuk approval step ini.');
    }

    private function assertCanApproveLeaveStep($user, LeaveRequest $leaveRequest, Approval $approval): void
    {
        $currentStep = (int) ($approval->current_step ?? 1);
        $allowed = $this->leaveApprovalConfig($leaveRequest)[$currentStep] ?? [];

        if (in_array('manager', $allowed, true) && $this->canApproveByEmployee($user, $leaveRequest->employee)) {
            return;
        }

        if ($user->hasRole('superadmin') && in_array('superadmin', $allowed, true)) {
            return;
        }

        if ($user->hasRole('admin') && in_array('admin', $allowed, true)) {
            return;
        }

        abort(403, 'Anda tidak memiliki akses untuk approval step ini.');
    }

    private function ensureApprovalFlow($approvable, array $stepsConfig): Approval
    {
        $approval = $approvable->approval;
        if ($approval) {
            $approval->loadMissing('steps');
            $this->ensureApprovalSteps($approval, $stepsConfig);

            if (!$approval->requested_by_user_id && $approvable->requested_by_user_id) {
                $approval->update([
                    'requested_by_user_id' => $approvable->requested_by_user_id,
                ]);
            }

            return $approval;
        }

        $approval = $approvable->approval()->create([
            'status' => 'pending',
            'current_step' => 1,
            'requested_by_user_id' => $approvable->requested_by_user_id ?? $approvable->employee?->user_id,
            'requested_at' => $approvable->requested_at ?? now(),
        ]);

        $this->ensureApprovalSteps($approval, $stepsConfig);
        $approval->loadMissing('steps');
        $approvable->setRelation('approval', $approval);

        return $approval;
    }

    private function ensureApprovalSteps(Approval $approval, array $stepsConfig): void
    {
        $existing = $approval->steps->keyBy('step');

        foreach ($stepsConfig as $step => $roles) {
            if ($existing->has($step)) {
                continue;
            }

            ApprovalStep::create([
                'approval_id' => $approval->id,
                'step' => $step,
                'status' => 'pending',
            ]);
        }

        $approval->loadMissing('steps');
    }

    private function assertNotSelfApproval(int $approverUserId, Approval $approval): void
    {
        $requesterUserId = (int) ($approval->requested_by_user_id ?? 0);

        if ($requesterUserId > 0 && $requesterUserId === $approverUserId) {
            abort(403, 'Anda tidak dapat meng-approve pengajuan Anda sendiri.');
        }
    }

    private function assertUniqueApproverByStep(Approval $approval, int $currentStep, int $approverUserId): void
    {
        if ($currentStep <= 1) {
            return;
        }

        $alreadyDecided = $approval->steps()
            ->where('step', '<', $currentStep)
            ->where('approver_user_id', $approverUserId)
            ->whereNotNull('decided_at')
            ->exists();

        if ($alreadyDecided) {
            abort(403, 'Approver di setiap step harus berbeda pengguna.');
        }
    }

    private function leaveApprovalConfig(LeaveRequest $leaveRequest): array
    {
        $leaveRequest->loadMissing('employee.user:id,role');

        $requesterRole = $this->roleFromUser($leaveRequest->employee?->user);

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

    private function attendanceCorrectionApprovalConfig(AttendanceCorrection $correction): array
    {
        $requesterRole = $this->roleFromUser($correction->requestedBy);

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

    private function roleFromUser($user): string
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

    private function reserveLeaveBalance(LeaveRequest $leaveRequest): void
    {
        $leaveRequest->loadMissing('employee', 'leaveType');

        if (!$leaveRequest->employee || !$leaveRequest->leaveType) {
            return;
        }

        $year = Carbon::parse($leaveRequest->start_date)->year;
        $requestedDays = (int) round((float) $leaveRequest->total_days);

        $balance = LeaveBalance::query()
            ->lockForUpdate()
            ->firstOrCreate([
                'employee_id' => $leaveRequest->employee_id,
                'leave_type_id' => $leaveRequest->leave_type_id,
                'year' => $year,
            ], [
                'allocated' => (int) $leaveRequest->leaveType->default_allocation,
                'used' => 0,
                'remaining' => (int) $leaveRequest->leaveType->default_allocation,
                'expires_at' => Carbon::create($year, 12, 31)->toDateString(),
            ]);

        if ((int) $balance->remaining < $requestedDays) {
            abort(422, 'Saldo cuti tidak mencukupi untuk menyetujui pengajuan ini.');
        }

        $balance->used = (int) $balance->used + $requestedDays;
        $balance->remaining = max(0, (int) $balance->remaining - $requestedDays);
        $balance->save();
    }
}
