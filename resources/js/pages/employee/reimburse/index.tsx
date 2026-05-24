import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

type ReimburseRow = {
    id: number;
    category: string;
    title?: string | null;
    amount: number;
    currency: string;
    status: string;
    attachment_path?: string | null;
    requested_at?: string | null;
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
        data: ReimburseRow[];
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

const formatCurrency = (value: number, currency: string) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);

export default function EmployeeReimburse() {
    const { employee, requests, employeeProfileMissing } =
        usePage<PageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        category: '',
        title: '',
        amount: '',
        currency: 'IDR',
        description: '',
        attachment: null as File | null,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (employeeProfileMissing) return;

        post('/employee/reimburse', {
            forceFormData: true,
            onSuccess: () =>
                reset(
                    'category',
                    'title',
                    'amount',
                    'description',
                    'attachment',
                ),
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
            <Head title="My Reimburse" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="space-y-2">
                        <Badge variant="secondary">Reimburse</Badge>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Ajukan Reimburse
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
                            sebelum mengajukan reimburse.
                        </CardContent>
                    </Card>
                )}

                {employeeError && (
                    <p className="text-sm text-destructive">{employeeError}</p>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Form Reimburse</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <fieldset
                                disabled={employeeProfileMissing}
                                className="grid gap-4 md:grid-cols-2"
                            >
                                <div className="space-y-2">
                                    <Label>Kategori</Label>
                                    <Input
                                        value={data.category}
                                        onChange={(event) =>
                                            setData(
                                                'category',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {errors.category && (
                                        <p className="text-xs text-destructive">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Judul</Label>
                                    <Input
                                        value={data.title}
                                        onChange={(event) =>
                                            setData('title', event.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <p className="text-xs text-destructive">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Jumlah</Label>
                                    <Input
                                        type="number"
                                        value={data.amount}
                                        onChange={(event) =>
                                            setData(
                                                'amount',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {errors.amount && (
                                        <p className="text-xs text-destructive">
                                            {errors.amount}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Mata Uang</Label>
                                    <Input
                                        value={data.currency}
                                        onChange={(event) =>
                                            setData(
                                                'currency',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {errors.currency && (
                                        <p className="text-xs text-destructive">
                                            {errors.currency}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Deskripsi</Label>
                                    <Input
                                        value={data.description}
                                        onChange={(event) =>
                                            setData(
                                                'description',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-xs text-destructive">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Upload Bukti</Label>
                                    <Input
                                        type="file"
                                        onChange={(event) =>
                                            setData(
                                                'attachment',
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    {errors.attachment && (
                                        <p className="text-xs text-destructive">
                                            {errors.attachment}
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
                                              : 'Ajukan Reimburse'}
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Reimburse</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Kategori</th>
                                        <th className="px-4 py-3">Jumlah</th>
                                        <th className="px-4 py-3">Tanggal</th>
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
                                                Belum ada klaim reimburse.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="border-t border-border/60"
                                        >
                                            <td className="px-4 py-3">
                                                {request.category}
                                                {request.title && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {request.title}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatCurrency(
                                                    request.amount,
                                                    request.currency,
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatDate(
                                                    request.requested_at,
                                                )}
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
                                                        href={`/secure-files/reimburse-attachments/${request.id}`}
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
