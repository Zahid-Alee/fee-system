<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('email')->nullable();
            $table->string('card_holder')->nullable();
            $table->string('card_no')->nullable();
            $table->string('credit_expiry')->nullable();
            $table->string('credit_cvc')->nullable();
            $table->unsignedBigInteger('total_amount')->nullable();
            $table->unsignedBigInteger('late_fine')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('remaining_fee')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('fee_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('fee_id')->references('id')->on('fee_structures')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
