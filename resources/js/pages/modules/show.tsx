import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

type ModuleMeta = {
    title: string;
    summary: string;
    highlights?: string[];
};

type Stat = {
    label: string;
    value: string | number;
    description?: string;
};

type Column = {
    key: string;
    label: string;
};

type Section = {
    title: string;
    description?: string;
    columns: Column[];
    rows: Array<Record<string, string | number | null>>;
    empty?: string;
    manage_url?: string | null;
};

type PageProps = {
    slug: string;
    module: ModuleMeta;
    placeholder: boolean;
    stats: Stat[];
    sections: Section[];
};

const formatValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === '') return '-';
    return value;
};

export default function ModuleShow() {
    const { module, placeholder, stats, sections } = usePage<PageProps>().props;
    const highlights = module.highlights ?? [];

    return (
        <AppLayout>
            <Head title={module.title} />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge
                                variant={placeholder ? 'secondary' : 'outline'}
                            >
                                {placeholder ? 'Coming Soon' : 'Module Active'}
                            </Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {module.title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {module.summary}
                            </p>
                        </div>
                        {placeholder && (
                            <Button variant="outline">
                                Minta Prioritas Modul Ini
                            </Button>
                        )}
                    </div>
                </section>

                {placeholder ? (
                    <section className="grid gap-4 lg:grid-cols-3">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Fitur Utama</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm text-muted-foreground">
                                {highlights.length > 0 ? (
                                    highlights.map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-lg border border-border/60 px-3 py-2"
                                        >
                                            {item}
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-lg border border-border/60 px-3 py-2">
                                        Modul ini sedang disiapkan.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Status Implementasi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-muted-foreground">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-foreground">
                                        Database Schema
                                    </p>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                        <div className="h-full w-[75%] rounded-full bg-chart-2" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Struktur data inti sudah disiapkan.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-foreground">
                                        API & Workflow
                                    </p>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                        <div className="h-full w-[40%] rounded-full bg-chart-3" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Endpoint & approval flow bertahap.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                ) : (
                    <>
                        {stats.length > 0 && (
                            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {stats.map((stat) => (
                                    <Card key={stat.label}>
                                        <CardHeader>
                                            <CardTitle>{stat.label}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-semibold">
                                                {stat.value}
                                            </p>
                                            {stat.description && (
                                                <p className="text-xs text-muted-foreground">
                                                    {stat.description}
                                                </p>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </section>
                        )}

                        {highlights.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ringkasan Modul</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-3 md:grid-cols-3">
                                    {highlights.map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-lg border border-border/60 px-3 py-2 text-sm text-muted-foreground"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {sections.map((section) => (
                            <Card key={section.title}>
                                <CardHeader>
                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                        <CardTitle>{section.title}</CardTitle>
                                        {section.manage_url && (
                                            <Button variant="outline" asChild>
                                                <Link href={section.manage_url}>
                                                    Kelola Data
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                    {section.description && (
                                        <p className="text-sm text-muted-foreground">
                                            {section.description}
                                        </p>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    {section.rows.length === 0 ? (
                                        <div className="rounded-lg border border-border/60 px-4 py-3 text-sm text-muted-foreground">
                                            {section.empty ?? 'Belum ada data.'}
                                        </div>
                                    ) : (
                                        <div className="overflow-hidden rounded-lg border border-border/60">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                                    <tr>
                                                        {section.columns.map(
                                                            (column) => (
                                                                <th
                                                                    key={
                                                                        column.key
                                                                    }
                                                                    className="px-4 py-3"
                                                                >
                                                                    {
                                                                        column.label
                                                                    }
                                                                </th>
                                                            ),
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {section.rows.map(
                                                        (row, index) => (
                                                            <tr
                                                                key={`${section.title}-${index}`}
                                                                className="border-t border-border/60"
                                                            >
                                                                {section.columns.map(
                                                                    (
                                                                        column,
                                                                    ) => (
                                                                        <td
                                                                            key={
                                                                                column.key
                                                                            }
                                                                            className="px-4 py-3"
                                                                        >
                                                                            {formatValue(
                                                                                row[
                                                                                    column
                                                                                        .key
                                                                                ],
                                                                            )}
                                                                        </td>
                                                                    ),
                                                                )}
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </>
                )}
            </div>
        </AppLayout>
    );
}
