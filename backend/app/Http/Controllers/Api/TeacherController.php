<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Teacher\FaqCollection;
use App\Models\Teacher;

class TeacherController extends Controller
{
    /**
     * @return FaqCollection
     */
    public function index(): FaqCollection
    {
        return new FaqCollection(Teacher::all());
    }
}
