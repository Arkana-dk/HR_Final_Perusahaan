<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\ReimburseRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReimburseController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'search' => $request->string('search')->toString(),
            'status' => $request->string('status')->toString(),
            'date' => $request->string('date')->toString(),
        ];

        $query = ReimburseRequest::with([
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
            $query->whereDate('requested_at', $filters['date']);
        }

        $requests = $query
            ->orderByDesc('requested_at')
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        $stats = [
            'total' => ReimburseRequest::count(),
            'pending' => ReimburseRequest::where('status', 'pending')->count(),
            'approved' => ReimburseRequest::where('status', 'approved')->count(),
            'rejected' => ReimburseRequest::where('status', 'rejected')->count(),
        ];

        return Inertia::render('reimburse/index', [
            'requests' => $requests,
            'filters' => $filters,
            'stats' => $stats,
        ]);
    }

    public function approve(Request $request, ReimburseRequest $reimburse)
    {
        DB::transaction(function () use ($reimburse, $request) {
            if ($reimburse->status !== 'pending') {
                return;
            }

            $reimburse->loadMissing('employee:id,user_id');
            if ((int) ($reimburse->employee?->user_id ?? 0) === (int) $request->user()->id) {
                abort(403, 'Anda tidak dapat meng-approve pengajuan reimburse Anda sendiri.');
            }

            $reimburse->update([
                'status' => 'approved',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
            ]);
        });

        return back();
    }

    public function reject(Request $request, ReimburseRequest $reimburse)
    {
        DB::transaction(function () use ($reimburse, $request) {
            if ($reimburse->status !== 'pending') {
                return;
            }

            $reimburse->loadMissing('employee:id,user_id');
            if ((int) ($reimburse->employee?->user_id ?? 0) === (int) $request->user()->id) {
                abort(403, 'Anda tidak dapat meng-approve pengajuan reimburse Anda sendiri.');
            }

            $reimburse->update([
                'status' => 'rejected',
                'approved_by_user_id' => $request->user()->id,
                'approved_at' => now(),
                'approval_notes' => $request->string('notes')->toString() ?: $reimburse->approval_notes,
            ]);
        });

        return back();
    }
}
