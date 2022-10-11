<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Activity\ActivityCollection;
use App\Models\Activity;

class ActivityController extends Controller
{
    /**
     * @return ActivityCollection
     */
    public function index(): ActivityCollection
    {
        return new ActivityCollection(Activity::all());
    }
}
