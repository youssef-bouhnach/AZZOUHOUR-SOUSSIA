<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DeliveryManController;
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

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/user/stats', function () {
        return response()->json([
            'products' => \App\Models\Product::count(),
            'categories' => \App\Models\Category::count(),
            'users' => \App\Models\User::count(),
        ]);
    });
});

// Delivery Man routes
Route::middleware(['auth:sanctum', 'deliverymanMIDD:deliveryman'])->group(function() {
    Route::get('/delivery/dashboard', [DeliveryManController::class, 'dashboard']);
    Route::get('/delivery/orders', [DeliveryManController::class, 'myOrders']);
    Route::patch('/delivery/orders/{order}/status', [DeliveryManController::class, 'updateOrder']);
    Route::get('/delivery/profile', [DeliveryManController::class, 'profile']);
});
// // admin can also asses all orders:
// Route::middleware(['auth:sanctum', 'deliverymanMIDD:deliveryman,admin'])->get(
//     '/delivery/all', [DeliveryManController::class, 'index']
// );

// Admin only — index, show, create, update, delete
Route::resource('products', ProductController::class);

// get all categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);

// filter products by categorie
Route::get('/categories/{category:slug}/products', [ProductController::class, 'byCategory']);

// , 'deliverymanMIDD:user' we have to solve this problem !!!!! 
Route::middleware('auth:sanctum')->group(function () {

    // Profile
    Route::get('/profile',  [UserController::class, 'profile']);
    Route::post('/profile', [UserController::class, 'updateProfile']);

    // Cart
    Route::get('/cart',                 [CartController::class, 'index']);
    Route::post('/cart',                [CartController::class, 'store']);
    Route::patch('/cart/{cartItemId}',  [CartController::class, 'update']);
    Route::delete('/cart/{cartItemId}', [CartController::class, 'destroy']);
    Route::delete('/cart',              [CartController::class, 'clear']);

    // Orders
    Route::post('/orders',              [OrderController::class, 'store']);
    Route::get('/orders',               [OrderController::class, 'index']);
    Route::get('/orders/{id}',          [OrderController::class, 'show']);

    // Favorites
    Route::get('/favorites',            [FavoriteController::class, 'index']);
    Route::get('/favorites/ids',        [FavoriteController::class, 'ids']);
    Route::post('/favorites',           [FavoriteController::class, 'store']);
    Route::delete('/favorites/{productId}', [FavoriteController::class, 'destroy']);

});


