<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            // Add missing columns
            $table->foreignId('order_id')->after('id')->constrained()->cascadeOnDelete();
            $table->integer('quantity')->after('product_id')->default(1);

            // Drop the incorrect user_id column
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropColumn(['order_id', 'quantity']);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        });
    }
};
