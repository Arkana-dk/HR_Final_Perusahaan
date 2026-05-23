<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\ReimburseRequest;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EmployeeReimburseController extends Controller
{
    public function __construct(
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $employee = Employee::with('company:id,name')
            ->where('user_id', $request->user()->id)
            ->first();

        $requests = $employee
            ? ReimburseRequest::where('employee_id', $employee->id)
                ->orderByDesc('requested_at')
                ->paginate(10)
                ->withQueryString()
            : null;

        return Inertia::render('employee/reimburse/index', [
            'employee' => [
                'name' => $request->user()->name,
                'employee_code' => $employee?->employee_code ?? '-',
                'company' => $employee?->company?->name,
            ],
            'employeeProfileMissing' => $employee === null,
            'requests' => $requests
                ? $this->paginationPayload($requests)
                : $this->emptyPagination(),
        ]);
    }

    public function store(Request $request)
    {
        $employee = Employee::where('user_id', $request->user()->id)->first();
        if (!$employee) {
            return back()->withErrors([
                'employee' => 'Profil karyawan belum terhubung. Hubungi admin HR untuk melengkapi data karyawan Anda.',
            ]);
        }

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

        $reimburseRequest = null;
        DB::transaction(function () use (&$reimburseRequest, $employee, $data, $path) {
            $reimburseRequest = ReimburseRequest::create([
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

        if ($reimburseRequest) {
            $employee->loadMissing('manager');
            $reference = $this->notificationService->buildReference($reimburseRequest);

            $this->notificationService->notifyApprovalAudience($employee, [
                ...$reference,
                'type' => 'reimburse.request.created',
                'title' => 'Pengajuan Reimburse Baru',
                'message' => sprintf(
                    '%s mengajukan reimburse %s %.0f.',
                    $request->user()->name,
                    strtoupper((string) $reimburseRequest->currency),
                    (float) $reimburseRequest->amount,
                ),
            ]);

            $this->auditLogService->fromRequest($request, 'reimburse_requests', 'reimburse.create.web', [
                'subject' => 'reimburse_request',
                'reference_type' => $reimburseRequest::class,
                'reference_id' => $reimburseRequest->id,
                'notes' => 'Pengajuan reimburse dibuat dari web self-service.',
                'after_data' => $reimburseRequest->toArray(),
            ]);
        }

        return back()->with('success', 'Pengajuan reimburse berhasil dikirim.');
    }

    private function paginationPayload(LengthAwarePaginator $paginator): array
    {
        return [
            'data' => $paginator->items(),
            'links' => $paginator->linkCollection()
                ->map(fn ($link) => [
                    'url' => $link['url'],
                    'label' => $link['label'],
                    'active' => $link['active'],
                ])
                ->values()
                ->all(),
            'meta' => [
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
            ],
        ];
    }

    private function emptyPagination(): array
    {
        return [
            'data' => [],
            'links' => [],
            'meta' => [
                'from' => null,
                'to' => null,
                'total' => 0,
            ],
        ];
    }
}
