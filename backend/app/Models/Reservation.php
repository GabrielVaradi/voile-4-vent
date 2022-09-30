<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
/**
 *
 * The attributes that are mass assignable.
 *
 * @var array<int, string>
 */
    protected $fillable = [
        'type',
    ];

    /**
     * Get the event that owns the reservation.
     */
    public function event()
    {
        return $this->belongsToMany(Event::class);
    }

    /**
     * Get the customer forms for the reservation.
     */
    public function customer_forms()
    {
        return $this->hasMany(CustomerForm::class);
    }

}
