<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlantDetails extends Model
{
    protected $fillable = [
        'sunlight',
        'watering',
        'growth_rate',
        'maintenance_level'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}



/**
    🔁 Variants
        'diameter',
        'height',
 */
