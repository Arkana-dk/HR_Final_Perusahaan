<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\ReimburseRequest;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ReimburseController extends Controller
{
    use ApiResponse;
    use ResolvesEmployee;

    public function __construct(
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $filters = $request->validate([
            'status' => ['nullable', 'string', 'max:30'],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = ReimburseRequest::with('approvedBy:id,name')
            ->where('employee_id', $employee->id)
            ->orderByDesc('requested_at')
            ->orderByDesc('id');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['from'])) {
            $query->whereDate('requested_at', '>=', $filters['from']);
        }

        if (!empty($filters['to'])) {
            $query->whereDate('requested_at', '<=', $filters['to']);
        }

        $perPage = (int) ($filters['per_page'] ?? 10);
        $requests = $query->paginate($perPage)->withQueryString();

        return $this->successResponse(
            $requests->getCollection()
                ->map(fn (ReimburseRequest $item) => $this->mapRequest($item))
                ->values()
                ->all(),
            'Riwayat reimburse berhasil diambil.',
            200,
            [
                'current_page' => $requests->currentPage(),
                'last_page' => $requests->lastPage(),
                'per_page' => $requests->perPage(),
                'total' => $requests->total(),
            ],
        );
    }

    public function show(Request $request, ReimburseRequest $reimburseRequest)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $reimburseRequest);
        $reimburseRequest->load('approvedBy:id,name');

        return $this->successResponse(
            $this->mapRequest($reimburseRequest),
            'Detail reimburse berhasil diambil.',
        );
    }

    public function store(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $data = $request->validate([
            'category' => ['required', 'string', 'max:100'],
            'title' => ['nullable', 'string', 'max:150'],
            'amount' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string', 'size:3'],
            'description' => ['nullable', 'string', 'max:1000'],
            'attachment' => ['nullable', 'file', 'max:4096'],
        ]);

        $path = null;
        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('reimbursements', 'public');
        }

        $reimburse = null;
        DB::transaction(function () use (&$reimburse, $employee, $data, $path) {
            $reimburse = ReimburseRequest::create([
                'employee_id' => $employee->id,
                'category' => $data['category'],
                'title' => $data['title'] ?? null,
                'amount' => $data['amount'],
                'currency' => strtoupper($data['currency']),
                'description' => $data['description'] ?? null,
                'attachment_path' => $path,
                'status' => 'pending',
                'requested_at' => now(),
            ]);
        });

        $employee->loadMissing('manager');
        $reference = $this->notificationService->buildReference($reimburse);
        $this->notificationService->notifyApprovalAudience($employee, [
            ...$reference,
            'type' => 'reimburse.request.created',
            'title' => 'Pengajuan Reimburse Baru',
            'message' => sprintf(
                '%s mengajukan reimburse %s %.0f.',
                $request->user()->name,
                strtoupper((string) $reimburse->currency),
                (float) $reimburse->amount,
            ),
            'meta' => [
                'employee_id' => $employee->id,
                'reimburse_request_id' => $reimburse->id,
            ],
        ]);

        $this->auditLogService->fromRequest($request, 'reimburse_requests', 'reimburse.create', [
            'subject' => 'reimburse_request',
            'reference_type' => $reimburse::class,
            'reference_id' => $reimburse->id,
            'notes' => 'Pengajuan reimburse dibuat dari mobile.',
            'after_data' => $reimburse->toArray(),
        ]);

        return $this->successResponse(
            $this->mapRequest($reimburse),
            'Pengajuan reimburse berhasil dikirim.',
            201,
        );
    }

    public function cancel(Request $request, ReimburseRequest $reimburseRequest)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $reimburseRequest);

        if ($reimburseRequest->status !== 'pending') {
            throw ValidationException::withMessages([
                'status' => 'Hanya pengajuan pending yang dapat dibatalkan.',
            ]);
        }

        $before = $reimburseRequest->toArray();
        $reimburseRequest->update([
            'status' => 'cancelled',
        ]);

        $reference = $this->notificationService->buildReference($reimburseRequest);
        $this->notificationService->notifyUsers([(int) $request->user()->id], [
            ...$reference,
            'type' => 'reimburse.request.cancelled',
            'title' => 'Pengajuan Reimburse Dibatalkan',
            'message' => 'Pengajuan reimburse Anda berhasil dibatalkan.',
        ]);

        $this->auditLogService->fromRequest($request, 'reimburse_requests', 'reimburse.cancel', [
            'subject' => 'reimburse_request',
            'reference_type' => $reimburseRequest::class,
            'reference_id' => $reimburseRequest->id,
            'notes' => 'Pengajuan reimburse dibatalkan dari mobile.',
            'before_data' => $before,
            'after_data' => $reimburseRequest->toArray(),
        ]);

        return $this->successResponse(
            $this->mapRequest($reimburseRequest),
            'Pengajuan reimburse dibatalkan.',
        );
    }

    private function assertOwnedByEmployee(Employee $employee, ReimburseRequest $request): void
    {
        if ((int) $request->employee_id !== (int) $employee->id) {
            abort(404);
        }
    }

    private function mapRequest(ReimburseRequest $request): array
    {
        return [
            'id' => $request->id,
            'category' => $request->category,
            'title' => $request->title,
            'amount' => (float) $request->amount,
            'currency' => $request->currency,
            'description' => $request->description,
            'status' => $request->status,
            'approval_notes' => $request->approval_notes,
            'attachment_path' => $request->attachment_path,
            'attachment_url' => $request->attachment_path
                ? Storage::disk('public')->url($request->attachment_path)
                : null,
            'requested_at' => optional($request->requested_at)?->toDateTimeString(),
            'approved_at' => optional($request->approved_at)?->toDateTimeString(),
            'approved_by' => $request->approvedBy?->name,
        ];
    }
}
