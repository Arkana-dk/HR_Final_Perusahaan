<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\SystemNotification;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class NotificationService
{
    /**
     * @param  int[]  $userIds
     * @return Collection<int, SystemNotification>
     */
    public function notifyUsers(array $userIds, array $payload): Collection
    {
        $uniqueUserIds = collect($userIds)
            ->filter(fn ($id) => (int) $id > 0)
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values();

        $items = collect();

        foreach ($uniqueUserIds as $userId) {
            $notification = $this->notifyUser($userId, $payload);
            if ($notification) {
                $items->push($notification);
            }
        }

        return $items;
    }

    /**
     * @param  string[]  $roles
     * @return Collection<int, SystemNotification>
     */
    public function notifyRoles(array $roles, array $payload): Collection
    {
        $userIds = User::query()
            ->where(function ($query) use ($roles) {
                $query->whereIn('role', $roles)
                    ->orWhereHas('roles', fn ($roleQuery) => $roleQuery->whereIn('slug', $roles));
            })
            ->pluck('id')
            ->all();

        return $this->notifyUsers($userIds, $payload);
    }

    /**
     * @param  string[]  $additionalRoles
     * @return Collection<int, SystemNotification>
     */
    public function notifyApprovalAudience(
        Employee $employee,
        array $payload,
        array $additionalRoles = ['admin', 'superadmin'],
    ): Collection {
        $userIds = [];

        if ($employee->manager?->user_id) {
            $userIds[] = (int) $employee->manager->user_id;
        }

        $roleUserIds = User::query()
            ->where(function ($query) use ($additionalRoles) {
                $query->whereIn('role', $additionalRoles)
                    ->orWhereHas('roles', fn ($roleQuery) => $roleQuery->whereIn('slug', $additionalRoles));
            })
            ->pluck('id')
            ->all();

        return $this->notifyUsers([...$userIds, ...$roleUserIds], $payload);
    }

    public function unreadCountForUser(int $userId): int
    {
        return SystemNotification::query()
            ->where('user_id', $userId)
            ->where('is_read', false)
            ->count();
    }

    public function markAsRead(SystemNotification $notification): SystemNotification
    {
        if ($notification->is_read) {
            return $notification;
        }

        $notification->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return $notification->fresh();
    }

    public function markAllAsRead(int $userId): int
    {
        return SystemNotification::query()
            ->where('user_id', $userId)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
    }

    public function buildReference(?Model $model): array
    {
        if (!$model) {
            return [
                'reference_type' => null,
                'reference_id' => null,
            ];
        }

        return [
            'reference_type' => $model::class,
            'reference_id' => $model->getKey(),
        ];
    }

    private function notifyUser(int $userId, array $payload): ?SystemNotification
    {
        $title = trim((string) ($payload['title'] ?? 'Notifikasi HR'));
        $message = trim((string) ($payload['message'] ?? 'Ada aktivitas terbaru pada sistem HR.'));
        $type = trim((string) ($payload['type'] ?? 'system.info'));
        $referenceType = $payload['reference_type'] ?? null;
        $referenceId = $payload['reference_id'] ?? null;

        $duplicateExists = SystemNotification::query()
            ->where('user_id', $userId)
            ->where('type', $type)
            ->where('reference_type', $referenceType)
            ->where('reference_id', $referenceId)
            ->where('created_at', '>=', now()->subSeconds(45))
            ->exists();

        if ($duplicateExists) {
            return null;
        }

        return SystemNotification::create([
            'user_id' => $userId,
            'title' => $title,
            'message' => $message,
            'type' => $type,
            'reference_type' => $referenceType,
            'reference_id' => $referenceId,
            'meta' => $payload['meta'] ?? null,
        ]);
    }
}
