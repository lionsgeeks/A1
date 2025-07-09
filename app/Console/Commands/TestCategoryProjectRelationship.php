<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestCategoryProjectRelationship extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:category-project-relationship';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test and demonstrate the Category-Project relationship';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔗 Testing Category-Project Relationships');
        $this->newLine();

        // Test 1: Show all categories with their project counts
        $this->info('📂 Categories with Project Counts:');
        $categories = \App\Models\Category::withCount('projects')->get();

        foreach ($categories as $category) {
            $this->line("  • {$category->name} ({$category->projects_count} projects) - Color: {$category->color}");
        }
        $this->newLine();

        // Test 2: Show projects with their categories
        $this->info('📋 Projects with Categories:');
        $projects = \App\Models\Project::with('category')->get();

        foreach ($projects as $project) {
            // Handle both new relationship and old string-based category
            if ($project->category && is_object($project->category)) {
                $categoryName = $project->category->name;
                $categoryColor = $project->category->color;
            } elseif ($project->category_id) {
                $categoryName = 'Category ID: ' . $project->category_id . ' (relationship broken)';
                $categoryColor = 'N/A';
            } elseif ($project->category && is_string($project->category)) {
                $categoryName = $project->category . ' (old string format)';
                $categoryColor = 'N/A';
            } else {
                $categoryName = 'No Category';
                $categoryColor = 'N/A';
            }

            $this->line("  • {$project->title} → {$categoryName} ({$categoryColor})");
        }
        $this->newLine();

        // Test 3: Get projects for a specific category
        $residentialCategory = \App\Models\Category::where('name', 'Residential')->first();
        if ($residentialCategory) {
            $this->info("🏠 Projects in '{$residentialCategory->name}' category:");
            $residentialProjects = $residentialCategory->projects;

            foreach ($residentialProjects as $project) {
                $this->line("  • {$project->title} ({$project->status})");
            }
        }
        $this->newLine();

        // Test 4: Create a new project with category relationship
        $this->info('➕ Creating a new project with category relationship...');

        $category = \App\Models\Category::where('name', 'Commercial')->first();
        if ($category) {
            $newProject = $category->projects()->create([
                'title' => 'Test Office Building',
                'location' => 'Test City, TS',
                'year' => '2024',
                'description' => 'A test project created via relationship',
                'details' => 'This project was created to test the category-project relationship.',
                'status' => 'active',
                'sort_order' => 999
            ]);

            $this->info("✅ Created project: {$newProject->title} in category: {$newProject->category->name}");
        }
        $this->newLine();

        // Test 5: Query projects by category using scopes
        $this->info('🔍 Testing query scopes:');

        $commercialProjects = \App\Models\Project::byCategoryName('Commercial')->get();
        $this->line("  • Found {$commercialProjects->count()} projects in Commercial category");

        $activeProjects = \App\Models\Project::active()->with('category')->get();
        $this->line("  • Found {$activeProjects->count()} active projects total");
        $this->newLine();

        // Test 6: Test category methods
        if ($residentialCategory) {
            $this->info("🏠 Testing category methods for '{$residentialCategory->name}':");
            $this->line("  • Has projects: " . ($residentialCategory->hasProjects() ? 'Yes' : 'No'));
            $this->line("  • Has active projects: " . ($residentialCategory->hasActiveProjects() ? 'Yes' : 'No'));
            $this->line("  • Total projects: {$residentialCategory->all_projects_count}");
            $this->line("  • Active projects: {$residentialCategory->projects_count}");
        }
        $this->newLine();

        $this->info('✅ Relationship testing completed!');
    }
}
