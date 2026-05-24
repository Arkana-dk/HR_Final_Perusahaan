<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
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
        $data = $this->dashboardMetricsService->buildEmployeeDashboard(request()->user());

        return Inertia::render('employee/dashboard', [
            'summary' => $data['summary'],
            'attendanceWeekly' => $data['attendance_weekly'],
            'leaveBalance' => $data['leave_balance'],
            'upcoming' => $data['upcoming'],
            'reminders' => $data['reminders'],
        ]);
    }
}
