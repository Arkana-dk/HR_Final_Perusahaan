<?php

namespace App\Http\Controllers\Assets;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\AssetAssignmentHistory;
use App\Models\Company;
use App\Models\Employee;
use App\Services\AuditLogService;
use App\Services\EmployeeStatusService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function __construct(
        private readonly ScopeAuthorizationService $scopeAuthorizationService,
        private readonly EmployeeStatusService $employeeStatusService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'status' => $request->string('status')->toString(),
        ];

        $query = Asset::with([
            'company:id,name',
            'assignedEmployee.user:id,name',
        ]);
        $this->applyAssetScope($request, $query);

        if ($filters['search'] !== '') {
            $search = $filters['search'];
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('code', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('serial_number', 'like', "%{$search}%");
            });
        }

        if ($filters['status'] !== '') {
            $query->where('status', $filters['status']);
        }

        $assets = $query
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString();

        $statsQuery = Asset::query();
        $this->applyAssetScope($request, $statsQuery);

        $stats = [
            'total' => (clone $statsQuery)->count(),
            'assigned' => (clone $statsQuery)->where('status', 'assigned')->count(),
            'available' => (clone $statsQuery)->where('status', 'available')->count(),
            'maintenance' => (clone $statsQuery)->where('status', 'maintenance')->count(),
        ];

        return Inertia::render('assets/index', [
            'assets' => $assets,
            'filters' => $filters,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        $user = request()->user();
        $employeesQuery = Employee::with('user:id,name')
            ->where('is_active', true)
            ->whereNotIn('employment_status', ['resign', 'terminated']);
        $this->scopeAuthorizationService->scopeEmployees($user, $employeesQuery);

        return Inertia::render('assets/form', [
            'mode' => 'create',
            'asset' => null,
            'companies' => $this->companyOptions($user),
            'employees' => $employeesQuery->orderBy('employee_code')->get(['id', 'employee_code', 'user_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());
        $this->assertAssetPayloadWithinScope($request, $validated);
        $assignee = $this->resolveAssignee($validated['assigned_employee_id'] ?? null);
        $created = null;

        DB::transaction(function () use ($validated, $request, $assignee, &$created) {
            $asset = Asset::create($validated);
            $created = $asset;

            if ($assignee) {
                AssetAssignmentHistory::create([
                    'asset_id' => $asset->id,
                    'action' => 'assigned',
                    'employee_to_id' => $assignee->id,
                    'actor_user_id' => $request->user()->id,
                    'notes' => 'Penugasan awal asset.',
                    'happened_at' => now(),
                ]);
            }
        });

        if ($created instanceof Asset) {
            $this->auditLogService->fromRequest($request, 'assets', 'asset.create', [
                'subject' => 'asset',
                'reference_type' => $created::class,
                'reference_id' => $created->id,
                'notes' => 'Asset baru dibuat.',
                'after_data' => $created->toArray(),
            ]);
        }

        return redirect()->route('assets.index');
    }

    public function edit(Asset $asset)
    {
        $this->assertCanAccessAsset(request(), $asset);
        $asset->load(['company', 'assignedEmployee.user']);
        $user = request()->user();
        $employeesQuery = Employee::with('user:id,name')
            ->where('is_active', true)
            ->whereNotIn('employment_status', ['resign', 'terminated']);
        $this->scopeAuthorizationService->scopeEmployees($user, $employeesQuery);

        return Inertia::render('assets/form', [
            'mode' => 'edit',
            'asset' => $asset,
            'companies' => $this->companyOptions($user),
            'employees' => $employeesQuery->orderBy('employee_code')->get(['id', 'employee_code', 'user_id']),
        ]);
    }

    public function update(Request $request, Asset $asset)
    {
        $this->assertCanAccessAsset($request, $asset);
        $validated = $request->validate($this->rules($asset));
        $this->assertAssetPayloadWithinScope($request, $validated);
        $assignee = $this->resolveAssignee($validated['assigned_employee_id'] ?? null);
        $beforeAssigneeId = $asset->assigned_employee_id;
        $beforeStatus = $asset->status;
        $before = $asset->toArray();

        DB::transaction(function () use ($asset, $validated, $assignee, $beforeAssigneeId, $beforeStatus, $request) {
            $asset->update($validated);

            $afterAssigneeId = $asset->assigned_employee_id;
            $afterStatus = $asset->status;

            if ((int) ($beforeAssigneeId ?? 0) !== (int) ($afterAssigneeId ?? 0)) {
                $action = $beforeAssigneeId && $afterAssigneeId
                    ? 'transferred'
                    : ($afterAssigneeId ? 'assigned' : 'returned');

                AssetAssignmentHistory::create([
                    'asset_id' => $asset->id,
                    'action' => $action,
                    'employee_from_id' => $beforeAssigneeId,
                    'employee_to_id' => $afterAssigneeId,
                    'actor_user_id' => $request->user()->id,
                    'notes' => 'Perubahan assignment asset.',
                    'happened_at' => now(),
                ]);
            }

            if ($beforeStatus !== $afterStatus && in_array($afterStatus, ['maintenance', 'retired'], true)) {
                AssetAssignmentHistory::create([
                    'asset_id' => $asset->id,
                    'action' => $afterStatus === 'retired' ? 'inactive' : 'damaged',
                    'employee_from_id' => $beforeAssigneeId,
                    'employee_to_id' => $afterAssigneeId,
                    'actor_user_id' => $request->user()->id,
                    'notes' => 'Perubahan status asset.',
                    'happened_at' => now(),
                ]);
            }
        });

        $asset->refresh();
        $this->auditLogService->fromRequest($request, 'assets', 'asset.update', [
            'subject' => 'asset',
            'reference_type' => $asset::class,
            'reference_id' => $asset->id,
            'notes' => 'Data asset diperbarui.',
            'before_data' => $before,
            'after_data' => $asset->toArray(),
        ]);

        return redirect()->route('assets.index');
    }

    public function destroy(Request $request, Asset $asset)
    {
        $this->assertCanAccessAsset($request, $asset);
        $before = $asset->toArray();

        if ($asset->status === 'assigned' || $asset->assigned_employee_id) {
            return back()->withErrors([
                'asset' => 'Asset masih ter-assign. Gunakan flow return/transfer terlebih dahulu.',
            ]);
        }

        $asset->delete();
        $this->auditLogService->fromRequest($request, 'assets', 'asset.delete', [
            'subject' => 'asset',
            'reference_type' => $asset::class,
            'reference_id' => $asset->id,
            'notes' => 'Asset dihapus.',
            'before_data' => $before,
        ]);

        return redirect()->route('assets.index');
    }

    private function rules(?Asset $asset = null): array
    {
        $id = $asset?->id;

        $companyId = request('company_id');

        return [
            'company_id' => ['required', 'exists:companies,id'],
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('assets', 'code')
                    ->ignore($id)
                    ->where(fn ($query) => $query->where('company_id', $companyId)),
            ],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'brand' => ['nullable', 'string', 'max:100'],
            'model' => ['nullable', 'string', 'max:100'],
            'serial_number' => ['nullable', 'string', 'max:100'],
            'purchase_date' => ['nullable', 'date'],
            'purchase_price' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', Rule::in(['available', 'assigned', 'maintenance', 'retired'])],
            'assigned_employee_id' => ['nullable', 'exists:employees,id'],
            'assigned_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }

    private function applyAssetScope(Request $request, $query): void
    {
        $user = $request->user();
        if ($user->hasRole('superadmin')) {
            return;
        }

        $actorEmployee = $user->employee;
        if (!$actorEmployee) {
            $query->whereRaw('1=0');

            return;
        }

        $query->where('company_id', $actorEmployee->company_id);
    }

    private function assertCanAccessAsset(Request $request, Asset $asset): void
    {
        $scoped = Asset::query()->whereKey($asset->id);
        $this->applyAssetScope($request, $scoped);
        abort_unless($scoped->exists(), 403, 'Akses asset lintas scope tidak diizinkan.');
    }

    private function assertAssetPayloadWithinScope(Request $request, array $validated): void
    {
        if (($validated['status'] ?? null) === 'assigned' && empty($validated['assigned_employee_id'])) {
            abort(422, 'Status assigned wajib memiliki karyawan penerima asset.');
        }

        if (($validated['status'] ?? null) !== 'assigned' && !empty($validated['assigned_employee_id'])) {
            abort(422, 'Jika asset masih ter-assign, status harus assigned.');
        }

        $user = $request->user();
        if ($user->hasRole('superadmin')) {
            return;
        }

        $actorEmployee = $user->employee;
        if (!$actorEmployee || (int) $validated['company_id'] !== (int) $actorEmployee->company_id) {
            abort(403, 'Akses asset lintas company tidak diizinkan.');
        }
    }

    private function resolveAssignee(?int $employeeId): ?Employee
    {
        if (!$employeeId) {
            return null;
        }

        $employee = Employee::query()->findOrFail($employeeId);
        $this->employeeStatusService->assertOperationallyActive(
            $employee,
            'Karyawan nonaktif/resign/terminated tidak bisa menerima assignment asset baru.',
        );

        return $employee;
    }

    private function companyOptions($user)
    {
        if ($user->hasRole('superadmin')) {
            return Company::orderBy('name')->get(['id', 'name']);
        }

        $companyId = $user->employee?->company_id;

        return Company::query()
            ->when($companyId, fn ($query) => $query->where('id', $companyId))
            ->orderBy('name')
            ->get(['id', 'name']);
    }
}
