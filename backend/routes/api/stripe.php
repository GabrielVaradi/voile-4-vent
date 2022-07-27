<?php

use App\Http\Controllers\Api\StripeController;
use Illuminate\Support\Facades\Route;

Route::post('/create-checkout-session',[StripeController::class, 'createCheckoutSession']);

Route::stripeWebhooks('/process-reservation');

