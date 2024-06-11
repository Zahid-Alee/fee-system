<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'batch',
        'semester',
        'phone',
        'class_id'
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];


    public function studentClass()
    {
        return $this->belongsTo(StudentClass::class, 'class_id');
    }
    public function hasSubmittedFee($feeId)
    {
        return $this->feeSubmissions()->where('fee_id', $feeId)->exists();
    }

    public function feeSubmissions()
    {
        return $this->hasMany(FeeSubmission::class);
    }

    public function fees()
    {
        return $this->hasManyThrough(
            FeeStructure::class,
            StudentClass::class,
            'id', 
            'class_id',
            'class_id', 
            'student_classes.id' 
        );
    }
    public function fee()
    {
        return $this->belongsTo(FeeStructure::class, 'fee_id');
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
