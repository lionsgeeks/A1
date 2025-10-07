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
import { useModal } from '@/components/ui/modal'
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
  const { showConfirm, ModalComponent } = useModal()

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
      sortable: true,
      render: (value, project) => (
        <Link href={`/admin/projects/${project.id}/edit`} className="text-gray-900 hover:underline block max-w-[420px]">
          <span className="text-base line-clamp-1">{value}</span>
        </Link>
      )
    },
    {
      key: 'categories',
      label: 'Categories',
      render: (_, project) => {
        const cats = project.categories || (project.category ? [project.category] : []);
        if (cats.length === 0) return <span className="text-gray-400">—</span>;
        const first = cats[0];
        const remaining = cats.length - 1;
        return (
          <div className="flex items-center gap-2">
            <Badge className="text-white" style={{ backgroundColor: first?.color || '#a3845b' }}>
              {first?.name || 'Sans catégorie'}
            </Badge>
            {remaining > 0 && (
              <span className="text-xs text-gray-500">+{remaining}</span>
            )}
          </div>
        );
      }
    },
    {
      key: 'location',
      label: 'Location',
      render: (value) => (
        value ? (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            {value}
          </div>
        ) : <span className="text-gray-400">—</span>
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
        showConfirm(
          'Delete Project',
          `Are you sure you want to delete "${project.title}"? This action cannot be undone.`,
          () => {
            router.delete(`/admin/projects/${project.id}`)
          }
        )
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
              searchable={false}
              filterable={false}
              sortable={true}
              viewModes={['grid']}
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
                        <Badge
                          className="text-white"
                          style={{ backgroundColor: selectedProject.category?.color || '#a3845b' }}
                        >
                          {selectedProject.category?.name || 'Uncategorized'}
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

                      {/* Timeline */}
                      {(selectedProject.start_year || selectedProject.end_year) && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                          <p className="text-gray-600">
                            {selectedProject.start_year || '----'} - {selectedProject.end_year || '----'}
                          </p>
                        </div>
                      )}

                      {/* Achievement Status */}
                      {selectedProject.achievement_status && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Achievement Status</h4>
                          <Badge className="bg-blue-100 text-blue-800">
                            {selectedProject.achievement_status}
                          </Badge>
                        </div>
                      )}

                      {/* Surface Area */}
                      {selectedProject.surface_area && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Surface Area</h4>
                          <p className="text-gray-600">{selectedProject.surface_area}</p>
                        </div>
                      )}

                      {/* Client */}
                      {selectedProject.client_name && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Client</h4>
                          <p className="text-gray-600">{selectedProject.client_name}</p>
                        </div>
                      )}

                      {/* Project Cost */}
                      {selectedProject.project_cost && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Project Cost</h4>
                          <p className="text-gray-600">{selectedProject.project_cost}</p>
                        </div>
                      )}

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
                    <p className="text-gray-600 ">{selectedProject.description}</p>
                  </div>



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

      {/* Modal Component */}
      <ModalComponent />
    </AppLayout>
  )
}
