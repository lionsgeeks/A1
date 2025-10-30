import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, usePage } from '@inertiajs/react'
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
import { NotificationContainer, useNotifications } from '@/components/admin'
import {
  DataTable,
  PageHeader,
  PageContent,
  PageContainer,
  NoProjectsFound,
  createAction
} from '@/components/admin'

export default function ProjectsIndex({ projects }) {
  const { props } = usePage()
  const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Projects', href: '/admin/projects' }
  ]
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const { showConfirm, ModalComponent } = useModal()
  const { success } = useNotifications()
  // Show flash success if present
  if (props?.flash?.success) {
    success(props.flash.success, 'Success')
  }

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
        <Link href={`/admin/projects/${project.id}`} className="text-gray-900 hover:underline block max-w-[420px]">
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
        router.visit(`/admin/projects/${project.id}`)
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
            router.delete(`/admin/projects/${project.id}`, {
              onSuccess: () => {}
            })
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
        </PageContent>
        {/* Pagination section (restyled, moved up) */}
        {projects.links && projects.links.length > 3 && (
          <nav className="flex justify-center mb-16" aria-label="Pagination">
            <ul className="inline-flex items-center space-x-2">
              {projects.links.map((link, idx) => {
                const isActive = link.active;
                const isDisabled = !link.url;
                const isNumber = /^\d+$/.test(link.label.trim());
                return (
                  <li key={idx}>
                    <Link
                      href={link.url || '#'}
                      className={
                        `px-4 py-2 min-w-[40px] inline-flex justify-center items-center text-base transition font-medium rounded-full focus:outline-none ${
                          isActive
                            ? 'bg-primary-600 text-white shadow-lg'
                            : isDisabled
                            ? 'text-secondary-400 bg-secondary-100 cursor-not-allowed'
                            : 'text-secondary-800 bg-white hover:bg-primary-100 hover:text-primary-700 border border-secondary-200'
                        }
                        ${isNumber ? 'font-bold' : 'font-normal'}`
                      }
                      tabIndex={isDisabled ? -1 : 0}
                      aria-current={isActive ? 'page' : undefined}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </PageContainer>

      {/* Modal Component */}
      <ModalComponent />
      <NotificationContainer />
    </AppLayout>
  )
}
