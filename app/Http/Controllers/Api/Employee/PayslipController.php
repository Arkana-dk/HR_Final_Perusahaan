<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Payslip;
use Illuminate\Http\Request;

class PayslipController extends Controller
{
    use ApiResponse;
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

        return $this->successResponse(
            $payslips->getCollection()
                ->map(fn (Payslip $payslip) => $this->mapPayslip($payslip, false))
                ->values()
                ->all(),
            'Daftar payslip berhasil diambil.',
            200,
            [
                'current_page' => $payslips->currentPage(),
                'last_page' => $payslips->lastPage(),
                'per_page' => $payslips->perPage(),
                'total' => $payslips->total(),
            ],
        );
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

        return $this->successResponse(
            [
                'latest' => $payslip ? $this->mapPayslip($payslip, true) : null,
                'download_latest_url' => url('/api/v1/employee/payslips/latest/download'),
            ],
            'Payslip terbaru berhasil diambil.',
        );
    }

    public function show(Request $request, Payslip $payslip)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $payslip);

        $payslip->load([
            'payrollPeriod:id,name,start_date,end_date,pay_date',
            'items.component:id,name,type',
        ]);

        return $this->successResponse(
            $this->mapPayslip($payslip, true),
            'Detail payslip berhasil diambil.',
        );
    }

    public function download(Request $request, Payslip $payslip)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $payslip);

        $payslip->loadMissing([
            'payrollPeriod:id,name,start_date,end_date,pay_date',
            'items.component:id,name,type',
        ]);

        $filename = sprintf(
            'payslip-%s-%s.csv',
            $employee->employee_code ?? $employee->id,
            now()->format('Ymd_His'),
        );

        $callback = function () use ($request, $employee, $payslip) {
            $output = fopen('php://output', 'w');
            fputcsv($output, [
                'employee_code',
                'employee_name',
                'period',
                'period_range',
                'status',
                'issued_at',
                'gross_salary',
                'total_deductions',
                'net_salary',
            ]);

            fputcsv($output, [
                $employee->employee_code ?? '-',
                $request->user()->name,
                $payslip->payrollPeriod?->name ?? '-',
                trim(sprintf(
                    '%s - %s',
                    $payslip->payrollPeriod?->start_date ?? '-',
                    $payslip->payrollPeriod?->end_date ?? '-',
                )),
                $payslip->status,
                optional($payslip->issued_at)->format('Y-m-d H:i:s'),
                $payslip->gross_salary,
                $payslip->total_deductions,
                $payslip->net_salary,
            ]);

            fputcsv($output, []);
            fputcsv($output, ['component', 'type', 'amount', 'notes']);

            foreach ($payslip->items as $item) {
                fputcsv($output, [
                    $item->component?->name ?? '-',
                    $item->component?->type ?? '-',
                    $item->amount,
                    $item->notes ?? '',
                ]);
            }

            fclose($output);
        };

        return response()->streamDownload($callback, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
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
