import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Bell,
    ClipboardCheck,
    ShieldCheck,
    UserCheck,
    Users,
    Wallet,
} from 'lucide-react';
import { useMemo, useState } from 'react';
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
import {
    EmployeeQuickDialog,
    type EmployeeQuickData,
} from '@/components/employee-quick-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

const metrics = [
    {
        label: 'Total Karyawan',
        value: '1.246',
        delta: '+3.2% MoM',
        note: 'Aktif 98% bulan ini',
        tone: 'primary',
        icon: Users,
    },
    {
        label: 'Aktif Hari Ini',
        value: '1.103',
        delta: '+1.1%',
        note: 'Rata-rata on-time 94%',
        tone: 'success',
        icon: UserCheck,
    },
    {
        label: 'Approval Pending',
        value: '18',
        delta: '-6 vs kemarin',
        note: 'SLA rata-rata 4 jam',
        tone: 'amber',
        icon: ClipboardCheck,
    },
    {
        label: 'Payroll Estimasi',
        value: 'Rp 1.86B',
        delta: '+2.4%',
        note: 'Draft periode Feb 2026',
        tone: 'teal',
        icon: Wallet,
    },
] as const;

const headcountData = [
    { month: 'Sep', total: 1088 },
    { month: 'Oct', total: 1123 },
    { month: 'Nov', total: 1150 },
    { month: 'Dec', total: 1186 },
    { month: 'Jan', total: 1210 },
    { month: 'Feb', total: 1246 },
];

const attendanceData = [
    { name: 'Hadir', value: 1103 },
    { name: 'Terlambat', value: 32 },
    { name: 'Izin', value: 46 },
    { name: 'Alpha', value: 12 },
];

const approvals = [
    { title: 'Pengajuan Cuti', count: 8, sla: 'Hari ini' },
    { title: 'Lembur', count: 5, sla: 'Besok' },
    { title: 'Reimburse', count: 3, sla: '2 hari' },
    { title: 'Mutasi Internal', count: 2, sla: 'Minggu ini' },
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

const exportOptions = [
    { id: 'headcount', label: 'Headcount 6 Bulan' },
    { id: 'attendance', label: 'Distribusi Kehadiran' },
    { id: 'approvals', label: 'Queue Approval' },
];

type PageProps = {
    employeeQuick: EmployeeQuickData;
    auth?: {
        user?: {
            role?: string | null;
        } | null;
    } | null;
};

const toCsv = (rows: Array<Record<string, string | number>>) => {
    if (rows.length === 0) return '';
    const headers = Object.keys(rows[0]);
    const escape = (value: string | number) =>
        `"${String(value).replace(/"/g, '""')}"`;
    const lines = [
        headers.map(escape).join(','),
        ...rows.map((row) =>
            headers.map((key) => escape(row[key] ?? '')).join(','),
        ),
    ];
    return lines.join('\n');
};

const downloadCsv = (
    filename: string,
    rows: Array<Record<string, string | number>>,
) => {
    const csv = toCsv(rows);
    if (!csv) return;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
};

export default function SuperAdminDashboard() {
    const { employeeQuick, auth } = usePage<PageProps>().props;
    const role = auth?.user?.role ?? 'employee';

    const [exportType, setExportType] = useState('headcount');
    const [exportFrom, setExportFrom] = useState('');
    const [exportTo, setExportTo] = useState('');

    const exportRows = useMemo(() => {
        if (exportType === 'attendance') {
            return attendanceData.map((item) => ({
                kategori: item.name,
                total: item.value,
            }));
        }

        if (exportType === 'approvals') {
            return approvals.map((item) => ({
                approval: item.title,
                jumlah: item.count,
                sla: item.sla,
            }));
        }

        return headcountData.map((item) => ({
            bulan: item.month,
            total: item.total,
        }));
    }, [exportType]);

    return (
        <AppLayout>
            <Head title="Super Admin Dashboard" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/40 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary">
                                    Sistem Operasional Normal
                                </Badge>
                                <Badge variant="outline">
                                    Update terakhir 09:42
                                </Badge>
                            </div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Super Admin Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Pantau kesehatan organisasi, approval kritis,
                                dan kesiapan payroll secara real-time.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <EmployeeQuickDialog
                                role={role}
                                data={employeeQuick}
                            />

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        Ekspor Laporan
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-xl">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Ekspor Laporan
                                        </DialogTitle>
                                        <DialogDescription>
                                            Pilih laporan yang ingin diunduh
                                            dalam format CSV.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label>Jenis Laporan</Label>
                                            <Select
                                                value={exportType}
                                                onValueChange={setExportType}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih laporan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {exportOptions.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={option.id}
                                                                value={
                                                                    option.id
                                                                }
                                                            >
                                                                {option.label}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label>Dari Tanggal</Label>
                                                <Input
                                                    type="date"
                                                    value={exportFrom}
                                                    onChange={(event) =>
                                                        setExportFrom(
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Sampai Tanggal</Label>
                                                <Input
                                                    type="date"
                                                    value={exportTo}
                                                    onChange={(event) =>
                                                        setExportTo(
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="rounded-lg border border-border/60 px-3 py-2 text-xs text-muted-foreground">
                                            Data yang diekspor saat ini
                                            menggunakan sample dashboard.
                                        </div>
                                        <Button
                                            onClick={() => {
                                                const suffix =
                                                    exportType ?? 'report';
                                                downloadCsv(
                                                    `report-${suffix}.csv`,
                                                    exportRows,
                                                );
                                            }}
                                        >
                                            Unduh CSV
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">
                                        Audit Akses
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-xl">
                                    <DialogHeader>
                                        <DialogTitle>Audit Akses</DialogTitle>
                                        <DialogDescription>
                                            Review aktivitas kritikal, login
                                            admin, dan event keamanan.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label>Dari Tanggal</Label>
                                                <Input type="date" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Sampai Tanggal</Label>
                                                <Input type="date" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Level Akses</Label>
                                            <Select defaultValue="all">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        Semua Level
                                                    </SelectItem>
                                                    <SelectItem value="superadmin">
                                                        Superadmin
                                                    </SelectItem>
                                                    <SelectItem value="admin">
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value="employee">
                                                        Employee
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="rounded-lg border border-border/60 px-3 py-2 text-xs text-muted-foreground">
                                            Audit log tersedia di modul Audit
                                            Logs untuk superadmin.
                                        </div>
                                        <Button asChild>
                                            <Link href="/modules/audit-logs">
                                                Buka Audit Logs
                                            </Link>
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
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
                            <CardTitle>Headcount 6 Bulan Terakhir</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={headcountData}>
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
                                <BarChart data={attendanceData}>
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
                                        {attendanceData.map((entry, index) => (
                                            <Cell
                                                key={`${entry.name}-${index}`}
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
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Queue Approval</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {approvals.map((itemData) => (
                                <div
                                    key={itemData.title}
                                    className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            {itemData.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            SLA: {itemData.sla}
                                        </p>
                                    </div>
                                    <Badge variant="secondary">
                                        {itemData.count} item
                                    </Badge>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                className="w-full"
                                asChild
                            >
                                <Link href="/modules/leave-requests">
                                    Lihat Semua Approval
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                            <CardTitle>Keamanan Sistem</CardTitle>
                            <ShieldCheck className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    2FA Admin Aktif
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    92% dari akun admin aktif.
                                </p>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div className="h-full w-[92%] rounded-full bg-chart-2" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    Akses Tak Biasa
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    3 event perlu review hari ini.
                                </p>
                                <Button variant="secondary" size="sm" asChild>
                                    <Link href="/modules/audit-logs">
                                        Lihat Audit
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                            <CardTitle>Notifikasi Kritis</CardTitle>
                            <Bell className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            <div className="rounded-lg border border-border/60 px-3 py-2">
                                Kontrak 6 karyawan berakhir dalam 30 hari.
                            </div>
                            <div className="rounded-lg border border-border/60 px-3 py-2">
                                2 departemen melewati batas lembur bulanan.
                            </div>
                            <div className="rounded-lg border border-border/60 px-3 py-2">
                                Payroll draft siap direview.
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
