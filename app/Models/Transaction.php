<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'card_holder',
        'card_no',
        'credit_expiry',
        'credit_cvc	',
        'total_amount',
        'late_fine',
        'payment_method',
        'remaining_fee	',
        'user_id',
        'fee_id',
    ];


    public function fee(){
        return $this->belongsTo(FeeStructure::class, 'fee_id');

    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
