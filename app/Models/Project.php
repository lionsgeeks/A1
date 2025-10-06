<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'location',
        'year',
        'start_year',
        'end_year',
        'description',
        'achievement_status',
        'surface_area',
        'client_name',
        'delegated_client_name',
        'project_cost',
        'duration_months',
        'image_path',
        'pdf_path',
        'gallery_images',
        'sponsors',
        'category_ids',
        'partners',
        'institutional_partners',
        'status',
        'sort_order'
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'category_ids' => 'array',
        'partners' => 'array',
        'institutional_partners' => 'array',
        'sponsors' => 'array'
    ];

    protected $appends = [
        'categories'
    ];

    // Virtual accessor to fetch categories from JSON ids
    public function getCategoriesAttribute()
    {
        $ids = $this->category_ids ?? [];
        if (empty($ids)) {
            return collect();
        }
        return Category::whereIn('id', $ids)->get();
    }

    // Accessor to get category name (for backward compatibility)
    public function getCategoryNameAttribute()
    {
        $first = $this->categories->first();
        return $first?->name;
    }

    // Accessor to get category color
    public function getCategoryColorAttribute()
    {
        $first = $this->categories->first();
        return $first?->color ?? '#a3845b';
    }

    // Scope to filter by category
    public function scopeByCategory($query, $categoryId)
    {
        return $query->whereJsonContains('category_ids', (int) $categoryId);
    }

    // Scope to filter by category name
    public function scopeByCategoryName($query, $categoryName)
    {
        $categoryId = Category::where('name', $categoryName)->value('id');
        if (!$categoryId) {
            return $query->whereRaw('1=0');
        }
        return $query->whereJsonContains('category_ids', (int) $categoryId);
    }

    // Scope for active projects
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
