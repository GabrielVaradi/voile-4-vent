<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory; /**
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
        'image_path',
        'pdf_path',
    ];
}