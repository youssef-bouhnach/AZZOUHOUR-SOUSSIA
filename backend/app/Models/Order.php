<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'subtotal',
        'total',
        'currency',
        'status',
        'payment_status',
        'payment_method',
        'cmi_order_id',
        'shipping_name',
        'shipping_phone',
        'shipping_address',
        'shipping_city',
        'shipping_country',
        'notes',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'total'    => 'decimal:2',
    ];

    // Relationships !
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // helpers
    public function isPaid() : bool 
    {
        return $this->payment_status === 'paid';  
    }
    public function markAsPaid(string $method = 'cmi'): void
    {
        $this->update([
            'payment_status' => 'paid',
            'payment_method' => $method,
            'status'         => 'processing',
        ]);
    }
}
