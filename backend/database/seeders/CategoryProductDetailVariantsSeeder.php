<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CategoryProductDetailVariantsSeeder extends Seeder
{
    public function run(): void
    {
        // Categories
        $trees    = Category::create(['name' => 'Trees',    'slug' => 'trees']);
        $soil     = Category::create(['name' => 'Soil',     'slug' => 'soil']);
        $vases    = Category::create(['name' => 'Vases',    'slug' => 'vases']);
        $services = Category::create(['name' => 'Services', 'slug' => 'services']);
        $flowers  = Category::create(['name' => 'Flowers',  'slug' => 'flowers']);
        $grass    = Category::create(['name' => 'Grass',    'slug' => 'grass']);

        // 🌳 TREE PRODUCT
        $tree = Product::create([
            'name' => 'Olive Tree',
            'description' => 'Healthy olive tree',
            'price' => 200,
            'promo_price' => 180,
            'currency' => 'MAD',
            'stock' => 0, // handled by variants
            'status' => 'available',
            'is_featured' => true,
            'color' => 'green',
            'category_id' => $trees->id,
            'origin' => 'Morocco',
            'is_indoor' => false,
        ]);

        // Plant Details
        $tree->plantDetails()->create([
            'sunlight' => 'full_sun',
            'watering' => 'moderate',
        ]);

        // Variants (REAL combinations)
        $tree->variants()->createMany([
            ['diameter' => 20, 'height' => 100, 'price' => 100, 'stock' => 10],
            ['diameter' => 20, 'height' => 150, 'price' => 130, 'stock' => 5],
            ['diameter' => 40, 'height' => 150, 'price' => 180, 'stock' => 3],
        ]);

        // 🌸 FLOWER
        $flower = Product::create([
            'name' => 'Rose Flower',
            'description' => 'Red rose',
            'price' => 50,
            'currency' => 'MAD',
            'stock' => 0,
            'status' => 'available',
            'color' => 'red',
            'category_id' => $flowers->id,
            'origin' => 'Morocco',
            'is_indoor' => true,
        ]);

        $flower->plantDetails()->create([
            'sunlight' => 'partial_shade',
            'watering' => 'frequent',
        ]);

        $flower->variants()->create([
            'diameter' => 10,
            'height' => 40,
            'price' => 50,
            'stock' => 25,
        ]);

        // 🪨 SOIL
        $soilProduct = Product::create([
            'name' => 'Organic Soil',
            'description' => 'Rich organic soil',
            'price' => 30,
            'currency' => 'MAD',
            'stock' => 0,
            'status' => 'available',
            'category_id' => $soil->id,
            'origin' => 'Local',
            'is_indoor' => false,
        ]);

        $soilProduct->soilDetails()->create([
            'ph' => 6.5,
            'composition' => 'organic compost',
            'grass_type' => 'natural',
        ]);

        $soilProduct->variants()->createMany([
            ['size' => '5kg', 'price' => 30, 'stock' => 50],
            ['size' => '10kg', 'price' => 55, 'stock' => 30],
        ]);

        // 🏺 VASE
        $vase = Product::create([
            'name' => 'Ceramic Vase',
            'description' => 'Decorative vase',
            'price' => 120,
            'currency' => 'MAD',
            'stock' => 0,
            'status' => 'available',
            'color' => 'white',
            'category_id' => $vases->id,
            'origin' => 'Spain',
            'is_indoor' => true,
        ]);

        $vase->vaseDetails()->create([
            'material' => 'ceramic',
            'style' => 'modern',
        ]);

        $vase->variants()->createMany([
            ['size' => 'small', 'price' => 100, 'stock' => 10],
            ['size' => 'large', 'price' => 150, 'stock' => 5],
        ]);

        // 🛠️ SERVICE
        $service = Product::create([
            'name' => 'Garden Maintenance',
            'description' => 'Garden care service',
            'price' => 500,
            'currency' => 'MAD',
            'stock' => 0,
            'status' => 'available',
            'category_id' => $services->id,
            'origin' => 'Local',
            'is_indoor' => false,
        ]);

        $service->serviceDetails()->create([
            'service_type' => 'garden_cleaning',
            'location_type' => 'outdoor',
            'description' => 'Cleaning and maintaining gardens',
        ]);

        $service->variants()->createMany([
            ['duration' => 60, 'price' => 100, 'stock' => 100],
            ['duration' => 180, 'price' => 250, 'stock' => 50],
        ]);

    }
}