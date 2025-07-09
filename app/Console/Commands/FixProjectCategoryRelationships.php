<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FixProjectCategoryRelationships extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:project-category-relationships';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix and verify project-category relationships';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔧 Fixing Project-Category Relationships');
        $this->newLine();

        // Check current state
        $this->info('📊 Current State:');
        $projects = \App\Models\Project::all();
        $categories = \App\Models\Category::all();

        $this->line("Categories: {$categories->count()}");
        $this->line("Projects: {$projects->count()}");
        $this->newLine();

        // Show categories
        $this->info('📂 Available Categories:');
        foreach ($categories as $category) {
            $this->line("  {$category->id}: {$category->name}");
        }
        $this->newLine();

        // Show projects and their current category assignments
        $this->info('📋 Projects and their categories:');
        foreach ($projects as $project) {
            $categoryInfo = '';
            if ($project->category_id) {
                $category = \App\Models\Category::find($project->category_id);
                if ($category) {
                    $categoryInfo = "✅ category_id: {$project->category_id} ({$category->name})";
                } else {
                    $categoryInfo = "❌ category_id: {$project->category_id} (INVALID - category not found)";
                }
            } else {
                $categoryInfo = "⚠️  No category_id assigned";
            }

            $this->line("  {$project->id}: {$project->title} - {$categoryInfo}");
        }
        $this->newLine();

        // Test relationships
        $this->info('🔗 Testing Relationships:');
        foreach ($projects as $project) {
            if ($project->category_id) {
                $category = $project->category; // Test the relationship
                if ($category) {
                    $this->line("  ✅ Project '{$project->title}' → Category '{$category->name}'");
                } else {
                    $this->error("  ❌ Project '{$project->title}' has category_id {$project->category_id} but relationship failed");
                }
            }
        }
        $this->newLine();

        // Test reverse relationships
        $this->info('🔄 Testing Reverse Relationships:');
        foreach ($categories as $category) {
            $projectCount = $category->projects()->count();
            $this->line("  Category '{$category->name}' has {$projectCount} projects");

            if ($projectCount > 0) {
                $projects = $category->projects;
                foreach ($projects as $project) {
                    $this->line("    - {$project->title}");
                }
            }
        }
        $this->newLine();

        $this->info('✅ Relationship check completed!');
    }
}
