<?php

namespace App\Http\Controllers;

use App\Models\SystemNotification;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct(private readonly NotificationService $notificationService)
    {
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = max(1, min(50, (int) $request->integer('per_page', 15)));

        $notifications = SystemNotification::query()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->withQueryString();

        return response()->json([
            'data' => $notifications->getCollection()
                ->map(fn (SystemNotification $item) => $this->mapNotification($item))
                ->values()
                ->all(),
            'meta' => [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
                'unread_count' => $this->notificationService->unreadCountForUser($user->id),
            ],
        ]);
    }

    public function markAsRead(Request $request, SystemNotification $notification)
    {
        if ((int) $notification->user_id !== (int) $request->user()->id) {
            abort(404);
        }

        $notification = $this->notificationService->markAsRead($notification);

        return response()->json([
            'message' => 'Notifikasi ditandai sebagai dibaca.',
            'data' => $this->mapNotification($notification),
            'meta' => [
                'unread_count' => $this->notificationService->unreadCountForUser($request->user()->id),
            ],
        ]);
    }

    public function markAllAsRead(Request $request)
    {
        $updated = $this->notificationService->markAllAsRead((int) $request->user()->id);

        return response()->json([
            'message' => 'Semua notifikasi sudah ditandai dibaca.',
            'data' => [
                'updated' => $updated,
            ],
            'meta' => [
                'unread_count' => $this->notificationService->unreadCountForUser($request->user()->id),
            ],
        ]);
    }

    private function mapNotification(SystemNotification $notification): array
    {
        return [
            'id' => $notification->id,
            'title' => $notification->title,
            'message' => $notification->message,
            'type' => $notification->type,
            'reference_type' => $notification->reference_type,
            'reference_id' => $notification->reference_id,
            'is_read' => $notification->is_read,
            'read_at' => optional($notification->read_at)?->toDateTimeString(),
            'created_at' => optional($notification->created_at)?->toDateTimeString(),
            'meta' => $notification->meta,
        ];
    }
}

