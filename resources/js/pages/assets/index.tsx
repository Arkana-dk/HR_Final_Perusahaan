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

type AssetRow = {
    id: number;
    code: string;
    name: string;
    category?: string | null;
    status: string;
    company?: {
        name: string;
    } | null;
    assigned_employee?: {
        employee_code?: string;
        user?: {
            name: string;
        };
    } | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    assets: {
        data: AssetRow[];
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
    };
    stats: {
        total: number;
        assigned: number;
        available: number;
        maintenance: number;
    };
};

const statusBadge: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    available: 'outline',
    assigned: 'secondary',
    maintenance: 'destructive',
    retired: 'outline',
};

export default function AssetIndex() {
    const { assets, filters, stats } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status || ALL_OPTION_VALUE);

    const applyFilters = () => {
        router.get(
            '/modules/assets',
            {
                search,
                status: status === ALL_OPTION_VALUE ? '' : status,
            },
            { preserveState: true, replace: true },
        );
    };

    const rows = useMemo(() => assets.data ?? [], [assets.data]);
    const pagination = assets.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = assets.meta?.from ?? assets.from ?? 0;
    const to = assets.meta?.to ?? assets.to ?? 0;
    const total = assets.meta?.total ?? assets.total ?? 0;

    return (
        <AppLayout>
            <Head title="Assets" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Assets</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Asset Management
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola aset perusahaan, status peminjaman, dan
                                riwayat penugasan.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button asChild>
                                <Link href="/modules/assets/create">
                                    Tambah Aset
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
                            <CardTitle>Total Aset</CardTitle>
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
                            <CardTitle>Assigned</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.assigned}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Sedang digunakan
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Available</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.available}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Siap dipinjam
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.maintenance}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Sedang perbaikan
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-1 md:col-span-2">
                            <CardTitle>Daftar Aset</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {from} - {to} dari {total} aset
                            </p>
                        </div>
                        <Input
                            placeholder="Cari kode/nama/serial"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
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
                                <SelectItem value="available">
                                    Available
                                </SelectItem>
                                <SelectItem value="assigned">
                                    Assigned
                                </SelectItem>
                                <SelectItem value="maintenance">
                                    Maintenance
                                </SelectItem>
                                <SelectItem value="retired">
                                    Retired
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">Nama</th>
                                        <th className="px-4 py-3">Kategori</th>
                                        <th className="px-4 py-3">
                                            Assigned
                                        </th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                Belum ada aset tercatat.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((asset) => (
                                        <tr
                                            key={asset.id}
                                            className="border-t border-border/60"
                                        >
                                            <td className="px-4 py-3">
                                                {asset.code}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium">
                                                    {asset.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {asset.company?.name ?? '-'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {asset.category ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {asset.assigned_employee
                                                    ?.user?.name ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        statusBadge[
                                                            asset.status
                                                        ] ?? 'outline'
                                                    }
                                                >
                                                    {asset.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/modules/assets/${asset.id}/edit`}
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
                                                                    'Yakin ingin menghapus aset ini?',
                                                                )
                                                            ) {
                                                                router.delete(
                                                                    `/modules/assets/${asset.id}`,
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
                        Menampilkan {from} - {to} dari {total} aset
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

