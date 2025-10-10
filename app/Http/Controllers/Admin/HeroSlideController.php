<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::ordered()->get();
        return Inertia::render('admin/hero-slides/index', [
            'slides' => $slides
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/hero-slides/create');
    }

    public function store(Request $request, ImageUploadService $uploader)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['image_path'] = $uploader->uploadImage($request->file('image'), 'hero', 85, 1920);
        unset($validated['sort_order']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        HeroSlide::create($validated);
        return Redirect::route('admin.hero-slides.index');
    }

    public function edit(HeroSlide $hero_slide)
    {
        return Inertia::render('admin/hero-slides/edit', [
            'slide' => $hero_slide
        ]);
    }

    public function update(Request $request, HeroSlide $hero_slide, ImageUploadService $uploader)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            // no sort order
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($hero_slide->image_path) {
                $uploader->deleteImage($hero_slide->image_path);
            }
            $validated['image_path'] = $uploader->uploadImage($request->file('image'), 'hero', 85, 1920);
        }

        $hero_slide->update($validated);
        return Redirect::route('admin.hero-slides.index');
    }

    public function destroy(HeroSlide $hero_slide, ImageUploadService $uploader)
    {
        if ($hero_slide->image_path) {
            $uploader->deleteImage($hero_slide->image_path);
        }
        $hero_slide->delete();
        return Redirect::route('admin.hero-slides.index');
    }
}


