<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Faq\FaqCollection;
use App\Models\Faq;

class FaqController extends Controller
{
    /**
     * @return FaqCollection
     */
    public function index(): FaqCollection
    {
        return new FaqCollection(Faq::all());
    }
}
