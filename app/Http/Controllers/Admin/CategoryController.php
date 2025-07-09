<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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
            'is_active' => 'boolean'
        ]);

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
            'is_active' => 'boolean'
        ]);

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

        $category->delete();

        return Redirect::route('admin.categories.index')->with('success', 'Category deleted successfully!');
    }
}
