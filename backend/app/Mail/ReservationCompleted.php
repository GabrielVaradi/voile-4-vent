<?php

namespace App\Mail;

use App\Models\CustomerForm;
use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationCompleted extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The reservation instance.
     *
     * @var Reservation
     */
    public Reservation $reservation;

    /**
     * The customer form instance.
     *
     */
    public CustomerForm $customerForm;

    /**
     * Language
     *
     */
    public string $language;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Reservation $reservation, CustomerForm $customerForm, string $language)
    {
        $this->reservation = $reservation;
        $this->customerForm = $customerForm;
        $this->language = $language;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        return $this->view('emails.reservation_completed');
    }
}
