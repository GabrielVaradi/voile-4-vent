<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Event\StoreEventRequest;
use App\Http\Resources\Event\EventCollection;
use App\Http\Resources\Event\EventResource;
use App\Mail\ReservationCompleted;
use App\Models\CustomerForm;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class EventController extends Controller
{
    /**
     * @return EventCollection
     */
    public function index(): EventCollection
    {
        return new EventCollection(Event::all()->load(['reservations', 'reservations.customer_forms']));
    }


    /**
     * @return EventCollection
     */
    public function eventsCalendar(): EventCollection
    {
        $events = Event::all()->whereBetween('start',
            [
                Carbon::now()->subMonths(4)->toDateTimeString(),
                Carbon::now()->addMonths(13)->toDateTimeString()

            ]
        )->load(['reservations', 'reservations.customer_forms']);

        return new EventCollection($events);
    }


    /**

    /**
     * Store a new event.
     * @param  StoreEventRequest $request
     * @return EventResource
     */
    public function store(StoreEventRequest $request): EventResource
    {
        $type = $request->type;
        // TODO: Move this somewhere else
        // Customer forms
        $forms = $request->forms;
        $customerForms = [];
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
            $customerForms[] = $customerForm;
        }

        // TODO: Move this somewhere else
        // Reservations
        $reservation = new Reservation();
        $reservation->payment = $request->payment;
        $reservation->type = $type;
        $reservation->customer_forms()->saveMany($customerForms);
        $reservation->save();

        foreach($customerForms as $customerForm) {
            $customerForm->reservation_id = $reservation->id;
            $customerForm->transaction_state = 'completed';
            $customerForm->save();
        }

        $eventDates = $request->eventDates;
        $existingEventsId = $request->events;
        $events = [];

        // Events
        foreach ($eventDates as $date) {
            $event = new Event();
            $event->start = $date->start;
            $event->end = $date->end;
            $event->type = $type;
            $event->title_en = Event::types[$type]['title_en'];
            $event->title_fr = Event::types[$type]['title_fr'];
            $event->max_reservations = 4;
            $event->save();
            $event->reservations()->sync([$reservation->id]);
            $event['id'] = $event->id;
            $events[] = $event;
        }

        foreach ($existingEventsId as $id) {
            $event = Event::find($id);
            $event->save();
            $event->reservations()->sync([$reservation->id]);
        }

        return new EventResource($events);
    }
}
