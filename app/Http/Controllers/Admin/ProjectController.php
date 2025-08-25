<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        $projects = $query->with('category')
                         ->orderBy('sort_order')
                         ->orderBy('created_at', 'desc')
                         ->paginate(12);

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'category'])
        ]);
    }

    public function create()
    {
        $categories = \App\Models\Category::active()->ordered()->get();

        return Inertia::render('admin/projects/create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'start_year' => 'nullable|string|max:4',
            'end_year' => 'nullable|string|max:4',
            'description' => 'string',
            'achievement_status' => 'nullable|string|max:255',
            'surface_area' => 'nullable|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'project_cost' => 'nullable|string|max:255',
            'duration_months' => 'nullable|integer|min:0',
            'status' => 'in:active,inactive',
            'sort_order' => 'integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,gif',
            'pdf' => 'nullable|mimes:pdf|max:20480',
        ]);

        // Upload PDF if provided
        if ($request->hasFile('pdf')) {
            $pdfFile = $request->file('pdf');
            $filename = Str::uuid() . '.' . $pdfFile->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('projects', $pdfFile, $filename);
            $validated['pdf_path'] = '/storage/projects/' . $filename;
        }

        // Upload main image
        $imagePath = $this->imageUploadService->uploadImage($request->file('image'));
        $validated['image_path'] = $imagePath;

        // Upload gallery images if provided
        if ($request->hasFile('gallery_images')) {
            $galleryPaths = $this->imageUploadService->uploadMultipleImages($request->file('gallery_images'));
            $validated['gallery_images'] = $galleryPaths;
        }

        Project::create($validated);

        return Redirect::route('admin.projects.index');
    }

    public function edit(Project $project)
    {
        $categories = \App\Models\Category::active()->ordered()->get();

        return Inertia::render('admin/projects/create', [
            'project' => $project,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'location' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:4',
            'start_year' => 'nullable|string|max:4',
            'end_year' => 'nullable|string|max:4',
            'description' => 'string',
            'achievement_status' => 'nullable|string|max:255',
            'surface_area' => 'nullable|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'project_cost' => 'nullable|string|max:255',
            'duration_months' => 'nullable|integer|min:0',
            'status' => 'in:active,inactive',
            'sort_order' => 'integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,gif',
            'pdf' => 'nullable|mimes:pdf|max:20480',
        ]);

        // Upload new PDF if provided
        if ($request->hasFile('pdf')) {
            if ($project->pdf_path) {
                $storagePath = str_replace('/storage/', '', $project->pdf_path);
                Storage::disk('public')->delete($storagePath);
            }
            $pdfFile = $request->file('pdf');
            $filename = Str::uuid() . '.' . $pdfFile->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('projects', $pdfFile, $filename);
            $validated['pdf_path'] = '/storage/projects/' . $filename;
        }

        // Upload new main image if provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($project->image_path) {
                $this->imageUploadService->deleteImage($project->image_path);
            }
            $validated['image_path'] = $this->imageUploadService->uploadImage($request->file('image'));
        }

        // Upload new gallery images if provided (only for create mode, not edit mode)
        if ($request->hasFile('gallery_images') && !$project->gallery_images) {
            $validated['gallery_images'] = $this->imageUploadService->uploadMultipleImages($request->file('gallery_images'));
        }

        $project->update($validated);

        return Redirect::route('admin.projects.index');
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
        if ($project->pdf_path) {
            $storagePath = str_replace('/storage/', '', $project->pdf_path);
            Storage::disk('public')->delete($storagePath);
        }

        $project->delete();

        return Redirect::route('admin.projects.index');
    }

    public function deleteGalleryImage(Project $project, $index)
    {
        try {
            $galleryImages = $project->gallery_images ?? [];

            if (isset($galleryImages[$index])) {
                // Delete the image file
                $this->imageUploadService->deleteImage($galleryImages[$index]);

                // Remove from array
                unset($galleryImages[$index]);

                // Reindex array to maintain proper indexing
                $galleryImages = array_values($galleryImages);

                // Update project
                $project->update(['gallery_images' => $galleryImages]);

                return response()->json(['success' => true, 'message' => 'Gallery image deleted successfully!']);
            }

            return response()->json(['success' => false, 'message' => 'Image not found!'], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting gallery image: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error deleting image: ' . $e->getMessage()], 500);
        }
    }

    public function addGalleryImage(Request $request, Project $project)
    {
        try {
            $request->validate([
                'gallery_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
            ]);

            $galleryImages = $project->gallery_images ?? [];

            // Upload new image
            $newImagePath = $this->imageUploadService->uploadImage($request->file('gallery_image'));

            // Add to gallery
            $galleryImages[] = $newImagePath;

            // Update project
            $project->update(['gallery_images' => $galleryImages]);

            return response()->json([
                'success' => true,
                'message' => 'Gallery image added successfully!',
                'image_path' => $newImagePath,
                'gallery_images' => $galleryImages
            ]);
        } catch (\Exception $e) {
            Log::error('Error adding gallery image: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error uploading image: ' . $e->getMessage()], 500);
        }
    }
}
