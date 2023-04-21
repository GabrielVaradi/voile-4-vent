<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
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
        'first_name',
        'last_name',
        'nickname',
        'title_en',
        'title_fr',
        'description_en',
        'description_fr',
        'image_path',
    ];
}