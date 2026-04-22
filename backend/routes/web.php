<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request as HttpRequest;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    return response()->json([
        "message" => "API is working"
    ]);
});


// routes/web.php
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// keep your SPA fallback last
Route::get('/{any}', function () {
    return response()->json(['message' => 'Not Found'], 404);
})->where('any', '.*');

