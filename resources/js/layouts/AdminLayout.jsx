import { useState } from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react'

export default function AdminLayout({ children, title = 'Admin Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { auth, url } = usePage().props

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const isActive = (href) => {
    if (href === '/admin') {
      return url === '/admin'
    }
    return url.startsWith(href)
  }

  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-gray-100">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-white transform rotate-45"></div>
                <div className="absolute top-1 left-1 w-6 h-6 bg-gray-900 transform rotate-45"></div>
                <div className="absolute top-2 left-2 w-4 h-4 bg-white transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-white tracking-wider">ARCH Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* User section */}
          <div className="absolute bottom-0 w-full p-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {auth.user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {auth.user?.email || 'admin@archstudio.com'}
                </p>
              </div>
              <Link
                href="/logout"
                method="post"
                as="button"
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  View Site
                </Link>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
