<?php

use App\Models\Company;
use App\Models\Employee;
use App\Models\PayrollPeriod;
use App\Models\Payslip;
use App\Models\SalaryComponent;
use App\Models\User;

test('payroll regular process rejects inactive or terminated employee', function () {
    config([
        'hr.payroll.only_active_employee' => true,
    ]);

    $company = Company::create([
        'name' => 'Acme Payroll Guard',
    ]);

    $superadmin = User::factory()->create([
        'role' => 'superadmin',
    ]);

    $employeeUser = User::factory()->create([
        'role' => 'employee',
    ]);

    $employee = Employee::create([
        'user_id' => $employeeUser->id,
        'company_id' => $company->id,
        'employee_code' => 'EMP-TERM-001',
        'join_date' => '2025-01-01',
        'is_active' => false,
        'employment_status' => 'terminated',
    ]);

    $period = PayrollPeriod::create([
        'company_id' => $company->id,
        'name' => 'Mar 2026',
        'start_date' => '2026-03-01',
        'end_date' => '2026-03-31',
        'pay_date' => '2026-04-01',
        'status' => 'closed',
    ]);

    $component = SalaryComponent::create([
        'company_id' => $company->id,
        'code' => 'BASIC',
        'name' => 'Basic Salary',
        'type' => 'earning',
        'is_taxable' => true,
        'is_recurring' => true,
        'default_amount' => 10000000,
        'is_active' => true,
    ]);

    $this->actingAs($superadmin)
        ->postJson('/modules/payslips', [
            'employee_id' => $employee->id,
            'payroll_period_id' => $period->id,
            'status' => 'final',
            'items' => [
                [
                    'component_id' => $component->id,
                    'amount' => 10000000,
                ],
            ],
        ])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['employee_id']);

    $this->assertDatabaseCount('payslips', 0);
});
