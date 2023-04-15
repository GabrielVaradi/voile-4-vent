<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createEvents();
    }

    /**
     * @return void
     */
    private function createEvents(): void
    {
        Event::query()
            ->create([
                'title_en' => 'Basic skipper course',
                'title_fr' => 'Brevet croisière élémentaire',
                'start' => '2022-10-08 00:00:01',
                'end' => '2022-10-09 00:00:01',
                'max_reservations' => Event::maxReservations,
                'type' => 'beginner_skipper'
            ]);
    }
}