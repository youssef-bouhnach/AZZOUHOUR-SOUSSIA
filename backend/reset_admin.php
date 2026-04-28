<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$u = User::where('email', 'testAdmin2@example.com')->first();
if ($u) {
    $u->password = Hash::make('TestPassword123!');
    $u->save();
    echo "Password updated successfully\n";
} else {
    echo "User not found\n";
}
