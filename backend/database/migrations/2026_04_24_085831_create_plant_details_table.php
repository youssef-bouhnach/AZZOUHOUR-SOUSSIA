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
        Schema::create('plant_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->unique()->constrained()->cascadeOnDelete();
            $table->enum('sunlight', ['full_sun', 'partial_shade', 'shade']);
            $table->enum('watering', ['low', 'moderate', 'frequent']);
            $table->enum('growth_rate', ['slow', 'medium', 'fast'])->nullable();
            $table->enum('maintenance_level', ['low', 'medium', 'high'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plant_details');
    }
};
