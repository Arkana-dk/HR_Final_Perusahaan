<?php

use App\Http\Controllers\Api\Auth\TokenAuthController;
use App\Http\Controllers\Api\ApprovalController as ApprovalApiController;
use App\Http\Controllers\Api\AnnouncementController as AnnouncementApiController;
use App\Http\Controllers\Api\DeviceController as DeviceApiController;
use App\Http\Controllers\Api\Employee\AttendanceController as EmployeeAttendanceApiController;
use App\Http\Controllers\Api\Employee\AttendanceCorrectionController as EmployeeAttendanceCorrectionApiController;
use App\Http\Controllers\Api\Employee\DashboardController as EmployeeDashboardApiController;
use App\Http\Controllers\Api\Employee\LeaveController as EmployeeLeaveApiController;
use App\Http\Controllers\Api\Employee\OvertimeController as EmployeeOvertimeApiController;
use App\Http\Controllers\Api\Employee\PayslipController as EmployeePayslipApiController;
use App\Http\Controllers\Api\Employee\ReimburseController as EmployeeReimburseApiController;
use App\Http\Controllers\Api\NotificationController as NotificationApiController;
use App\Http\Controllers\Files\SecureFileController as SecureFileApiController;
use App\Http\Controllers\Employee\EmployeePayslipController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('auth/login', [TokenAuthController::class, 'login'])->middleware('throttle:mobile-login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('auth/me', [TokenAuthController::class, 'me']);
        Route::post('auth/logout', [TokenAuthController::class, 'logout']);
        Route::post('auth/refresh', [TokenAuthController::class, 'refresh']);

        Route::prefix('secure-files')->group(function () {
            Route::get('attendance-photos/{photo}', [SecureFileApiController::class, 'attendancePhoto']);
            Route::get('documents/{document}', [SecureFileApiController::class, 'employeeDocument']);
            Route::get('contracts/{contract}', [SecureFileApiController::class, 'employeeContract']);
            Route::get('leave-attachments/{leaveRequest}', [SecureFileApiController::class, 'leaveAttachment']);
            Route::get('reimburse-attachments/{reimburseRequest}', [SecureFileApiController::class, 'reimburseAttachment']);
            Route::get('attendance-correction-attachments/{attendanceCorrection}', [SecureFileApiController::class, 'attendanceCorrectionAttachment']);
        });

        Route::get('notifications', [NotificationApiController::class, 'index']);
        Route::get('notifications/unread-count', [NotificationApiController::class, 'unreadCount']);
        Route::get('notifications/stream', [NotificationApiController::class, 'stream']);
        Route::post('notifications/{notification}/read', [NotificationApiController::class, 'markAsRead']);
        Route::post('notifications/read-all', [NotificationApiController::class, 'markAllAsRead']);

        Route::get('devices', [DeviceApiController::class, 'index']);
        Route::post('devices/register', [DeviceApiController::class, 'register']);
        Route::post('devices/unregister', [DeviceApiController::class, 'unregister']);

        Route::get('announcements', [AnnouncementApiController::class, 'index']);

        Route::middleware('role:manager,admin,superadmin')->group(function () {
            Route::get('approvals/pending', [ApprovalApiController::class, 'pending']);
            Route::post('approvals/{type}/{id}/approve', [ApprovalApiController::class, 'approve']);
            Route::post('approvals/{type}/{id}/reject', [ApprovalApiController::class, 'reject']);
        });

        Route::middleware('role:admin,superadmin')->group(function () {
            Route::post('announcements', [AnnouncementApiController::class, 'store']);
            Route::put('announcements/{announcement}', [AnnouncementApiController::class, 'update']);
            Route::delete('announcements/{announcement}', [AnnouncementApiController::class, 'destroy']);
        });

        Route::middleware('role:employee,manager,admin,superadmin')
            ->prefix('employee')
            ->group(function () {
                Route::get('dashboard', [EmployeeDashboardApiController::class, 'index']);

                Route::get('attendance/today', [EmployeeAttendanceApiController::class, 'today']);
                Route::get('attendance/history', [EmployeeAttendanceApiController::class, 'history']);
                Route::post('attendance/check-in', [EmployeeAttendanceApiController::class, 'checkIn']);
                Route::post('attendance/check-out', [EmployeeAttendanceApiController::class, 'checkOut']);
                Route::get('attendance/corrections', [EmployeeAttendanceCorrectionApiController::class, 'index']);
                Route::get('attendance/corrections/{attendanceCorrection}', [EmployeeAttendanceCorrectionApiController::class, 'show']);
                Route::post('attendance/corrections', [EmployeeAttendanceCorrectionApiController::class, 'store']);
                Route::post('attendance/corrections/{attendanceCorrection}/cancel', [EmployeeAttendanceCorrectionApiController::class, 'cancel']);

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
                Route::get('reimbursements', [EmployeeReimburseApiController::class, 'index']);
                Route::post('reimbursements', [EmployeeReimburseApiController::class, 'store']);
                Route::get('reimbursements/{reimburseRequest}', [EmployeeReimburseApiController::class, 'show']);
                Route::post('reimbursements/{reimburseRequest}/cancel', [EmployeeReimburseApiController::class, 'cancel']);

                Route::get('payslips', [EmployeePayslipApiController::class, 'index']);
                Route::get('payslips/latest', [EmployeePayslipApiController::class, 'latest']);
                Route::get('payslips/latest/download', [EmployeePayslipController::class, 'downloadLatest']);
                Route::get('payslips/{payslip}', [EmployeePayslipApiController::class, 'show']);
                Route::get('payslips/{payslip}/download', [EmployeePayslipApiController::class, 'download']);
            });
    });
});
