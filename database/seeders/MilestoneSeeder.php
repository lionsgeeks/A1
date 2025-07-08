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
                'year' => '2003',
                'title' => 'Company Founded',
                'description' => 'ARCH Studio founded with a vision to transform architectural design and create spaces that inspire.',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'year' => '2008',
                'title' => 'First Major Project',
                'description' => 'Completed our first major commercial project - Downtown Business Center, establishing our reputation in the industry.',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'year' => '2012',
                'title' => 'International Recognition',
                'description' => 'Received our first international architecture award for sustainable design, marking our commitment to environmental responsibility.',
                'sort_order' => 3,
                'is_active' => true
            ],
            [
                'year' => '2015',
                'title' => 'Service Expansion',
                'description' => 'Expanded operations to include urban planning and landscape architecture, offering comprehensive design solutions.',
                'sort_order' => 4,
                'is_active' => true
            ],
            [
                'year' => '2018',
                'title' => '100 Projects Milestone',
                'description' => 'Reached milestone of 100 completed projects across residential and commercial sectors, showcasing our versatility.',
                'sort_order' => 5,
                'is_active' => true
            ],
            [
                'year' => '2021',
                'title' => 'Green Building Initiative',
                'description' => 'Launched our green building certification program, leading the industry in sustainable architecture practices.',
                'sort_order' => 6,
                'is_active' => true
            ],
            [
                'year' => '2024',
                'title' => '20+ Years of Excellence',
                'description' => 'Celebrating over 20 years of architectural excellence with 150+ completed projects and numerous industry awards.',
                'sort_order' => 7,
                'is_active' => true
            ]
        ];

        foreach ($milestones as $milestone) {
            Milestone::create($milestone);
        }
    }
}
