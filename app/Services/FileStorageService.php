<?php

namespace App\Services;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FileStorageService
{
    public function storePrivate(
        UploadedFile $file,
        string $directory,
    ): string {
        return $file->store($directory, $this->privateDiskName());
    }

    public function downloadPrivate(string $path, ?string $downloadName = null): StreamedResponse
    {
        return $this->privateDisk()->download($path, $downloadName);
    }

    public function streamPrivate(string $path, ?string $fileName = null, array $headers = []): StreamedResponse
    {
        $disk = $this->privateDisk();
        $mime = $disk->mimeType($path) ?: 'application/octet-stream';
        $size = $disk->size($path);
        $name = $fileName ?: basename($path);

        $disposition = sprintf('inline; filename="%s"', str_replace('"', '', $name));

        return response()->stream(function () use ($disk, $path) {
            $stream = $disk->readStream($path);
            if ($stream === false) {
                return;
            }

            fpassthru($stream);
            fclose($stream);
        }, 200, array_merge([
            'Content-Type' => $mime,
            'Content-Disposition' => $disposition,
            'Content-Length' => (string) $size,
            'Cache-Control' => 'private, max-age=60',
        ], $headers));
    }

    public function existsPrivate(string $path): bool
    {
        return $this->privateDisk()->exists($path);
    }

    public function deletePrivate(?string $path): void
    {
        if (!$path) {
            return;
        }

        if ($this->privateDisk()->exists($path)) {
            $this->privateDisk()->delete($path);
        }
    }

    public function generateSensitivePath(string $module, int|string $subjectId, string $originalName): string
    {
        $safeModule = trim(str_replace(['\\', '..'], ['/', ''], $module), '/');
        $name = trim(str_replace(['\\', '..'], ['_', ''], $originalName));

        return sprintf('%s/%s/%s', $safeModule, $subjectId, $name);
    }

    private function privateDiskName(): string
    {
        return 'local';
    }

    private function privateDisk(): Filesystem
    {
        return Storage::disk($this->privateDiskName());
    }
}
