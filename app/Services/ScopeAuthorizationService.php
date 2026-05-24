<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ScopeAuthorizationService
{
    public function canAccessEmployee(?User $user, Employee $employee): bool
    {
        if (!$user) {
            return false;
        }

        if ($user->hasRole('superadmin')) {
            return true;
        }

        $actorEmployee = $this->actorEmployee($user);

        if ($user->hasRole('employee')) {
            return (int) $employee->user_id === (int) $user->id;
        }

        if ($user->hasRole('manager')) {
            if ($actorEmployee && (int) $employee->id === (int) $actorEmployee->id) {
                return true;
            }

            return $actorEmployee
                ? (int) ($employee->manager_id ?? 0) === (int) $actorEmployee->id
                : false;
        }

        if ($user->hasRole('admin')) {
            if (!$actorEmployee) {
                return false;
            }

            if ((int) $employee->company_id !== (int) $actorEmployee->company_id) {
                return false;
            }

            if ($actorEmployee->branch_id && (int) ($employee->branch_id ?? 0) !== (int) $actorEmployee->branch_id) {
                return false;
            }

            if ($actorEmployee->department_id && (int) ($employee->department_id ?? 0) !== (int) $actorEmployee->department_id) {
                return false;
            }

            return true;
        }

        return false;
    }

    public function canAccessModel(?User $user, Model $model): bool
    {
        $employee = $this->extractEmployeeFromModel($model);

        if (!$employee) {
            return (bool) ($user?->hasRole('superadmin'));
        }

        return $this->canAccessEmployee($user, $employee);
    }

    public function scopeEmployeeQuery(?User $user, Builder $query, string $employeeForeignKey = 'employee_id'): Builder
    {
        if (!$user) {
            return $query->whereRaw('1 = 0');
        }

        if ($user->hasRole('superadmin')) {
            return $query;
        }

        $actorEmployee = $this->actorEmployee($user);

        if ($user->hasRole('employee')) {
            if (!$actorEmployee) {
                return $query->whereRaw('1 = 0');
            }

            return $query->where($employeeForeignKey, $actorEmployee->id);
        }

        if ($user->hasRole('manager')) {
            if (!$actorEmployee) {
                return $query->whereRaw('1 = 0');
            }

            return $query->whereHas('employee', function (Builder $builder) use ($actorEmployee) {
                $builder->where(function (Builder $scope) use ($actorEmployee) {
                    $scope->where('id', $actorEmployee->id)
                        ->orWhere('manager_id', $actorEmployee->id);
                });
            });
        }

        if ($user->hasRole('admin')) {
            if (!$actorEmployee) {
                return $query->whereRaw('1 = 0');
            }

            return $query->whereHas('employee', function (Builder $builder) use ($actorEmployee) {
                $builder->where('company_id', $actorEmployee->company_id);

                if ($actorEmployee->branch_id) {
                    $builder->where('branch_id', $actorEmployee->branch_id);
                }

                if ($actorEmployee->department_id) {
                    $builder->where('department_id', $actorEmployee->department_id);
                }
            });
        }

        return $query->whereRaw('1 = 0');
    }

    public function scopeEmployees(?User $user, Builder $query): Builder
    {
        if (!$user) {
            return $query->whereRaw('1 = 0');
        }

        if ($user->hasRole('superadmin')) {
            return $query;
        }

        $actorEmployee = $this->actorEmployee($user);

        if (!$actorEmployee) {
            return $query->whereRaw('1 = 0');
        }

        if ($user->hasRole('employee')) {
            return $query->where('id', $actorEmployee->id);
        }

        if ($user->hasRole('manager')) {
            return $query->where(function (Builder $builder) use ($actorEmployee) {
                $builder->where('id', $actorEmployee->id)
                    ->orWhere('manager_id', $actorEmployee->id);
            });
        }

        if ($user->hasRole('admin')) {
            $query->where('company_id', $actorEmployee->company_id);
            if ($actorEmployee->branch_id) {
                $query->where('branch_id', $actorEmployee->branch_id);
            }
            if ($actorEmployee->department_id) {
                $query->where('department_id', $actorEmployee->department_id);
            }

            return $query;
        }

        return $query->whereRaw('1 = 0');
    }

    public function assertCanAccessModel(?User $user, Model $model, string $message = 'Akses data tidak diizinkan.'): void
    {
        abort_unless($this->canAccessModel($user, $model), 403, $message);
    }

    private function actorEmployee(User $user): ?Employee
    {
        return $user->relationLoaded('employee')
            ? $user->employee
            : $user->employee()->first();
    }

    private function extractEmployeeFromModel(Model $model): ?Employee
    {
        if ($model instanceof Employee) {
            return $model;
        }

        if ($model->relationLoaded('employee') && $model->getRelation('employee') instanceof Employee) {
            return $model->getRelation('employee');
        }

        if (method_exists($model, 'employee')) {
            return $model->employee()->first();
        }

        if (isset($model->employee_id)) {
            return Employee::query()->find($model->employee_id);
        }

        return null;
    }
}
