<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ReservationCompleted;
use App\Models\CustomerForm;
use App\Models\Event;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Illuminate\Support\Facades\Mail;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('app.stripe_secret_key'));

        $domain = "http://voile.test:3000/$request->language";

        // TODO: Move this somewhere
        $forms = $request->forms;
        $customerFormsIds = [];
        foreach ($forms as $form) {
            $customerForm = new CustomerForm();
            $customerForm->first_name = $form['first_name'];
            $customerForm->last_name = $form['last_name'];
            $customerForm->email = $form['email'];
            $customerForm->address = $form['address'];
            $customerForm->phone_number = $form['phone_number'];
            $customerForm->birthdate = $form['birthdate'];
            $customerForm->transaction_state = 'pending';
            $customerForm->save();
            $customerFormsIds[] = $customerForm->id;
        }

        $checkout_session = Session::create([
            'line_items'  => [[
                'price'    => 'price_1LQBufGBR8DTe9IEjpeocQPL',
                'quantity' => $request->number_of_people,
            ]],
            'metadata'    => [
                'event_dates'        => json_encode($request->eventsDates),
                'events_ids'         => json_encode($request->events),
                'customer_forms_ids' => json_encode($customerFormsIds),
                'payment'            => $request->payment,
                'type'               => $request->type,
            ],
            'mode'        => 'payment',
            'success_url' => $domain . '/reservations?success=true',
            'cancel_url'  => $domain . '/reservations?canceled=true',
        ]);

        return $checkout_session;
    }
}
