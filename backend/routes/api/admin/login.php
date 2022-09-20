<?php

use App\Http\Controllers\Admin\LoginController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login',[LoginController::class, 'authenticate']);

