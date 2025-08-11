<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SampleProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first available category (Residential)
        $residentialCategory = \App\Models\Category::where('name', 'Residential')->first();
        $commercialCategory = \App\Models\Category::where('name', 'Commercial')->first();

        if (!$residentialCategory || !$commercialCategory) {
            $this->command->error('Categories not found. Please run CategorySeeder first.');
            return;
        }

        // Create sample projects with proper category_id relationships
        $projects = [
            [
                'title' => 'Modern Villa Project',
                'category_id' => $residentialCategory->id,
                'location' => 'Beverly Hills, CA',
                'year' => '2024',
                'description' => 'A stunning modern villa featuring clean lines, large windows, and sustainable design elements. This contemporary residential project showcases innovative architectural design with a focus on natural light and open spaces. The villa includes 5 bedrooms, 4 bathrooms, and a spacious living area with panoramic views.',
                'image_path' => 'https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556',
                'gallery_images' => [
                    'https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556',
                    'https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556'
                ],
                'status' => 'active',
                'sort_order' => 1
            ],
            [
                'title' => 'Corporate Headquarters',
                'category_id' => $commercialCategory->id,
                'location' => 'Downtown Los Angeles, CA',
                'year' => '2024',
                'description' => 'A 20-story corporate headquarters building with modern amenities and sustainable features. This commercial project represents the future of office design with flexible workspaces, green building technologies, and state-of-the-art facilities. The building includes retail spaces on the ground floor and premium office suites.',
                'image_path' => 'https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556',
                'gallery_images' => [
                    'https://images.adsttc.com/media/images/5757/f2b9/e58e/cefd/f100/027c/large_jpg/DSC_5456.jpg?1465381556'
                ],
                'status' => 'active',
                'sort_order' => 2
            ]
        ];

        foreach ($projects as $projectData) {
            $project = \App\Models\Project::create($projectData);
            $this->command->info("Created project: {$project->title} (Category: {$project->category->name})");
        }
    }
}
