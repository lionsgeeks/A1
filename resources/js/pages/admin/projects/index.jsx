import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Trash2,
  Eye,
  Edit,
  X,
  Calendar,
  MapPin
} from 'lucide-react'
import { Link, router } from '@inertiajs/react'
import {
  DataTable,
  PageHeader,
  PageContent,
  PageContainer,
  NoProjectsFound,
  createAction
} from '@/components/admin'

export default function ProjectsIndex({ projects }) {
  const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Projects', href: '/admin/projects' }
  ]
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Table columns configuration
  const columns = [
    {
      key: 'image_path',
      label: 'Image',
      type: 'image',
      sortable: false
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true
    },
    {
      key: 'category',
      label: 'Category',
      type: 'badge',
      variant: (value) => {
        const variants = {
          residential: 'default',
          commercial: 'secondary',
          cultural: 'outline',
          'mixed-use': 'destructive',
          educational: 'default'
        }
        return variants[value] || 'default'
      }
    },
    {
      key: 'location',
      label: 'Location',
      render: (value) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          {value}
        </div>
      )
    },
    {
      key: 'year',
      label: 'Year',
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
          {value}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      variant: (value) => value === 'active' ? 'default' : 'secondary'
    }
  ]

  // Table actions
  const actions = [
    {
      label: 'View Details',
      icon: Eye,
      onClick: (project) => {
        setSelectedProject(project)
        setShowDetails(true)
      }
    },
    {
      label: 'Edit',
      icon: Edit,
      onClick: (project) => {
        router.visit(`/admin/projects/${project.id}/edit`)
      }
    },
    {
      label: 'Delete',
      icon: Trash2,
      destructive: true,
      onClick: (project) => {
        if (confirm('Are you sure you want to delete this project?')) {
          router.delete(`/admin/projects/${project.id}`)
        }
      }
    }
  ]

  const handleCloseDetails = () => {
    setSelectedProject(null)
    setShowDetails(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects Management" />

      <PageContainer>
        <PageHeader
          title="Projects Management"
          description="Manage your architectural projects and portfolio"
          actions={[
            createAction('/admin/projects/create', 'Add New Project')
          ]}
        />

        <PageContent>
          {projects.data?.length === 0 ? (
            <NoProjectsFound createHref="/admin/projects/create" />
          ) : (
            <DataTable
              data={projects.data || []}
              columns={columns}
              actions={actions}
              searchable={true}
              filterable={true}
              sortable={true}
              viewModes={['grid', 'list']}
              onSearch={(term) => {
                router.get('/admin/projects', {
                  search: term
                })
              }}
              onViewModeChange={() => {}}
              emptyState={
                <NoProjectsFound createHref="/admin/projects/create" />
              }
            />
          )}

          {/* Project Details Modal */}
          {showDetails && selectedProject && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Project Details</h3>
                    <Button variant="ghost" size="sm" onClick={handleCloseDetails}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={selectedProject.image_path || '/placeholder.svg'}
                        alt={selectedProject.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Title</h4>
                        <p className="text-gray-600">{selectedProject.title}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                        <Badge className={getStatusColor(selectedProject.category)}>
                          {selectedProject.category}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedProject.location}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Year</h4>
                        <p className="text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {selectedProject.year}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                        <Badge className={getStatusColor(selectedProject.status)}>
                          {selectedProject.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedProject.description}</p>
                  </div>

                  {selectedProject.details && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
                      <p className="text-gray-600">{selectedProject.details}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-6">
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date(selectedProject.updated_at).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-3">
                      <Link href={`/admin/projects/${selectedProject.id}/edit`}>
                        <Button variant="outline" className="text-black border-gray-300 hover:bg-gray-100">
                          Edit Project
                        </Button>
                      </Link>
                      <Link href={`/projects/${selectedProject.id}`}>
                        <Button className="bg-black hover:bg-gray-800 text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Public Page
                        </Button>
                      </Link>
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
