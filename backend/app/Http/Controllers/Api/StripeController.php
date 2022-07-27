<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('app.stripe_secret_key'));

        $domain = "http://voile.test:3000/$request->language";

        $checkout_session = Session::create([
            'line_items' => [[
                'price' => 'price_1LQBufGBR8DTe9IEjpeocQPL',
                'quantity' => 1,
            ]],
            'metadata' => [
               'eventDates' => json_encode($request->eventsData['dates']),
                'reservations' => $request->eventsData['reservations'],
                'eventsIds' => json_encode($request->events),
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
                'birthdate' => $request->birthdate,
                'payment' => $request->payment,
                'number_of_people' => $request->number_of_people,
                'type' => $request->type,
            ],
            'mode' => 'payment',
            'success_url' => $domain . '/reservations?success=true',
            'cancel_url' => $domain . '/reservations?canceled=true',
        ]);

        return $checkout_session;
    }
}
