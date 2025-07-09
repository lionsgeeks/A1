<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Get all active categories for the carousel with project counts
    $featuredCategories = \App\Models\Category::active()
        ->ordered()
        ->withCount(['projects' => function ($query) {
            $query->where('status', 'active');
        }])
        ->get(); // Show all categories, not just those with projects

    return Inertia::render('architectural-website', [
        'featuredCategories' => $featuredCategories->values() // Reset array keys
    ]);
})->name('home');

Route::get('/about', function () {
    $milestones = \App\Models\Milestone::active()->ordered()->get();
    return Inertia::render('about', [
        'milestones' => $milestones
    ]);
})->name('about');

Route::get('/projects', [App\Http\Controllers\ProjectController::class, 'index'])->name('projects');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/test', function () {
    return 'Test route works!';
});

Route::get('/admin-test', function () {
    return 'Admin test route works!';
})->withoutMiddleware(['web']);

// Project detail route
Route::get('/projects/{project}', [App\Http\Controllers\ProjectController::class, 'show'])->name('projects.show');

// Contact form submission
Route::post('/contact', [App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

// Admin routes
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('dashboard');

    // Projects management
    Route::resource('projects', App\Http\Controllers\Admin\ProjectController::class);
    Route::delete('/projects/{project}/gallery/{index}', [App\Http\Controllers\Admin\ProjectController::class, 'deleteGalleryImage'])->name('projects.gallery.delete');
    Route::post('/projects/{project}/gallery', [App\Http\Controllers\Admin\ProjectController::class, 'addGalleryImage'])->name('projects.gallery.add');
    Route::delete('/projects/{project}/gallery/{index}', [App\Http\Controllers\Admin\ProjectController::class, 'deleteGalleryImage'])->name('projects.gallery.delete');

    // Contact messages
    Route::get('/messages', [App\Http\Controllers\Admin\ContactMessageController::class, 'index'])->name('messages.index');
    Route::patch('/messages/{message}/read', [App\Http\Controllers\Admin\ContactMessageController::class, 'markAsRead'])->name('messages.read');
    Route::patch('/messages/{message}/unread', [App\Http\Controllers\Admin\ContactMessageController::class, 'markAsUnread'])->name('messages.unread');
    Route::delete('/messages/{message}', [App\Http\Controllers\Admin\ContactMessageController::class, 'destroy'])->name('messages.destroy');

    // Timeline milestones CRUD
    Route::resource('milestones', App\Http\Controllers\Admin\MilestoneController::class);

    // Categories CRUD
    Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class);
    Route::post('/categories/{category}/update', [App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('categories.update-with-files');
    Route::delete('/categories/{category}/image', [App\Http\Controllers\Admin\CategoryController::class, 'deleteImage'])->name('categories.delete-image');
});

// Redirect dashboard to admin dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/dashboard', '/admin')->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
