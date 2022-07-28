<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Teacher\TeacherCollection;
use App\Models\Teacher;

class TeacherController extends Controller
{
    /**
     * @return TeacherCollection
     */
    public function index(): TeacherCollection
    {
        return new TeacherCollection(Teacher::all());
    }
}
