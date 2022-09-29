<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Faq\FaqCollection;
use App\Models\Faq;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    /**
     * @return FaqCollection
     */
    public function sendContactUsEmail(Request $request): FaqCollection
    {
        return new FaqCollection(Faq::all());
    }
}
