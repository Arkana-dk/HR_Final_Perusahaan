<?php

namespace App\Http\Controllers\Time;

use App\Http\Controllers\Controller;
use App\Models\AttendanceLog;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function __construct(
        private readonly ScopeAuthorizationService $scopeAuthorizationService,
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'status' => $request->string('status')->toString(),
            'approval' => $request->string('approval')->toString(),
            'date' => $request->string('date')->toString(),
        ];

        $query = AttendanceLog::with([
            'employee.user:id,name,email',
            'shift:id,name,start_time,end_time',
            'workLocation:id,name',
            'photos:id,attendance_log_id,type,file_path',
        ]);
        $this->scopeAuthorizationService->scopeEmployeeQuery($request->user(), $query);

        if ($filters['search'] !== '') {
            $search = $filters['search'];
            $query->whereHas('employee', function ($employeeQuery) use ($search) {
                $employeeQuery
                    ->where('employee_code', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        if ($filters['status'] !== '') {
            $query->where('status', $filters['status']);
        }

        if ($filters['approval'] !== '') {
            $query->where('approval_status', $filters['approval']);
        }

        if ($filters['date'] !== '') {
            $query->whereDate('work_date', $filters['date']);
        }

        $logs = $query
            ->orderByDesc('work_date')
            ->orderByDesc('check_in_at')
            ->paginate(12)
            ->withQueryString();

        $statsQuery = AttendanceLog::query();
        $this->scopeAuthorizationService->scopeEmployeeQuery($request->user(), $statsQuery);

        $stats = [
            'total' => (clone $statsQuery)->count(),
            'late' => (clone $statsQuery)->where('status', 'late')->count(),
            'pending' => (clone $statsQuery)->where('approval_status', 'pending')->count(),
            'approved' => (clone $statsQuery)->where('approval_status', 'approved')->count(),
        ];

        return Inertia::render('attendance/index', [
            'logs' => $logs,
            'filters' => $filters,
            'stats' => $stats,
        ]);
    }

    public function approve(Request $request, AttendanceLog $attendance)
    {
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $attendance);
        $before = $attendance->toArray();
        DB::transaction(function () use ($attendance, $request) {
            if ($attendance->approval_status !== 'pending') {
                return;
            }

            $attendance->loadMissing('employee:id,user_id');
            if ((int) ($attendance->employee?->user_id ?? 0) === (int) $request->user()->id) {
                abort(403, 'Anda tidak dapat meng-approve presensi Anda sendiri.');
            }

            $attendance->update([
                'approval_status' => 'approved',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
            ]);
        });

        $attendance->refresh();
        if ($attendance->approval_status === 'approved') {
            $requesterUserId = (int) ($attendance->employee?->user_id ?? 0);
            $reference = $this->notificationService->buildReference($attendance);

            if ($requesterUserId > 0) {
                $this->notificationService->notifyUsers([$requesterUserId], [
                    ...$reference,
                    'type' => 'attendance.approval.approved',
                    'title' => 'Koreksi Presensi Disetujui',
                    'message' => 'Permintaan presensi Anda telah disetujui.',
                ]);
            }

            $this->auditLogService->fromRequest($request, 'attendance_logs', 'attendance.approve', [
                'subject' => 'attendance_log',
                'reference_type' => $attendance::class,
                'reference_id' => $attendance->id,
                'notes' => 'Presensi disetujui.',
                'before_data' => $before,
                'after_data' => $attendance->toArray(),
            ]);
        }

        return back();
    }

    public function reject(Request $request, AttendanceLog $attendance)
    {
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $attendance);
        $data = $request->validate([
            'notes' => ['required', 'string', 'max:500'],
        ]);

        $before = $attendance->toArray();
        DB::transaction(function () use ($attendance, $request, $data) {
            if ($attendance->approval_status !== 'pending') {
                return;
            }

            $attendance->loadMissing('employee:id,user_id');
            if ((int) ($attendance->employee?->user_id ?? 0) === (int) $request->user()->id) {
                abort(403, 'Anda tidak dapat meng-approve presensi Anda sendiri.');
            }

            $attendance->update([
                'approval_status' => 'rejected',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
                'notes' => trim((string) $data['notes']),
            ]);
        });

        $attendance->refresh();
        if ($attendance->approval_status === 'rejected') {
            $requesterUserId = (int) ($attendance->employee?->user_id ?? 0);
            $reference = $this->notificationService->buildReference($attendance);

            if ($requesterUserId > 0) {
                $this->notificationService->notifyUsers([$requesterUserId], [
                    ...$reference,
                    'type' => 'attendance.approval.rejected',
                    'title' => 'Koreksi Presensi Ditolak',
                    'message' => 'Permintaan presensi Anda ditolak.',
                    'meta' => [
                        'notes' => $attendance->notes,
                    ],
                ]);
            }

            $this->auditLogService->fromRequest($request, 'attendance_logs', 'attendance.reject', [
                'subject' => 'attendance_log',
                'reference_type' => $attendance::class,
                'reference_id' => $attendance->id,
                'notes' => 'Presensi ditolak.',
                'before_data' => $before,
                'after_data' => $attendance->toArray(),
            ]);
        }

        return back();
    }
}
