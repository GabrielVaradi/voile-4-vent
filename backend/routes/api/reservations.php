<?php

use App\Http\Controllers\Api\ReservationController;
use Illuminate\Support\Facades\Route;

Route::get('/reservations', [ReservationController::class, 'index']);

Route::post('/reservations', [ReservationController::class, 'store']);

