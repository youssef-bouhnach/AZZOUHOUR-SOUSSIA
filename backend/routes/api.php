<?php

use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctume', 'admin')->group(function() {
    Route::get('/admin/dashboard', function() {
        return response()->json([
            "message" => "admin only"
        ]);
    });
    // more admin pages! 
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Route::get('/dashboard', [DashboardController::class, 'index']);
    // all authenticated user routes here
});
