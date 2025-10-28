<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Milestone;

class MilestoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $milestones = [
            [
                'year' => '2001 - 2011',
                'title' => 'Premières collaborations',
                'description' => "Premières collaborations des\nfondateurs au sein\nde l’agence KILO",
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'year' => '2012',
                'title' => 'CRÉATION D’ATELIER A1',
                'description' => '',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'year' => '2013',
                'title' => 'Premières interventions',
                'description' => "Premières\ninterventions dans la\nréhabilitation du\npatrimoine.\n\nPROJET DE RESTAURATION\nET RÉHABILITATION DES\nFOUNDOUKS,\nBARKA, STAOUIYINE,\nCHEMAYINE & SBITRIYINE",
                'sort_order' => 3,
                'is_active' => true
            ],
            [
                'year' => '2016',
                'title' => 'Projets urbains et culturels',
                'description' => "Développement de\nprojets urbains et\nculturels d’envergure.\n\nRECONVERSION DE\nL’ÉGLISE DU SACRÉ\nCOEUR\n\nAMÉNAGEMENT\nDES LIGNES DE\nTRAM 3 & 4\nCASABLANCA",
                'sort_order' => 4,
                'is_active' => true
            ],
            [
                'year' => '2020',
                'title' => 'Consolidation',
                'description' => "Consolidation des\nexpériences dans\nl’aménagement\nurbain, avec une\napproche de plus en\nplus transversale.\n\nAMÉNAGEMENT DE LA\nCORNICHE DAR\nBOUAZZA",
                'sort_order' => 5,
                'is_active' => true
            ],
            [
                'year' => '2023 - aujourd’hui',
                'title' => 'Projets variés',
                'description' => "Déploiement de projets variés –\nÉquipements structurants,\naménagements urbains et\ncomplexes intégrés – avec une\nattention renouvelée aux\nenjeux sociaux,\nenvironnementaux et\nterritoriaux.\n\nÉTUDE D’AMÉNAGEMENT\nDES LIGNES BHNS\nMARRAKECH",
                'sort_order' => 6,
                'is_active' => true
            ],
        ];

        foreach ($milestones as $milestone) {
            Milestone::create($milestone);
        }
    }
}
