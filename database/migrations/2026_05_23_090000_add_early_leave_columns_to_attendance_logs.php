<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('attendance_logs', function (Blueprint $table) {
            $table->boolean('is_early_leave')
                ->default(false)
                ->after('overtime_minutes');
            $table->text('early_leave_reason')
                ->nullable()
                ->after('is_early_leave');
            $table->index('is_early_leave');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendance_logs', function (Blueprint $table) {
            $table->dropIndex(['is_early_leave']);
            $table->dropColumn(['is_early_leave', 'early_leave_reason']);
        });
    }
};

