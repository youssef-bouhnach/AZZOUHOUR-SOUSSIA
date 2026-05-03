<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Get categories
        $plants = Category::where('slug', 'plants')->first();
        $soil = Category::where('slug', 'soil')->first();
        $vases = Category::where('slug', 'vases')->first();
        $services = Category::where('slug', 'services')->first();
        $grass = Category::where('slug', 'grass')->first();

        // ========== PLANTS ==========
        $rose = Product::create([
            'name' => 'Red Rose Bush',
            'description' => 'Beautiful red roses perfect for your garden. Blooms from spring to fall with proper care.',
            'price' => 45.00,
            'promo_price' => 39.99,
            'currency' => 'USD',
            'stock' => 50,
            'status' => 'available',
            'is_featured' => true,
            'color' => 'red',
            'category_id' => $plants->id,
            'category' => 'flowers',
            'origin' => 'Morocco',
            'is_indoor' => false,
            'image' => 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $rose->plantDetails()->create([
            'sunlight' => 'full_sun',
            'watering' => 'moderate',
            'growth_rate' => 'medium',
            'maintenance_level' => 'medium',
            'toxicity' => 'Non-toxic',
            'pet_friendly' => true,
        ]);

        $rose->variants()->createMany([
            ['name' => 'Small (30cm)', 'price' => 39.99, 'stock' => 20, 'height' => 30, 'sku' => 'ROSE-SM'],
            ['name' => 'Medium (50cm)', 'price' => 45.00, 'stock' => 20, 'height' => 50, 'sku' => 'ROSE-MD'],
            ['name' => 'Large (70cm)', 'price' => 55.00, 'stock' => 10, 'height' => 70, 'sku' => 'ROSE-LG'],
        ]);

        $lavender = Product::create([
            'name' => 'French Lavender',
            'description' => 'Aromatic lavender with purple flowers. Perfect for gardens and attracts butterflies.',
            'price' => 28.00,
            'currency' => 'USD',
            'stock' => 100,
            'status' => 'available',
            'is_featured' => true,
            'color' => 'purple',
            'category_id' => $plants->id,
            'category' => 'flowers',
            'origin' => 'France',
            'is_indoor' => false,
            'image' => 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $lavender->plantDetails()->create([
            'sunlight' => 'full_sun',
            'watering' => 'low',
            'growth_rate' => 'fast',
            'maintenance_level' => 'low',
            'toxicity' => 'Non-toxic',
            'pet_friendly' => true,
        ]);

        $olive = Product::create([
            'name' => 'Mediterranean Olive Tree',
            'description' => 'Timeless silver-leafed olive tree, perfect for Mediterranean gardens.',
            'price' => 89.00,
            'currency' => 'USD',
            'stock' => 15,
            'status' => 'available',
            'is_featured' => true,
            'color' => 'green',
            'category_id' => $plants->id,
            'category' => 'flowers',
            'origin' => 'Morocco',
            'is_indoor' => false,
            'image' => 'https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $olive->plantDetails()->create([
            'sunlight' => 'full_sun',
            'watering' => 'low',
            'growth_rate' => 'slow',
            'maintenance_level' => 'low',
            'toxicity' => 'Non-toxic',
            'pet_friendly' => true,
        ]);

        // ========== SOIL ==========
        $livingLoam = Product::create([
            'name' => 'Living Loam Premium Soil',
            'description' => 'Compost-rich blend bursting with beneficial microbes. Perfect for all plants.',
            'price' => 14.00,
            'currency' => 'USD',
            'stock' => 300,
            'status' => 'available',
            'is_featured' => false,
            'category_id' => $soil->id,
            'category' => 'soil',
            'origin' => 'Morocco',
            'image' => 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $livingLoam->soilDetails()->create([
            'ph' => 6.5,
            'composition' => 'Organic compost, peat moss, perlite',
            'texture' => 'Loamy',
            'drainage' => 'Excellent',
            'nutrients' => 'High in nitrogen, phosphorus, and potassium',
        ]);

        $bonsaiMix = Product::create([
            'name' => 'Bonsai Mineral Mix',
            'description' => 'Free-draining grit perfect for bonsai and succulents.',
            'price' => 19.00,
            'currency' => 'USD',
            'stock' => 80,
            'status' => 'available',
            'is_featured' => false,
            'category_id' => $soil->id,
            'category' => 'soil',
            'origin' => 'Japan',
            'image' => 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $bonsaiMix->soilDetails()->create([
            'ph' => 7.0,
            'composition' => 'Akadama, pumice, lava rock',
            'texture' => 'Gritty',
            'drainage' => 'Excellent',
            'nutrients' => 'Low - requires fertilization',
        ]);

        // ========== GRASS ==========
        $emeraldSod = Product::create([
            'name' => 'Emerald Sod Roll',
            'description' => 'Premium turf, 1m² of instant lawn. Lush green grass ready to install.',
            'price' => 18.00,
            'currency' => 'USD',
            'stock' => 200,
            'status' => 'available',
            'is_featured' => true,
            'category_id' => $grass->id,
            'category' => 'grass',
            'origin' => 'Morocco',
            'is_indoor' => false,
            'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $emeraldSod->grassDetails()->create([
            'grass_type' => 'natural',
            'blade_height' => 5.0,
            'density' => 'High',
            'climate_suitability' => 'Mediterranean, Temperate',
            'maintenance_frequency' => 'Weekly mowing',
        ]);

        $droughtFescue = Product::create([
            'name' => 'Drought-Proof Fescue',
            'description' => 'Soft underfoot, sips water. Perfect for water-conscious gardens.',
            'price' => 22.00,
            'currency' => 'USD',
            'stock' => 150,
            'status' => 'available',
            'is_featured' => false,
            'category_id' => $grass->id,
            'category' => 'grass',
            'origin' => 'Morocco',
            'is_indoor' => false,
            'image' => 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $droughtFescue->grassDetails()->create([
            'grass_type' => 'natural',
            'blade_height' => 7.0,
            'density' => 'Medium',
            'climate_suitability' => 'Arid, Mediterranean',
            'maintenance_frequency' => 'Bi-weekly mowing',
        ]);

        // ========== VASES ==========
        $ceramicVase = Product::create([
            'name' => 'Handcrafted Ceramic Vase',
            'description' => 'Beautiful handmade ceramic vase with drainage hole. Perfect for indoor plants.',
            'price' => 35.00,
            'promo_price' => 29.99,
            'currency' => 'USD',
            'stock' => 40,
            'status' => 'available',
            'is_featured' => true,
            'color' => 'terracotta',
            'category_id' => $vases->id,
            'category' => 'services',
            'origin' => 'Morocco',
            'is_indoor' => true,
            'image' => 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $ceramicVase->vaseDetails()->create([
            'material' => 'Ceramic',
            'style' => 'classic',
            'diameter' => 20.0,
            'height' => 25.0,
            'weight' => 1.5,
            'drainage_hole' => true,
        ]);

        $modernPlanter = Product::create([
            'name' => 'Modern Concrete Planter',
            'description' => 'Minimalist concrete planter for contemporary spaces.',
            'price' => 45.00,
            'currency' => 'USD',
            'stock' => 30,
            'status' => 'available',
            'is_featured' => false,
            'color' => 'gray',
            'category_id' => $vases->id,
            'category' => 'services',
            'origin' => 'Morocco',
            'is_indoor' => true,
            'image' => 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $modernPlanter->vaseDetails()->create([
            'material' => 'Concrete',
            'style' => 'modern',
            'diameter' => 30.0,
            'height' => 30.0,
            'weight' => 3.5,
            'drainage_hole' => true,
        ]);

        // ========== SERVICES ==========
        $gardenPlanting = Product::create([
            'name' => 'Professional Garden Planting',
            'description' => 'Expert planting service for your garden. We handle everything from soil prep to planting.',
            'price' => 150.00,
            'currency' => 'USD',
            'stock' => 999,
            'status' => 'available',
            'is_featured' => true,
            'category_id' => $services->id,
            'category' => 'services',
            'origin' => 'Morocco',
            'image' => 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $gardenPlanting->serviceDetails()->create([
            'service_type' => 'planting',
            'location_type' => 'outdoor',
            'duration' => 180,
            'includes' => 'Soil preparation, planting, initial watering, cleanup',
            'requirements' => 'Access to water, clear planting area',
        ]);

        $gardenMaintenance = Product::create([
            'name' => 'Monthly Garden Maintenance',
            'description' => 'Complete garden care package. Watering, pruning, weeding, and more.',
            'price' => 200.00,
            'currency' => 'USD',
            'stock' => 999,
            'status' => 'available',
            'is_featured' => true,
            'category_id' => $services->id,
            'category' => 'services',
            'origin' => 'Morocco',
            'image' => 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop',
            'is_active' => true,
        ]);

        $gardenMaintenance->serviceDetails()->create([
            'service_type' => 'garden_cleaning',
            'location_type' => 'outdoor',
            'duration' => 240,
            'includes' => 'Watering, pruning, weeding, fertilizing, pest control',
            'requirements' => 'Monthly subscription, access to garden',
        ]);
    }
}
