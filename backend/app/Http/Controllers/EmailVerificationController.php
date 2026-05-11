<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    public function verify(int $id, string $hash)
    {

        $user = User::findOrFail($id);

        if (! hash_equals(sha1($user->getEmailForVerification()), $hash)) {
            abort(403, 'Invalid verification link');
        }

        if (! request()->hasValidSignature()) {
            abort(403, 'Link expired or invalid');
        }

        if ($user->hasVerifiedEmail()) {
            return redirect('http://localhost:5173/login?verified=already');
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        return redirect('http://localhost:5173/login?verified=1');
    }
}
