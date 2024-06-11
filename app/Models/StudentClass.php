<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    use HasFactory;

    protected $fillable = [
        'tilte',
        'description'
    ];

    public function students()
    {
        return $this->hasMany(User::class, 'class_id');
    }
    public function fees()
    {
        return $this->hasMany(User::class, 'class_id');
    }

}
