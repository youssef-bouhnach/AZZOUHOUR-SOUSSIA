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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // Basic info
            $table->string('name');
            $table->text('description')->nullable();
            // Pricing
            $table->decimal('price', 10, 2);
            $table->decimal('promo_price', 10, 2)->nullable();
            $table->string('currency', 3)->default('MAD');
            // Stock
            $table->unsignedInteger('stock')->default(0);
            // Status & flags & color
            $table->enum('status', ['available', 'out_of_stock', 'coming_soon'])->default('available');
            $table->boolean('is_featured')->default(false);
            $table->string('color')->nullable();
            // Classification
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            // Optional generic attributes
            $table->string('origin')->nullable();     // country or source
            $table->boolean('is_indoor')->default(false);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }

    
};
