<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\AttendanceLog;
use App\Models\AttendancePhoto;
use App\Models\WorkLocation;
use App\Models\WorkSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AttendanceController extends Controller
{
    use ResolvesEmployee;

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

        $log = AttendanceLog::with('photos')
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $today)
            ->first();

        return response()->json([
            'data' => [
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
                'can_check_in' => !$log || !$log->check_in_at,
                'can_check_out' => (bool) $log?->check_in_at && !$log?->check_out_at,
                'server_time' => now()->toDateTimeString(),
            ],
        ]);
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

        return response()->json([
            'data' => $logs->getCollection()
                ->map(fn (AttendanceLog $log) => $this->mapLog($log))
                ->values()
                ->all(),
            'meta' => [
                'current_page' => $logs->currentPage(),
                'last_page' => $logs->lastPage(),
                'per_page' => $logs->perPage(),
                'total' => $logs->total(),
            ],
        ]);
    }

    public function checkIn(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $data = $request->validate([
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'photo' => ['required', 'image', 'max:4096'],
        ]);

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

        $shift = $schedule?->shift;
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
        });

        $updated = AttendanceLog::with(['shift', 'workLocation', 'photos'])->findOrFail($log->id);

        return response()->json([
            'message' => 'Check-in berhasil.',
            'data' => $this->mapLog($updated),
        ]);
    }

    public function checkOut(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $data = $request->validate([
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'photo' => ['required', 'image', 'max:4096'],
        ]);

        $today = Carbon::today();
        $log = AttendanceLog::with(['shift', 'workLocation', 'photos'])
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $today)
            ->first();

        if (!$log || !$log->check_in_at) {
            throw ValidationException::withMessages([
                'photo' => 'Belum ada check-in hari ini.',
            ]);
        }

        if ($log->check_out_at) {
            throw ValidationException::withMessages([
                'photo' => 'Anda sudah melakukan check-out hari ini.',
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
        }

        $overtimeMinutes = 0;
        if ($shift) {
            $shiftStart = Carbon::parse($today->toDateString().' '.$shift->start_time);
            $shiftEnd = Carbon::parse($today->toDateString().' '.$shift->end_time);

            if ($shift->is_overnight && $shiftEnd->lessThanOrEqualTo($shiftStart)) {
                $shiftEnd->addDay();
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
            $request
        ) {
            $log->update([
                'check_out_at' => $checkOutAt,
                'check_out_latitude' => $data['latitude'],
                'check_out_longitude' => $data['longitude'],
                'check_out_distance_meters' => $distance,
                'check_out_method' => 'gps_selfie',
                'check_out_ip' => $request->ip(),
                'overtime_minutes' => $overtimeMinutes,
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
        });

        $updated = AttendanceLog::with(['shift', 'workLocation', 'photos'])->findOrFail($log->id);

        return response()->json([
            'message' => 'Check-out berhasil.',
            'data' => $this->mapLog($updated),
        ]);
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
