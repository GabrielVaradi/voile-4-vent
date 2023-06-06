<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;


class Event extends Model
{
    use HasFactory; /**
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
        'max_reservations',
        'type',
        'type',
    ];

    const types = [
        'beginner_skipper' => [
            'title_en' => 'Basic skipper course',
            'title_fr' => 'Brevet croisière élémentaire'
        ],
        'initiation_sailing' => [
            'title_en' => 'Initiation to sailing',
            'title_fr' => 'Initiation à la voile'
        ],
        'regatta' => [
            'title_en' => 'regatta',
            'title_fr' => 'Régate'
        ]
    ];

    const maxReservations = 4;

    /**
     * Get the reservations for the event.
     */
    public function reservations()
    {
        return $this->belongsToMany(Reservation::class);
    }

    public function checkIfSaturday()
    {
        return Carbon::parse($this->start)->dayName === 'Saturday';
    }
}