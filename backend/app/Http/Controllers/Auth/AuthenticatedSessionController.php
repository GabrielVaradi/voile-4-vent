<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param LoginRequest $request
     */
    public function store(LoginRequest $request)
    {
        try {
            $request->authenticate();

            $user = Auth::user();

            $token = $user->createToken('jwt')->accessToken;
            $cookie = cookie('jwt', $token, 60 * 24); //one day

            $response = new Response($token);
            $response->withCookie($cookie);
            $request->session()->regenerate();
            return $response;
        }
        catch (Exception $e) {
            return $e;
        }


    }

    /**
     * Destroy an authenticated session.
     *
     * @param Request $request
     * @return Response
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
