<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

/**
 *
 * The attributes that are mass assignable.
 *
 * @var array<int, string>
 *
 */
    protected $fillable = [
        'name_en',
        'name_fr',
    ];

    /**
     * Get the event that owns the reservation.
     */
    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }
}
