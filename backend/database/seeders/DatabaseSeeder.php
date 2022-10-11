<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            SkillSeeder::class,
        ]);
        $this->call([
            CourseSeeder::class,
        ]);
        $this->call([
            EventSeeder::class,
        ]);
        $this->call([
            ReservationSeeder::class,
        ]);
        $this->call([
            TeacherSeeder::class,
        ]);
        $this->call([
            CustomerFormSeeder::class,
        ]);
        $this->call([
            FaqSeeder::class,
        ]);
        $this->call([
            AllowedSkipperSeeder::class,
        ]);
        $this->call([
            ActivitySeeder::class,
        ]);
    }
}
