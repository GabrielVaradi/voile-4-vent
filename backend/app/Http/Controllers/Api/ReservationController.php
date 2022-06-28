<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Reservation\StoreReservationRequest;
use App\Http\Resources\Reservation\ReservationResource;
use App\Http\Resources\Reservation\ReservationCollection;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * @return ReservationCollection
     */
    public function index(): ReservationCollection
    {
        return new ReservationCollection(Event::all());
    }


    /**
     * Store a new event.
     * @param  StoreReservationRequest $request
     * @return ReservationResource
     */
    public function store(StoreReservationRequest $request): ReservationResource
    {
        $reservation = new Reservation($request->all());
        $reservation->save();

        return new ReservationResource($reservation);
    }
}
