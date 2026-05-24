# Arkana HR Final Perusahaan

Human Resource Information System (HRIS) berbasis Laravel 12 + Inertia + React untuk kebutuhan web HR dan API mobile employee.

## 1) Tech Stack
- Backend: Laravel 12, PHP 8.2+, Sanctum, Fortify
- Frontend: Inertia.js, React 19, TypeScript, Vite, Tailwind CSS
- Database: MySQL (default pengembangan bisa SQLite)
- Testing: Pest (Feature + API)
- File: Laravel Filesystem (private/local storage untuk data sensitif)

## 2) Fitur Utama
- Manajemen master data HR (company, branch, department, position, shift, schedule, dll)
- Employee lifecycle (create/update/deactivate/restore)
- Attendance GPS + selfie + approval
- Leave, overtime, reimbursement dengan approval
- Payroll period + payslip management
- Contract, employee documents, dan asset assignment
- Notification center + audit logs
- Mobile API `/api/v1` untuk employee self-service

## 3) Role User
- `superadmin`: akses penuh lintas company
- `admin`: akses data sesuai scope company/branch/department
- `manager`: akses data bawahan sesuai relasi manager
- `employee`: akses data milik sendiri

## 4) Instalasi
```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
```

## 5) Setup Environment
Konfigurasi minimum `.env`:
```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hr_web_laravel
DB_USERNAME=root
DB_PASSWORD=
```

Konfigurasi HR baru (opsional, sudah ada default):
```env
HR_ATTENDANCE_EARLY_CHECKIN_LIMIT_MINUTES=30
HR_ATTENDANCE_ALLOW_EARLY_CHECKOUT=true
HR_ATTENDANCE_REQUIRE_SCHEDULE=true
HR_ATTENDANCE_ALLOW_FALLBACK_WORK_LOCATION=false
HR_ATTENDANCE_ENFORCE_GEOFENCE=true
HR_OVERTIME_MIN_MINUTES=30
HR_OVERTIME_MAX_MINUTES=360
HR_MOBILE_LOGIN_RATE_LIMIT_PER_MINUTE=5
HR_PAYROLL_ONLY_ACTIVE_EMPLOYEE=true
```

## 6) Migrasi & Seed
```bash
php artisan migrate
php artisan db:seed
```

Demo account (jika `SEED_DEMO_DATA=true`):
- `superadmin@hr.com` / `password`
- `admin@hr.com` / `password`
- `employee@hr.com` / `password`

## 7) Menjalankan Aplikasi
```bash
php artisan serve
npm run dev
```

## 8) Quality Check
```bash
php artisan test
npm run build
npm run lint
npm run types
npm run format
```

## 9) Struktur Folder Penting
- `app/Http/Controllers` - controller web + API
- `app/Services` - business/service layer
- `app/Models` - model Eloquent
- `database/migrations` - skema database
- `resources/js/pages` - halaman Inertia React
- `routes/web.php` - web routes
- `routes/api.php` - API routes `/api/v1`
- `tests/Feature` - test integrasi/fitur
- `docs/` - dokumentasi teknis dan bisnis

## 10) Integrasi HR Mobile
- Semua endpoint mobile berada di prefix `/api/v1`
- Auth menggunakan Sanctum token bearer
- Login membutuhkan `device_name`, mendukung `device_id`
- Endpoint detail ada di [docs/api-mobile.md](docs/api-mobile.md)

## 11) Catatan Keamanan File
- File sensitif disimpan pada private disk (`storage/app/private`)
- Akses file melalui endpoint secure (`/secure-files/...` / `/api/v1/secure-files/...`)
- Validasi scope + ownership diterapkan sebelum file ditampilkan

## 12) Dokumentasi Tambahan
- API mobile: [docs/api-mobile.md](docs/api-mobile.md)
- Alur bisnis HR: [docs/hr-business-flows.md](docs/hr-business-flows.md)
- Ringkasan hardening keamanan: [docs/security-notes.md](docs/security-notes.md)
