<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Event\EventCollection;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * @return EventCollection
     */
    public function index(): EventCollection
    {
        return new EventCollection(Event::all());
    }
}
