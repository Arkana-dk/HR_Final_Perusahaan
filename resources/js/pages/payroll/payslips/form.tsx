import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useMemo } from 'react';
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
    employee_code: string;
    user?: {
        name: string;
    } | null;
};

type PeriodOption = {
    id: number;
    name: string;
};

type ComponentOption = {
    id: number;
    name: string;
    type: 'earning' | 'deduction';
    default_amount: string | number | null;
};

type PayslipItem = {
    component_id: string;
    amount: string;
    notes: string;
};

type PayslipDetail = {
    id: number;
    employee_id: number;
    payroll_period_id: number;
    status: string;
    items: Array<{
        component_id?: number | null;
        salary_component_id?: number | null;
        amount: string | number;
        notes?: string | null;
    }>;
};

type PageProps = {
    mode: 'create' | 'edit';
    payslip: PayslipDetail | null;
    employees: EmployeeOption[];
    periods: PeriodOption[];
    components: ComponentOption[];
};

const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'final', label: 'Final' },
    { value: 'paid', label: 'Paid' },
];

export default function PayslipForm() {
    const { mode, payslip, employees, periods, components } =
        usePage<PageProps>().props;

    const initialItems: PayslipItem[] = payslip?.items?.length
        ? payslip.items.map((item) => ({
              component_id: String(
                  item.component_id ?? item.salary_component_id ?? '',
              ),
              amount: String(item.amount ?? ''),
              notes: item.notes ?? '',
          }))
        : [
              {
                  component_id: '',
                  amount: '',
                  notes: '',
              },
          ];

    const { data, setData, post, put, processing, errors } = useForm({
        employee_id: payslip?.employee_id
            ? String(payslip.employee_id)
            : employees[0]
              ? String(employees[0].id)
              : '',
        payroll_period_id: payslip?.payroll_period_id
            ? String(payslip.payroll_period_id)
            : periods[0]
              ? String(periods[0].id)
              : '',
        status: payslip?.status ?? 'draft',
        items: initialItems,
    });

    const componentMap = useMemo(() => {
        const map = new Map<string, ComponentOption>();
        components.forEach((component) => {
            map.set(String(component.id), component);
        });
        return map;
    }, [components]);

    const totals = useMemo(() => {
        return data.items.reduce(
            (acc, item) => {
                const component = componentMap.get(item.component_id);
                const amount = Number(item.amount || 0);

                if (component?.type === 'deduction') {
                    acc.deductions += amount;
                } else {
                    acc.gross += amount;
                }
                acc.net = acc.gross - acc.deductions;
                return acc;
            },
            { gross: 0, deductions: 0, net: 0 },
        );
    }, [data.items, componentMap]);

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        if (mode === 'create') {
            post('/modules/payslips');
            return;
        }

        if (!payslip) return;

        put(`/modules/payslips/${payslip.id}`);
    };

    const addItem = () => {
        setData('items', [
            ...data.items,
            { component_id: '', amount: '', notes: '' },
        ]);
    };

    const updateItem = (
        index: number,
        key: keyof PayslipItem,
        value: string,
    ) => {
        const next = [...data.items];
        const current = next[index];
        if (!current) {
            return;
        }

        next[index] = { ...current, [key]: value };

        if (key === 'component_id' && current.amount === '') {
            const component = componentMap.get(value);
            if (component && component.default_amount !== null) {
                next[index].amount = String(component.default_amount ?? '');
            }
        }

        setData('items', next);
    };

    const removeItem = (index: number) => {
        setData(
            'items',
            data.items.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    return (
        <AppLayout>
            <Head title="Payslip" />

            <form onSubmit={submit} className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">
                                {mode === 'create'
                                    ? 'Tambah Payslip'
                                    : 'Edit Payslip'}
                            </Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Payslip
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola komponen gaji dan nilai payslip.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" asChild>
                                <Link href="/modules/payslips">Kembali</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </div>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Payslip</CardTitle>
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
                                            value={String(employee.id)}
                                        >
                                            {employee.employee_code} ·{' '}
                                            {employee.user?.name ?? '-'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.employee_id} />
                        </div>
                        <div className="space-y-2">
                            <Label>Periode Payroll</Label>
                            <Select
                                value={data.payroll_period_id}
                                onValueChange={(value) =>
                                    setData('payroll_period_id', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih periode" />
                                </SelectTrigger>
                                <SelectContent>
                                    {periods.map((period) => (
                                        <SelectItem
                                            key={period.id}
                                            value={String(period.id)}
                                        >
                                            {period.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.payroll_period_id} />
                        </div>
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
                                    {statusOptions.map((status) => (
                                        <SelectItem
                                            key={status.value}
                                            value={status.value}
                                        >
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                        <div className="space-y-2">
                            <Label>Ringkasan</Label>
                            <div className="rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground">
                                Gross: {totals.gross.toLocaleString('id-ID')}
                                <br />
                                Deduction:{' '}
                                {totals.deductions.toLocaleString('id-ID')}
                                <br />
                                Net: {totals.net.toLocaleString('id-ID')}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Komponen Gaji</CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addItem}
                        >
                            Tambah Komponen
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {data.items.map((item, index) => (
                            <div
                                key={`item-${index}`}
                                className="grid gap-4 rounded-lg border border-border/60 p-4 md:grid-cols-2"
                            >
                                <div className="space-y-2">
                                    <Label>Komponen</Label>
                                    <Select
                                        value={item.component_id}
                                        onValueChange={(value) =>
                                            updateItem(
                                                index,
                                                'component_id',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih komponen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {components.map((component) => (
                                                <SelectItem
                                                    key={component.id}
                                                    value={String(component.id)}
                                                >
                                                    {component.name} ·{' '}
                                                    {component.type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        message={
                                            errors[
                                                `items.${index}.component_id` as keyof typeof errors
                                            ]
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Amount</Label>
                                    <Input
                                        type="number"
                                        value={item.amount}
                                        onChange={(event) =>
                                            updateItem(
                                                index,
                                                'amount',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors[
                                                `items.${index}.amount` as keyof typeof errors
                                            ]
                                        }
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Catatan</Label>
                                    <Input
                                        value={item.notes}
                                        onChange={(event) =>
                                            updateItem(
                                                index,
                                                'notes',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex justify-end md:col-span-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => removeItem(index)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </form>
        </AppLayout>
    );
}
