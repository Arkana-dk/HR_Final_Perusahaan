<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AuditLogService
{
    public function log(
        string $module,
        string $action,
        array $options = [],
    ): AuditLog {
        /** @var User|null $actor */
        $actor = $options['actor'] ?? auth()->user();
        $occurredAt = $options['occurred_at'] ?? Carbon::now();

        return AuditLog::create([
            'module' => $module,
            'action' => $action,
            'severity' => $options['severity'] ?? 'info',
            'actor_user_id' => $actor?->id,
            'actor_name' => $options['actor_name'] ?? $actor?->name,
            'actor_email' => $options['actor_email'] ?? $actor?->email,
            'subject' => $options['subject'] ?? null,
            'reference_type' => $options['reference_type'] ?? null,
            'reference_id' => $options['reference_id'] ?? null,
            'ip_address' => $options['ip_address'] ?? null,
            'user_agent' => $options['user_agent'] ?? null,
            'occurred_at' => Carbon::parse($occurredAt)->toDateString(),
            'notes' => $options['notes'] ?? null,
            'before_data' => $options['before_data'] ?? null,
            'after_data' => $options['after_data'] ?? null,
            'context' => $options['context'] ?? null,
            'is_flagged' => (bool) ($options['is_flagged'] ?? false),
        ]);
    }

    public function fromRequest(
        Request $request,
        string $module,
        string $action,
        array $options = [],
    ): AuditLog {
        return $this->log($module, $action, [
            ...$options,
            'actor' => $request->user(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
    }
}
