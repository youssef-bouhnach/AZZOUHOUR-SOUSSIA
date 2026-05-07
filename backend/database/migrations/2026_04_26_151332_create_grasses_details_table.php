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
        Schema::create('grass', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->unique()->constrained('products')->cascadeOnDelete();
            $table->enum('size', ['small', 'medium', 'large'])->default('small');
            $table->enum('grass_type', ['khassna', 'nsowlo', 'si', 'houssien']);
            $table->enum('growth', ['fast', 'slow', 'medium'])->default('medium');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grasses');
    }
};
