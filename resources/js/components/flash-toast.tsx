import { usePage } from '@inertiajs/react';
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
    const toast: ToastState = flash?.error
        ? {
              tone: 'error',
              message: flash.error,
          }
        : flash?.success
          ? {
                tone: 'success',
                message: flash.success,
            }
          : flash?.info
            ? {
                  tone: 'info',
                  message: flash.info,
              }
            : null;

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
        <div className="pointer-events-none fixed top-4 right-4 z-50 w-[min(92vw,360px)]">
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
