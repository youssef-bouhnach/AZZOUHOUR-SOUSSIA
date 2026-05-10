<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
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
    Route::post('/register', [AuthController::class , 'register']);
    Route::post('/login', [AuthController::class , 'login']);
    Route::post('/logout', [AuthController::class , 'logout']);
});

/** email verification */
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('http://localhost:5173/login?verified=1');
})->middleware(['auth', 'signed'])->name('verification.verify');

// Resend verification email
Route::post('/email/resend', function (HttpRequest $request) {
    $request->user()->SendEmailVerificationNotification();
    return response()->json(['message' => 'Verification link sent!']);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');

/** the verify middleware */
// Route::middleware(['auth:sanctum', 'verified'])->group(function () {
//     Route::get('/dashboard', ...);
// });

// keep the SPA fallback last
Route::fallback(function () {
    return response()->json(['message' => 'Not Found'], 404);
});