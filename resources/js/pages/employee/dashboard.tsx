import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CalendarDays, ClipboardCheck, UserCheck, Wallet } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { MetricCard } from '@/components/dashboard/metric-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

const metrics = [
    {
        label: 'Hadir Bulan Ini',
        value: '18 / 22',
        delta: '82%',
        note: 'Terlambat 1 hari',
        tone: 'success',
        icon: UserCheck,
    },
    {
        label: 'Sisa Cuti Tahunan',
        value: '7 Hari',
        delta: 'Reset Jul 2026',
        note: 'Berlaku 6 bulan',
        tone: 'teal',
        icon: CalendarDays,
    },
    {
        label: 'Pengajuan Pending',
        value: '1',
        delta: 'Cuti 2 hari',
        note: 'SLA 1 hari kerja',
        tone: 'amber',
        icon: ClipboardCheck,
    },
    {
        label: 'Gaji Terakhir',
        value: 'Rp 8.4M',
        delta: 'Feb 2026',
        note: 'Slip tersedia',
        tone: 'primary',
        icon: Wallet,
    },
] as const;

const attendanceData = [
    { week: 'W1', hadir: 5, terlambat: 0 },
    { week: 'W2', hadir: 4, terlambat: 1 },
    { week: 'W3', hadir: 5, terlambat: 0 },
    { week: 'W4', hadir: 4, terlambat: 0 },
];

const leaveBalance = [
    { type: 'Tahunan', value: 7 },
    { type: 'Sakit', value: 3 },
    { type: 'Izin', value: 2 },
];

const upcoming = [
    {
        title: 'Shift Pagi',
        desc: 'Senin, 07:30 - 16:30',
        status: 'Besok',
    },
    {
        title: 'Briefing Tim',
        desc: 'Rabu, 09:00 - 10:00',
        status: 'Terdekat',
    },
    {
        title: 'Payroll Preview',
        desc: 'Kamis, 15:00',
        status: 'Info',
    },
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

export default function EmployeeDashboard() {
    return (
        <AppLayout>
            <Head title="Employee Dashboard" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Ringkasan Pribadi</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Employee Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Cek kehadiran, cuti, dan slip gaji Anda dari
                                sini.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button asChild>
                                <Link href="/employee/leave-requests">
                                    Ajukan Cuti
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="/employee/payslips/latest/download">
                                    Unduh Slip
                                </a>
                            </Button>
                            <Button variant="secondary" asChild>
                                <Link href="/employee/attendance">
                                    Check-In Cepat
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
                            <CardTitle>Attendance Mingguan</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={attendanceData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                    />
                                    <XAxis
                                        dataKey="week"
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
                            <CardTitle>Saldo Cuti</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={leaveBalance}>
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
                                    <Bar
                                        dataKey="value"
                                        radius={[6, 6, 0, 0]}
                                        fill="var(--chart-2)"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Jadwal Terdekat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcoming.map((itemData) => (
                                <div
                                    key={itemData.title}
                                    className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            {itemData.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {itemData.desc}
                                        </p>
                                    </div>
                                    <Badge variant="outline">
                                        {itemData.status}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengingat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            <div className="rounded-lg border border-border/60 px-3 py-2">
                                Unggah bukti medical untuk cuti sakit terakhir.
                            </div>
                            <div className="rounded-lg border border-border/60 px-3 py-2">
                                Review slip gaji Februari tersedia.
                            </div>
                            <div className="rounded-lg border border-border/60 px-3 py-2">
                                Pastikan update nomor rekening sebelum payroll.
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
