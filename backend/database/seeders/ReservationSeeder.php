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
        Reservation::query()
            ->create([
                'first_name'       => 'Robert',
                'last_name'        => 'De Niro',
                'address'          => '2022-06-11 00:00:01',
                'phone_number'     => '514-555-5559',
                'birthdate'        => '28/09/1992',
                'email'            => 'robert@de.niro',
                'payment'          => 'Deposit',
                'number_of_people' => 2,
            ]);
    }
}
