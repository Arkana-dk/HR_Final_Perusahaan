import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    EmployeeQuickDialog,
    type EmployeeQuickData,
} from '@/components/employee-quick-dialog';
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
import { cn } from '@/lib/utils';

const ALL_OPTION_VALUE = 'all';

type Department = {
    id: number;
    name: string;
};

type EmployeeRow = {
    id: number;
    employee_code: string;
    employment_status: string;
    employment_type: string;
    join_date: string;
    work_email: string | null;
    user: {
        name: string;
        email: string;
    };
    department?: {
        id: number;
        name: string;
    } | null;
    position?: {
        id: number;
        title: string;
    } | null;
    job_level?: {
        id: number;
        name: string;
    } | null;
    branch?: {
        id: number;
        name: string;
    } | null;
    manager?: {
        id: number;
        user?: {
            name: string;
        } | null;
    } | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    employees: {
        data: EmployeeRow[];
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
        department: string;
    };
    stats: {
        total: number;
        active: number;
        contract: number;
        probation: number;
    };
    departments: Department[];
    employeeQuick: EmployeeQuickData;
    auth?: {
        user?: {
            role?: string | null;
        } | null;
    } | null;
};

const statusLabel: Record<string, string> = {
    active: 'Aktif',
    probation: 'Probation',
    contract: 'Kontrak',
    resign: 'Resign',
    terminated: 'PHK',
};

const statusVariant: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    active: 'default',
    probation: 'secondary',
    contract: 'outline',
    resign: 'destructive',
    terminated: 'destructive',
};

const employmentTypeLabel: Record<string, string> = {
    permanent: 'Tetap',
    contract: 'Kontrak',
    internship: 'Magang',
    daily: 'Harian',
    freelance: 'Freelance',
};

const formatDate = (value?: string | null) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

export default function EmployeeIndex() {
    const { employees, filters, stats, departments, employeeQuick, auth } =
        usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status || ALL_OPTION_VALUE);
    const [department, setDepartment] = useState(
        filters.department || ALL_OPTION_VALUE,
    );

    const applyFilters = (next?: {
        search?: string;
        status?: string;
        department?: string;
    }) => {
        const nextStatus = next?.status ?? status;
        const nextDepartment = next?.department ?? department;

        router.get(
            '/modules/employees',
            {
                search: next?.search ?? search,
                status: nextStatus === ALL_OPTION_VALUE ? '' : nextStatus,
                department:
                    nextDepartment === ALL_OPTION_VALUE ? '' : nextDepartment,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const pagination = employees.links ?? [];
    const prevLink = pagination[0];
    const nextLink = pagination[pagination.length - 1];
    const from = employees.meta?.from ?? employees.from ?? 0;
    const to = employees.meta?.to ?? employees.to ?? 0;
    const total = employees.meta?.total ?? employees.total ?? 0;
    const rows = employees.data ?? [];

    const currentFilters = useMemo(
        () => ({
            search,
            status,
            department,
        }),
        [search, status, department],
    );

    return (
        <AppLayout>
            <Head title="Employee Master" />

            <div className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">Master Data</Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Employee Master
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola profil, struktur, kontrak, dan status
                                kerja karyawan secara terpusat.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <EmployeeQuickDialog
                                role={auth?.user?.role ?? 'employee'}
                                data={employeeQuick}
                            />
                            <Button variant="outline">Import dari Excel</Button>
                            <Button variant="secondary">Export Laporan</Button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Karyawan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.total}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Seluruh status
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Aktif</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.active}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Status aktif
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Kontrak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.contract}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Karyawan kontrak
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Probation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.probation}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Masa percobaan
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <CardTitle>Daftar Karyawan</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {from} - {to} dari {total} karyawan
                            </p>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
                            <Input
                                placeholder="Cari nama, email, atau NIK karyawan"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        applyFilters({ search });
                                    }
                                }}
                                className="md:w-72"
                            />
                            <Select
                                value={department}
                                onValueChange={(value) => {
                                    setDepartment(value);
                                    applyFilters({ department: value });
                                }}
                            >
                                <SelectTrigger className="md:w-52">
                                    <SelectValue placeholder="Semua Departemen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={ALL_OPTION_VALUE}>
                                        Semua Departemen
                                    </SelectItem>
                                    {departments.map((item) => (
                                        <SelectItem
                                            key={item.id}
                                            value={String(item.id)}
                                        >
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={status}
                                onValueChange={(value) => {
                                    setStatus(value);
                                    applyFilters({ status: value });
                                }}
                            >
                                <SelectTrigger className="md:w-44">
                                    <SelectValue placeholder="Semua Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={ALL_OPTION_VALUE}>
                                        Semua Status
                                    </SelectItem>
                                    {Object.entries(statusLabel).map(
                                        ([key, label]) => (
                                            <SelectItem key={key} value={key}>
                                                {label}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearch('');
                                    setStatus(ALL_OPTION_VALUE);
                                    setDepartment(ALL_OPTION_VALUE);
                                    applyFilters({
                                        search: '',
                                        status: ALL_OPTION_VALUE,
                                        department: ALL_OPTION_VALUE,
                                    });
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Karyawan</th>
                                        <th className="px-4 py-3">Unit</th>
                                        <th className="px-4 py-3">Jabatan</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Tipe</th>
                                        <th className="px-4 py-3">Join</th>
                                        <th className="px-4 py-3">Manager</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((employee) => (
                                        <tr
                                            key={employee.id}
                                            className="border-t border-border/60 hover:bg-muted/40"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <Link
                                                        href={`/modules/employees/${employee.id}`}
                                                        className="font-medium text-foreground hover:underline"
                                                    >
                                                        {employee.user?.name}
                                                    </Link>
                                                    <span className="text-xs text-muted-foreground">
                                                        {employee.employee_code}{' '}
                                                        · {employee.user?.email}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-xs text-muted-foreground">
                                                    {employee.branch?.name ??
                                                        '-'}
                                                </div>
                                                <div className="text-sm">
                                                    {employee.department
                                                        ?.name ?? '-'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-sm">
                                                    {employee.position?.title ??
                                                        '-'}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {employee.job_level?.name ??
                                                        '-'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        statusVariant[
                                                            employee
                                                                .employment_status
                                                        ] ?? 'outline'
                                                    }
                                                >
                                                    {statusLabel[
                                                        employee
                                                            .employment_status
                                                    ] ??
                                                        employee.employment_status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm">
                                                    {employmentTypeLabel[
                                                        employee.employment_type
                                                    ] ??
                                                        employee.employment_type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {formatDate(employee.join_date)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-muted-foreground">
                                                {employee.manager?.user?.name ??
                                                    '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    {rows.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                Tidak ada data karyawan untuk
                                                filter saat ini.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <p className="text-xs text-muted-foreground">
                                Menampilkan {from} - {to} dari {total} data.
                            </p>
                            <div className="flex items-center gap-2">
                                {prevLink?.url ? (
                                    <Button
                                        variant="outline"
                                        asChild
                                        className={cn('px-3')}
                                    >
                                        <Link href={prevLink.url}>Prev</Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" disabled>
                                        Prev
                                    </Button>
                                )}
                                {nextLink?.url ? (
                                    <Button
                                        variant="outline"
                                        asChild
                                        className={cn('px-3')}
                                    >
                                        <Link href={nextLink.url}>Next</Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" disabled>
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                        <input
                            type="hidden"
                            name="filters"
                            value={JSON.stringify(currentFilters)}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
