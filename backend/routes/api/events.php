<?php

use App\Http\Controllers\Api\EventController;
use Illuminate\Support\Facades\Route;

Route::get('/events',[EventController::class, 'index']);
Route::get('/events/calendar',[EventController::class, 'eventsCalendar']);

Route::post('/events', [EventController::class, 'store']);
