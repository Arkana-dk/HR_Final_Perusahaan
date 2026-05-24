<?php

namespace App\Http\Controllers\Contracts;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\EmployeeContract;
use App\Services\AuditLogService;
use App\Services\FileStorageService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmployeeContractController extends Controller
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
            'reminder' => $request->string('reminder')->toString(),
        ];

        $query = EmployeeContract::with(['employee.user:id,name,email']);
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

        if ($filters['type'] !== '') {
            $query->where('type', $filters['type']);
        }

        if ($filters['reminder'] !== '') {
            $today = Carbon::today();

            if ($filters['reminder'] === 'expired') {
                $query->whereNotNull('end_date')
                    ->whereDate('end_date', '<', $today);
            } else {
                $days = match ($filters['reminder']) {
                    'h7' => 7,
                    'h14' => 14,
                    default => 30,
                };

                $query->where('status', 'active')
                    ->whereNotNull('end_date')
                    ->whereDate('end_date', '>=', $today)
                    ->whereDate('end_date', '<=', $today->copy()->addDays($days));
            }
        }

        $contracts = $query
            ->orderByDesc('start_date')
            ->paginate(12)
            ->withQueryString();

        $scopedStatsQuery = EmployeeContract::query();
        $this->scopeAuthorizationService->scopeEmployeeQuery($request->user(), $scopedStatsQuery);

        $today = Carbon::today();
        $stats = [
            'total' => (clone $scopedStatsQuery)->count(),
            'active' => (clone $scopedStatsQuery)->where('status', 'active')->count(),
            'expired' => (clone $scopedStatsQuery)->where('status', 'expired')->count(),
            'terminated' => (clone $scopedStatsQuery)->where('status', 'terminated')->count(),
            'expiring_h30' => (clone $scopedStatsQuery)
                ->where('status', 'active')
                ->whereNotNull('end_date')
                ->whereDate('end_date', '>=', $today)
                ->whereDate('end_date', '<=', $today->copy()->addDays(30))
                ->count(),
            'expiring_h14' => (clone $scopedStatsQuery)
                ->where('status', 'active')
                ->whereNotNull('end_date')
                ->whereDate('end_date', '>=', $today)
                ->whereDate('end_date', '<=', $today->copy()->addDays(14))
                ->count(),
            'expiring_h7' => (clone $scopedStatsQuery)
                ->where('status', 'active')
                ->whereNotNull('end_date')
                ->whereDate('end_date', '>=', $today)
                ->whereDate('end_date', '<=', $today->copy()->addDays(7))
                ->count(),
        ];

        return Inertia::render('contracts/index', [
            'contracts' => $contracts,
            'filters' => $filters,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        return Inertia::render('contracts/form', [
            'mode' => 'create',
            'contract' => null,
            'employees' => $this->employeeOptions(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());
        $this->scopeAuthorizationService->assertCanAccessModel(
            $request->user(),
            Employee::query()->findOrFail($validated['employee_id']),
            'Akses kontrak karyawan lintas scope tidak diizinkan.',
        );

        $created = null;
        DB::transaction(function () use ($request, $validated, &$created) {
            $payload = $validated;
            $payload['file_path'] = $request->file('file')
                ? $this->fileStorageService->storePrivate(
                    $request->file('file'),
                    'contracts/'.$validated['employee_id'],
                )
                : null;

            $created = EmployeeContract::create($payload);
        });

        if ($created instanceof EmployeeContract) {
            $this->auditLogService->fromRequest($request, 'contracts', 'contract.upload', [
                'subject' => 'employee_contract',
                'reference_type' => $created::class,
                'reference_id' => $created->id,
                'notes' => 'Kontrak karyawan diunggah/dibuat.',
                'after_data' => $created->toArray(),
            ]);
        }

        return redirect()->route('contracts.index');
    }

    public function edit(EmployeeContract $contract)
    {
        $this->scopeAuthorizationService->assertCanAccessModel(request()->user(), $contract);
        $contract->load('employee.user');

        return Inertia::render('contracts/form', [
            'mode' => 'edit',
            'contract' => $contract,
            'employees' => $this->employeeOptions(),
        ]);
    }

    public function update(Request $request, EmployeeContract $contract)
    {
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $contract);
        $validated = $request->validate($this->rules($contract));
        $this->scopeAuthorizationService->assertCanAccessModel(
            $request->user(),
            Employee::query()->findOrFail($validated['employee_id']),
            'Akses kontrak karyawan lintas scope tidak diizinkan.',
        );
        $before = $contract->toArray();

        DB::transaction(function () use ($request, $validated, $contract) {
            $payload = $validated;

            if ($request->hasFile('file')) {
                $this->fileStorageService->deletePrivate($contract->file_path);
                $payload['file_path'] = $this->fileStorageService->storePrivate(
                    $request->file('file'),
                    'contracts/'.$validated['employee_id'],
                );
            }

            $contract->update($payload);
        });

        $contract->refresh();
        $this->auditLogService->fromRequest($request, 'contracts', 'contract.update', [
            'subject' => 'employee_contract',
            'reference_type' => $contract::class,
            'reference_id' => $contract->id,
            'notes' => 'Kontrak karyawan diperbarui.',
            'before_data' => $before,
            'after_data' => $contract->toArray(),
        ]);

        return redirect()->route('contracts.index');
    }

    public function destroy(Request $request, EmployeeContract $contract)
    {
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $contract);
        $before = $contract->toArray();
        $this->fileStorageService->deletePrivate($contract->file_path);
        $contract->delete();

        $this->auditLogService->fromRequest($request, 'contracts', 'contract.delete', [
            'subject' => 'employee_contract',
            'reference_type' => $contract::class,
            'reference_id' => $contract->id,
            'notes' => 'Kontrak karyawan dihapus.',
            'before_data' => $before,
        ]);

        return redirect()->route('contracts.index');
    }

    private function rules(?EmployeeContract $contract = null): array
    {
        return [
            'employee_id' => ['required', 'exists:employees,id'],
            'type' => ['required', Rule::in(['permanent', 'contract', 'internship', 'probation'])],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date'],
            'base_salary' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', Rule::in(['active', 'expired', 'terminated'])],
            'signed_at' => ['nullable', 'date'],
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
