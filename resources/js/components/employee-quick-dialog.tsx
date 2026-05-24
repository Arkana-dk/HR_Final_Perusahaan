import { router, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

type Option = {
    id: number;
    name?: string | null;
    title?: string | null;
};

type ManagerOption = {
    id: number;
    employee_code: string;
    name?: string | null;
};

type EmployeeSummary = {
    id: number;
    employee_code: string;
    employment_status: string;
    employment_type: string;
    join_date: string;
    company_id: number;
    branch_id?: number | null;
    department_id?: number | null;
    position_id?: number | null;
    job_level_id?: number | null;
    manager_id?: number | null;
    work_email?: string | null;
    work_phone?: string | null;
    office_location?: string | null;
    user: {
        name: string;
        email: string;
        role?: string | null;
    };
};

export type EmployeeQuickData = {
    employees: EmployeeSummary[];
    companies: Option[];
    branches: Option[];
    departments: Option[];
    positions: Option[];
    jobLevels: Option[];
    managers: ManagerOption[];
};

const statusLabel: Record<string, string> = {
    active: 'Aktif',
    probation: 'Probation',
    contract: 'Kontrak',
    resign: 'Resign',
    terminated: 'PHK',
};

const employmentTypeLabel: Record<string, string> = {
    permanent: 'Tetap',
    contract: 'Kontrak',
    internship: 'Magang',
    daily: 'Harian',
    freelance: 'Freelance',
};

type Panel = 'create' | 'manage' | 'edit';

const EMPTY_SELECT_VALUE = '__none__';

const normalizeOptionalSelectValue = (value: string) =>
    value === '' ? EMPTY_SELECT_VALUE : value;

export function EmployeeQuickDialog({
    role,
    data,
}: {
    role: string;
    data: EmployeeQuickData;
}) {
    const [open, setOpen] = useState(false);
    const [panel, setPanel] = useState<Panel>('create');
    const [search, setSearch] = useState('');
    const [editingEmployee, setEditingEmployee] =
        useState<EmployeeSummary | null>(null);

    const canManageRole = role === 'superadmin';
    const defaultCompanyId = data.companies[0]?.id?.toString() ?? '';

    const createForm = useForm({
        name: '',
        email: '',
        role: canManageRole ? 'employee' : 'employee',
        password: '',
        employee_code: '',
        company_id: defaultCompanyId,
        branch_id: '',
        department_id: '',
        position_id: '',
        job_level_id: '',
        manager_id: '',
        employment_status: 'active',
        employment_type: 'permanent',
        join_date: '',
        work_email: '',
        work_phone: '',
        office_location: '',
    });

    const editForm = useForm({
        name: '',
        email: '',
        role: canManageRole ? 'employee' : 'employee',
        password: '',
        employee_code: '',
        company_id: defaultCompanyId,
        branch_id: '',
        department_id: '',
        position_id: '',
        job_level_id: '',
        manager_id: '',
        employment_status: 'active',
        employment_type: 'permanent',
        join_date: '',
        work_email: '',
        work_phone: '',
        office_location: '',
    });

    useEffect(() => {
        if (!editingEmployee) return;
        editForm.setData({
            name: editingEmployee.user?.name ?? '',
            email: editingEmployee.user?.email ?? '',
            role: editingEmployee.user?.role ?? 'employee',
            password: '',
            employee_code: editingEmployee.employee_code ?? '',
            company_id: editingEmployee.company_id?.toString() ?? '',
            branch_id: editingEmployee.branch_id?.toString() ?? '',
            department_id: editingEmployee.department_id?.toString() ?? '',
            position_id: editingEmployee.position_id?.toString() ?? '',
            job_level_id: editingEmployee.job_level_id?.toString() ?? '',
            manager_id: editingEmployee.manager_id?.toString() ?? '',
            employment_status: editingEmployee.employment_status ?? 'active',
            employment_type: editingEmployee.employment_type ?? 'permanent',
            join_date: editingEmployee.join_date ?? '',
            work_email: editingEmployee.work_email ?? '',
            work_phone: editingEmployee.work_phone ?? '',
            office_location: editingEmployee.office_location ?? '',
        });
    }, [editingEmployee, editForm]);

    const filteredEmployees = useMemo(() => {
        const keyword = search.toLowerCase();
        if (!keyword) return data.employees;
        return data.employees.filter((employee) => {
            return (
                employee.employee_code.toLowerCase().includes(keyword) ||
                employee.user?.name?.toLowerCase().includes(keyword) ||
                employee.user?.email?.toLowerCase().includes(keyword)
            );
        });
    }, [data.employees, search]);

    const handleCreate = (event: FormEvent) => {
        event.preventDefault();
        createForm.post('/modules/employees?from=dashboard', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset(
                    'name',
                    'email',
                    'password',
                    'employee_code',
                    'branch_id',
                    'department_id',
                    'position_id',
                    'job_level_id',
                    'manager_id',
                    'employment_status',
                    'employment_type',
                    'join_date',
                    'work_email',
                    'work_phone',
                    'office_location',
                );
                setPanel('manage');
            },
        });
    };

    const handleEdit = (event: FormEvent) => {
        event.preventDefault();
        if (!editingEmployee) return;
        editForm.put(
            `/modules/employees/${editingEmployee.id}?from=dashboard`,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setPanel('manage');
                    setEditingEmployee(null);
                },
            },
        );
    };

    const handleDeactivate = (employee: EmployeeSummary) => {
        if (!confirm('Nonaktifkan karyawan ini?')) return;
        router.delete(`/modules/employees/${employee.id}?from=dashboard`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetState = () => {
        setPanel('create');
        setEditingEmployee(null);
        setSearch('');
        createForm.clearErrors();
        editForm.clearErrors();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                setOpen(next);
                if (!next) {
                    resetState();
                }
            }}
        >
            <DialogTrigger asChild>
                <Button>Tambah Karyawan</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Employee Quick CRUD</DialogTitle>
                    <DialogDescription>
                        Tambah, edit, atau nonaktifkan karyawan tanpa keluar
                        dari dashboard.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={panel === 'create' ? 'default' : 'outline'}
                        onClick={() => setPanel('create')}
                    >
                        Tambah Karyawan
                    </Button>
                    <Button
                        variant={panel !== 'create' ? 'default' : 'outline'}
                        onClick={() => setPanel('manage')}
                    >
                        Kelola Data
                    </Button>
                </div>

                {panel === 'create' && (
                    <form onSubmit={handleCreate} className="grid gap-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Nama</Label>
                                <Input
                                    value={createForm.data.name}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError message={createForm.errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    value={createForm.data.email}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'email',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError message={createForm.errors.email} />
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={createForm.data.password}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'password',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={createForm.errors.password}
                                />
                            </div>
                            {canManageRole ? (
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Select
                                        value={createForm.data.role}
                                        onValueChange={(value) =>
                                            createForm.setData('role', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih role" />
                                        </SelectTrigger>
                                        <SelectContent>
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
                                    <InputError
                                        message={createForm.errors.role}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <div className="rounded-md border border-border/60 px-3 py-2 text-sm">
                                        Employee
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label>Kode Karyawan</Label>
                                <Input
                                    value={createForm.data.employee_code}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'employee_code',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={createForm.errors.employee_code}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Perusahaan</Label>
                                <Select
                                    value={createForm.data.company_id}
                                    onValueChange={(value) =>
                                        createForm.setData('company_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih perusahaan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.companies.map((company) => (
                                            <SelectItem
                                                key={company.id}
                                                value={company.id.toString()}
                                            >
                                                {company.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={createForm.errors.company_id}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Status Kerja</Label>
                                <Select
                                    value={createForm.data.employment_status}
                                    onValueChange={(value) =>
                                        createForm.setData(
                                            'employment_status',
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(statusLabel).map(
                                            ([value, label]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={
                                        createForm.errors.employment_status
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tipe Kerja</Label>
                                <Select
                                    value={createForm.data.employment_type}
                                    onValueChange={(value) =>
                                        createForm.setData(
                                            'employment_type',
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(
                                            employmentTypeLabel,
                                        ).map(([value, label]) => (
                                            <SelectItem
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={createForm.errors.employment_type}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Bergabung</Label>
                                <Input
                                    type="date"
                                    value={createForm.data.join_date}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'join_date',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={createForm.errors.join_date}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Cabang</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        createForm.data.branch_id,
                                    )}
                                    onValueChange={(value) =>
                                        createForm.setData('branch_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih cabang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.branches.map((branch) => (
                                            <SelectItem
                                                key={branch.id}
                                                value={branch.id.toString()}
                                            >
                                                {branch.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Departemen</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        createForm.data.department_id,
                                    )}
                                    onValueChange={(value) =>
                                        createForm.setData(
                                            'department_id',
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih departemen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.departments.map((department) => (
                                            <SelectItem
                                                key={department.id}
                                                value={department.id.toString()}
                                            >
                                                {department.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Jabatan</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        createForm.data.position_id,
                                    )}
                                    onValueChange={(value) =>
                                        createForm.setData('position_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jabatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.positions.map((position) => (
                                            <SelectItem
                                                key={position.id}
                                                value={position.id.toString()}
                                            >
                                                {position.title ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Job Level</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        createForm.data.job_level_id,
                                    )}
                                    onValueChange={(value) =>
                                        createForm.setData(
                                            'job_level_id',
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih job level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.jobLevels.map((level) => (
                                            <SelectItem
                                                key={level.id}
                                                value={level.id.toString()}
                                            >
                                                {level.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Manager</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        createForm.data.manager_id,
                                    )}
                                    onValueChange={(value) =>
                                        createForm.setData('manager_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih manager" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.managers.map((manager) => (
                                            <SelectItem
                                                key={manager.id}
                                                value={manager.id.toString()}
                                            >
                                                {manager.employee_code} -{' '}
                                                {manager.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setPanel('manage')}
                            >
                                Lihat Data
                            </Button>
                            <Button
                                type="submit"
                                disabled={createForm.processing}
                            >
                                {createForm.processing
                                    ? 'Menyimpan...'
                                    : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                )}

                {panel === 'manage' && (
                    <div className="grid gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <Input
                                placeholder="Cari nama/email/kode"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                className="md:w-72"
                            />
                            <Badge variant="outline">
                                {filteredEmployees.length} karyawan
                            </Badge>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/60 text-xs text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Karyawan</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Tipe</th>
                                        <th className="px-4 py-3">Join</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                Tidak ada data karyawan.
                                            </td>
                                        </tr>
                                    )}
                                    {filteredEmployees.map((employee) => (
                                        <tr
                                            key={employee.id}
                                            className="border-t border-border/60"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium">
                                                    {employee.user?.name ?? '-'}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {employee.employee_code} -{' '}
                                                    {employee.user?.email ??
                                                        '-'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {statusLabel[
                                                    employee.employment_status
                                                ] ?? employee.employment_status}
                                            </td>
                                            <td className="px-4 py-3">
                                                {employmentTypeLabel[
                                                    employee.employment_type
                                                ] ?? employee.employment_type}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {employee.join_date ?? '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setEditingEmployee(
                                                                employee,
                                                            );
                                                            setPanel('edit');
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDeactivate(
                                                                employee,
                                                            )
                                                        }
                                                    >
                                                        Nonaktifkan
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {panel === 'edit' && editingEmployee && (
                    <form onSubmit={handleEdit} className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">
                                    Edit: {editingEmployee.user?.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {editingEmployee.employee_code}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setPanel('manage')}
                            >
                                Kembali
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Nama</Label>
                                <Input
                                    value={editForm.data.name}
                                    onChange={(event) =>
                                        editForm.setData(
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError message={editForm.errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    value={editForm.data.email}
                                    onChange={(event) =>
                                        editForm.setData(
                                            'email',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError message={editForm.errors.email} />
                            </div>
                            <div className="space-y-2">
                                <Label>Password (opsional)</Label>
                                <Input
                                    type="password"
                                    value={editForm.data.password}
                                    onChange={(event) =>
                                        editForm.setData(
                                            'password',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={editForm.errors.password}
                                />
                            </div>
                            {canManageRole ? (
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Select
                                        value={editForm.data.role}
                                        onValueChange={(value) =>
                                            editForm.setData('role', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih role" />
                                        </SelectTrigger>
                                        <SelectContent>
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
                                    <InputError
                                        message={editForm.errors.role}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <div className="rounded-md border border-border/60 px-3 py-2 text-sm">
                                        Employee
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label>Kode Karyawan</Label>
                                <Input
                                    value={editForm.data.employee_code}
                                    onChange={(event) =>
                                        editForm.setData(
                                            'employee_code',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={editForm.errors.employee_code}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Perusahaan</Label>
                                <Select
                                    value={editForm.data.company_id}
                                    onValueChange={(value) =>
                                        editForm.setData('company_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih perusahaan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.companies.map((company) => (
                                            <SelectItem
                                                key={company.id}
                                                value={company.id.toString()}
                                            >
                                                {company.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={editForm.errors.company_id}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Status Kerja</Label>
                                <Select
                                    value={editForm.data.employment_status}
                                    onValueChange={(value) =>
                                        editForm.setData(
                                            'employment_status',
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(statusLabel).map(
                                            ([value, label]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={editForm.errors.employment_status}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tipe Kerja</Label>
                                <Select
                                    value={editForm.data.employment_type}
                                    onValueChange={(value) =>
                                        editForm.setData(
                                            'employment_type',
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(
                                            employmentTypeLabel,
                                        ).map(([value, label]) => (
                                            <SelectItem
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={editForm.errors.employment_type}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Bergabung</Label>
                                <Input
                                    type="date"
                                    value={editForm.data.join_date}
                                    onChange={(event) =>
                                        editForm.setData(
                                            'join_date',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={editForm.errors.join_date}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Cabang</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        editForm.data.branch_id,
                                    )}
                                    onValueChange={(value) =>
                                        editForm.setData('branch_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih cabang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.branches.map((branch) => (
                                            <SelectItem
                                                key={branch.id}
                                                value={branch.id.toString()}
                                            >
                                                {branch.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Departemen</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        editForm.data.department_id,
                                    )}
                                    onValueChange={(value) =>
                                        editForm.setData('department_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih departemen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.departments.map((department) => (
                                            <SelectItem
                                                key={department.id}
                                                value={department.id.toString()}
                                            >
                                                {department.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Jabatan</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        editForm.data.position_id,
                                    )}
                                    onValueChange={(value) =>
                                        editForm.setData('position_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jabatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.positions.map((position) => (
                                            <SelectItem
                                                key={position.id}
                                                value={position.id.toString()}
                                            >
                                                {position.title ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Job Level</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        editForm.data.job_level_id,
                                    )}
                                    onValueChange={(value) =>
                                        editForm.setData('job_level_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih job level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.jobLevels.map((level) => (
                                            <SelectItem
                                                key={level.id}
                                                value={level.id.toString()}
                                            >
                                                {level.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Manager</Label>
                                <Select
                                    value={normalizeOptionalSelectValue(
                                        editForm.data.manager_id,
                                    )}
                                    onValueChange={(value) =>
                                        editForm.setData('manager_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih manager" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={EMPTY_SELECT_VALUE}>
                                            -
                                        </SelectItem>
                                        {data.managers.map((manager) => (
                                            <SelectItem
                                                key={manager.id}
                                                value={manager.id.toString()}
                                            >
                                                {manager.employee_code} -{' '}
                                                {manager.name ?? '-'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Email Kantor</Label>
                                <Input
                                    value={editForm.data.work_email}
                                    onChange={(event) =>
                                        editForm.setData(
                                            'work_email',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={editForm.errors.work_email}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Telepon Kantor</Label>
                                <Input
                                    value={editForm.data.work_phone}
                                    onChange={(event) =>
                                        editForm.setData(
                                            'work_phone',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={editForm.errors.work_phone}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Lokasi Kantor</Label>
                                <Input
                                    value={editForm.data.office_location}
                                    onChange={(event) =>
                                        editForm.setData(
                                            'office_location',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={editForm.errors.office_location}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setPanel('manage')}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={editForm.processing}
                            >
                                {editForm.processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
