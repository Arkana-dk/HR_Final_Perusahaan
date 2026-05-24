<?php

namespace App\Http\Controllers\Documents;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\EmployeeDocument;
use App\Services\AuditLogService;
use App\Services\FileStorageService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EmployeeDocumentController extends Controller
{
    public function __construct(
        private readonly ScopeAuthorizationService $scopeAuthorizationService,
        private readonly FileStorageService $fileStorageService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'status' => $request->string('status')->toString(),
            'type' => $request->string('type')->toString(),
        ];

        $query = EmployeeDocument::with(['employee.user:id,name,email']);
        $this->scopeAuthorizationService->scopeEmployeeQuery($request->user(), $query);

        if ($filters['search'] !== '') {
            $search = $filters['search'];
            $query->where(function ($documentQuery) use ($search) {
                $documentQuery
                    ->where('type', 'like', "%{$search}%")
                    ->orWhere('number', 'like', "%{$search}%")
                    ->orWhereHas('employee', function ($employeeQuery) use ($search) {
                        $employeeQuery
                            ->where('employee_code', 'like', "%{$search}%")
                            ->orWhereHas('user', function ($userQuery) use ($search) {
                                $userQuery
                                    ->where('name', 'like', "%{$search}%")
                                    ->orWhere('email', 'like', "%{$search}%");
                            });
                    });
            });
        }

        if ($filters['type'] !== '') {
            $query->where('type', $filters['type']);
        }

        if ($filters['status'] !== '') {
            $today = Carbon::today();
            $expiringLimit = $today->copy()->addDays(30);
            $expiring14 = $today->copy()->addDays(14);
            $expiring7 = $today->copy()->addDays(7);

            if ($filters['status'] === 'expired') {
                $query->whereNotNull('expires_at')
                    ->whereDate('expires_at', '<', $today);
            } elseif ($filters['status'] === 'expiring_h7') {
                $query->whereNotNull('expires_at')
                    ->whereBetween('expires_at', [$today, $expiring7]);
            } elseif ($filters['status'] === 'expiring_h14') {
                $query->whereNotNull('expires_at')
                    ->whereBetween('expires_at', [$today, $expiring14]);
            } elseif ($filters['status'] === 'expiring') {
                $query->whereNotNull('expires_at')
                    ->whereBetween('expires_at', [$today, $expiringLimit]);
            } elseif ($filters['status'] === 'valid') {
                $query->where(function ($validQuery) use ($expiringLimit) {
                    $validQuery
                        ->whereNull('expires_at')
                        ->orWhereDate('expires_at', '>', $expiringLimit);
                });
            }
        }

        $documents = $query
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        $today = Carbon::today();
        $expiringLimit = $today->copy()->addDays(30);
        $expiring14 = $today->copy()->addDays(14);
        $expiring7 = $today->copy()->addDays(7);

        $scopedStatsQuery = EmployeeDocument::query();
        $this->scopeAuthorizationService->scopeEmployeeQuery($request->user(), $scopedStatsQuery);

        $stats = [
            'total' => (clone $scopedStatsQuery)->count(),
            'expired' => (clone $scopedStatsQuery)->whereNotNull('expires_at')
                ->whereDate('expires_at', '<', $today)
                ->count(),
            'expiring' => (clone $scopedStatsQuery)->whereNotNull('expires_at')
                ->whereBetween('expires_at', [$today, $expiringLimit])
                ->count(),
            'expiring_h14' => (clone $scopedStatsQuery)->whereNotNull('expires_at')
                ->whereBetween('expires_at', [$today, $expiring14])
                ->count(),
            'expiring_h7' => (clone $scopedStatsQuery)->whereNotNull('expires_at')
                ->whereBetween('expires_at', [$today, $expiring7])
                ->count(),
        ];

        return Inertia::render('documents/index', [
            'documents' => $documents,
            'filters' => $filters,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        return Inertia::render('documents/form', [
            'mode' => 'create',
            'document' => null,
            'employees' => $this->employeeOptions(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());
        $this->scopeAuthorizationService->assertCanAccessModel(
            $request->user(),
            Employee::query()->findOrFail($validated['employee_id']),
            'Akses dokumen karyawan lintas scope tidak diizinkan.',
        );

        $created = null;
        DB::transaction(function () use ($request, $validated, &$created) {
            $payload = $validated;
            $payload['file_path'] = $request->file('file')
                ? $this->fileStorageService->storePrivate(
                    $request->file('file'),
                    "employees/{$validated['employee_id']}/documents",
                )
                : null;

            $created = EmployeeDocument::create($payload);
        });

        if ($created instanceof EmployeeDocument) {
            $this->auditLogService->fromRequest($request, 'documents', 'document.upload', [
                'subject' => 'employee_document',
                'reference_type' => $created::class,
                'reference_id' => $created->id,
                'notes' => 'Dokumen karyawan diunggah.',
                'after_data' => $created->toArray(),
            ]);
        }

        return redirect()->route('documents.index');
    }

    public function edit(EmployeeDocument $document)
    {
        $this->scopeAuthorizationService->assertCanAccessModel(request()->user(), $document);
        $document->load('employee.user');

        return Inertia::render('documents/form', [
            'mode' => 'edit',
            'document' => $document,
            'employees' => $this->employeeOptions(),
        ]);
    }

    public function update(Request $request, EmployeeDocument $document)
    {
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $document);
        $validated = $request->validate($this->rules());
        $this->scopeAuthorizationService->assertCanAccessModel(
            $request->user(),
            Employee::query()->findOrFail($validated['employee_id']),
            'Akses dokumen karyawan lintas scope tidak diizinkan.',
        );
        $before = $document->toArray();

        DB::transaction(function () use ($request, $validated, $document) {
            $payload = $validated;

            if ($request->hasFile('file')) {
                $this->fileStorageService->deletePrivate($document->file_path);
                $payload['file_path'] = $this->fileStorageService->storePrivate(
                    $request->file('file'),
                    "employees/{$validated['employee_id']}/documents",
                );
            }

            $document->update($payload);
        });

        $document->refresh();
        $this->auditLogService->fromRequest($request, 'documents', 'document.update', [
            'subject' => 'employee_document',
            'reference_type' => $document::class,
            'reference_id' => $document->id,
            'notes' => 'Dokumen karyawan diperbarui.',
            'before_data' => $before,
            'after_data' => $document->toArray(),
        ]);

        return redirect()->route('documents.index');
    }

    public function destroy(Request $request, EmployeeDocument $document)
    {
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $document);
        $before = $document->toArray();
        $this->fileStorageService->deletePrivate($document->file_path);
        $document->delete();

        $this->auditLogService->fromRequest($request, 'documents', 'document.delete', [
            'subject' => 'employee_document',
            'reference_type' => $document::class,
            'reference_id' => $document->id,
            'notes' => 'Dokumen karyawan dihapus.',
            'before_data' => $before,
        ]);

        return redirect()->route('documents.index');
    }

    private function rules(): array
    {
        return [
            'employee_id' => ['required', 'exists:employees,id'],
            'type' => ['required', 'string', 'max:100'],
            'number' => ['nullable', 'string', 'max:100'],
            'issued_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'max:5120'],
        ];
    }

    private function employeeOptions()
    {
        $query = Employee::with('user:id,name');
        $this->scopeAuthorizationService->scopeEmployees(request()->user(), $query);

        return $query
            ->orderBy('employee_code')
            ->get(['id', 'employee_code', 'user_id'])
            ->map(fn ($employee) => [
                'id' => $employee->id,
                'employee_code' => $employee->employee_code,
                'name' => $employee->user?->name,
            ])
            ->values();
    }
}
