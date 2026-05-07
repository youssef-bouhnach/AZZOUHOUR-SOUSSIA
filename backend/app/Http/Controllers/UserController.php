<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'avatar' => 'sometimes|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            // Delete old avatar
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $user->update($data);

        return response()->json($user);
    }
}
