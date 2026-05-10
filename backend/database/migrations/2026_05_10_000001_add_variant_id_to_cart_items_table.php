<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            // MySQL: must drop foreign keys before dropping the unique index
            $table->dropForeign(['user_id']);
            $table->dropForeign(['product_id']);

            // Drop the old unique constraint
            $table->dropUnique(['user_id', 'product_id']);

            // Re-add the foreign keys
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();

            // Add nullable variant_id
            $table->foreignId('variant_id')
                ->nullable()
                ->after('product_id')
                ->constrained('variants')
                ->nullOnDelete();

            // New unique: (user_id, product_id, variant_id)
            // NULL variant_id means "no variant" — we treat it as a single slot
            // enforced in the controller for the NULL case
            $table->unique(['user_id', 'product_id', 'variant_id']);
        });
    }

    public function down(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'product_id', 'variant_id']);
            $table->dropForeign(['variant_id']);
            $table->dropColumn('variant_id');

            $table->dropForeign(['user_id']);
            $table->dropForeign(['product_id']);
            $table->unique(['user_id', 'product_id']);
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
        });
    }
};
