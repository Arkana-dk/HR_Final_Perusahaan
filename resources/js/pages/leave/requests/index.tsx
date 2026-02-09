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

type LeaveRequestRow = {
    id: number;
    start_date: string;
    end_date: string;
    total_days: number;
    status: string;
    reason?: string | null;
    requested_at?: string | null;
    approved_at?: string | null;
    approval_notes?: string | null;
    attachment_path?: string | null;
    employee?: {
        employee_code?: string;
        user?: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    } | null;
    leave_type?: {
        name: string;
    } | null;
    approved_by?: {
        name: string;
    } | null;
    approval?: {
        status: string;
        current_step: number;
        steps?: Array<{
            step: number;
            status: string;
            approver?: {
                id: number;
                name: string;
            } | null;
        }>;
    } | null;
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
            role?: string | null;
        } | null;
    } | null;
    requests: {
        data: LeaveRequestRow[];
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
        type: string;
        date: string;
    };
    stats: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    leaveTypes: Array<{
        value: string;
        label: string;
    }>;
};

const formatDate = (value?: string | null) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const statusBadge: Record<string, string> = {
    pending: 'outline',
    approved: 'secondary',
    rejected: 'destructive',
    cancelled: 'outline',
};

export default function LeaveRequestIndex() {
    const { auth, requests, filters, stats, leaveTypes } =
        usePage<PageProps>().props;
    const role = auth?.user?.role ?? 'employee';
    const currentUserId = auth?.user?.id ?? null;
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(
        filters.status || ALL_OPTION_VALUE,
    );
    const [type, setType] = useState(filters.type || ALL_OPTION_VALUE);
    const [date, setDate] = useState(filters.date ?? '');

    const applyFilters = () => {
        router.get(
            '/modules/leave-requests',
            {
                search,
                status: status === ALL_OPTION_VALUE ? '' : status,
                type: type === ALL_OPTION_VALUE ? '' : type,
                date,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const pagination = requests.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = requests.meta?.from ?? requests.from ?? 0;
    const to = requests.meta?.to ?? requests.to ?? 0;
    const total = requests.meta?.total ?? requests.total ?? 0;

    const rows = useMemo(() => requests.data ?? [], [requests.data]);
    const totalSteps = (row: LeaveRequestRow) =>
        row.approval?.steps?.length ?? 2;
    const canApproveStep = (step: number, row: LeaveRequestRow) => {
        const requesterRole = row.employee?.user?.role ?? 'employee';

        if (requesterRole === 'admin' || requesterRole === 'superadmin') {
            return step === 1 && role === 'superadmin';
        }

        if (step === 1) return role === 'admin' || role === 'superadmin';
        if (step === 2) return role === 'superadmin';
        return false;
    };
    const isSelfRequest = (row: LeaveRequestRow) =>
        currentUserId !== null && row.employee?.user?.id === currentUserId;
    const hasDecidedPreviousStep = (row: LeaveRequestRow) => {
        if (currentUserId === null) return false;

        const currentStep = row.approval?.current_step ?? 1;
        return (row.approval?.steps ?? []).some(
            (step) =>
                step.step < currentStep &&
                step.approver?.id === currentUserId &&
                step.status !== 'pending',
        );
    };

    return (
        <AppLayout>
            <Head title="Leave Requests" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Leave</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Leave Requests
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Approval cuti dengan lampiran, periode, dan SLA
                                yang terpantau.
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
                            <CardTitle>Total Request</CardTitle>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Rejected</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.rejected}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Ditolak
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-1 md:col-span-2">
                            <CardTitle>Filter Leave Requests</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {from} - {to} dari {total} request
                            </p>
                        </div>
                        <Input
                            placeholder="Cari nama atau kode"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />
                        <Input
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                        <Select
                            value={type}
                            onValueChange={(value) => setType(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Jenis Cuti" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ALL_OPTION_VALUE}>
                                    Semua
                                </SelectItem>
                                {leaveTypes.map((leaveType) => (
                                    <SelectItem
                                        key={leaveType.value}
                                        value={leaveType.value}
                                    >
                                        {leaveType.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">
                                    Approved
                                </SelectItem>
                                <SelectItem value="rejected">
                                    Rejected
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3">Karyawan</th>
                                        <th className="px-4 py-3">Jenis</th>
                                        <th className="px-4 py-3">Periode</th>
                                        <th className="px-4 py-3">Hari</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">
                                            Lampiran
                                        </th>
                                        <th className="px-4 py-3">Flow</th>
                                        <th className="px-4 py-3">
                                            Approval
                                        </th>
                                        <th className="px-4 py-3">Catatan</th>
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
                                                Belum ada request cuti.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="border-t border-border/60"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium">
                                                    {request.employee?.user
                                                        ?.name ?? '-'}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {request.employee
                                                        ?.employee_code ?? '-'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {request.leave_type?.name ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatDate(
                                                    request.start_date,
                                                )}{' '}
                                                -{' '}
                                                {formatDate(request.end_date)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {request.total_days}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        statusBadge[
                                                            request.status
                                                        ] ?? 'outline'
                                                    }
                                                >
                                                    {request.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                {request.attachment_path ? (
                                                    <Link
                                                        href={`/storage/${request.attachment_path}`}
                                                        target="_blank"
                                                        className="text-primary hover:underline"
                                                    >
                                                        Lihat
                                                    </Link>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-muted-foreground">
                                                {(() => {
                                                    const approval =
                                                        request.approval;
                                                    const currentStep =
                                                        approval?.current_step ??
                                                        1;
                                                    const flowLabel =
                                                        approval?.status ===
                                                        'approved'
                                                            ? 'Final Approved'
                                                            : approval?.status ===
                                                                'rejected'
                                                              ? 'Rejected'
                                                              : `Step ${currentStep}/${totalSteps(
                                                                    request,
                                                                )}`;

                                                    return (
                                                        <Badge variant="outline">
                                                            {flowLabel}
                                                        </Badge>
                                                    );
                                                })()}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-muted-foreground">
                                                <div>
                                                    {request.approved_by?.name ??
                                                        '-'}
                                                </div>
                                                <div>
                                                    {formatDate(
                                                        request.approved_at,
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-muted-foreground">
                                                {request.approval_notes ??
                                                    request.reason ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={
                                                            request.status !==
                                                            'pending' ||
                                                            isSelfRequest(
                                                                request,
                                                            ) ||
                                                            hasDecidedPreviousStep(
                                                                request,
                                                            ) ||
                                                            !canApproveStep(
                                                                request.approval
                                                                    ?.current_step ??
                                                                    1,
                                                                request,
                                                            )
                                                        }
                                                        onClick={() =>
                                                            router.post(
                                                                `/modules/leave-requests/${request.id}/approve`,
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        disabled={
                                                            request.status !==
                                                            'pending' ||
                                                            isSelfRequest(
                                                                request,
                                                            ) ||
                                                            hasDecidedPreviousStep(
                                                                request,
                                                            ) ||
                                                            !canApproveStep(
                                                                request.approval
                                                                    ?.current_step ??
                                                                    1,
                                                                request,
                                                            )
                                                        }
                                                        onClick={() => {
                                                            const notes =
                                                                prompt(
                                                                    'Catatan penolakan (opsional):',
                                                                ) ?? '';
                                                            router.post(
                                                                `/modules/leave-requests/${request.id}/reject`,
                                                                { notes },
                                                            );
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                        Menampilkan {from} - {to} dari {total} request
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
