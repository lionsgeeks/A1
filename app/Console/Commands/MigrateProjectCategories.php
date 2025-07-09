<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MigrateProjectCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:project-categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate existing projects to use category_id instead of category name';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting project category migration...');

        $projects = \App\Models\Project::whereNotNull('category')
            ->whereNull('category_id')
            ->get();

        $migrated = 0;
        $skipped = 0;

        foreach ($projects as $project) {
            // Find category by name (case-insensitive)
            $category = \App\Models\Category::whereRaw('LOWER(name) = ?', [strtolower($project->category)])->first();

            if ($category) {
                $project->update(['category_id' => $category->id]);
                $migrated++;
                $this->line("✓ Migrated project '{$project->title}' to category '{$category->name}'");
            } else {
                $skipped++;
                $this->warn("⚠ Skipped project '{$project->title}' - category '{$project->category}' not found");
            }
        }

        $this->info("Migration completed!");
        $this->info("Migrated: {$migrated} projects");
        $this->info("Skipped: {$skipped} projects");

        if ($skipped > 0) {
            $this->warn("Please create missing categories in the admin panel and run this command again.");
        }
    }
}
