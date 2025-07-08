import AppLayout from '@/layouts/app-layout'
import { FolderOpen, MessageSquare, Eye, TrendingUp, Plus, ArrowUpRight, Clock, Users } from 'lucide-react'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  StatsGrid,
  PageHeader,
  PageContent,
  PageContainer,
  createAction
} from '@/components/admin'

export default function AdminDashboard({ stats }) {
  const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Dashboard', href: '/admin' }
  ]

  const dashboardStats = [
    {
      key: 'projects',
      title: 'Total Projects',
      value: stats?.projects || 0,
      icon: FolderOpen,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase',
      description: 'All projects',
      href: '/admin/projects'
    },
    {
      key: 'messages',
      title: 'Contact Messages',
      value: stats?.messages || 0,
      icon: MessageSquare,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'increase',
      description: 'Total messages',
      href: '/admin/messages'
    },
    {
      key: 'unread',
      title: 'Unread Messages',
      value: stats?.unreadMessages || 0,
      icon: Eye,
      color: 'bg-yellow-500',
      change: '0%',
      changeType: 'neutral',
      description: 'Need attention',
      href: '/admin/messages'
    },
    {
      key: 'active',
      title: 'Active Projects',
      value: stats?.activeProjects || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'increase',
      description: 'Published projects',
      href: '/admin/projects'
    }
  ]

  const recentMessages = stats?.recentMessages || []
  const recentProjects = stats?.recentProjects || []

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Admin Dashboard" />

      <PageContainer>
        <PageHeader
          title="Admin Dashboard"
          description="Manage your projects, messages, and content from here"
          actions={[
            createAction('/admin/projects/create', 'New Project'),
            {
              href: '/admin/messages',
              label: 'View Messages',
              icon: MessageSquare,
              variant: 'outline'
            }
          ]}
        />

        <PageContent>
          <div className="space-y-8">

            {/* Enhanced Stats Grid */}
            <StatsGrid stats={dashboardStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">Recent Messages</h3>
                <Link href="/admin/messages">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentMessages.length > 0 ? (
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-black">{message.name}</p>
                          <Badge variant={message.status === 'unread' ? 'default' : 'secondary'} className="text-xs">
                            {message.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{message.email}</p>
                        <p className="text-sm text-gray-700 truncate mt-1">{message.message}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(message.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No recent messages</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">Recent Projects</h3>
                <Link href="/admin/projects">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentProjects.length > 0 ? (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          {project.image_path ? (
                            <img
                              src={project.image_path}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <FolderOpen className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-black">{project.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{project.category} • {project.location}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(project.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No recent projects</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/projects/create">
              <div className="group flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                    <Plus className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-black">Add New Project</span>
                  <p className="text-xs text-gray-500 mt-1">Create a new project</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/messages">
              <div className="group flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-black">View Messages</span>
                  <p className="text-xs text-gray-500 mt-1">Check contact messages</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/projects">
              <div className="group flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                    <FolderOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-black">Manage Projects</span>
                  <p className="text-xs text-gray-500 mt-1">View all projects</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
          </div>
        </PageContent>
      </PageContainer>
    </AppLayout>
  )
}
