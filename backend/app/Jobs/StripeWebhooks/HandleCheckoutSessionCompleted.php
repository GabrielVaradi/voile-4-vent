<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\CustomerForm;
use App\Models\Event;
use App\Models\Reservation;
use App\Models\Skill;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
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

    public function handle()
    {
        $data = $this->webhookCall->payload['data']['object']['metadata'];
        $eventsIds = json_decode($data['events_ids']);
        $eventDates = json_decode($data['event_dates']);
        $customerFormsIds = json_decode($data['customer_forms_ids']);
        $type = $data['type'];
        $payment = $data['payment'];

        $customerForms = [];
        foreach ($customerFormsIds as $id) {
            $customerForm = CustomerForm::find($id);
            array_push($customerForms, $customerForm);
        }

        // TODO: Move this somewhere else
        // Reservations
        $reservation = new Reservation();
        $reservation->payment = $payment;
        $reservation->customer_forms()->saveMany($customerForms);
        $reservation->save();

        foreach($customerForms as $customerForm) {
            $customerForm->reservation_id = $reservation->id;
            $customerForm->save();
        }


        // TODO: Move this somewhere else
        // Events
        foreach ($eventDates as $date) {
            $event = new Event();
            $event->start = $date;
            $event->end = $date;
            $event->type = $type;
            $event->title_en = 'Basic skipper course';
            $event->title_fr = 'Brevet croisiere elementaire';
            $event->max_reservations = 4;
            $event->save();
            $event->reservations()->sync([$reservation->id]);
        }

        foreach ($eventsIds as $id) {
            $event = Event::find($id);
            $event->save();
            $event->reservations()->sync([$reservation->id]);
        }
    }
}
