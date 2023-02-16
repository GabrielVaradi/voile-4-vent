<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
            'title_fr' => 'Brevet croisiere elementaire'
        ],
        'initiation_sailing' => [
            'title_en' => 'Initiation sailing',
            'title_fr' => 'Initiation a la voile'
        ],
        'regata' => [
            'title_en' => 'Regata',
            'title_fr' => 'Régate'
        ]
    ];

    /**
     * Get the reservations for the event.
     */
    public function reservations()
    {
        return $this->belongsToMany(Reservation::class);
    }
}