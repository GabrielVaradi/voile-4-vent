<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    const priceIds = [
        'beginner_skipper' => 'price_1LQBtSGBR8DTe9IEUqGItvu3',
        'initiation_sailing' => 'price_1LQATaGBR8DTe9IELg49wgFY',
        'spinnaker' => 'price_1LQBufGBR8DTe9IEjpeocQPL',
    ];
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
