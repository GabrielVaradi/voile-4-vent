<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Reservation\StoreReservationRequest;
use App\Http\Resources\Reservation\TeacherResource;
use App\Http\Resources\Reservation\TeacherCollection;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * @return TeacherCollection
     */
    public function index(): TeacherCollection
    {
        return new TeacherCollection(Event::all());
    }


    /**
     * Store a new event.
     * @param  StoreReservationRequest $request
     * @return TeacherResource
     */
    public function store(StoreReservationRequest $request): TeacherResource
    {
        $events = $request->events;
        $reservations = [];
        foreach ($events as $event) {
            $reservation = new Reservation($request->all());
            $reservation->event()->associate($event['id']);
            $reservation->save();
//            $reservation['id'] = $reservation->id;
            $reservations[] = $reservation;
        }

        return new TeacherResource($reservations);
    }
}
