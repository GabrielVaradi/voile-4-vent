<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ReservationCompleted;
use App\Models\CustomerForm;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Illuminate\Support\Facades\Mail;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('app.stripe_secret_key'));

        $domain = "https://voile-4-vent-omm6.vercel.app//$request->language";
        if (config('app.env') == 'local') {
            $domain = "http://voile.test:3000/$request->language";
        }

        // TODO: Move this somewhere
        $forms = $request->forms;
        $customerFormsIds = [];
        $numberOfManuals = 0;
        $numberOfLogbooks = 0;
        $numberOfExams = 0;

        foreach ($forms as $form) {
            $customerForm = new CustomerForm();
            $customerForm->first_name = $form['first_name'];
            $customerForm->last_name = $form['last_name'];
            $customerForm->email = $form['email'];
            $customerForm->address = $form['address'];
            $customerForm->phone_number = $form['phone_number'];
            $customerForm->birthdate = $form['birthdate'];
            $customerForm->has_manual = $form['has_manual'];
            $customerForm->has_logbook = $form['has_logbook'];
            $customerForm->has_exam = $form['has_exam'];
            $customerForm->terms_accepted = $form['terms_accepted'];
            $customerForm->transaction_state = 'pending';
            $customerForm->save();
            $customerFormsIds[] = $customerForm->id;

            if ($form['has_manual']) {
                $numberOfManuals++;
            }
            if ($form['has_logbook']) {
                $numberOfLogbooks++;
            }
            if ($form['has_exam']) {
                $numberOfExams++;
            }
        }
        $lineItems[] = [
            'price' => Reservation::priceIds[$request->type],
            'quantity' => $request->number_of_people,
        ];
        if ($numberOfManuals > 0) {
            $lineItems[] = [
                'price' => Reservation::priceIds['manual'],
                'quantity' => $numberOfManuals,
            ];
        }
        if ($numberOfLogbooks > 0) {
            $lineItems[] = [
                'price' => Reservation::priceIds['logbook'],
                'quantity' => $numberOfLogbooks,
            ];
        }
        if ($numberOfExams > 0) {
            $lineItems[] = [
                'price' => Reservation::priceIds['exam'],
                'quantity' => $numberOfExams,
            ];
        }

        $checkout_session = Session::create([
            'line_items' => [$lineItems],
            'metadata' => [
                'event_dates' => json_encode($request->eventsDates),
                'events_ids' => json_encode($request->events),
                'customer_forms_ids' => json_encode($customerFormsIds),
                'type' => $request->type,
                'language' => $request->language,
            ],
            'mode' => 'payment',
            'success_url' => $domain . '/reservations?success=true',
            'cancel_url' => $domain . '/reservations?canceled=true',
        ]);

        return $checkout_session;
    }
}