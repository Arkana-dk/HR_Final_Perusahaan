<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'work_date',
        'shift_id',
        'work_location_id',
        'check_in_at',
        'check_out_at',
        'check_in_latitude',
        'check_in_longitude',
        'check_out_latitude',
        'check_out_longitude',
        'check_in_distance_meters',
        'check_out_distance_meters',
        'check_in_device_id',
        'check_out_device_id',
        'check_in_ip',
        'check_out_ip',
        'check_in_method',
        'check_out_method',
        'status',
        'approval_status',
        'late_minutes',
        'overtime_minutes',
        'is_early_leave',
        'early_leave_reason',
        'notes',
        'source',
        'approved_by_user_id',
        'approved_at',
    ];

    protected $casts = [
        'work_date' => 'date',
        'check_in_at' => 'datetime',
        'check_out_at' => 'datetime',
        'check_in_latitude' => 'decimal:7',
        'check_in_longitude' => 'decimal:7',
        'check_out_latitude' => 'decimal:7',
        'check_out_longitude' => 'decimal:7',
        'check_in_distance_meters' => 'integer',
        'check_out_distance_meters' => 'integer',
        'late_minutes' => 'integer',
        'overtime_minutes' => 'integer',
        'is_early_leave' => 'boolean',
        'approved_at' => 'datetime',
        'approval_status' => 'string',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function workLocation()
    {
        return $this->belongsTo(WorkLocation::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by_user_id');
    }

    public function photos()
    {
        return $this->hasMany(AttendancePhoto::class);
    }

    public function approval()
    {
        return $this->morphOne(Approval::class, 'approvable');
    }

    public function corrections()
    {
        return $this->hasMany(AttendanceCorrection::class, 'attendance_log_id');
    }
}
