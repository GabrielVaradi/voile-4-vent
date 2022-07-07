<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;/**
 *
 * The attributes that are mass assignable.
 *
 * @var array<int, string>
 *
 */
    protected $fillable = [
        'title_en',
        'title_fr',
        'start',
        'end',
        'reservations',
        'max_reservations',
        'type',
    ];

    /**
     * Get the reservations for the event.
     */
//    public function reservations()
//    {
//        return $this->hasMany(Reservation::class);
//    }
}
