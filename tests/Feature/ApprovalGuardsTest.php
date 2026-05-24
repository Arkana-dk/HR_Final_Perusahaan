<?php

use App\Models\AttendanceLog;
use App\Models\Company;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Models\OvertimeRequest;
use App\Models\ReimburseRequest;
use App\Models\User;
use Illuminate\Support\Carbon;

function createUserWithEmployee(string $role, Company $company, string $employeeCode): array
{
    $user = User::factory()->create([
        'role' => $role,
    ]);

    $employee = Employee::create([
        'user_id' => $user->id,
        'company_id' => $company->id,
        'employee_code' => $employeeCode,
        'join_date' => '2026-01-01',
    ]);

    return [$user, $employee];
}

test('superadmin cannot approve own leave request', function () {
    $company = Company::create([
        'name' => 'Acme Corp',
    ]);

    [$superadmin] = createUserWithEmployee('superadmin', $company, 'SUP-001');

    $leaveType = LeaveType::create([
        'company_id' => $company->id,
        'code' => 'ANNUAL',
        'name' => 'Cuti Tahunan',
        'default_allocation' => 12,
        'is_active' => true,
    ]);

    $this->actingAs($superadmin)
        ->post('/employee/leave-requests', [
            'leave_type_id' => $leaveType->id,
            'start_date' => '2026-03-10',
            'end_date' => '2026-03-11',
            'reason' => 'Urusan pribadi',
        ])
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    $leaveRequest = LeaveRequest::query()->firstOrFail();

    $this->actingAs($superadmin)
        ->post("/modules/leave-requests/{$leaveRequest->id}/approve")
        ->assertForbidden();

    $this->assertDatabaseHas('leave_requests', [
        'id' => $leaveRequest->id,
        'status' => 'pending',
    ]);
});

test('same user cannot approve leave request across multiple approval steps', function () {
    $company = Company::create([
        'name' => 'Acme Corp',
    ]);

    [$employeeUser] = createUserWithEmployee('employee', $company, 'EMP-001');
    $superadminA = User::factory()->create(['role' => 'superadmin']);
    $superadminB = User::factory()->create(['role' => 'superadmin']);

    $leaveType = LeaveType::create([
        'company_id' => $company->id,
        'code' => 'ANNUAL',
        'name' => 'Cuti Tahunan',
        'default_allocation' => 12,
        'is_active' => true,
    ]);

    $this->actingAs($employeeUser)
        ->post('/employee/leave-requests', [
            'leave_type_id' => $leaveType->id,
            'start_date' => '2026-03-15',
            'end_date' => '2026-03-16',
            'reason' => 'Keperluan keluarga',
        ])
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    $leaveRequest = LeaveRequest::query()->firstOrFail();

    $this->actingAs($superadminA)
        ->post("/modules/leave-requests/{$leaveRequest->id}/approve")
        ->assertRedirect();

    $leaveRequest->refresh();
    expect($leaveRequest->status)->toBe('pending');
    expect($leaveRequest->approval?->current_step)->toBe(2);

    $this->actingAs($superadminA)
        ->post("/modules/leave-requests/{$leaveRequest->id}/approve")
        ->assertForbidden();

    $this->actingAs($superadminB)
        ->post("/modules/leave-requests/{$leaveRequest->id}/approve")
        ->assertRedirect();

    $this->assertDatabaseHas('leave_requests', [
        'id' => $leaveRequest->id,
        'status' => 'approved',
        'approved_by_user_id' => $superadminB->id,
    ]);
});

test('admin cannot self approve own overtime request', function () {
    $company = Company::create([
        'name' => 'Acme Corp',
    ]);

    [$admin, $adminEmployee] = createUserWithEmployee('admin', $company, 'ADM-001');

    $overtime = OvertimeRequest::create([
        'employee_id' => $adminEmployee->id,
        'work_date' => '2026-03-01',
        'start_time' => '18:00',
        'end_time' => '20:00',
        'total_hours' => 2,
        'status' => 'pending',
        'requested_at' => now(),
    ]);

    $this->actingAs($admin)
        ->post("/modules/overtime/{$overtime->id}/approve")
        ->assertForbidden();

    $this->assertDatabaseHas('overtime_requests', [
        'id' => $overtime->id,
        'status' => 'pending',
    ]);
});

test('admin cannot self approve own reimburse request', function () {
    $company = Company::create([
        'name' => 'Acme Corp',
    ]);

    [$admin, $adminEmployee] = createUserWithEmployee('admin', $company, 'ADM-002');

    $reimburse = ReimburseRequest::create([
        'employee_id' => $adminEmployee->id,
        'category' => 'Transport',
        'amount' => 150000,
        'currency' => 'IDR',
        'status' => 'pending',
        'requested_at' => now(),
    ]);

    $this->actingAs($admin)
        ->post("/modules/reimburse/{$reimburse->id}/approve")
        ->assertForbidden();

    $this->assertDatabaseHas('reimburse_requests', [
        'id' => $reimburse->id,
        'status' => 'pending',
    ]);
});

test('admin cannot self approve own attendance log', function () {
    $company = Company::create([
        'name' => 'Acme Corp',
    ]);

    [$admin, $adminEmployee] = createUserWithEmployee('admin', $company, 'ADM-003');

    $attendance = AttendanceLog::create([
        'employee_id' => $adminEmployee->id,
        'work_date' => Carbon::today()->toDateString(),
        'status' => 'present',
        'approval_status' => 'pending',
    ]);

    $this->actingAs($admin)
        ->post("/modules/attendance/{$attendance->id}/approve")
        ->assertForbidden();

    $this->assertDatabaseHas('attendance_logs', [
        'id' => $attendance->id,
        'approval_status' => 'pending',
    ]);
});
