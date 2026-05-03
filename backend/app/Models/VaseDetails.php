<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VaseDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'material',
        'style',
        'diameter',
        'height',
        'weight',
        'drainage_hole',
    ];

    protected $casts = [
        'diameter' => 'decimal:2',
        'height' => 'decimal:2',
        'weight' => 'decimal:2',
        'drainage_hole' => 'boolean',
    ];

    /**
     * PRODUCT RELATIONSHIP
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
