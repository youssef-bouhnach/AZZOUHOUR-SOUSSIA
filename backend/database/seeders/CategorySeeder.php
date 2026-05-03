<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Plants',
                'slug' => 'plants',
                'description' => 'Indoor and outdoor plants for your garden',
                'icon' => '🌱',
                'is_active' => true,
            ],
            [
                'name' => 'Soil',
                'slug' => 'soil',
                'description' => 'Premium soil and growing mediums',
                'icon' => '🌍',
                'is_active' => true,
            ],
            [
                'name' => 'Vases',
                'slug' => 'vases',
                'description' => 'Beautiful vases and planters',
                'icon' => '🏺',
                'is_active' => true,
            ],
            [
                'name' => 'Services',
                'slug' => 'services',
                'description' => 'Garden maintenance and care services',
                'icon' => '🛠️',
                'is_active' => true,
            ],
            [
                'name' => 'Grass',
                'slug' => 'grass',
                'description' => 'Natural and artificial grass',
                'icon' => '🌿',
                'is_active' => true,
            ],
            [
                'name' => 'Cactus',
                'slug' => 'cactus',
                'description' => 'Desert cacti and succulents for low-maintenance beauty',
                'icon' => '🌵',
                'is_active' => true,
            ],
            [
                'name' => 'Palm',
                'slug' => 'palm',
                'description' => 'Tropical palm trees for exotic landscapes',
                'icon' => '🌴',
                'is_active' => true,
            ],
            [
                'name' => 'Tree',
                'slug' => 'tree',
                'description' => 'Ornamental and shade trees for your garden',
                'icon' => '🌳',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
