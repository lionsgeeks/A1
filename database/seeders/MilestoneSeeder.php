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
                'description' => 'Premières collaborations des fondateurs au sein de l’agence KILO.',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'year' => '2012',
                'title' => 'CRÉATION D’ATELIER A1',
                'description' => 'Création de l’atelier A1 et début de son activité architecturale.',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'year' => '2013',
                'title' => 'Premières interventions',
                'description' => 'Premières interventions dans la réhabilitation du patrimoine : projet de restauration et réhabilitation des Foundouks, Barka, Staouiniyine, Chemayine & Sbitriyine.',
                'sort_order' => 3,
                'is_active' => true
            ],
            [
                'year' => '2016',
                'title' => 'Projets urbains et culturels',
                'description' => 'Développement de projets urbains et culturels d’envergure : reconversion de l’Église du Sacré-Cœur et aménagement des lignes de tram 3 & 4 à Casablanca.',
                'sort_order' => 4,
                'is_active' => true
            ],
            [
                'year' => '2020',
                'title' => 'Consolidation',
                'description' => 'Consolidation des expériences dans l’aménagement urbain, avec une approche de plus en plus transversale : aménagement de la corniche Dar Bouazza.',
                'sort_order' => 5,
                'is_active' => true
            ],
            [
                'year' => '2023 - aujourd’hui',
                'title' => 'Projets variés',
                'description' => 'Déploiement de projets variés – équipements structurants, aménagements urbains et complexes intégrés – avec une attention renouvelée aux enjeux sociaux, environnementaux et territoriaux : étude d’aménagement des lignes BHNS Marrakech.',
                'sort_order' => 6,
                'is_active' => true
            ],
        ];

        foreach ($milestones as $milestone) {
            Milestone::create($milestone);
        }
    }
}
