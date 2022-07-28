<?php

use App\Http\Controllers\Api\TeacherController;
use Illuminate\Support\Facades\Route;

Route::get('/teachers', [TeacherController::class, 'index']);


