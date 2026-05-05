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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();

            // snapshot product data at time of purchase because it may chenge!
            $table->string('product_name');
            $table->decimal('unit_price', 10, 2);   // 'promo_price' if active, if not 'price'
            $table->decimal('subtotal', 10, 2);      // unit_price * quantity
            $table->string('product_image')->nullable();
            $table->string('product_color')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
