<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        // for auth spa /CSRF 
        $request->session()->regenerate();

        // let's try to generate a token for products 
        // $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            // 'token' => $token,
        ]);
    }

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        // Hash password 
        $fields['password'] = Hash::make($fields['password']);

        // Create user
        $user = User::create($fields);

        // Regenerate session (log the user in via session before sending email)
        Auth::login($user);
        $request->session()->regenerate();

        if (in_array($user->role, ['admin', 'deliveryMan'])) {
            $user->markEmailAsVerified(); // no email needed
        } else {
            event(new Registered($user)); // sends verification email
        }

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}
