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
    ];

    /**
      CATEGORY
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
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
        Product Variants!        
     */
    public function variants(): HasMany
    {
        return $this->hasMany(Variants::class);
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
