<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use App\Models\JobLevel;
use App\Models\Position;
use App\Services\DashboardMetricsService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private readonly DashboardMetricsService $dashboardMetricsService,
    ) {
    }

    public function index()
    {
        $user = request()->user();
        $employees = Employee::with('user:id,name,email,role')
            ->orderByDesc('created_at')
            ->take(50)
            ->get([
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
            'companies' => Company::orderBy('name')->get(['id', 'name']),
            'branches' => Branch::orderBy('name')->get(['id', 'name', 'company_id']),
            'departments' => Department::orderBy('name')->get(['id', 'name', 'branch_id']),
            'positions' => Position::orderBy('title')->get(['id', 'title', 'department_id']),
            'jobLevels' => JobLevel::orderBy('rank')->get(['id', 'name']),
            'managers' => Employee::with('user:id,name')
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
        $headcountData = $this->dashboardMetricsService->buildHeadcountTrend($user);
        $attendanceData = [
            ['name' => 'Hadir', 'value' => (int) ($summary['attendance_today']['checked_in'] ?? 0)],
            ['name' => 'Terlambat', 'value' => (int) ($summary['attendance_today']['late'] ?? 0)],
            ['name' => 'Alpha', 'value' => (int) ($summary['attendance_today']['absent'] ?? 0)],
            ['name' => 'Pending', 'value' => (int) ($summary['pending']['attendance'] ?? 0)],
        ];
        $approvals = [
            ['title' => 'Pengajuan Cuti', 'count' => (int) ($summary['pending']['leave'] ?? 0), 'sla' => 'Hari ini'],
            ['title' => 'Lembur', 'count' => (int) ($summary['pending']['overtime'] ?? 0), 'sla' => 'Maks 1 hari'],
            ['title' => 'Reimburse', 'count' => (int) ($summary['pending']['reimburse'] ?? 0), 'sla' => 'Maks 2 hari'],
            ['title' => 'Koreksi Presensi', 'count' => (int) ($summary['pending']['attendance_correction'] ?? 0), 'sla' => 'Maks 1 hari'],
        ];
        $criticalNotifications = [
            sprintf(
                'Kontrak karyawan yang akan berakhir dalam 30 hari: %d.',
                (int) ($summary['alerts']['contracts_expiring_30'] ?? 0),
            ),
            sprintf(
                'Dokumen karyawan yang mendekati kadaluarsa: %d.',
                (int) ($summary['alerts']['documents_expiring_30'] ?? 0),
            ),
            sprintf(
                'Notifikasi belum dibaca: %d.',
                (int) ($summary['alerts']['unread_notifications'] ?? 0),
            ),
        ];

        return Inertia::render('superadmin/dashboard', [
            'employeeQuick' => $employeeQuick,
            'summary' => $summary,
            'headcountData' => $headcountData,
            'attendanceData' => $attendanceData,
            'approvals' => $approvals,
            'criticalNotifications' => $criticalNotifications,
        ]);
    }
}
