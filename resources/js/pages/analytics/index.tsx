import { Head, usePage } from '@inertiajs/react';
import { ClipboardCheck, Users, UserCheck, Wallet } from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { MetricCard } from '@/components/dashboard/metric-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

type HeadcountTrendItem = {
    month: string;
    total: number;
};

type DepartmentItem = {
    name: string;
    total: number;
};

type AttendanceSummaryItem = {
    name: string;
    value: number;
};

type AttendanceTrendItem = {
    date: string;
    present: number;
    late: number;
};

type PayrollTrendItem = {
    period: string;
    net: number;
};

type PageProps = {
    headcount: {
        total: number;
        active: number;
        trend: HeadcountTrendItem[];
        departments: DepartmentItem[];
    };
    attendance: {
        summary: AttendanceSummaryItem[];
        trend: AttendanceTrendItem[];
        rate: number;
    };
    payroll: {
        latest: {
            name: string;
            range: string;
            gross: number;
            deductions: number;
            net: number;
            count: number;
        } | null;
        trend: PayrollTrendItem[];
    };
};

const chartColors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
];

const tooltipStyle = {
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    borderRadius: 12,
    color: 'var(--foreground)',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
};

const formatNumber = (value: number) =>
    new Intl.NumberFormat('id-ID').format(value);

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);

export default function AnalyticsIndex() {
    const { headcount, attendance, payroll } = usePage<PageProps>().props;
    const lateCount =
        attendance.summary.find((item) => item.name === 'Terlambat')?.value ??
        0;

    const metrics = [
        {
            label: 'Total Karyawan',
            value: formatNumber(headcount.total),
            note: `Aktif ${formatNumber(headcount.active)} karyawan`,
            tone: 'primary',
            icon: Users,
        },
        {
            label: 'Aktif Bulan Ini',
            value: `${attendance.rate}%`,
            note: 'Rate hadir + late (30 hari)',
            tone: 'success',
            icon: UserCheck,
        },
        {
            label: 'Terlambat',
            value: formatNumber(lateCount),
            note: 'Total keterlambatan (30 hari)',
            tone: 'amber',
            icon: ClipboardCheck,
        },
        {
            label: 'Payroll Terakhir',
            value: payroll.latest
                ? formatCurrency(payroll.latest.net)
                : 'Belum ada',
            note: payroll.latest
                ? `${payroll.latest.count} payslip`
                : 'Tambahkan periode payroll',
            tone: 'teal',
            icon: Wallet,
        },
    ] as const;

    return (
        <AppLayout>
            <Head title="Analytics" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Analytics</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                HR Analytics Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Ringkasan headcount, absensi, dan payroll
                                terbaru untuk pengambilan keputusan.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {metrics.map((metric) => (
                        <MetricCard key={metric.label} {...metric} />
                    ))}
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Headcount 6 Bulan Terakhir</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={headcount.trend}>
                                    <defs>
                                        <linearGradient
                                            id="headcountFill"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="var(--chart-1)"
                                                stopOpacity={0.35}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="var(--chart-1)"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                    />
                                    <XAxis
                                        dataKey="month"
                                        tick={{
                                            fill: 'var(--muted-foreground)',
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: 'var(--muted-foreground)',
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="var(--chart-1)"
                                        fill="url(#headcountFill)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Distribusi Kehadiran</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={attendance.summary}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="name"
                                        tick={{
                                            fill: 'var(--muted-foreground)',
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: 'var(--muted-foreground)',
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                        {attendance.summary.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={`${entry.name}-${index}`}
                                                    fill={
                                                        chartColors[
                                                            index %
                                                                chartColors.length
                                                        ]
                                                    }
                                                />
                                            ),
                                        )}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Trend Kehadiran (7 Hari)</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={attendance.trend}>
                                    <defs>
                                        <linearGradient
                                            id="presentFill"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="var(--chart-2)"
                                                stopOpacity={0.35}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="var(--chart-2)"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tick={{
                                            fill: 'var(--muted-foreground)',
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: 'var(--muted-foreground)',
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Area
                                        type="monotone"
                                        dataKey="present"
                                        stroke="var(--chart-2)"
                                        fill="url(#presentFill)"
                                        strokeWidth={2}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="late"
                                        stroke="var(--chart-3)"
                                        fill="transparent"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Departemen</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            {headcount.departments.length === 0 && (
                                <div className="rounded-lg border border-border/60 px-3 py-2">
                                    Belum ada data departemen.
                                </div>
                            )}
                            {headcount.departments.map((department) => (
                                <div
                                    key={department.name}
                                    className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2"
                                >
                                    <span>{department.name}</span>
                                    <Badge variant="secondary">
                                        {formatNumber(department.total)}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Net Payroll per Periode</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={payroll.trend}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="period"
                                        tick={{
                                            fill: 'var(--muted-foreground)',
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: 'var(--muted-foreground)',
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Bar dataKey="net" radius={[6, 6, 0, 0]}>
                                        {payroll.trend.map((entry, index) => (
                                            <Cell
                                                key={`${entry.period}-${index}`}
                                                fill={
                                                    chartColors[
                                                        index %
                                                            chartColors.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan Payroll</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            {payroll.latest ? (
                                <>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-foreground">
                                            {payroll.latest.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {payroll.latest.range}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-border/60 px-3 py-2">
                                        <p className="text-xs text-muted-foreground">
                                            Gross Salary
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            {formatCurrency(
                                                payroll.latest.gross,
                                            )}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-border/60 px-3 py-2">
                                        <p className="text-xs text-muted-foreground">
                                            Total Deductions
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            {formatCurrency(
                                                payroll.latest.deductions,
                                            )}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-border/60 px-3 py-2">
                                        <p className="text-xs text-muted-foreground">
                                            Net Salary
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            {formatCurrency(payroll.latest.net)}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="rounded-lg border border-border/60 px-3 py-2">
                                    Belum ada data payroll.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
