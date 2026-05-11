<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\ProductController;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
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

/** Email Verification */
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
    ->middleware('signed')->name('verification.verify');

/** Resend Verification Email */
Route::post('/email/resend', function (HttpRequest $request) {
    $request->user()->sendEmailVerificationNotification();
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