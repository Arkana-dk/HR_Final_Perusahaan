import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

type LeaveTypeOption = {
    id: number;
    name: string;
    requires_attachment: boolean;
    default_allocation: number;
};

type LeaveRequestRow = {
    id: number;
    start_date: string;
    end_date: string;
    total_days: number;
    status: string;
    reason?: string | null;
    attachment_path?: string | null;
    requested_at?: string | null;
    leave_type?: {
        name: string;
    } | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    employee: {
        name: string;
        employee_code: string;
        company?: string | null;
    };
    employeeProfileMissing?: boolean;
    errors?: Record<string, string | undefined>;
    flash?: {
        success?: string;
    };
    requests: {
        data: LeaveRequestRow[];
        links: PaginationLink[];
        from?: number | null;
        to?: number | null;
        total?: number;
        meta?: {
            from: number | null;
            to: number | null;
            total: number;
        };
    };
    leaveTypes: LeaveTypeOption[];
};

const formatDate = (value?: string | null) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const statusBadge: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    pending: 'outline',
    approved: 'secondary',
    rejected: 'destructive',
    cancelled: 'outline',
};

export default function EmployeeLeaveRequests() {
    const {
        employee,
        requests,
        leaveTypes,
        employeeProfileMissing,
        errors: pageErrors,
        flash,
    } = usePage<PageProps>().props;
    const {
        data,
        setData,
        post,
        processing,
        errors: formErrors,
        reset,
    } = useForm({
        leave_type_id: '',
        start_date: '',
        end_date: '',
        reason: '',
        attachment: null as File | null,
    });

    const selectedType = useMemo(
        () =>
            leaveTypes.find(
                (type) => type.id.toString() === data.leave_type_id,
            ),
        [leaveTypes, data.leave_type_id],
    );
    const isFormLocked = employeeProfileMissing || leaveTypes.length === 0;

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (isFormLocked) return;

        post('/employee/leave-requests', {
            forceFormData: true,
            onSuccess: () =>
                reset('start_date', 'end_date', 'reason', 'attachment'),
        });
    };

    const pagination = requests.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = requests.meta?.from ?? requests.from ?? 0;
    const to = requests.meta?.to ?? requests.to ?? 0;
    const total = requests.meta?.total ?? requests.total ?? 0;
    const rows = requests.data ?? [];

    return (
        <AppLayout>
            <Head title="My Leave Requests" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="space-y-2">
                        <Badge variant="secondary">Leave Request</Badge>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Ajukan Cuti
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {employee.name} | {employee.employee_code} |{' '}
                            {employee.company ?? '-'}
                        </p>
                    </div>
                </section>

                {employeeProfileMissing && (
                    <Card className="border-destructive/40 bg-destructive/5">
                        <CardContent className="pt-6 text-sm text-muted-foreground">
                            Profil karyawan untuk akun ini belum terhubung.
                            Hubungi admin HR untuk melengkapi data employee
                            sebelum mengajukan cuti.
                        </CardContent>
                    </Card>
                )}

                {!employeeProfileMissing && leaveTypes.length === 0 && (
                    <Card className="border-destructive/40 bg-destructive/5">
                        <CardContent className="pt-6 text-sm text-muted-foreground">
                            Belum ada jenis cuti aktif untuk perusahaan Anda.
                            Hubungi admin HR untuk menambahkan jenis cuti.
                        </CardContent>
                    </Card>
                )}

                {pageErrors?.employee && (
                    <p className="text-sm text-destructive">
                        {pageErrors.employee}
                    </p>
                )}
                {flash?.success && (
                    <p className="text-sm text-green-600">{flash.success}</p>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Form Pengajuan Cuti</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <fieldset
                                disabled={isFormLocked}
                                className="grid gap-4 md:grid-cols-2"
                            >
                                <div className="space-y-2">
                                    <Label>Jenis Cuti</Label>
                                    <Select
                                        value={data.leave_type_id}
                                        onValueChange={(value) =>
                                            setData('leave_type_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis cuti" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {leaveTypes.map((type) => (
                                                <SelectItem
                                                    key={type.id}
                                                    value={type.id.toString()}
                                                >
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {formErrors.leave_type_id && (
                                        <p className="text-xs text-destructive">
                                            {formErrors.leave_type_id}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Mulai</Label>
                                    <Input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(event) =>
                                            setData(
                                                'start_date',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {formErrors.start_date && (
                                        <p className="text-xs text-destructive">
                                            {formErrors.start_date}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Selesai</Label>
                                    <Input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(event) =>
                                            setData(
                                                'end_date',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {formErrors.end_date && (
                                        <p className="text-xs text-destructive">
                                            {formErrors.end_date}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Alasan</Label>
                                    <Input
                                        value={data.reason}
                                        onChange={(event) =>
                                            setData(
                                                'reason',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {formErrors.reason && (
                                        <p className="text-xs text-destructive">
                                            {formErrors.reason}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Upload Lampiran</Label>
                                    <Input
                                        type="file"
                                        onChange={(event) =>
                                            setData(
                                                'attachment',
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    {selectedType?.requires_attachment && (
                                        <p className="text-xs text-muted-foreground">
                                            Lampiran wajib untuk jenis cuti ini.
                                        </p>
                                    )}
                                    {formErrors.attachment && (
                                        <p className="text-xs text-destructive">
                                            {formErrors.attachment}
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end md:col-span-2">
                                    <Button
                                        type="submit"
                                        disabled={processing || isFormLocked}
                                    >
                                        {employeeProfileMissing
                                            ? 'Profil karyawan belum tersedia'
                                            : leaveTypes.length === 0
                                              ? 'Jenis cuti belum tersedia'
                                              : processing
                                                ? 'Mengirim...'
                                                : 'Ajukan Cuti'}
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Cuti</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Jenis</th>
                                        <th className="px-4 py-3">Periode</th>
                                        <th className="px-4 py-3">Hari</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Lampiran</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                Belum ada pengajuan cuti.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="border-t border-border/60"
                                        >
                                            <td className="px-4 py-3">
                                                {request.leave_type?.name ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatDate(request.start_date)}{' '}
                                                - {formatDate(request.end_date)}
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
                                                    <a
                                                        href={`/secure-files/leave-attachments/${request.id}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        Lihat
                                                    </a>
                                                ) : (
                                                    '-'
                                                )}
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
                        Menampilkan {from} - {to} dari {total} pengajuan
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
