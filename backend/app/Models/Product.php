<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'promo_price',
        'currency',
        'stock',
        'status',
        'is_featured',
        'color',
        'category_id',
        'origin',
        'is_indoor',
        'image',
    ];

    // Relationships
    /**
     CATEGORY
     */
    // app/Models/Product.php
    public function category()
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id');
    }
    /**
     Plant Details
     */
    public function plantDetails(): HasOne
    {
        return $this->HasOne(PlantDetails::class);
    }
    /**
     Soil Details
     */
    public function soilDetails(): HasOne
    {
        return $this->HasOne(SoilDetails::class);
    }
    /**
     Vase Details
     */
    public function vaseDetails(): HasOne
    {
        return $this->HasOne(VaseDetails::class);
    }
    /**
     Service Details
     */
    public function serviceDetails(): HasOne
    {
        return $this->HasOne(ServiceDetails::class);
    }
    /**
     Grass Details 
     */
    public function grassDetails(): HasOne
    {
        return $this->HasOne(GrassDetails::class);
    }
    /**
     Product Variants!        
     */
    public function variants(): HasMany
    {
        return $this->hasMany(Variants::class);
    }
    /**
     Order Items
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
    

    // healpers 
    public function getEffectivePriceAttribute(): string
    {
        return $this->promo_price ?? $this->price;
    }
}

/**
 |--------------------------------------------------------------------------
 | futur Relationships 
 |--------------------------------------------------------------------------
 // Orders (many-to-many via pivot)
 public function orders()
 {
 return $this->belongsToMany(Order::class, 'commande_produit')
 ->withPivot('quantite')
 ->withTimestamps();
 }
 // Reservations
 public function reservations()
 {
 return $this->hasMany(Reservation::class);
 }
 }
 */
