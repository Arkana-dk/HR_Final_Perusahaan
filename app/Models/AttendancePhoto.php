<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendancePhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendance_log_id',
        'type',
        'file_path',
        'mime',
        'size_bytes',
        'captured_at',
        'meta',
    ];

    protected $casts = [
        'captured_at' => 'datetime',
        'size_bytes' => 'integer',
        'meta' => 'array',
    ];

    protected $hidden = [
        'file_path',
    ];

    public function attendanceLog()
    {
        return $this->belongsTo(AttendanceLog::class);
    }
}
