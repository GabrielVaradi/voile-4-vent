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
        // Initiation
        Skill::query()
            ->create([
                'name_en'       => 'Nautical safety',
                'name_fr'       => 'Sécurité nautique',
            ]); // 1
        Skill::query()
            ->create([
                'name_en'       => 'Basic manoeuvres',
                'name_fr'       => 'Manœuvres de base ',
            ]); // 2
        Skill::query()
            ->create([
                'name_en'       => 'Moorings',
                'name_fr'       => 'Amarrages',
            ]); // 3
        Skill::query()
            ->create([
                'name_en'       => 'Tack and point of sail',
                'name_fr'       => 'Allures et amures',
            ]); // 4
        Skill::query()
            ->create([
                'name_en'       => 'Seamanship',
                'name_fr'       => 'Matelotage',
            ]); // 5
        Skill::query()
            ->create([
                'name_en'       => 'Theory and terminology',
                'name_fr'       => 'Théorie et terminologie',
            ]); // 6

        // Basic skipper
        Skill::query()
            ->create([
                'name_en'       => 'Man overboard procedure',
                'name_fr'       => 'Récupération d’un équipier à l’eau',
            ]); // 7
        Skill::query()
            ->create([
                'name_en'       => 'Anchorage',
                'name_fr'       => 'Mouillage',
            ]); // 8
        Skill::query()
            ->create([
                'name_en'       => 'Docking and casting off',
                'name_fr'       => 'Accostage et appareillage',
            ]); // 9
        Skill::query()
            ->create([
                'name_en'       => 'Marine weather',
                'name_fr'       => 'Météo marine',
            ]); // 10
        Skill::query()
            ->create([
                'name_en'       => 'Reading nautical maps',
                'name_fr'       => 'Lecture de carte marine',
            ]); // 11
        Skill::query()
            ->create([
                'name_en'       => 'Reefing',
                'name_fr'       => 'Prendre un ris',
            ]); // 12
        Skill::query()
            ->create([
                'name_en'       => 'Sailing priority',
                'name_fr'       => 'Règles de route',
            ]); // 13
        Skill::query()
            ->create([
                'name_en'       => 'Adjusting the sails',
                'name_fr'       => 'Réglage des voiles',
            ]); // 14

        //Spinnaker
        Skill::query()
            ->create([
                'name_en'       => 'Iron the spi in the bag and avoid the spin',
                'name_fr'       => 'Ferler le spi dans le sac et éviter la vrille',
            ]); // 15
        Skill::query()
            ->create([
                'name_en'       => 'Place the spinnaker bag on the foredeck',
                'name_fr'       => 'Placer le sac de spi à poste au balcon avant',
            ]); // 16
        Skill::query()
            ->create([
                'name_en'       => 'Swing the pole to the right height',
                'name_fr'       => 'Brasser le tangon à la bonne hauteur',
            ]); // 17
        Skill::query()
            ->create([
                'name_en'       => 'Hoist the spinnaker and adjust it to give the best lift',
                'name_fr'       => 'Hisser le spi et régler pour qu’il donne la meilleure portance',
            ]); // 18
        Skill::query()
            ->create([
                'name_en'       => 'Gybing without the spinnaker emptying and adequate position of the crew',
                'name_fr'       => 'Empanner sans que le spi se vide et position adéquate des équipiers',
            ]); // 19
        Skill::query()
            ->create([
                'name_en'       => 'Lower the spinnaker efficiently to be re-hoisted quickly',
                'name_fr'       => 'Affaler le spi efficacement pour être re-hissé rapidement',
            ]); // 20
    }
}
