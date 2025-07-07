<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category',
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
}
