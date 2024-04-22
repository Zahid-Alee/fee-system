<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fee_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fee()
    {
        return $this->belongsTo(FeeStructure::class);
    }
}
