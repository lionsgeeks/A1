<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProjectController extends Controller
{
    protected $imageUploadService;

    public function __construct(ImageUploadService $imageUploadService)
    {
        $this->imageUploadService = $imageUploadService;
    }

    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        if ($request->category) {
            $query->where('category', $request->category);
        }

        $projects = $query->orderBy('sort_order')
                         ->orderBy('created_at', 'desc')
                         ->paginate(12);

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'category'])
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'year' => 'required|string|max:4',
            'description' => 'required|string|max:500',
            'details' => 'required|string',
            'status' => 'required|in:active,draft,archived',
            'sort_order' => 'integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        // Upload main image
        $imagePath = $this->imageUploadService->uploadImage($request->file('image'));
        $validated['image_path'] = $imagePath;

        // Upload gallery images if provided
        if ($request->hasFile('gallery_images')) {
            $galleryPaths = $this->imageUploadService->uploadMultipleImages($request->file('gallery_images'));
            $validated['gallery_images'] = $galleryPaths;
        }

        Project::create($validated);

        return Redirect::route('admin.projects.index')->with('success', 'Project created successfully!');
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/create', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'year' => 'required|string|max:4',
            'description' => 'required|string|max:500',
            'details' => 'required|string',
            'status' => 'required|in:active,draft,archived',
            'sort_order' => 'integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        // Upload new main image if provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($project->image_path) {
                $this->imageUploadService->deleteImage($project->image_path);
            }
            $validated['image_path'] = $this->imageUploadService->uploadImage($request->file('image'));
        }

        // Upload new gallery images if provided
        if ($request->hasFile('gallery_images')) {
            // Delete old gallery images
            if ($project->gallery_images) {
                $this->imageUploadService->deleteMultipleImages($project->gallery_images);
            }
            $validated['gallery_images'] = $this->imageUploadService->uploadMultipleImages($request->file('gallery_images'));
        }

        $project->update($validated);

        return Redirect::route('admin.projects.index')->with('success', 'Project updated successfully!');
    }

    public function destroy(Project $project)
    {
        // Delete associated images
        if ($project->image_path) {
            $this->imageUploadService->deleteImage($project->image_path);
        }
        if ($project->gallery_images) {
            $this->imageUploadService->deleteMultipleImages($project->gallery_images);
        }

        $project->delete();

        return Redirect::route('admin.projects.index')->with('success', 'Project deleted successfully!');
    }
}
