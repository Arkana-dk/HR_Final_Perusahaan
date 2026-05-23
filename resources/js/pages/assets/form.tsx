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

type Option = {
    id: number;
    name?: string;
    title?: string;
    employee_code?: string;
    user?: {
        name: string;
    } | null;
};

type AssetDetail = {
    id: number;
    company_id: number;
    code: string;
    name: string;
    category?: string | null;
    brand?: string | null;
    model?: string | null;
    serial_number?: string | null;
    purchase_date?: string | null;
    purchase_price?: number | null;
    status: string;
    assigned_employee_id?: number | null;
    assigned_at?: string | null;
    notes?: string | null;
};

type PageProps = {
    mode: 'create' | 'edit';
    asset?: AssetDetail | null;
    companies: Option[];
    employees: Option[];
};

const UNASSIGNED_VALUE = '__unassigned__';

export default function AssetForm() {
    const { mode, asset, companies, employees } = usePage<PageProps>().props;
    const { data, setData, post, put, processing, errors } = useForm({
        company_id: asset?.company_id?.toString() ?? companies[0]?.id?.toString() ?? '',
        code: asset?.code ?? '',
        name: asset?.name ?? '',
        category: asset?.category ?? '',
        brand: asset?.brand ?? '',
        model: asset?.model ?? '',
        serial_number: asset?.serial_number ?? '',
        purchase_date: asset?.purchase_date ?? '',
        purchase_price: asset?.purchase_price?.toString() ?? '',
        status: asset?.status ?? 'available',
        assigned_employee_id: asset?.assigned_employee_id?.toString() ?? '',
        assigned_at: asset?.assigned_at ?? '',
        notes: asset?.notes ?? '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (mode === 'create') {
            post('/modules/assets');
            return;
        }

        if (!asset) return;

        put(`/modules/assets/${asset.id}`);
    };

    return (
        <AppLayout>
            <Head title="Asset Form" />

            <form onSubmit={submit} className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">
                                {mode === 'create'
                                    ? 'Tambah Aset'
                                    : 'Edit Aset'}
                            </Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {mode === 'create'
                                    ? 'Form Aset Baru'
                                    : 'Perbarui Data Aset'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Lengkapi data aset, status, dan penugasan.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" asChild>
                                <Link href="/modules/assets">Kembali</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Menyimpan...'
                                    : mode === 'create'
                                      ? 'Simpan Aset'
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
                                    {companies.map((company) => (
                                        <SelectItem
                                            key={company.id}
                                            value={company.id.toString()}
                                        >
                                            {company.name ?? '-'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.company_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Kode</Label>
                            <Input
                                value={data.code}
                                onChange={(event) =>
                                    setData('code', event.target.value)
                                }
                            />
                            <InputError message={errors.code} />
                        </div>
                        <div className="space-y-2">
                            <Label>Nama Aset</Label>
                            <Input
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <Label>Kategori</Label>
                            <Input
                                value={data.category}
                                onChange={(event) =>
                                    setData('category', event.target.value)
                                }
                            />
                            <InputError message={errors.category} />
                        </div>
                        <div className="space-y-2">
                            <Label>Brand</Label>
                            <Input
                                value={data.brand}
                                onChange={(event) =>
                                    setData('brand', event.target.value)
                                }
                            />
                            <InputError message={errors.brand} />
                        </div>
                        <div className="space-y-2">
                            <Label>Model</Label>
                            <Input
                                value={data.model}
                                onChange={(event) =>
                                    setData('model', event.target.value)
                                }
                            />
                            <InputError message={errors.model} />
                        </div>
                        <div className="space-y-2">
                            <Label>Serial Number</Label>
                            <Input
                                value={data.serial_number}
                                onChange={(event) =>
                                    setData('serial_number', event.target.value)
                                }
                            />
                            <InputError message={errors.serial_number} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Status & Penugasan</CardTitle>
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
                                    <SelectItem value="available">
                                        Available
                                    </SelectItem>
                                    <SelectItem value="assigned">
                                        Assigned
                                    </SelectItem>
                                    <SelectItem value="maintenance">
                                        Maintenance
                                    </SelectItem>
                                    <SelectItem value="retired">Retired</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                        <div className="space-y-2">
                            <Label>Assign ke Karyawan</Label>
                            <Select
                                value={
                                    data.assigned_employee_id ||
                                    UNASSIGNED_VALUE
                                }
                                onValueChange={(value) =>
                                    setData(
                                        'assigned_employee_id',
                                        value === UNASSIGNED_VALUE
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih karyawan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={UNASSIGNED_VALUE}>
                                        -
                                    </SelectItem>
                                    {employees.map((employee) => (
                                        <SelectItem
                                            key={employee.id}
                                            value={employee.id.toString()}
                                        >
                                            {employee.employee_code} ·{' '}
                                            {employee.user?.name ?? '-'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.assigned_employee_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Tanggal Assigned</Label>
                            <Input
                                type="date"
                                value={data.assigned_at}
                                onChange={(event) =>
                                    setData('assigned_at', event.target.value)
                                }
                            />
                            <InputError message={errors.assigned_at} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pembelian & Catatan</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Tanggal Pembelian</Label>
                            <Input
                                type="date"
                                value={data.purchase_date}
                                onChange={(event) =>
                                    setData('purchase_date', event.target.value)
                                }
                            />
                            <InputError message={errors.purchase_date} />
                        </div>
                        <div className="space-y-2">
                            <Label>Harga Pembelian</Label>
                            <Input
                                type="number"
                                value={data.purchase_price}
                                onChange={(event) =>
                                    setData('purchase_price', event.target.value)
                                }
                            />
                            <InputError message={errors.purchase_price} />
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
