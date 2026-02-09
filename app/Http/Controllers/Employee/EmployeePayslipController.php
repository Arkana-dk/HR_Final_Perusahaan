<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Payslip;
use Illuminate\Http\Request;

class EmployeePayslipController extends Controller
{
    public function downloadLatest(Request $request)
    {
        $employee = Employee::where('user_id', $request->user()->id)->first();

        if (!$employee) {
            return $this->downloadMessageCsv(
                'payslip-unavailable.csv',
                'Profil employee belum terhubung ke akun ini.',
            );
        }

        $payslip = Payslip::with([
            'payrollPeriod:id,name,start_date,end_date,pay_date',
            'items.component:id,name,type',
        ])
            ->where('employee_id', $employee->id)
            ->orderByDesc('issued_at')
            ->orderByDesc('id')
            ->first();

        if (!$payslip) {
            return $this->downloadMessageCsv(
                sprintf('payslip-%s-unavailable.csv', $employee->employee_code ?? $employee->id),
                'Slip gaji belum tersedia.',
            );
        }

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

    private function downloadMessageCsv(string $filename, string $message)
    {
        $callback = function () use ($message) {
            $output = fopen('php://output', 'w');
            fputcsv($output, ['message']);
            fputcsv($output, [$message]);
            fclose($output);
        };

        return response()->streamDownload($callback, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }
}
