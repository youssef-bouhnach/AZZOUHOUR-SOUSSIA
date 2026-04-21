<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json([
        "message" => "API is working"
    ]);
});

Route::post('/login',[
    AuthController::class, 'login'
]);
Route::post('/register',[
    AuthController::class, 'register'
]);

Route::middleware(['auth:sanctume', 'admin'])->group(function() {
    Route::get('/admin_dashboard', function() {
        return 'admin only';
    });
});


Route::resource('/users', UserController::class);