<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Category;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $categories = [
            [
                'name' => 'AMÉNAGEMENT URBAIN',
                'description' => 'Projets d\'aménagement et de planification urbaine',
                'color' => '#a3845b',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'CULTUREL',
                'description' => 'Projets culturels et patrimoniaux',
                'color' => '#8b7355',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'HÔTELLERIE',
                'description' => 'Projets hôteliers et d\'hospitalité',
                'color' => '#9d8660',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'INDUSTRIE',
                'description' => 'Projets industriels et commerciaux',
                'color' => '#7a6b4f',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'PATRIMOINE',
                'description' => 'Projets de restauration et conservation du patrimoine',
                'color' => '#b8a082',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'RÉSIDENTIEL',
                'description' => 'Projets résidentiels et logements',
                'color' => '#6d5f47',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'TERTIAIRE',
                'description' => 'Projets de bureaux et espaces tertiaires',
                'color' => '#8f7d65',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'TOURISME',
                'description' => 'Projets touristiques et de loisirs',
                'color' => '#a69177',
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['name' => $categoryData['name']],
                $categoryData
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $categoryNames = [
            'AMÉNAGEMENT URBAIN',
            'CULTUREL',
            'HÔTELLERIE',
            'INDUSTRIE',
            'PATRIMOINE',
            'RÉSIDENTIEL',
            'TERTIAIRE',
            'TOURISME',
        ];

        Category::whereIn('name', $categoryNames)->delete();
    }
};
