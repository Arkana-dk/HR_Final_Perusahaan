<?php

use App\Models\Announcement;
use App\Models\AttendanceLog;
use App\Models\Company;
use App\Models\Employee;
use App\Models\OvertimeRequest;
use App\Models\User;
use App\Models\UserDevice;
use App\Models\WorkLocation;
use App\Models\WorkSchedule;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

function seedManagerAndDirectReport(): array
{
    $company = Company::create([
        'name' => 'Approval Corp',
    ]);

    $managerUser = User::factory()->create([
        'role' => 'manager',
    ]);

    $managerEmployee = Employee::create([
        'user_id' => $managerUser->id,
        'company_id' => $company->id,
        'employee_code' => 'MGR-001',
        'join_date' => '2026-01-01',
    ]);

    $employeeUser = User::factory()->create([
        'role' => 'employee',
    ]);

    $employee = Employee::create([
        'user_id' => $employeeUser->id,
        'company_id' => $company->id,
        'manager_id' => $managerEmployee->id,
        'employee_code' => 'EMP-001',
        'join_date' => '2026-01-05',
    ]);

    return [$company, $managerUser, $managerEmployee, $employeeUser, $employee];
}

test('employee can create attendance correction via mobile api', function () {
    [$company, $managerUser, $managerEmployee, $user, $employee] = seedManagerAndDirectReport();

    Storage::fake('public');

    $workLocation = WorkLocation::create([
        'company_id' => $company->id,
        'name' => 'Main Office',
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'radius_meters' => 250,
        'is_active' => true,
    ]);

    WorkSchedule::create([
        'employee_id' => $employee->id,
        'work_location_id' => $workLocation->id,
        'work_date' => now()->toDateString(),
        'status' => 'scheduled',
    ]);

    AttendanceLog::create([
        'employee_id' => $employee->id,
        'work_date' => now()->toDateString(),
        'check_in_at' => now()->copy()->setTime(9, 0),
        'check_out_at' => now()->copy()->setTime(17, 0),
        'status' => 'present',
        'approval_status' => 'approved',
        'check_in_method' => 'manual',
        'check_out_method' => 'manual',
    ]);

    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/corrections', [
        'work_date' => now()->toDateString(),
        'requested_check_in_time' => '08:45',
        'requested_check_out_time' => '17:15',
        'reason' => 'Koreksi karena keterlambatan sinkronisasi mesin.',
        'attachment' => UploadedFile::fake()->image('proof.jpg'),
    ], [
        'Accept' => 'application/json',
    ])
        ->assertCreated()
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.status', 'pending');

    $this->assertDatabaseHas('attendance_corrections', [
        'employee_id' => $employee->id,
        'status' => 'pending',
    ]);
    $this->assertDatabaseHas('approvals', [
        'approvable_type' => \App\Models\AttendanceCorrection::class,
        'requested_by_user_id' => $user->id,
    ]);
});

test('manager can list and approve subordinate overtime from mobile approvals endpoint', function () {
    [$company, $managerUser, $managerEmployee, $employeeUser, $employee] = seedManagerAndDirectReport();

    $request = OvertimeRequest::create([
        'employee_id' => $employee->id,
        'work_date' => '2026-05-20',
        'start_time' => '18:00',
        'end_time' => '21:00',
        'total_hours' => 3,
        'status' => 'pending',
        'requested_at' => Carbon::parse('2026-05-20 17:30:00'),
    ]);

    Sanctum::actingAs($managerUser, ['mobile']);

    $this->getJson('/api/v1/approvals/pending?type=overtime')
        ->assertOk()
        ->assertJsonPath('success', true);

    $this->postJson("/api/v1/approvals/overtime/{$request->id}/approve")
        ->assertOk()
        ->assertJsonPath('data.status', 'approved');

    $this->assertDatabaseHas('overtime_requests', [
        'id' => $request->id,
        'status' => 'approved',
    ]);
});

test('mobile user can register and unregister device token', function () {
    $user = User::factory()->create([
        'role' => 'employee',
    ]);

    Sanctum::actingAs($user, ['mobile']);

    $this->postJson('/api/v1/devices/register', [
        'platform' => 'android',
        'device_name' => 'Pixel QA',
        'device_id' => 'device-xyz',
        'push_token' => 'push-token-123',
    ])
        ->assertCreated()
        ->assertJsonPath('data.is_active', true);

    $this->assertDatabaseHas('user_devices', [
        'user_id' => $user->id,
        'push_token' => 'push-token-123',
        'is_active' => true,
    ]);

    $this->postJson('/api/v1/devices/unregister', [
        'push_token' => 'push-token-123',
    ])
        ->assertOk()
        ->assertJsonPath('data.is_active', false);

    $this->assertDatabaseHas('user_devices', [
        'user_id' => $user->id,
        'push_token' => 'push-token-123',
        'is_active' => false,
    ]);
});

test('admin can create announcement and employee can read active announcements', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);
    $employee = User::factory()->create([
        'role' => 'employee',
    ]);

    Sanctum::actingAs($admin, ['mobile']);

    $this->postJson('/api/v1/announcements', [
        'title' => 'Maintenance Payroll',
        'content' => 'Sistem payroll maintenance Sabtu 20:00-22:00.',
        'published_at' => now()->toDateTimeString(),
        'audience_roles' => ['employee'],
        'is_active' => true,
    ])
        ->assertCreated()
        ->assertJsonPath('data.title', 'Maintenance Payroll');

    expect(Announcement::query()->count())->toBe(1);

    Sanctum::actingAs($employee, ['mobile']);
    $this->getJson('/api/v1/announcements')
        ->assertOk()
        ->assertJsonPath('success', true);
});

