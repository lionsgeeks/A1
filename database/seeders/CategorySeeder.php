<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Residential',
                'description' => 'Houses, apartments, and other residential buildings',
                'color' => '#22c55e',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'name' => 'Commercial',
                'description' => 'Office buildings, retail spaces, and commercial complexes',
                'color' => '#3b82f6',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'name' => 'Industrial',
                'description' => 'Factories, warehouses, and industrial facilities',
                'color' => '#f97316',
                'sort_order' => 3,
                'is_active' => true
            ],
            [
                'name' => 'Cultural',
                'description' => 'Museums, theaters, and cultural institutions',
                'color' => '#8b5cf6',
                'sort_order' => 4,
                'is_active' => true
            ],
            [
                'name' => 'Educational',
                'description' => 'Schools, universities, and educational facilities',
                'color' => '#eab308',
                'sort_order' => 5,
                'is_active' => true
            ],
            [
                'name' => 'Healthcare',
                'description' => 'Hospitals, clinics, and medical facilities',
                'color' => '#ef4444',
                'sort_order' => 6,
                'is_active' => true
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
