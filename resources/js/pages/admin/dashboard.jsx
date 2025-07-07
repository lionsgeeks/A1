import AppLayout from '@/layouts/app-layout'
import { FolderOpen, MessageSquare, Eye, TrendingUp } from 'lucide-react'
import { Head } from '@inertiajs/react'

export default function AdminDashboard({ stats }) {
  const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Dashboard', href: '/admin' }
  ]
  const dashboardStats = [
    {
      name: 'Total Projects',
      value: stats?.projects || 0,
      icon: FolderOpen,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Contact Messages',
      value: stats?.messages || 0,
      icon: MessageSquare,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'increase'
    },
    {
      name: 'Unread Messages',
      value: stats?.unreadMessages || 0,
      icon: Eye,
      color: 'bg-yellow-500',
      change: '0%',
      changeType: 'neutral'
    },
    {
      name: 'Active Projects',
      value: stats?.activeProjects || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'increase'
    }
  ]

  const recentMessages = stats?.recentMessages || []
  const recentProjects = stats?.recentProjects || []

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Admin Dashboard" />
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-black">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-black">{stat.value}</p>
                    <p className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' :
                      stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-black">Recent Messages</h3>
            </div>
            <div className="p-6">
              {recentMessages.length > 0 ? (
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black">{message.name}</p>
                        <p className="text-sm text-black">{message.email}</p>
                        <p className="text-sm text-black truncate">{message.message}</p>
                        <p className="text-xs text-black mt-1">
                          {new Date(message.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-black text-center py-4">No recent messages</p>
              )}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-black">Recent Projects</h3>
            </div>
            <div className="p-6">
              {recentProjects.length > 0 ? (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                        {project.image_path && (
                          <img
                            src={project.image_path}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black">{project.title}</p>
                        <p className="text-sm text-black">{project.category} • {project.location}</p>
                        <p className="text-xs text-black mt-1">
                          {new Date(project.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-black text-center py-4">No recent projects</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-black mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/projects/create"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FolderOpen className="h-5 w-5 mr-2 text-black" />
              <span className="text-sm font-medium text-black">Add New Project</span>
            </a>
            <a
              href="/admin/messages"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="h-5 w-5 mr-2 text-black" />
              <span className="text-sm font-medium text-black">View Messages</span>
            </a>
            <a
              href="/admin/projects"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-5 w-5 mr-2 text-black" />
              <span className="text-sm font-medium text-black">Manage Projects</span>
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
