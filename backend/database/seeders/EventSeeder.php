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
                'title_en'             => 'Basic sailing something',
                'title_fr'             => 'Brevet Croisiere elementaire',
                'start'                => '2022-07-09 00:00:01',
                'end'                  => '2022-07-10 00:00:01',
                'max_reservations'     => 8,
                'type'                 => 'beginner_skipper'
            ]);

        Event::query()
            ->create([
                'title_en'             => 'Initiation day',
                'title_fr'             => 'Journee initiation',
                'start'                => '2022-07-12 00:00:01',
                'end'                  => '2022-07-12 00:00:01',
                'max_reservations'     => 8,
                'type'                 => 'initiation'
            ]);
    }
}
