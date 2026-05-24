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

type ContractRow = {
    id: number;
    employee_id: number;
    type: string;
    start_date: string;
    end_date?: string | null;
    status: string;
    base_salary?: number | string | null;
    has_file?: boolean;
    employee?: {
        employee_code?: string | null;
        user?: {
            name: string;
            email?: string | null;
        } | null;
    } | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    contracts: {
        data: ContractRow[];
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
        reminder: string;
    };
    stats: {
        total: number;
        active: number;
        expired: number;
        terminated: number;
        expiring_h30: number;
        expiring_h14: number;
        expiring_h7: number;
    };
};

const statusBadge: Record<string, 'outline' | 'secondary' | 'destructive'> = {
    active: 'secondary',
    expired: 'outline',
    terminated: 'destructive',
};

const formatDate = (value?: string | null) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const formatSalary = (value?: number | string | null) => {
    if (value === null || value === undefined || value === '') return '-';
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return '-';
    return `Rp ${new Intl.NumberFormat('id-ID').format(numeric)}`;
};

export default function ContractIndex() {
    const { contracts, filters, stats } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status || ALL_OPTION_VALUE);
    const [type, setType] = useState(filters.type || ALL_OPTION_VALUE);
    const [reminder, setReminder] = useState(
        filters.reminder || ALL_OPTION_VALUE,
    );

    const applyFilters = () => {
        router.get(
            '/modules/contracts',
            {
                search,
                status: status === ALL_OPTION_VALUE ? '' : status,
                type: type === ALL_OPTION_VALUE ? '' : type,
                reminder: reminder === ALL_OPTION_VALUE ? '' : reminder,
            },
            { preserveState: true, replace: true },
        );
    };

    const rows = useMemo(() => contracts.data ?? [], [contracts.data]);
    const pagination = contracts.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = contracts.meta?.from ?? contracts.from ?? 0;
    const to = contracts.meta?.to ?? contracts.to ?? 0;
    const total = contracts.meta?.total ?? contracts.total ?? 0;

    return (
        <AppLayout>
            <Head title="Contracts" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Contracts</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Manajemen Kontrak Karyawan
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Pantau kontrak aktif, masa berlaku, dan dokumen
                                per karyawan.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button asChild>
                                <Link href="/modules/contracts/create">
                                    Tambah Kontrak
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={applyFilters}>
                                Terapkan Filter
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Kontrak</CardTitle>
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
                            <CardTitle>Aktif</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.active}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Kontrak berjalan
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Kadaluarsa</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.expired}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Masa kontrak berakhir
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Terminated</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.terminated}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Kontrak dihentikan
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Reminder H-30</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.expiring_h30}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Kontrak akan berakhir ≤ 30 hari
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Reminder H-14</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.expiring_h14}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Kontrak akan berakhir ≤ 14 hari
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Reminder H-7</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.expiring_h7}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Kontrak akan berakhir ≤ 7 hari
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-1 md:col-span-2">
                            <CardTitle>Daftar Kontrak</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {from} - {to} dari {total} kontrak
                            </p>
                        </div>
                        <Input
                            placeholder="Cari nama atau kode karyawan"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <Select
                            value={type}
                            onValueChange={(value) => setType(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Tipe Kontrak" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ALL_OPTION_VALUE}>
                                    Semua
                                </SelectItem>
                                <SelectItem value="permanent">
                                    Permanent
                                </SelectItem>
                                <SelectItem value="contract">
                                    Contract
                                </SelectItem>
                                <SelectItem value="internship">
                                    Internship
                                </SelectItem>
                                <SelectItem value="probation">
                                    Probation
                                </SelectItem>
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
                                <SelectItem value="active">Aktif</SelectItem>
                                <SelectItem value="expired">
                                    Kadaluarsa
                                </SelectItem>
                                <SelectItem value="terminated">
                                    Terminated
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={reminder}
                            onValueChange={(value) => setReminder(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Reminder" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ALL_OPTION_VALUE}>
                                    Semua Reminder
                                </SelectItem>
                                <SelectItem value="h30">
                                    Akan Habis ≤ 30 Hari
                                </SelectItem>
                                <SelectItem value="h14">
                                    Akan Habis ≤ 14 Hari
                                </SelectItem>
                                <SelectItem value="h7">
                                    Akan Habis ≤ 7 Hari
                                </SelectItem>
                                <SelectItem value="expired">
                                    Sudah Lewat
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
                                        <th className="px-4 py-3">Tipe</th>
                                        <th className="px-4 py-3">Periode</th>
                                        <th className="px-4 py-3">Gaji</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Dokumen</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                Belum ada kontrak tercatat.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((contract) => (
                                        <tr
                                            key={contract.id}
                                            className="border-t border-border/60"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium">
                                                    {contract.employee?.user
                                                        ?.name ?? '-'}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {contract.employee
                                                        ?.employee_code ?? '-'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {contract.type}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatDate(
                                                    contract.start_date,
                                                )}{' '}
                                                -{' '}
                                                {formatDate(contract.end_date)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatSalary(
                                                    contract.base_salary,
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        statusBadge[
                                                            contract.status
                                                        ] ?? 'outline'
                                                    }
                                                >
                                                    {contract.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                {contract.has_file ? (
                                                    <a
                                                        href={`/secure-files/contracts/${contract.id}`}
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
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/modules/contracts/${contract.id}/edit`}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    'Yakin ingin menghapus kontrak ini?',
                                                                )
                                                            ) {
                                                                router.delete(
                                                                    `/modules/contracts/${contract.id}`,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Hapus
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
                        Menampilkan {from} - {to} dari {total} kontrak
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
