<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceDetails extends Model
{
    protected $fillable = [
        'service_type',
        'location_type',
        'description',
    ];

    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
