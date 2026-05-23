<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\SystemNotification;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    use ApiResponse;

    public function __construct(private readonly NotificationService $notificationService)
    {
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = max(1, min(100, (int) $request->integer('per_page', 20)));
        $isRead = $request->query('is_read');

        $query = SystemNotification::query()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at');

        if ($isRead !== null && $isRead !== '') {
            $query->where('is_read', filter_var($isRead, FILTER_VALIDATE_BOOLEAN));
        }

        $notifications = $query->paginate($perPage)->withQueryString();

        return $this->successResponse(
            $notifications->getCollection()
                ->map(fn (SystemNotification $item) => $this->mapNotification($item))
                ->values()
                ->all(),
            'Daftar notifikasi berhasil diambil.',
            200,
            [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
                'unread_count' => $this->notificationService->unreadCountForUser($user->id),
            ],
        );
    }

    public function unreadCount(Request $request)
    {
        return $this->successResponse([
            'unread_count' => $this->notificationService->unreadCountForUser($request->user()->id),
        ], 'Jumlah notifikasi belum dibaca berhasil diambil.');
    }

    public function markAsRead(Request $request, SystemNotification $notification)
    {
        if ((int) $notification->user_id !== (int) $request->user()->id) {
            return $this->errorResponse('Notifikasi tidak ditemukan.', null, 404);
        }

        $notification = $this->notificationService->markAsRead($notification);

        return $this->successResponse([
            ...$this->mapNotification($notification),
            'unread_count' => $this->notificationService->unreadCountForUser($request->user()->id),
        ], 'Notifikasi ditandai sebagai dibaca.');
    }

    public function markAllAsRead(Request $request)
    {
        $updated = $this->notificationService->markAllAsRead((int) $request->user()->id);

        return $this->successResponse([
            'updated' => $updated,
            'unread_count' => $this->notificationService->unreadCountForUser($request->user()->id),
        ], 'Semua notifikasi ditandai sebagai dibaca.');
    }

    public function stream(Request $request)
    {
        $userId = (int) $request->user()->id;
        $maxIterations = max(5, min(120, (int) $request->integer('max_iterations', 30)));
        $intervalSeconds = max(1, min(10, (int) $request->integer('interval_seconds', 2)));

        return response()->stream(function () use ($userId, $maxIterations, $intervalSeconds) {
            @ini_set('output_buffering', 'off');
            @ini_set('zlib.output_compression', '0');
            @set_time_limit(($maxIterations + 5) * $intervalSeconds);

            for ($i = 0; $i < $maxIterations; $i++) {
                if (connection_aborted()) {
                    break;
                }

                $payload = $this->buildStreamPayload($userId);
                echo "event: notifications\n";
                echo 'data: '.json_encode($payload)."\n\n";

                if (function_exists('ob_flush')) {
                    @ob_flush();
                }
                flush();

                sleep($intervalSeconds);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache, no-transform',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no',
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

    private function buildStreamPayload(int $userId): array
    {
        $latest = SystemNotification::query()
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->limit(10)
            ->get()
            ->map(fn (SystemNotification $item) => $this->mapNotification($item))
            ->values()
            ->all();

        return [
            'unread_count' => $this->notificationService->unreadCountForUser($userId),
            'latest' => $latest,
            'server_time' => now()->toDateTimeString(),
        ];
    }
}
