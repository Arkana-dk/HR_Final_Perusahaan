import { Head, Link, usePage } from '@inertiajs/react';
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

type EmployeeDashboardProps = {
    summary: {
        attendance_present: number;
        attendance_expected: number;
        late_count: number;
        pending_requests: number;
        annual_leave_remaining: number;
        latest_payslip: {
            net_salary: number;
            period: string | null;
        } | null;
    };
    attendanceWeekly: {
        week: string;
        hadir: number;
        terlambat: number;
    }[];
    leaveBalance: {
        type: string;
        value: number;
    }[];
    upcoming: {
        title: string;
        desc: string;
        status: string;
    }[];
    reminders: string[];
};

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
    const { summary, attendanceWeekly, leaveBalance, upcoming, reminders } =
        usePage<EmployeeDashboardProps>().props;

    const attendancePercent =
        summary.attendance_expected > 0
            ? Math.round(
                  (summary.attendance_present / summary.attendance_expected) *
                      100,
              )
            : 0;

    const latestPayslipLabel = summary.latest_payslip
        ? `Rp ${new Intl.NumberFormat('id-ID').format(
              summary.latest_payslip.net_salary,
          )}`
        : '-';

    const metrics = [
        {
            label: 'Hadir Bulan Ini',
            value: `${summary.attendance_present} / ${summary.attendance_expected}`,
            delta: `${attendancePercent}%`,
            note: `Terlambat ${summary.late_count} hari`,
            tone: 'success' as const,
            icon: UserCheck,
        },
        {
            label: 'Sisa Cuti Tahunan',
            value: `${summary.annual_leave_remaining} Hari`,
            delta: 'Sisa kuota',
            note: 'Berdasarkan saldo cuti tahun berjalan',
            tone: 'teal' as const,
            icon: CalendarDays,
        },
        {
            label: 'Pengajuan Pending',
            value: summary.pending_requests.toString(),
            delta: 'Butuh tindak lanjut',
            note: 'Termasuk cuti, lembur, dan reimburse',
            tone: 'amber' as const,
            icon: ClipboardCheck,
        },
        {
            label: 'Gaji Terakhir',
            value: latestPayslipLabel,
            delta: summary.latest_payslip?.period ?? '-',
            note: summary.latest_payslip
                ? 'Slip tersedia'
                : 'Belum ada slip gaji tersedia',
            tone: 'primary' as const,
            icon: Wallet,
        },
    ];

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
                                <LineChart data={attendanceWeekly}>
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
                            {upcoming.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-border/60 px-3 py-6 text-sm text-muted-foreground">
                                    Belum ada jadwal mendatang.
                                </div>
                            ) : (
                                upcoming.map((itemData, index) => (
                                    <div
                                        key={`${itemData.title}-${index}`}
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
                                ))
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengingat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            {reminders.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-border/60 px-3 py-6">
                                    Tidak ada pengingat untuk saat ini.
                                </div>
                            ) : (
                                reminders.map((reminder, index) => (
                                    <div
                                        key={`${reminder}-${index}`}
                                        className="rounded-lg border border-border/60 px-3 py-2"
                                    >
                                        {reminder}
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
