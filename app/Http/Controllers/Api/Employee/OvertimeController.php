<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Api\Concerns\ResolvesEmployee;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\OvertimeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OvertimeController extends Controller
{
    use ResolvesEmployee;

    public function index(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $filters = $request->validate([
            'status' => ['nullable', 'string', 'max:30'],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = OvertimeRequest::with('approvedBy:id,name')
            ->where('employee_id', $employee->id)
            ->orderByDesc('work_date')
            ->orderByDesc('id');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['from'])) {
            $query->whereDate('work_date', '>=', $filters['from']);
        }

        if (!empty($filters['to'])) {
            $query->whereDate('work_date', '<=', $filters['to']);
        }

        $perPage = (int) ($filters['per_page'] ?? 10);
        $requests = $query->paginate($perPage)->withQueryString();

        return response()->json([
            'data' => $requests->getCollection()
                ->map(fn (OvertimeRequest $item) => $this->mapRequest($item))
                ->values()
                ->all(),
            'meta' => [
                'current_page' => $requests->currentPage(),
                'last_page' => $requests->lastPage(),
                'per_page' => $requests->perPage(),
                'total' => $requests->total(),
            ],
        ]);
    }

    public function show(Request $request, OvertimeRequest $overtimeRequest)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $overtimeRequest);
        $overtimeRequest->load('approvedBy:id,name');

        return response()->json([
            'data' => $this->mapRequest($overtimeRequest),
        ]);
    }

    public function store(Request $request)
    {
        $employee = $this->resolveEmployee($request);
        $data = $request->validate([
            'work_date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i'],
            'reason' => ['nullable', 'string', 'max:1000'],
        ]);

        $start = Carbon::parse($data['work_date'].' '.$data['start_time']);
        $end = Carbon::parse($data['work_date'].' '.$data['end_time']);

        if ($end->lessThanOrEqualTo($start)) {
            $end->addDay();
        }

        $totalHours = round($start->diffInMinutes($end) / 60, 2);

        $overtime = null;
        DB::transaction(function () use (&$overtime, $employee, $data, $totalHours) {
            $overtime = OvertimeRequest::create([
                'employee_id' => $employee->id,
                'work_date' => $data['work_date'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
                'total_hours' => $totalHours,
                'reason' => $data['reason'] ?? null,
                'status' => 'pending',
                'requested_at' => now(),
            ]);
        });

        return response()->json([
            'message' => 'Pengajuan lembur berhasil dikirim.',
            'data' => $this->mapRequest($overtime),
        ], 201);
    }

    public function cancel(Request $request, OvertimeRequest $overtimeRequest)
    {
        $employee = $this->resolveEmployee($request);
        $this->assertOwnedByEmployee($employee, $overtimeRequest);

        if ($overtimeRequest->status !== 'pending') {
            throw ValidationException::withMessages([
                'status' => 'Hanya pengajuan pending yang dapat dibatalkan.',
            ]);
        }

        $overtimeRequest->update([
            'status' => 'cancelled',
        ]);

        return response()->json([
            'message' => 'Pengajuan lembur dibatalkan.',
            'data' => $this->mapRequest($overtimeRequest),
        ]);
    }

    private function assertOwnedByEmployee(Employee $employee, OvertimeRequest $request): void
    {
        if ((int) $request->employee_id !== (int) $employee->id) {
            abort(404);
        }
    }

    private function mapRequest(OvertimeRequest $request): array
    {
        return [
            'id' => $request->id,
            'work_date' => optional($request->work_date)->toDateString(),
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'total_hours' => (float) $request->total_hours,
            'status' => $request->status,
            'reason' => $request->reason,
            'approval_notes' => $request->approval_notes,
            'requested_at' => optional($request->requested_at)?->toDateTimeString(),
            'approved_at' => optional($request->approved_at)?->toDateTimeString(),
            'approved_by' => $request->approvedBy?->name,
        ];
    }
}
