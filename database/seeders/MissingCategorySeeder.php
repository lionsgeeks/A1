<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MissingCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get unique categories from existing projects that don't have a category_id
        $existingCategories = \App\Models\Project::whereNotNull('category')
            ->whereNull('category_id')
            ->distinct()
            ->pluck('category')
            ->toArray();

        foreach ($existingCategories as $categoryName) {
            // Check if category already exists (case-insensitive)
            $existingCategory = \App\Models\Category::whereRaw('LOWER(name) = ?', [strtolower($categoryName)])->first();

            if (!$existingCategory) {
                \App\Models\Category::create([
                    'name' => ucfirst($categoryName),
                    'description' => "Auto-created category for {$categoryName} projects",
                    'color' => '#' . substr(md5($categoryName), 0, 6), // Generate a color based on name
                    'sort_order' => 999, // Put at the end
                    'is_active' => true
                ]);

                echo "Created category: {$categoryName}\n";
            } else {
                echo "Category already exists: {$categoryName} (matched with {$existingCategory->name})\n";
            }
        }
    }
}
