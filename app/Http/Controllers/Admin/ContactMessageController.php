<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::query();

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('message', 'like', '%' . $request->search . '%');
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $messages = $query->orderBy('created_at', 'desc')->paginate(20);

        $stats = [
            'total' => ContactMessage::count(),
            'unread' => ContactMessage::where('status', 'unread')->count(),
            'read' => ContactMessage::where('status', 'read')->count(),
        ];

        return Inertia::render('admin/messages/index', [
            'messages' => $messages,
            'filters' => $request->only(['search', 'status']),
            'stats' => $stats
        ]);
    }

    public function markAsRead(ContactMessage $message)
    {
        $message->update([
            'status' => 'read',
            'read_at' => now()
        ]);

        return Redirect::back();
    }

    public function markAsUnread(ContactMessage $message)
    {
        $message->update([
            'status' => 'unread',
            'read_at' => null
        ]);

        return Redirect::back();
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return Redirect::back();
    }
}
