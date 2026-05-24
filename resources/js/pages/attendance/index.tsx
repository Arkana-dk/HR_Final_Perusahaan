import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

const ALL_OPTION_VALUE = 'all';

type AttendancePhoto = {
    id: number;
    type: 'check_in' | 'check_out';
    file_path: string;
};

type AttendanceRow = {
    id: number;
    work_date: string;
    status: string;
    approval_status: string;
    is_early_leave?: boolean;
    early_leave_reason?: string | null;
    check_in_at?: string | null;
    check_out_at?: string | null;
    check_in_method?: string | null;
    check_out_method?: string | null;
    check_in_distance_meters?: number | null;
    check_out_distance_meters?: number | null;
    employee?: {
        employee_code?: string;
        user?: {
            id: number;
            name: string;
            email: string;
        };
    } | null;
    shift?: {
        name: string;
        start_time?: string;
        end_time?: string;
    } | null;
    work_location?: {
        name: string;
    } | null;
    photos?: AttendancePhoto[];
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    auth?: {
        user?: {
            id?: number | null;
        } | null;
    } | null;
    logs: {
        data: AttendanceRow[];
        links: PaginationLink[];
        meta?: {
            from: number | null;
            to: number | null;
            total: number;
        };
        from?: number | null;
        to?: number | null;
        total?: number;
    };
    filters: {
        search: string;
        status: string;
        approval: string;
        date: string;
    };
    stats: {
        total: number;
        late: number;
        pending: number;
        approved: number;
    };
};

const formatDate = (value?: string | null) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const formatTime = (value?: string | null) => {
    if (!value) return '-';
    return new Date(value).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

type BadgeTone = 'default' | 'destructive' | 'outline' | 'secondary';

const statusBadge: Record<string, BadgeTone> = {
    present: 'default',
    late: 'destructive',
    absent: 'outline',
    on_leave: 'outline',
    sick: 'outline',
    permission: 'outline',
};

const approvalBadge: Record<string, BadgeTone> = {
    pending: 'outline',
    approved: 'secondary',
    rejected: 'destructive',
};

export default function AttendanceIndex() {
    const { logs, filters, stats, auth } = usePage<PageProps>().props;
    const currentUserId = auth?.user?.id ?? null;
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status || ALL_OPTION_VALUE);
    const [approval, setApproval] = useState(
        filters.approval || ALL_OPTION_VALUE,
    );
    const [date, setDate] = useState(filters.date ?? '');

    const applyFilters = () => {
        router.get(
            '/modules/attendance',
            {
                search,
                status: status === ALL_OPTION_VALUE ? '' : status,
                approval: approval === ALL_OPTION_VALUE ? '' : approval,
                date,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const pagination = logs.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = logs.meta?.from ?? logs.from ?? 0;
    const to = logs.meta?.to ?? logs.to ?? 0;
    const total = logs.meta?.total ?? logs.total ?? 0;

    const rows = useMemo(() => logs.data ?? [], [logs.data]);
    const isSelfLog = (row: AttendanceRow) =>
        currentUserId !== null && row.employee?.user?.id === currentUserId;

    return (
        <AppLayout>
            <Head title="Attendance Logs" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Attendance</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Attendance Logs
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Validasi GPS + selfie, approval, dan monitoring
                                jam kerja.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" onClick={applyFilters}>
                                Terapkan Filter
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.total}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Semua status
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Late</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.late}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Keterlambatan
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.pending}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Menunggu approval
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Approved</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.approved}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Disetujui
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-1 md:col-span-2">
                            <CardTitle>Filter Absensi</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {from} - {to} dari {total} log
                            </p>
                        </div>
                        <Input
                            placeholder="Cari nama atau kode"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <Input
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                        <Select
                            value={status}
                            onValueChange={(value) => setStatus(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ALL_OPTION_VALUE}>
                                    Semua
                                </SelectItem>
                                <SelectItem value="present">Present</SelectItem>
                                <SelectItem value="late">Late</SelectItem>
                                <SelectItem value="absent">Absent</SelectItem>
                                <SelectItem value="on_leave">Leave</SelectItem>
                                <SelectItem value="sick">Sick</SelectItem>
                                <SelectItem value="permission">
                                    Permission
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={approval}
                            onValueChange={(value) => setApproval(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Approval" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ALL_OPTION_VALUE}>
                                    Semua
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">
                                    Approved
                                </SelectItem>
                                <SelectItem value="rejected">
                                    Rejected
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Karyawan</th>
                                        <th className="px-4 py-3">Tanggal</th>
                                        <th className="px-4 py-3">Shift</th>
                                        <th className="px-4 py-3">
                                            Check In/Out
                                        </th>
                                        <th className="px-4 py-3">GPS</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Approval</th>
                                        <th className="px-4 py-3">Selfie</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                Belum ada log absensi.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((log) => {
                                        const checkInPhoto = log.photos?.find(
                                            (photo) =>
                                                photo.type === 'check_in',
                                        );
                                        const checkOutPhoto = log.photos?.find(
                                            (photo) =>
                                                photo.type === 'check_out',
                                        );

                                        return (
                                            <tr
                                                key={log.id}
                                                className="border-t border-border/60"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="text-sm font-medium">
                                                        {log.employee?.user
                                                            ?.name ?? '-'}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {log.employee
                                                            ?.employee_code ??
                                                            '-'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {formatDate(log.work_date)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm">
                                                        {log.shift?.name ?? '-'}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {log.shift
                                                            ? `${log.shift.start_time} - ${log.shift.end_time}`
                                                            : '-'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm">
                                                        {formatTime(
                                                            log.check_in_at,
                                                        )}{' '}
                                                        /{' '}
                                                        {formatTime(
                                                            log.check_out_at,
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {log.check_in_method ??
                                                            '-'}
                                                    </div>
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
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col gap-1">
                                                        <Badge
                                                            variant={
                                                                statusBadge[
                                                                    log.status
                                                                ] ?? 'outline'
                                                            }
                                                        >
                                                            {log.status}
                                                        </Badge>
                                                        {log.is_early_leave && (
                                                            <Badge variant="secondary">
                                                                early leave
                                                            </Badge>
                                                        )}
                                                        {log.is_early_leave &&
                                                            log.early_leave_reason && (
                                                                <p className="max-w-[220px] text-xs text-muted-foreground">
                                                                    {
                                                                        log.early_leave_reason
                                                                    }
                                                                </p>
                                                            )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant={
                                                            approvalBadge[
                                                                log
                                                                    .approval_status
                                                            ] ?? 'outline'
                                                        }
                                                    >
                                                        {log.approval_status}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col gap-1 text-xs">
                                                        {checkInPhoto && (
                                                            <Link
                                                                href={`/secure-files/attendance-photos/${checkInPhoto.id}`}
                                                                target="_blank"
                                                                className="text-primary hover:underline"
                                                            >
                                                                Selfie In
                                                            </Link>
                                                        )}
                                                        {checkOutPhoto && (
                                                            <Link
                                                                href={`/secure-files/attendance-photos/${checkOutPhoto.id}`}
                                                                target="_blank"
                                                                className="text-primary hover:underline"
                                                            >
                                                                Selfie Out
                                                            </Link>
                                                        )}
                                                        {!checkInPhoto &&
                                                            !checkOutPhoto && (
                                                                <span>-</span>
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
                                                                    'pending' ||
                                                                isSelfLog(log)
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
                                                                    'pending' ||
                                                                isSelfLog(log)
                                                            }
                                                            onClick={() => {
                                                                const notes =
                                                                    prompt(
                                                                        'Catatan penolakan (opsional):',
                                                                    ) ?? '';
                                                                router.post(
                                                                    `/modules/attendance/${log.id}/reject`,
                                                                    { notes },
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

                <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                        Menampilkan {from} - {to} dari {total} log
                    </div>
                    <div className="flex gap-2">
                        {prevLink?.url ? (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={prevLink.url}>Prev</Link>
                            </Button>
                        ) : (
                            <Button variant="outline" size="sm" disabled>
                                Prev
                            </Button>
                        )}
                        {nextLink?.url ? (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={nextLink.url}>Next</Link>
                            </Button>
                        ) : (
                            <Button variant="outline" size="sm" disabled>
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
