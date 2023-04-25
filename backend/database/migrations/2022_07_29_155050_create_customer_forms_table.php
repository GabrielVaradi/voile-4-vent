<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_forms', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('address');
            $table->string('phone_number');
            $table->string('birthdate');
            $table->boolean('has_manual');
            $table->boolean('has_logbook');
            $table->boolean('has_exam');
            $table->boolean('terms_accepted');
            $table->string('transaction_state');
            $table->foreignId('reservation_id')->nullable()->constrained()->references('id')->on('reservations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_forms');
    }
};