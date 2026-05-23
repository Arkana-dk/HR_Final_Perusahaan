<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\User;
use App\Services\AuditLogService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class AnnouncementController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly NotificationService $notificationService,
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $filters = $request->validate([
            'active_only' => ['nullable', 'boolean'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $perPage = (int) ($filters['per_page'] ?? 10);
        $activeOnly = filter_var($filters['active_only'] ?? true, FILTER_VALIDATE_BOOLEAN);

        $query = Announcement::query()
            ->with('createdBy:id,name,email')
            ->orderByDesc('published_at')
            ->orderByDesc('id');

        if ($activeOnly) {
            $now = now();
            $query->where('is_active', true)
                ->where(function ($nested) use ($now) {
                    $nested->whereNull('published_at')
                        ->orWhere('published_at', '<=', $now);
                })
                ->where(function ($nested) use ($now) {
                    $nested->whereNull('expires_at')
                        ->orWhere('expires_at', '>=', $now);
                });
        }

        $items = $query->paginate($perPage)->withQueryString();

        return $this->successResponse(
            $items->getCollection()
                ->map(fn (Announcement $item) => $this->mapAnnouncement($item))
                ->values()
                ->all(),
            'Daftar pengumuman berhasil diambil.',
            200,
            [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
            ],
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'content' => ['required', 'string', 'max:5000'],
            'published_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after:published_at'],
            'is_active' => ['nullable', 'boolean'],
            'audience_roles' => ['nullable', 'array'],
            'audience_roles.*' => ['string', 'in:employee,manager,admin,superadmin'],
        ]);

        $announcement = null;

        DB::transaction(function () use (&$announcement, $request, $data) {
            $announcement = Announcement::create([
                'title' => trim((string) $data['title']),
                'content' => trim((string) $data['content']),
                'created_by_user_id' => $request->user()->id,
                'published_at' => !empty($data['published_at'])
                    ? Carbon::parse($data['published_at'])
                    : now(),
                'expires_at' => !empty($data['expires_at'])
                    ? Carbon::parse($data['expires_at'])
                    : null,
                'is_active' => (bool) ($data['is_active'] ?? true),
                'audience_roles' => $data['audience_roles'] ?? ['employee', 'manager', 'admin', 'superadmin'],
            ]);
        });

        if ($announcement->is_active) {
            $this->broadcastAnnouncementNotification($announcement);
        }

        $this->auditLogService->fromRequest($request, 'announcements', 'announcement.create', [
            'subject' => 'announcement',
            'reference_type' => $announcement::class,
            'reference_id' => $announcement->id,
            'notes' => 'Pengumuman HR dibuat.',
            'after_data' => $announcement->toArray(),
        ]);

        return $this->successResponse(
            $this->mapAnnouncement($announcement->load('createdBy:id,name,email')),
            'Pengumuman berhasil dibuat.',
            201,
        );
    }

    public function update(Request $request, Announcement $announcement)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'content' => ['required', 'string', 'max:5000'],
            'published_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after:published_at'],
            'is_active' => ['nullable', 'boolean'],
            'audience_roles' => ['nullable', 'array'],
            'audience_roles.*' => ['string', 'in:employee,manager,admin,superadmin'],
        ]);

        $before = $announcement->toArray();

        $announcement->update([
            'title' => trim((string) $data['title']),
            'content' => trim((string) $data['content']),
            'published_at' => !empty($data['published_at'])
                ? Carbon::parse($data['published_at'])
                : null,
            'expires_at' => !empty($data['expires_at'])
                ? Carbon::parse($data['expires_at'])
                : null,
            'is_active' => (bool) ($data['is_active'] ?? true),
            'audience_roles' => $data['audience_roles'] ?? $announcement->audience_roles,
        ]);

        $this->auditLogService->fromRequest($request, 'announcements', 'announcement.update', [
            'subject' => 'announcement',
            'reference_type' => $announcement::class,
            'reference_id' => $announcement->id,
            'notes' => 'Pengumuman HR diperbarui.',
            'before_data' => $before,
            'after_data' => $announcement->toArray(),
        ]);

        return $this->successResponse(
            $this->mapAnnouncement($announcement->fresh(['createdBy:id,name,email'])),
            'Pengumuman berhasil diperbarui.',
        );
    }

    public function destroy(Request $request, Announcement $announcement)
    {
        $before = $announcement->toArray();
        $announcement->delete();

        $this->auditLogService->fromRequest($request, 'announcements', 'announcement.delete', [
            'subject' => 'announcement',
            'reference_type' => Announcement::class,
            'reference_id' => $announcement->id,
            'notes' => 'Pengumuman HR dihapus.',
            'before_data' => $before,
            'after_data' => null,
        ]);

        return $this->successResponse(null, 'Pengumuman berhasil dihapus.');
    }

    private function mapAnnouncement(Announcement $announcement): array
    {
        return [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'content' => $announcement->content,
            'published_at' => optional($announcement->published_at)?->toDateTimeString(),
            'expires_at' => optional($announcement->expires_at)?->toDateTimeString(),
            'is_active' => (bool) $announcement->is_active,
            'audience_roles' => $announcement->audience_roles ?? [],
            'created_at' => optional($announcement->created_at)?->toDateTimeString(),
            'created_by' => $announcement->createdBy
                ? [
                    'id' => $announcement->createdBy->id,
                    'name' => $announcement->createdBy->name,
                    'email' => $announcement->createdBy->email,
                ]
                : null,
        ];
    }

    private function broadcastAnnouncementNotification(Announcement $announcement): void
    {
        $roles = $announcement->audience_roles ?: ['employee', 'manager', 'admin', 'superadmin'];

        $userIds = User::query()
            ->where(function ($query) use ($roles) {
                $query->whereIn('role', $roles)
                    ->orWhereHas('roles', fn ($roleQuery) => $roleQuery->whereIn('slug', $roles));
            })
            ->pluck('id')
            ->all();

        $reference = $this->notificationService->buildReference($announcement);
        $this->notificationService->notifyUsers($userIds, [
            ...$reference,
            'type' => 'announcement.published',
            'title' => 'Pengumuman HR Baru',
            'message' => $announcement->title,
            'meta' => [
                'announcement_id' => $announcement->id,
            ],
        ]);
    }
}

