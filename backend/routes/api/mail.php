<?php

use App\Http\Controllers\Api\MailController;
use Illuminate\Support\Facades\Route;

Route::post('/mail/send-contact-us-email',[MailController::class, 'sendContactUsEmail']);
