<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetAssignmentHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'action',
        'employee_from_id',
        'employee_to_id',
        'actor_user_id',
        'notes',
        'happened_at',
    ];

    protected $casts = [
        'happened_at' => 'datetime',
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function employeeFrom()
    {
        return $this->belongsTo(Employee::class, 'employee_from_id');
    }

    public function employeeTo()
    {
        return $this->belongsTo(Employee::class, 'employee_to_id');
    }

    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_user_id');
    }
}
