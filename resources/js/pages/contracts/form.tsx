import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
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

type EmployeeOption = {
    id: number;
    employee_code?: string | null;
    name?: string | null;
};

type ContractDetail = {
    id: number;
    employee_id: number;
    type: string;
    start_date: string;
    end_date?: string | null;
    base_salary?: number | string | null;
    status: string;
    signed_at?: string | null;
    has_file?: boolean;
    notes?: string | null;
};

type PageProps = {
    mode: 'create' | 'edit';
    contract?: ContractDetail | null;
    employees: EmployeeOption[];
};

export default function ContractForm() {
    const { mode, contract, employees } = usePage<PageProps>().props;
    const { data, setData, post, put, processing, errors } = useForm({
        employee_id:
            contract?.employee_id?.toString() ??
            employees[0]?.id?.toString() ??
            '',
        type: contract?.type ?? 'permanent',
        start_date: contract?.start_date ?? '',
        end_date: contract?.end_date ?? '',
        base_salary: contract?.base_salary?.toString() ?? '',
        status: contract?.status ?? 'active',
        signed_at: contract?.signed_at ?? '',
        notes: contract?.notes ?? '',
        file: null as File | null,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (mode === 'create') {
            post('/modules/contracts', { forceFormData: true });
            return;
        }

        if (!contract) return;

        put(`/modules/contracts/${contract.id}`, { forceFormData: true });
    };

    return (
        <AppLayout>
            <Head title="Contract Form" />

            <form onSubmit={submit} className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">
                                {mode === 'create'
                                    ? 'Tambah Kontrak'
                                    : 'Edit Kontrak'}
                            </Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {mode === 'create'
                                    ? 'Form Kontrak Baru'
                                    : 'Perbarui Data Kontrak'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Lengkapi informasi kontrak, masa berlaku, dan
                                dokumen terkait.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" asChild>
                                <Link href="/modules/contracts">Kembali</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Menyimpan...'
                                    : mode === 'create'
                                      ? 'Simpan Kontrak'
                                      : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </div>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Utama</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Karyawan</Label>
                            <Select
                                value={data.employee_id}
                                onValueChange={(value) =>
                                    setData('employee_id', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih karyawan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {employees.map((employee) => (
                                        <SelectItem
                                            key={employee.id}
                                            value={employee.id.toString()}
                                        >
                                            {employee.employee_code ?? '-'} -{' '}
                                            {employee.name ?? '-'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.employee_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Tipe Kontrak</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value) =>
                                    setData('type', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="permanent">
                                        Permanent
                                    </SelectItem>
                                    <SelectItem value="contract">
                                        Contract
                                    </SelectItem>
                                    <SelectItem value="internship">
                                        Internship
                                    </SelectItem>
                                    <SelectItem value="probation">
                                        Probation
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} />
                        </div>
                        <div className="space-y-2">
                            <Label>Tanggal Mulai</Label>
                            <Input
                                type="date"
                                value={data.start_date}
                                onChange={(event) =>
                                    setData('start_date', event.target.value)
                                }
                            />
                            <InputError message={errors.start_date} />
                        </div>
                        <div className="space-y-2">
                            <Label>Tanggal Selesai</Label>
                            <Input
                                type="date"
                                value={data.end_date}
                                onChange={(event) =>
                                    setData('end_date', event.target.value)
                                }
                            />
                            <InputError message={errors.end_date} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Status & Kompensasi</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) =>
                                    setData('status', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">
                                        Aktif
                                    </SelectItem>
                                    <SelectItem value="expired">
                                        Kadaluarsa
                                    </SelectItem>
                                    <SelectItem value="terminated">
                                        Terminated
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                        <div className="space-y-2">
                            <Label>Gaji Pokok</Label>
                            <Input
                                type="number"
                                value={data.base_salary}
                                onChange={(event) =>
                                    setData('base_salary', event.target.value)
                                }
                            />
                            <InputError message={errors.base_salary} />
                        </div>
                        <div className="space-y-2">
                            <Label>Tanggal Tanda Tangan</Label>
                            <Input
                                type="date"
                                value={data.signed_at}
                                onChange={(event) =>
                                    setData('signed_at', event.target.value)
                                }
                            />
                            <InputError message={errors.signed_at} />
                        </div>
                        <div className="space-y-2">
                            <Label>Dokumen Kontrak (PDF/JPG)</Label>
                            <Input
                                type="file"
                                onChange={(event) =>
                                    setData(
                                        'file',
                                        event.target.files?.[0] ?? null,
                                    )
                                }
                            />
                            <InputError message={errors.file} />
                            {contract?.has_file && (
                                <a
                                    href={`/secure-files/contracts/${contract.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-primary hover:underline"
                                >
                                    Lihat dokumen tersimpan
                                </a>
                            )}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Catatan</Label>
                            <Input
                                value={data.notes}
                                onChange={(event) =>
                                    setData('notes', event.target.value)
                                }
                            />
                            <InputError message={errors.notes} />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </AppLayout>
    );
}
