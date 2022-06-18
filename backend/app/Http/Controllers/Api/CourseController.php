<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Course\CourseCollection;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * @return CourseCollection
     */
    public function index(): CourseCollection
    {
        return new CourseCollection(Course::all());
    }
}
