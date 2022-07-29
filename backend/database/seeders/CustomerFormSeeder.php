<?php

namespace Database\Seeders;

use App\Models\CustomerForm;
use Illuminate\Database\Seeder;

class CustomerFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createCustomerForms();
    }

    /**
     * @return void
     */
    private function createCustomerForms(): void
    {
        CustomerForm::query()
            ->create([
                'first_name'     => 'Abigail',
                'last_name'      => 'Monfils',
                'email'          => 'abigail@monfils.com',
                'address'        => '123 fausse rue',
                'phone_number'   => '514-527-4321',
                'birthdate'      => '12/12/12',
                'reservation_id' => 1
            ]);
        CustomerForm::query()
            ->create([
                'first_name'     => 'George',
                'last_name'      => 'Lucas',
                'email'          => 'george@lucas.com',
                'address'        => 'Lucas ranch',
                'phone_number'   => '514-527-4321',
                'birthdate'      => '12/12/12',
                'reservation_id' => 1
            ]);
    }
}
