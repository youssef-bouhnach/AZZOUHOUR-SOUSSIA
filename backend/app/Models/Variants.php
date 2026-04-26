<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Variants extends Model
{
    protected $fillable = [
        'diameter',
        'height',
        'weight',
        'size',
        'duration',
        'price',
        'stock',
    ];
    
    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}
