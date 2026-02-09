<?php

namespace App\Http\Controllers\Api\Concerns;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

trait ResolvesEmployee
{
    protected function resolveEmployee(Request $request): Employee
    {
        $employee = Employee::query()
            ->where('user_id', $request->user()->id)
            ->first();

        if ($employee) {
            return $employee;
        }

        throw ValidationException::withMessages([
            'employee' => 'Profil karyawan belum terhubung ke akun ini.',
        ]);
    }
}
