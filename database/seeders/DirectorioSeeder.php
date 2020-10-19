<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class DirectorioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

    DB::table('directorios')->insert([
        [
            'nombre' => 'Jeornimo',
            'direccion' => 'Arcos 1953',
            'telefono' => 1126964168,
            'foto' =>null
        ],
        [
            'nombre' => 'Jeornimo2',
            'direccion' => 'Arcos 193',
            'telefono' => 203215,
            'foto' =>null
        ],

         ]);
    }
}
