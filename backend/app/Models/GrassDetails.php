<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GrassDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'grass_type',
        'blade_height',
        'density',
        'climate_suitability',
        'maintenance_frequency',
    ];

    /**
     * PRODUCT RELATIONSHIP
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
