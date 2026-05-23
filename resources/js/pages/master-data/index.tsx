import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useMemo, useRef, useState } from 'react';
import InputError from '@/components/input-error';
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

type Column = {
    key: string;
    label: string;
};

type Row = Record<string, string | number | null> & {
    id: number;
    edit_url: string;
    delete_url: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    resource: string;
    title: string;
    description?: string | null;
    columns: Column[];
    items: {
        data: Row[];
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
    createUrl: string;
    exportUrl: string;
    importUrl: string;
    templateUrl: string;
    templateColumns: string[];
};

const isStatusColumn = (key: string) =>
    ['status', 'is_active', 'paid'].includes(key);

export default function MasterDataIndex() {
    const {
        title,
        description,
        columns,
        items,
        createUrl,
        exportUrl,
        importUrl,
        templateUrl,
        templateColumns,
    } =
        usePage<PageProps>().props;
    const [query, setQuery] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm<{
        file: File | null;
        duplicate_mode: 'update' | 'skip' | 'error';
    }>({
        file: null,
        duplicate_mode: 'update',
    });

    const filteredRows = useMemo(() => {
        if (!query) return items.data;
        const lowered = query.toLowerCase();
        return items.data.filter((row) =>
            Object.values(row).some((value) =>
                String(value ?? '')
                    .toLowerCase()
                    .includes(lowered),
            ),
        );
    }, [items.data, query]);

    const pagination = items.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = items.meta?.from ?? items.from ?? 0;
    const to = items.meta?.to ?? items.to ?? 0;
    const total = items.meta?.total ?? items.total ?? 0;

    const submitImport = () => {
        if (!data.file) {
            alert('Pilih file import terlebih dahulu (CSV/XLSX).');
            return;
        }

        post(importUrl, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset('file');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <AppLayout>
            <Head title={title} />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Master Data</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                            {description && (
                                <p className="text-sm text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button asChild>
                                <Link href={createUrl}>Tambah Baru</Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href={templateUrl}>Download Template Excel</a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href={exportUrl}>Export Excel</a>
                            </Button>
                            <div className="flex flex-wrap items-center gap-2">
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".csv,.txt,.xlsx,.xls"
                                    className="max-w-[220px]"
                                    onChange={(event) =>
                                        setData(
                                            'file',
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <Select
                                    value={data.duplicate_mode}
                                    onValueChange={(value) =>
                                        setData(
                                            'duplicate_mode',
                                            value as 'update' | 'skip' | 'error',
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Mode duplikat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="update">
                                            Update Duplikat
                                        </SelectItem>
                                        <SelectItem value="skip">
                                            Lewati Duplikat
                                        </SelectItem>
                                        <SelectItem value="error">
                                            Error Jika Duplikat
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="secondary"
                                    onClick={submitImport}
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Mengimpor...'
                                        : 'Import File'}
                                </Button>
                            </div>
                        </div>
                    </div>
                    {templateColumns.length > 0 && (
                        <p className="mt-3 text-xs text-muted-foreground">
                            Template memiliki baris 1 (header), baris 2 (contoh), dan validasi dropdown untuk kolom tertentu. Kolom internal: {templateColumns.join(', ')}
                        </p>
                    )}
                    <InputError message={errors.file} />
                </section>

                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Daftar Data</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {from} - {to} dari {total} data
                            </p>
                        </div>
                        <Input
                            placeholder="Cari data..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            className="max-w-xs"
                        />
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
                                    <tr>
                                        {columns.map((column) => (
                                            <th
                                                key={column.key}
                                                className="px-4 py-3"
                                            >
                                                {column.label}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRows.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={columns.length + 1}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                Data belum tersedia.
                                            </td>
                                        </tr>
                                    )}
                                    {filteredRows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="border-t border-border/60"
                                        >
                                            {columns.map((column) => (
                                                <td
                                                    key={column.key}
                                                    className="px-4 py-3"
                                                >
                                                    {isStatusColumn(
                                                        column.key,
                                                    ) ? (
                                                        <Badge variant="outline">
                                                            {row[column.key] ??
                                                                '-'}
                                                        </Badge>
                                                    ) : (
                                                        row[column.key] ?? '-'
                                                    )}
                                                </td>
                                            ))}
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={row.edit_url}>
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    'Yakin ingin menghapus data ini?',
                                                                )
                                                            ) {
                                                                router.delete(
                                                                    row.delete_url,
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
                        Menampilkan {from} - {to} dari {total} data
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
