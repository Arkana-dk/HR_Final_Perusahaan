<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\UserDevice;
use App\Services\AuditLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeviceController extends Controller
{
    use ApiResponse;

    public function __construct(
        private readonly AuditLogService $auditLogService,
    ) {
    }

    public function index(Request $request)
    {
        $devices = UserDevice::query()
            ->where('user_id', $request->user()->id)
            ->orderByDesc('last_seen_at')
            ->orderByDesc('id')
            ->get()
            ->map(fn (UserDevice $device) => $this->mapDevice($device))
            ->values()
            ->all();

        return $this->successResponse($devices, 'Daftar device berhasil diambil.');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'platform' => ['required', 'string', 'max:20'],
            'device_name' => ['nullable', 'string', 'max:120'],
            'device_id' => ['nullable', 'string', 'max:191'],
            'push_token' => ['required', 'string', 'max:255'],
        ]);

        $userId = (int) $request->user()->id;
        $before = null;
        $device = null;

        DB::transaction(function () use ($data, $userId, &$before, &$device) {
            $existing = UserDevice::query()
                ->where('push_token', $data['push_token'])
                ->first();

            $before = $existing?->toArray();
            if ($existing) {
                $existing->update([
                    'user_id' => $userId,
                    'platform' => strtolower(trim((string) $data['platform'])),
                    'device_name' => $data['device_name'] ?? null,
                    'device_id' => $data['device_id'] ?? null,
                    'is_active' => true,
                    'last_seen_at' => now(),
                ]);
                $device = $existing->fresh();
            } else {
                $device = UserDevice::query()->create([
                    'user_id' => $userId,
                    'push_token' => $data['push_token'],
                    'platform' => strtolower(trim((string) $data['platform'])),
                    'device_name' => $data['device_name'] ?? null,
                    'device_id' => $data['device_id'] ?? null,
                    'is_active' => true,
                    'last_seen_at' => now(),
                ]);
            }
        });

        $this->auditLogService->fromRequest($request, 'user_devices', 'device.register', [
            'subject' => 'user_device',
            'reference_type' => $device::class,
            'reference_id' => $device->id,
            'notes' => 'Device mobile terdaftar.',
            'before_data' => $before,
            'after_data' => $device->toArray(),
        ]);

        return $this->successResponse(
            $this->mapDevice($device),
            'Device berhasil didaftarkan.',
            201,
        );
    }

    public function unregister(Request $request)
    {
        $data = $request->validate([
            'push_token' => ['required', 'string', 'max:255'],
        ]);

        $device = UserDevice::query()
            ->where('user_id', $request->user()->id)
            ->where('push_token', $data['push_token'])
            ->first();

        if (!$device) {
            return $this->errorResponse('Device tidak ditemukan.', [
                'push_token' => ['Device tidak ditemukan.'],
            ], 404);
        }

        $before = $device->toArray();
        $device->update([
            'is_active' => false,
            'last_seen_at' => now(),
        ]);

        $this->auditLogService->fromRequest($request, 'user_devices', 'device.unregister', [
            'subject' => 'user_device',
            'reference_type' => $device::class,
            'reference_id' => $device->id,
            'notes' => 'Device mobile dinonaktifkan.',
            'before_data' => $before,
            'after_data' => $device->toArray(),
        ]);

        return $this->successResponse(
            $this->mapDevice($device),
            'Device berhasil dinonaktifkan.',
        );
    }

    private function mapDevice(UserDevice $device): array
    {
        return [
            'id' => $device->id,
            'platform' => $device->platform,
            'device_name' => $device->device_name,
            'device_id' => $device->device_id,
            'push_token' => $device->push_token,
            'is_active' => (bool) $device->is_active,
            'last_seen_at' => optional($device->last_seen_at)?->toDateTimeString(),
        ];
    }
}
