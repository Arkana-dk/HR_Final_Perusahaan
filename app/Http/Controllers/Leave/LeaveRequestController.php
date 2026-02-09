<?php

namespace App\Http\Controllers\Leave;

use App\Http\Controllers\Controller;
use App\Models\Approval;
use App\Models\ApprovalStep;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LeaveRequestController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'status' => $request->string('status')->toString(),
            'type' => $request->string('type')->toString(),
            'date' => $request->string('date')->toString(),
        ];

        $query = LeaveRequest::with([
            'employee.user:id,name,email,role',
            'leaveType:id,name',
            'approvedBy:id,name',
            'approval.steps.approver:id,name',
        ]);

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

        if ($filters['type'] !== '') {
            $query->where('leave_type_id', $filters['type']);
        }

        if ($filters['date'] !== '') {
            $query
                ->whereDate('start_date', '<=', $filters['date'])
                ->whereDate('end_date', '>=', $filters['date']);
        }

        $requests = $query
            ->orderByDesc('requested_at')
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        $requests->getCollection()->each(function (LeaveRequest $leaveRequest) {
            $this->ensureApprovalFlow($leaveRequest);
        });

        $stats = [
            'total' => LeaveRequest::count(),
            'pending' => LeaveRequest::where('status', 'pending')->count(),
            'approved' => LeaveRequest::where('status', 'approved')->count(),
            'rejected' => LeaveRequest::where('status', 'rejected')->count(),
        ];

        $leaveTypes = LeaveType::orderBy('name')
            ->get(['id', 'name'])
            ->map(fn ($type) => [
                'value' => (string) $type->id,
                'label' => $type->name,
            ])
            ->all();

        return Inertia::render('leave/requests/index', [
            'requests' => $requests,
            'filters' => $filters,
            'stats' => $stats,
            'leaveTypes' => $leaveTypes,
        ]);
    }

    public function approve(Request $request, LeaveRequest $leaveRequest)
    {
        $role = $request->user()->role ?? 'employee';
        $approverUserId = (int) $request->user()->id;

        DB::transaction(function () use ($leaveRequest, $request, $role, $approverUserId) {
            $approval = $this->ensureApprovalFlow($leaveRequest);

            if (in_array($approval->status, ['approved', 'rejected', 'cancelled'], true)) {
                return;
            }

            $stepsConfig = $this->approvalStepsConfigFor($leaveRequest);
            $currentStep = $approval->current_step ?? 1;
            $this->assertRoleForStep($role, $currentStep, $stepsConfig);
            $this->assertNotSelfApproval($approverUserId, $leaveRequest, $approval);
            $this->assertUniqueApproverByStep($approval, $currentStep, $approverUserId);

            $step = $approval->steps()->where('step', $currentStep)->first();
            if ($step && $step->status !== 'approved') {
                $step->update([
                    'status' => 'approved',
                    'approver_user_id' => $approverUserId,
                    'decided_at' => now(),
                ]);
            }

            if ($currentStep < count($stepsConfig)) {
                $approval->update([
                    'status' => 'in_review',
                    'current_step' => $currentStep + 1,
                ]);
                return;
            }

            $approval->update([
                'status' => 'approved',
                'final_decided_at' => now(),
            ]);

            $leaveRequest->update([
                'status' => 'approved',
                'approved_by_user_id' => $approverUserId,
                'approved_at' => now(),
            ]);
        });

        return back();
    }

    public function reject(Request $request, LeaveRequest $leaveRequest)
    {
        $role = $request->user()->role ?? 'employee';
        $approverUserId = (int) $request->user()->id;

        DB::transaction(function () use ($leaveRequest, $request, $role, $approverUserId) {
            $approval = $this->ensureApprovalFlow($leaveRequest);

            if (in_array($approval->status, ['approved', 'rejected', 'cancelled'], true)) {
                return;
            }

            $stepsConfig = $this->approvalStepsConfigFor($leaveRequest);
            $currentStep = $approval->current_step ?? 1;
            $this->assertRoleForStep($role, $currentStep, $stepsConfig);
            $this->assertNotSelfApproval($approverUserId, $leaveRequest, $approval);
            $this->assertUniqueApproverByStep($approval, $currentStep, $approverUserId);

            $notes = $request->string('notes')->toString();

            $step = $approval->steps()->where('step', $currentStep)->first();
            if ($step) {
                $step->update([
                    'status' => 'rejected',
                    'approver_user_id' => $approverUserId,
                    'decided_at' => now(),
                    'notes' => $notes ?: $step->notes,
                ]);
            }

            $approval->update([
                'status' => 'rejected',
                'final_decided_at' => now(),
                'notes' => $notes ?: $approval->notes,
            ]);

            $leaveRequest->update([
                'status' => 'rejected',
                'approved_by_user_id' => $approverUserId,
                'approved_at' => now(),
                'approval_notes' => $notes ?: $leaveRequest->approval_notes,
            ]);
        });

        return back();
    }

    private function ensureApprovalFlow(LeaveRequest $leaveRequest): Approval
    {
        $approval = $leaveRequest->approval;
        if ($approval) {
            $approval->loadMissing('steps');
            $this->ensureApprovalSteps($leaveRequest, $approval);

            if (!$approval->requested_by_user_id) {
                $approval->update([
                    'requested_by_user_id' => $this->requesterUserId($leaveRequest),
                ]);
            }

            return $approval;
        }

        $requestedBy = $this->requesterUserId($leaveRequest);

        $approval = $leaveRequest->approval()->create([
            'status' => 'pending',
            'current_step' => 1,
            'requested_by_user_id' => $requestedBy,
            'requested_at' => $leaveRequest->requested_at ?? Carbon::now(),
        ]);

        $this->ensureApprovalSteps($leaveRequest, $approval);

        $approval->load('steps');
        $leaveRequest->setRelation('approval', $approval);

        return $approval;
    }

    private function approvalStepsConfigFor(LeaveRequest $leaveRequest): array
    {
        $requesterRole = $this->requesterRole($leaveRequest);

        return match ($requesterRole) {
            'admin' => [
                1 => ['superadmin'],
            ],
            'superadmin' => [
                1 => ['superadmin'],
            ],
            default => [
                1 => ['admin', 'superadmin'],
                2 => ['superadmin'],
            ],
        };
    }

    private function ensureApprovalSteps(LeaveRequest $leaveRequest, Approval $approval): void
    {
        $existing = $approval->steps->keyBy('step');

        foreach ($this->approvalStepsConfigFor($leaveRequest) as $step => $roles) {
            if ($existing->has($step)) {
                continue;
            }

            ApprovalStep::create([
                'approval_id' => $approval->id,
                'step' => $step,
                'status' => 'pending',
            ]);
        }

        $approval->loadMissing('steps');
    }

    private function requesterUserId(LeaveRequest $leaveRequest): ?int
    {
        $leaveRequest->loadMissing('employee');

        return $leaveRequest->employee?->user_id;
    }

    private function requesterRole(LeaveRequest $leaveRequest): string
    {
        $leaveRequest->loadMissing('employee.user:id,role');

        return $leaveRequest->employee?->user?->role ?? 'employee';
    }

    private function assertRoleForStep(string $role, int $step, array $stepsConfig): void
    {
        $allowed = $stepsConfig[$step] ?? [];

        if (!in_array($role, $allowed, true)) {
            abort(403, 'Anda tidak memiliki akses untuk approval step ini.');
        }
    }

    private function assertNotSelfApproval(
        int $approverUserId,
        LeaveRequest $leaveRequest,
        Approval $approval,
    ): void {
        $requesterUserId = $approval->requested_by_user_id ?: $this->requesterUserId($leaveRequest);

        if ($requesterUserId && $requesterUserId === $approverUserId) {
            abort(403, 'Anda tidak dapat meng-approve pengajuan Anda sendiri.');
        }
    }

    private function assertUniqueApproverByStep(
        Approval $approval,
        int $currentStep,
        int $approverUserId,
    ): void {
        if ($currentStep <= 1) {
            return;
        }

        $alreadyDecided = $approval->steps()
            ->where('step', '<', $currentStep)
            ->where('approver_user_id', $approverUserId)
            ->whereNotNull('decided_at')
            ->exists();

        if ($alreadyDecided) {
            abort(403, 'Approver di setiap step harus berbeda pengguna.');
        }
    }
}
