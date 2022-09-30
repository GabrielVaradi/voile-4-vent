<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createReservations();
    }

    /**
     * @return void
     */
    private function createReservations(): void
    {
        $reservation1 = Reservation::query()
            ->create([
                'type' => 'beginner_skipper',
            ]);
        $reservation1->event()->sync([1]);
        $reservation2 = Reservation::query()
            ->create([
                'type' => 'beginner_skipper',
            ]);
        $reservation2->event()->sync([1]);
    }
}
