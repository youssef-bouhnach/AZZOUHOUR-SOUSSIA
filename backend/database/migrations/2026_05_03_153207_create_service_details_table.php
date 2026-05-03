<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->enum('service_type', ['planting', 'watering', 'garden_cleaning', 'outdoor_decoration', 'garden_treatment', 'other_services'])->nullable();
            $table->enum('location_type', ['indoor', 'outdoor', 'other'])->nullable();
            $table->integer('duration')->nullable()->comment('Duration in minutes');
            $table->text('includes')->nullable();
            $table->text('requirements')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_details');
    }
};
