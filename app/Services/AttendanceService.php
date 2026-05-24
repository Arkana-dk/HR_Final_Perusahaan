<?php

namespace App\Services;

use App\Models\AttendanceLog;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\Shift;
use App\Models\WorkLocation;
use App\Models\WorkSchedule;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

class AttendanceService
{
    public function resolveTodaySchedule(Employee $employee, ?Carbon $date = null): ?WorkSchedule
    {
        $targetDate = ($date ?? Carbon::today())->toDateString();

        return WorkSchedule::with(['shift', 'workLocation'])
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $targetDate)
            ->first();
    }

    public function resolveWorkLocation(Employee $employee, ?WorkSchedule $schedule): ?WorkLocation
    {
        if ($schedule?->workLocation) {
            return $schedule->workLocation;
        }

        if (!config('hr.attendance.allow_fallback_work_location', false)) {
            return null;
        }

        return WorkLocation::query()
            ->where('company_id', $employee->company_id)
            ->where('is_active', true)
            ->orderBy('id')
            ->first();
    }

    public function assertScheduleAvailableForAttendance(?WorkSchedule $schedule): void
    {
        if (!config('hr.attendance.require_schedule', true)) {
            return;
        }

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

    public function assertNoApprovedLeave(Employee $employee, Carbon $date): void
    {
        $hasApprovedLeave = LeaveRequest::query()
            ->where('employee_id', $employee->id)
            ->where('status', 'approved')
            ->whereDate('start_date', '<=', $date->toDateString())
            ->whereDate('end_date', '>=', $date->toDateString())
            ->exists();

        if ($hasApprovedLeave) {
            throw ValidationException::withMessages([
                'photo' => 'Anda memiliki cuti yang sudah disetujui pada tanggal ini.',
            ]);
        }
    }

    public function assertShiftAvailable(?Shift $shift): void
    {
        if ($shift) {
            return;
        }

        throw ValidationException::withMessages([
            'photo' => 'Shift kerja hari ini belum diatur. Hubungi HR/admin.',
        ]);
    }

    public function assertCheckInWindow(Carbon $checkInAt, Carbon $workDate, Shift $shift): void
    {
        $shiftStart = Carbon::parse($workDate->toDateString().' '.$shift->start_time);
        $earlyWindowMinutes = max(0, (int) config('hr.attendance.early_check_in_limit_minutes', 30));

        $earliestAllowed = $shiftStart->copy()->subMinutes($earlyWindowMinutes);
        if ($checkInAt->lt($earliestAllowed)) {
            throw ValidationException::withMessages([
                'photo' => sprintf(
                    'Check-in terlalu awal. Anda bisa check-in maksimal %d menit sebelum shift dimulai.',
                    $earlyWindowMinutes,
                ),
            ]);
        }

        if ($shift->check_in_cutoff_time) {
            $cutoffAt = Carbon::parse($workDate->toDateString().' '.$shift->check_in_cutoff_time);
            if ($checkInAt->gt($cutoffAt)) {
                throw ValidationException::withMessages([
                    'photo' => 'Batas absen masuk sudah terlewati.',
                ]);
            }
        }
    }

    public function checkOutEvaluation(AttendanceLog $log, Carbon $checkOutAt, ?string $earlyLeaveReason): array
    {
        $shift = $log->shift;
        $isEarlyLeave = false;
        $overtimeMinutes = 0;
        $reason = trim((string) ($earlyLeaveReason ?? ''));

        if (!$shift) {
            return [
                'is_early_leave' => false,
                'overtime_minutes' => 0,
                'early_leave_reason' => null,
            ];
        }

        $workDate = Carbon::parse($log->work_date);
        $shiftStart = Carbon::parse($workDate->toDateString().' '.$shift->start_time);
        $shiftEnd = Carbon::parse($workDate->toDateString().' '.$shift->end_time);

        if ($shift->is_overnight && $shiftEnd->lessThanOrEqualTo($shiftStart)) {
            $shiftEnd->addDay();
        }

        if ($shift->check_out_cutoff_time) {
            $cutoffAt = Carbon::parse($workDate->toDateString().' '.$shift->check_out_cutoff_time);
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
            if (!config('hr.attendance.allow_early_checkout', true)) {
                throw ValidationException::withMessages([
                    'photo' => 'Check-out sebelum jam pulang tidak diizinkan.',
                ]);
            }

            if ($reason === '') {
                throw ValidationException::withMessages([
                    'early_leave_reason' => 'Pulang sebelum jadwal wajib isi alasan.',
                ]);
            }

            $isEarlyLeave = true;
        }

        if ($checkOutAt->gt($shiftEnd)) {
            $overtimeMinutes = $shiftEnd->diffInMinutes($checkOutAt);
        }

        return [
            'is_early_leave' => $isEarlyLeave,
            'overtime_minutes' => $overtimeMinutes,
            'early_leave_reason' => $isEarlyLeave ? $reason : null,
        ];
    }

    public function resolveOpenAttendanceLog(Employee $employee): ?AttendanceLog
    {
        return AttendanceLog::query()
            ->where('employee_id', $employee->id)
            ->whereNotNull('check_in_at')
            ->whereNull('check_out_at')
            ->orderByDesc('check_in_at')
            ->first();
    }

    public function calculateDistanceMeters(float $lat1, float $lon1, float $lat2, float $lon2): int
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

    public function assertInsideGeofence(?WorkLocation $workLocation, int $distance): void
    {
        if (!$workLocation || !config('hr.attendance.enforce_geofence', true)) {
            return;
        }

        $limit = (int) ($workLocation->radius_meters ?? 0);
        if ($limit > 0 && $distance > $limit) {
            throw ValidationException::withMessages([
                'latitude' => 'Lokasi Anda berada di luar radius presensi.',
            ]);
        }
    }
}
