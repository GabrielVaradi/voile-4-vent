<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createFaqs();
    }

    /**
     * @return void
     */
    private function createFaqs(): void
    {
        Faq::query()
            ->create([
                'question_en' => "What equipment should I bring with me?",
                'question_fr' => "Quel équipement est-il nécessaire d'apporter?",
                'answer_en' => "It is very important to bring food and a lot of water for the day. 
                                It is preferable to bring your life jacket however it can be provided on board the sailboat. It is recommended to wear shoes that do not mark the deck of the boat.
                                Sailing is dependent on the weather conditions, the foreseeing sailor will have to bring in his luggage: fleece, raincoat, sunglasses, sunscreen, hat, swimsuit and towel.
                                Poseidon and Aeolus are usually kind to new sailors, maybe...",
                'answer_fr' => "Il est très important d'amener de la nourriture ainsi que beaucoup d'eau pour la journée.
                                Il est préférable d’apporter votre veste de flottaison cependant elle peut être fournie à bord du voilier. Il est recommandé de porter des chaussures 
                                qui ne marquent pas le pont du bateau.  La voile est tributaire des conditions météo, le marin prévoyant devra apporter dans son bagage: laine polaire,
                                imperméable, lunette de soleil, crème solaire, chapeau, maillot de bain et serviette. Poséidon et Éole sont habituellement cléments pour les nouveaux marins, peut-être...",
            ]);
        Faq::query()
            ->create([
                'question_en' => "How to find us?",
                'question_fr' => "Comment nous trouver?",
                'answer_en' => "Baie D’Urfé Nautical Club. 20436 Lakeshore Road, Carrière intersection, H9X 1P7 Highway 20, exit # 42 Morgan Boulevard south to Lakeshore. Facing City Hall, 
                                turn right west on Lakeshore. 30 meters, first entrance on the left.",
                'answer_fr' => "Club nautique de Baie D’Urfé. 20436 chemin Lakeshore, intersection Carrière, H9X 1P7, Autoroute 20, sortie # 42 boulevard Morgan sud jusqu’à Lakeshore. 
                                Face à l'hôtel de ville, tourner à droite vers l’ouest sur Lakeshore. 30 mètres, première entrée à gauche.",
            ]);
        Faq::query()
            ->create([
                'question_en' => "What is the boarding time?",
                'question_fr' => "Quelle est l'heure d'embarquement?",
                'answer_en' => "We board at 9AM and finish the day around 4:30PM. Don't be late!",
                'answer_fr' => "L'embarquement a lieu à 9AM et la journée se termine vers 4:30PM. Ne soyez pas en retard!",
            ]);
        Faq::query()
            ->create([
                'question_en' => "What kind of sailing boats I am going to sail on?",
                'question_fr' => "Sur quel type de voilier je vais naviguer?",
                'answer_en' => "In Montreal, the fleet is made up of several Tanzer 22s. This sailboat perfectly frames the elementary cruise program. 
                                With its large cockpit, this model is designed for great visibility from the deck. It makes it more easy to master maneuvers and it is not negligible for
                                beginners.",
                'answer_fr' => "À Montréal, la flotte est composée de plusieurs Tanzer 22. Ce voilier encadre parfaitement le programme croisière élémentaire.
                                Avec son large cockpit, ce modèle est conçu pour la grande visibilité du pont. Ça rend la maîtrise des manœuvres plus facile et c'est non négligeable pour débuter.",
            ]);
        Faq::query()
            ->create([
                'question_en' => "How can I properly prepare for the course?",
                'question_fr' => "Comment me préparer adéquatement au cours?",
                'answer_en' => "We strongly recommends that you read the manual “Initiation to cruising sailing“. Essential technical manual to familiarize yourself with the maneuvers and the rich 
                                vocabulary of sailing. It costs $35.00, plus postage, if applicable. You can add it directly when you book if wanted.",
                'answer_fr' => "Nous vous recommandons fortement la lecture du manuel “Initiation à la voile croisière“. Manuel technique indispensable pour vous familiariser avec les 
                                manœuvres et le riche vocabulaire de la voile. Son coût est $35.00, plus frais d’envoi postal, si il y a. Vous pouvez vous le procurer directement en effectuant votre réservation sur notre site.",

            ]);
        Faq::query()
            ->create([
                'question_en' => "How many crew member can we expect on board?",
                'question_fr' => "Combien il y a t'il de membres d'équipage à bord?",
                'answer_en' => "The crew consists of 3 to 4 trainees plus the instructor. You will be paired with other trainees to form the crew. After your training, you can rent an identical 
                                sailboat by communicating through the school's Facebook, with other trainees to share the rental and the pleasure.",
                'answer_fr' => "L’équipage se compose de 3 à 4 stagiaires en plus de l'instructeur. Vous serez jumelés à d’autres stagiaires pour former l’équipage. Après votre formation, vous 
                                pourrez louer un voilier identique en communiquant par le Facebook de l’école, avec d’autres stagiaires pour partager la location et le plaisir. ",
            ]);
        Faq::query()
            ->create([
                'question_en' => "Do I need to have my Pleasure Craft Operator Card (PCOC)?",
                'question_fr' => "Est-ce que je dois posséder ma carte de conducteur d'embarcation de plaisance (CCEP)?",
                'answer_en' => "In Canada, any boat operator equipped with a motor must have an operator card. However, you are not required to take formal training prior the sailcourse.
                                All you need to do is take the exam online on the platform of your choice after your course.",
                'answer_fr' => "Au Canada, tout conducteur d’embarcation muni d’un moteur doit détenir sa carte d’opérateur. Cependant, vous n'êtes pas obligés de suivre la formation officielle 
                                avant le cours de voile. Il vous suffira de passer l'examen en ligne sur la plateforme de votre choix après votre cours.",
            ]);
        Faq::query()
            ->create([
                'question_en' => "What are the impacts of the weather condition??",
                'question_fr' => "Quels sont les impacts de la condition météo?",
                'answer_en' => "If the established wind speed is greater than 25 knots, when boarding, Voile 4 Vents reserves the right to postpone the outing. 
                                Rain, lack of sun are not conditions for modifying or canceling an outing and/or training.",
                'answer_fr' => "Si la vitesse du vent établi est supérieure à 25 nœuds, lors de l’embarquement, Voile 4 Vents se réserve le droit de reporter la sortie. 
                                La pluie, le manque de soleil ne sont pas des conditions pour modifier ou annuler une sortie et/ou formation.",
            ]);
    }
}