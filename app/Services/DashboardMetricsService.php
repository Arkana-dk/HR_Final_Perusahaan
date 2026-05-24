<?php

namespace App\Services;

use App\Models\Asset;
use App\Models\AttendanceCorrection;
use App\Models\AttendanceLog;
use App\Models\Employee;
use App\Models\EmployeeContract;
use App\Models\EmployeeDocument;
use App\Models\LeaveBalance;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Models\OvertimeRequest;
use App\Models\PayrollPeriod;
use App\Models\Payslip;
use App\Models\ReimburseRequest;
use App\Models\SystemNotification;
use App\Models\User;
use App\Models\WorkSchedule;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class DashboardMetricsService
{
    public function __construct(
        private readonly ScopeAuthorizationService $scopeAuthorizationService,
    ) {
    }

    public function buildAdminSummary(User $user): array
    {
        $today = Carbon::today();
        $currentYear = (int) $today->format('Y');
        $companyIds = $this->scopedCompanyIds($user);

        $employeesQuery = Employee::query();
        $this->scopeAuthorizationService->scopeEmployees($user, $employeesQuery);

        $totalEmployees = (clone $employeesQuery)->count();
        $activeEmployees = (clone $employeesQuery)
            ->where('is_active', true)
            ->whereNotIn('employment_status', ['resign', 'terminated'])
            ->count();
        $inactiveEmployees = max(0, $totalEmployees - $activeEmployees);
        $resignedOrTerminated = (clone $employeesQuery)
            ->whereIn('employment_status', ['resign', 'terminated'])
            ->count();

        $attendanceTodayQuery = AttendanceLog::query()
            ->whereDate('work_date', $today->toDateString());
        $this->scopeAuthorizationService->scopeEmployeeQuery($user, $attendanceTodayQuery);

        $checkedInToday = (clone $attendanceTodayQuery)->whereNotNull('check_in_at')->count();
        $lateToday = (clone $attendanceTodayQuery)->where('status', 'late')->count();
        $absentToday = (clone $attendanceTodayQuery)->where('status', 'absent')->count();
        $attendanceTotalToday = (clone $attendanceTodayQuery)->count();

        $leavePending = $this->countScopedEmployeeModule($user, LeaveRequest::query()->where('status', 'pending'));
        $overtimePending = $this->countScopedEmployeeModule($user, OvertimeRequest::query()->where('status', 'pending'));
        $reimbursePending = $this->countScopedEmployeeModule($user, ReimburseRequest::query()->where('status', 'pending'));
        $attendancePending = $this->countScopedEmployeeModule(
            $user,
            AttendanceLog::query()
                ->where('approval_status', 'pending')
                ->where(function (Builder $query) {
                    $query->where('status', 'late')->orWhere('is_early_leave', true);
                }),
        );
        $correctionPending = $this->countScopedEmployeeModule($user, AttendanceCorrection::query()->where('status', 'pending'));

        $payrollOpen = PayrollPeriod::query()
            ->when(!$user->hasRole('superadmin'), function (Builder $query) use ($companyIds) {
                if ($companyIds === []) {
                    $query->whereRaw('1 = 0');
                } else {
                    $query->whereIn('company_id', $companyIds);
                }
            })
            ->where('status', 'open')
            ->count();

        $payslipDraft = $this->countScopedEmployeeModule($user, Payslip::query()->where('status', 'draft'));
        $payslipFinal = $this->countScopedEmployeeModule($user, Payslip::query()->whereIn('status', ['final', 'paid']));

        $contractsExpiring = $this->countScopedEmployeeModule(
            $user,
            EmployeeContract::query()
                ->where('status', 'active')
                ->whereNotNull('end_date')
                ->whereDate('end_date', '>=', $today->toDateString())
                ->whereDate('end_date', '<=', $today->copy()->addDays(30)->toDateString()),
        );

        $documentsExpiring = $this->countScopedEmployeeModule(
            $user,
            EmployeeDocument::query()
                ->whereNotNull('expires_at')
                ->whereDate('expires_at', '>=', $today->toDateString())
                ->whereDate('expires_at', '<=', $today->copy()->addDays(30)->toDateString()),
        );

        $assetsAssigned = Asset::query()
            ->where('status', 'assigned')
            ->when(!$user->hasRole('superadmin'), function (Builder $query) use ($companyIds) {
                if ($companyIds === []) {
                    $query->whereRaw('1 = 0');
                } else {
                    $query->whereIn('company_id', $companyIds);
                }
            })
            ->count();

        $unreadNotifications = SystemNotification::query()
            ->where('user_id', $user->id)
            ->where('is_read', false)
            ->count();

        return [
            'today' => $today->toDateString(),
            'year' => $currentYear,
            'employees' => [
                'total' => $totalEmployees,
                'active' => $activeEmployees,
                'inactive' => $inactiveEmployees,
                'resign_terminated' => $resignedOrTerminated,
            ],
            'attendance_today' => [
                'total' => $attendanceTotalToday,
                'checked_in' => $checkedInToday,
                'late' => $lateToday,
                'absent' => $absentToday,
            ],
            'pending' => [
                'leave' => $leavePending,
                'overtime' => $overtimePending,
                'reimburse' => $reimbursePending,
                'attendance' => $attendancePending,
                'attendance_correction' => $correctionPending,
                'approval_total' => $leavePending + $overtimePending + $reimbursePending + $attendancePending + $correctionPending,
            ],
            'payroll' => [
                'open_periods' => $payrollOpen,
                'payslip_draft' => $payslipDraft,
                'payslip_final' => $payslipFinal,
            ],
            'alerts' => [
                'contracts_expiring_30' => $contractsExpiring,
                'documents_expiring_30' => $documentsExpiring,
                'assets_assigned' => $assetsAssigned,
                'unread_notifications' => $unreadNotifications,
            ],
        ];
    }

    public function buildAdminAttendanceTrend(User $user, int $months = 6): array
    {
        return collect(range($months - 1, 0))
            ->map(function (int $index) use ($user) {
                $month = Carbon::today()->startOfMonth()->subMonths($index);
                $start = $month->copy()->startOfMonth();
                $end = $month->copy()->endOfMonth();

                $query = AttendanceLog::query()
                    ->whereDate('work_date', '>=', $start->toDateString())
                    ->whereDate('work_date', '<=', $end->toDateString());
                $this->scopeAuthorizationService->scopeEmployeeQuery($user, $query);

                $present = (clone $query)
                    ->whereIn('status', ['present', 'late', 'on_leave', 'permission', 'sick'])
                    ->count();
                $late = (clone $query)->where('status', 'late')->count();

                return [
                    'month' => $month->translatedFormat('M'),
                    'hadir' => $present,
                    'terlambat' => $late,
                ];
            })
            ->values()
            ->all();
    }

    public function buildLeaveUsage(User $user): array
    {
        $start = Carbon::today()->startOfYear();
        $end = Carbon::today()->endOfYear();

        $query = LeaveRequest::query()
            ->with('leaveType:id,name')
            ->where('status', 'approved')
            ->whereDate('start_date', '>=', $start->toDateString())
            ->whereDate('start_date', '<=', $end->toDateString());
        $this->scopeAuthorizationService->scopeEmployeeQuery($user, $query);

        $rows = $query
            ->get()
            ->groupBy(fn (LeaveRequest $item) => $item->leaveType?->name ?: 'Lainnya')
            ->map(fn ($items, $key) => [
                'type' => (string) $key,
                'value' => (int) round((float) $items->sum('total_days')),
            ])
            ->sortByDesc('value')
            ->take(5)
            ->values()
            ->all();

        return $rows === [] ? [
            ['type' => 'Belum Ada Data', 'value' => 0],
        ] : $rows;
    }

    public function buildHeadcountTrend(User $user, int $months = 6): array
    {
        $employeeBase = Employee::query();
        $this->scopeAuthorizationService->scopeEmployees($user, $employeeBase);

        return collect(range($months - 1, 0))
            ->map(function (int $index) use ($employeeBase) {
                $month = Carbon::today()->startOfMonth()->subMonths($index);
                $monthEnd = $month->copy()->endOfMonth();

                $total = (clone $employeeBase)
                    ->whereDate('created_at', '<=', $monthEnd->toDateString())
                    ->where(function (Builder $query) use ($monthEnd) {
                        $query->whereNull('deleted_at')
                            ->orWhereDate('deleted_at', '>', $monthEnd->toDateString());
                    })
                    ->count();

                return [
                    'month' => $month->translatedFormat('M'),
                    'total' => $total,
                ];
            })
            ->values()
            ->all();
    }

    public function buildEmployeeDashboard(User $user): array
    {
        $employee = $user->employee;
        if (!$employee) {
            return [
                'summary' => [
                    'attendance_present' => 0,
                    'attendance_expected' => 0,
                    'late_count' => 0,
                    'pending_requests' => 0,
                    'annual_leave_remaining' => 0,
                    'latest_payslip' => null,
                ],
                'attendance_weekly' => [],
                'leave_balance' => [],
                'upcoming' => [],
                'reminders' => [],
            ];
        }

        $today = Carbon::today();
        $monthStart = $today->copy()->startOfMonth();
        $monthEnd = $today->copy()->endOfMonth();
        $year = (int) $today->format('Y');

        $attendanceMonth = AttendanceLog::query()
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', '>=', $monthStart->toDateString())
            ->whereDate('work_date', '<=', $monthEnd->toDateString());

        $attendancePresent = (clone $attendanceMonth)
            ->whereIn('status', ['present', 'late', 'on_leave', 'permission', 'sick'])
            ->count();
        $attendanceLate = (clone $attendanceMonth)->where('status', 'late')->count();

        $attendanceExpected = WorkSchedule::query()
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', '>=', $monthStart->toDateString())
            ->whereDate('work_date', '<=', $monthEnd->toDateString())
            ->where('status', 'scheduled')
            ->count();

        $pendingRequests = LeaveRequest::query()
            ->where('employee_id', $employee->id)
            ->where('status', 'pending')
            ->count()
            + OvertimeRequest::query()
                ->where('employee_id', $employee->id)
                ->where('status', 'pending')
                ->count()
            + ReimburseRequest::query()
                ->where('employee_id', $employee->id)
                ->where('status', 'pending')
                ->count();

        $annualLeaveRemaining = LeaveBalance::query()
            ->where('employee_id', $employee->id)
            ->where('year', $year)
            ->whereHas('leaveType', fn (Builder $query) => $query->where('category', 'annual'))
            ->sum('remaining');

        $latestPayslip = Payslip::query()
            ->with('payrollPeriod:id,name,end_date')
            ->where('employee_id', $employee->id)
            ->orderByDesc('issued_at')
            ->orderByDesc('id')
            ->first();

        $attendanceWeekly = collect(range(3, 0))
            ->map(function (int $index) use ($employee, $today) {
                $start = $today->copy()->startOfWeek()->subWeeks($index);
                $end = $start->copy()->endOfWeek();

                $present = AttendanceLog::query()
                    ->where('employee_id', $employee->id)
                    ->whereDate('work_date', '>=', $start->toDateString())
                    ->whereDate('work_date', '<=', $end->toDateString())
                    ->whereIn('status', ['present', 'late', 'on_leave', 'permission', 'sick'])
                    ->count();
                $late = AttendanceLog::query()
                    ->where('employee_id', $employee->id)
                    ->whereDate('work_date', '>=', $start->toDateString())
                    ->whereDate('work_date', '<=', $end->toDateString())
                    ->where('status', 'late')
                    ->count();

                return [
                    'week' => 'W'.(4 - $index),
                    'hadir' => $present,
                    'terlambat' => $late,
                ];
            })
            ->values()
            ->all();

        $leaveBalance = LeaveBalance::query()
            ->with('leaveType:id,name')
            ->where('employee_id', $employee->id)
            ->where('year', $year)
            ->orderByDesc('remaining')
            ->take(5)
            ->get()
            ->map(fn (LeaveBalance $balance) => [
                'type' => $balance->leaveType?->name ?? 'Leave',
                'value' => (int) $balance->remaining,
            ])
            ->values()
            ->all();

        if ($leaveBalance === []) {
            $leaveBalance = LeaveType::query()
                ->where('company_id', $employee->company_id)
                ->where('is_active', true)
                ->orderBy('name')
                ->take(5)
                ->get(['name', 'default_allocation'])
                ->map(fn (LeaveType $type) => [
                    'type' => $type->name,
                    'value' => (int) $type->default_allocation,
                ])
                ->values()
                ->all();
        }

        $upcoming = WorkSchedule::query()
            ->with('shift:id,name,start_time,end_time')
            ->where('employee_id', $employee->id)
            ->whereDate('work_date', '>=', $today->toDateString())
            ->where('status', 'scheduled')
            ->orderBy('work_date')
            ->take(3)
            ->get()
            ->map(fn (WorkSchedule $schedule) => [
                'title' => $schedule->shift?->name ?? 'Shift',
                'desc' => sprintf(
                    '%s, %s - %s',
                    optional($schedule->work_date)->translatedFormat('l, d M Y'),
                    $schedule->shift?->start_time ?? '-',
                    $schedule->shift?->end_time ?? '-',
                ),
                'status' => optional($schedule->work_date)->isToday()
                    ? 'Hari ini'
                    : (optional($schedule->work_date)->isTomorrow() ? 'Besok' : 'Mendatang'),
            ])
            ->values()
            ->all();

        $reminders = [];
        if ($pendingRequests > 0) {
            $reminders[] = sprintf('Anda memiliki %d pengajuan yang masih pending.', $pendingRequests);
        }
        if ($annualLeaveRemaining <= 2) {
            $reminders[] = 'Sisa cuti tahunan Anda rendah. Segera rencanakan pengajuan cuti.';
        }
        if ($latestPayslip) {
            $reminders[] = sprintf(
                'Slip gaji terbaru periode %s sudah tersedia.',
                $latestPayslip->payrollPeriod?->name ?? '-',
            );
        }

        if ($reminders === []) {
            $reminders[] = 'Semua pengajuan Anda saat ini dalam kondisi aman.';
        }

        return [
            'summary' => [
                'attendance_present' => $attendancePresent,
                'attendance_expected' => $attendanceExpected,
                'late_count' => $attendanceLate,
                'pending_requests' => $pendingRequests,
                'annual_leave_remaining' => (int) $annualLeaveRemaining,
                'latest_payslip' => $latestPayslip
                    ? [
                        'net_salary' => (float) $latestPayslip->net_salary,
                        'period' => $latestPayslip->payrollPeriod?->name,
                    ]
                    : null,
            ],
            'attendance_weekly' => $attendanceWeekly,
            'leave_balance' => $leaveBalance,
            'upcoming' => $upcoming,
            'reminders' => $reminders,
        ];
    }

    private function scopedCompanyIds(User $user): array
    {
        if ($user->hasRole('superadmin')) {
            return [];
        }

        $query = Employee::query();
        $this->scopeAuthorizationService->scopeEmployees($user, $query);
        $ids = $query->distinct()->pluck('company_id')->filter()->map(fn ($id) => (int) $id)->values()->all();

        if ($ids !== []) {
            return $ids;
        }

        $actorCompanyId = (int) ($user->employee?->company_id ?? 0);

        return $actorCompanyId > 0 ? [$actorCompanyId] : [];
    }

    private function countScopedEmployeeModule(User $user, Builder $query, string $employeeForeignKey = 'employee_id'): int
    {
        $this->scopeAuthorizationService->scopeEmployeeQuery($user, $query, $employeeForeignKey);

        return (clone $query)->count();
    }
}

