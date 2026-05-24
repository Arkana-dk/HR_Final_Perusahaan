import { Head, Link, router, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

type EmployeeDetail = {
    id: number;
    employee_code: string;
    employment_status: string;
    employment_type: string;
    join_date: string;
    confirmation_date?: string | null;
    resign_date?: string | null;
    work_email?: string | null;
    work_phone?: string | null;
    office_location?: string | null;
    user: {
        name: string;
        email: string;
    };
    company?: {
        id: number;
        name: string;
    } | null;
    department?: {
        id: number;
        name: string;
    } | null;
    position?: {
        id: number;
        title: string;
    } | null;
    job_level?: {
        id: number;
        name: string;
    } | null;
    branch?: {
        id: number;
        name: string;
    } | null;
    manager?: {
        id: number;
        user?: {
            name: string;
        } | null;
    } | null;
    profile?: {
        nik?: string | null;
        kk_number?: string | null;
        npwp?: string | null;
        bpjs_kes?: string | null;
        bpjs_tk?: string | null;
        gender?: string | null;
        birth_place?: string | null;
        birth_date?: string | null;
        marital_status?: string | null;
        religion?: string | null;
        address_line1?: string | null;
        address_line2?: string | null;
        city?: string | null;
        province?: string | null;
        postal_code?: string | null;
        emergency_contact_name?: string | null;
        emergency_contact_relation?: string | null;
        emergency_contact_phone?: string | null;
        bank_name?: string | null;
        bank_account_name?: string | null;
        bank_account_number?: string | null;
    } | null;
    documents?: Array<{
        id: number;
        type: string;
        number?: string | null;
        issued_at?: string | null;
        expires_at?: string | null;
        has_file?: boolean;
    }>;
    contracts?: Array<{
        id: number;
        type: string;
        start_date: string;
        end_date?: string | null;
        status: string;
    }>;
};

type PageProps = {
    employee: EmployeeDetail;
    attendanceLogs: Array<{
        id: number;
        work_date: string;
        status: string;
        approval_status?: string | null;
        check_in_at?: string | null;
        check_out_at?: string | null;
        check_in_distance_meters?: number | null;
        check_out_distance_meters?: number | null;
        shift?: {
            name: string;
            start_time?: string | null;
            end_time?: string | null;
        } | null;
        work_location?: {
            name: string;
        } | null;
        photos?: Array<{
            id: number;
            type: 'check_in' | 'check_out';
            file_path: string;
        }>;
    }>;
};

const statusLabel: Record<string, string> = {
    active: 'Aktif',
    probation: 'Probation',
    contract: 'Kontrak',
    resign: 'Resign',
    terminated: 'PHK',
};

const statusVariant: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    active: 'default',
    probation: 'secondary',
    contract: 'outline',
    resign: 'destructive',
    terminated: 'destructive',
};

const employmentTypeLabel: Record<string, string> = {
    permanent: 'Tetap',
    contract: 'Kontrak',
    internship: 'Magang',
    daily: 'Harian',
    freelance: 'Freelance',
};

const formatDate = (value?: string | null) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const formatValue = (value?: string | null) => {
    if (value === undefined || value === null || value === '') return '-';
    return value;
};

const formatTime = (value?: string | null) => {
    if (!value) return '-';
    return new Date(value).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const approvalBadge: Record<string, 'outline' | 'secondary' | 'destructive'> = {
    pending: 'outline',
    approved: 'secondary',
    rejected: 'destructive',
};

export default function EmployeeShow() {
    const { employee, attendanceLogs } = usePage<PageProps>().props;
    const profile = employee.profile ?? {};
    const documents = employee.documents ?? [];
    const contracts = employee.contracts ?? [];

    return (
        <AppLayout>
            <Head title={`Employee · ${employee.user?.name ?? 'Detail'}`} />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                    variant={
                                        statusVariant[
                                            employee.employment_status
                                        ] ?? 'outline'
                                    }
                                >
                                    {statusLabel[employee.employment_status] ??
                                        employee.employment_status}
                                </Badge>
                                <Badge variant="outline">
                                    {employmentTypeLabel[
                                        employee.employment_type
                                    ] ?? employee.employment_type}
                                </Badge>
                            </div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {employee.user?.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {employee.employee_code} ·{' '}
                                {employee.position?.title ?? '—'} ·{' '}
                                {employee.department?.name ?? '—'}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" asChild>
                                <Link href="/modules/employees">Kembali</Link>
                            </Button>
                            <Button asChild>
                                <Link
                                    href={`/modules/employees/${employee.id}/edit`}
                                >
                                    Edit Profil
                                </Link>
                            </Button>
                            <Button variant="secondary">Nonaktifkan</Button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Pekerjaan</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Perusahaan
                                </p>
                                <p className="text-sm font-medium">
                                    {employee.company?.name ?? '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Cabang
                                </p>
                                <p className="text-sm font-medium">
                                    {employee.branch?.name ?? '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Jabatan
                                </p>
                                <p className="text-sm font-medium">
                                    {employee.position?.title ?? '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Job Level
                                </p>
                                <p className="text-sm font-medium">
                                    {employee.job_level?.name ?? '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Manager
                                </p>
                                <p className="text-sm font-medium">
                                    {employee.manager?.user?.name ?? '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Lokasi Kantor
                                </p>
                                <p className="text-sm font-medium">
                                    {employee.office_location ?? '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Tanggal Bergabung
                                </p>
                                <p className="text-sm font-medium">
                                    {formatDate(employee.join_date)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Konfirmasi
                                </p>
                                <p className="text-sm font-medium">
                                    {formatDate(employee.confirmation_date)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Kontak Kerja</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Email
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(
                                        employee.work_email ??
                                            employee.user?.email,
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Telepon
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(employee.work_phone)}
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Resign Date
                                </p>
                                <p className="text-sm font-medium">
                                    {formatDate(employee.resign_date)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Profil Pribadi</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    NIK
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.nik)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    KK
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.kk_number)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    NPWP
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.npwp)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    BPJS Kesehatan
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.bpjs_kes)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    BPJS TK
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.bpjs_tk)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Gender
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.gender)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Tempat, Tanggal Lahir
                                </p>
                                <p className="text-sm font-medium">
                                    {profile.birth_place ?? '-'} ·{' '}
                                    {formatDate(profile.birth_date)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Status
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.marital_status)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Agama
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.religion)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Kontak Darurat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Nama
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(
                                        profile.emergency_contact_name,
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Relasi
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(
                                        profile.emergency_contact_relation,
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Telepon
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(
                                        profile.emergency_contact_phone,
                                    )}
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Alamat
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.address_line1)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {[
                                        profile.city,
                                        profile.province,
                                        profile.postal_code,
                                    ]
                                        .filter(Boolean)
                                        .join(', ') || '-'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bank & Payroll</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Bank
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.bank_name)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Nama Rekening
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.bank_account_name)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Nomor Rekening
                                </p>
                                <p className="text-sm font-medium">
                                    {formatValue(profile.bank_account_number)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Dokumen</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            {documents.length === 0 && (
                                <div className="rounded-lg border border-border/60 px-3 py-2">
                                    Belum ada dokumen yang diunggah.
                                </div>
                            )}
                            {documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {doc.type}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {doc.number ?? '-'} · Berlaku sampai{' '}
                                            {formatDate(doc.expires_at)}
                                        </p>
                                    </div>
                                    {doc.has_file ? (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/secure-files/documents/${doc.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Lihat
                                                </a>
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/secure-files/documents/${doc.id}`}
                                                    download
                                                >
                                                    Unduh
                                                </a>
                                            </Button>
                                        </div>
                                    ) : (
                                        <Badge variant="outline">
                                            Tidak ada file
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle>Riwayat Absensi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-hidden rounded-lg border border-border/60">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                        <tr>
                                            <th className="px-4 py-3">
                                                Tanggal
                                            </th>
                                            <th className="px-4 py-3">Shift</th>
                                            <th className="px-4 py-3">
                                                Check In/Out
                                            </th>
                                            <th className="px-4 py-3">
                                                Status
                                            </th>
                                            <th className="px-4 py-3">
                                                Approval
                                            </th>
                                            <th className="px-4 py-3">GPS</th>
                                            <th className="px-4 py-3">
                                                Selfie
                                            </th>
                                            <th className="px-4 py-3 text-right">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceLogs.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={8}
                                                    className="px-4 py-6 text-center text-sm text-muted-foreground"
                                                >
                                                    Belum ada log absensi.
                                                </td>
                                            </tr>
                                        )}
                                        {attendanceLogs.map((log) => {
                                            const checkInPhoto =
                                                log.photos?.find(
                                                    (photo) =>
                                                        photo.type ===
                                                        'check_in',
                                                );
                                            const checkOutPhoto =
                                                log.photos?.find(
                                                    (photo) =>
                                                        photo.type ===
                                                        'check_out',
                                                );

                                            return (
                                                <tr
                                                    key={log.id}
                                                    className="border-t border-border/60"
                                                >
                                                    <td className="px-4 py-3">
                                                        {formatDate(
                                                            log.work_date,
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="text-sm font-medium">
                                                            {log.shift?.name ??
                                                                '-'}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {log.shift
                                                                ? `${log.shift.start_time} - ${log.shift.end_time}`
                                                                : '-'}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {formatTime(
                                                            log.check_in_at,
                                                        )}{' '}
                                                        /{' '}
                                                        {formatTime(
                                                            log.check_out_at,
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant="outline">
                                                            {log.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge
                                                            variant={
                                                                approvalBadge[
                                                                    log.approval_status ??
                                                                        'pending'
                                                                ] ?? 'outline'
                                                            }
                                                        >
                                                            {log.approval_status ??
                                                                '-'}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-muted-foreground">
                                                        In:{' '}
                                                        {log.check_in_distance_meters ??
                                                            '-'}{' '}
                                                        m
                                                        <br />
                                                        Out:{' '}
                                                        {log.check_out_distance_meters ??
                                                            '-'}{' '}
                                                        m
                                                    </td>
                                                    <td className="px-4 py-3 text-xs">
                                                        <div className="flex flex-col gap-1">
                                                            {checkInPhoto && (
                                                                <a
                                                                    href={`/secure-files/attendance-photos/${checkInPhoto.id}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-primary hover:underline"
                                                                >
                                                                    Selfie In
                                                                </a>
                                                            )}
                                                            {checkOutPhoto && (
                                                                <a
                                                                    href={`/secure-files/attendance-photos/${checkOutPhoto.id}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-primary hover:underline"
                                                                >
                                                                    Selfie Out
                                                                </a>
                                                            )}
                                                            {!checkInPhoto &&
                                                                !checkOutPhoto && (
                                                                    <span>
                                                                        -
                                                                    </span>
                                                                )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                disabled={
                                                                    log.approval_status !==
                                                                    'pending'
                                                                }
                                                                onClick={() =>
                                                                    router.post(
                                                                        `/modules/attendance/${log.id}/approve`,
                                                                    )
                                                                }
                                                            >
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                disabled={
                                                                    log.approval_status !==
                                                                    'pending'
                                                                }
                                                                onClick={() => {
                                                                    const notes =
                                                                        prompt(
                                                                            'Catatan penolakan (opsional):',
                                                                        ) ?? '';
                                                                    router.post(
                                                                        `/modules/attendance/${log.id}/reject`,
                                                                        {
                                                                            notes,
                                                                        },
                                                                    );
                                                                }}
                                                            >
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle>Riwayat Kontrak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-hidden rounded-lg border border-border/60">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                        <tr>
                                            <th className="px-4 py-3">Tipe</th>
                                            <th className="px-4 py-3">Mulai</th>
                                            <th className="px-4 py-3">
                                                Selesai
                                            </th>
                                            <th className="px-4 py-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contracts.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-4 py-6 text-center text-sm text-muted-foreground"
                                                >
                                                    Belum ada kontrak tercatat.
                                                </td>
                                            </tr>
                                        )}
                                        {contracts.map((contract) => (
                                            <tr
                                                key={contract.id}
                                                className="border-t border-border/60"
                                            >
                                                <td className="px-4 py-3">
                                                    {contract.type}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {formatDate(
                                                        contract.start_date,
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {formatDate(
                                                        contract.end_date,
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline">
                                                        {contract.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
