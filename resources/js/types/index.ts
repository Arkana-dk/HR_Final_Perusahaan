export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    notifications?: {
        unread_count: number;
        latest: Array<{
            id: number;
            title: string;
            message: string;
            type: string;
            is_read: boolean;
            created_at: string | null;
        }>;
    };
    flash?: {
        success?: string | null;
        error?: string | null;
        info?: string | null;
    };
    sidebarOpen: boolean;
    [key: string]: unknown;
};
