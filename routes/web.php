<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Analytics\AnalyticsController;
use App\Http\Controllers\Assets\AssetController;
use App\Http\Controllers\Contracts\EmployeeContractController;
use App\Http\Controllers\Documents\EmployeeDocumentController;
use App\Http\Controllers\Employee\AttendanceController as EmployeeAttendanceController;
use App\Http\Controllers\Employee\EmployeeLeaveRequestController;
use App\Http\Controllers\Employee\EmployeeOvertimeController;
use App\Http\Controllers\Employee\EmployeePayslipController;
use App\Http\Controllers\Employee\EmployeeReimburseController;
use App\Http\Controllers\Employees\EmployeeController;
use App\Http\Controllers\Finance\ReimburseController;
use App\Http\Controllers\Leave\LeaveRequestController;
use App\Http\Controllers\MasterData\MasterDataController;
use App\Http\Controllers\Modules\ModuleController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Payroll\PayslipController;
use App\Http\Controllers\Time\AttendanceController;
use App\Http\Controllers\Time\OvertimeController;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::get('dashboard', function () {
    $user = auth()->user();

    if ($user->hasRole('superadmin')) {
        return redirect()->route('superadmin.dashboard');
    }

    if ($user->hasRole('admin') || $user->hasRole('manager')) {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('employee.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:admin,superadmin,manager'])->prefix('modules')->group(function () {
    Route::get('employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('employees/create', [EmployeeController::class, 'create'])->name('employees.create');
    Route::post('employees', [EmployeeController::class, 'store'])->name('employees.store');
    Route::get('employees/{employee}', [EmployeeController::class, 'show'])->name('employees.show');
    Route::get('employees/{employee}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
    Route::post('employees/{employee}/deactivate', [EmployeeController::class, 'deactivate'])
        ->name('employees.deactivate');
    Route::post('employees/{employee}/restore', [EmployeeController::class, 'restore'])
        ->name('employees.restore');
    Route::delete('employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
});

Route::middleware(['auth', 'role:superadmin'])
    ->prefix('modules/organization')
    ->group(function () {
        Route::get('{resource}/template', [MasterDataController::class, 'template'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.template');
        Route::get('{resource}/export', [MasterDataController::class, 'export'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.export');
        Route::post('{resource}/import', [MasterDataController::class, 'import'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.import');
        Route::get('{resource}', [MasterDataController::class, 'index'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.index');
        Route::get('{resource}/create', [MasterDataController::class, 'create'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.create');
        Route::post('{resource}', [MasterDataController::class, 'store'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.store');
        Route::get('{resource}/{record}/edit', [MasterDataController::class, 'edit'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.edit');
        Route::put('{resource}/{record}', [MasterDataController::class, 'update'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.update');
        Route::delete('{resource}/{record}', [MasterDataController::class, 'destroy'])
            ->whereIn('resource', [
                'companies',
                'branches',
                'departments',
                'job-levels',
                'positions',
                'work-locations',
            ])
            ->name('organization.resources.destroy');
        Route::post('{resource}/{record}/restore', [MasterDataController::class, 'restore'])
            ->whereIn('resource', [
                'departments',
                'positions',
            ])
            ->name('organization.resources.restore');
    });

Route::middleware(['auth', 'role:superadmin'])
    ->get('modules/organization', function () {
        return redirect()->route('organization.resources.index', [
            'resource' => 'companies',
        ]);
    })
    ->name('organization.index');

Route::middleware(['auth', 'role:admin,superadmin'])->group(function () {
    Route::get('modules/employees/template', [MasterDataController::class, 'template'])
        ->defaults('resource', 'employees')
        ->name('employees.template');
    Route::get('modules/employees/export', [MasterDataController::class, 'export'])
        ->defaults('resource', 'employees')
        ->name('employees.export');
    Route::post('modules/employees/import', [MasterDataController::class, 'import'])
        ->defaults('resource', 'employees')
        ->name('employees.import');

    Route::get('modules/attendance/template', [MasterDataController::class, 'template'])
        ->defaults('resource', 'attendance-logs')
        ->name('attendance-logs.template');
    Route::get('modules/attendance/export', [MasterDataController::class, 'export'])
        ->defaults('resource', 'attendance-logs')
        ->name('attendance-logs.export');
    Route::post('modules/attendance/import', [MasterDataController::class, 'import'])
        ->defaults('resource', 'attendance-logs')
        ->name('attendance-logs.import');

    Route::get('modules/shifts/template', [MasterDataController::class, 'template'])
        ->defaults('resource', 'shifts')
        ->name('shifts.template');
    Route::get('modules/shifts/export', [MasterDataController::class, 'export'])
        ->defaults('resource', 'shifts')
        ->name('shifts.export');
    Route::post('modules/shifts/import', [MasterDataController::class, 'import'])
        ->defaults('resource', 'shifts')
        ->name('shifts.import');
    Route::get('modules/shifts', [MasterDataController::class, 'index'])
        ->defaults('resource', 'shifts')
        ->name('shifts.index');
    Route::get('modules/shifts/create', [MasterDataController::class, 'create'])
        ->defaults('resource', 'shifts')
        ->name('shifts.create');
    Route::post('modules/shifts', [MasterDataController::class, 'store'])
        ->defaults('resource', 'shifts')
        ->name('shifts.store');
    Route::get('modules/shifts/{record}/edit', [MasterDataController::class, 'edit'])
        ->defaults('resource', 'shifts')
        ->name('shifts.edit');
    Route::put('modules/shifts/{record}', [MasterDataController::class, 'update'])
        ->defaults('resource', 'shifts')
        ->name('shifts.update');
    Route::delete('modules/shifts/{record}', [MasterDataController::class, 'destroy'])
        ->defaults('resource', 'shifts')
        ->name('shifts.destroy');

    Route::get('modules/leave-types/template', [MasterDataController::class, 'template'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.template');
    Route::get('modules/leave-types/export', [MasterDataController::class, 'export'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.export');
    Route::post('modules/leave-types/import', [MasterDataController::class, 'import'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.import');
    Route::get('modules/leave-types', [MasterDataController::class, 'index'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.index');
    Route::get('modules/leave-types/create', [MasterDataController::class, 'create'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.create');
    Route::post('modules/leave-types', [MasterDataController::class, 'store'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.store');
    Route::get('modules/leave-types/{record}/edit', [MasterDataController::class, 'edit'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.edit');
    Route::put('modules/leave-types/{record}', [MasterDataController::class, 'update'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.update');
    Route::delete('modules/leave-types/{record}', [MasterDataController::class, 'destroy'])
        ->defaults('resource', 'leave-types')
        ->name('leave-types.destroy');

    Route::get('modules/schedules/template', [MasterDataController::class, 'template'])
        ->defaults('resource', 'schedules')
        ->name('schedules.template');
    Route::get('modules/schedules/export', [MasterDataController::class, 'export'])
        ->defaults('resource', 'schedules')
        ->name('schedules.export');
    Route::post('modules/schedules/import', [MasterDataController::class, 'import'])
        ->defaults('resource', 'schedules')
        ->name('schedules.import');
    Route::get('modules/schedules', [MasterDataController::class, 'index'])
        ->defaults('resource', 'schedules')
        ->name('schedules.index');
    Route::get('modules/schedules/create', [MasterDataController::class, 'create'])
        ->defaults('resource', 'schedules')
        ->name('schedules.create');
    Route::post('modules/schedules', [MasterDataController::class, 'store'])
        ->defaults('resource', 'schedules')
        ->name('schedules.store');
    Route::get('modules/schedules/{record}/edit', [MasterDataController::class, 'edit'])
        ->defaults('resource', 'schedules')
        ->name('schedules.edit');
    Route::put('modules/schedules/{record}', [MasterDataController::class, 'update'])
        ->defaults('resource', 'schedules')
        ->name('schedules.update');
    Route::delete('modules/schedules/{record}', [MasterDataController::class, 'destroy'])
        ->defaults('resource', 'schedules')
        ->name('schedules.destroy');
});

Route::middleware(['auth', 'role:admin,superadmin'])
    ->prefix('modules')
    ->group(function () {
        Route::get('{resource}/template', [MasterDataController::class, 'template'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.template');
        Route::get('{resource}/export', [MasterDataController::class, 'export'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.export');
        Route::post('{resource}/import', [MasterDataController::class, 'import'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.import');
        Route::get('{resource}', [MasterDataController::class, 'index'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.index');
        Route::get('{resource}/create', [MasterDataController::class, 'create'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.create');
        Route::post('{resource}', [MasterDataController::class, 'store'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.store');
        Route::get('{resource}/{record}/edit', [MasterDataController::class, 'edit'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.edit');
        Route::put('{resource}/{record}', [MasterDataController::class, 'update'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.update');
        Route::delete('{resource}/{record}', [MasterDataController::class, 'destroy'])
            ->whereIn('resource', [
                'kpi-okr',
                'appraisals',
                'training',
                'job-posts',
                'candidates',
                'interviews',
                'audit-logs',
            ])
            ->name('operations.resources.destroy');
    });

Route::middleware(['auth', 'role:superadmin'])->group(function () {
    Route::get('modules/salary-components/template', [MasterDataController::class, 'template'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.template');
    Route::get('modules/salary-components/export', [MasterDataController::class, 'export'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.export');
    Route::post('modules/salary-components/import', [MasterDataController::class, 'import'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.import');
    Route::get('modules/salary-components', [MasterDataController::class, 'index'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.index');
    Route::get('modules/salary-components/create', [MasterDataController::class, 'create'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.create');
    Route::post('modules/salary-components', [MasterDataController::class, 'store'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.store');
    Route::get('modules/salary-components/{record}/edit', [MasterDataController::class, 'edit'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.edit');
    Route::put('modules/salary-components/{record}', [MasterDataController::class, 'update'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.update');
    Route::delete('modules/salary-components/{record}', [MasterDataController::class, 'destroy'])
        ->defaults('resource', 'salary-components')
        ->name('salary-components.destroy');

    Route::get('modules/payroll-periods/template', [MasterDataController::class, 'template'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.template');
    Route::get('modules/payroll-periods/export', [MasterDataController::class, 'export'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.export');
    Route::post('modules/payroll-periods/import', [MasterDataController::class, 'import'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.import');
    Route::get('modules/payroll-periods', [MasterDataController::class, 'index'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.index');
    Route::get('modules/payroll-periods/create', [MasterDataController::class, 'create'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.create');
    Route::post('modules/payroll-periods', [MasterDataController::class, 'store'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.store');
    Route::get('modules/payroll-periods/{record}/edit', [MasterDataController::class, 'edit'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.edit');
    Route::put('modules/payroll-periods/{record}', [MasterDataController::class, 'update'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.update');
    Route::delete('modules/payroll-periods/{record}', [MasterDataController::class, 'destroy'])
        ->defaults('resource', 'payroll-periods')
        ->name('payroll-periods.destroy');
});

Route::middleware(['auth', 'role:manager,admin,superadmin'])->prefix('modules')->group(function () {
    Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics.index');

    Route::get('attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    Route::post('attendance/{attendance}/approve', [AttendanceController::class, 'approve'])
        ->name('attendance.approve');
    Route::post('attendance/{attendance}/reject', [AttendanceController::class, 'reject'])
        ->name('attendance.reject');

    Route::get('overtime', [OvertimeController::class, 'index'])->name('overtime.index');
    Route::post('overtime/{overtime}/approve', [OvertimeController::class, 'approve'])
        ->name('overtime.approve');
    Route::post('overtime/{overtime}/reject', [OvertimeController::class, 'reject'])
        ->name('overtime.reject');

    Route::get('reimburse', [ReimburseController::class, 'index'])->name('reimburse.index');
    Route::post('reimburse/{reimburse}/approve', [ReimburseController::class, 'approve'])
        ->name('reimburse.approve');
    Route::post('reimburse/{reimburse}/reject', [ReimburseController::class, 'reject'])
        ->name('reimburse.reject');

    Route::get('leave-requests', [LeaveRequestController::class, 'index'])->name('leave-requests.index');
    Route::post('leave-requests/{leaveRequest}/approve', [LeaveRequestController::class, 'approve'])
        ->name('leave-requests.approve');
    Route::post('leave-requests/{leaveRequest}/reject', [LeaveRequestController::class, 'reject'])
        ->name('leave-requests.reject');

    Route::get('assets', [AssetController::class, 'index'])->name('assets.index');
    Route::get('assets/create', [AssetController::class, 'create'])->middleware('role:admin,superadmin')->name('assets.create');
    Route::post('assets', [AssetController::class, 'store'])->middleware('role:admin,superadmin')->name('assets.store');
    Route::get('assets/{asset}/edit', [AssetController::class, 'edit'])->middleware('role:admin,superadmin')->name('assets.edit');
    Route::put('assets/{asset}', [AssetController::class, 'update'])->middleware('role:admin,superadmin')->name('assets.update');
    Route::delete('assets/{asset}', [AssetController::class, 'destroy'])->middleware('role:admin,superadmin')->name('assets.destroy');

    Route::get('contracts', [EmployeeContractController::class, 'index'])->name('contracts.index');
    Route::get('contracts/create', [EmployeeContractController::class, 'create'])->middleware('role:admin,superadmin')->name('contracts.create');
    Route::post('contracts', [EmployeeContractController::class, 'store'])->middleware('role:admin,superadmin')->name('contracts.store');
    Route::get('contracts/{contract}/edit', [EmployeeContractController::class, 'edit'])->middleware('role:admin,superadmin')->name('contracts.edit');
    Route::put('contracts/{contract}', [EmployeeContractController::class, 'update'])->middleware('role:admin,superadmin')->name('contracts.update');
    Route::delete('contracts/{contract}', [EmployeeContractController::class, 'destroy'])->middleware('role:admin,superadmin')->name('contracts.destroy');

    Route::get('documents', [EmployeeDocumentController::class, 'index'])->name('documents.index');
    Route::get('documents/create', [EmployeeDocumentController::class, 'create'])->middleware('role:admin,superadmin')->name('documents.create');
    Route::post('documents', [EmployeeDocumentController::class, 'store'])->middleware('role:admin,superadmin')->name('documents.store');
    Route::get('documents/{document}/edit', [EmployeeDocumentController::class, 'edit'])->middleware('role:admin,superadmin')->name('documents.edit');
    Route::put('documents/{document}', [EmployeeDocumentController::class, 'update'])->middleware('role:admin,superadmin')->name('documents.update');
    Route::delete('documents/{document}', [EmployeeDocumentController::class, 'destroy'])->middleware('role:admin,superadmin')->name('documents.destroy');
});

Route::middleware(['auth', 'role:employee,admin,superadmin'])->prefix('employee')->group(function () {
    Route::get('attendance', [EmployeeAttendanceController::class, 'index'])
        ->name('employee.attendance.index');
    Route::post('attendance/check-in', [EmployeeAttendanceController::class, 'checkIn'])
        ->name('employee.attendance.checkin');
    Route::post('attendance/check-out', [EmployeeAttendanceController::class, 'checkOut'])
        ->name('employee.attendance.checkout');

    Route::get('leave-requests', [EmployeeLeaveRequestController::class, 'index'])
        ->name('employee.leave-requests.index');
    Route::post('leave-requests', [EmployeeLeaveRequestController::class, 'store'])
        ->name('employee.leave-requests.store');

    Route::get('payslips/latest/download', [EmployeePayslipController::class, 'downloadLatest'])
        ->name('employee.payslips.download-latest');

    Route::get('overtime', [EmployeeOvertimeController::class, 'index'])
        ->name('employee.overtime.index');
    Route::post('overtime', [EmployeeOvertimeController::class, 'store'])
        ->name('employee.overtime.store');

    Route::get('reimburse', [EmployeeReimburseController::class, 'index'])
        ->name('employee.reimburse.index');
    Route::post('reimburse', [EmployeeReimburseController::class, 'store'])
        ->name('employee.reimburse.store');
});

Route::middleware(['auth', 'role:superadmin'])->prefix('modules')->group(function () {
    Route::get('payslips', [PayslipController::class, 'index'])->name('payslips.index');
    Route::get('payslips/create', [PayslipController::class, 'create'])->name('payslips.create');
    Route::post('payslips', [PayslipController::class, 'store'])->name('payslips.store');
    Route::get('payslips/{payslip}/edit', [PayslipController::class, 'edit'])->name('payslips.edit');
    Route::put('payslips/{payslip}', [PayslipController::class, 'update'])->name('payslips.update');
});

Route::middleware(['auth'])->prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('{notification}/read', [NotificationController::class, 'markAsRead'])
        ->name('notifications.read');
    Route::post('read-all', [NotificationController::class, 'markAllAsRead'])
        ->name('notifications.read-all');
});

Route::get('modules/{slug}', [ModuleController::class, 'show'])
    ->middleware(['auth', 'role:manager,admin,superadmin'])
    ->name('modules.show');

require __DIR__.'/roles.php';
require __DIR__.'/settings.php';


