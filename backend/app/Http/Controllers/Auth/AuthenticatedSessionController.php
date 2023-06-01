<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param LoginRequest $request
     * @return Response
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $user = Auth::user();

        $token = $user->createToken('jwt')->accessToken;
        $cookie = cookie('jwt', $token, 60 * 24); //one day

        $response = new Response($token);
        $response->withCookie($cookie);
        $request->session()->regenerate();
        return $response;
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