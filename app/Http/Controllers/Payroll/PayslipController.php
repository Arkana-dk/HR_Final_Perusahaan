<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\PayrollPeriod;
use App\Models\Payslip;
use App\Models\PayslipItem;
use App\Models\SalaryComponent;
use App\Services\AuditLogService;
use App\Services\EmployeeStatusService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PayslipController extends Controller
{
    public function __construct(
        private readonly EmployeeStatusService $employeeStatusService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index()
    {
        $payslips = Payslip::with([
            'employee.user:id,name',
            'payrollPeriod:id,name,start_date,end_date',
        ])
            ->orderByDesc('created_at')
            ->paginate(12);

        $stats = [
            'total' => Payslip::count(),
            'draft' => Payslip::where('status', 'draft')->count(),
            'final' => Payslip::where('status', 'final')->count(),
            'paid' => Payslip::where('status', 'paid')->count(),
        ];

        return Inertia::render('payroll/payslips/index', [
            'payslips' => $payslips,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        return Inertia::render('payroll/payslips/form', [
            'mode' => 'create',
            'payslip' => null,
            'employees' => $this->activeEmployeesQuery()
                ->with('user:id,name')
                ->orderBy('employee_code')
                ->get(['id', 'employee_code', 'user_id']),
            'periods' => PayrollPeriod::orderByDesc('start_date')
                ->get(['id', 'name', 'start_date', 'end_date']),
            'components' => SalaryComponent::orderBy('name')
                ->get(['id', 'name', 'type', 'default_amount']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validatePayload($request);
        $employee = Employee::query()->findOrFail($validated['employee_id']);
        $this->assertEmployeeEligibleForPayroll($employee);

        $payslip = DB::transaction(function () use ($validated) {
            [$gross, $deductions] = $this->calculateTotals($validated['items']);

            $payslip = Payslip::create([
                'employee_id' => $validated['employee_id'],
                'payroll_period_id' => $validated['payroll_period_id'],
                'gross_salary' => $gross,
                'total_deductions' => $deductions,
                'net_salary' => $gross - $deductions,
                'status' => $validated['status'],
                'issued_at' => $validated['status'] === 'draft' ? null : now(),
            ]);

            $this->syncItems($payslip, $validated['items']);

            return $payslip;
        });

        $this->auditLogService->fromRequest($request, 'payroll', 'payroll.generate', [
            'subject' => 'payslip',
            'reference_type' => $payslip::class,
            'reference_id' => $payslip->id,
            'notes' => 'Payroll/payslip berhasil dibuat.',
            'after_data' => $payslip->toArray(),
        ]);

        if ($payslip->status !== 'draft') {
            $this->auditLogService->fromRequest($request, 'payroll', 'payslip.publish', [
                'subject' => 'payslip',
                'reference_type' => $payslip::class,
                'reference_id' => $payslip->id,
                'notes' => 'Payslip dipublish dari modul payroll.',
                'after_data' => $payslip->toArray(),
            ]);
        }

        return redirect()->route('payslips.edit', $payslip);
    }

    public function edit(Payslip $payslip)
    {
        $payslip->load(['items', 'employee.user', 'payrollPeriod']);

        return Inertia::render('payroll/payslips/form', [
            'mode' => 'edit',
            'payslip' => $payslip,
            'employees' => $this->activeEmployeesQuery()
                ->with('user:id,name')
                ->orderBy('employee_code')
                ->get(['id', 'employee_code', 'user_id']),
            'periods' => PayrollPeriod::orderByDesc('start_date')
                ->get(['id', 'name', 'start_date', 'end_date']),
            'components' => SalaryComponent::orderBy('name')
                ->get(['id', 'name', 'type', 'default_amount']),
        ]);
    }

    public function update(Request $request, Payslip $payslip)
    {
        $validated = $this->validatePayload($request, $payslip);
        $employee = Employee::query()->findOrFail($validated['employee_id']);
        $this->assertEmployeeEligibleForPayroll($employee);
        $before = $payslip->toArray();

        DB::transaction(function () use ($validated, $payslip) {
            [$gross, $deductions] = $this->calculateTotals($validated['items']);

            $payslip->update([
                'employee_id' => $validated['employee_id'],
                'payroll_period_id' => $validated['payroll_period_id'],
                'gross_salary' => $gross,
                'total_deductions' => $deductions,
                'net_salary' => $gross - $deductions,
                'status' => $validated['status'],
                'issued_at' => $validated['status'] === 'draft' ? null : now(),
            ]);

            $payslip->items()->delete();
            $this->syncItems($payslip, $validated['items']);
        });

        $payslip->refresh();
        $this->auditLogService->fromRequest($request, 'payroll', 'payroll.update', [
            'subject' => 'payslip',
            'reference_type' => $payslip::class,
            'reference_id' => $payslip->id,
            'notes' => 'Data payroll/payslip diperbarui.',
            'before_data' => $before,
            'after_data' => $payslip->toArray(),
        ]);

        if ($payslip->status !== 'draft') {
            $this->auditLogService->fromRequest($request, 'payroll', 'payslip.publish', [
                'subject' => 'payslip',
                'reference_type' => $payslip::class,
                'reference_id' => $payslip->id,
                'notes' => 'Payslip dipublish dari update payroll.',
                'after_data' => $payslip->toArray(),
            ]);
        }

        return redirect()->route('payslips.edit', $payslip);
    }

    private function validatePayload(Request $request, ?Payslip $payslip = null): array
    {
        $employeeId = $request->input('employee_id');
        $periodId = $request->input('payroll_period_id');

        return $request->validate([
            'employee_id' => ['required', 'exists:employees,id'],
            'payroll_period_id' => [
                'required',
                'exists:payroll_periods,id',
                Rule::unique('payslips')
                    ->where(fn ($query) => $query->where('employee_id', $employeeId))
                    ->ignore($payslip?->id),
            ],
            'status' => ['required', Rule::in(['draft', 'final', 'paid'])],
            'items' => ['required', 'array', 'min:1'],
            'items.*.component_id' => ['required', 'exists:salary_components,id'],
            'items.*.amount' => ['required', 'numeric', 'min:0'],
            'items.*.notes' => ['nullable', 'string'],
        ]);
    }

    private function calculateTotals(array $items): array
    {
        $componentIds = collect($items)
            ->pluck('component_id')
            ->filter()
            ->all();

        $components = SalaryComponent::whereIn('id', $componentIds)
            ->get(['id', 'type'])
            ->keyBy('id');

        $gross = 0;
        $deductions = 0;

        foreach ($items as $item) {
            $amount = (float) ($item['amount'] ?? 0);
            $type = $components[$item['component_id']]->type ?? 'earning';

            if ($type === 'deduction') {
                $deductions += $amount;
            } else {
                $gross += $amount;
            }
        }

        return [$gross, $deductions];
    }

    private function syncItems(Payslip $payslip, array $items): void
    {
        foreach ($items as $item) {
            PayslipItem::create([
                'payslip_id' => $payslip->id,
                'salary_component_id' => $item['component_id'],
                'amount' => $item['amount'],
                'notes' => $item['notes'] ?? null,
            ]);
        }
    }

    private function activeEmployeesQuery()
    {
        $query = Employee::query();

        if ((bool) config('hr.payroll.only_active_employee', true)) {
            $query->where('is_active', true)
                ->whereNotIn('employment_status', ['resign', 'terminated']);
        }

        return $query;
    }

    private function assertEmployeeEligibleForPayroll(Employee $employee): void
    {
        if (!(bool) config('hr.payroll.only_active_employee', true)) {
            return;
        }

        if (!$this->employeeStatusService->isOperationallyActive($employee)) {
            throw ValidationException::withMessages([
                'employee_id' => 'Karyawan inactive/resign/terminated tidak bisa diproses pada payroll reguler.',
            ]);
        }
    }
}
