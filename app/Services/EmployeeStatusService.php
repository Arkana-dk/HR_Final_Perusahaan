<?php

namespace App\Services;

use App\Models\Employee;

class EmployeeStatusService
{
    public function isOperationallyActive(?Employee $employee): bool
    {
        if (!$employee) {
            return false;
        }

        if (!(bool) $employee->is_active) {
            return false;
        }

        return !in_array((string) $employee->employment_status, ['resign', 'terminated'], true);
    }

    public function assertOperationallyActive(?Employee $employee, string $message = 'Karyawan tidak aktif untuk proses ini.'): void
    {
        abort_unless($this->isOperationallyActive($employee), 422, $message);
    }
}
