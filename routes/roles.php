<?php

use App\Http\Controllers\SuperAdmin\DashboardController as SuperAdminDashboard;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Employee\DashboardController as EmployeeDashboard;

// Super Admin Routes
Route::middleware(['auth', 'role:superadmin'])->prefix('superadmin')->group(function () {
    Route::get('/dashboard', [SuperAdminDashboard::class, 'index'])->name('superadmin.dashboard');
});

// Admin Routes
Route::middleware(['auth', 'role:admin,superadmin,manager'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboard::class, 'index'])->name('admin.dashboard');
});

// Employee Routes
Route::middleware(['auth', 'role:employee,admin,superadmin,manager'])->prefix('employee')->group(function () {
    Route::get('/dashboard', [EmployeeDashboard::class, 'index'])->name('employee.dashboard');
});
