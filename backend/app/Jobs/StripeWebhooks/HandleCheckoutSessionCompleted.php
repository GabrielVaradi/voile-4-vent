<?php

namespace App\Jobs\StripeWebhooks;

use App\Mail\ReservationCompleted;
use App\Models\CustomerForm;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\SentMessage;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;
use Spatie\WebhookClient\Models\WebhookCall;

class HandleCheckoutSessionCompleted implements ShouldQueue
{
    //TODO: Should Queue
    use InteractsWithQueue, Queueable, SerializesModels;

    /** @var WebhookCall */
    public $webhookCall;

    public function __construct(WebhookCall $webhookCall)
    {
        $this->webhookCall = $webhookCall;
    }

    public function handle(): ?SentMessage
    {
        $data = $this->webhookCall->payload['data']['object']['metadata'];
        $eventsIds = json_decode($data['events_ids']);
        $eventDates = json_decode($data['event_dates']);
        $customerFormsIds = json_decode($data['customer_forms_ids']);
        $type = $data['type'];
        $language = $data['language'];

        $customerForms = [];
        foreach ($customerFormsIds as $key => $id) {
            $customerForm = CustomerForm::find($id);
            if ($key == 0) {
                $firstCustomerForm = $customerForm;
            }
            array_push($customerForms, $customerForm);
        }

        // TODO: Move this somewhere else
        // Reservations
        $reservation = new Reservation();
        $reservation->type = $type;
        $reservation->customer_forms()->saveMany($customerForms);
        $reservation->save();

        foreach ($customerForms as $customerForm) {
            $customerForm->reservation_id = $reservation->id;
            $customerForm->transaction_state = 'completed';
            $customerForm->save();
        }


        // TODO: Move this somewhere else
        // Events
        foreach ($eventDates as $date) {
            $event = new Event();
            $event->start = $date->start;
            $event->end = $date->end;
            $event->type = $type;
            $event->title_en = Event::types[$type]['title_en'];
            ;
            $event->title_fr = Event::types[$type]['title_fr'];
            ;
            $event->max_reservations = Event::maxReservations;
            $event->save();
            $event->reservations()->attach([$reservation->id]);
        }

        foreach ($eventsIds as $id) {
            $event = Event::find($id);
            $event->save();
            $event->reservations()->attach([$reservation->id]);
        }

        return Mail::to($firstCustomerForm['email'])->send(new ReservationCompleted($reservation, $firstCustomerForm, $language));
    }
}