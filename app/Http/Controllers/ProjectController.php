<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query()->where('status', 'active');

        // Filter by category if provided
        if ($request->category) {
            $categoryParam = $request->category;
            $categoryId = \App\Models\Category::where('slug', $categoryParam)->orWhere('name', $categoryParam)->value('id');
            if ($categoryId) {
                $query->whereRaw("json_valid(category_ids) AND exists (select 1 from json_each(category_ids) where json_each.value = ?)", [(int) $categoryId]);
            } else {
                $query->whereRaw('1=0');
            }
        }

        $projects = $query->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        // Get all categories (no counts)
        $categories = \App\Models\Category::active()->ordered()->get();

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
        // No relation to load — categories via JSON ids

        // Get related projects (share any category id, excluding current project)
        $relatedProjects = Project::query()
            ->where('status', 'active')
            ->whereRaw("json_valid(category_ids)")
            ->where(function($q) use ($project) {
                $ids = array_map('intval', (array) ($project->category_ids ?? []));
                if (count($ids) === 0) {
                    $q->whereRaw('1=0');
                    return;
                }
                $placeholders = implode(',', array_fill(0, count($ids), '?'));
                $q->whereRaw("exists (select 1 from json_each(category_ids) where json_each.value in ($placeholders))", $ids);
            })
            ->where('id', '!=', $project->id)
            ->limit(3)
            ->get();

        return Inertia::render('project-detail', [
            'project' => $project,
            'relatedProjects' => $relatedProjects
        ]);
    }
}
