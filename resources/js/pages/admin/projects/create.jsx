import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
    Upload,
    X,
    Save,
    ArrowLeft,
    Image as ImageIcon
} from 'lucide-react'
import { Link, router, useForm } from '@inertiajs/react'

export default function ProjectCreate({ project = null, categories = [] }) {
  const isEditing = !!project
  const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Projects', href: '/admin/projects' },
    { title: isEditing ? 'Edit Project' : 'Create Project', href: '#' }
  ]
  const [imagePreview, setImagePreview] = useState(project?.image_path || null)
  const [galleryPreviews, setGalleryPreviews] = useState(project?.gallery_images || [])
  const [existingGalleryImages, setExistingGalleryImages] = useState(project?.gallery_images || [])
  const [newGalleryImages, setNewGalleryImages] = useState([])

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

  const removeImage = () => {
    setImagePreview(null)
    setData('image', null)
  }

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files)

    if (isEditing) {
      // For editing, upload each image individually
      for (const file of files) {
        await addGalleryImage(file)
      }
    } else {
      // For creating, handle as before
      setData('gallery_images', files)

      // Create previews for new files
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

    // Clear the input so the same file can be selected again
    e.target.value = ''
  }

  const removeGalleryImage = async (index) => {
    if (isEditing && index < existingGalleryImages.length) {
      // Removing an existing image - call API to delete from server
      try {
        const response = await fetch(`/admin/projects/${project.id}/gallery/${index}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        })

        if (response.ok) {
          // Remove from existing images
          const newExistingImages = existingGalleryImages.filter((_, i) => i !== index)
          setExistingGalleryImages(newExistingImages)

          // Update previews
          const newPreviews = galleryPreviews.filter((_, i) => i !== index)
          setGalleryPreviews(newPreviews)
        } else {
          const errorData = await response.json()
          alert(`Failed to delete image: ${errorData.message || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting image:', error)
        alert('Failed to delete image')
      }
    } else {
      // Removing a new image (not yet uploaded)
      const adjustedIndex = index - existingGalleryImages.length
      const newPreviews = galleryPreviews.filter((_, i) => i !== index)
      setGalleryPreviews(newPreviews)

      if (isEditing) {
        const newFiles = newGalleryImages.filter((_, i) => i !== adjustedIndex)
        setNewGalleryImages(newFiles)
      } else {
        const newFiles = Array.from(data.gallery_images).filter((_, i) => i !== index)
        setData('gallery_images', newFiles)
      }
    }
  }

  const addGalleryImage = async (file) => {
    if (!isEditing) return

    const formData = new FormData()
    formData.append('gallery_image', file)

    try {
      const response = await fetch(`/admin/projects/${project.id}/gallery`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          'Accept': 'application/json',
        },
        credentials: 'same-origin',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        // Update existing gallery images
        setExistingGalleryImages(result.gallery_images)
        setGalleryPreviews(result.gallery_images)
      } else {
        const errorData = await response.json()
        alert(`Failed to upload image: ${errorData.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
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
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={isEditing ? 'Edit Project' : 'Create Project'} />
      <div className="w-full p-6">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
                {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  value={data.year}
                  onChange={(e) => setData('year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
                {errors.year && <p className="text-red-600 text-sm mt-1">{errors.year}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="mt-6">
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                Project Details
              </label>
              <textarea
                id="details"
                rows={6}
                value={data.details}
                onChange={(e) => setData('details', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Additional project details, specifications, etc."
              />
              {errors.details && <p className="text-red-600 text-sm mt-1">{errors.details}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.sort_order && <p className="text-red-600 text-sm mt-1">{errors.sort_order}</p>}
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Images</h3>

            {/* Main Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Project Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
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
              {errors.gallery_images && <p className="text-red-600 text-sm mt-1">{errors.gallery_images}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/projects">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={processing}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {processing ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
