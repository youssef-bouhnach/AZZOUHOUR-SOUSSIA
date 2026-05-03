<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SoilDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'ph',
        'composition',
        'texture',
        'drainage',
        'nutrients',
    ];

    protected $casts = [
        'ph' => 'decimal:2',
    ];

    /**
     * PRODUCT RELATIONSHIP
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
