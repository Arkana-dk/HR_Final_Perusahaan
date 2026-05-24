<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use App\Models\JobLevel;
use App\Models\Position;
use App\Services\DashboardMetricsService;
use App\Services\ScopeAuthorizationService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private readonly ScopeAuthorizationService $scopeAuthorizationService,
        private readonly DashboardMetricsService $dashboardMetricsService,
    ) {
    }

    public function index()
    {
        $user = request()->user();

        $employeesQuery = Employee::with('user:id,name,email,role')
            ->whereHas('user', fn ($query) => $query->where('role', 'employee'))
            ->orderByDesc('created_at')
            ->take(50);
        $this->scopeAuthorizationService->scopeEmployees($user, $employeesQuery);

        $employees = $employeesQuery->get([
                'id',
                'user_id',
                'employee_code',
                'employment_status',
                'employment_type',
                'join_date',
                'company_id',
                'branch_id',
                'department_id',
                'position_id',
                'job_level_id',
                'manager_id',
                'work_email',
                'work_phone',
                'office_location',
            ]);

        $scopedEmployeesForOptions = Employee::query();
        $this->scopeAuthorizationService->scopeEmployees($user, $scopedEmployeesForOptions);

        $companyIds = (clone $scopedEmployeesForOptions)
            ->distinct()
            ->pluck('company_id')
            ->filter()
            ->values();
        $branchIds = (clone $scopedEmployeesForOptions)
            ->distinct()
            ->pluck('branch_id')
            ->filter()
            ->values();
        $departmentIds = (clone $scopedEmployeesForOptions)
            ->distinct()
            ->pluck('department_id')
            ->filter()
            ->values();

        $employeeQuick = [
            'employees' => $employees->map(fn ($employee) => [
                'id' => $employee->id,
                'employee_code' => $employee->employee_code,
                'employment_status' => $employee->employment_status,
                'employment_type' => $employee->employment_type,
                'join_date' => optional($employee->join_date)->toDateString(),
                'company_id' => $employee->company_id,
                'branch_id' => $employee->branch_id,
                'department_id' => $employee->department_id,
                'position_id' => $employee->position_id,
                'job_level_id' => $employee->job_level_id,
                'manager_id' => $employee->manager_id,
                'work_email' => $employee->work_email,
                'work_phone' => $employee->work_phone,
                'office_location' => $employee->office_location,
                'user' => [
                    'name' => $employee->user?->name,
                    'email' => $employee->user?->email,
                    'role' => $employee->user?->role,
                ],
            ])->values(),
            'companies' => Company::query()
                ->when(!$user->hasRole('superadmin'), fn ($query) => $query->whereIn('id', $companyIds))
                ->orderBy('name')
                ->get(['id', 'name']),
            'branches' => Branch::query()
                ->when(!$user->hasRole('superadmin'), fn ($query) => $query->whereIn('id', $branchIds))
                ->orderBy('name')
                ->get(['id', 'name', 'company_id']),
            'departments' => Department::query()
                ->when(!$user->hasRole('superadmin'), fn ($query) => $query->whereIn('id', $departmentIds))
                ->orderBy('name')
                ->get(['id', 'name', 'branch_id']),
            'positions' => Position::query()
                ->when(!$user->hasRole('superadmin') && $departmentIds->isNotEmpty(), fn ($query) => $query->whereIn('department_id', $departmentIds))
                ->when(!$user->hasRole('superadmin') && $departmentIds->isEmpty(), fn ($query) => $query->whereRaw('1 = 0'))
                ->orderBy('title')
                ->get(['id', 'title', 'department_id']),
            'jobLevels' => JobLevel::query()
                ->when(!$user->hasRole('superadmin') && $companyIds->isNotEmpty(), fn ($query) => $query->whereIn('company_id', $companyIds))
                ->when(!$user->hasRole('superadmin') && $companyIds->isEmpty(), fn ($query) => $query->whereRaw('1 = 0'))
                ->orderBy('rank')
                ->get(['id', 'name']),
            'managers' => Employee::with('user:id,name')
                ->whereHas('user', fn ($query) => $query->where('role', 'employee'))
                ->when(!$user->hasRole('superadmin'), function ($query) {
                    $this->scopeAuthorizationService->scopeEmployees(request()->user(), $query);
                })
                ->orderBy('employee_code')
                ->get(['id', 'user_id', 'employee_code'])
                ->map(fn ($employee) => [
                    'id' => $employee->id,
                    'employee_code' => $employee->employee_code,
                    'name' => $employee->user?->name,
                ])
                ->values(),
        ];

        $summary = $this->dashboardMetricsService->buildAdminSummary($user);
        $attendanceTrend = $this->dashboardMetricsService->buildAdminAttendanceTrend($user);
        $leaveUsage = $this->dashboardMetricsService->buildLeaveUsage($user);
        $scheduleAlerts = [
            sprintf(
                '%d approval masih menunggu tindakan.',
                (int) ($summary['pending']['approval_total'] ?? 0),
            ),
            sprintf(
                '%d kontrak dan %d dokumen akan kedaluwarsa dalam 30 hari.',
                (int) ($summary['alerts']['contracts_expiring_30'] ?? 0),
                (int) ($summary['alerts']['documents_expiring_30'] ?? 0),
            ),
            sprintf(
                '%d asset masih berstatus assigned.',
                (int) ($summary['alerts']['assets_assigned'] ?? 0),
            ),
        ];

        return Inertia::render('admin/dashboard', [
            'employeeQuick' => $employeeQuick,
            'summary' => $summary,
            'attendanceTrend' => $attendanceTrend,
            'leaveUsage' => $leaveUsage,
            'scheduleAlerts' => $scheduleAlerts,
        ]);
    }
}
