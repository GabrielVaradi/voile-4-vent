<?php

use App\Http\Controllers\Api\ActivityController;
use Illuminate\Support\Facades\Route;

Route::get('/activities',[ActivityController::class, 'index']);

