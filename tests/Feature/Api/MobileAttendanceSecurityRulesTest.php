<?php

use App\Models\AttendanceLog;
use App\Models\Company;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Models\Shift;
use App\Models\User;
use App\Models\WorkLocation;
use App\Models\WorkSchedule;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

function createMobileEmployeeContext(): array
{
    $company = Company::create([
        'name' => 'Acme Ops',
    ]);

    $user = User::factory()->create([
        'role' => 'employee',
    ]);

    $employee = Employee::create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'employee_code' => 'EMP-ATT-001',
        'join_date' => '2026-01-01',
        'is_active' => true,
        'employment_status' => 'active',
    ]);

    return [$user, $employee, $company];
}

function seedScheduleForDate(
    Employee $employee,
    Company $company,
    Carbon $workDate,
    array $shiftOverrides = [],
    array $locationOverrides = [],
): array {
    $workLocation = WorkLocation::create(array_merge([
        'company_id' => $company->id,
        'name' => 'HQ',
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'radius_meters' => 250,
        'is_active' => true,
    ], $locationOverrides));

    $shift = Shift::create(array_merge([
        'company_id' => $company->id,
        'name' => 'Regular Shift',
        'start_time' => '08:00',
        'end_time' => '17:00',
        'break_minutes' => 60,
        'grace_minutes' => 10,
        'is_overnight' => false,
        'is_active' => true,
    ], $shiftOverrides));

    $schedule = WorkSchedule::create([
        'employee_id' => $employee->id,
        'shift_id' => $shift->id,
        'work_location_id' => $workLocation->id,
        'work_date' => $workDate->toDateString(),
        'status' => 'scheduled',
    ]);

    return [$schedule, $shift, $workLocation];
}

afterEach(function () {
    Carbon::setTestNow();
});

test('employee check in is rejected when outside geofence radius', function () {
    Carbon::setTestNow(Carbon::create(2026, 3, 10, 9, 0, 0));
    [$user, $employee, $company] = createMobileEmployeeContext();
    seedScheduleForDate($employee, $company, Carbon::today(), [
        'start_time' => '08:00',
        'end_time' => '17:00',
    ], [
        'radius_meters' => 100,
    ]);

    Storage::fake('local');
    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/check-in', [
        'latitude' => -6.2100,
        'longitude' => 106.8450,
        'photo' => UploadedFile::fake()->image('selfie.jpg'),
    ], ['Accept' => 'application/json'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['latitude'])
        ->assertJsonPath('errors.latitude.0', 'Lokasi Anda berada di luar radius presensi.');
});

test('employee cannot check in without schedule when schedule is required', function () {
    [$user] = createMobileEmployeeContext();

    Storage::fake('local');
    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/check-in', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('selfie.jpg'),
    ], ['Accept' => 'application/json'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['photo'])
        ->assertJsonPath('errors.photo.0', 'Jadwal kerja hari ini belum tersedia.');
});

test('employee cannot check in too early before allowed window', function () {
    Carbon::setTestNow(Carbon::create(2026, 3, 10, 6, 45, 0));
    [$user, $employee, $company] = createMobileEmployeeContext();

    seedScheduleForDate($employee, $company, Carbon::today(), [
        'start_time' => '08:00',
        'end_time' => '17:00',
    ]);

    Storage::fake('local');
    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/check-in', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('selfie.jpg'),
    ], ['Accept' => 'application/json'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['photo']);
});

test('overnight shift can check out on the next day from open attendance log', function () {
    Carbon::setTestNow(Carbon::create(2026, 3, 10, 21, 45, 0));
    [$user, $employee, $company] = createMobileEmployeeContext();

    seedScheduleForDate($employee, $company, Carbon::today(), [
        'name' => 'Night Shift',
        'start_time' => '22:00',
        'end_time' => '06:00',
        'is_overnight' => true,
    ]);

    Storage::fake('local');
    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/check-in', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('night-in.jpg'),
        'device_id' => 'night-device-1',
    ], ['Accept' => 'application/json'])->assertOk();

    Carbon::setTestNow(Carbon::create(2026, 3, 11, 6, 5, 0));

    $this->post('/api/v1/employee/attendance/check-out', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('night-out.jpg'),
        'device_id' => 'night-device-1',
    ], ['Accept' => 'application/json'])
        ->assertOk()
        ->assertJsonPath('data.work_date', '2026-03-10');

    $log = AttendanceLog::query()->firstOrFail();
    expect($log->work_date->toDateString())->toBe('2026-03-10');
    expect($log->check_out_at?->toDateString())->toBe('2026-03-11');
});

test('approved leave blocks attendance check in', function () {
    [$user, $employee, $company] = createMobileEmployeeContext();

    $leaveType = LeaveType::create([
        'company_id' => $company->id,
        'code' => 'ANNUAL',
        'name' => 'Cuti Tahunan',
        'default_allocation' => 12,
        'is_active' => true,
    ]);

    LeaveRequest::create([
        'employee_id' => $employee->id,
        'leave_type_id' => $leaveType->id,
        'start_date' => Carbon::today()->toDateString(),
        'end_date' => Carbon::today()->toDateString(),
        'total_days' => 1,
        'status' => 'approved',
        'requested_at' => now()->subDay(),
        'approved_at' => now()->subHours(2),
    ]);

    Storage::fake('local');
    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/check-in', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('selfie.jpg'),
    ], ['Accept' => 'application/json'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['photo'])
        ->assertJsonPath('errors.photo.0', 'Anda memiliki cuti yang sudah disetujui pada tanggal ini.');
});
