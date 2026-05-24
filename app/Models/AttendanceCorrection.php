<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceCorrection extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_no',
        'employee_id',
        'attendance_log_id',
        'work_date',
        'requested_check_in_at',
        'requested_check_out_at',
        'reason',
        'status',
        'requested_by_user_id',
        'requested_at',
        'approved_by_user_id',
        'approved_at',
        'rejected_reason',
        'attachment_path',
        'original_snapshot',
        'corrected_snapshot',
    ];

    protected $casts = [
        'work_date' => 'date',
        'requested_check_in_at' => 'datetime',
        'requested_check_out_at' => 'datetime',
        'requested_at' => 'datetime',
        'approved_at' => 'datetime',
        'original_snapshot' => 'array',
        'corrected_snapshot' => 'array',
    ];

    protected $hidden = [
        'attachment_path',
    ];

    protected $appends = [
        'has_attachment',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function attendanceLog()
    {
        return $this->belongsTo(AttendanceLog::class, 'attendance_log_id');
    }

    public function requestedBy()
    {
        return $this->belongsTo(User::class, 'requested_by_user_id');
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by_user_id');
    }

    public function approval()
    {
        return $this->morphOne(Approval::class, 'approvable');
    }

    public function getHasAttachmentAttribute(): bool
    {
        return (bool) $this->attachment_path;
    }
}
