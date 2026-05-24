<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeContract extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'type',
        'start_date',
        'end_date',
        'base_salary',
        'status',
        'signed_at',
        'file_path',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'signed_at' => 'date',
        'base_salary' => 'decimal:2',
    ];

    protected $hidden = [
        'file_path',
    ];

    protected $appends = [
        'has_file',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function getHasFileAttribute(): bool
    {
        return (bool) $this->file_path;
    }
}
