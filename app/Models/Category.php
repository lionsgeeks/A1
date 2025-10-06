<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image_path',
        'color',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    // Automatically generate slug from name
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });

        static::updating(function ($category) {
            if ($category->isDirty('name') && empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    // Scope for active categories
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for ordered categories
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    // Projects via JSON category_ids
    public function projects()
    {
        return Project::whereJsonContains('category_ids', (int) $this->id);
    }

    // Relationship with active projects only
    public function activeProjects()
    {
        return Project::where('status', 'active')->whereJsonContains('category_ids', (int) $this->id);
    }

    // Get projects count
    public function getProjectsCountAttribute()
    {
        return $this->projects()->where('status', 'active')->count();
    }

    // Get all projects count (including inactive)
    public function getAllProjectsCountAttribute()
    {
        return $this->projects()->count();
    }

    // Get featured projects (first 3 active projects)
    public function getFeaturedProjectsAttribute()
    {
        return $this->activeProjects()->orderBy('sort_order')->limit(3)->get();
    }

    // Check if category has projects
    public function hasProjects()
    {
        return $this->projects()->exists();
    }

    // Check if category has active projects
    public function hasActiveProjects()
    {
        return $this->activeProjects()->exists();
    }
}
