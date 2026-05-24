<?php

namespace App\Http\Controllers\Employees;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use App\Models\EmployeeDocument;
use App\Models\EmployeeProfile;
use App\Models\JobLevel;
use App\Models\Position;
use App\Models\User;
use App\Services\AuditLogService;
use App\Services\FileStorageService;
use App\Services\NotificationService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct(
        private readonly ScopeAuthorizationService $scopeAuthorizationService,
        private readonly FileStorageService $fileStorageService,
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    /**
     * Display a listing of employees.
     */
    public function index(Request $request)
    {
        $actor = $request->user();
        $filters = [
            'search' => $request->string('search')->toString(),
            'status' => $request->string('status')->toString(),
            'department' => $request->string('department')->toString(),
        ];

        $query = Employee::query()
            ->with([
                'user:id,name,email',
                'department:id,name',
                'position:id,title',
                'jobLevel:id,name',
                'branch:id,name',
                'manager.user:id,name',
            ]);
        $this->scopeAuthorizationService->scopeEmployees($actor, $query);

        if ($filters['search'] !== '') {
            $search = $filters['search'];
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('employee_code', 'like', "%{$search}%")
                    ->orWhere('work_email', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        if ($filters['status'] !== '') {
            $query->where('employment_status', $filters['status']);
        }

        if ($filters['department'] !== '') {
            $query->where('department_id', $filters['department']);
        }

        $employees = $query
            ->orderBy('employee_code')
            ->paginate(12)
            ->withQueryString();

        $statsQuery = Employee::query();
        $this->scopeAuthorizationService->scopeEmployees($actor, $statsQuery);

        $stats = [
            'total' => (clone $statsQuery)->count(),
            'active' => (clone $statsQuery)->where('employment_status', 'active')->count(),
            'contract' => (clone $statsQuery)->where('employment_status', 'contract')->count(),
            'probation' => (clone $statsQuery)->where('employment_status', 'probation')->count(),
        ];

        return Inertia::render('employees/index', [
            'employees' => $employees,
            'filters' => $filters,
            'stats' => $stats,
            'departments' => Department::orderBy('name')->get(['id', 'name']),
            'employeeQuick' => $this->quickDialogData($actor),
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create()
    {
        return Inertia::render('employees/create', $this->formOptions());
    }

    /**
     * Store a newly created employee.
     */
    public function store(Request $request)
    {
        $actor = $request->user();
        $validated = $request->validate($this->rules(null, $actor));

        if ($actor->role !== 'superadmin') {
            $validated['role'] = 'employee';
        }

        $employee = DB::transaction(function () use ($validated, $request) {
            $userIsActive = !in_array(
                (string) ($validated['employment_status'] ?? 'active'),
                ['resign', 'terminated'],
                true,
            );

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'role' => $validated['role'],
                'password' => Hash::make($validated['password']),
                'email_verified_at' => now(),
                'is_active' => $userIsActive,
            ]);

            $employee = Employee::create([
                ...$this->employeePayload($validated),
                'user_id' => $user->id,
            ]);

            EmployeeProfile::updateOrCreate(
                ['employee_id' => $employee->id],
                $this->profilePayload($validated),
            );

            $this->storeDocuments($request, $employee);

            return $employee;
        });

        $employee->loadMissing(['user', 'company']);
        $reference = $this->notificationService->buildReference($employee);

        $this->notificationService->notifyRoles(['admin', 'superadmin'], [
            ...$reference,
            'type' => 'employee.created',
            'title' => 'Data Karyawan Baru',
            'message' => sprintf(
                'Karyawan baru %s (%s) telah ditambahkan.',
                $employee->user?->name,
                $employee->employee_code,
            ),
            'meta' => [
                'employee_id' => $employee->id,
                'company_id' => $employee->company_id,
            ],
        ]);

        $this->notificationService->notifyUsers([(int) $employee->user_id], [
            ...$reference,
            'type' => 'employee.account.created',
            'title' => 'Akun HR Aktif',
            'message' => 'Akun HR Anda sudah dibuat dan siap digunakan.',
        ]);

        $this->auditLogService->fromRequest($request, 'employees', 'employee.create', [
            'subject' => 'employee',
            'reference_type' => $employee::class,
            'reference_id' => $employee->id,
            'notes' => 'Data karyawan baru ditambahkan.',
            'after_data' => [
                'employee' => $employee->toArray(),
                'user' => $employee->user?->toArray(),
            ],
        ]);

        if ($this->shouldRedirectBack($request)) {
            return redirect()->back();
        }

        return redirect()->route('employees.show', $employee);
    }

    /**
     * Display the specified employee.
     */
    public function show(Employee $employee)
    {
        $this->ensureRoleManagement($employee);
        $this->scopeAuthorizationService->assertCanAccessModel(request()->user(), $employee);
        $employee->load([
            'user',
            'company',
            'department',
            'position',
            'jobLevel',
            'branch',
            'manager.user',
            'profile',
            'documents',
            'contracts',
        ]);

        $attendanceLogs = $employee->attendanceLogs()
            ->with([
                'shift:id,name,start_time,end_time',
                'workLocation:id,name',
                'photos:id,attendance_log_id,type,file_path',
                'approvedBy:id,name',
            ])
            ->orderByDesc('work_date')
            ->orderByDesc('check_in_at')
            ->take(20)
            ->get();

        return Inertia::render('employees/show', [
            'employee' => $employee,
            'attendanceLogs' => $attendanceLogs,
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee)
    {
        $this->ensureRoleManagement($employee);
        $this->scopeAuthorizationService->assertCanAccessModel(request()->user(), $employee);
        $employee->load([
            'user',
            'company',
            'department',
            'position',
            'jobLevel',
            'branch',
            'manager.user',
            'profile',
            'documents',
        ]);

        return Inertia::render('employees/edit', [
            ...$this->formOptions(),
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified employee.
     */
    public function update(Request $request, Employee $employee)
    {
        $actor = $request->user();
        $this->ensureRoleManagement($employee);
        $this->scopeAuthorizationService->assertCanAccessModel($actor, $employee);
        $validated = $request->validate($this->rules($employee, $actor));
        $before = [
            'employee' => $employee->toArray(),
            'user' => $employee->user?->toArray(),
            'profile' => $employee->profile?->toArray(),
        ];

        if ($actor->role !== 'superadmin') {
            $validated['role'] = 'employee';
        }

        DB::transaction(function () use ($validated, $employee, $request) {
            $userIsActive = !in_array(
                (string) ($validated['employment_status'] ?? $employee->employment_status),
                ['resign', 'terminated'],
                true,
            );

            $userData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'role' => $validated['role'],
                'is_active' => $userIsActive,
            ];

            if (!empty($validated['password'])) {
                $userData['password'] = Hash::make($validated['password']);
            }

            $employee->user->update($userData);
            $employee->update($this->employeePayload($validated, $employee));

            EmployeeProfile::updateOrCreate(
                ['employee_id' => $employee->id],
                $this->profilePayload($validated, $employee->profile),
            );

            $this->storeDocuments($request, $employee);
        });

        $employee->refresh();
        $employee->loadMissing(['user', 'profile']);
        $reference = $this->notificationService->buildReference($employee);

        $this->notificationService->notifyUsers([(int) $employee->user_id], [
            ...$reference,
            'type' => 'employee.profile.updated',
            'title' => 'Data Karyawan Diperbarui',
            'message' => 'Data profil dan status kerja Anda diperbarui oleh HR.',
        ]);

        $this->notificationService->notifyRoles(['admin', 'superadmin'], [
            ...$reference,
            'type' => 'employee.updated',
            'title' => 'Perubahan Data Karyawan',
            'message' => sprintf(
                'Data karyawan %s (%s) telah diperbarui.',
                $employee->user?->name,
                $employee->employee_code,
            ),
        ]);

        $this->auditLogService->fromRequest($request, 'employees', 'employee.update', [
            'subject' => 'employee',
            'reference_type' => $employee::class,
            'reference_id' => $employee->id,
            'notes' => 'Data karyawan diperbarui.',
            'before_data' => $before,
            'after_data' => [
                'employee' => $employee->toArray(),
                'user' => $employee->user?->toArray(),
                'profile' => $employee->profile?->toArray(),
            ],
        ]);

        if ($this->shouldRedirectBack($request)) {
            return redirect()->back();
        }

        return redirect()->route('employees.show', $employee);
    }

    /**
     * Deactivate the specified employee.
     */
    public function deactivate(Request $request, Employee $employee)
    {
        $this->ensureRoleManagement($employee);
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $employee);
        $before = [
            'employee' => $employee->toArray(),
            'user' => $employee->user?->toArray(),
        ];

        DB::transaction(function () use ($employee) {
            $employee->update([
                'employment_status' => 'terminated',
                'resign_date' => now()->toDateString(),
                'is_active' => false,
            ]);

            $employee->user()?->update([
                'is_active' => false,
            ]);
        });

        $employee->refresh();
        $reference = $this->notificationService->buildReference($employee);
        $this->notificationService->notifyUsers([(int) $employee->user_id], [
            ...$reference,
            'type' => 'employee.account.deactivated',
            'title' => 'Akun Dinonaktifkan',
            'message' => 'Akun HR Anda telah dinonaktifkan karena status kerja berubah.',
        ]);

        $this->notificationService->notifyRoles(['admin', 'superadmin'], [
            ...$reference,
            'type' => 'employee.deactivated',
            'title' => 'Karyawan Dinonaktifkan',
            'message' => sprintf(
                '%s (%s) dinonaktifkan.',
                $employee->user?->name,
                $employee->employee_code,
            ),
        ]);

        $this->auditLogService->fromRequest($request, 'employees', 'employee.deactivate', [
            'subject' => 'employee',
            'reference_type' => $employee::class,
            'reference_id' => $employee->id,
            'notes' => 'Data karyawan dinonaktifkan.',
            'before_data' => $before,
            'after_data' => [
                'employee' => $employee->toArray(),
                'user' => $employee->user?->toArray(),
            ],
        ]);

        if ($this->shouldRedirectBack($request)) {
            return redirect()->back();
        }

        return redirect()->route('employees.index');
    }

    /**
     * Soft delete the specified employee.
     */
    public function destroy(Request $request, Employee $employee)
    {
        $this->ensureRoleManagement($employee);
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $employee);

        $before = [
            'employee' => $employee->toArray(),
            'user' => $employee->user?->toArray(),
        ];

        DB::transaction(function () use ($employee) {
            $employee->update([
                'employment_status' => 'terminated',
                'resign_date' => $employee->resign_date ?? now()->toDateString(),
                'is_active' => false,
            ]);

            $employee->user()?->update([
                'is_active' => false,
            ]);

            $employee->delete();
        });

        $employee->refresh();
        $reference = $this->notificationService->buildReference($employee);

        $this->notificationService->notifyRoles(['admin', 'superadmin'], [
            ...$reference,
            'type' => 'employee.deleted',
            'title' => 'Karyawan Dihapus (Soft Delete)',
            'message' => sprintf(
                '%s (%s) dihapus dari daftar aktif (soft delete).',
                $employee->user?->name,
                $employee->employee_code,
            ),
        ]);

        $this->auditLogService->fromRequest($request, 'employees', 'employee.soft_delete', [
            'subject' => 'employee',
            'reference_type' => $employee::class,
            'reference_id' => $employee->id,
            'notes' => 'Data karyawan dihapus (soft delete).',
            'before_data' => $before,
            'after_data' => [
                'employee' => $employee->toArray(),
                'user' => $employee->user?->toArray(),
            ],
        ]);

        if ($this->shouldRedirectBack($request)) {
            return redirect()->back();
        }

        return redirect()->route('employees.index');
    }

    /**
     * Restore the specified employee.
     */
    public function restore(Request $request, int $employee)
    {
        $employee = Employee::withTrashed()->with('user')->findOrFail($employee);
        $this->ensureRoleManagement($employee);
        $this->scopeAuthorizationService->assertCanAccessModel($request->user(), $employee);

        $before = [
            'employee' => $employee->toArray(),
            'user' => $employee->user?->toArray(),
        ];

        DB::transaction(function () use ($employee) {
            $employee->restore();
            $employee->update([
                'employment_status' => 'active',
                'resign_date' => null,
                'is_active' => true,
            ]);

            $employee->user()?->update([
                'is_active' => true,
            ]);
        });

        $employee->refresh();
        $reference = $this->notificationService->buildReference($employee);

        $this->notificationService->notifyUsers([(int) $employee->user_id], [
            ...$reference,
            'type' => 'employee.restored',
            'title' => 'Akun Diaktifkan Kembali',
            'message' => 'Akun Anda telah diaktifkan kembali oleh HR.',
        ]);

        $this->auditLogService->fromRequest($request, 'employees', 'employee.restore', [
            'subject' => 'employee',
            'reference_type' => $employee::class,
            'reference_id' => $employee->id,
            'notes' => 'Data karyawan direstore.',
            'before_data' => $before,
            'after_data' => [
                'employee' => $employee->toArray(),
                'user' => $employee->user?->toArray(),
            ],
        ]);

        return redirect()->route('employees.show', $employee);
    }

    private function shouldRedirectBack(Request $request): bool
    {
        return $request->query('from') === 'dashboard';
    }

    private function formOptions(): array
    {
        return [
            'companies' => Company::orderBy('name')->get(['id', 'name']),
            'branches' => Branch::orderBy('name')->get(['id', 'name', 'company_id']),
            'departments' => Department::orderBy('name')->get(['id', 'name', 'branch_id']),
            'positions' => Position::orderBy('title')->get(['id', 'title', 'department_id']),
            'jobLevels' => JobLevel::orderBy('rank')->get(['id', 'name']),
            'managers' => Employee::with('user:id,name')
                ->orderBy('employee_code')
                ->get(['id', 'user_id', 'employee_code']),
        ];
    }

    private function quickDialogData(User $actor): array
    {
        $employeesQuery = Employee::with('user:id,name,email,role')
            ->orderByDesc('created_at');

        if ($actor->role !== 'superadmin') {
            $employeesQuery->whereHas('user', fn ($query) => $query->where('role', 'employee'));
        }

        $employees = $employeesQuery
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

        $managerQuery = Employee::with('user:id,name')
            ->orderBy('employee_code');

        if ($actor->role !== 'superadmin') {
            $managerQuery->whereHas('user', fn ($query) => $query->where('role', 'employee'));
        }

        return [
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
            'managers' => $managerQuery
                ->get(['id', 'user_id', 'employee_code'])
                ->map(fn ($employee) => [
                    'id' => $employee->id,
                    'employee_code' => $employee->employee_code,
                    'name' => $employee->user?->name,
                ])
                ->values(),
        ];
    }
    private function rules(?Employee $employee = null, ?User $actor = null): array
    {
        $userId = $employee?->user_id;
        $allowedRoles = $this->allowedRoles($actor ?? auth()->user());

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'role' => ['required', Rule::in($allowedRoles)],
            'password' => [
                $employee ? 'nullable' : 'required',
                Password::default(),
            ],
            'employee_code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('employees', 'employee_code')->ignore($employee),
            ],
            'company_id' => ['required', 'exists:companies,id'],
            'branch_id' => ['nullable', 'exists:branches,id'],
            'department_id' => ['nullable', 'exists:departments,id'],
            'position_id' => ['nullable', 'exists:positions,id'],
            'job_level_id' => ['nullable', 'exists:job_levels,id'],
            'manager_id' => ['nullable', 'exists:employees,id'],
            'employment_status' => [
                'required',
                Rule::in(['active', 'probation', 'contract', 'resign', 'terminated']),
            ],
            'employment_type' => [
                'required',
                Rule::in(['permanent', 'contract', 'internship', 'daily', 'freelance']),
            ],
            'join_date' => ['required', 'date'],
            'confirmation_date' => ['nullable', 'date'],
            'resign_date' => ['nullable', 'date'],
            'work_email' => [
                'nullable',
                'email',
                Rule::unique('employees', 'work_email')->ignore($employee),
            ],
            'work_phone' => [
                'nullable',
                'string',
                'max:30',
                Rule::unique('employees', 'work_phone')->ignore($employee),
            ],
            'office_location' => ['nullable', 'string', 'max:255'],
            'nik' => [
                'nullable',
                'string',
                'max:32',
                Rule::unique('employee_profiles', 'nik')->ignore($employee?->profile?->id),
            ],
            'kk_number' => ['nullable', 'string', 'max:32'],
            'npwp' => ['nullable', 'string', 'max:32'],
            'bpjs_kes' => ['nullable', 'string', 'max:32'],
            'bpjs_tk' => ['nullable', 'string', 'max:32'],
            'gender' => ['nullable', 'string', 'max:20'],
            'birth_place' => ['nullable', 'string', 'max:100'],
            'birth_date' => ['nullable', 'date'],
            'marital_status' => ['nullable', 'string', 'max:20'],
            'religion' => ['nullable', 'string', 'max:50'],
            'address_line1' => ['nullable', 'string', 'max:255'],
            'address_line2' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'province' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'emergency_contact_name' => ['nullable', 'string', 'max:100'],
            'emergency_contact_relation' => ['nullable', 'string', 'max:50'],
            'emergency_contact_phone' => ['nullable', 'string', 'max:30'],
            'bank_name' => ['nullable', 'string', 'max:100'],
            'bank_account_name' => ['nullable', 'string', 'max:100'],
            'bank_account_number' => ['nullable', 'string', 'max:50'],
            'documents' => ['nullable', 'array'],
            'documents.*.type' => ['nullable', 'string', 'max:100'],
            'documents.*.number' => ['nullable', 'string', 'max:100'],
            'documents.*.issued_at' => ['nullable', 'date'],
            'documents.*.expires_at' => ['nullable', 'date'],
            'documents.*.file' => ['nullable', 'file', 'max:5120'],
        ];
    }

    private function allowedRoles(?User $actor = null): array
    {
        $role = $actor?->role ?? 'employee';

        if ($role === 'superadmin') {
            return ['superadmin', 'admin', 'employee'];
        }

        return ['employee'];
    }

    private function ensureRoleManagement(Employee $employee): void
    {
        $actorRole = auth()->user()?->role ?? 'employee';

        if ($actorRole !== 'superadmin' && $employee->user && $employee->user->role !== 'employee') {
            abort(403, 'Unauthorized access.');
        }
    }

    private function employeePayload(array $validated, ?Employee $employee = null): array
    {
        $fields = [
            'company_id',
            'branch_id',
            'department_id',
            'position_id',
            'job_level_id',
            'manager_id',
            'employee_code',
            'employment_status',
            'employment_type',
            'join_date',
            'confirmation_date',
            'resign_date',
            'work_email',
            'work_phone',
            'office_location',
        ];

        $payload = $employee ? $employee->only($fields) : [];

        foreach ($fields as $field) {
            if (array_key_exists($field, $validated)) {
                $payload[$field] = $validated[$field];
            }
        }

        if (
            $employee
            && array_key_exists('manager_id', $payload)
            && (int) $payload['manager_id'] === (int) $employee->id
        ) {
            $payload['manager_id'] = null;
        }

        return $payload;
    }

    private function profilePayload(array $validated, ?EmployeeProfile $profile = null): array
    {
        $fields = [
            'nik',
            'kk_number',
            'npwp',
            'bpjs_kes',
            'bpjs_tk',
            'gender',
            'birth_place',
            'birth_date',
            'marital_status',
            'religion',
            'address_line1',
            'address_line2',
            'city',
            'province',
            'postal_code',
            'emergency_contact_name',
            'emergency_contact_relation',
            'emergency_contact_phone',
            'bank_name',
            'bank_account_name',
            'bank_account_number',
        ];

        $payload = $profile ? $profile->only($fields) : [];

        foreach ($fields as $field) {
            if (array_key_exists($field, $validated)) {
                $payload[$field] = $validated[$field];
            }
        }

        return $payload;
    }

    private function storeDocuments(Request $request, Employee $employee): void
    {
        $documents = $request->input('documents', []);

        foreach ($documents as $index => $document) {
            $file = $request->file("documents.{$index}.file");

            $hasData = $file
                || !empty($document['type'])
                || !empty($document['number'])
                || !empty($document['issued_at'])
                || !empty($document['expires_at']);

            if (!$hasData) {
                continue;
            }

            $path = $file
                ? $this->fileStorageService->storePrivate(
                    $file,
                    "employees/{$employee->id}/documents",
                )
                : null;

            EmployeeDocument::create([
                'employee_id' => $employee->id,
                'type' => $document['type'] ?? 'Dokumen',
                'number' => $document['number'] ?? null,
                'issued_at' => $document['issued_at'] ?? null,
                'expires_at' => $document['expires_at'] ?? null,
                'file_path' => $path,
                'notes' => $document['notes'] ?? null,
            ]);
        }
    }
}
