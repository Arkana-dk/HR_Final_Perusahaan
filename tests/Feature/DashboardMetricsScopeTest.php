<?php

use App\Models\AttendanceLog;
use App\Models\Branch;
use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

function makeEmployee(User $user, Company $company, ?Branch $branch, string $code, array $overrides = []): Employee
{
    return Employee::create(array_merge([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'branch_id' => $branch?->id,
        'employee_code' => $code,
        'join_date' => '2026-01-01',
        'employment_status' => 'active',
        'employment_type' => 'permanent',
        'is_active' => true,
    ], $overrides));
}

it('scopes admin dashboard summary by admin branch and company', function () {
    $companyA = Company::create(['name' => 'Scope A']);
    $companyB = Company::create(['name' => 'Scope B']);

    $branchA1 = Branch::create([
        'company_id' => $companyA->id,
        'code' => 'A1',
        'name' => 'Branch A1',
    ]);
    $branchA2 = Branch::create([
        'company_id' => $companyA->id,
        'code' => 'A2',
        'name' => 'Branch A2',
    ]);
    $branchB1 = Branch::create([
        'company_id' => $companyB->id,
        'code' => 'B1',
        'name' => 'Branch B1',
    ]);

    $adminUser = User::factory()->create(['role' => 'admin']);
    $adminEmployee = makeEmployee($adminUser, $companyA, $branchA1, 'ADM-001');

    $inScopeUser = User::factory()->create(['role' => 'employee']);
    $inScopeEmployee = makeEmployee($inScopeUser, $companyA, $branchA1, 'EMP-A1-001');

    $otherBranchUser = User::factory()->create(['role' => 'employee']);
    $otherBranchEmployee = makeEmployee($otherBranchUser, $companyA, $branchA2, 'EMP-A2-001');

    $otherCompanyUser = User::factory()->create(['role' => 'employee']);
    $otherCompanyEmployee = makeEmployee($otherCompanyUser, $companyB, $branchB1, 'EMP-B1-001');

    AttendanceLog::create([
        'employee_id' => $inScopeEmployee->id,
        'work_date' => Carbon::today()->toDateString(),
        'check_in_at' => now(),
        'status' => 'present',
    ]);
    AttendanceLog::create([
        'employee_id' => $otherCompanyEmployee->id,
        'work_date' => Carbon::today()->toDateString(),
        'check_in_at' => now(),
        'status' => 'present',
    ]);
    AttendanceLog::create([
        'employee_id' => $otherBranchEmployee->id,
        'work_date' => Carbon::today()->toDateString(),
        'check_in_at' => now(),
        'status' => 'present',
    ]);

    $this->actingAs($adminUser)
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('summary.employees.total', 2)
            ->where('summary.attendance_today.checked_in', 1)
            ->where('summary.attendance_today.total', 1)
            ->where('employeeQuick.employees.0.id', $inScopeEmployee->id)
            ->etc());

    expect($adminEmployee->company_id)->toBe($companyA->id);
});

it('renders superadmin dashboard with dynamic metrics payload', function () {
    $superadmin = User::factory()->create(['role' => 'superadmin']);

    $this->actingAs($superadmin)
        ->get(route('superadmin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('superadmin/dashboard')
            ->has('summary')
            ->has('headcountData')
            ->has('attendanceData')
            ->has('approvals')
            ->has('criticalNotifications')
            ->etc());
});

it('renders employee dashboard with dynamic summary payload', function () {
    $company = Company::create(['name' => 'Employee Co']);

    $employeeUser = User::factory()->create(['role' => 'employee']);
    makeEmployee($employeeUser, $company, null, 'EMP-DASH-001');

    $this->actingAs($employeeUser)
        ->get(route('employee.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('employee/dashboard')
            ->has('summary')
            ->has('attendanceWeekly')
            ->has('leaveBalance')
            ->has('upcoming')
            ->has('reminders')
            ->etc());
});

