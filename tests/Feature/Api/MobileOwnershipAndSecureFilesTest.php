<?php

use App\Models\AttendanceLog;
use App\Models\AttendancePhoto;
use App\Models\Company;
use App\Models\Employee;
use App\Models\PayrollPeriod;
use App\Models\Payslip;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

function createEmployeeUser(string $role, Company $company, string $code): array
{
    $user = User::factory()->create([
        'role' => $role,
    ]);

    $employee = Employee::create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'employee_code' => $code,
        'join_date' => '2026-01-01',
        'is_active' => true,
        'employment_status' => 'active',
    ]);

    return [$user, $employee];
}

test('secure attendance photo endpoint enforces ownership scope', function () {
    Storage::fake('local');

    $company = Company::create(['name' => 'Acme Secure']);
    [$ownerUser, $ownerEmployee] = createEmployeeUser('employee', $company, 'EMP-SEC-001');
    [$otherUser] = createEmployeeUser('employee', $company, 'EMP-SEC-002');

    $log = AttendanceLog::create([
        'employee_id' => $ownerEmployee->id,
        'work_date' => now()->toDateString(),
        'status' => 'present',
        'approval_status' => 'pending',
        'check_in_at' => now()->subHour(),
    ]);

    $path = 'attendance/'.$ownerEmployee->id.'/proof.jpg';
    Storage::disk('local')->put($path, 'dummy-content');

    $photo = AttendancePhoto::create([
        'attendance_log_id' => $log->id,
        'type' => 'check_in',
        'file_path' => $path,
        'mime' => 'image/jpeg',
        'size_bytes' => 100,
        'captured_at' => now()->subHour(),
    ]);

    Sanctum::actingAs($otherUser, ['mobile']);
    $this->get('/api/v1/secure-files/attendance-photos/'.$photo->id)
        ->assertForbidden();

    Sanctum::actingAs($ownerUser, ['mobile']);
    $this->get('/api/v1/secure-files/attendance-photos/'.$photo->id)
        ->assertOk();
});

test('employee cannot access other employee payslip detail', function () {
    $company = Company::create(['name' => 'Acme Payroll']);
    [$ownerUser, $ownerEmployee] = createEmployeeUser('employee', $company, 'EMP-PAY-001');
    [$otherUser] = createEmployeeUser('employee', $company, 'EMP-PAY-002');

    $period = PayrollPeriod::create([
        'company_id' => $company->id,
        'name' => 'Mar 2026',
        'start_date' => '2026-03-01',
        'end_date' => '2026-03-31',
        'pay_date' => '2026-04-01',
        'status' => 'closed',
    ]);

    $payslip = Payslip::create([
        'employee_id' => $ownerEmployee->id,
        'payroll_period_id' => $period->id,
        'gross_salary' => 10000000,
        'total_deductions' => 1250000,
        'net_salary' => 8750000,
        'status' => 'final',
        'issued_at' => now(),
    ]);

    Sanctum::actingAs($otherUser, ['mobile']);
    $this->getJson('/api/v1/employee/payslips/'.$payslip->id)
        ->assertForbidden();

    Sanctum::actingAs($ownerUser, ['mobile']);
    $this->getJson('/api/v1/employee/payslips/'.$payslip->id)
        ->assertOk()
        ->assertJsonPath('data.id', $payslip->id);
});
