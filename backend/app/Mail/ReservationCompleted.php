<?php

namespace App\Mail;

use App\Models\CustomerForm;
use App\Models\Event;
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
     * Event name
     *
     */
    public string $eventName;

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
        $this->eventName = Event::types[$reservation->type]['title_' . $language];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        $mailable = 'emails.' . $this->language . '.reservation_completed';
        $subject = $this->language == 'en' ? 'Reservation confirmation - Voile4Vents' : 'Confirmation de réservation - Voile4Vents';
        return $this->subject($subject)->view($mailable);
    }
}