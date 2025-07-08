import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { router } from '@inertiajs/react'
import {
  DataTable,
  PageHeader,
  PageContent,
  PageContainer
} from '@/components/admin'

export default function MilestonesIndex({ milestones }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null)

  const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Milestones', href: '/admin/milestones' }
  ]

  // Table columns configuration
  const columns = [
    {
      key: 'year',
      label: 'Year',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm font-medium text-gray-900">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          {value}
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value) => (
        <div className="font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) => (
        <div className="max-w-xs truncate text-gray-600">{value}</div>
      )
    },
    {
      key: 'sort_order',
      label: 'Order',
      sortable: true,
      render: (value) => (
        <Badge variant="outline">{value}</Badge>
      )
    },
    {
      key: 'is_active',
      label: 'Status',
      type: 'badge',
      variant: (value) => value ? 'default' : 'secondary',
      render: (value) => value ? 'Active' : 'Inactive'
    }
  ]

  // Table actions
  const actions = [
    {
      label: 'View Details',
      icon: Eye,
      onClick: (milestone) => {
        setSelectedMilestone(milestone)
      }
    },
    {
      label: 'Edit',
      icon: Edit,
      onClick: (milestone) => {
        router.get(`/admin/milestones/${milestone.id}/edit`)
      }
    },
    {
      label: 'Move Up',
      icon: ArrowUp,
      onClick: (milestone) => {
        router.patch(`/admin/milestones/${milestone.id}`, {
          sort_order: milestone.sort_order - 1
        })
      }
    },
    {
      label: 'Move Down',
      icon: ArrowDown,
      onClick: (milestone) => {
        router.patch(`/admin/milestones/${milestone.id}`, {
          sort_order: milestone.sort_order + 1
        })
      }
    },
    {
      label: 'Delete',
      icon: Trash2,
      destructive: true,
      onClick: (milestone) => {
        if (confirm(`Are you sure you want to delete the milestone "${milestone.title}"?`)) {
          router.delete(`/admin/milestones/${milestone.id}`)
        }
      }
    }
  ]

  const handleCloseDetails = () => {
    setSelectedMilestone(null)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Timeline Milestones" />

      <PageContainer>
        <PageHeader
          title="Timeline Milestones"
          description="Manage timeline milestones for the about page"
          actions={[
            {
              label: 'Add Milestone',
              icon: Plus,
              href: '/admin/milestones/create',
              variant: 'default'
            }
          ]}
        />

        <PageContent>
          <DataTable
            data={milestones || []}
            columns={columns}
            actions={actions}
            searchable={true}
            sortable={true}
            viewModes={['list']}
            onSearch={(term) => {
              router.get('/admin/milestones', {
                search: term
              })
            }}
            emptyState={
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones found</h3>
                <p className="text-gray-600 mb-6">Get started by creating your first timeline milestone.</p>
                <Link href="/admin/milestones/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </Link>
              </div>
            }
          />

          {/* Milestone Details Modal */}
          {selectedMilestone && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Milestone Details</h3>
                    <Button variant="ghost" size="sm" onClick={handleCloseDetails}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Year</h4>
                        <p className="text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {selectedMilestone.year}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                        <Badge variant={selectedMilestone.is_active ? 'default' : 'secondary'}>
                          {selectedMilestone.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Title</h4>
                      <p className="text-gray-600">{selectedMilestone.title}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedMilestone.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Sort Order: {selectedMilestone.sort_order}
                      </div>
                      <div className="flex space-x-3">
                        <Link href={`/admin/milestones/${selectedMilestone.id}/edit`}>
                          <Button variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${selectedMilestone.title}"?`)) {
                              router.delete(`/admin/milestones/${selectedMilestone.id}`)
                              handleCloseDetails()
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PageContent>
      </PageContainer>
    </AppLayout>
  )
}
