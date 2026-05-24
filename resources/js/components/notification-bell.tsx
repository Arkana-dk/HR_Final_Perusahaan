import { usePage } from '@inertiajs/react';
import { Bell, CheckCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { SharedData } from '@/types';

type NotificationItem = {
    id: number;
    title: string;
    message: string;
    type: string;
    is_read: boolean;
    created_at: string | null;
};

const POLLING_INTERVAL_MS = 30000;
const STREAM_URL =
    '/api/v1/notifications/stream?interval_seconds=3&max_iterations=120';

function csrfToken(): string {
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');
    return token ?? '';
}

export function NotificationBell() {
    const { notifications } = usePage<SharedData>().props;
    const [items, setItems] = useState<NotificationItem[]>(
        notifications?.latest ?? [],
    );
    const [unreadCount, setUnreadCount] = useState<number>(
        notifications?.unread_count ?? 0,
    );
    const [loading, setLoading] = useState(false);
    const [streamConnected, setStreamConnected] = useState(false);

    const hasUnread = unreadCount > 0;

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await fetch('/notifications?per_page=10', {
                headers: {
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                return;
            }

            const payload = await response.json();
            setItems(payload?.data ?? []);
            setUnreadCount(payload?.meta?.unread_count ?? 0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let fallbackTimer: number | null = null;
        let eventSource: EventSource | null = null;

        const startFallbackPolling = () => {
            if (fallbackTimer !== null) return;
            fallbackTimer = window.setInterval(() => {
                void fetchNotifications();
            }, POLLING_INTERVAL_MS);
        };

        if (
            typeof window === 'undefined' ||
            typeof EventSource === 'undefined'
        ) {
            startFallbackPolling();

            return () => {
                if (fallbackTimer !== null) {
                    window.clearInterval(fallbackTimer);
                }
            };
        }

        eventSource = new EventSource(STREAM_URL, { withCredentials: true });

        const handler = (event: MessageEvent<string>) => {
            try {
                const payload = JSON.parse(event.data) as {
                    unread_count?: number;
                    latest?: NotificationItem[];
                };
                setItems(payload.latest ?? []);
                setUnreadCount(payload.unread_count ?? 0);
                setStreamConnected(true);
            } catch {
                // Ignore malformed stream payload.
            }
        };

        eventSource.addEventListener('notifications', handler as EventListener);
        eventSource.onopen = () => {
            setStreamConnected(true);
            if (fallbackTimer !== null) {
                window.clearInterval(fallbackTimer);
                fallbackTimer = null;
            }
        };
        eventSource.onerror = () => {
            setStreamConnected(false);
            eventSource?.close();
            eventSource = null;
            startFallbackPolling();
        };

        return () => {
            if (fallbackTimer !== null) {
                window.clearInterval(fallbackTimer);
            }
            if (eventSource) {
                eventSource.close();
            }
        };
    }, []);

    const markAsRead = async (id: number) => {
        try {
            const response = await fetch(`/notifications/${id}/read`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken(),
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                return;
            }

            const payload = await response.json();
            const latestUnread = payload?.meta?.unread_count ?? unreadCount;

            setUnreadCount(latestUnread);
            setItems((previous) =>
                previous.map((item) =>
                    item.id === id ? { ...item, is_read: true } : item,
                ),
            );
        } catch {
            // Intentionally ignore UI-only notification fetch errors.
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await fetch('/notifications/read-all', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken(),
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                return;
            }

            setUnreadCount(0);
            setItems((previous) =>
                previous.map((item) => ({ ...item, is_read: true })),
            );
        } catch {
            // Intentionally ignore UI-only notification fetch errors.
        }
    };

    const hasItems = items.length > 0;
    const latestItems = useMemo(() => items.slice(0, 10), [items]);

    return (
        <DropdownMenu
            onOpenChange={(open) => {
                if (open) {
                    void fetchNotifications();
                }
            }}
        >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-4" />
                    {hasUnread ? (
                        <span className="absolute -top-1 -right-1 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    ) : null}
                    {!streamConnected ? (
                        <span className="absolute -right-0.5 -bottom-0.5 inline-flex h-2 w-2 rounded-full bg-amber-400" />
                    ) : null}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-96 p-0">
                <div className="flex items-center justify-between px-4 py-3">
                    <DropdownMenuLabel className="p-0 text-sm font-semibold">
                        Notifikasi
                    </DropdownMenuLabel>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => void markAllAsRead()}
                    >
                        <CheckCheck className="mr-1 size-3.5" />
                        Tandai Semua
                    </Button>
                </div>
                <DropdownMenuSeparator />

                <div className="max-h-96 overflow-y-auto">
                    {hasItems ? (
                        latestItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => void markAsRead(item.id)}
                                className="w-full border-b border-border/50 px-4 py-3 text-left hover:bg-muted/40"
                            >
                                <div className="flex items-start gap-2">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">
                                            {item.title}
                                        </p>
                                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                            {item.message}
                                        </p>
                                        <p className="mt-1 text-[11px] text-muted-foreground/80">
                                            {item.created_at
                                                ? new Date(
                                                      item.created_at,
                                                  ).toLocaleString('id-ID')
                                                : '-'}
                                        </p>
                                    </div>
                                    {!item.is_read ? (
                                        <Badge
                                            variant="secondary"
                                            className="mt-0.5 h-5 px-1.5 text-[10px]"
                                        >
                                            Baru
                                        </Badge>
                                    ) : null}
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                            {loading
                                ? 'Memuat notifikasi...'
                                : 'Belum ada notifikasi baru.'}
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
