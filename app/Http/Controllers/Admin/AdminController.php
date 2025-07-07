<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'projects' => Project::count(),
            'messages' => ContactMessage::count(),
            'unreadMessages' => ContactMessage::where('status', 'unread')->count(),
            'activeProjects' => Project::where('status', 'active')->count(),
            'recentMessages' => ContactMessage::latest()->limit(5)->get(),
            'recentProjects' => Project::latest()->limit(5)->get(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats
        ]);
    }
}
