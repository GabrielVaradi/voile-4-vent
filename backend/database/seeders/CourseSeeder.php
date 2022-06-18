<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createClasses();
    }

    /**
     * @return void
     */
    private function createClasses(): void
    {
        Course::query()
            ->create([
                'title'       => 'Croisiere elementaire',
                'description' => 'Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire
                                  Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire
                                  Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire
                                  Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire Croisiere elementaire',
                'duration'    => '30 heures',
                'price'       => 600
            ]);
    }
}
