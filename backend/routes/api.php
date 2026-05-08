<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->group(function() {
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
Route::resource('products', ProductController::class);

// get all categories
Route::get('/categories', [CategoryController::class, 'index']);

// filter products by categorie
Route::get('/categories/{category:slug}/products', [ProductController::class, 'byCategory']);

Route::middleware('auth:sanctum')->group(function () {

    // Profile
    Route::get('/profile',  [UserController::class, 'profile']);
    Route::post('/profile', [UserController::class, 'updateProfile']);

    // Cart
    Route::get('/cart',                 [CartController::class, 'index']);
    Route::post('/cart',                [CartController::class, 'store']);
    Route::patch('/cart/{productId}',   [CartController::class, 'update']);
    Route::delete('/cart/{productId}',  [CartController::class, 'destroy']);
    Route::delete('/cart',              [CartController::class, 'clear']);

    // Orders (ready for next step)
    Route::post('/orders',              [OrderController::class, 'store']);
    Route::get('/orders',               [OrderController::class, 'index']);
    Route::get('/orders/{id}',          [OrderController::class, 'show']);

    // Favorites
    Route::get('/favorites',            [FavoriteController::class, 'index']);
    Route::get('/favorites/ids',        [FavoriteController::class, 'ids']);
    Route::post('/favorites',           [FavoriteController::class, 'store']);
    Route::delete('/favorites/{productId}', [FavoriteController::class, 'destroy']);

});


