<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ContactMessage;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalProjects = Project::count();
        $activeProjects = Project::where('status', 'active')->count();
        $totalMessages = ContactMessage::count();
        $unreadMessages = ContactMessage::where('status', 'unread')->count();

        $stats = [
            'projects' => [
                'total' => $totalProjects,
                'active' => $activeProjects,
                'change' => 0, // You can calculate this based on previous period
                'trend' => 'up',
                'activeChange' => 0,
                'activeTrend' => 'up'
            ],
            'messages' => [
                'total' => $totalMessages,
                'unread' => $unreadMessages,
                'change' => 0, // You can calculate this based on previous period
                'trend' => 'up',
                'unreadChange' => 0,
                'unreadTrend' => 'down'
            ],
            'recentMessages' => ContactMessage::latest()->limit(5)->get(),
            'recentProjects' => Project::latest()->limit(5)->get(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats
        ]);
    }
}
