import { useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import {
  Upload,
  X,
  Save,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react'
import { Link, router, useForm } from '@inertiajs/react'

export default function ProjectCreate({ project = null }) {
  const isEditing = !!project
  const [imagePreview, setImagePreview] = useState(project?.image_path || null)
  const [galleryPreviews, setGalleryPreviews] = useState(project?.gallery_images || [])

  const { data, setData, post, put, processing, errors } = useForm({
    title: project?.title || '',
    category: project?.category || '',
    location: project?.location || '',
    year: project?.year || new Date().getFullYear().toString(),
    description: project?.description || '',
    details: project?.details || '',
    status: project?.status || 'active',
    sort_order: project?.sort_order || 0,
    image: null,
    gallery_images: []
  })

  const categories = [
    'residential',
    'commercial',
    'cultural',
    'mixed-use',
    'educational'
  ]

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setData('image', file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files)
    setData('gallery_images', files)

    // Create previews
    const previews = []
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        previews.push(e.target.result)
        if (previews.length === files.length) {
          setGalleryPreviews(previews)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = () => {
    setImagePreview(null)
    setData('image', null)
  }

  const removeGalleryImage = (index) => {
    const newPreviews = galleryPreviews.filter((_, i) => i !== index)
    setGalleryPreviews(newPreviews)

    if (data.gallery_images.length > 0) {
      const newFiles = Array.from(data.gallery_images).filter((_, i) => i !== index)
      setData('gallery_images', newFiles)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      router.post(`/admin/projects/${project.id}`, {
        ...data,
        _method: 'PUT'
      })
    } else {
      post('/admin/projects')
    }
  }

  return (
    <AdminLayout title={isEditing ? 'Edit Project' : 'Create Project'}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/admin/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Project' : 'Create New Project'}
            </h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={data.category}
                  onChange={(e) => setData('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  value={data.location}
                  onChange={(e) => setData('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="City, State/Country"
                  required
                />
                {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="text"
                  id="year"
                  value={data.year}
                  onChange={(e) => setData('year', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
                {errors.year && <p className="text-red-600 text-sm mt-1">{errors.year}</p>}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort Order
                </label>
                <input
                  type="number"
                  id="sort_order"
                  value={data.sort_order}
                  onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                id="description"
                rows={3}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Brief description for project listings"
                required
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="mt-6">
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="details"
                rows={6}
                value={data.details}
                onChange={(e) => setData('details', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Detailed project description for the project page"
                required
              />
              {errors.details && <p className="text-red-600 text-sm mt-1">{errors.details}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Images</h3>

            {/* Main Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-gray-900 hover:text-gray-700">
                        <span>Upload a file</span>
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
              {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {galleryPreviews.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="gallery" className="relative cursor-pointer bg-white rounded-md font-medium text-gray-900 hover:text-gray-700">
                      <span>Upload gallery images</span>
                      <input
                        id="gallery"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Multiple files allowed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/projects">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={processing}
              className="bg-gray-900 hover:bg-gray-800"
            >
              <Save className="h-4 w-4 mr-2" />
              {processing ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
