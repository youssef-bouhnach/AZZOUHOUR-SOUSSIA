<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class GrassDetails extends Model
{
    protected $fillable = [
        'size',
        'grass_type',
        'growth',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
