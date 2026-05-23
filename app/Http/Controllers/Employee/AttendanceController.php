<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\AttendanceLog;
use App\Models\AttendancePhoto;
use App\Models\Employee;
use App\Models\WorkLocation;
use App\Models\WorkSchedule;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function __construct(
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
        $schedule = WorkSchedule::with(['shift', 'workLocation'])
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $today)
            ->first();

        $workLocation = $schedule?->workLocation
            ?? WorkLocation::where('company_id', $employee->company_id)
                ->where('is_active', true)
                ->orderBy('id')
                ->first();

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
                        'file_path' => $photo->file_path,
                    ]),
                ]
                : null,
            'canCheckIn' => !$openLog && (!$todayLog || !$todayLog->check_in_at),
            'canCheckOut' => $log && $log->check_in_at && !$log->check_out_at,
            'serverTime' => Carbon::now()->format('d M Y H:i'),
        ]);
    }

    public function checkIn(Request $request)
    {
        $employee = Employee::where('user_id', $request->user()->id)->firstOrFail();

        $data = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'photo' => ['required', 'image', 'max:4096'],
            'device_id' => ['nullable', 'string', 'max:191'],
        ]);

        $today = Carbon::today();
        $schedule = WorkSchedule::with(['shift', 'workLocation'])
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $today)
            ->first();
        $this->assertScheduleCanCheckIn($schedule);

        $workLocation = $schedule?->workLocation
            ?? WorkLocation::where('company_id', $employee->company_id)
                ->where('is_active', true)
                ->orderBy('id')
                ->first();

        $shift = $schedule?->shift;
        if (!$shift) {
            return back()->withErrors([
                'photo' => 'Shift kerja hari ini belum diatur. Hubungi HR/admin.',
            ]);
        }

        $openLog = AttendanceLog::query()
            ->where('employee_id', $employee->id)
            ->whereNotNull('check_in_at')
            ->whereNull('check_out_at')
            ->orderByDesc('check_in_at')
            ->first();

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
            $shiftStart = Carbon::parse($today->toDateString().' '.$shift->start_time);
            $grace = $shift->grace_minutes ?? 0;

            if ($shift->check_in_cutoff_time) {
                $cutoffAt = Carbon::parse($today->toDateString().' '.$shift->check_in_cutoff_time);
                if ($checkInAt->gt($cutoffAt)) {
                    return back()->withErrors([
                        'photo' => 'Batas absen masuk sudah terlewati.',
                    ]);
                }
            }

            if ($checkInAt->gt($shiftStart->copy()->addMinutes($grace))) {
                $status = 'late';
                $lateMinutes = $shiftStart->diffInMinutes($checkInAt);
            }
        }

        $distance = null;
        if ($workLocation && $workLocation->latitude && $workLocation->longitude) {
            $distance = $this->distanceMeters(
                $data['latitude'],
                $data['longitude'],
                $workLocation->latitude,
                $workLocation->longitude,
            );

            try {
                $this->assertInsideGeofence($distance, $workLocation->radius_meters);
            } catch (ValidationException $exception) {
                return back()->withErrors($exception->errors());
            }
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

            $path = $data['photo']->store('attendance', 'public');

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

        $data = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'photo' => ['required', 'image', 'max:4096'],
            'early_leave_reason' => ['nullable', 'string', 'max:500'],
            'device_id' => ['nullable', 'string', 'max:191'],
        ]);

        $log = AttendanceLog::with('shift', 'workLocation')
            ->where('employee_id', $employee->id)
            ->whereNotNull('check_in_at')
            ->whereNull('check_out_at')
            ->orderByDesc('check_in_at')
            ->first();

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
            $distance = $this->distanceMeters(
                $data['latitude'],
                $data['longitude'],
                $workLocation->latitude,
                $workLocation->longitude,
            );

            try {
                $this->assertInsideGeofence($distance, $workLocation->radius_meters);
            } catch (ValidationException $exception) {
                return back()->withErrors($exception->errors());
            }
        }

        $overtimeMinutes = 0;
        $isEarlyLeave = false;
        $earlyLeaveReason = isset($data['early_leave_reason']) ? trim((string) $data['early_leave_reason']) : '';

        if ($shift) {
            $workDate = Carbon::parse($log->work_date)->toDateString();
            $shiftStart = Carbon::parse($workDate.' '.$shift->start_time);
            $shiftEnd = Carbon::parse($workDate.' '.$shift->end_time);

            if ($shift->is_overnight && $shiftEnd->lessThanOrEqualTo($shiftStart)) {
                $shiftEnd->addDay();
            }

            if ($shift->check_out_cutoff_time) {
                $cutoffAt = Carbon::parse($workDate.' '.$shift->check_out_cutoff_time);
                if ($shift->is_overnight && $cutoffAt->lessThanOrEqualTo($shiftStart)) {
                    $cutoffAt->addDay();
                }

                if ($checkOutAt->gt($cutoffAt)) {
                    return back()->withErrors([
                        'photo' => 'Batas absen pulang sudah terlewati.',
                    ]);
                }
            }

            if ($checkOutAt->lt($shiftEnd)) {
                if ($earlyLeaveReason === '') {
                    return back()->withErrors([
                        'early_leave_reason' => 'Pulang sebelum jadwal wajib isi alasan.',
                    ]);
                }

                $isEarlyLeave = true;
            }

            if ($checkOutAt->gt($shiftEnd)) {
                $overtimeMinutes = $shiftEnd->diffInMinutes($checkOutAt);
            }
        }

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
            if ($isEarlyLeave && $earlyLeaveReason !== '') {
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
                'early_leave_reason' => $isEarlyLeave ? $earlyLeaveReason : null,
                'approval_status' => $isEarlyLeave ? 'pending' : $log->approval_status,
                'notes' => $notes,
            ]);

            $path = $data['photo']->store('attendance', 'public');

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
                    $earlyLeaveReason,
                ),
            ]);
        }

        return back()->with('success', 'Check-out berhasil.');
    }

    private function assertScheduleCanCheckIn(?WorkSchedule $schedule): void
    {
        if (!$schedule) {
            throw ValidationException::withMessages([
                'photo' => 'Jadwal kerja hari ini belum tersedia.',
            ]);
        }

        if ($schedule->status === 'off') {
            throw ValidationException::withMessages([
                'photo' => 'Hari ini dijadwalkan OFF. Presensi tidak tersedia.',
            ]);
        }

        if ($schedule->status === 'holiday') {
            throw ValidationException::withMessages([
                'photo' => 'Hari ini hari libur. Presensi tidak tersedia.',
            ]);
        }
    }

    private function assertInsideGeofence(int $distance, ?int $radius): void
    {
        $limit = (int) ($radius ?? 0);

        if ($limit > 0 && $distance > $limit) {
            throw ValidationException::withMessages([
                'latitude' => "Lokasi di luar radius kantor ({$distance}m dari batas {$limit}m).",
            ]);
        }
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

    private function distanceMeters(float $lat1, float $lon1, float $lat2, float $lon2): int
    {
        $earthRadius = 6371000;
        $latDelta = deg2rad($lat2 - $lat1);
        $lonDelta = deg2rad($lon2 - $lon1);

        $a = sin($latDelta / 2) ** 2
            + cos(deg2rad($lat1)) * cos(deg2rad($lat2))
            * sin($lonDelta / 2) ** 2;
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return (int) round($earthRadius * $c);
    }
}
