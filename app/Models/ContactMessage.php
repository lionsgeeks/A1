<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'project_type',
        'budget',
        'message',
        'status',
        'read_at'
    ];

    protected $casts = [
        'read_at' => 'datetime'
    ];
}
