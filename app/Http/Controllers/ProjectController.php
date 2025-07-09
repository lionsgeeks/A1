<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with('category')->where('status', 'active');

        // Filter by category if provided
        if ($request->category) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        $projects = $query->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        // Get all categories with project counts for the filter
        $categories = \App\Models\Category::active()
            ->ordered()
            ->withCount(['projects' => function ($query) {
                $query->where('status', 'active');
            }])
            ->get();

        return Inertia::render('projects', [
            'projects' => [
                'data' => $projects
            ],
            'categories' => $categories,
            'selectedCategory' => $request->category
        ]);
    }

    public function show(Project $project)
    {
        // Load the category relationship
        $project->load('category');

        // Get related projects (same category, excluding current project)
        $relatedProjects = Project::with('category')
            ->where('status', 'active')
            ->where('category_id', $project->category_id)
            ->where('id', '!=', $project->id)
            ->limit(3)
            ->get();

        return Inertia::render('project-detail', [
            'project' => $project,
            'relatedProjects' => $relatedProjects
        ]);
    }
}
