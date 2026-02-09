import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    CalendarCheck,
    ClipboardList,
    UserCheck,
    Users,
    Wallet,
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { MetricCard } from '@/components/dashboard/metric-card';
import {
    EmployeeQuickDialog,
    type EmployeeQuickData,
} from '@/components/employee-quick-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

const metrics = [
    {
        label: 'Karyawan Aktif',
        value: '452',
        delta: '+2.1%',
        note: '4 departemen utama',
        tone: 'primary',
        icon: Users,
    },
    {
        label: 'Absensi Bermasalah',
        value: '14',
        delta: '-3 hari ini',
        note: 'Keterlambatan & alpha',
        tone: 'danger',
        icon: UserCheck,
    },
    {
        label: 'Pengajuan Cuti',
        value: '12',
        delta: '+4 hari ini',
        note: 'SLA rata-rata 6 jam',
        tone: 'amber',
        icon: ClipboardList,
    },
    {
        label: 'Payroll Draft',
        value: 'Rp 742M',
        delta: '93% selesai',
        note: 'Periode Feb 2026',
        tone: 'teal',
        icon: Wallet,
    },
] as const;

const attendanceTrend = [
    { month: 'Sep', hadir: 95, terlambat: 3 },
    { month: 'Oct', hadir: 94, terlambat: 4 },
    { month: 'Nov', hadir: 96, terlambat: 3 },
    { month: 'Dec', hadir: 93, terlambat: 5 },
    { month: 'Jan', hadir: 95, terlambat: 4 },
    { month: 'Feb', hadir: 96, terlambat: 3 },
];

const leaveUsage = [
    { type: 'Tahunan', value: 62 },
    { type: 'Sakit', value: 18 },
    { type: 'Izin', value: 12 },
    { type: 'Lainnya', value: 8 },
];

const scheduleAlerts = [
    '10 karyawan belum check-in sampai pukul 09:30.',
    'Shift malam hari ini kekurangan 2 personel.',
    'Lembur di departemen IT melebihi 12 jam/minggu.',
];

const chartColors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const tooltipStyle = {
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    borderRadius: 12,
    color: 'var(--foreground)',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
};

export default function AdminDashboard() {
    const { employeeQuick } = usePage<{
        employeeQuick: EmployeeQuickData;
    }>().props;

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-secondary/70 via-transparent to-primary/10 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary">
                                    HR Operasional Hari Ini
                                </Badge>
                                <Badge variant="outline">
                                    Update 09:42
                                </Badge>
                            </div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola absensi, cuti, dan payroll dengan kontrol
                                penuh terhadap tim HR.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <EmployeeQuickDialog role="admin" data={employeeQuick} />
                            <Button variant="outline" asChild>
                                <Link href="/modules/attendance">
                                    Import Absensi
                                </Link>
                            </Button>
                            <Button variant="secondary" asChild>
                                <Link href="/modules/analytics">
                                    Review Payroll
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <motion.section
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
                >
                    {metrics.map((metric) => (
                        <motion.div key={metric.label} variants={item}>
                            <MetricCard {...metric} />
                        </motion.div>
                    ))}
                </motion.section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Tren Kehadiran</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={attendanceTrend}>
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
                                    <Line
                                        type="monotone"
                                        dataKey="hadir"
                                        stroke="var(--chart-1)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="terlambat"
                                        stroke="var(--chart-3)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Utilisasi Cuti</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={leaveUsage}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="type"
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
                                        {leaveUsage.map((entry, index) => (
                                            <Cell
                                                key={`${entry.type}-${index}`}
                                                fill={
                                                    chartColors[
                                                        index % chartColors.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                            <CardTitle>Agenda Hari Ini</CardTitle>
                            <CalendarCheck className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2">
                                <div>
                                    <p className="text-sm font-medium">
                                        Approval Cuti Departemen Finance
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        3 permintaan, target 13:00
                                    </p>
                                </div>
                                <Badge variant="secondary">Prioritas</Badge>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2">
                                <div>
                                    <p className="text-sm font-medium">
                                        Finalisasi Payroll
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Review komponen lembur & bonus
                                    </p>
                                </div>
                                <Badge variant="outline">Hari ini</Badge>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2">
                                <div>
                                    <p className="text-sm font-medium">
                                        Meeting Headcount Planning
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        15:00 - 16:00
                                    </p>
                                </div>
                                <Badge variant="outline">Terdekat</Badge>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Alert Operasional</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            {scheduleAlerts.map((alert) => (
                                <div
                                    key={alert}
                                    className="rounded-lg border border-border/60 px-3 py-2"
                                >
                                    {alert}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
