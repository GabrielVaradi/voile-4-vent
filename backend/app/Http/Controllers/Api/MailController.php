<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactUsEmail;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    /**
     */
    public function sendContactUsEmail(Request $request)
    {
        $email = $request->email;
        $name = $request->name;
        $subject = $request->subject;
        $body = $request->body;
        Mail::to(config('mail.to.address'))->send(new ContactUsEmail($email, $name, $subject, $body));
    }
}
