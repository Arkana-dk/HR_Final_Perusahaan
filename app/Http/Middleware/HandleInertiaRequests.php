<?php

namespace App\Http\Middleware;

use App\Models\Employee;
use App\Models\SystemNotification;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $notificationSummary = $this->notificationSummary($user?->id);

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user,
                'hasEmployeeProfile' => $user
                    ? Employee::where('user_id', $user->id)->exists()
                    : false,
            ],
            'notifications' => $notificationSummary,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'info' => fn () => $request->session()->get('info'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    private function notificationSummary(?int $userId): array
    {
        if (!$userId) {
            return [
                'unread_count' => 0,
                'latest' => [],
            ];
        }

        $latest = SystemNotification::query()
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn (SystemNotification $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'message' => $item->message,
                'type' => $item->type,
                'is_read' => $item->is_read,
                'created_at' => optional($item->created_at)?->toDateTimeString(),
            ])
            ->values()
            ->all();

        return [
            'unread_count' => SystemNotification::query()
                ->where('user_id', $userId)
                ->where('is_read', false)
                ->count(),
            'latest' => $latest,
        ];
    }
}
