<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json([
        "message" => "API is working"
    ]);
});

Route::middleware('auth:sanctum')->get('/user', function (HttpRequest $request) {
    return $request->user();
});

Route::middleware('auth:sanctum', 'admin')->group(function() {
    Route::get('/admin/dashboard', function() {
        return response()->json([
            "message" => "admin only"
        ]);
    });
    // more admin pages! 
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user/stats', function () {
        return response()->json([
            'products' => \App\Models\Product::count(),
            'categories' => \App\Models\Category::count(),
            'users' => \App\Models\User::count(),
        ]);
    });
});

// Admin only — index, show, create, update, delete
Route::resource('products', ProductController::class)
    ->middleware(['auth:sanctum', 'admin'])
    ->except(['index', 'show']);

