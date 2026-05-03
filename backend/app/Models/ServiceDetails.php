<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'service_type',
        'location_type',
        'duration',
        'includes',
        'requirements',
    ];

    protected $casts = [
        'duration' => 'integer', // in minutes
    ];

    /**
     * PRODUCT RELATIONSHIP
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
