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
        'regata' => 'price_1LQBufGBR8DTe9IEjpeocQPL',
        'manual' => 'price_1MxH9JGBR8DTe9IEa3AURVsC',
        'logbook' => 'price_1N0rsSGBR8DTe9IEwGRkPtKQ',
        'exam' => 'price_1N0ruHGBR8DTe9IEMVKIl8D6',
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