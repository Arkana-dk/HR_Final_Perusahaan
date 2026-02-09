<?php

use App\Models\Company;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Models\OvertimeRequest;
use App\Models\PayrollPeriod;
use App\Models\Payslip;
use App\Models\ReimburseRequest;
use App\Models\User;
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
    [$user, $employee] = seedMobileEmployeeContext();
    Storage::fake('public');
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

    $this->assertDatabaseHas('attendance_logs', [
        'employee_id' => $employee->id,
        'work_date' => now()->startOfDay()->toDateTimeString(),
        'approval_status' => 'pending',
    ]);

    $photoPath = \App\Models\AttendancePhoto::query()->firstOrFail()->file_path;
    Storage::disk('public')->assertExists($photoPath);
});

test('employee can create overtime request via mobile api', function () {
    [$user, $employee] = seedMobileEmployeeContext();
    Sanctum::actingAs($user, ['mobile']);

    $this->postJson('/api/v1/employee/overtime/requests', [
        'work_date' => '2026-02-09',
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
