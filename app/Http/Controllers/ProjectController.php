<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

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

    public function print(Project $project)
    {
        // Build absolute URLs for images so they work in print too
        $imageUrls = [];
        if ($project->image_path) {
            $imageUrls[] = url($project->image_path);
        }
        if (is_array($project->gallery_images)) {
            foreach ($project->gallery_images as $img) {
                // Handle new format with thumbnails
                if (is_array($img) && isset($img['full'])) {
                    $imageUrls[] = url($img['full']);
                } else {
                    // Handle old format (single path)
                    $imageUrls[] = url($img);
                }
            }
        }

        // Embed logo as base64 (resources/assets/images/@A1.png)
        $logoDataUri = null;
        $logoPath = resource_path('assets/images/@A1.png');
        if (file_exists($logoPath)) {
            $logoData = base64_encode(file_get_contents($logoPath));
            $logoDataUri = 'data:image/png;base64,' . $logoData;
        }

        return view('print.project', [
            'project' => $project,
            'images' => $imageUrls,
            'logoDataUri' => $logoDataUri,
        ]);
    }

    public function downloadPdf(Project $project)
    {
        // Convert images to base64 for PDF embedding
        $imageData = [];
        
        // Process main image
        if ($project->image_path) {
            $imagePath = public_path($project->image_path);
            if (file_exists($imagePath)) {
                $imageData[] = [
                    'data' => 'data:image/jpeg;base64,' . base64_encode(file_get_contents($imagePath)),
                    'type' => 'main'
                ];
            }
        }
        
        // Process gallery images (show all images)
        if (is_array($project->gallery_images)) {
            foreach ($project->gallery_images as $img) {
                $imagePath = null;
                if (is_array($img) && isset($img['full'])) {
                    $imagePath = public_path($img['full']);
                } else {
                    $imagePath = public_path($img);
                }
                
                if ($imagePath && file_exists($imagePath)) {
                    $imageData[] = [
                        'data' => 'data:image/jpeg;base64,' . base64_encode(file_get_contents($imagePath)),
                        'type' => 'gallery'
                    ];
                }
            }
        }

        // Skip logo processing for maximum speed
        $logoDataUri = null;

        $pdf = Pdf::setOptions([
                'isRemoteEnabled' => false, // Disable remote loading since we're using base64
                'isHtml5ParserEnabled' => false,
                'isPhpEnabled' => false,
                'isFontSubsettingEnabled' => false,
                'isJavascriptEnabled' => false,
            ])
            ->loadView('print.project', [
                'project' => $project,
                'images' => $imageData,
                'logoDataUri' => $logoDataUri,
            ])
            ->setPaper('a4', 'portrait')
            ->setOptions(['dpi' => 150]);

        $filename = 'Projet-' . preg_replace('/[^A-Za-z0-9\-]+/', '-', $project->title) . '.pdf';

        return $pdf->download($filename);
    }

}
