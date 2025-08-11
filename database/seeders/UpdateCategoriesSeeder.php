<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class UpdateCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing categories
        Category::truncate();

        $categories = [
            [
                'name' => 'Aménagement Urbain + Patrimoine et culture',
                'description' => 'Projets d\'aménagement urbain combinés avec patrimoine et culture',
                'color' => '#a3845b',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Aménagement urbain et paysager',
                'description' => 'Projets d\'aménagement urbain et de paysage',
                'color' => '#8b7355',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Équipement',
                'description' => 'Projets d\'équipements publics et privés',
                'color' => '#9d8660',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Industrie et tertiaire',
                'description' => 'Projets industriels et tertiaires',
                'color' => '#7a6b4f',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Patrimoine et culture',
                'description' => 'Projets de patrimoine et culturels',
                'color' => '#b8a082',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Tourisme Hotel & Loisir',
                'description' => 'Projets touristiques, hôteliers et de loisirs',
                'color' => '#6d5f47',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Tourisme Hotel Loisir ET patrimoine',
                'description' => 'Projets touristiques, hôteliers, de loisirs et patrimoniaux',
                'color' => '#8f7d65',
                'sort_order' => 7,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        $this->command->info('Categories updated successfully!');
    }
}
