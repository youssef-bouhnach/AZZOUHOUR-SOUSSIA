<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory;

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
        'is_active',
        // Keep old 'category' for backward compatibility
        'category',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_indoor' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'promo_price' => 'decimal:2',
    ];

    protected $hidden = [
        // Hide category relationship by default to avoid frontend issues
        // Frontend uses 'category' string field
    ];

    /**
     * CATEGORY RELATIONSHIP
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * ORDER ITEMS
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Plant Details
     */
    public function plantDetails(): HasOne
    {
        return $this->hasOne(PlantDetails::class);
    }

    /**
     * Soil Details
     */
    public function soilDetails(): HasOne
    {
        return $this->hasOne(SoilDetails::class);
    }

    /**
     * Vase Details
     */
    public function vaseDetails(): HasOne
    {
        return $this->hasOne(VaseDetails::class);
    }

    /**
     * Service Details
     */
    public function serviceDetails(): HasOne
    {
        return $this->hasOne(ServiceDetails::class);
    }

    /**
     * Grass Details
     */
    public function grassDetails(): HasOne
    {
        return $this->hasOne(GrassDetails::class);
    }

    /**
     * Product Variants
     */
    public function variants(): HasMany
    {
        return $this->hasMany(Variants::class);
    }

    /**
     * SCOPES
     */
    
    // Scope: only active products
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope: filter by category
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Scope: featured products
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Scope: available products
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }
}
