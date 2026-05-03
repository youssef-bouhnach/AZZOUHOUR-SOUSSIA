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
        Schema::table('products', function (Blueprint $table) {
            // Add new fields
            $table->decimal('promo_price', 10, 2)->nullable()->after('price');
            $table->string('currency', 3)->default('USD')->after('promo_price');
            $table->enum('status', ['available', 'out_of_stock', 'coming_soon'])->default('available')->after('stock');
            $table->boolean('is_featured')->default(false)->after('is_active');
            $table->string('color', 50)->nullable()->after('is_featured');
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null')->after('color');
            $table->string('origin')->nullable()->after('category_id');
            $table->boolean('is_indoor')->default(false)->after('origin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn([
                'promo_price',
                'currency',
                'status',
                'is_featured',
                'color',
                'category_id',
                'origin',
                'is_indoor',
            ]);
        });
    }
};
