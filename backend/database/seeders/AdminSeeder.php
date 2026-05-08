<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name'              => 'Admin',
                'email'             => 'admin@admin.com',
                'password'          => bcrypt('admin1234'),
                'role'              => 'admin',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@user.com'],
            [
                'name'              => 'user',
                'email'             => 'user@user.com',
                'password'          => bcrypt('user1234'),
                'role'              => 'user',
                'email_verified_at' => now(),
            ]
        );User::updateOrCreate(
            ['email' => 'user@user.com'],
            [
                'name'              => 'user',
                'email'             => 'user@user.com',
                'password'          => bcrypt('user1234'),
                'role'              => 'user',
                'email_verified_at' => now(),
            ]
        );
    }
}
