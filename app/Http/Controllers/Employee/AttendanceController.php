<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\AttendanceLog;
use App\Models\AttendancePhoto;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Services\AttendanceService;
use App\Services\AuditLogService;
use App\Services\EmployeeStatusService;
use App\Services\FileStorageService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function __construct(
        private readonly AttendanceService $attendanceService,
        private readonly EmployeeStatusService $employeeStatusService,
        private readonly FileStorageService $fileStorageService,
        private readonly AuditLogService $auditLogService,
        private readonly NotificationService $notificationService,
    ) {
    }

    public function index(Request $request)
    {
        $employee = Employee::with(['company:id,name'])
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $today = Carbon::today();
        $schedule = $this->attendanceService->resolveTodaySchedule($employee, $today);
        $workLocation = $this->attendanceService->resolveWorkLocation($employee, $schedule);

        $openLog = AttendanceLog::with(['shift', 'workLocation', 'photos'])
            ->where('employee_id', $employee->id)
            ->whereNotNull('check_in_at')
            ->whereNull('check_out_at')
            ->orderByDesc('check_in_at')
            ->first();

        $todayLog = AttendanceLog::with('photos')
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $today)
            ->first();
        $log = $openLog ?? $todayLog;
        $hasApprovedLeaveToday = LeaveRequest::query()
            ->where('employee_id', $employee->id)
            ->where('status', 'approved')
            ->whereDate('start_date', '<=', $today->toDateString())
            ->whereDate('end_date', '>=', $today->toDateString())
            ->exists();

        return Inertia::render('employee/attendance/index', [
            'employee' => [
                'name' => $request->user()->name,
                'employee_code' => $employee->employee_code,
                'company' => $employee->company?->name,
            ],
            'shift' => $schedule?->shift
                ? [
                    'name' => $schedule->shift->name,
                    'start_time' => $schedule->shift->start_time,
                    'end_time' => $schedule->shift->end_time,
                    'check_in_cutoff_time' => $schedule->shift->check_in_cutoff_time,
                    'check_out_cutoff_time' => $schedule->shift->check_out_cutoff_time,
                    'grace_minutes' => $schedule->shift->grace_minutes,
                    'is_overnight' => $schedule->shift->is_overnight,
                ]
                : null,
            'workLocation' => $workLocation
                ? [
                    'name' => $workLocation->name,
                    'latitude' => $workLocation->latitude,
                    'longitude' => $workLocation->longitude,
                    'radius_meters' => $workLocation->radius_meters,
                ]
                : null,
            'log' => $log
                ? [
                    'id' => $log->id,
                    'work_date' => $log->work_date?->format('Y-m-d'),
                    'check_in_at' => $log->check_in_at,
                    'check_out_at' => $log->check_out_at,
                    'approval_status' => $log->approval_status,
                    'status' => $log->status,
                    'check_in_distance_meters' => $log->check_in_distance_meters,
                    'check_out_distance_meters' => $log->check_out_distance_meters,
                    'is_early_leave' => (bool) $log->is_early_leave,
                    'early_leave_reason' => $log->early_leave_reason,
                    'photos' => $log->photos->map(fn ($photo) => [
                        'id' => $photo->id,
                        'type' => $photo->type,
                        'url' => route('secure-files.attendance-photos.show', $photo),
                    ]),
                ]
                : null,
            'hasApprovedLeave' => $hasApprovedLeaveToday,
            'canCheckIn' => !$hasApprovedLeaveToday && !$openLog && (!$todayLog || !$todayLog->check_in_at),
            'canCheckOut' => $log && $log->check_in_at && !$log->check_out_at,
            'serverTime' => Carbon::now()->format('d M Y H:i'),
        ]);
    }

    public function checkIn(Request $request)
    {
        $employee = Employee::where('user_id', $request->user()->id)->firstOrFail();
        $this->employeeStatusService->assertOperationallyActive(
            $employee,
            'Karyawan resign/terminated/inactive tidak dapat melakukan presensi.',
        );

        $data = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'photo' => ['required', 'image', 'max:4096'],
            'device_id' => ['nullable', 'string', 'max:191'],
        ]);

        $today = Carbon::today();
        try {
            $this->attendanceService->assertNoApprovedLeave($employee, $today);
        } catch (ValidationException $exception) {
            return back()->withErrors($exception->errors());
        }

        $schedule = $this->attendanceService->resolveTodaySchedule($employee, $today);

        try {
            $this->attendanceService->assertScheduleAvailableForAttendance($schedule);
        } catch (ValidationException $exception) {
            return back()->withErrors($exception->errors());
        }

        $workLocation = $this->attendanceService->resolveWorkLocation($employee, $schedule);

        $shift = $schedule?->shift;
        try {
            $this->attendanceService->assertShiftAvailable($shift);
        } catch (ValidationException $exception) {
            return back()->withErrors([
                ...$exception->errors(),
            ]);
        }

        $openLog = $this->attendanceService->resolveOpenAttendanceLog($employee);

        if ($openLog) {
            return back()->withErrors([
                'photo' => 'Masih ada sesi presensi sebelumnya yang belum check-out.',
            ]);
        }

        $checkInAt = Carbon::now();

        $log = AttendanceLog::firstOrNew([
            'employee_id' => $employee->id,
            'work_date' => $today->toDateString(),
        ]);

        if ($log->check_in_at) {
            return back()->withErrors([
                'photo' => 'Anda sudah melakukan check-in hari ini.',
            ]);
        }

        $lateMinutes = 0;
        $status = 'present';

        if ($shift) {
            try {
                $this->attendanceService->assertCheckInWindow($checkInAt, $today, $shift);
            } catch (ValidationException $exception) {
                return back()->withErrors($exception->errors());
            }

            $shiftStart = Carbon::parse($today->toDateString().' '.$shift->start_time);
            $grace = $shift->grace_minutes ?? 0;
            if ($checkInAt->gt($shiftStart->copy()->addMinutes($grace))) {
                $status = 'late';
                $lateMinutes = $shiftStart->diffInMinutes($checkInAt);
            }
        }

        $distance = null;
        if ($workLocation && $workLocation->latitude && $workLocation->longitude) {
            $distance = $this->attendanceService->calculateDistanceMeters(
                $data['latitude'],
                $data['longitude'],
                $workLocation->latitude,
                $workLocation->longitude,
            );

            try {
                $this->attendanceService->assertInsideGeofence($workLocation, $distance);
            } catch (ValidationException $exception) {
                return back()->withErrors($exception->errors());
            }
        } elseif (config('hr.attendance.enforce_geofence', true)) {
            return back()->withErrors([
                'photo' => 'Lokasi kerja untuk presensi belum dikonfigurasi.',
            ]);
        }

        DB::transaction(function () use (
            $log,
            $shift,
            $workLocation,
            $data,
            $checkInAt,
            $status,
            $lateMinutes,
            $distance,
            $request
        ) {
            $log->fill([
                'shift_id' => $shift?->id,
                'work_location_id' => $workLocation?->id,
                'check_in_at' => $checkInAt,
                'check_in_latitude' => $data['latitude'],
                'check_in_longitude' => $data['longitude'],
                'check_in_distance_meters' => $distance,
                'check_in_device_id' => $this->resolveDeviceId($request, $data),
                'check_in_method' => 'gps_selfie',
                'check_in_ip' => $request->ip(),
                'status' => $status,
                'approval_status' => 'pending',
                'late_minutes' => $lateMinutes,
            ]);
            $log->save();

            $path = $this->fileStorageService->storePrivate(
                $data['photo'],
                'attendance/'.$log->employee_id,
            );

            AttendancePhoto::create([
                'attendance_log_id' => $log->id,
                'type' => 'check_in',
                'file_path' => $path,
                'mime' => $data['photo']->getClientMimeType(),
                'size_bytes' => $data['photo']->getSize(),
                'captured_at' => $checkInAt,
            ]);

            $this->writeAuditLog(
                $request,
                'attendance.check_in',
                sprintf(
                    'Check-in %s pada %s (%s)',
                    $request->user()->name,
                    $log->work_date,
                    strtoupper((string) $log->approval_status),
                ),
                $log,
                null,
                [
                    'status' => $status,
                    'late_minutes' => $lateMinutes,
                    'distance_meters' => $distance,
                ],
            );
        });

        if ($status === 'late') {
            $employee->loadMissing('manager');
            $reference = $this->notificationService->buildReference($log);

            $this->notificationService->notifyApprovalAudience($employee, [
                ...$reference,
                'type' => 'attendance.late',
                'title' => 'Karyawan Terlambat',
                'message' => sprintf(
                    '%s terlambat check-in %d menit pada %s.',
                    $request->user()->name,
                    $lateMinutes,
                    Carbon::parse($log->work_date)->format('Y-m-d'),
                ),
            ]);
        }

        return back()->with('success', 'Check-in berhasil.');
    }

    public function checkOut(Request $request)
    {
        $employee = Employee::where('user_id', $request->user()->id)->firstOrFail();
        $this->employeeStatusService->assertOperationallyActive(
            $employee,
            'Karyawan resign/terminated/inactive tidak dapat melakukan presensi.',
        );

        $data = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'photo' => ['required', 'image', 'max:4096'],
            'early_leave_reason' => ['nullable', 'string', 'max:500'],
            'device_id' => ['nullable', 'string', 'max:191'],
        ]);

        $log = $this->attendanceService->resolveOpenAttendanceLog($employee)?->loadMissing('shift', 'workLocation');

        if (!$log || !$log->check_in_at) {
            return back()->withErrors([
                'photo' => 'Belum ada sesi check-in aktif.',
            ]);
        }

        if ($log->check_out_at) {
            return back()->withErrors([
                'photo' => 'Anda sudah melakukan check-out hari ini.',
            ]);
        }

        $resolvedDeviceId = $this->resolveDeviceId($request, $data);
        if ($log->check_in_device_id && $resolvedDeviceId && $log->check_in_device_id !== $resolvedDeviceId) {
            return back()->withErrors([
                'device_id' => 'Perangkat check-out harus sama dengan perangkat check-in.',
            ]);
        }

        $checkOutAt = Carbon::now();
        $shift = $log->shift;
        $workLocation = $log->workLocation;

        $distance = null;
        if ($workLocation && $workLocation->latitude && $workLocation->longitude) {
            $distance = $this->attendanceService->calculateDistanceMeters(
                $data['latitude'],
                $data['longitude'],
                $workLocation->latitude,
                $workLocation->longitude,
            );

            try {
                $this->attendanceService->assertInsideGeofence($workLocation, $distance);
            } catch (ValidationException $exception) {
                return back()->withErrors($exception->errors());
            }
        } elseif (config('hr.attendance.enforce_geofence', true)) {
            return back()->withErrors([
                'photo' => 'Lokasi kerja untuk presensi belum dikonfigurasi.',
            ]);
        }

        try {
            $evaluation = $this->attendanceService->checkOutEvaluation(
                $log,
                $checkOutAt,
                $data['early_leave_reason'] ?? null,
            );
        } catch (ValidationException $exception) {
            return back()->withErrors($exception->errors());
        }

        $isEarlyLeave = (bool) $evaluation['is_early_leave'];
        $overtimeMinutes = (int) $evaluation['overtime_minutes'];
        $earlyLeaveReason = $evaluation['early_leave_reason'];

        DB::transaction(function () use (
            $log,
            $data,
            $checkOutAt,
            $distance,
            $overtimeMinutes,
            $isEarlyLeave,
            $earlyLeaveReason,
            $resolvedDeviceId,
            $request,
        ) {
            $notes = $log->notes;
            if ($isEarlyLeave && $earlyLeaveReason) {
                $notes = trim(($notes ? $notes."\n\n" : '').'Early leave reason: '.$earlyLeaveReason);
            }

            $log->update([
                'check_out_at' => $checkOutAt,
                'check_out_latitude' => $data['latitude'],
                'check_out_longitude' => $data['longitude'],
                'check_out_distance_meters' => $distance,
                'check_out_device_id' => $resolvedDeviceId,
                'check_out_method' => 'gps_selfie',
                'check_out_ip' => $request->ip(),
                'overtime_minutes' => $overtimeMinutes,
                'is_early_leave' => $isEarlyLeave,
                'early_leave_reason' => $earlyLeaveReason,
                'approval_status' => $isEarlyLeave ? 'pending' : $log->approval_status,
                'notes' => $notes,
            ]);

            $path = $this->fileStorageService->storePrivate(
                $data['photo'],
                'attendance/'.$log->employee_id,
            );

            AttendancePhoto::create([
                'attendance_log_id' => $log->id,
                'type' => 'check_out',
                'file_path' => $path,
                'mime' => $data['photo']->getClientMimeType(),
                'size_bytes' => $data['photo']->getSize(),
                'captured_at' => $checkOutAt,
            ]);

            $this->writeAuditLog(
                $request,
                $isEarlyLeave ? 'attendance.check_out_early' : 'attendance.check_out',
                sprintf(
                    'Check-out %s pada %s%s',
                    $request->user()->name,
                    Carbon::parse($log->work_date)->toDateString(),
                    $isEarlyLeave ? ' (early leave)' : '',
                ),
                $log,
                null,
                [
                    'is_early_leave' => $isEarlyLeave,
                    'early_leave_reason' => $isEarlyLeave ? $earlyLeaveReason : null,
                    'overtime_minutes' => $overtimeMinutes,
                    'distance_meters' => $distance,
                ],
            );
        });

        if ($isEarlyLeave) {
            $employee->loadMissing('manager');
            $reference = $this->notificationService->buildReference($log);

            $this->notificationService->notifyApprovalAudience($employee, [
                ...$reference,
                'type' => 'attendance.early_leave_request',
                'title' => 'Pengajuan Pulang Cepat',
                'message' => sprintf(
                    '%s mengajukan pulang cepat pada %s: %s',
                    $request->user()->name,
                    Carbon::parse($log->work_date)->format('Y-m-d'),
                    $earlyLeaveReason ?? '-',
                ),
            ]);
        }

        return back()->with('success', 'Check-out berhasil.');
    }

    private function resolveDeviceId(Request $request, array $data): ?string
    {
        $candidate = trim((string) ($data['device_id'] ?? $request->header('X-Device-Id', '')));

        return $candidate === '' ? null : mb_substr($candidate, 0, 191);
    }

    private function writeAuditLog(
        Request $request,
        string $action,
        string $notes,
        ?AttendanceLog $reference = null,
        ?array $before = null,
        ?array $after = null,
    ): void
    {
        $this->auditLogService->fromRequest($request, 'attendance', $action, [
            'subject' => 'attendance',
            'notes' => $notes,
            'severity' => 'info',
            'reference_type' => $reference ? $reference::class : null,
            'reference_id' => $reference?->id,
            'before_data' => $before,
            'after_data' => $after,
        ]);
    }
}
