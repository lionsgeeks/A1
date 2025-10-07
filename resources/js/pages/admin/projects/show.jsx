import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Edit, Trash2, ArrowLeft } from 'lucide-react'
import { useModal } from '@/components/ui/modal'

export default function ProjectShow({ project, categories = [] }) {
  const { showConfirm, ModalComponent } = useModal()

  const handleDelete = () => {
    showConfirm(
      'Delete Project',
      `Are you sure you want to delete "${project.title}"? This cannot be undone.`,
      () => {
        router.delete(`/admin/projects/${project.id}`, {
          onSuccess: () => router.visit('/admin/projects')
        })
      }
    )
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Projects', href: '/admin/projects' }, { title: project.title, href: `/admin/projects/${project.id}` }]}>
      <Head title={project.title} />

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link href="/admin/projects" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/projects/${project.id}/edit`}>
                <Button variant="outline" className="text-black border-gray-300 hover:bg-gray-100">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Cover image */}
          {project.image_path && (
            <img src={project.image_path} alt={project.title} className="w-full h-96 object-cover rounded-xl mb-6" />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {project.description && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
                </div>
              )}

              {Array.isArray(project.gallery_images) && project.gallery_images.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.gallery_images.map((src, idx) => (
                      <img key={idx} src={src} alt={`Gallery ${idx + 1}`} className="w-full h-40 object-cover rounded-lg" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-gray-400" />{project.location || '—'}</div>
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-gray-400" />{project.year || '—'}</div>
                  {project.start_year || project.end_year ? (
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-gray-400" />{project.start_year || '----'} - {project.end_year || '----'}</div>
                  ) : null}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {(categories || []).length === 0 ? (
                    <span className="text-gray-500 text-sm">—</span>
                  ) : (
                    categories.map(cat => (
                      <Badge key={cat.id} className="text-white" style={{ backgroundColor: cat.color || '#a3845b' }}>{cat.name}</Badge>
                    ))
                  )}
                </div>
              </div>

              {project.pdf_path && (
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Downloads</h3>
                  <a href={project.pdf_path} target="_blank" className="text-primary-600 hover:underline">View PDF</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal Component for confirms */}
      <ModalComponent />
    </AppLayout>
  )
}
