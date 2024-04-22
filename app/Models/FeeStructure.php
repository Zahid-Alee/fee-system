<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeStructure extends Model
{
    use HasFactory;

   protected $fillable=[

        'due_date',
        'semester',
        'fee',
        'class_id',
        'installments_allowed',
        'late_fee_fine',
        'min_fee_per_installment',
   ];

   public function studentClass()
   {
       return $this->belongsTo(StudentClass::class, 'class_id');
   }

   public function transactions(){
    return $this->hasMany(Transaction::class,'fee_id');
   }
   
}
