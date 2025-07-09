<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        $categories = $query->withCount(['projects' => function ($query) {
                $query->where('status', 'active');
            }])
            ->ordered()
            ->paginate(15);

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string|max:1000',
            'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

            // Create directory if it doesn't exist
            $uploadPath = public_path('storage/categories');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            // Resize and save image
            $manager = new ImageManager(new Driver());
            $img = $manager->read($image);
            $img->scaleDown(800, 600);
            $img->save($uploadPath . '/' . $filename, 85);

            $validated['image_path'] = 'storage/categories/' . $filename;
        }

        Category::create($validated);

        return Redirect::route('admin.categories.index')->with('success', 'Category created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('admin/categories/create', [
            'category' => $category->load('projects')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string|max:1000',
            'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($category->image_path && file_exists(public_path($category->image_path))) {
                unlink(public_path($category->image_path));
            }

            $image = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

            // Create directory if it doesn't exist
            $uploadPath = public_path('storage/categories');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            // Resize and save image
            $manager = new ImageManager(new Driver());
            $img = $manager->read($image);
            $img->scaleDown(800, 600);
            $img->save($uploadPath . '/' . $filename, 85);

            $validated['image_path'] = 'storage/categories/' . $filename;
        }

        $category->update($validated);

        return Redirect::route('admin.categories.index')->with('success', 'Category updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Check if category has projects
        $projectsCount = $category->projects()->count();

        if ($projectsCount > 0) {
            return Redirect::route('admin.categories.index')
                ->with('error', "Cannot delete category '{$category->name}' because it has {$projectsCount} project(s). Please reassign or delete the projects first.");
        }

        // Delete image if exists
        if ($category->image_path && file_exists(public_path($category->image_path))) {
            unlink(public_path($category->image_path));
        }

        $category->delete();

        return Redirect::route('admin.categories.index')->with('success', 'Category deleted successfully!');
    }

    /**
     * Delete category image
     */
    public function deleteImage(Category $category)
    {
        if ($category->image_path && file_exists(public_path($category->image_path))) {
            unlink(public_path($category->image_path));
        }

        $category->update(['image_path' => null]);

        return response()->json(['success' => true, 'message' => 'Image deleted successfully']);
    }
}
