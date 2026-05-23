import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type FlashPayload = {
    success?: string | null;
    error?: string | null;
    info?: string | null;
};

type ToastState = {
    tone: 'success' | 'error' | 'info';
    message: string;
} | null;

export function FlashToast() {
    const page = usePage<{ flash?: FlashPayload }>();
    const flash = page.props.flash;
    const [toast, setToast] = useState<ToastState>(null);

    useEffect(() => {
        if (flash?.error) {
            setToast({
                tone: 'error',
                message: flash.error,
            });
            return;
        }

        if (flash?.success) {
            setToast({
                tone: 'success',
                message: flash.success,
            });
            return;
        }

        if (flash?.info) {
            setToast({
                tone: 'info',
                message: flash.info,
            });
        }
    }, [flash?.error, flash?.info, flash?.success]);

    useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(() => setToast(null), 2600);
        return () => window.clearTimeout(timer);
    }, [toast]);

    if (!toast) {
        return null;
    }

    const className =
        toast.tone === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : toast.tone === 'error'
              ? 'border-rose-200 bg-rose-50 text-rose-700'
              : 'border-blue-200 bg-blue-50 text-blue-700';

    return (
        <div className="pointer-events-none fixed right-4 top-4 z-50 w-[min(92vw,360px)]">
            <Alert className={className}>
                <AlertTitle>
                    {toast.tone === 'success'
                        ? 'Berhasil'
                        : toast.tone === 'error'
                          ? 'Gagal'
                          : 'Info'}
                </AlertTitle>
                <AlertDescription>{toast.message}</AlertDescription>
            </Alert>
        </div>
    );
}

