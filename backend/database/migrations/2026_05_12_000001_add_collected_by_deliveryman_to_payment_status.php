<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // MySQL: modify the enum to include the new value
        DB::statement("ALTER TABLE orders MODIFY COLUMN payment_status ENUM('unpaid','paid','refunded','collected_by_deliveryman') NOT NULL DEFAULT 'unpaid'");
    }

    public function down(): void
    {
        // First reset any rows using the new value so the rollback doesn't fail
        DB::statement("UPDATE orders SET payment_status = 'paid' WHERE payment_status = 'collected_by_deliveryman'");
        DB::statement("ALTER TABLE orders MODIFY COLUMN payment_status ENUM('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid'");
    }
};
