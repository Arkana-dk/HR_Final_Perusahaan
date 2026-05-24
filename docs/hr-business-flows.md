# HR Business Flows

Dokumen ini menjelaskan alur bisnis utama HRIS agar konsisten antara web HR dan mobile employee.

## 1) Alur Presensi
1. Employee membuka attendance today.
2. Sistem validasi status karyawan aktif.
3. Sistem validasi jadwal kerja (kecuali konfigurasi khusus menonaktifkan).
4. Sistem validasi cuti approved di tanggal yang sama.
5. Saat check-in/check-out: sistem hitung jarak GPS ke work location.
6. Jika di luar `radius_meters`, presensi ditolak.
7. Check-in dibatasi maksimum X menit sebelum shift (default 30).
8. Check-out mencari open session terakhir (mendukung shift malam lintas hari).
9. Jika check-out sebelum shift selesai:
   - ditolak jika early checkout tidak diizinkan,
   - atau disimpan sebagai early leave pending approval.

## 2) Alur Cuti
1. Employee submit leave request.
2. Sistem validasi overlap request, leave type aktif, attachment bila wajib.
3. Approval flow dibuat (multi-step ready).
4. Approver menerima notifikasi.
5. Approve/reject menghasilkan notifikasi ke employee.
6. Reject wajib menyertakan alasan.

## 3) Alur Overtime
1. Employee submit overtime request.
2. Validasi: harus di hari kerja terjadwal, tidak bentrok cuti approved, dan durasi dalam batas min/max.
3. Overtime tidak otomatis approved hanya karena check-out lebih lama.
4. Overtime masuk jalur approval.

## 4) Alur Reimbursement
1. Employee submit reimburse request + attachment (private file).
2. Status awal pending.
3. Approver melakukan approve/reject.
4. Reject wajib alasan, hasilnya dikirim ke employee via notification.

## 5) Alur Payroll
1. HR/Superadmin generate payslip per period.
2. Payroll reguler hanya untuk employee aktif (configurable guard).
3. Publikasi payslip dicatat ke audit log.
4. Employee hanya bisa melihat payslip milik sendiri.

## 6) Alur Approval
1. Request dibuat oleh employee.
2. Approval dibaca berdasarkan role + scope (company/branch/department/manager-subordinate).
3. Superadmin global akses, admin scoped, manager untuk bawahan.
4. Aksi approval/reject dicatat ke audit log + notifikasi.

## 7) Alur Asset
1. Asset dapat assigned ke employee aktif.
2. Asset assigned tidak boleh langsung dihapus.
3. Perubahan assignment mengikuti flow assigned/returned/transferred/lost/damaged/inactive.
4. Histori assignment disimpan pada `asset_assignment_histories`.

## 8) Alur Kontrak
1. Kontrak disimpan sebagai file private.
2. Contract index menyediakan indikator expiring H-30/H-14/H-7.
3. Filter reminder tersedia untuk memudahkan action HR.

## 9) Alur Dokumen
1. Dokumen employee disimpan di private storage.
2. Mendukung expiry date dan filter expired/expiring.
3. Endpoint secure file membatasi akses berdasarkan ownership/scope.

## 10) Audit & Observability
- Aksi penting dicatat pada audit log dengan metadata actor, before/after, IP, user-agent.
- Notifikasi internal disimpan sebagai database notification untuk integrasi lanjutan (email/push/mobile).
