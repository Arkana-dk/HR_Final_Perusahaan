<?php

namespace App\Http\Controllers\Time;

use App\Http\Controllers\Controller;
use App\Models\OvertimeRequest;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OvertimeController extends Controller
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
            'date' => $request->string('date')->toString(),
        ];

        $query = OvertimeRequest::with([
            'employee.user:id,name,email',
            'approvedBy:id,name',
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

        if ($filters['date'] !== '') {
            $query->whereDate('work_date', $filters['date']);
        }

        $requests = $query
            ->orderByDesc('work_date')
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        $statsQuery = OvertimeRequest::query();
        $this->scopeAuthorizationService->scopeEmployeeQuery($request->user(), $statsQuery);

        $stats = [
            'total' => (clone $statsQuery)->count(),
            'pending' => (clone $statsQuery)->where('status', 'pending')->count(),
            'approved' => (clone $statsQuery)->where('status', 'approved')->count(),
            'rejected' => (clone $statsQuery)->where('status', 'rejected')->count(),
        ];

        return Inertia::render('overtime/index', [
            'requests' => $requests,
            'filters' => $filters,
            'stats' => $stats,
        ]);
    }

    public function approve(Request $request, OvertimeRequest $overtime)
    {
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $overtime);
        $before = $overtime->toArray();
        DB::transaction(function () use ($overtime, $request) {
            if ($overtime->status !== 'pending') {
                return;
            }

            $overtime->loadMissing('employee:id,user_id');
            if ((int) ($overtime->employee?->user_id ?? 0) === (int) $request->user()->id) {
                abort(403, 'Anda tidak dapat meng-approve pengajuan lembur Anda sendiri.');
            }

            $overtime->update([
                'status' => 'approved',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
            ]);
        });

        $overtime->refresh();
        if ($overtime->status === 'approved') {
            $requesterUserId = (int) ($overtime->employee?->user_id ?? 0);
            $reference = $this->notificationService->buildReference($overtime);

            if ($requesterUserId > 0) {
                $this->notificationService->notifyUsers([$requesterUserId], [
                    ...$reference,
                    'type' => 'overtime.request.approved',
                    'title' => 'Pengajuan Lembur Disetujui',
                    'message' => 'Pengajuan lembur Anda telah disetujui.',
                ]);
            }

            $this->auditLogService->fromRequest($request, 'overtime_requests', 'overtime.approve', [
                'subject' => 'overtime_request',
                'reference_type' => $overtime::class,
                'reference_id' => $overtime->id,
                'notes' => 'Pengajuan lembur disetujui.',
                'before_data' => $before,
                'after_data' => $overtime->toArray(),
            ]);
        }

        return back();
    }

    public function reject(Request $request, OvertimeRequest $overtime)
    {
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $overtime);
        $data = $request->validate([
            'notes' => ['required', 'string', 'max:500'],
        ]);

        $before = $overtime->toArray();
        DB::transaction(function () use ($overtime, $request, $data) {
            if ($overtime->status !== 'pending') {
                return;
            }

            $overtime->loadMissing('employee:id,user_id');
            if ((int) ($overtime->employee?->user_id ?? 0) === (int) $request->user()->id) {
                abort(403, 'Anda tidak dapat meng-approve pengajuan lembur Anda sendiri.');
            }

            $overtime->update([
                'status' => 'rejected',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
                'approval_notes' => trim((string) $data['notes']),
            ]);
        });

        $overtime->refresh();
        if ($overtime->status === 'rejected') {
            $requesterUserId = (int) ($overtime->employee?->user_id ?? 0);
            $reference = $this->notificationService->buildReference($overtime);

            if ($requesterUserId > 0) {
                $this->notificationService->notifyUsers([$requesterUserId], [
                    ...$reference,
                    'type' => 'overtime.request.rejected',
                    'title' => 'Pengajuan Lembur Ditolak',
                    'message' => 'Pengajuan lembur Anda ditolak.',
                    'meta' => [
                        'approval_notes' => $overtime->approval_notes,
                    ],
                ]);
            }

            $this->auditLogService->fromRequest($request, 'overtime_requests', 'overtime.reject', [
                'subject' => 'overtime_request',
                'reference_type' => $overtime::class,
                'reference_id' => $overtime->id,
                'notes' => 'Pengajuan lembur ditolak.',
                'before_data' => $before,
                'after_data' => $overtime->toArray(),
            ]);
        }

        return back();
    }
}
