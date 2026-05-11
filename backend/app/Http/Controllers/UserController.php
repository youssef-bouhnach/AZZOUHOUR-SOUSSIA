<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CloudinaryService;

class UserController extends Controller
{
    // GET /api/profile — return current user
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    // POST /api/profile — update name and/or avatar
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name'   => 'sometimes|string|max:255',
            'avatar' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $data['avatar'] = (new CloudinaryService)->upload(
                $request->file('avatar'),
                'avatars'
            );
        }

        $user->update($data);

        return response()->json($user);
    }
}