import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

type PageProps = {
    employee: {
        name: string;
        employee_code: string;
        company?: string | null;
    };
    shift: {
        name: string;
        start_time: string;
        end_time: string;
        grace_minutes: number;
        is_overnight: boolean;
    } | null;
    workLocation: {
        name: string;
        latitude: number;
        longitude: number;
        radius_meters: number;
    } | null;
    log: {
        id: number;
        work_date: string;
        check_in_at?: string | null;
        check_out_at?: string | null;
        approval_status?: string | null;
        status?: string | null;
        check_in_distance_meters?: number | null;
        check_out_distance_meters?: number | null;
        is_early_leave?: boolean;
        early_leave_reason?: string | null;
        photos?: Array<{
            id: number;
            type: 'check_in' | 'check_out';
            file_path?: string;
            url?: string | null;
        }>;
    } | null;
    hasApprovedLeave?: boolean;
    canCheckIn: boolean;
    canCheckOut: boolean;
    serverTime: string;
};

type ToastState = {
    type: 'success' | 'error';
    message: string;
} | null;

const formatTime = (value?: string | null) => {
    if (!value) return '-';

    return new Date(value).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const formatDate = (value?: string | null) => {
    if (!value) return '-';

    return new Date(value).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const getAttendanceState = (log: PageProps['log']) => {
    if (!log) return { label: 'Belum Absen', tone: 'outline' as const };

    if (log.is_early_leave && log.approval_status === 'pending') {
        return { label: 'Pulang Cepat (Pending)', tone: 'secondary' as const };
    }

    if (log.is_early_leave && log.approval_status === 'approved') {
        return { label: 'Pulang Cepat (Approved)', tone: 'default' as const };
    }

    if (log.is_early_leave && log.approval_status === 'rejected') {
        return {
            label: 'Pulang Cepat (Rejected)',
            tone: 'destructive' as const,
        };
    }

    if (log.status === 'late') {
        return { label: 'Terlambat', tone: 'destructive' as const };
    }

    if (log.status === 'present') {
        return { label: 'Hadir', tone: 'default' as const };
    }

    return { label: log.status ?? '-', tone: 'outline' as const };
};

const generateDeviceId = () => {
    if (typeof window === 'undefined') return '';

    const existing = window.localStorage.getItem('hr-device-id');
    if (existing) return existing;

    const created = `web-${Math.random().toString(36).slice(2, 12)}-${Date.now()}`;
    window.localStorage.setItem('hr-device-id', created);

    return created;
};

export default function EmployeeAttendanceIndex() {
    const page = usePage<PageProps>();
    const {
        employee,
        shift,
        workLocation,
        log,
        canCheckIn,
        canCheckOut,
        serverTime,
        hasApprovedLeave,
    } = page.props;

    const [loadingLocation, setLoadingLocation] = useState(false);
    const [toast, setToast] = useState<ToastState>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        latitude: '',
        longitude: '',
        photo: null as File | null,
        early_leave_reason: '',
        device_id: '',
    });

    useEffect(() => {
        const id = generateDeviceId();
        if (id) {
            setData('device_id', id);
        }
    }, [setData]);

    useEffect(() => {
        if (!toast) return;

        const timer = window.setTimeout(() => setToast(null), 2600);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const fetchLocation = () => {
        if (!navigator.geolocation) {
            setToast({
                type: 'error',
                message: 'Browser tidak mendukung geolocation.',
            });
            return;
        }

        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setData('latitude', position.coords.latitude.toString());
                setData('longitude', position.coords.longitude.toString());
                setLoadingLocation(false);
            },
            () => {
                setToast({
                    type: 'error',
                    message:
                        'Gagal mengambil lokasi. Pastikan izin lokasi aktif.',
                });
                setLoadingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            },
        );
    };

    const handleSubmit = (type: 'checkin' | 'checkout') => {
        const url =
            type === 'checkin'
                ? '/employee/attendance/check-in'
                : '/employee/attendance/check-out';

        post(url, {
            forceFormData: true,
            onSuccess: () => {
                reset('photo');
                if (type === 'checkout') {
                    setData('early_leave_reason', '');
                }
            },
            onError: () => {
                setToast({
                    type: 'error',
                    message: 'Aksi gagal diproses. Periksa form dan coba lagi.',
                });
            },
        });
    };

    const checkInPhoto = useMemo(
        () => log?.photos?.find((photo) => photo.type === 'check_in'),
        [log?.photos],
    );
    const checkOutPhoto = useMemo(
        () => log?.photos?.find((photo) => photo.type === 'check_out'),
        [log?.photos],
    );
    const attendanceState = getAttendanceState(log);
    const locationReady = data.latitude !== '' && data.longitude !== '';

    return (
        <AppLayout>
            <Head title="My Attendance" />

            <div className="relative flex flex-col gap-6 px-4 py-6 md:px-6">
                {toast && (
                    <div className="fixed top-4 right-4 z-50 w-[min(92vw,360px)]">
                        <Alert
                            className={
                                toast.type === 'success'
                                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                    : 'border-rose-200 bg-rose-50 text-rose-700'
                            }
                        >
                            <AlertTitle>
                                {toast.type === 'success'
                                    ? 'Berhasil'
                                    : 'Gagal'}
                            </AlertTitle>
                            <AlertDescription>{toast.message}</AlertDescription>
                        </Alert>
                    </div>
                )}

                <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/15 via-background to-accent/50 p-6">
                    <div className="pointer-events-none absolute -top-14 -right-10 h-44 w-44 rounded-full bg-primary/10 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-14 -left-8 h-32 w-32 rounded-full bg-chart-2/15 blur-xl" />
                    <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Presensi Harian</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                Halo, {employee.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {employee.employee_code} -{' '}
                                {employee.company ?? '-'}
                            </p>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 text-sm">
                            <p className="text-xs tracking-wide text-muted-foreground uppercase">
                                Waktu Server
                            </p>
                            <p className="font-medium text-foreground">
                                {serverTime}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="border-border/70">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Status Presensi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <Badge variant={attendanceState.tone}>
                                {attendanceState.label}
                            </Badge>
                            <p className="text-muted-foreground">
                                Tanggal:{' '}
                                <span className="text-foreground">
                                    {formatDate(log?.work_date)}
                                </span>
                            </p>
                            <p className="text-muted-foreground">
                                Check In:{' '}
                                <span className="text-foreground">
                                    {formatTime(log?.check_in_at)}
                                </span>
                            </p>
                            <p className="text-muted-foreground">
                                Check Out:{' '}
                                <span className="text-foreground">
                                    {formatTime(log?.check_out_at)}
                                </span>
                            </p>
                            <p className="text-muted-foreground">
                                Approval:{' '}
                                <span className="text-foreground">
                                    {log?.approval_status ?? '-'}
                                </span>
                            </p>
                            {log?.is_early_leave && log?.early_leave_reason && (
                                <p className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-700">
                                    Alasan pulang cepat:{' '}
                                    {log.early_leave_reason}
                                </p>
                            )}
                            {hasApprovedLeave && (
                                <p className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-700">
                                    Anda sedang cuti yang disetujui hari ini,
                                    presensi tidak tersedia.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-border/70">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Jadwal Shift
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            {shift ? (
                                <>
                                    <p className="font-medium text-foreground">
                                        {shift.name}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Jam kerja:{' '}
                                        <span className="text-foreground">
                                            {shift.start_time} -{' '}
                                            {shift.end_time}
                                        </span>
                                    </p>
                                    <p className="text-muted-foreground">
                                        Grace period:{' '}
                                        <span className="text-foreground">
                                            {shift.grace_minutes} menit
                                        </span>
                                    </p>
                                    <p className="text-muted-foreground">
                                        Mode:{' '}
                                        <span className="text-foreground">
                                            {shift.is_overnight
                                                ? 'Overnight'
                                                : 'Normal'}
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <p className="text-muted-foreground">
                                    Belum ada jadwal hari ini.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-border/70">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Validasi Lokasi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            {workLocation ? (
                                <>
                                    <p className="font-medium text-foreground">
                                        {workLocation.name}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Radius:{' '}
                                        <span className="text-foreground">
                                            {workLocation.radius_meters} m
                                        </span>
                                    </p>
                                    <p className="text-muted-foreground">
                                        GPS In:{' '}
                                        <span className="text-foreground">
                                            {log?.check_in_distance_meters ??
                                                '-'}{' '}
                                            m
                                        </span>
                                    </p>
                                    <p className="text-muted-foreground">
                                        GPS Out:{' '}
                                        <span className="text-foreground">
                                            {log?.check_out_distance_meters ??
                                                '-'}{' '}
                                            m
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <p className="text-muted-foreground">
                                    Lokasi kerja belum ditetapkan.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
                    <Card className="border-border/70">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Aksi Presensi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(errors.photo ||
                                errors.latitude ||
                                errors.longitude ||
                                errors.early_leave_reason ||
                                errors.device_id) && (
                                <Alert className="border-rose-200 bg-rose-50 text-rose-700">
                                    <AlertTitle>Validasi Gagal</AlertTitle>
                                    <AlertDescription>
                                        {errors.photo ||
                                            errors.latitude ||
                                            errors.longitude ||
                                            errors.early_leave_reason ||
                                            errors.device_id}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Latitude</Label>
                                    <Input
                                        value={data.latitude}
                                        readOnly
                                        placeholder="-6.xxxxxxx"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Longitude</Label>
                                    <Input
                                        value={data.longitude}
                                        readOnly
                                        placeholder="106.xxxxxxx"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={fetchLocation}
                                    disabled={loadingLocation}
                                >
                                    {loadingLocation
                                        ? 'Mengambil lokasi...'
                                        : 'Ambil Lokasi'}
                                </Button>
                                <Badge
                                    variant={
                                        locationReady ? 'default' : 'outline'
                                    }
                                >
                                    {locationReady
                                        ? 'Lokasi terdeteksi'
                                        : 'Lokasi belum diambil'}
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <Label>Selfie Presensi</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    capture="user"
                                    onChange={(event) =>
                                        setData(
                                            'photo',
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Foto selfie wajib untuk validasi presensi.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Alasan Pulang Cepat (Opsional)</Label>
                                <Input
                                    value={data.early_leave_reason}
                                    onChange={(event) =>
                                        setData(
                                            'early_leave_reason',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Wajib diisi jika checkout sebelum jam shift selesai"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    type="button"
                                    onClick={() => handleSubmit('checkin')}
                                    disabled={
                                        !canCheckIn ||
                                        processing ||
                                        !locationReady
                                    }
                                >
                                    {processing ? 'Memproses...' : 'Check In'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => handleSubmit('checkout')}
                                    disabled={
                                        !canCheckOut ||
                                        processing ||
                                        !locationReady
                                    }
                                >
                                    {processing ? 'Memproses...' : 'Check Out'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/70">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Bukti Selfie
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            {checkInPhoto ? (
                                <a
                                    href={checkInPhoto.url ?? '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block rounded-lg border border-border/60 bg-muted/50 px-3 py-2 transition hover:bg-muted"
                                >
                                    Lihat Selfie Check In
                                </a>
                            ) : (
                                <div className="rounded-lg border border-dashed border-border/60 px-3 py-2 text-muted-foreground">
                                    Belum ada selfie check in.
                                </div>
                            )}

                            {checkOutPhoto ? (
                                <a
                                    href={checkOutPhoto.url ?? '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block rounded-lg border border-border/60 bg-muted/50 px-3 py-2 transition hover:bg-muted"
                                >
                                    Lihat Selfie Check Out
                                </a>
                            ) : (
                                <div className="rounded-lg border border-dashed border-border/60 px-3 py-2 text-muted-foreground">
                                    Belum ada selfie check out.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
