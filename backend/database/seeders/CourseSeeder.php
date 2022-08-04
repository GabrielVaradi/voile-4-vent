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
        $this->createCourses();
    }

    /**
     * @return void
     */
    private function createCourses(): void
    {
        $course1 = Course::query()
            ->create([
                'title_en'              => 'Brevet Niveau initiation [EN]',
                'title_fr'              => 'Brevet Niveau initiation',
                'description_en'        => ' [EN]Apprendre à être un bon équipier en toute sécurité sur un voilier. Ce cours couvre les rudiments de la voile en 15 heures soit  deux jours de formation pratique.',
                'description_fr'        => 'Apprendre à être un bon équipier en toute sécurité sur un voilier. Ce cours couvre les rudiments de la voile en 15 heures soit  deux jours de formation pratique.',
                'duration_en'           => '15 hours',
                'duration_fr'           => '15 heures',
                'price'                 => 270,
                'image_path'            => '/images/courses/example.jpg',
                'stripe_product_id'     => 'price_1LQATaGBR8DTe9IELg49wgFY',
                'type'                  => 'initiation_sailing'
            ]);
        $course1->skills()->sync([1,2]);
        Course::query()
            ->create([
                'title_en'              => 'Brevet Croisière élémentaire [EN]',
                'title_fr'              => 'Brevet Croisière élémentaire',
                'description_en'        => '[EN] Pour ceux qui débutent ou possède un peu d’expérience de la voile. Formation donné en 30 heures. Le but du cours : acquérir les compétences nécessaires pour pouvoir naviguer en toute sécurité, à titre de chef de bord ou d’équipier, sur un voilier.',
                'description_fr'        => 'Pour ceux qui débutent ou possède un peu d’expérience de la voile. Formation donné en 30 heures. Le but du cours : acquérir les compétences nécessaires pour pouvoir naviguer en toute sécurité, à titre de chef de bord ou d’équipier, sur un voilier.',
                'duration_en'           => '30 hours',
                'duration_fr'           => '30 heures',
                'price'                 => 540,
                'image_path'            => '/images/courses/example.jpg',
                'stripe_product_id'     => 'price_1LQBtSGBR8DTe9IEUqGItvu3',
                'type'                  => 'beginner_skipper'
            ]);
        Course::query()
            ->create([
                'title_en'             => 'Clinique Spinnaker [EN]',
                'title_fr'             => 'Clinique Spinnaker',
                'description_en'       => '[EN] Apprivoiser le déploiement sous le vent de cette voile puissante aux coloris d’arc en ciel.',
                'description_fr'       => 'Apprivoiser le déploiement sous le vent de cette voile puissante aux coloris d’arc en ciel.',
                'duration_en'          => '1 day or 2 evenings',
                'duration_fr'          => '1 day or 2 evenings',
                'price'                 => 135,
                'image_path'            => '/images/courses/example.jpg',
                'stripe_product_id'     => 'price_1LQBufGBR8DTe9IEjpeocQPL',
                'type'                  => 'spinnaker'
            ]);
    }
}
