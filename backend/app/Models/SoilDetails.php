<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SoilDetails extends Model
{
    protected $fillable = [
        'composition',
        'grass_type',
    ];

    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}





/** 
    🔁 product_variants
        weight (5kg, 10kg…)
        price
        stock
*/