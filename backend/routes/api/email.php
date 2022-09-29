<?php

use App\Http\Controllers\Api\EmailController;
use Illuminate\Support\Facades\Route;

Route::get('/email/send-contact-us-email',[EmailController::class, 'sendContactUsEmail']);
