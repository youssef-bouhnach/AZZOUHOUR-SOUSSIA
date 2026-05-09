<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryAssignment extends Model
{
    protected $fillable =
    [
        'order_id',
        'delivery_man_id',
        'status'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function deliveryMan()
    {
        return $this->belongsTo(User::class, 'delivery_man_id');
    }
}
