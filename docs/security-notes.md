# Security Notes

## Private Storage Policy
- File sensitif tidak disimpan di `public`.
- Semua upload sensitif disimpan di private disk (`storage/app/private`) melalui `FileStorageService`.
- Akses file dilakukan lewat controller secure file endpoint.

## Scope Authorization
- Middleware role + `ScopeAuthorizationService` memastikan akses berbasis role dan scope.
- Scope mencakup company/branch/department serta relasi manager-subordinate.

## API Authentication
- Mobile API menggunakan Sanctum personal access token.
- Login membutuhkan `device_name` dan mendukung `device_id`.
- Token lama untuk device sama dapat direvoke saat login ulang.

## Brute Force Protection
- Endpoint login mobile menggunakan rate limiter (`mobile-login`).
- Response throttle menggunakan format JSON standar API.

## Attendance Security
- Validasi geofence wajib.
- Shift malam didukung via open session checkout.
- Early leave policy configurable.

## Audit Logging
- Aksi penting (employee, attendance approval, leave/overtime/reimburse approval, payroll, document, asset, auth event tertentu) dicatat di `audit_logs`.
- Mencatat: user_id, action, module, target, before/after, IP, user-agent, timestamp.

## Remaining Hardening Suggestions
- Tambahkan enkripsi file at-rest jika regulasi perusahaan mewajibkan.
- Tambahkan SIEM/export audit pipeline untuk monitoring terpusat.
- Tambahkan signed URL/temporary URL strategy bila memakai object storage (S3).
