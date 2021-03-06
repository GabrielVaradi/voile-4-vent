<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title_en', 50);
            $table->string('title_fr', 50);
            $table->longText('description_en');
            $table->longText('description_fr');
            $table->string('duration_en');
            $table->string('duration_fr');
            $table->integer('price');
            $table->string('image_path');
            $table->string('stripe_product_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
};
