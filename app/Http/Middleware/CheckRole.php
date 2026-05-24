<?php

namespace App\Http\Middleware;

use App\Models\AttendanceCorrection;
use App\Models\AttendanceLog;
use App\Models\Employee;
use App\Models\EmployeeContract;
use App\Models\EmployeeDocument;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use App\Models\Payslip;
use App\Models\ReimburseRequest;
use App\Services\ScopeAuthorizationService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!$request->user()) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated.',
                    'data' => null,
                    'errors' => [
                        'auth' => ['Unauthenticated.'],
                    ],
                ], 401);
            }

            return redirect()->route('login');
        }

        $normalized = $this->normalizeRoles($roles);
        if (!$request->user()->hasAnyRole($normalized)) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access.',
                    'data' => null,
                    'errors' => [
                        'authorization' => ['Unauthorized access.'],
                    ],
                ], 403);
            }

            abort(403, 'Unauthorized access.');
        }

        if ((bool) ($request->user()->is_active ?? true) === false) {
            Auth::logout();

            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Akun tidak aktif.',
                    'data' => null,
                    'errors' => [
                        'auth' => ['Akun tidak aktif. Hubungi HR/administrator.'],
                    ],
                ], 403);
            }

            return redirect()->route('login')->with('error', 'Akun Anda tidak aktif.');
        }

        $scopeService = app(ScopeAuthorizationService::class);
        foreach ($request->route()?->parameters() ?? [] as $parameter) {
            if (!$parameter instanceof Employee
                && !$parameter instanceof LeaveRequest
                && !$parameter instanceof OvertimeRequest
                && !$parameter instanceof ReimburseRequest
                && !$parameter instanceof AttendanceLog
                && !$parameter instanceof AttendanceCorrection
                && !$parameter instanceof Payslip
                && !$parameter instanceof EmployeeDocument
                && !$parameter instanceof EmployeeContract
            ) {
                continue;
            }

            if (!$scopeService->canAccessModel($request->user(), $parameter)) {
                if ($request->expectsJson() || $request->is('api/*')) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Akses data lintas scope tidak diizinkan.',
                        'data' => null,
                        'errors' => [
                            'authorization' => ['Akses data lintas scope tidak diizinkan.'],
                        ],
                    ], 403);
                }

                abort(403, 'Akses data lintas scope tidak diizinkan.');
            }
        }

        return $next($request);
    }

    /**
     * @param  string[]  $roles
     * @return string[]
     */
    private function normalizeRoles(array $roles): array
    {
        $map = [
            'hr-admin' => 'admin',
            'hr_admin' => 'admin',
            'super-admin' => 'superadmin',
            'super_admin' => 'superadmin',
            'atasan' => 'manager',
            'manager' => 'manager',
        ];

        return collect($roles)
            ->map(fn ($role) => $map[$role] ?? $role)
            ->unique()
            ->values()
            ->all();
    }
}
