<?php

use App\Http\Controllers\Admin\AllowedSkipperController;
use Illuminate\Support\Facades\Route;

Route::get('/allowed-skippers',[AllowedSkipperController::class, 'index']);
Route::post('/allowed-skippers',[AllowedSkipperController::class, 'store']);
Route::put('/allowed-skippers/{allowed-skipper}',[AllowedSkipperController::class, 'update']);
Route::delete('/allowed-skippers/{allowed-skipper}',[AllowedSkipperController::class, 'delete']);
