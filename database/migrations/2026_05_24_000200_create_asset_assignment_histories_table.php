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
        Schema::create('asset_assignment_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->cascadeOnDelete();
            $table->enum('action', ['assigned', 'returned', 'transferred', 'lost', 'damaged', 'inactive']);
            $table->foreignId('employee_from_id')->nullable()->constrained('employees')->nullOnDelete();
            $table->foreignId('employee_to_id')->nullable()->constrained('employees')->nullOnDelete();
            $table->foreignId('actor_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamp('happened_at')->nullable();
            $table->timestamps();

            $table->index(['asset_id', 'happened_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_assignment_histories');
    }
};
