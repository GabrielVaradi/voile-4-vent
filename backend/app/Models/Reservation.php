<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;/**
 *
 * The attributes that are mass assignable.
 *
 * @var array<int, string>
 */
    protected $fillable = [
        'title_en',
        'first_name',
        'last_name',
        'address',
        'phone_number',
        'birthdate',
        'email',
        'payment',
        'number_of_people',
        'type',
        'event_id',
    ];

    /**
     * Get the event that owns the reservation.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

}
