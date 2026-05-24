<?php

namespace App\Http\Controllers\Api\Concerns;

use App\Models\AttendanceCorrection;
use App\Models\AttendanceLog;
use App\Models\EmployeeContract;
use App\Models\EmployeeDocument;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use App\Models\Payslip;
use App\Models\ReimburseRequest;
use App\Models\Employee;
use App\Services\EmployeeStatusService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

trait ResolvesEmployee
{
    protected function resolveEmployee(Request $request, bool $requireOperationalActive = false): Employee
    {
        $employee = Employee::query()
            ->where('user_id', $request->user()->id)
            ->first();

        if ($employee) {
            if ($requireOperationalActive) {
                $statusService = app(EmployeeStatusService::class);
                if (!$statusService->isOperationallyActive($employee)) {
                    throw ValidationException::withMessages([
                        'employee' => 'Status karyawan tidak aktif untuk proses ini.',
                    ]);
                }
            }

            return $employee;
        }

        throw ValidationException::withMessages([
            'employee' => 'Profil karyawan belum terhubung ke akun ini.',
        ]);
    }

    protected function assertOwnedEmployeeResource(Request $request, mixed $resource): void
    {
        $user = $request->user();
        $scopeService = app(ScopeAuthorizationService::class);

        $model = match (true) {
            $resource instanceof LeaveRequest => $resource,
            $resource instanceof OvertimeRequest => $resource,
            $resource instanceof ReimburseRequest => $resource,
            $resource instanceof AttendanceLog => $resource,
            $resource instanceof AttendanceCorrection => $resource,
            $resource instanceof Payslip => $resource,
            $resource instanceof EmployeeDocument => $resource,
            $resource instanceof EmployeeContract => $resource,
            $resource instanceof Employee => $resource,
            default => null,
        };

        if (!$model || !$scopeService->canAccessModel($user, $model)) {
            abort(404);
        }
    }
}
