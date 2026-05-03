<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlantDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'sunlight',
        'watering',
        'growth_rate',
        'maintenance_level',
        'toxicity',
        'pet_friendly',
    ];

    protected $casts = [
        'pet_friendly' => 'boolean',
    ];

    /**
     * PRODUCT RELATIONSHIP
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
