<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TokenAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['nullable', 'string', 'max:100'],
        ]);

        if (!Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ])) {
            throw ValidationException::withMessages([
                'email' => 'Email atau password tidak valid.',
            ]);
        }

        $user = $request->user();
        $deviceName = $credentials['device_name'] ?? 'mobile-app';

        $user->tokens()->where('name', $deviceName)->delete();
        $token = $user->createToken($deviceName, ['mobile'])->plainTextToken;

        $employee = Employee::with('company:id,name')
            ->where('user_id', $user->id)
            ->first();

        return response()->json([
            'message' => 'Login berhasil.',
            'data' => [
                'token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
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
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $employee = Employee::with('company:id,name')
            ->where('user_id', $user->id)
            ->first();

        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'has_employee_profile' => $employee !== null,
                'employee' => $employee
                    ? [
                        'id' => $employee->id,
                        'employee_code' => $employee->employee_code,
                        'company' => $employee->company?->name,
                    ]
                    : null,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->user()?->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }
}
