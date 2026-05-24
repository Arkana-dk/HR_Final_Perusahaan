<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'module',
        'action',
        'severity',
        'actor_user_id',
        'actor_name',
        'actor_email',
        'subject',
        'reference_type',
        'reference_id',
        'ip_address',
        'user_agent',
        'occurred_at',
        'notes',
        'before_data',
        'after_data',
        'context',
        'is_flagged',
    ];

    protected $casts = [
        'occurred_at' => 'date',
        'is_flagged' => 'boolean',
        'before_data' => 'array',
        'after_data' => 'array',
        'context' => 'array',
    ];

    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }
}
