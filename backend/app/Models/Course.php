<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;/**
 *
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title_en',
        'title_fr',
        'description_en',
        'description_fr',
        'duration_en',
        'duration_fr',
        'price',
        'type',
    ];

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }
}
