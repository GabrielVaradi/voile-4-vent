<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Event\StoreEventRequest;
use App\Http\Resources\Event\EventCollection;
use App\Http\Resources\Event\EventResource;
use App\Mail\ReservationCompleted;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
     * Store a new event.
     * @param  StoreEventRequest $request
     * @return EventResource
     */
    public function store(StoreEventRequest $request): EventResource
    {
        $dates = $request->dates;
        $type = $request->type;
        $events = [];
        foreach ($dates as $date) {
            $event = new Event();
            $event->start = $date;
            $event->end = $date;
            $event->type = $type;
            $event->title_en = 'Basic skipper course';
            $event->title_fr = 'Brevet croisiere elementaire';
            $event->max_reservations = 4;
            $event->save();
            $event['id'] = $event->id;
            $events[] = $event;
        }
        return new EventResource($events);
    }
}
