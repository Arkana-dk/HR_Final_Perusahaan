<?php

namespace App\Http\Controllers\Time;

use App\Http\Controllers\Controller;
use App\Models\OvertimeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OvertimeController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'status' => $request->string('status')->toString(),
            'date' => $request->string('date')->toString(),
        ];

        $query = OvertimeRequest::with([
            'employee.user:id,name,email',
            'approvedBy:id,name',
        ]);

        if ($filters['search'] !== '') {
            $search = $filters['search'];
            $query->whereHas('employee', function ($employeeQuery) use ($search) {
                $employeeQuery
                    ->where('employee_code', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        if ($filters['status'] !== '') {
            $query->where('status', $filters['status']);
        }

        if ($filters['date'] !== '') {
            $query->whereDate('work_date', $filters['date']);
        }

        $requests = $query
            ->orderByDesc('work_date')
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        $stats = [
            'total' => OvertimeRequest::count(),
            'pending' => OvertimeRequest::where('status', 'pending')->count(),
            'approved' => OvertimeRequest::where('status', 'approved')->count(),
            'rejected' => OvertimeRequest::where('status', 'rejected')->count(),
        ];

        return Inertia::render('overtime/index', [
            'requests' => $requests,
            'filters' => $filters,
            'stats' => $stats,
        ]);
    }

    public function approve(Request $request, OvertimeRequest $overtime)
    {
        DB::transaction(function () use ($overtime, $request) {
            if ($overtime->status !== 'pending') {
                return;
            }

            $overtime->loadMissing('employee:id,user_id');
            if ((int) ($overtime->employee?->user_id ?? 0) === (int) $request->user()->id) {
                abort(403, 'Anda tidak dapat meng-approve pengajuan lembur Anda sendiri.');
            }

            $overtime->update([
                'status' => 'approved',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
            ]);
        });

        return back();
    }

    public function reject(Request $request, OvertimeRequest $overtime)
    {
        DB::transaction(function () use ($overtime, $request) {
            if ($overtime->status !== 'pending') {
                return;
            }

            $overtime->loadMissing('employee:id,user_id');
            if ((int) ($overtime->employee?->user_id ?? 0) === (int) $request->user()->id) {
                abort(403, 'Anda tidak dapat meng-approve pengajuan lembur Anda sendiri.');
            }

            $overtime->update([
                'status' => 'rejected',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
                'approval_notes' => $request->string('notes')->toString() ?: $overtime->approval_notes,
            ]);
        });

        return back();
    }
}
