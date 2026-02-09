<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Payslip;
use Illuminate\Http\Request;

class PayslipController extends Controller
{
    use ResolvesEmployee;

    public function index(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $filters = $request->validate([
            'status' => ['nullable', 'string', 'max:20'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = Payslip::with('payrollPeriod:id,name,start_date,end_date,pay_date')
            ->where('employee_id', $employee->id)
            ->orderByDesc('issued_at')
            ->orderByDesc('id');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        $perPage = (int) ($filters['per_page'] ?? 10);
        $payslips = $query->paginate($perPage)->withQueryString();

        return response()->json([
            'data' => $payslips->getCollection()
                ->map(fn (Payslip $payslip) => $this->mapPayslip($payslip, false))
                ->values()
                ->all(),
            'meta' => [
                'current_page' => $payslips->currentPage(),
                'last_page' => $payslips->lastPage(),
                'per_page' => $payslips->perPage(),
                'total' => $payslips->total(),
            ],
        ]);
    }

    public function latest(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $payslip = Payslip::with([
            'payrollPeriod:id,name,start_date,end_date,pay_date',
            'items.component:id,name,type',
        ])
            ->where('employee_id', $employee->id)
            ->orderByDesc('issued_at')
            ->orderByDesc('id')
            ->first();

        return response()->json([
            'data' => [
                'latest' => $payslip ? $this->mapPayslip($payslip, true) : null,
                'download_latest_url' => url('/api/v1/employee/payslips/latest/download'),
            ],
        ]);
    }

    public function show(Request $request, Payslip $payslip)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $payslip);

        $payslip->load([
            'payrollPeriod:id,name,start_date,end_date,pay_date',
            'items.component:id,name,type',
        ]);

        return response()->json([
            'data' => $this->mapPayslip($payslip, true),
        ]);
    }

    private function assertOwnedByEmployee(Employee $employee, Payslip $payslip): void
    {
        if ((int) $payslip->employee_id !== (int) $employee->id) {
            abort(404);
        }
    }

    private function mapPayslip(Payslip $payslip, bool $withItems): array
    {
        return [
            'id' => $payslip->id,
            'status' => $payslip->status,
            'gross_salary' => (float) $payslip->gross_salary,
            'total_deductions' => (float) $payslip->total_deductions,
            'net_salary' => (float) $payslip->net_salary,
            'issued_at' => optional($payslip->issued_at)?->toDateTimeString(),
            'period' => $payslip->payrollPeriod
                ? [
                    'id' => $payslip->payrollPeriod->id,
                    'name' => $payslip->payrollPeriod->name,
                    'start_date' => optional($payslip->payrollPeriod->start_date)->toDateString(),
                    'end_date' => optional($payslip->payrollPeriod->end_date)->toDateString(),
                    'pay_date' => optional($payslip->payrollPeriod->pay_date)->toDateString(),
                ]
                : null,
            'items' => $withItems
                ? $payslip->items->map(fn ($item) => [
                    'id' => $item->id,
                    'component' => $item->component?->name,
                    'component_type' => $item->component?->type,
                    'amount' => (float) $item->amount,
                    'notes' => $item->notes,
                ])->values()->all()
                : [],
        ];
    }
}
