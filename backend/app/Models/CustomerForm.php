<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerForm extends Model
{
    use HasFactory;
    /**
     *
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'address',
        'phone_number',
        'birthdate',
        'email',
        'reservation_id',
        'transaction_state',
        'has_manual',
        'has_logbook',
        'has_exam',
        'terms_accepted'
    ];

    /**
     * Get the reservation that owns the customer form.
     */
    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

}