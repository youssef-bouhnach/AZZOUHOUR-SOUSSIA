<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //    $users = User::all();

    //    return response()->json([
    //     "users" => $users
    //    ]);

    // }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create(Request $request)
    // {
    //     // 
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {

    //     // $fields = $request->validate([
    //     //     'name' => 'required|max:255|min:3',
    //     //     'email' => 'required|email|unique:users',
    //     //     'password' => 'required|confirmed'
    //     // ]);

    //     // $user = User::create($fields);

    //     // return response()->json($user);
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(User $user)
    // {
    //     return $user;
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(string $id)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, User $user)
    // {

    //     $fields = $request->validate([
    //         'name' => 'required|max:255|min:3',
    //         'email' => 'required|email',
    //         'password' => 'required|confirmed'
    //     ]);

    //     $user->update($fields);

    //     return response()->json([
    //         "user" => $user,
    //         "success" => "user updated successfully"
    //     ]);
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(User $user)
    // {   
    //     $user->delete();

    //     return response()->json([
    //         "message" => "user deleted successfully"
    //     ]);
    // }
}
