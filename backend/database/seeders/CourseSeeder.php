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
                'title'       => 'Brevet Niveau initiation ',
                'description' => 'Apprendre à être un bon équipier en toute sécurité sur un voilier. Ce cours couvre les rudiments de la voile en 15 heures soit  deux jours de formation pratique.',
                'duration'    => '15 heures',
                'skills'      => 'Securite nautique',
                'price'       => 270
            ]);
        Course::query()
            ->create([
                'title'       => 'Brevet Croisière élémentaire ',
                'description' => 'Pour ceux qui débutent ou possède un peu d’expérience de la voile. Formation donné en 30 heures. Le but du cours : acquérir les compétences nécessaires pour pouvoir naviguer en toute sécurité, à titre de chef de bord ou d’équipier, sur un voilier.',
                'duration'    => '30 heures',
                'skills'      => 'Securite nautique',
                'price'       => 540
            ]);
        Course::query()
            ->create([
                'title'       => 'Clinique Spinnaker',
                'description' => 'Apprivoiser le déploiement sous le vent de cette voile puissante aux coloris d’arc en ciel.',
                'duration'    => '1 journee ou 2 soiree',
                'skills'      => 'Securite nautique',
                'price'       => 135
            ]);
    }
}
