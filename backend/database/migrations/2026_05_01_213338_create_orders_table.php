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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // pricing of this 
            $table->decimal('subtotal', 10, 2);
            $table->decimal('total', 10, 2);
            $table->string('currency', 3)->default('MAD');

            // Status flow
            $table->enum('status', [
                'pending',
                'paid',
                'processing',
                'shipped',
                'delivery',
                'cancelled'
            ])->default('pending');

            // payment 
            $table->enum('payment_status', ['unpaid', 'paid', 'refunded'])->default('unpaid');
            $table->string('payment_method')->nullable();
            $table->string('cmi_order_id')->unique()->nullable();

            // shipping info -> snapshot at time of order
            $table->string('shipping_name');
            $table->string('shipping_phone')->nullable();
            $table->string('shipping_address');
            $table->string('shipping_city');
            $table->string('shipping_country')->default('MA');

            // notes
            $table->string('note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
