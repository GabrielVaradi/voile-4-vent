<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login');

