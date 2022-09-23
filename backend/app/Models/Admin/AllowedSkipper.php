<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllowedSkipper extends Model
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
        'phone',
        'email'
    ];
}
