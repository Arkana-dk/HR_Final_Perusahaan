<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\User;
use App\Models\UserDevice;
use App\Services\AuditLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TokenAuthController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['required', 'string', 'max:100'],
            'platform' => ['nullable', 'string', 'max:20'],
            'device_id' => ['nullable', 'string', 'max:191'],
            'push_token' => ['nullable', 'string', 'max:255'],
        ]);

        if (!Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
            'is_active' => true,
        ])) {
            $inactiveAccount = User::query()
                ->where('email', $credentials['email'])
                ->where('is_active', false)
                ->exists();

            throw ValidationException::withMessages([
                'email' => $inactiveAccount
                    ? 'Akun Anda nonaktif. Hubungi HR/administrator.'
                    : 'Email atau password tidak valid.',
            ]);
        }

        $user = $request->user();
        $deviceName = trim((string) ($credentials['device_name'] ?? 'mobile-app'));
        $deviceId = trim((string) ($credentials['device_id'] ?? ''));
        $deviceTokenName = $deviceId !== '' ? $deviceName.'::'.$deviceId : $deviceName;
        $resolvedRole = $this->resolveRole($user);

        if ($deviceId !== '') {
            $user->tokens()
                ->where('name', 'like', '%::'.$deviceId)
                ->delete();
        } else {
            $user->tokens()->where('name', $deviceName)->delete();
        }

        $token = $user->createToken($deviceTokenName, ['mobile'])->plainTextToken;

        if (!empty($credentials['push_token'])) {
            $existingDevice = UserDevice::query()
                ->where('push_token', $credentials['push_token'])
                ->first();

            if ($existingDevice) {
                $existingDevice->update([
                    'user_id' => $user->id,
                    'platform' => strtolower((string) ($credentials['platform'] ?? 'android')),
                    'device_name' => $deviceName,
                    'device_id' => $deviceId !== '' ? $deviceId : null,
                    'is_active' => true,
                    'last_seen_at' => now(),
                ]);
            } else {
                UserDevice::query()->create([
                    'user_id' => $user->id,
                    'push_token' => $credentials['push_token'],
                    'platform' => strtolower((string) ($credentials['platform'] ?? 'android')),
                    'device_name' => $deviceName,
                    'device_id' => $deviceId !== '' ? $deviceId : null,
                    'is_active' => true,
                    'last_seen_at' => now(),
                ]);
            }
        }

        $employee = Employee::with('company:id,name')
            ->where('user_id', $user->id)
            ->first();

        $this->auditLogService->fromRequest($request, 'auth', 'auth.mobile_login', [
            'subject' => 'user',
            'reference_type' => $user::class,
            'reference_id' => $user->id,
            'notes' => 'Login mobile berhasil.',
            'after_data' => [
                'device_name' => $deviceName,
                'device_id' => $deviceId !== '' ? $deviceId : null,
                'role' => $resolvedRole,
            ],
            'context' => [
                'user_agent' => $request->userAgent(),
            ],
        ]);

        return $this->successResponse(
            [
                'token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $resolvedRole,
                    'roles' => $user->roles()->pluck('slug')->all(),
                    'device_name' => $deviceName,
                    'device_id' => $deviceId !== '' ? $deviceId : null,
                    'has_employee_profile' => $employee !== null,
                    'employee' => $employee
                        ? [
                            'id' => $employee->id,
                            'employee_code' => $employee->employee_code,
                            'company' => $employee->company?->name,
                        ]
                        : null,
                ],
            ],
            'Login berhasil.',
        );
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $employee = Employee::with('company:id,name')
            ->where('user_id', $user->id)
            ->first();

        return $this->successResponse(
            [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $this->resolveRole($user),
                'roles' => $user->roles()->pluck('slug')->all(),
                'has_employee_profile' => $employee !== null,
                'employee' => $employee
                    ? [
                        'id' => $employee->id,
                        'employee_code' => $employee->employee_code,
                        'company' => $employee->company?->name,
                    ]
                    : null,
            ],
            'Profil pengguna berhasil diambil.',
        );
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $token = $request->user()?->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        if ($user) {
            $this->auditLogService->fromRequest($request, 'auth', 'auth.mobile_logout', [
                'subject' => 'user',
                'reference_type' => $user::class,
                'reference_id' => $user->id,
                'notes' => 'Logout mobile berhasil.',
                'context' => [
                    'user_agent' => $request->userAgent(),
                ],
            ]);
        }

        return $this->successResponse(null, 'Logout berhasil.');
    }

    public function refresh(Request $request)
    {
        $user = $request->user();
        $currentToken = $user?->currentAccessToken();

        if (!$user || !$currentToken) {
            return $this->errorResponse('Token aktif tidak ditemukan.', [
                'token' => ['Token aktif tidak ditemukan.'],
            ], 401);
        }

        $tokenName = $currentToken->name ?: 'mobile-app';

        $currentToken->delete();
        $newToken = $user->createToken($tokenName, ['mobile'])->plainTextToken;

        return $this->successResponse([
            'token' => $newToken,
            'token_type' => 'Bearer',
        ], 'Refresh token berhasil.');
    }

    private function resolveRole($user): string
    {
        if (!$user) {
            return 'employee';
        }

        if ($user->hasRole('superadmin')) {
            return 'superadmin';
        }

        if ($user->hasRole('admin')) {
            return 'admin';
        }

        if ($user->hasRole('manager')) {
            return 'manager';
        }

        return 'employee';
    }
}
