<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Get featured projects for the carousel (limit to 5 most recent active projects)
    $featuredProjects = \App\Models\Project::where('status', 'active')
        ->orderBy('sort_order')
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get();

    return Inertia::render('architectural-website', [
        'featuredProjects' => $featuredProjects
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
});

// Redirect dashboard to admin dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/dashboard', '/admin')->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
