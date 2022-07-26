<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createSkills();
    }

    /**
     * @return void
     */
    private function createSkills(): void
    {
        Skill::query()
            ->create([
                'name_en'       => 'Nautical safety',
                'name_fr'       => 'Sécurité nautique',
            ]);
        Skill::query()
            ->create([
                'name_en'       => 'Basic manoeuvres',
                'name_fr'       => 'Manœuvres de base ',
            ]);
        Skill::query()
            ->create([
                'name_en'       => 'Moorings',
                'name_fr'       => 'Amarrages',
            ]);
    }
}
