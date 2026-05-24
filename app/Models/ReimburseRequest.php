<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReimburseRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'category',
        'title',
        'amount',
        'currency',
        'description',
        'status',
        'attachment_path',
        'approved_by_user_id',
        'approved_at',
        'approval_notes',
        'requested_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'approved_at' => 'datetime',
        'requested_at' => 'datetime',
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

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by_user_id');
    }

    public function getHasAttachmentAttribute(): bool
    {
        return (bool) $this->attachment_path;
    }
}
