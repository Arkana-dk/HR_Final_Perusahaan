# API Mobile HRIS (`/api/v1`)

## Base URL
- Local: `http://localhost:8000/api/v1`

## Auth
- Gunakan header `Authorization: Bearer {token}` untuk endpoint yang memerlukan login.
- Login membutuhkan `device_name`, opsional `device_id`.

## Response Standard

### Success
```json
{
  "success": true,
  "message": "Pesan response",
  "data": {}
}
```

### Error
```json
{
  "success": false,
  "message": "Pesan error",
  "errors": {}
}
```

## Endpoint

## 1) Auth

### POST `/auth/login`
Request:
```json
{
  "email": "employee@hr.com",
  "password": "password",
  "device_name": "android-john",
  "device_id": "android-123"
}
```

### POST `/auth/logout`
- Revoke token aktif.

### GET `/auth/me`
- Profil user login + employee profile availability.

## 2) Employee Dashboard

### GET `/employee/dashboard`
- Ringkasan attendance, leave/overtime/reimburse pending, notif unread.

## 3) Attendance

### GET `/employee/attendance/today`
- Data shift, work location, open log, can_check_in/out.

### GET `/employee/attendance/history`
Query opsional: `from`, `to`, `status`, `approval_status`, `per_page`

### POST `/employee/attendance/check-in`
Request form-data:
- `latitude` (required)
- `longitude` (required)
- `photo` (required image)
- `device_id` (optional)

Validasi penting:
- Jadwal kerja wajib (configurable)
- Radius GPS wajib
- Batas check-in terlalu awal
- Ditolak jika ada cuti approved di tanggal tersebut

### POST `/employee/attendance/check-out`
Request form-data:
- `latitude` (required)
- `longitude` (required)
- `photo` (required image)
- `device_id` (optional)
- `early_leave_reason` (required jika pulang sebelum shift berakhir)

Validasi penting:
- Cari sesi check-in terbuka terakhir (mendukung shift malam)
- Validasi radius GPS
- Kebijakan early checkout configurable

## 4) Leave

### GET `/employee/leave/requests`
### GET `/employee/leave/requests/{id}`
### POST `/employee/leave/requests`
### POST `/employee/leave/requests/{id}/cancel`

## 5) Overtime

### GET `/employee/overtime/requests`
### GET `/employee/overtime/requests/{id}`
### POST `/employee/overtime/requests`
### POST `/employee/overtime/requests/{id}/cancel`

Validasi penting:
- Harus pada hari kerja terjadwal
- Tidak boleh bentrok cuti approved
- Batas minimum/maksimum menit lembur

## 6) Reimbursements

Primary endpoint:
- `GET /employee/reimbursements`
- `POST /employee/reimbursements`
- `GET /employee/reimbursements/{id}`
- `POST /employee/reimbursements/{id}/cancel`

Compatibility endpoint lama masih ada:
- `/employee/reimburse/requests`

## 7) Payslips

### GET `/employee/payslips`
### GET `/employee/payslips/{id}`
### GET `/employee/payslips/{id}/download`

Ownership enforced: employee hanya bisa akses payslip miliknya.

## 8) Secure Files

- `GET /secure-files/attendance-photos/{id}`
- `GET /secure-files/documents/{id}`
- `GET /secure-files/contracts/{id}`
- `GET /secure-files/leave-attachments/{id}`
- `GET /secure-files/reimburse-attachments/{id}`
- `GET /secure-files/attendance-correction-attachments/{id}`

Semua endpoint secure-files memakai auth + scope/ownership checks.

## 9) Approvals (Manager/Admin/Superadmin)

### GET `/approvals/pending`
### POST `/approvals/{type}/{id}/approve`
### POST `/approvals/{type}/{id}/reject`

Untuk reject, `notes` wajib.

## 10) Rate Limit

- Login endpoint memakai throttle (`mobile-login`) untuk mencegah brute-force.
- Saat limit terlampaui akan mengembalikan HTTP 429 dengan payload JSON standar.
