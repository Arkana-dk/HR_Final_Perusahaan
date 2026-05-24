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

type DocumentRow = {
    id: number;
    employee_id: number;
    type: string;
    number?: string | null;
    issued_at?: string | null;
    expires_at?: string | null;
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
    documents: {
        data: DocumentRow[];
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
    };
    stats: {
        total: number;
        expired: number;
        expiring: number;
        expiring_h14: number;
        expiring_h7: number;
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

const getStatus = (expiresAt?: string | null) => {
    if (!expiresAt) {
        return { label: 'No Expiry', variant: 'outline' as const };
    }

    const today = new Date();
    const expireDate = new Date(expiresAt);
    const diffMs = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return { label: 'Expired', variant: 'destructive' as const };
    }

    if (diffDays <= 30) {
        return { label: 'Expiring', variant: 'secondary' as const };
    }

    return { label: 'Valid', variant: 'outline' as const };
};

export default function DocumentIndex() {
    const { documents, filters, stats } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status || ALL_OPTION_VALUE);
    const [type, setType] = useState(filters.type ?? '');

    const applyFilters = () => {
        router.get(
            '/modules/documents',
            {
                search,
                status: status === ALL_OPTION_VALUE ? '' : status,
                type,
            },
            { preserveState: true, replace: true },
        );
    };

    const rows = useMemo(() => documents.data ?? [], [documents.data]);
    const pagination = documents.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = documents.meta?.from ?? documents.from ?? 0;
    const to = documents.meta?.to ?? documents.to ?? 0;
    const total = documents.meta?.total ?? documents.total ?? 0;

    return (
        <AppLayout>
            <Head title="Documents" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Documents</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Dokumen Karyawan
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola dokumen penting karyawan beserta masa
                                berlaku dan statusnya.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button asChild>
                                <Link href="/modules/documents/create">
                                    Tambah Dokumen
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={applyFilters}>
                                Terapkan Filter
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Dokumen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.total}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Semua dokumen
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
                                Melewati batas
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hampir Habis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.expiring}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                30 hari ke depan
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>H-14</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.expiring_h14}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Kedaluwarsa ≤ 14 hari
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>H-7</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.expiring_h7}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Kedaluwarsa ≤ 7 hari
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-1 md:col-span-2">
                            <CardTitle>Daftar Dokumen</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {from} - {to} dari {total} dokumen
                            </p>
                        </div>
                        <Input
                            placeholder="Cari nama, tipe, nomor"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <Input
                            placeholder="Tipe dokumen"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
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
                                <SelectItem value="valid">Valid</SelectItem>
                                <SelectItem value="expiring">
                                    Hampir Habis
                                </SelectItem>
                                <SelectItem value="expiring_h14">
                                    Habis ≤ 14 Hari
                                </SelectItem>
                                <SelectItem value="expiring_h7">
                                    Habis ≤ 7 Hari
                                </SelectItem>
                                <SelectItem value="expired">
                                    Kadaluarsa
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
                                        <th className="px-4 py-3">Nomor</th>
                                        <th className="px-4 py-3">Berlaku</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">File</th>
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
                                                Belum ada dokumen tercatat.
                                            </td>
                                        </tr>
                                    )}
                                    {rows.map((document) => {
                                        const statusInfo = getStatus(
                                            document.expires_at,
                                        );
                                        return (
                                            <tr
                                                key={document.id}
                                                className="border-t border-border/60"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="text-sm font-medium">
                                                        {document.employee?.user
                                                            ?.name ?? '-'}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {document.employee
                                                            ?.employee_code ??
                                                            '-'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {document.type}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {document.number ?? '-'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {formatDate(
                                                        document.expires_at,
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant={
                                                            statusInfo.variant
                                                        }
                                                    >
                                                        {statusInfo.label}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-xs">
                                                    {document.has_file ? (
                                                        <a
                                                            href={`/secure-files/documents/${document.id}`}
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
                                                                href={`/modules/documents/${document.id}/edit`}
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
                                                                        'Yakin ingin menghapus dokumen ini?',
                                                                    )
                                                                ) {
                                                                    router.delete(
                                                                        `/modules/documents/${document.id}`,
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            Hapus
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
                        Menampilkan {from} - {to} dari {total} dokumen
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
