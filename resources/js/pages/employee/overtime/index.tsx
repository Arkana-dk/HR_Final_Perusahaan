import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

type OvertimeRow = {
    id: number;
    work_date: string;
    start_time: string;
    end_time: string;
    total_hours: number;
    status: string;
    reason?: string | null;
    approval_notes?: string | null;
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
    requests: {
        data: OvertimeRow[];
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

export default function EmployeeOvertime() {
    const { employee, requests, employeeProfileMissing } =
        usePage<PageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        work_date: '',
        start_time: '',
        end_time: '',
        reason: '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (employeeProfileMissing) return;

        post('/employee/overtime', {
            onSuccess: () =>
                reset('work_date', 'start_time', 'end_time', 'reason'),
        });
    };

    const pagination = requests.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = requests.meta?.from ?? requests.from ?? 0;
    const to = requests.meta?.to ?? requests.to ?? 0;
    const total = requests.meta?.total ?? requests.total ?? 0;
    const rows = requests.data ?? [];
    const employeeError = (errors as Record<string, string | undefined>)
        .employee;

    return (
        <AppLayout>
            <Head title="My Overtime" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="space-y-2">
                        <Badge variant="secondary">Overtime</Badge>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Ajukan Lembur
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
                            sebelum mengajukan lembur.
                        </CardContent>
                    </Card>
                )}

                {employeeError && (
                    <p className="text-sm text-destructive">{employeeError}</p>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Form Lembur</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <fieldset
                                disabled={employeeProfileMissing}
                                className="grid gap-4 md:grid-cols-2"
                            >
                                <div className="space-y-2">
                                    <Label>Tanggal</Label>
                                    <Input
                                        type="date"
                                        value={data.work_date}
                                        onChange={(event) =>
                                            setData(
                                                'work_date',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {errors.work_date && (
                                        <p className="text-xs text-destructive">
                                            {errors.work_date}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Mulai</Label>
                                    <Input
                                        type="time"
                                        value={data.start_time}
                                        onChange={(event) =>
                                            setData(
                                                'start_time',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {errors.start_time && (
                                        <p className="text-xs text-destructive">
                                            {errors.start_time}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Selesai</Label>
                                    <Input
                                        type="time"
                                        value={data.end_time}
                                        onChange={(event) =>
                                            setData(
                                                'end_time',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {errors.end_time && (
                                        <p className="text-xs text-destructive">
                                            {errors.end_time}
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
                                    {errors.reason && (
                                        <p className="text-xs text-destructive">
                                            {errors.reason}
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end md:col-span-2">
                                    <Button
                                        type="submit"
                                        disabled={
                                            processing || employeeProfileMissing
                                        }
                                    >
                                        {employeeProfileMissing
                                            ? 'Profil karyawan belum tersedia'
                                            : processing
                                              ? 'Mengirim...'
                                              : 'Ajukan Lembur'}
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Lembur</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Tanggal</th>
                                        <th className="px-4 py-3">Jam</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Catatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                Belum ada pengajuan lembur.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="border-t border-border/60"
                                        >
                                            <td className="px-4 py-3">
                                                {formatDate(request.work_date)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {request.start_time} -{' '}
                                                {request.end_time}
                                            </td>
                                            <td className="px-4 py-3">
                                                {request.total_hours} jam
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
                                            <td className="px-4 py-3 text-xs text-muted-foreground">
                                                {request.reason ??
                                                    request.approval_notes ??
                                                    '-'}
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
