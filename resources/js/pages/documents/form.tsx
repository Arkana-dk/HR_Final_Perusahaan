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

type DocumentDetail = {
    id: number;
    employee_id: number;
    type: string;
    number?: string | null;
    issued_at?: string | null;
    expires_at?: string | null;
    file_path?: string | null;
    notes?: string | null;
};

type PageProps = {
    mode: 'create' | 'edit';
    document?: DocumentDetail | null;
    employees: EmployeeOption[];
};

export default function DocumentForm() {
    const { mode, document, employees } = usePage<PageProps>().props;
    const { data, setData, post, put, processing, errors } = useForm({
        employee_id:
            document?.employee_id?.toString() ??
            employees[0]?.id?.toString() ??
            '',
        type: document?.type ?? '',
        number: document?.number ?? '',
        issued_at: document?.issued_at ?? '',
        expires_at: document?.expires_at ?? '',
        notes: document?.notes ?? '',
        file: null as File | null,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (mode === 'create') {
            post('/modules/documents', { forceFormData: true });
            return;
        }

        if (!document) return;

        put(`/modules/documents/${document.id}`, { forceFormData: true });
    };

    return (
        <AppLayout>
            <Head title="Document Form" />

            <form onSubmit={submit} className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">
                                {mode === 'create'
                                    ? 'Tambah Dokumen'
                                    : 'Edit Dokumen'}
                            </Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {mode === 'create'
                                    ? 'Form Dokumen Baru'
                                    : 'Perbarui Dokumen'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Simpan dokumen penting karyawan dan masa
                                berlakunya.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" asChild>
                                <Link href="/modules/documents">Kembali</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Menyimpan...'
                                    : mode === 'create'
                                      ? 'Simpan Dokumen'
                                      : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </div>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Dokumen</CardTitle>
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
                            <Label>Jenis Dokumen</Label>
                            <Input
                                value={data.type}
                                onChange={(event) =>
                                    setData('type', event.target.value)
                                }
                            />
                            <InputError message={errors.type} />
                        </div>
                        <div className="space-y-2">
                            <Label>Nomor Dokumen</Label>
                            <Input
                                value={data.number}
                                onChange={(event) =>
                                    setData('number', event.target.value)
                                }
                            />
                            <InputError message={errors.number} />
                        </div>
                        <div className="space-y-2">
                            <Label>Tanggal Terbit</Label>
                            <Input
                                type="date"
                                value={data.issued_at}
                                onChange={(event) =>
                                    setData('issued_at', event.target.value)
                                }
                            />
                            <InputError message={errors.issued_at} />
                        </div>
                        <div className="space-y-2">
                            <Label>Berlaku Sampai</Label>
                            <Input
                                type="date"
                                value={data.expires_at}
                                onChange={(event) =>
                                    setData('expires_at', event.target.value)
                                }
                            />
                            <InputError message={errors.expires_at} />
                        </div>
                        <div className="space-y-2">
                            <Label>Upload File (PDF/JPG)</Label>
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
                            {document?.file_path && (
                                <a
                                    href={`/storage/${document.file_path}`}
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
