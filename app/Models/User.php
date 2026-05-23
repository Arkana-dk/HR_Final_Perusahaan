<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    public function employee()
    {
        return $this->hasOne(Employee::class);
    }

    public function approvalsRequested()
    {
        return $this->hasMany(Approval::class, 'requested_by_user_id');
    }

    public function approvalSteps()
    {
        return $this->hasMany(ApprovalStep::class, 'approver_user_id');
    }

    public function approvedAttendanceLogs()
    {
        return $this->hasMany(AttendanceLog::class, 'approved_by_user_id');
    }

    public function approvedLeaveRequests()
    {
        return $this->hasMany(LeaveRequest::class, 'approved_by_user_id');
    }

    public function hrNotifications()
    {
        return $this->hasMany(SystemNotification::class, 'user_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function devices()
    {
        return $this->hasMany(UserDevice::class);
    }

    public function announcementsCreated()
    {
        return $this->hasMany(Announcement::class, 'created_by_user_id');
    }

    public function hasRole(string $role): bool
    {
        $normalizedRole = match ($role) {
            'super_admin', 'super-admin' => 'superadmin',
            'hr_admin', 'hr-admin' => 'admin',
            'atasan' => 'manager',
            default => $role,
        };

        if ($this->role === $normalizedRole) {
            return true;
        }

        if (!$this->relationLoaded('roles')) {
            $this->load('roles:id,slug');
        }

        return $this->roles->contains(fn ($item) => $item->slug === $normalizedRole);
    }

    /**
     * @param  string[]  $roles
     */
    public function hasAnyRole(array $roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }

        return false;
    }

    public function hasPermission(string $permission): bool
    {
        if ($this->hasRole('superadmin')) {
            return true;
        }

        return Permission::query()
            ->where('slug', $permission)
            ->whereHas('roles.users', fn ($query) => $query->where('users.id', $this->id))
            ->exists();
    }
}
