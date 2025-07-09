<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category_id',
        'location',
        'year',
        'description',
        'details',
        'image_path',
        'gallery_images',
        'status',
        'sort_order'
    ];

    protected $casts = [
        'gallery_images' => 'array'
    ];

    // Relationship with Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    // Accessor to get category name (for backward compatibility)
    public function getCategoryNameAttribute()
    {
        $category = $this->category;
        if (is_object($category)) {
            return $category->name;
        }
        return $category; // Return string value for old records
    }

    // Accessor to get category color
    public function getCategoryColorAttribute()
    {
        $category = $this->category;
        if (is_object($category)) {
            return $category->color;
        }
        return '#a3845b'; // Default color for old records
    }

    // Scope to filter by category
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    // Scope to filter by category name
    public function scopeByCategoryName($query, $categoryName)
    {
        return $query->whereHas('category', function ($q) use ($categoryName) {
            $q->where('name', $categoryName);
        });
    }

    // Scope for active projects
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
