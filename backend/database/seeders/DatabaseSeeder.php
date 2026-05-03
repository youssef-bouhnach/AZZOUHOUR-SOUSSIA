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
        // Seed categories first
        $this->call(CategorySeeder::class);

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

        // Seed products with details
        $this->call(ProductSeeder::class);
    }
}

