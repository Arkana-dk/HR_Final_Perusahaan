import { Head, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

type PageProps = {
    slug: string;
};

const moduleCatalog: Record<
    string,
    {
        title: string;
        summary: string;
        highlights: string[];
    }
> = {
    employees: {
        title: 'Employee Master',
        summary:
            'Pusat data karyawan lengkap dengan profil, kontrak, dan riwayat.',
        highlights: [
            'Profil 360° (identitas, kontak, keluarga, dokumen).',
            'Status kerja, kontrak, dan histori jabatan.',
            'Struktur organisasi & reporting line.',
        ],
    },
    organization: {
        title: 'Organization',
        summary: 'Struktur perusahaan dari cabang, departemen, hingga jabatan.',
        highlights: [
            'Multi-branch & department hierarchy.',
            'Job level & job position mapping.',
            'Org chart interaktif.',
        ],
    },
    attendance: {
        title: 'Attendance Logs',
        summary: 'Pantau absensi berbasis GPS + selfie dengan validasi lokasi.',
        highlights: [
            'Check-in/out dengan geofence & selfie.',
            'Deteksi keterlambatan & overtime.',
            'Approval koreksi absensi.',
        ],
    },
    schedules: {
        title: 'Work Schedules',
        summary: 'Atur jadwal kerja, shift, dan hari libur.',
        highlights: [
            'Penjadwalan per karyawan atau tim.',
            'Shift dinamis & rotasi.',
            'Integrasi kalender libur nasional.',
        ],
    },
    'leave-requests': {
        title: 'Leave Requests',
        summary: 'Pengajuan cuti dengan approval multi-level.',
        highlights: [
            'Jenis cuti & kuota tahunan.',
            'Approval flow bertingkat.',
            'Lampiran bukti & SLA.',
        ],
    },
    'payroll-periods': {
        title: 'Payroll Periods',
        summary: 'Kelola periode payroll dan komponen gaji secara aman.',
        highlights: [
            'Periode gaji dengan lock & audit.',
            'Komponen gaji & potongan.',
            'Payslip otomatis & export bank.',
        ],
    },
};

const formatTitle = (slug: string) =>
    slug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

export default function ModulePlaceholder() {
    const { slug } = usePage<PageProps>().props;
    const moduleData = moduleCatalog[slug];
    const title = moduleData?.title ?? formatTitle(slug);
    const summary =
        moduleData?.summary ??
        'Modul ini sedang disiapkan untuk mendukung kebutuhan HR yang lebih kompleks.';
    const highlights = moduleData?.highlights ?? [
        'Fitur inti & workflow approval.',
        'Dashboard dan laporan khusus modul.',
        'Integrasi dengan data HR master.',
    ];

    return (
        <AppLayout>
            <Head title={title} />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="space-y-2">
                        <Badge variant="secondary">Coming Soon</Badge>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {summary}
                        </p>
                    </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Fitur Utama</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            {highlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-lg border border-border/60 px-3 py-2"
                                >
                                    {item}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Status Implementasi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">
                                    Database Schema
                                </p>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div className="h-full w-[75%] rounded-full bg-chart-2" />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Struktur data inti sudah disiapkan.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">
                                    API & Workflow
                                </p>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div className="h-full w-[40%] rounded-full bg-chart-3" />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Endpoint & approval flow bertahap.
                                </p>
                            </div>
                            <Button variant="outline" className="w-full">
                                Minta Prioritas Modul Ini
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
