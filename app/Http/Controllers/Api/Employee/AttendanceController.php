<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\AttendanceLog;
use App\Models\AttendancePhoto;
use App\Models\WorkLocation;
use App\Models\WorkSchedule;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AttendanceController extends Controller
{
    use ApiResponse;
    use ResolvesEmployee;

    public function __construct(
        private readonly AuditLogService $auditLogService,
        private readonly NotificationService $notificationService,
    ) {
    }

    public function today(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $today = Carbon::today();

        $schedule = WorkSchedule::with(['shift', 'workLocation'])
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $today)
            ->first();

        $workLocation = $schedule?->workLocation
            ?? WorkLocation::query()
                ->where('company_id', $employee->company_id)
                ->where('is_active', true)
                ->orderBy('id')
                ->first();

        $openLog = AttendanceLog::with(['shift', 'workLocation', 'photos'])
            ->where('employee_id', $employee->id)
            ->whereNotNull('check_in_at')
            ->whereNull('check_out_at')
            ->orderByDesc('check_in_at')
            ->first();

        $todayLog = AttendanceLog::with(['shift', 'workLocation', 'photos'])
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $today)
            ->first();
        $log = $openLog ?? $todayLog;

        return $this->successResponse([
                'employee' => [
                    'id' => $employee->id,
                    'employee_code' => $employee->employee_code,
                    'name' => $request->user()->name,
                ],
                'date' => $today->toDateString(),
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
                'work_location' => $workLocation
                    ? [
                        'name' => $workLocation->name,
                        'latitude' => (float) $workLocation->latitude,
                        'longitude' => (float) $workLocation->longitude,
                        'radius_meters' => $workLocation->radius_meters,
                    ]
                    : null,
                'log' => $log ? $this->mapLog($log) : null,
                'can_check_in' => !$openLog && (!$todayLog || !$todayLog->check_in_at),
                'can_check_out' => (bool) $log?->check_in_at && !$log?->check_out_at,
                'server_time' => now()->toDateTimeString(),
            ],
            'Presensi hari ini berhasil diambil.',
        );
    }

    public function history(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $filters = $request->validate([
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'status' => ['nullable', 'string', 'max:30'],
            'approval_status' => ['nullable', 'string', 'max:30'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = AttendanceLog::with(['shift', 'workLocation', 'photos'])
            ->where('employee_id', $employee->id)
            ->orderByDesc('work_date')
            ->orderByDesc('check_in_at');

        if (!empty($filters['from'])) {
            $query->whereDate('work_date', '>=', $filters['from']);
        }

        if (!empty($filters['to'])) {
            $query->whereDate('work_date', '<=', $filters['to']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['approval_status'])) {
            $query->where('approval_status', $filters['approval_status']);
        }

        $perPage = (int) ($filters['per_page'] ?? 10);
        $logs = $query->paginate($perPage)->withQueryString();

        return $this->successResponse(
            $logs->getCollection()
                ->map(fn (AttendanceLog $log) => $this->mapLog($log))
                ->values()
                ->all(),
            'Riwayat presensi berhasil diambil.',
            200,
            [
                'current_page' => $logs->currentPage(),
                'last_page' => $logs->lastPage(),
                'per_page' => $logs->perPage(),
                'total' => $logs->total(),
            ],
        );
    }

    public function checkIn(Request $request)
    {
        $employee = $this->resolveEmployee($request);
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
            ?? WorkLocation::query()
                ->where('company_id', $employee->company_id)
                ->where('is_active', true)
                ->orderBy('id')
                ->first();

        $shift = $schedule?->shift;
        if (!$shift) {
            throw ValidationException::withMessages([
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
            throw ValidationException::withMessages([
                'photo' => 'Masih ada sesi presensi sebelumnya yang belum check-out.',
            ]);
        }

        $checkInAt = Carbon::now();

        $log = AttendanceLog::firstOrNew([
            'employee_id' => $employee->id,
            'work_date' => $today->toDateString(),
        ]);

        if ($log->check_in_at) {
            throw ValidationException::withMessages([
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
                    throw ValidationException::withMessages([
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
                (float) $data['latitude'],
                (float) $data['longitude'],
                (float) $workLocation->latitude,
                (float) $workLocation->longitude,
            );

            $this->assertInsideGeofence($distance, $workLocation->radius_meters);
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

        $updated = AttendanceLog::with(['shift', 'workLocation', 'photos'])->findOrFail($log->id);
        if ($updated->status === 'late') {
            $employee->loadMissing('manager');

            $reference = $this->notificationService->buildReference($updated);
            $this->notificationService->notifyApprovalAudience($employee, [
                ...$reference,
                'type' => 'attendance.late',
                'title' => 'Karyawan Terlambat',
                'message' => sprintf(
                    '%s terlambat check-in %d menit pada %s.',
                    $request->user()->name,
                    (int) $updated->late_minutes,
                    Carbon::parse($updated->work_date)->format('Y-m-d'),
                ),
                'meta' => [
                    'employee_id' => $employee->id,
                    'attendance_log_id' => $updated->id,
                ],
            ]);
        }

        return $this->successResponse(
            $this->mapLog($updated),
            'Check-in berhasil.',
        );
    }

    public function checkOut(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $data = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'photo' => ['required', 'image', 'max:4096'],
            'early_leave_reason' => ['nullable', 'string', 'max:500'],
            'device_id' => ['nullable', 'string', 'max:191'],
        ]);

        $log = AttendanceLog::with(['shift', 'workLocation', 'photos'])
            ->where('employee_id', $employee->id)
            ->whereNotNull('check_in_at')
            ->whereNull('check_out_at')
            ->orderByDesc('check_in_at')
            ->first();

        if (!$log || !$log->check_in_at) {
            throw ValidationException::withMessages([
                'photo' => 'Belum ada sesi check-in aktif.',
            ]);
        }

        if ($log->check_out_at) {
            throw ValidationException::withMessages([
                'photo' => 'Anda sudah melakukan check-out hari ini.',
            ]);
        }

        $resolvedDeviceId = $this->resolveDeviceId($request, $data);
        if ($log->check_in_device_id && $resolvedDeviceId && $log->check_in_device_id !== $resolvedDeviceId) {
            throw ValidationException::withMessages([
                'device_id' => 'Perangkat check-out harus sama dengan perangkat check-in.',
            ]);
        }

        $checkOutAt = Carbon::now();
        $shift = $log->shift;
        $workLocation = $log->workLocation;

        $distance = null;
        if ($workLocation && $workLocation->latitude && $workLocation->longitude) {
            $distance = $this->distanceMeters(
                (float) $data['latitude'],
                (float) $data['longitude'],
                (float) $workLocation->latitude,
                (float) $workLocation->longitude,
            );

            $this->assertInsideGeofence($distance, $workLocation->radius_meters);
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
                    throw ValidationException::withMessages([
                        'photo' => 'Batas absen pulang sudah terlewati.',
                    ]);
                }
            }

            if ($checkOutAt->lt($shiftEnd)) {
                if ($earlyLeaveReason === '') {
                    throw ValidationException::withMessages([
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

        $updated = AttendanceLog::with(['shift', 'workLocation', 'photos'])->findOrFail($log->id);
        if ($isEarlyLeave) {
            $employee->loadMissing('manager');

            $reference = $this->notificationService->buildReference($updated);
            $this->notificationService->notifyApprovalAudience($employee, [
                ...$reference,
                'type' => 'attendance.early_leave_request',
                'title' => 'Pengajuan Pulang Cepat',
                'message' => sprintf(
                    '%s mengajukan pulang cepat pada %s: %s',
                    $request->user()->name,
                    Carbon::parse($updated->work_date)->format('Y-m-d'),
                    $earlyLeaveReason,
                ),
                'meta' => [
                    'employee_id' => $employee->id,
                    'attendance_log_id' => $updated->id,
                ],
            ]);
        }

        return $this->successResponse(
            $this->mapLog($updated),
            'Check-out berhasil.',
        );
    }

    private function mapLog(AttendanceLog $log): array
    {
        return [
            'id' => $log->id,
            'work_date' => optional($log->work_date)->toDateString(),
            'status' => $log->status,
            'approval_status' => $log->approval_status,
            'check_in_at' => optional($log->check_in_at)?->toDateTimeString(),
            'check_out_at' => optional($log->check_out_at)?->toDateTimeString(),
            'check_in_distance_meters' => $log->check_in_distance_meters,
            'check_out_distance_meters' => $log->check_out_distance_meters,
            'late_minutes' => $log->late_minutes,
            'overtime_minutes' => $log->overtime_minutes,
            'is_early_leave' => (bool) $log->is_early_leave,
            'early_leave_reason' => $log->early_leave_reason,
            'attendance_state' => $this->attendanceState($log),
            'shift' => $log->shift
                ? [
                    'id' => $log->shift->id,
                    'name' => $log->shift->name,
                    'start_time' => $log->shift->start_time,
                    'end_time' => $log->shift->end_time,
                ]
                : null,
            'work_location' => $log->workLocation
                ? [
                    'id' => $log->workLocation->id,
                    'name' => $log->workLocation->name,
                ]
                : null,
            'photos' => $log->photos->map(fn ($photo) => [
                'id' => $photo->id,
                'type' => $photo->type,
                'file_path' => $photo->file_path,
                'url' => Storage::disk('public')->url($photo->file_path),
                ])->values()->all(),
        ];
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

    private function attendanceState(AttendanceLog $log): string
    {
        if ($log->is_early_leave && $log->approval_status === 'pending') {
            return 'early_leave_pending';
        }

        if ($log->is_early_leave && $log->approval_status === 'approved') {
            return 'early_leave_approved';
        }

        if ($log->is_early_leave && $log->approval_status === 'rejected') {
            return 'early_leave_rejected';
        }

        return (string) $log->status;
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
