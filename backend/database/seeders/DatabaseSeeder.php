<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@verdant.co',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create regular user
        User::create([
            'name' => 'Test User',
            'email' => 'user@verdant.co',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Create sample products
        $products = [
            [
                'name' => 'Mediterranean Olive',
                'description' => 'Timeless silver-leafed sapling, ready to root.',
                'price' => 89,
                'category' => 'services',
                'stock' => 15,
                'image' => 'https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Japanese Maple',
                'description' => 'Crimson canopy that turns gardens into poetry.',
                'price' => 124,
                'category' => 'services',
                'stock' => 8,
                'image' => 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Heirloom Peonies',
                'description' => 'Lush, fragrant blooms in soft blush.',
                'price' => 34,
                'category' => 'flowers',
                'stock' => 50,
                'image' => 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Wild Cottage Mix',
                'description' => 'A meadow in a pot — daisies, asters & more.',
                'price' => 28,
                'category' => 'flowers',
                'stock' => 100,
                'image' => 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Emerald Sod Roll',
                'description' => 'Premium turf, 1m² of instant lawn.',
                'price' => 18,
                'category' => 'grass',
                'stock' => 200,
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Drought-Proof Fescue',
                'description' => 'Soft underfoot, sips water.',
                'price' => 22,
                'category' => 'grass',
                'stock' => 150,
                'image' => 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Living Loam',
                'description' => 'Compost-rich blend bursting with microbes.',
                'price' => 14,
                'category' => 'soil',
                'stock' => 300,
                'image' => 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Bonsai Mineral Mix',
                'description' => 'Free-draining grit for fussy roots.',
                'price' => 19,
                'category' => 'soil',
                'stock' => 80,
                'image' => 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}

