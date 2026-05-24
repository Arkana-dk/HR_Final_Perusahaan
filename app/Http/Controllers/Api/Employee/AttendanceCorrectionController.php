<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\Approval;
use App\Models\ApprovalStep;
use App\Models\AttendanceCorrection;
use App\Models\AttendanceLog;
use App\Services\AuditLogService;
use App\Services\EmployeeStatusService;
use App\Services\FileStorageService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AttendanceCorrectionController extends Controller
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

    public function index(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $filters = $request->validate([
            'status' => ['nullable', 'string', 'max:30'],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = AttendanceCorrection::query()
            ->with([
                'attendanceLog.shift:id,name,start_time,end_time,is_overnight,grace_minutes',
                'approvedBy:id,name',
                'approval.steps.approver:id,name',
            ])
            ->where('employee_id', $employee->id)
            ->orderByDesc('requested_at')
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
        $rows = $query->paginate($perPage)->withQueryString();

        return $this->successResponse(
            $rows->getCollection()
                ->map(fn (AttendanceCorrection $row) => $this->mapCorrection($row))
                ->values()
                ->all(),
            'Riwayat koreksi presensi berhasil diambil.',
            200,
            [
                'current_page' => $rows->currentPage(),
                'last_page' => $rows->lastPage(),
                'per_page' => $rows->perPage(),
                'total' => $rows->total(),
            ],
        );
    }

    public function show(Request $request, AttendanceCorrection $attendanceCorrection)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee->id, $attendanceCorrection);

        $attendanceCorrection->load([
            'attendanceLog.shift:id,name,start_time,end_time,is_overnight,grace_minutes',
            'approvedBy:id,name',
            'approval.steps.approver:id,name',
        ]);

        return $this->successResponse(
            $this->mapCorrection($attendanceCorrection),
            'Detail koreksi presensi berhasil diambil.',
        );
    }

    public function store(Request $request)
    {
        $employee = $this->resolveEmployee($request, true);
        $this->employeeStatusService->assertOperationallyActive(
            $employee,
            'Karyawan resign/terminated/inactive tidak dapat mengajukan koreksi presensi baru.',
        );
        $data = $request->validate([
            'work_date' => ['required', 'date'],
            'requested_check_in_time' => ['nullable', 'date_format:H:i'],
            'requested_check_out_time' => ['nullable', 'date_format:H:i'],
            'reason' => ['required', 'string', 'max:1000'],
            'attachment' => ['nullable', 'file', 'max:4096'],
        ]);

        if (empty($data['requested_check_in_time']) && empty($data['requested_check_out_time'])) {
            throw ValidationException::withMessages([
                'requested_check_in_time' => 'Isi minimal jam masuk atau jam pulang yang akan dikoreksi.',
            ]);
        }

        $workDate = Carbon::parse($data['work_date'])->toDateString();

        $attendanceLog = AttendanceLog::query()
            ->with('shift:id,name,start_time,end_time,is_overnight,grace_minutes')
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $workDate)
            ->first();

        $hasPending = AttendanceCorrection::query()
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $workDate)
            ->where('status', 'pending')
            ->exists();

        if ($hasPending) {
            throw ValidationException::withMessages([
                'work_date' => 'Masih ada pengajuan koreksi presensi pending di tanggal tersebut.',
            ]);
        }

        $requestedCheckInAt = $this->composeDateTime($workDate, $data['requested_check_in_time'] ?? null);
        $requestedCheckOutAt = $this->composeDateTime(
            $workDate,
            $data['requested_check_out_time'] ?? null,
            $requestedCheckInAt,
        );

        if ($requestedCheckInAt && $requestedCheckOutAt && $requestedCheckOutAt->lessThanOrEqualTo($requestedCheckInAt)) {
            throw ValidationException::withMessages([
                'requested_check_out_time' => 'Jam pulang koreksi harus setelah jam masuk koreksi.',
            ]);
        }

        $path = null;
        if ($request->hasFile('attachment')) {
            $path = $this->fileStorageService->storePrivate(
                $request->file('attachment'),
                'attendance-corrections/'.$employee->id,
            );
        }

        $requestNo = $this->generateRequestNo();
        $requesterRole = $this->resolveRequesterRole($request->user());

        $correction = null;

        DB::transaction(function () use (
            &$correction,
            $request,
            $employee,
            $attendanceLog,
            $workDate,
            $requestedCheckInAt,
            $requestedCheckOutAt,
            $data,
            $path,
            $requestNo,
            $requesterRole,
        ) {
            $correction = AttendanceCorrection::create([
                'request_no' => $requestNo,
                'employee_id' => $employee->id,
                'attendance_log_id' => $attendanceLog?->id,
                'work_date' => $workDate,
                'requested_check_in_at' => $requestedCheckInAt,
                'requested_check_out_at' => $requestedCheckOutAt,
                'reason' => $data['reason'],
                'status' => 'pending',
                'requested_by_user_id' => $request->user()->id,
                'requested_at' => now(),
                'attachment_path' => $path,
                'original_snapshot' => $this->snapshotFromLog($attendanceLog),
            ]);

            $approval = $correction->approval()->create([
                'status' => 'pending',
                'current_step' => 1,
                'requested_by_user_id' => $request->user()->id,
                'requested_at' => now(),
            ]);

            foreach ($this->approvalStepsConfig($requesterRole) as $step => $roles) {
                ApprovalStep::create([
                    'approval_id' => $approval->id,
                    'step' => $step,
                    'status' => 'pending',
                ]);
            }
        });

        $correction->load([
            'attendanceLog.shift:id,name,start_time,end_time,is_overnight,grace_minutes',
            'approvedBy:id,name',
            'approval.steps.approver:id,name',
        ]);

        $employee->loadMissing('manager');
        $reference = $this->notificationService->buildReference($correction);
        $this->notificationService->notifyApprovalAudience($employee, [
            ...$reference,
            'type' => 'attendance.correction.created',
            'title' => 'Koreksi Presensi Baru',
            'message' => sprintf(
                '%s mengajukan koreksi presensi tanggal %s (%s).',
                $request->user()->name,
                Carbon::parse($workDate)->format('Y-m-d'),
                $correction->request_no,
            ),
            'meta' => [
                'attendance_correction_id' => $correction->id,
                'employee_id' => $employee->id,
            ],
        ]);

        $this->auditLogService->fromRequest($request, 'attendance_corrections', 'attendance_correction.create', [
            'subject' => 'attendance_correction',
            'reference_type' => $correction::class,
            'reference_id' => $correction->id,
            'notes' => 'Pengajuan koreksi presensi dibuat dari mobile.',
            'after_data' => $correction->toArray(),
        ]);

        return $this->successResponse(
            $this->mapCorrection($correction),
            'Pengajuan koreksi presensi berhasil dikirim.',
            201,
        );
    }

    public function cancel(Request $request, AttendanceCorrection $attendanceCorrection)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee->id, $attendanceCorrection);

        if ($attendanceCorrection->status !== 'pending') {
            throw ValidationException::withMessages([
                'status' => 'Hanya pengajuan pending yang dapat dibatalkan.',
            ]);
        }

        $before = $attendanceCorrection->toArray();

        DB::transaction(function () use ($attendanceCorrection) {
            $attendanceCorrection->update([
                'status' => 'cancelled',
            ]);

            $attendanceCorrection->approval()?->update([
                'status' => 'cancelled',
                'final_decided_at' => now(),
            ]);
        });

        $attendanceCorrection->refresh();
        $attendanceCorrection->load([
            'attendanceLog.shift:id,name,start_time,end_time,is_overnight,grace_minutes',
            'approvedBy:id,name',
            'approval.steps.approver:id,name',
        ]);

        $reference = $this->notificationService->buildReference($attendanceCorrection);
        $this->notificationService->notifyUsers([(int) $request->user()->id], [
            ...$reference,
            'type' => 'attendance.correction.cancelled',
            'title' => 'Koreksi Presensi Dibatalkan',
            'message' => sprintf('Pengajuan koreksi %s berhasil dibatalkan.', $attendanceCorrection->request_no),
        ]);

        $this->auditLogService->fromRequest($request, 'attendance_corrections', 'attendance_correction.cancel', [
            'subject' => 'attendance_correction',
            'reference_type' => $attendanceCorrection::class,
            'reference_id' => $attendanceCorrection->id,
            'notes' => 'Pengajuan koreksi presensi dibatalkan dari mobile.',
            'before_data' => $before,
            'after_data' => $attendanceCorrection->toArray(),
        ]);

        return $this->successResponse(
            $this->mapCorrection($attendanceCorrection),
            'Pengajuan koreksi presensi dibatalkan.',
        );
    }

    private function mapCorrection(AttendanceCorrection $correction): array
    {
        return [
            'id' => $correction->id,
            'request_no' => $correction->request_no,
            'work_date' => optional($correction->work_date)?->toDateString(),
            'requested_check_in_at' => optional($correction->requested_check_in_at)?->toDateTimeString(),
            'requested_check_out_at' => optional($correction->requested_check_out_at)?->toDateTimeString(),
            'reason' => $correction->reason,
            'status' => $correction->status,
            'requested_at' => optional($correction->requested_at)?->toDateTimeString(),
            'approved_at' => optional($correction->approved_at)?->toDateTimeString(),
            'approved_by' => $correction->approvedBy?->name,
            'rejected_reason' => $correction->rejected_reason,
            'has_attachment' => (bool) $correction->attachment_path,
            'attachment_url' => $correction->attachment_path
                ? url('/api/v1/secure-files/attendance-correction-attachments/'.$correction->id)
                : null,
            'original_snapshot' => $correction->original_snapshot,
            'corrected_snapshot' => $correction->corrected_snapshot,
            'attendance_log' => $correction->attendanceLog
                ? [
                    'id' => $correction->attendanceLog->id,
                    'status' => $correction->attendanceLog->status,
                    'approval_status' => $correction->attendanceLog->approval_status,
                    'check_in_at' => optional($correction->attendanceLog->check_in_at)?->toDateTimeString(),
                    'check_out_at' => optional($correction->attendanceLog->check_out_at)?->toDateTimeString(),
                ]
                : null,
            'approval' => $correction->approval
                ? [
                    'status' => $correction->approval->status,
                    'current_step' => $correction->approval->current_step,
                    'steps' => $correction->approval->steps
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

    private function snapshotFromLog(?AttendanceLog $log): ?array
    {
        if (!$log) {
            return null;
        }

        return [
            'attendance_log_id' => $log->id,
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

    private function assertOwnedByEmployee(int $employeeId, AttendanceCorrection $correction): void
    {
        if ((int) $correction->employee_id !== $employeeId) {
            abort(404);
        }
    }

    private function composeDateTime(
        string $workDate,
        ?string $time,
        ?Carbon $referenceCheckIn = null,
    ): ?Carbon {
        if (!$time) {
            return null;
        }

        $composed = Carbon::parse($workDate.' '.$time);

        if ($referenceCheckIn && $composed->lessThanOrEqualTo($referenceCheckIn)) {
            $composed->addDay();
        }

        return $composed;
    }

    private function resolveRequesterRole($user): string
    {
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

    private function generateRequestNo(): string
    {
        do {
            $candidate = sprintf('ACR-%s-%04d', now()->format('Ymd'), random_int(1, 9999));
        } while (AttendanceCorrection::query()->where('request_no', $candidate)->exists());

        return $candidate;
    }
}
