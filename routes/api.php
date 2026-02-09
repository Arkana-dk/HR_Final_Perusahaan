<?php

use App\Http\Controllers\Api\Auth\TokenAuthController;
use App\Http\Controllers\Api\Employee\AttendanceController as EmployeeAttendanceApiController;
use App\Http\Controllers\Api\Employee\DashboardController as EmployeeDashboardApiController;
use App\Http\Controllers\Api\Employee\LeaveController as EmployeeLeaveApiController;
use App\Http\Controllers\Api\Employee\OvertimeController as EmployeeOvertimeApiController;
use App\Http\Controllers\Api\Employee\PayslipController as EmployeePayslipApiController;
use App\Http\Controllers\Api\Employee\ReimburseController as EmployeeReimburseApiController;
use App\Http\Controllers\Employee\EmployeePayslipController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('auth/login', [TokenAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('auth/me', [TokenAuthController::class, 'me']);
        Route::post('auth/logout', [TokenAuthController::class, 'logout']);

        Route::middleware('role:employee,admin,superadmin')
            ->prefix('employee')
            ->group(function () {
                Route::get('dashboard', [EmployeeDashboardApiController::class, 'index']);

                Route::get('attendance/today', [EmployeeAttendanceApiController::class, 'today']);
                Route::get('attendance/history', [EmployeeAttendanceApiController::class, 'history']);
                Route::post('attendance/check-in', [EmployeeAttendanceApiController::class, 'checkIn']);
                Route::post('attendance/check-out', [EmployeeAttendanceApiController::class, 'checkOut']);

                Route::get('leave/types', [EmployeeLeaveApiController::class, 'types']);
                Route::get('leave/requests', [EmployeeLeaveApiController::class, 'index']);
                Route::get('leave/requests/{leaveRequest}', [EmployeeLeaveApiController::class, 'show']);
                Route::post('leave/requests', [EmployeeLeaveApiController::class, 'store']);
                Route::post('leave/requests/{leaveRequest}/cancel', [EmployeeLeaveApiController::class, 'cancel']);

                Route::get('overtime/requests', [EmployeeOvertimeApiController::class, 'index']);
                Route::get('overtime/requests/{overtimeRequest}', [EmployeeOvertimeApiController::class, 'show']);
                Route::post('overtime/requests', [EmployeeOvertimeApiController::class, 'store']);
                Route::post('overtime/requests/{overtimeRequest}/cancel', [EmployeeOvertimeApiController::class, 'cancel']);

                Route::get('reimburse/requests', [EmployeeReimburseApiController::class, 'index']);
                Route::get('reimburse/requests/{reimburseRequest}', [EmployeeReimburseApiController::class, 'show']);
                Route::post('reimburse/requests', [EmployeeReimburseApiController::class, 'store']);
                Route::post('reimburse/requests/{reimburseRequest}/cancel', [EmployeeReimburseApiController::class, 'cancel']);

                Route::get('payslips', [EmployeePayslipApiController::class, 'index']);
                Route::get('payslips/latest', [EmployeePayslipApiController::class, 'latest']);
                Route::get('payslips/latest/download', [EmployeePayslipController::class, 'downloadLatest']);
                Route::get('payslips/{payslip}', [EmployeePayslipApiController::class, 'show']);
            });
    });
});
