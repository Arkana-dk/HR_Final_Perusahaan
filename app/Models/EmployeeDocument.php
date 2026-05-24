<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'type',
        'number',
        'issued_at',
        'expires_at',
        'file_path',
        'notes',
    ];

    protected $casts = [
        'issued_at' => 'date',
        'expires_at' => 'date',
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
