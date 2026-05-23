<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('roles')) {
            return;
        }

        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_system')->default(true);
            $table->timestamps();
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('permission_role', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained()->cascadeOnDelete();
            $table->foreignId('permission_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['role_id', 'permission_id']);
        });

        Schema::create('role_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['role_id', 'user_id']);
        });

        $now = now();

        DB::table('roles')->insert([
            ['name' => 'Super Admin', 'slug' => 'superadmin', 'description' => 'Akses penuh seluruh sistem', 'is_system' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'HR Admin', 'slug' => 'admin', 'description' => 'Akses operasional HR', 'is_system' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Manager', 'slug' => 'manager', 'description' => 'Approval bawahan dan monitoring tim', 'is_system' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Karyawan', 'slug' => 'employee', 'description' => 'Akses self-service karyawan', 'is_system' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);

        $permissions = [
            ['name' => 'Kelola Karyawan', 'slug' => 'employees.manage'],
            ['name' => 'Lihat Karyawan', 'slug' => 'employees.view'],
            ['name' => 'Kelola Presensi', 'slug' => 'attendance.manage'],
            ['name' => 'Lihat Presensi', 'slug' => 'attendance.view'],
            ['name' => 'Kelola Cuti', 'slug' => 'leave.manage'],
            ['name' => 'Lihat Cuti', 'slug' => 'leave.view'],
            ['name' => 'Kelola Lembur', 'slug' => 'overtime.manage'],
            ['name' => 'Lihat Lembur', 'slug' => 'overtime.view'],
            ['name' => 'Kelola Reimburse', 'slug' => 'reimburse.manage'],
            ['name' => 'Lihat Reimburse', 'slug' => 'reimburse.view'],
            ['name' => 'Approval Request', 'slug' => 'approval.process'],
            ['name' => 'Kelola Jadwal', 'slug' => 'schedules.manage'],
            ['name' => 'Lihat Dashboard HR', 'slug' => 'dashboard.hr.view'],
            ['name' => 'Kelola Pengumuman', 'slug' => 'announcements.manage'],
            ['name' => 'Lihat Laporan', 'slug' => 'reports.view'],
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->insert([
                ...$permission,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $roleIds = DB::table('roles')->pluck('id', 'slug');
        $permissionIds = DB::table('permissions')->pluck('id', 'slug');

        $rolePermissionMap = [
            'superadmin' => array_keys($permissionIds->toArray()),
            'admin' => [
                'employees.manage',
                'employees.view',
                'attendance.manage',
                'attendance.view',
                'leave.manage',
                'leave.view',
                'overtime.manage',
                'overtime.view',
                'reimburse.manage',
                'reimburse.view',
                'approval.process',
                'schedules.manage',
                'dashboard.hr.view',
                'announcements.manage',
                'reports.view',
            ],
            'manager' => [
                'employees.view',
                'attendance.view',
                'leave.view',
                'overtime.view',
                'reimburse.view',
                'approval.process',
                'dashboard.hr.view',
                'reports.view',
            ],
            'employee' => [
                'attendance.view',
                'leave.view',
                'overtime.view',
                'reimburse.view',
            ],
        ];

        foreach ($rolePermissionMap as $roleSlug => $permissionSlugs) {
            $roleId = $roleIds[$roleSlug] ?? null;
            if (!$roleId) {
                continue;
            }

            foreach ($permissionSlugs as $permissionSlug) {
                $permissionId = $permissionIds[$permissionSlug] ?? null;
                if (!$permissionId) {
                    continue;
                }

                DB::table('permission_role')->insert([
                    'role_id' => $roleId,
                    'permission_id' => $permissionId,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }

        $userRoleMap = [
            'superadmin' => 'superadmin',
            'admin' => 'admin',
            'manager' => 'manager',
            'employee' => 'employee',
        ];

        $users = DB::table('users')->select(['id', 'role'])->get();
        foreach ($users as $user) {
            $slug = $userRoleMap[$user->role] ?? 'employee';
            $roleId = $roleIds[$slug] ?? null;
            if (!$roleId) {
                continue;
            }

            DB::table('role_user')->insert([
                'role_id' => $roleId,
                'user_id' => $user->id,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_user');
        Schema::dropIfExists('permission_role');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
    }
};
