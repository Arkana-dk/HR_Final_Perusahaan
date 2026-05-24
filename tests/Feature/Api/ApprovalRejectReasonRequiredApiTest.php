<?php

use App\Models\AttendanceLog;
use App\Models\Company;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Models\OvertimeRequest;
use App\Models\ReimburseRequest;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

test('reject approval api requires notes for critical request types', function () {
    $company = Company::create([
        'name' => 'Acme Approval',
    ]);

    $employeeUser = User::factory()->create([
        'role' => 'employee',
    ]);
    $approver = User::factory()->create([
        'role' => 'superadmin',
    ]);

    $employee = Employee::create([
        'user_id' => $employeeUser->id,
        'company_id' => $company->id,
        'employee_code' => 'EMP-APR-001',
        'join_date' => '2026-01-01',
        'is_active' => true,
        'employment_status' => 'active',
    ]);

    $leaveType = LeaveType::create([
        'company_id' => $company->id,
        'code' => 'ANNUAL',
        'name' => 'Cuti Tahunan',
        'default_allocation' => 12,
        'is_active' => true,
    ]);

    $leave = LeaveRequest::create([
        'employee_id' => $employee->id,
        'leave_type_id' => $leaveType->id,
        'start_date' => '2026-03-20',
        'end_date' => '2026-03-20',
        'total_days' => 1,
        'status' => 'pending',
        'requested_at' => now()->subDay(),
    ]);

    $overtime = OvertimeRequest::create([
        'employee_id' => $employee->id,
        'work_date' => '2026-03-20',
        'start_time' => '18:00',
        'end_time' => '20:00',
        'total_hours' => 2,
        'status' => 'pending',
        'requested_at' => now()->subDay(),
    ]);

    $reimburse = ReimburseRequest::create([
        'employee_id' => $employee->id,
        'category' => 'transport',
        'title' => 'Taxi',
        'amount' => 120000,
        'currency' => 'IDR',
        'status' => 'pending',
        'requested_at' => now()->subDay(),
    ]);

    $attendance = AttendanceLog::create([
        'employee_id' => $employee->id,
        'work_date' => now()->toDateString(),
        'status' => 'late',
        'approval_status' => 'pending',
        'check_in_at' => now()->subHours(6),
    ]);

    Sanctum::actingAs($approver, ['mobile']);

    $cases = [
        ['type' => 'leave', 'id' => $leave->id],
        ['type' => 'overtime', 'id' => $overtime->id],
        ['type' => 'reimburse', 'id' => $reimburse->id],
        ['type' => 'attendance', 'id' => $attendance->id],
    ];

    foreach ($cases as $case) {
        $this->postJson(sprintf('/api/v1/approvals/%s/%d/reject', $case['type'], $case['id']), [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['notes']);
    }
});

