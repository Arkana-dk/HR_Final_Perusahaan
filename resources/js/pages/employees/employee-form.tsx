import { Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

type Option = {
    id: number;
    name?: string;
    title?: string;
};

type ManagerOption = {
    id: number;
    employee_code: string;
    user: {
        name: string;
    } | null;
};

type EmployeeDetail = {
    id: number;
    employee_code: string;
    employment_status: string;
    employment_type: string;
    join_date: string;
    confirmation_date?: string | null;
    resign_date?: string | null;
    work_email?: string | null;
    work_phone?: string | null;
    office_location?: string | null;
    user: {
        name: string;
        email: string;
        role?: string | null;
    };
    company?: Option | null;
    branch?: Option | null;
    department?: Option | null;
    position?: Option | null;
    job_level?: Option | null;
    manager?: ManagerOption | null;
    profile?: Record<string, string | null> | null;
    documents?: Array<{
        id: number;
        type: string;
        number?: string | null;
        issued_at?: string | null;
        expires_at?: string | null;
        file_path?: string | null;
    }>;
};

type FormOptions = {
    companies: Option[];
    branches: Option[];
    departments: Option[];
    positions: Option[];
    jobLevels: Option[];
    managers: ManagerOption[];
};

type DocumentInput = {
    type: string;
    number: string;
    issued_at: string;
    expires_at: string;
    file: File | null;
};

type EmployeeFormProps = {
    mode: 'create' | 'edit';
    employee?: EmployeeDetail;
    options: FormOptions;
};

type PageProps = {
    auth?: {
        user?: {
            role?: string | null;
        } | null;
    } | null;
};

const roles = [
    { value: 'superadmin', label: 'Super Admin' },
    { value: 'admin', label: 'Admin HR' },
    { value: 'employee', label: 'Employee' },
];

const statuses = [
    { value: 'active', label: 'Aktif' },
    { value: 'probation', label: 'Probation' },
    { value: 'contract', label: 'Kontrak' },
    { value: 'resign', label: 'Resign' },
    { value: 'terminated', label: 'PHK' },
];

const employmentTypes = [
    { value: 'permanent', label: 'Tetap' },
    { value: 'contract', label: 'Kontrak' },
    { value: 'internship', label: 'Magang' },
    { value: 'daily', label: 'Harian' },
    { value: 'freelance', label: 'Freelance' },
];

const genders = [
    { value: 'male', label: 'Laki-laki' },
    { value: 'female', label: 'Perempuan' },
    { value: 'other', label: 'Lainnya' },
];

const maritalStatuses = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Menikah' },
    { value: 'divorced', label: 'Cerai' },
    { value: 'widowed', label: 'Janda/Duda' },
];

const today = new Date().toISOString().slice(0, 10);
const EMPTY_OPTION_VALUE = '__none__';

const wizardSteps = [
    { id: 1, title: 'Akun & Pekerjaan' },
    { id: 2, title: 'Struktur & Kontak' },
    { id: 3, title: 'Profil & Alamat' },
    { id: 4, title: 'Payroll & Dokumen' },
];

export default function EmployeeForm({
    mode,
    employee,
    options,
}: EmployeeFormProps) {
    const { auth } = usePage<PageProps>().props;
    const currentRole = auth?.user?.role ?? 'employee';
    const canManageRoles = currentRole === 'superadmin';
    const defaultCompanyId =
        employee?.company?.id?.toString() ??
        options.companies[0]?.id?.toString() ??
        '';
    const [step, setStep] = useState(1);
    const totalSteps = wizardSteps.length;

    const goNext = () =>
        setStep((current) => Math.min(totalSteps, current + 1));
    const goPrev = () => setStep((current) => Math.max(1, current - 1));

    const [firstDoc] = useMemo<DocumentInput[]>(
        () => [
            {
                type: 'KTP',
                number: '',
                issued_at: '',
                expires_at: '',
                file: null,
            },
        ],
        [],
    );

    const { data, setData, post, put, processing, errors } = useForm({
        name: employee?.user?.name ?? '',
        email: employee?.user?.email ?? '',
        role: canManageRoles ? employee?.user?.role ?? 'employee' : 'employee',
        password: '',
        employee_code: employee?.employee_code ?? '',
        employment_status: employee?.employment_status ?? 'active',
        employment_type: employee?.employment_type ?? 'permanent',
        join_date: employee?.join_date ?? today,
        confirmation_date: employee?.confirmation_date ?? '',
        resign_date: employee?.resign_date ?? '',
        work_email: employee?.work_email ?? '',
        work_phone: employee?.work_phone ?? '',
        office_location: employee?.office_location ?? '',
        company_id: defaultCompanyId,
        branch_id: employee?.branch?.id?.toString() ?? '',
        department_id: employee?.department?.id?.toString() ?? '',
        position_id: employee?.position?.id?.toString() ?? '',
        job_level_id: employee?.job_level?.id?.toString() ?? '',
        manager_id: employee?.manager?.id?.toString() ?? '',
        nik: employee?.profile?.nik ?? '',
        kk_number: employee?.profile?.kk_number ?? '',
        npwp: employee?.profile?.npwp ?? '',
        bpjs_kes: employee?.profile?.bpjs_kes ?? '',
        bpjs_tk: employee?.profile?.bpjs_tk ?? '',
        gender: employee?.profile?.gender ?? '',
        birth_place: employee?.profile?.birth_place ?? '',
        birth_date: employee?.profile?.birth_date ?? '',
        marital_status: employee?.profile?.marital_status ?? '',
        religion: employee?.profile?.religion ?? '',
        address_line1: employee?.profile?.address_line1 ?? '',
        address_line2: employee?.profile?.address_line2 ?? '',
        city: employee?.profile?.city ?? '',
        province: employee?.profile?.province ?? '',
        postal_code: employee?.profile?.postal_code ?? '',
        emergency_contact_name: employee?.profile?.emergency_contact_name ?? '',
        emergency_contact_relation:
            employee?.profile?.emergency_contact_relation ?? '',
        emergency_contact_phone:
            employee?.profile?.emergency_contact_phone ?? '',
        bank_name: employee?.profile?.bank_name ?? '',
        bank_account_name: employee?.profile?.bank_account_name ?? '',
        bank_account_number: employee?.profile?.bank_account_number ?? '',
        documents: mode === 'create' ? [firstDoc] : [],
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        if (mode === 'create') {
            post('/modules/employees', {
                forceFormData: true,
            });
            return;
        }

        if (!employee) return;

        put(`/modules/employees/${employee.id}`, {
            forceFormData: true,
        });
    };

    const addDocument = () => {
        setData('documents', [
            ...data.documents,
            {
                type: '',
                number: '',
                issued_at: '',
                expires_at: '',
                file: null,
            },
        ]);
    };

    const updateDocument = (
        index: number,
        key: keyof DocumentInput,
        value: string | File | null,
    ) => {
        const next = [...data.documents];
        next[index] = {
            ...next[index],
            [key]: value,
        } as DocumentInput;
        setData('documents', next);
    };

    const removeDocument = (index: number) => {
        setData(
            'documents',
            data.documents.filter((_, idx) => idx !== index),
        );
    };

    const existingDocuments = employee?.documents ?? [];

    return (
        <AppLayout>
            <form onSubmit={submit} encType="multipart/form-data" className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">
                                {mode === 'create'
                                    ? 'Tambah Karyawan'
                                    : 'Edit Karyawan'}
                            </Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {mode === 'create'
                                    ? 'Form Karyawan Baru'
                                    : 'Perbarui Data Karyawan'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Lengkapi data personal, pekerjaan, dan dokumen
                                karyawan.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" asChild>
                                <Link href="/modules/employees">Kembali</Link>
                            </Button>
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={goPrev}
                                >
                                    Sebelumnya
                                </Button>
                            )}
                            {step < totalSteps ? (
                                <Button type="button" onClick={goNext}>
                                    Selanjutnya
                                </Button>
                            ) : (
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Menyimpan...'
                                        : mode === 'create'
                                          ? 'Simpan Karyawan'
                                          : 'Simpan Perubahan'}
                                </Button>
                            )}
                        </div>
                    </div>
                </section>

                <div className="flex flex-wrap gap-2">
                    {wizardSteps.map((wizardStep) => (
                        <Badge
                            key={wizardStep.id}
                            variant={step === wizardStep.id ? 'default' : 'outline'}
                        >
                            Step {wizardStep.id} · {wizardStep.title}
                        </Badge>
                    ))}
                </div>

                <Card className={step === 1 ? '' : 'hidden'}>
                    <CardHeader>
                        <CardTitle>Informasi Akun</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(event) =>
                                    setData('email', event.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            {canManageRoles ? (
                                <Select
                                    value={data.role}
                                    onValueChange={(value) =>
                                        setData('role', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem
                                                key={role.value}
                                                value={role.value}
                                            >
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <div className="space-y-2">
                                    <Input value="Employee" disabled />
                                    <p className="text-xs text-muted-foreground">
                                        Hanya superadmin yang dapat mengubah role.
                                    </p>
                                </div>
                            )}
                            <InputError message={errors.role} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                {mode === 'create'
                                    ? 'Password'
                                    : 'Password Baru (Opsional)'}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(event) =>
                                    setData('password', event.target.value)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>
                    </CardContent>
                </Card>
                <Card className={step === 1 ? '' : 'hidden'}>
                    <CardHeader>
                        <CardTitle>Informasi Pekerjaan</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="employee_code">Employee Code</Label>
                            <Input
                                id="employee_code"
                                value={data.employee_code}
                                onChange={(event) =>
                                    setData('employee_code', event.target.value)
                                }
                            />
                            <InputError message={errors.employee_code} />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={data.employment_status}
                                onValueChange={(value) =>
                                    setData('employment_status', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((status) => (
                                        <SelectItem
                                            key={status.value}
                                            value={status.value}
                                        >
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.employment_status} />
                        </div>
                        <div className="space-y-2">
                            <Label>Employment Type</Label>
                            <Select
                                value={data.employment_type}
                                onValueChange={(value) =>
                                    setData('employment_type', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    {employmentTypes.map((type) => (
                                        <SelectItem
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.employment_type} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="join_date">Tanggal Bergabung</Label>
                            <Input
                                id="join_date"
                                type="date"
                                value={data.join_date}
                                onChange={(event) =>
                                    setData('join_date', event.target.value)
                                }
                            />
                            <InputError message={errors.join_date} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmation_date">Konfirmasi</Label>
                            <Input
                                id="confirmation_date"
                                type="date"
                                value={data.confirmation_date}
                                onChange={(event) =>
                                    setData(
                                        'confirmation_date',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.confirmation_date} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="resign_date">Resign Date</Label>
                            <Input
                                id="resign_date"
                                type="date"
                                value={data.resign_date}
                                onChange={(event) =>
                                    setData('resign_date', event.target.value)
                                }
                            />
                            <InputError message={errors.resign_date} />
                        </div>
                    </CardContent>
                </Card>

                <Card className={step === 2 ? '' : 'hidden'}>
                    <CardHeader>
                        <CardTitle>Struktur Organisasi</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Perusahaan</Label>
                            <Select
                                value={data.company_id}
                                onValueChange={(value) =>
                                    setData('company_id', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih perusahaan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.companies.map((company) => (
                                        <SelectItem
                                            key={company.id}
                                            value={String(company.id)}
                                        >
                                            {company.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.company_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Cabang</Label>
                            <Select
                                value={data.branch_id || EMPTY_OPTION_VALUE}
                                onValueChange={(value) =>
                                    setData(
                                        'branch_id',
                                        value === EMPTY_OPTION_VALUE
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih cabang" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={EMPTY_OPTION_VALUE}>
                                        -
                                    </SelectItem>
                                    {options.branches.map((branch) => (
                                        <SelectItem
                                            key={branch.id}
                                            value={String(branch.id)}
                                        >
                                            {branch.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.branch_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Departemen</Label>
                            <Select
                                value={data.department_id || EMPTY_OPTION_VALUE}
                                onValueChange={(value) =>
                                    setData(
                                        'department_id',
                                        value === EMPTY_OPTION_VALUE
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih departemen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={EMPTY_OPTION_VALUE}>
                                        -
                                    </SelectItem>
                                    {options.departments.map((department) => (
                                        <SelectItem
                                            key={department.id}
                                            value={String(department.id)}
                                        >
                                            {department.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.department_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Jabatan</Label>
                            <Select
                                value={data.position_id || EMPTY_OPTION_VALUE}
                                onValueChange={(value) =>
                                    setData(
                                        'position_id',
                                        value === EMPTY_OPTION_VALUE
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jabatan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={EMPTY_OPTION_VALUE}>
                                        -
                                    </SelectItem>
                                    {options.positions.map((position) => (
                                        <SelectItem
                                            key={position.id}
                                            value={String(position.id)}
                                        >
                                            {position.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.position_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Job Level</Label>
                            <Select
                                value={data.job_level_id || EMPTY_OPTION_VALUE}
                                onValueChange={(value) =>
                                    setData(
                                        'job_level_id',
                                        value === EMPTY_OPTION_VALUE
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={EMPTY_OPTION_VALUE}>
                                        -
                                    </SelectItem>
                                    {options.jobLevels.map((level) => (
                                        <SelectItem
                                            key={level.id}
                                            value={String(level.id)}
                                        >
                                            {level.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.job_level_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Manager</Label>
                            <Select
                                value={data.manager_id || EMPTY_OPTION_VALUE}
                                onValueChange={(value) =>
                                    setData(
                                        'manager_id',
                                        value === EMPTY_OPTION_VALUE
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih manager" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={EMPTY_OPTION_VALUE}>
                                        -
                                    </SelectItem>
                                    {options.managers.map((manager) => (
                                        <SelectItem
                                            key={manager.id}
                                            value={String(manager.id)}
                                        >
                                            {manager.employee_code} ·{' '}
                                            {manager.user?.name ?? '-'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.manager_id} />
                        </div>
                    </CardContent>
                </Card>
                <Card className={step === 2 ? '' : 'hidden'}>
                    <CardHeader>
                        <CardTitle>Kontak Kerja</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="work_email">Email Kerja</Label>
                            <Input
                                id="work_email"
                                type="email"
                                value={data.work_email}
                                onChange={(event) =>
                                    setData('work_email', event.target.value)
                                }
                            />
                            <InputError message={errors.work_email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="work_phone">Telepon Kerja</Label>
                            <Input
                                id="work_phone"
                                value={data.work_phone}
                                onChange={(event) =>
                                    setData('work_phone', event.target.value)
                                }
                            />
                            <InputError message={errors.work_phone} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="office_location">Lokasi Kantor</Label>
                            <Input
                                id="office_location"
                                value={data.office_location}
                                onChange={(event) =>
                                    setData(
                                        'office_location',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.office_location} />
                        </div>
                    </CardContent>
                </Card>

                <Card className={step === 3 ? '' : 'hidden'}>
                    <CardHeader>
                        <CardTitle>Profil Pribadi</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="nik">NIK</Label>
                            <Input
                                id="nik"
                                value={data.nik}
                                onChange={(event) =>
                                    setData('nik', event.target.value)
                                }
                            />
                            <InputError message={errors.nik} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kk_number">No. KK</Label>
                            <Input
                                id="kk_number"
                                value={data.kk_number}
                                onChange={(event) =>
                                    setData('kk_number', event.target.value)
                                }
                            />
                            <InputError message={errors.kk_number} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="npwp">NPWP</Label>
                            <Input
                                id="npwp"
                                value={data.npwp}
                                onChange={(event) =>
                                    setData('npwp', event.target.value)
                                }
                            />
                            <InputError message={errors.npwp} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bpjs_kes">BPJS Kesehatan</Label>
                            <Input
                                id="bpjs_kes"
                                value={data.bpjs_kes}
                                onChange={(event) =>
                                    setData('bpjs_kes', event.target.value)
                                }
                            />
                            <InputError message={errors.bpjs_kes} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bpjs_tk">BPJS Ketenagakerjaan</Label>
                            <Input
                                id="bpjs_tk"
                                value={data.bpjs_tk}
                                onChange={(event) =>
                                    setData('bpjs_tk', event.target.value)
                                }
                            />
                            <InputError message={errors.bpjs_tk} />
                        </div>
                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <Select
                                value={data.gender || EMPTY_OPTION_VALUE}
                                onValueChange={(value) =>
                                    setData(
                                        'gender',
                                        value === EMPTY_OPTION_VALUE
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={EMPTY_OPTION_VALUE}>
                                        -
                                    </SelectItem>
                                    {genders.map((gender) => (
                                        <SelectItem
                                            key={gender.value}
                                            value={gender.value}
                                        >
                                            {gender.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.gender} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birth_place">Tempat Lahir</Label>
                            <Input
                                id="birth_place"
                                value={data.birth_place}
                                onChange={(event) =>
                                    setData('birth_place', event.target.value)
                                }
                            />
                            <InputError message={errors.birth_place} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birth_date">Tanggal Lahir</Label>
                            <Input
                                id="birth_date"
                                type="date"
                                value={data.birth_date}
                                onChange={(event) =>
                                    setData('birth_date', event.target.value)
                                }
                            />
                            <InputError message={errors.birth_date} />
                        </div>
                        <div className="space-y-2">
                            <Label>Status Pernikahan</Label>
                            <Select
                                value={
                                    data.marital_status || EMPTY_OPTION_VALUE
                                }
                                onValueChange={(value) =>
                                    setData(
                                        'marital_status',
                                        value === EMPTY_OPTION_VALUE
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={EMPTY_OPTION_VALUE}>
                                        -
                                    </SelectItem>
                                    {maritalStatuses.map((status) => (
                                        <SelectItem
                                            key={status.value}
                                            value={status.value}
                                        >
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.marital_status} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="religion">Agama</Label>
                            <Input
                                id="religion"
                                value={data.religion}
                                onChange={(event) =>
                                    setData('religion', event.target.value)
                                }
                            />
                            <InputError message={errors.religion} />
                        </div>
                    </CardContent>
                </Card>
                <Card className={step === 3 ? '' : 'hidden'}>
                    <CardHeader>
                        <CardTitle>Alamat & Kontak Darurat</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address_line1">Alamat</Label>
                            <Input
                                id="address_line1"
                                value={data.address_line1}
                                onChange={(event) =>
                                    setData(
                                        'address_line1',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.address_line1} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address_line2">
                                Alamat Tambahan
                            </Label>
                            <Input
                                id="address_line2"
                                value={data.address_line2}
                                onChange={(event) =>
                                    setData(
                                        'address_line2',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.address_line2} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">Kota</Label>
                            <Input
                                id="city"
                                value={data.city}
                                onChange={(event) =>
                                    setData('city', event.target.value)
                                }
                            />
                            <InputError message={errors.city} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="province">Provinsi</Label>
                            <Input
                                id="province"
                                value={data.province}
                                onChange={(event) =>
                                    setData('province', event.target.value)
                                }
                            />
                            <InputError message={errors.province} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="postal_code">Kode Pos</Label>
                            <Input
                                id="postal_code"
                                value={data.postal_code}
                                onChange={(event) =>
                                    setData('postal_code', event.target.value)
                                }
                            />
                            <InputError message={errors.postal_code} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="emergency_contact_name">
                                Kontak Darurat
                            </Label>
                            <Input
                                id="emergency_contact_name"
                                value={data.emergency_contact_name}
                                onChange={(event) =>
                                    setData(
                                        'emergency_contact_name',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.emergency_contact_name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="emergency_contact_relation">
                                Relasi
                            </Label>
                            <Input
                                id="emergency_contact_relation"
                                value={data.emergency_contact_relation}
                                onChange={(event) =>
                                    setData(
                                        'emergency_contact_relation',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.emergency_contact_relation} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="emergency_contact_phone">
                                Telepon Darurat
                            </Label>
                            <Input
                                id="emergency_contact_phone"
                                value={data.emergency_contact_phone}
                                onChange={(event) =>
                                    setData(
                                        'emergency_contact_phone',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.emergency_contact_phone} />
                        </div>
                    </CardContent>
                </Card>

                <Card className={step === 4 ? '' : 'hidden'}>
                    <CardHeader>
                        <CardTitle>Bank & Payroll</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="bank_name">Bank</Label>
                            <Input
                                id="bank_name"
                                value={data.bank_name}
                                onChange={(event) =>
                                    setData('bank_name', event.target.value)
                                }
                            />
                            <InputError message={errors.bank_name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bank_account_name">
                                Nama Rekening
                            </Label>
                            <Input
                                id="bank_account_name"
                                value={data.bank_account_name}
                                onChange={(event) =>
                                    setData(
                                        'bank_account_name',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.bank_account_name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bank_account_number">
                                Nomor Rekening
                            </Label>
                            <Input
                                id="bank_account_number"
                                value={data.bank_account_number}
                                onChange={(event) =>
                                    setData(
                                        'bank_account_number',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.bank_account_number} />
                        </div>
                    </CardContent>
                </Card>
                <Card className={step === 4 ? '' : 'hidden'}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Dokumen Karyawan</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Tambahkan dokumen penting seperti KTP atau NPWP.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addDocument}
                        >
                            Tambah Dokumen
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.documents.length === 0 && (
                            <div className="rounded-lg border border-border/60 px-4 py-3 text-sm text-muted-foreground">
                                Belum ada dokumen baru yang ditambahkan.
                            </div>
                        )}
                        {data.documents.map((doc, index) => (
                            <div
                                key={`doc-${index}`}
                                className="grid gap-4 rounded-lg border border-border/60 p-4 md:grid-cols-2"
                            >
                                <div className="space-y-2">
                                    <Label>Jenis Dokumen</Label>
                                    <Input
                                        value={doc.type}
                                        onChange={(event) =>
                                            updateDocument(
                                                index,
                                                'type',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors[
                                                `documents.${index}.type` as keyof typeof errors
                                            ]
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>No. Dokumen</Label>
                                    <Input
                                        value={doc.number}
                                        onChange={(event) =>
                                            updateDocument(
                                                index,
                                                'number',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors[
                                                `documents.${index}.number` as keyof typeof errors
                                            ]
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tanggal Terbit</Label>
                                    <Input
                                        type="date"
                                        value={doc.issued_at}
                                        onChange={(event) =>
                                            updateDocument(
                                                index,
                                                'issued_at',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors[
                                                `documents.${index}.issued_at` as keyof typeof errors
                                            ]
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tanggal Kadaluarsa</Label>
                                    <Input
                                        type="date"
                                        value={doc.expires_at}
                                        onChange={(event) =>
                                            updateDocument(
                                                index,
                                                'expires_at',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors[
                                                `documents.${index}.expires_at` as keyof typeof errors
                                            ]
                                        }
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Upload File</Label>
                                    <Input
                                        type="file"
                                        onChange={(event) =>
                                            updateDocument(
                                                index,
                                                'file',
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors[
                                                `documents.${index}.file` as keyof typeof errors
                                            ]
                                        }
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => removeDocument(index)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {existingDocuments.length > 0 && step === 4 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Dokumen Tersimpan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            {existingDocuments.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {doc.type}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {doc.number ?? '-'}
                                        </p>
                                    </div>
                                    <Badge variant="outline">Tersimpan</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </form>
        </AppLayout>
    );
}

