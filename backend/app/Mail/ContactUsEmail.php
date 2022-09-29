<?php

namespace App\Mail;

use App\Models\CustomerForm;
use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactUsEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The email.
     *
     * @var string
     */
    public string $email;

    /**
     * The message.
     *
     * @var string
     */
    public string $body;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $email, string $name, string $subject, string $body)
    {
        $this->email = $email;
        $this->name = $name;
        $this->subject = $subject;
        $this->body = $body;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        return $this->from((config('mail.from.address')), $this->name)->subject($this->subject)->view('emails.contact_us_email');
    }
}
