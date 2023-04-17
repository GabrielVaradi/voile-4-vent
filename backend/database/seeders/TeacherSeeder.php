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
                'first_name' => 'Pierre',
                'last_name' => 'Ricard',
                'nickname' => "Capi Pierr'eau",
                'title_en' => 'Elementary Cruising Sailing Instructor',
                'title_fr' => 'Instructeur de voile croisière élémentaire',
                'description_en' => 'With 23 years of experience on the Caribbean Sea, the St. Lawrence River and Lake Champlain, Pierre will certainly teach you everything there is to know about sailing.',
                'description_fr' => "Avec 23 ans d’expériences sur la mer des Caraïbes, le Fleuve St-Laurent et le lac Champlain, Pierre vous apprendra assurément tout ce qu'il y a à savoir sur la voile",
                'image_path' => '/images/teachers/pierre_ricard.png',
            ]);
        Teacher::query()
            ->create([
                'first_name' => 'Sophie',
                'last_name' => 'Duvieusart',
                'nickname' => "Sophie",
                'title_en' => 'Elementary Cruising Sailing Instructor',
                'title_fr' => 'Instructrice de voile croisière élémentaire ',
                'description_en' => 'Calm and composed, Sophie takes pleasure in sharing her knowledge by giving clear and concise explanations; she makes sure that future sailors understand the basics, while integrating humor into her lessons.',
                'description_fr' => 'Calme et posée, Sophie prend plaisir à partager ses connaissances en donnant des explications claires et concises; elle s’assure que les marins en devenir comprennent bien les notions de base, tout en intégrant de l’humour dans ses cours.',
                'image_path' => '/images/teachers/sophie_duvieusart.jpg',
            ]);
    }
}