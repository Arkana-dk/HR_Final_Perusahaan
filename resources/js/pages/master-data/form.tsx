import { Head, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
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
import { cn } from '@/lib/utils';

type FieldOption = {
    value: string;
    label: string;
};

type Field = {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    options?: FieldOption[];
};

type PageProps = {
    title: string;
    description?: string | null;
    mode: 'create' | 'edit';
    fields: Field[];
    record: Record<string, string | number | boolean | null> | null;
    formAction: string;
};

const EMPTY_SELECT_VALUE = '__empty__';

const normalizeValue = (
    field: Field,
    value: string | number | boolean | null | undefined,
) => {
    if (field.type === 'boolean') {
        return value ? '1' : '0';
    }

    if (value === null || value === undefined) return '';

    return String(value);
};

export default function MasterDataForm() {
    const { title, description, mode, fields, record, formAction } =
        usePage<PageProps>().props;

    const initial = fields.reduce<Record<string, string>>((acc, field) => {
        const value = record?.[field.name];
        const normalized = normalizeValue(field, value);

        if (
            normalized === '' &&
            field.type === 'select' &&
            field.required &&
            field.options &&
            field.options.length > 0
        ) {
            acc[field.name] = field.options[0].value;
        } else if (normalized === '' && field.type === 'boolean') {
            acc[field.name] = '1';
        } else {
            acc[field.name] = normalized;
        }

        return acc;
    }, {});

    const { data, setData, post, put, processing, errors } = useForm(initial);

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        if (mode === 'create') {
            post(formAction);
            return;
        }

        put(formAction);
    };

    const renderField = (field: Field) => {
        const value = data[field.name] ?? '';
        const fieldType = field.type ?? 'text';
        const isTextarea = fieldType === 'textarea';
        const isSelect = fieldType === 'select' || fieldType === 'boolean';
        const displaySelectValue =
            !field.required && value === '' ? EMPTY_SELECT_VALUE : value;

        return (
            <div
                key={field.name}
                className={cn('space-y-2', isTextarea && 'md:col-span-2')}
            >
                <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && (
                        <span className="ml-1 text-destructive">*</span>
                    )}
                </Label>
                {isSelect ? (
                    <Select
                        value={displaySelectValue}
                        onValueChange={(next) =>
                            setData(
                                field.name,
                                next === EMPTY_SELECT_VALUE ? '' : next,
                            )
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={`Pilih ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {!field.required && (
                                <SelectItem value={EMPTY_SELECT_VALUE}>
                                    -
                                </SelectItem>
                            )}
                            {(
                                field.options ?? [
                                    { value: '1', label: 'Ya' },
                                    { value: '0', label: 'Tidak' },
                                ]
                            ).map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : isTextarea ? (
                    <textarea
                        id={field.name}
                        className="min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        value={value}
                        onChange={(event) =>
                            setData(field.name, event.target.value)
                        }
                    />
                ) : (
                    <Input
                        id={field.name}
                        type={fieldType}
                        value={value}
                        onChange={(event) =>
                            setData(field.name, event.target.value)
                        }
                    />
                )}
                <InputError
                    message={errors[field.name as keyof typeof errors]}
                />
            </div>
        );
    };

    return (
        <AppLayout>
            <Head title={title} />

            <form onSubmit={submit} className="flex flex-col gap-6 px-6 py-6">
                <section className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/30 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <Badge variant="secondary">
                                {mode === 'create'
                                    ? 'Tambah Data'
                                    : 'Edit Data'}
                            </Badge>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                            {description && (
                                <p className="text-sm text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => history.back()}
                            >
                                Kembali
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </div>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        {fields.map(renderField)}
                    </CardContent>
                </Card>
            </form>
        </AppLayout>
    );
}
