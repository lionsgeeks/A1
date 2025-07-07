<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('status', 'active')
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('projects', [
            'projects' => [
                'data' => $projects
            ]
        ]);
    }

    public function show(Project $project)
    {
        // Get related projects (same category, excluding current project)
        $relatedProjects = Project::where('status', 'active')
            ->where('category', $project->category)
            ->where('id', '!=', $project->id)
            ->limit(3)
            ->get();

        return Inertia::render('project-detail', [
            'project' => $project,
            'relatedProjects' => $relatedProjects
        ]);
    }
}
