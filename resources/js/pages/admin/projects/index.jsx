import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Trash2,
  Eye,
  Search,
  Filter,
  FolderOpen,
  X,
  Calendar,
  MapPin,
  Tag,
  FileText
} from 'lucide-react'
import { Link, router } from '@inertiajs/react'

export default function ProjectsIndex({ projects, filters }) {
  const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Projects', href: '/admin/projects' }
  ]
  const [searchTerm, setSearchTerm] = useState(filters?.search || '')
  const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const categories = ['all', 'residential', 'commercial', 'cultural', 'mixed-use', 'educational']

  const handleSearch = (e) => {
    e.preventDefault()
    router.get('/admin/projects', {
      search: searchTerm,
      category: selectedCategory !== 'all' ? selectedCategory : undefined
    })
  }

  const handleDelete = (project) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      router.delete(`/admin/projects/${project.id}`)
    }
  }

  const handleShowDetails = (project) => {
    setSelectedProject(project)
    setShowDetails(true)
  }

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black">Projects</h2>
            <p className="text-black">Manage your architectural projects</p>
          </div>
          <Link href="/admin/projects/create">
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </form>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.data?.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={project.image_path || '/placeholder.svg'}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-black truncate">{project.title}</h3>
                </div>

                <p className="text-sm text-black mb-2">{project.category} • {project.location}</p>
                <p className="text-sm text-black mb-4 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-black">{project.year}</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShowDetails(project)}
                      className="text-black border-black hover:bg-black hover:text-white"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                    <Link href={`/projects/${project.id}`}>
                      <Button size="sm" variant="outline" className="text-black border-black hover:bg-black hover:text-white">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(project)}
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.data?.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FolderOpen className="h-12 w-12 text-black mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">No projects found</h3>
            <p className="text-black mb-6">Get started by creating your first project.</p>
            <Link href="/admin/projects/create">
              <Button className="bg-black hover:bg-gray-800 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </Link>
          </div>
        )}

        {/* Pagination */}
        {projects.links && (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-black">
                Showing {projects.from} to {projects.to} of {projects.total} results
              </div>
              <div className="flex space-x-2">
                {projects.links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => link.url && router.get(link.url)}
                    disabled={!link.url}
                    className={`px-3 py-1 text-sm rounded ${
                      link.active
                        ? 'bg-black text-white'
                        : link.url
                          ? 'bg-gray-100 text-black hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project Details Modal */}
        {showDetails && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-black">Project Details</h2>
                  <button
                    onClick={handleCloseDetails}
                    className="text-black hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Project Image */}
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={selectedProject.image_path || '/placeholder.svg'}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">{selectedProject.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-black">
                          <Tag className="h-4 w-4 mr-2" />
                          <span className="text-sm">{selectedProject.category}</span>
                        </div>
                        <div className="flex items-center text-black">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">{selectedProject.location}</span>
                        </div>
                        <div className="flex items-center text-black">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">{selectedProject.year}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <Badge className={getStatusColor(selectedProject.status)}>
                          {selectedProject.status}
                        </Badge>
                      </div>
                      {selectedProject.client && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-black">Client: </span>
                          <span className="text-sm text-black">{selectedProject.client}</span>
                        </div>
                      )}
                      {selectedProject.area && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-black">Area: </span>
                          <span className="text-sm text-black">{selectedProject.area}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center mb-2">
                      <FileText className="h-4 w-4 mr-2 text-black" />
                      <h4 className="font-medium text-black">Description</h4>
                    </div>
                    <p className="text-black leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Link href={`/projects/${selectedProject.id}`}>
                      <Button className="bg-black hover:bg-gray-800 text-white">
                        <Eye className="h-4 w-4 mr-2" />
                        View Public Page
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={handleCloseDetails}
                      className="text-black border-black hover:bg-black hover:text-white"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
