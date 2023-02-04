<?php

namespace Database\Seeders;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createUsers();
    }

    /**
     * @return void
     */
    private function createUsers(): void
    {
//        User::query()
//            ->create([
//                'name'     => 'Admin',
//                'email'    => 'admin@admin.com',
//                'password' => Hash::make('password'),
//            ]);
    }
}
