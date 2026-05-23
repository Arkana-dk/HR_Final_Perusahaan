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
        Schema::table('shifts', function (Blueprint $table) {
            $table->time('check_in_cutoff_time')->nullable()->after('end_time');
            $table->time('check_out_cutoff_time')->nullable()->after('check_in_cutoff_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shifts', function (Blueprint $table) {
            $table->dropColumn(['check_in_cutoff_time', 'check_out_cutoff_time']);
        });
    }
};
