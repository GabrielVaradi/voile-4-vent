<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createTeachers();
    }

    /**
     * @return void
     */
    private function createTeachers(): void
    {
        Teacher::query()
            ->create([
                'first_name'           => 'Pierre',
                'last_name'            => 'Ricard',
                'nickname'             => "Capi Pierr'eau",
                'title_en'             => 'Captain',
                'title_fr'             => 'Capitaine',
                'description_en'       => 'Description Description Description Description Description Description Description Description',
                'description_fr'       => 'Description Description Description Description Description Description Description Description',
                'image_path'         => '/images/teachers/pierre.jpg',
            ]);
    }
}
