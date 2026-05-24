<?php

use App\Models\Company;
use App\Models\AttendanceLog;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Models\OvertimeRequest;
use App\Models\PayrollPeriod;
use App\Models\Payslip;
use App\Models\ReimburseRequest;
use App\Models\Shift;
use App\Models\SystemNotification;
use App\Models\User;
use App\Models\WorkLocation;
use App\Models\WorkSchedule;
use Illuminate\Support\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

function seedMobileEmployeeContext(): array
{
    $company = Company::create([
        'name' => 'Acme Mobile',
    ]);

    $user = User::factory()->create([
        'role' => 'employee',
    ]);

    $employee = Employee::create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'employee_code' => 'EMP-MOB-001',
        'join_date' => '2026-01-01',
    ]);

    return [$user, $employee, $company];
}

function seedTodayAttendanceSchedule(
    Employee $employee,
    Company $company,
    ?array $shiftOverrides = null,
    ?Carbon $workDate = null,
): void
{
    $targetDate = ($workDate ?? Carbon::today())->toDateString();

    $workLocation = WorkLocation::create([
        'company_id' => $company->id,
        'name' => 'Head Office',
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'radius_meters' => 250,
        'is_active' => true,
    ]);

    $shift = Shift::create(array_merge([
        'company_id' => $company->id,
        'name' => 'Regular Shift',
        'start_time' => '08:00',
        'end_time' => '17:00',
        'break_minutes' => 60,
        'grace_minutes' => 10,
        'is_overnight' => false,
        'is_active' => true,
    ], $shiftOverrides ?? []));

    WorkSchedule::create([
        'employee_id' => $employee->id,
        'shift_id' => $shift->id,
        'work_location_id' => $workLocation->id,
        'work_date' => $targetDate,
        'status' => 'scheduled',
    ]);
}

test('mobile login returns sanctum token and me endpoint returns employee payload', function () {
    [$user] = seedMobileEmployeeContext();

    $response = $this->postJson('/api/v1/auth/login', [
        'email' => $user->email,
        'password' => 'password',
        'device_name' => 'android-test',
    ]);

    $response->assertOk()
        ->assertJsonPath('data.user.id', $user->id)
        ->assertJsonPath('data.user.has_employee_profile', true)
        ->assertJsonStructure([
            'data' => [
                'token',
                'token_type',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'role',
                    'has_employee_profile',
                ],
            ],
        ]);

    $token = $response->json('data.token');

    $this->withHeader('Authorization', 'Bearer '.$token)
        ->getJson('/api/v1/auth/me')
        ->assertOk()
        ->assertJsonPath('data.id', $user->id);
});

test('employee api endpoints require authentication', function () {
    $this->getJson('/api/v1/employee/dashboard')
        ->assertUnauthorized();
});

test('employee can create leave request via mobile api and approval steps are generated', function () {
    [$user, $employee, $company] = seedMobileEmployeeContext();

    $leaveType = LeaveType::create([
        'company_id' => $company->id,
        'code' => 'ANNUAL',
        'name' => 'Cuti Tahunan',
        'is_active' => true,
    ]);

    Sanctum::actingAs($user, ['mobile']);

    $this->postJson('/api/v1/employee/leave/requests', [
        'leave_type_id' => $leaveType->id,
        'start_date' => '2026-03-20',
        'end_date' => '2026-03-21',
        'reason' => 'Keperluan keluarga',
    ])
        ->assertCreated()
        ->assertJsonPath('data.status', 'pending');

    $leaveRequest = LeaveRequest::query()->firstOrFail();

    $this->assertDatabaseHas('leave_requests', [
        'id' => $leaveRequest->id,
        'employee_id' => $employee->id,
        'status' => 'pending',
    ]);

    $this->assertDatabaseHas('approvals', [
        'approvable_type' => LeaveRequest::class,
        'approvable_id' => $leaveRequest->id,
        'requested_by_user_id' => $user->id,
        'current_step' => 1,
    ]);

    $this->assertDatabaseHas('approval_steps', [
        'step' => 1,
        'status' => 'pending',
    ]);
    $this->assertDatabaseHas('approval_steps', [
        'step' => 2,
        'status' => 'pending',
    ]);
});

test('employee can check in via mobile api', function () {
    [$user, $employee, $company] = seedMobileEmployeeContext();
    $now = Carbon::now();
    seedTodayAttendanceSchedule($employee, $company, [
        'start_time' => $now->copy()->subMinutes(10)->format('H:i'),
        'end_time' => $now->copy()->addHours(8)->format('H:i'),
    ]);

    Storage::fake('local');
    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/check-in', [
        'latitude' => -6.1751,
        'longitude' => 106.865,
        'photo' => UploadedFile::fake()->image('selfie.jpg'),
    ], [
        'Accept' => 'application/json',
    ])
        ->assertOk()
        ->assertJsonPath('message', 'Check-in berhasil.');

    expect(
        AttendanceLog::query()
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', now()->toDateString())
            ->where('approval_status', 'pending')
            ->exists()
    )->toBeTrue();

    $photoPath = \App\Models\AttendancePhoto::query()->firstOrFail()->file_path;
    Storage::disk('local')->assertExists($photoPath);
});

test('employee cannot check out before shift end without early leave reason', function () {
    [$user, $employee, $company] = seedMobileEmployeeContext();

    $now = Carbon::now();
    seedTodayAttendanceSchedule($employee, $company, [
        'start_time' => $now->copy()->subHour()->format('H:i'),
        'end_time' => $now->copy()->addHours(3)->format('H:i'),
    ]);

    Storage::fake('local');
    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/check-in', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('selfie-in.jpg'),
        'device_id' => 'android-device-1',
    ], [
        'Accept' => 'application/json',
    ])->assertOk();

    $this->post('/api/v1/employee/attendance/check-out', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('selfie-out.jpg'),
        'device_id' => 'android-device-1',
    ], [
        'Accept' => 'application/json',
    ])->assertStatus(422)
        ->assertJsonValidationErrors(['early_leave_reason']);
});

test('employee can check out early with reason and marked pending approval', function () {
    [$user, $employee, $company] = seedMobileEmployeeContext();

    $now = Carbon::now();
    seedTodayAttendanceSchedule($employee, $company, [
        'start_time' => $now->copy()->subHour()->format('H:i'),
        'end_time' => $now->copy()->addHours(3)->format('H:i'),
    ]);

    Storage::fake('local');
    Sanctum::actingAs($user, ['mobile']);

    $this->post('/api/v1/employee/attendance/check-in', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('selfie-in.jpg'),
        'device_id' => 'android-device-1',
    ], [
        'Accept' => 'application/json',
    ])->assertOk();

    $this->post('/api/v1/employee/attendance/check-out', [
        'latitude' => -6.1751,
        'longitude' => 106.8650,
        'photo' => UploadedFile::fake()->image('selfie-out.jpg'),
        'device_id' => 'android-device-1',
        'early_leave_reason' => 'Perlu kontrol ke dokter',
    ], [
        'Accept' => 'application/json',
    ])->assertOk()
        ->assertJsonPath('data.is_early_leave', true)
        ->assertJsonPath('data.approval_status', 'pending');
});

test('employee can create overtime request via mobile api', function () {
    [$user, $employee, $company] = seedMobileEmployeeContext();
    $workDate = Carbon::create(2026, 2, 9);
    seedTodayAttendanceSchedule($employee, $company, [
        'start_time' => '09:00',
        'end_time' => '17:00',
    ], $workDate);

    Sanctum::actingAs($user, ['mobile']);

    $this->postJson('/api/v1/employee/overtime/requests', [
        'work_date' => $workDate->toDateString(),
        'start_time' => '18:00',
        'end_time' => '21:30',
        'reason' => 'Deploy malam',
    ])
        ->assertCreated()
        ->assertJsonPath('data.status', 'pending')
        ->assertJsonPath('data.total_hours', 3.5);

    $this->assertDatabaseHas('overtime_requests', [
        'employee_id' => $employee->id,
        'status' => 'pending',
    ]);
});

test('employee can create reimburse request via mobile api', function () {
    [$user, $employee] = seedMobileEmployeeContext();
    Sanctum::actingAs($user, ['mobile']);

    $this->postJson('/api/v1/employee/reimburse/requests', [
        'category' => 'transport',
        'title' => 'Taxi client meeting',
        'amount' => 125000,
        'currency' => 'idr',
        'description' => 'Perjalanan meeting client',
    ])
        ->assertCreated()
        ->assertJsonPath('data.status', 'pending')
        ->assertJsonPath('data.currency', 'IDR');

    $this->assertDatabaseHas('reimburse_requests', [
        'employee_id' => $employee->id,
        'status' => 'pending',
        'currency' => 'IDR',
    ]);
});

test('employee can read latest payslip via mobile api', function () {
    [$user, $employee, $company] = seedMobileEmployeeContext();
    Sanctum::actingAs($user, ['mobile']);

    $period = PayrollPeriod::create([
        'company_id' => $company->id,
        'name' => 'Feb 2026',
        'start_date' => '2026-02-01',
        'end_date' => '2026-02-28',
        'pay_date' => '2026-03-01',
        'status' => 'closed',
    ]);

    Payslip::create([
        'employee_id' => $employee->id,
        'payroll_period_id' => $period->id,
        'gross_salary' => 10000000,
        'total_deductions' => 1250000,
        'net_salary' => 8750000,
        'status' => 'final',
        'issued_at' => now(),
    ]);

    $this->getJson('/api/v1/employee/payslips/latest')
        ->assertOk()
        ->assertJsonPath('data.latest.status', 'final')
        ->assertJsonPath('data.latest.period.name', 'Feb 2026');
});

test('employee can read and mark notifications via mobile api', function () {
    [$user] = seedMobileEmployeeContext();
    Sanctum::actingAs($user, ['mobile']);

    $notification = SystemNotification::create([
        'user_id' => $user->id,
        'title' => 'Pengajuan Baru',
        'message' => 'Ada pengajuan cuti baru untuk ditinjau.',
        'type' => 'leave.request.created',
    ]);

    $this->getJson('/api/v1/notifications')
        ->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonPath('meta.unread_count', 1);

    $this->postJson('/api/v1/notifications/'.$notification->id.'/read')
        ->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.is_read', true);

    $this->getJson('/api/v1/notifications/unread-count')
        ->assertOk()
        ->assertJsonPath('data.unread_count', 0);
});
