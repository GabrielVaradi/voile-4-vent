<?php

namespace Database\Seeders;

use App\Models\Admin\AllowedSkipper;
use Illuminate\Database\Seeder;

class AllowedSkipperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createAllowedSkippers();
    }

    /**
     * @return void
     */
    private function createAllowedSkippers(): void
    {
        AllowedSkipper::factory()
            ->count(50)
            ->create();
    }
}
