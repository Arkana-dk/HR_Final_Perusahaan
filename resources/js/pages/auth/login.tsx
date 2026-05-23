import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Building2, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import type { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(store.url(), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-screen">
                {/* Left Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-1 items-center justify-center bg-white p-8"
                >
                    <div className="w-full max-w-md space-y-8">
                        {/* Logo & Title */}
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    type: 'spring',
                                    stiffness: 200,
                                }}
                                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-700"
                            >
                                <Building2 className="h-8 w-8 text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Sign in to access your HR dashboard
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                            >
                                {status}
                            </motion.div>
                        )}

                        {/* Login Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            onSubmit={submit}
                            className="space-y-6"
                        >
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="pl-10"
                                        placeholder="john.doe@company.com"
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        value={data.password}
                                        className="pr-10 pl-10"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) =>
                                            setData(
                                                'remember',
                                                checked as boolean,
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="cursor-pointer text-sm font-medium text-gray-700"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="h-11 w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                disabled={processing}
                            >
                                {processing ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </motion.form>

                        {/* Demo Credentials Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4"
                        >
                            <p className="mb-2 text-xs font-semibold text-gray-700">
                                Demo Credentials:
                            </p>
                            <div className="space-y-1 text-xs text-gray-600">
                                <p>
                                    <span className="font-medium">
                                        SuperAdmin:
                                    </span>{' '}
                                    superadmin@hr.com
                                </p>
                                <p>
                                    <span className="font-medium">Admin:</span>{' '}
                                    admin@hr.com
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Employee:
                                    </span>{' '}
                                    employee@hr.com
                                </p>
                                <p className="mt-2">
                                    <span className="font-medium">
                                        Password:
                                    </span>{' '}
                                    password
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side - Gradient Background */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden flex-1 items-center justify-center bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 lg:flex"
                >
                    <div className="max-w-md text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-6 text-4xl font-bold"
                        >
                            Modern HR Management System
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8 text-lg text-blue-100"
                        >
                            Streamline your workforce management with powerful
                            tools for attendance, payroll, and employee
                            management.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4"
                        >
                            {[
                                'Real-time attendance tracking',
                                'Automated payroll processing',
                                'Comprehensive employee management',
                                'Advanced reporting & analytics',
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="h-2 w-2 rounded-full bg-blue-300" />
                                    <span className="text-blue-50">
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
