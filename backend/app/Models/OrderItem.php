<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'product_name',
        'unit_price',
        'subtotal',
        'product_image',
        'product_color',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'subtotal'   => 'decimal:2',
    ];

    function order() : BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
