import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Users,
  FolderOpen,
  Mail,
  BarChart3,
  TrendingUp,
  Calendar,
  Settings,
  Tags
} from 'lucide-react'
import {
  StatsCard,
  StatsGrid,
  PageHeader,
  PageContent,
  PageContainer
} from '@/components/admin'

export default function AdminDashboard({ stats }) {
  const breadcrumbs = [
    { title: 'Admin', href: '/admin' }
  ]

  const dashboardStats = [
    {
      title: 'Total Projects',
      value: stats?.projects?.total || 0,
      change: stats?.projects?.change || 0,
      trend: stats?.projects?.trend || 'up',
      icon: FolderOpen,
      color: 'blue',
      href: '/admin/projects'
    },
    {
      title: 'Active Projects',
      value: stats?.projects?.active || 0,
      change: stats?.projects?.activeChange || 0,
      trend: stats?.projects?.activeTrend || 'up',
      icon: BarChart3,
      color: 'green',
      href: '/admin/projects?status=active'
    },
    {
      title: 'Contact Messages',
      value: stats?.messages?.total || 0,
      change: stats?.messages?.change || 0,
      trend: stats?.messages?.trend || 'up',
      icon: Mail,
      color: 'yellow',
      href: '/admin/messages'
    },
    {
      title: 'Unread Messages',
      value: stats?.messages?.unread || 0,
      change: stats?.messages?.unreadChange || 0,
      trend: stats?.messages?.unreadTrend || 'down',
      icon: Users,
      color: 'red',
      href: '/admin/messages?status=unread'
    }
  ]

  const quickActions = [
    {
      title: 'Add New Project',
      description: 'Create a new architectural project',
      icon: Plus,
      href: '/admin/projects/create',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Manage Projects',
      description: 'View and edit existing projects',
      icon: FolderOpen,
      href: '/admin/projects',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Messages',
      description: 'Check contact form submissions',
      icon: Mail,
      href: '/admin/messages',
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      title: 'Timeline Milestones',
      description: 'Manage about page timeline',
      icon: Calendar,
      href: '/admin/milestones',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Manage Categories',
      description: 'Organize projects by categories',
      icon: Tags,
      href: '/admin/categories',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Admin Dashboard" />

      <PageContainer>
        <PageHeader
          title="Admin Dashboard"
          description="Manage your architectural portfolio and content"
          actions={[
            {
              label: 'View Site',
              icon: TrendingUp,
              href: '/',
              variant: 'outline'
            },
            {
              label: 'Settings',
              icon: Settings,
              href: '/settings',
              variant: 'outline'
            }
          ]}
        />

        <PageContent>
          {/* Stats Grid */}
          <StatsGrid stats={dashboardStats} />

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-6 group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New project created</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Contact message received</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Timeline milestone updated</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 py-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Project status updated</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContent>
      </PageContainer>
    </AppLayout>
  )
}
