<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\AttendanceLog;
use App\Models\LeaveBalance;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use App\Models\Payslip;
use App\Models\ReimburseRequest;
use App\Models\WorkSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    use ResolvesEmployee;

    public function index(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $today = Carbon::today();
        $startOfMonth = $today->copy()->startOfMonth();
        $endOfMonth = $today->copy()->endOfMonth();

        $todayLog = AttendanceLog::query()
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', $today)
            ->first();

        $attendanceStats = [
            'present_days_this_month' => AttendanceLog::query()
                ->where('employee_id', $employee->id)
                ->whereBetween('work_date', [$startOfMonth, $endOfMonth])
                ->whereIn('status', ['present', 'late'])
                ->count(),
            'late_days_this_month' => AttendanceLog::query()
                ->where('employee_id', $employee->id)
                ->whereBetween('work_date', [$startOfMonth, $endOfMonth])
                ->where('status', 'late')
                ->count(),
            'pending_approval' => AttendanceLog::query()
                ->where('employee_id', $employee->id)
                ->where('approval_status', 'pending')
                ->count(),
            'today' => $todayLog
                ? [
                    'work_date' => optional($todayLog->work_date)->toDateString(),
                    'check_in_at' => optional($todayLog->check_in_at)?->toDateTimeString(),
                    'check_out_at' => optional($todayLog->check_out_at)?->toDateTimeString(),
                    'status' => $todayLog->status,
                    'approval_status' => $todayLog->approval_status,
                    'can_check_in' => !$todayLog->check_in_at,
                    'can_check_out' => (bool) $todayLog->check_in_at && !$todayLog->check_out_at,
                ]
                : [
                    'work_date' => $today->toDateString(),
                    'check_in_at' => null,
                    'check_out_at' => null,
                    'status' => null,
                    'approval_status' => 'pending',
                    'can_check_in' => true,
                    'can_check_out' => false,
                ],
        ];

        $leaveStats = [
            'pending_requests' => LeaveRequest::query()
                ->where('employee_id', $employee->id)
                ->where('status', 'pending')
                ->count(),
            'balance_this_year' => (int) LeaveBalance::query()
                ->where('employee_id', $employee->id)
                ->where('year', (int) $today->format('Y'))
                ->sum('remaining'),
        ];

        $latestPayslip = Payslip::with('payrollPeriod:id,name,start_date,end_date,pay_date')
            ->where('employee_id', $employee->id)
            ->orderByDesc('issued_at')
            ->orderByDesc('id')
            ->first();

        $upcomingSchedules = WorkSchedule::with('shift:id,name,start_time,end_time')
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', '>=', $today)
            ->orderBy('work_date')
            ->limit(3)
            ->get()
            ->map(fn ($schedule) => [
                'work_date' => optional($schedule->work_date)->toDateString(),
                'status' => $schedule->status,
                'shift' => $schedule->shift
                    ? [
                        'name' => $schedule->shift->name,
                        'start_time' => $schedule->shift->start_time,
                        'end_time' => $schedule->shift->end_time,
                    ]
                    : null,
            ])
            ->values()
            ->all();

        return response()->json([
            'data' => [
                'employee' => [
                    'id' => $employee->id,
                    'employee_code' => $employee->employee_code,
                    'name' => $request->user()->name,
                ],
                'attendance' => $attendanceStats,
                'leave' => $leaveStats,
                'overtime' => [
                    'pending_requests' => OvertimeRequest::query()
                        ->where('employee_id', $employee->id)
                        ->where('status', 'pending')
                        ->count(),
                ],
                'reimburse' => [
                    'pending_requests' => ReimburseRequest::query()
                        ->where('employee_id', $employee->id)
                        ->where('status', 'pending')
                        ->count(),
                ],
                'latest_payslip' => $latestPayslip
                    ? [
                        'id' => $latestPayslip->id,
                        'status' => $latestPayslip->status,
                        'gross_salary' => (float) $latestPayslip->gross_salary,
                        'total_deductions' => (float) $latestPayslip->total_deductions,
                        'net_salary' => (float) $latestPayslip->net_salary,
                        'issued_at' => optional($latestPayslip->issued_at)?->toDateTimeString(),
                        'period' => [
                            'name' => $latestPayslip->payrollPeriod?->name,
                            'start_date' => optional($latestPayslip->payrollPeriod?->start_date)->toDateString(),
                            'end_date' => optional($latestPayslip->payrollPeriod?->end_date)->toDateString(),
                            'pay_date' => optional($latestPayslip->payrollPeriod?->pay_date)->toDateString(),
                        ],
                    ]
                    : null,
                'upcoming_schedules' => $upcomingSchedules,
                'server_time' => now()->toDateTimeString(),
            ],
        ]);
    }
}
