<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sponsor;

class SponsorsSeeder extends Seeder
{
    public function run(): void
    {
        if (Sponsor::count() > 0) {
            return;
        }

        $seed = [
            ['name' => 'LionsGeek', 'url' => 'https://lionsgeek.ma/', 'logo_path' => '/sponsors/lionsgeek.png'],
            ['name' => 'Casa Mémoire', 'url' => 'https://www.casamemoire.org/', 'logo_path' => '/sponsors/casamemoire.png'],
            ['name' => 'KS Design', 'url' => 'https://www.ksdesignstudio.com/', 'logo_path' => '/sponsors/ksdesign.png'],
            ['name' => 'ICOMOS', 'url' => 'https://www.icomos.org/', 'logo_path' => '/sponsors/icomos.png'],
        ];

        foreach ($seed as $s) {
            Sponsor::create($s);
        }
    }
}


