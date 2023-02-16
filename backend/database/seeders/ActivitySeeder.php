<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createActivities();
    }

    /**
     * @return void
     */
    private function createActivities(): void
    {
        Activity::query()
            ->create([
                'title_en' => 'Coucher de Soleil [EN]',
                'title_fr' => 'Coucher de Soleil',
                'description_en' => "Sailing on Lake St-Louis with friends. You will be able to contemplate the flamboyant colors taking shape at sunset and return under a starry moonlit night. Learn to play with the invisible, enjoy a relaxed or exhilarating atmosphere: it's up to you...and Aeolus. Rest assured, the latter is usually lenient for new sailors.",
                'description_fr' => 'Naviguer sur le lac St-Louis entre amis. Vous pourrez contempler les flamboyantes couleurs se dessiner au coucher de soleil et faire un retour sous une nuit étoilée au clair de lune. Apprenez à jouer avec l’invisible, profitez d’une ambiance détendue ou enivrante : cela ne dépend que de vous…et d’Éole. Soyez rassuré! Ce dernier est habituellement clément pour les nouveaux marins.',
                'duration_en' => '3 hours',
                'duration_fr' => '3 heures',
                'price' => 79,
                'image_path' => '/images/activities/voile4vents_sunset_cruise.jpg',
                'type' => 'sunset_cruise'
            ]);
        Activity::query()
            ->create([
                'title_en' => 'Corporate sailing',
                'title_fr' => 'Voile corporative',
                'description_en' => "Team spirit, sailing and business have a lot in common. Only the team with the best cohesion has a chance of arriving safely, leading the pack. No place for individualism on a boat. Improve your work team. Get out of the office, train your teams and hoist the sails for a corporate regatta or a maritime getaway. Three identical sailboats can be chartered to accommodate your teams.",
                'description_fr' => 'L’esprit d’équipe, naviguer et les affaires ont beaucoup en commun.  Seul l’équipe avec la meilleure cohésion à des chances d’arriver à bon port, en-tête du peloton. Aucune place pour l’individualisme sur un bateau. Améliorer votre équipe de travail. Sortez du bureau, former vos équipes et hissons les voiles pour une régate corporative ou une échappée maritime. Trois voiliers identiques peuvent être affrétés pour accueillir vos équipes.',
                'duration_en' => '1 day',
                'duration_fr' => '1 journée',
                'price' => 135,
                'image_path' => '/images/activities/voile4vents_corporative.jpg',
                'type' => 'corporative_sailing'
            ]);
    }
}