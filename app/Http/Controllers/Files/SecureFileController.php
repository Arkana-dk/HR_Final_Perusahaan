<?php

namespace App\Http\Controllers\Files;

use App\Http\Controllers\Controller;
use App\Models\AttendanceCorrection;
use App\Models\AttendancePhoto;
use App\Models\EmployeeContract;
use App\Models\EmployeeDocument;
use App\Models\LeaveRequest;
use App\Models\ReimburseRequest;
use App\Services\FileStorageService;
use App\Services\ScopeAuthorizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SecureFileController extends Controller
{
    public function __construct(
        private readonly ScopeAuthorizationService $scopeAuthorizationService,
        private readonly FileStorageService $fileStorageService,
    ) {
    }

    public function attendancePhoto(Request $request, AttendancePhoto $photo)
    {
        $photo->loadMissing('attendanceLog.employee');
        $employee = $photo->attendanceLog?->employee;
        abort_unless($employee, 404);

        abort_unless(
            $this->scopeAuthorizationService->canAccessEmployee($request->user(), $employee),
            403,
            'Anda tidak berhak melihat foto presensi ini.',
        );

        return $this->streamSensitivePath($photo->file_path);
    }

    public function employeeDocument(Request $request, EmployeeDocument $document)
    {
        $document->loadMissing('employee');
        abort_unless(
            $this->scopeAuthorizationService->canAccessEmployee($request->user(), $document->employee),
            403,
            'Anda tidak berhak melihat dokumen ini.',
        );

        return $this->streamSensitivePath($document->file_path);
    }

    public function employeeContract(Request $request, EmployeeContract $contract)
    {
        $contract->loadMissing('employee');
        abort_unless(
            $this->scopeAuthorizationService->canAccessEmployee($request->user(), $contract->employee),
            403,
            'Anda tidak berhak melihat kontrak ini.',
        );

        return $this->streamSensitivePath($contract->file_path);
    }

    public function leaveAttachment(Request $request, LeaveRequest $leaveRequest)
    {
        $leaveRequest->loadMissing('employee');
        abort_unless(
            $this->scopeAuthorizationService->canAccessEmployee($request->user(), $leaveRequest->employee),
            403,
            'Anda tidak berhak melihat lampiran cuti ini.',
        );

        return $this->streamSensitivePath($leaveRequest->attachment_path);
    }

    public function reimburseAttachment(Request $request, ReimburseRequest $reimburseRequest)
    {
        $reimburseRequest->loadMissing('employee');
        abort_unless(
            $this->scopeAuthorizationService->canAccessEmployee($request->user(), $reimburseRequest->employee),
            403,
            'Anda tidak berhak melihat lampiran reimburse ini.',
        );

        return $this->streamSensitivePath($reimburseRequest->attachment_path);
    }

    public function attendanceCorrectionAttachment(Request $request, AttendanceCorrection $attendanceCorrection)
    {
        $attendanceCorrection->loadMissing('employee');
        abort_unless(
            $this->scopeAuthorizationService->canAccessEmployee($request->user(), $attendanceCorrection->employee),
            403,
            'Anda tidak berhak melihat lampiran koreksi presensi ini.',
        );

        return $this->streamSensitivePath($attendanceCorrection->attachment_path);
    }

    private function streamSensitivePath(?string $path)
    {
        abort_if(!$path, 404);

        if ($this->fileStorageService->existsPrivate($path)) {
            return $this->fileStorageService->streamPrivate($path, basename($path));
        }

        // Backward compatibility for legacy files already stored in public disk.
        if (Storage::disk('public')->exists($path)) {
            return response()->stream(function () use ($path) {
                $stream = Storage::disk('public')->readStream($path);
                if ($stream === false) {
                    return;
                }

                fpassthru($stream);
                fclose($stream);
            }, 200, [
                'Content-Type' => Storage::disk('public')->mimeType($path) ?: 'application/octet-stream',
                'Content-Disposition' => sprintf('inline; filename="%s"', basename($path)),
                'Cache-Control' => 'private, max-age=60',
            ]);
        }

        abort(404);
    }
}
