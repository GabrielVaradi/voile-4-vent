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
        $initiation = Course::query()
            ->create([
                'title_en' => 'Initiation to sailing',
                'title_fr' => 'Introduction à la navigation',
                'description_en' => 'Learn to be a good crew member in complete safety on a sailboat. This course covers the basics of sailing.',
                'description_fr' => 'Apprendre à être un bon équipier en toute sécurité sur un voilier. Ce cours couvre les rudiments de la voile.',
                'duration_en' => '15 hours',
                'duration_fr' => '15 heures',
                'price' => 270,
                'image_path' => '/images/courses/voile4vents_initiation.jpg',
                'pdf_path' => '/files/courses/programme_croisiere_initiation.pdf',
                'stripe_product_id' => 'price_1LQATaGBR8DTe9IELg49wgFY',
                'type' => 'initiation_sailing'
            ]);
        $initiation->skills()->sync([1, 2, 3, 4, 5, 6]);
        $basicSkipper = Course::query()
            ->create([
                'title_en' => 'Basic skipper certificate',
                'title_fr' => 'Brevet croisière élémentaire',
                'description_en' => 'For those who are new to sailing or have some sailing experience. The aim of the course: to acquire the necessary skills to be able to sail safely, as skipper or crew member, on a 6 to 10 meters sailboat.
                                     Opportunity to pass the Sailing Canada exam to obtain the patent.',
                'description_fr' => "Pour ceux qui débutent ou possèdent un peu d’expérience de la voile. Le but du cours : acquérir les compétences nécessaires pour pouvoir naviguer en toute sécurité, à titre de chef de bord ou d’équipier, sur un voilier de 6 à 10 mètre.
                                     Possibilité de passer l'examen de voile Canada pour obtenir le brevet.",
                'duration_en' => '30 hours',
                'duration_fr' => '30 heures',
                'price' => 540,
                'image_path' => '/images/courses/voile4vents_elementaire.jpg',
                'pdf_path' => '/files/courses/programme_croisiere_elementaire.pdf',
                'stripe_product_id' => 'price_1LQBtSGBR8DTe9IEUqGItvu3',
                'type' => 'beginner_skipper'
            ]);
        $basicSkipper->skills()->sync([7, 8, 9, 10, 11, 12, 13, 14]);
        $regatta = Course::query()
            ->create([
                'title_en' => 'regatta',
                'title_fr' => 'Régate',
                'description_en' => 'regatta is a race between multiple boats. This course will allow you to acquire the skills to maximize the speed of your boat, notably by using the spinnaker.',
                'description_fr' => "La régate est une course de vitesse entre plusieurs bateaux. Ce cours vous permettra d'acquérir les compétences requises pour maximiser la vitesse de votre voilier, notamment grâce à l'utilisation du spinnaker.",
                'duration_en' => '5 evenings',
                'duration_fr' => '5 soirs',
                'price' => 135,
                'image_path' => '/images/courses/voile4vents_regatta.jpg',
                'stripe_product_id' => 'price_1LQBufGBR8DTe9IEjpeocQPL',
                'type' => 'regatta'
            ]);
        $regatta->skills()->sync([15, 16, 17, 18, 19, 20]);
        // $intermediateSkipper = Course::query()
        //     ->create([
        //         'title_en' => 'Intermediate skipper certificate',
        //         'title_fr' => 'Brevet croisière intermédiaire',
        //         'description_en' => 'regatta is a race between multiple boats. This course will allow you to acquire the skills to maximize the speed of your boat, notably by using the spinnaker.',
        //         'description_fr' => "La régate est une course de vitesse entre plusieurs bateaux. Ce cours vous permettra d'acquérir les compétences requises pour maximiser la vitesse de votre voilier, notamment grâce à l'utilisation du spinnaker.",
        //         'duration_en' => '5 evenings',
        //         'duration_fr' => '5 soirs',
        //         'price' => 135,
        //         'image_path' => '/images/courses/voile4vents_regatta.jpg',
        //         'stripe_product_id' => 'price_1LQBufGBR8DTe9IEjpeocQPL',
        //         'type' => 'intermediate_skipper'
        //     ]);
        // $intermediateSkipper->skills()->sync([15, 16, 17, 18, 19, 20]);
    }
}