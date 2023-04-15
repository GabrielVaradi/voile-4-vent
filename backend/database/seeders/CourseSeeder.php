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
                'title_en' => 'Initiation to sailing',
                'title_fr' => 'Introduction à la navigation',
                'description_en' => 'Learn to be a good crew member in complete safety on a sailboat. This course covers the basics of sailing.',
                'description_fr' => 'Apprendre à être un bon équipier en toute sécurité sur un voilier. Ce cours couvre les rudiments de la voile.',
                'duration_en' => '15 hours',
                'duration_fr' => '15 heures',
                'price' => 270,
                'image_path' => '/images/courses/voile4vents_initiation.jpg',
                'stripe_product_id' => 'price_1LQATaGBR8DTe9IELg49wgFY',
                'type' => 'initiation_sailing'
            ]);
        $course1->skills()->sync([1, 2, 3, 4, 5, 6]);
        $course2 = Course::query()
            ->create([
                'title_en' => 'Basic skipper certificate',
                'title_fr' => 'Brevet croisière élémentaire',
                'description_en' => 'For those who are new to sailing or have some sailing experience. The aim of the course: to acquire the necessary skills to be able to sail safely, as skipper or crew member, on a sailboat.',
                'description_fr' => 'Pour ceux qui débutent ou possède un peu d’expérience de la voile. Le but du cours : acquérir les compétences nécessaires pour pouvoir naviguer en toute sécurité, à titre de chef de bord ou d’équipier, sur un voilier.',
                'duration_en' => '30 hours',
                'duration_fr' => '30 heures',
                'price' => 540,
                'image_path' => '/images/courses/voile4vents_elementaire.jpg',
                'stripe_product_id' => 'price_1LQBtSGBR8DTe9IEUqGItvu3',
                'type' => 'beginner_skipper'
            ]);
        $course2->skills()->sync([7, 8, 9, 10, 11, 12, 13, 14]);
        $course3 = Course::query()
            ->create([
                'title_en' => 'Regata',
                'title_fr' => 'Régate',
                'description_en' => '[EN] REGATE',
                'description_fr' => 'REGATE',
                'duration_en' => '5 evenings',
                'duration_fr' => '5 soirs',
                'price' => 135,
                'image_path' => '/images/activities/voile4vents_regate.jpg',
                'stripe_product_id' => 'price_1LQBufGBR8DTe9IEjpeocQPL',
                'type' => 'regatta'
            ]);
        $course3->skills()->sync([15, 16, 17, 18, 19, 20]);
    }
}