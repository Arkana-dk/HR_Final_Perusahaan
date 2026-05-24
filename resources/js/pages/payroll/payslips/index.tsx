import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

type PayslipRow = {
    id: number;
    gross_salary: string;
    total_deductions: string;
    net_salary: string;
    status: string;
    employee?: {
        user?: {
            name: string;
        };
    };
    payroll_period?: {
        name: string;
        start_date?: string;
        end_date?: string;
    };
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    payslips: {
        data: PayslipRow[];
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
    stats: {
        total: number;
        draft: number;
        final: number;
        paid: number;
    };
};

const statusVariant: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    draft: 'outline',
    final: 'secondary',
    paid: 'default',
};

export default function PayslipIndex() {
    const { payslips, stats } = usePage<PageProps>().props;
    const pagination = payslips.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = payslips.meta?.from ?? payslips.from ?? 0;
    const to = payslips.meta?.to ?? payslips.to ?? 0;
    const total = payslips.meta?.total ?? payslips.total ?? 0;

    return (
        <AppLayout>
            <Head title="Payslips" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Payroll</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Payslips
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola slip gaji dan status pembayaran.
                            </p>
                        </div>
                        <Button asChild>
                            <Link href="/modules/payslips/create">
                                Buat Payslip
                            </Link>
                        </Button>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Payslip</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.total}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Draft</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.draft}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Final</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.final}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Paid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.paid}
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Payslip</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {from} - {to} dari {total} payslip
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Karyawan</th>
                                        <th className="px-4 py-3">Periode</th>
                                        <th className="px-4 py-3">Gross</th>
                                        <th className="px-4 py-3">Deduction</th>
                                        <th className="px-4 py-3">Net</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payslips.data.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                Belum ada payslip.
                                            </td>
                                        </tr>
                                    )}
                                    {payslips.data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-border/60"
                                        >
                                            <td className="px-4 py-3">
                                                {item.employee?.user?.name ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.payroll_period?.name ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.gross_salary}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.total_deductions}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.net_salary}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        statusVariant[
                                                            item.status
                                                        ] ?? 'outline'
                                                    }
                                                >
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/modules/payslips/${item.id}/edit`}
                                                    >
                                                        Edit
                                                    </Link>
                                                </Button>
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
                        Menampilkan {from} - {to} dari {total} payslip
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
