import { useState, useRef } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
    Upload,
    X,
    Save,
    ArrowLeft,
    Image as ImageIcon,
    AlertTriangle,
    CheckCircle
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
  const [isDraggingMain, setIsDraggingMain] = useState(false)
  const [isDraggingGallery, setIsDraggingGallery] = useState(false)

  // Refs for file inputs
  const mainImageInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  const { data, setData, post, put, processing, errors } = useForm({
    title: project?.title || '',
    category_id: project?.category_id || '',
    location: project?.location || '',
    year: project?.year || new Date().getFullYear().toString(),
    start_year: project?.start_year || '',
    end_year: project?.end_year || '',
    description: project?.description || '',
    achievement_status: project?.achievement_status || '',
    surface_area: project?.surface_area || '',
    client_name: project?.client_name || '',
    project_cost: project?.project_cost || '',
    duration_months: project?.duration_months || '',
    status: project?.status || 'active',
    sort_order: project?.sort_order || 0,
    image: null,
    gallery_images: []
  })

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [modalConfig, setModalConfig] = useState({
    type: 'error', // 'error', 'success', 'warning'
    title: '',
    message: '',
    onConfirm: null
  })

  // Helper function to show modal instead of alert
  const showModalDialog = (type, title, message, onConfirm = null) => {
    setModalConfig({ type, title, message, onConfirm })
    setShowModal(true)
  }

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

  // Click handlers for upload areas
  const handleMainImageAreaClick = () => {
    if (mainImageInputRef.current) {
      mainImageInputRef.current.click()
    }
  }

  const handleGalleryAreaClick = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click()
    }
  }

  // Drag and drop handlers
  const handleMainImageDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleMainImageDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingMain(true)
  }

  const handleMainImageDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingMain(false)
  }

  const handleGalleryDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleGalleryDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingGallery(true)
  }

  const handleGalleryDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingGallery(false)
  }

  const handleMainImageDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingMain(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        setData('image', file)
        const reader = new FileReader()
        reader.onload = (e) => setImagePreview(e.target.result)
        reader.readAsDataURL(file)
      }
    }
  }

  const handleGalleryDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingGallery(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    if (imageFiles.length > 0) {
      setData('gallery_images', imageFiles)

      const newPreviews = []
      imageFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          newPreviews.push(e.target.result)
          if (newPreviews.length === imageFiles.length) {
            setGalleryPreviews([...galleryPreviews, ...newPreviews])
            setNewGalleryImages([...newGalleryImages, ...imageFiles])
          }
        }
        reader.readAsDataURL(file)
      })
    }
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
          showModalDialog('error', 'Delete Failed', `Failed to delete image: ${errorData.message || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting image:', error)
        showModalDialog('error', 'Delete Failed', 'Failed to delete image')
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
        showModalDialog('error', 'Upload Failed', `Failed to upload image: ${errorData.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      showModalDialog('error', 'Upload Failed', 'Failed to upload image')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      router.post(`/admin/projects/${project.id}`, {
        ...data,
        _method: 'PUT'
      }, {
        onSuccess: () => {
          showModalDialog(
            'success',
            'Project Updated!',
            'The project has been updated successfully.',
            () => router.visit('/admin/projects')
          )
        },
        onError: (errors) => {
          showModalDialog(
            'error',
            'Update Failed',
            'There was an error updating the project. Please check the form and try again.'
          )
        }
      })
    } else {
      post('/admin/projects', {
        onSuccess: () => {
          showModalDialog(
            'success',
            'Project Created!',
            'The project has been created successfully.',
            () => router.visit('/admin/projects')
          )
        },
        onError: (errors) => {
          showModalDialog(
            'error',
            'Creation Failed',
            'There was an error creating the project. Please check the form and try again.'
          )
        }
      })
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
                  value={data.category_id}
                  onChange={(e) => setData('category_id', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className="text-red-600 text-sm mt-1">{errors.category_id}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={data.location}
                  onChange={(e) => setData('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"

                />
                {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  value={data.year}
                  onChange={(e) => setData('year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.year && <p className="text-red-600 text-sm mt-1">{errors.year}</p>}
              </div>
            </div>

            {/* Project Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="start_year" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Year
                </label>
                <input
                  type="number"
                  id="start_year"
                  value={data.start_year}
                  onChange={(e) => setData('start_year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="2018"
                />
                {errors.start_year && <p className="text-red-600 text-sm mt-1">{errors.start_year}</p>}
              </div>

              <div>
                <label htmlFor="end_year" className="block text-sm font-medium text-gray-700 mb-2">
                  End Year
                </label>
                <input
                  type="number"
                  id="end_year"
                  value={data.end_year}
                  onChange={(e) => setData('end_year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="2020"
                />
                {errors.end_year && <p className="text-red-600 text-sm mt-1">{errors.end_year}</p>}
              </div>
            </div>

            {/* Project Status and Surface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="achievement_status" className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement Status
                </label>
                <select
                  id="achievement_status"
                  value={data.achievement_status}
                  onChange={(e) => setData('achievement_status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select Status</option>
                  <option value="ACHEVÉ">ACHEVÉ</option>
                  <option value="EN COURS">EN COURS</option>
                  <option value="EN PROJET">EN PROJET</option>
                  <option value="SUSPENDU">SUSPENDU</option>
                </select>
                {errors.achievement_status && <p className="text-red-600 text-sm mt-1">{errors.achievement_status}</p>}
              </div>

              <div>
                <label htmlFor="surface_area" className="block text-sm font-medium text-gray-700 mb-2">
                  Surface Area
                </label>
                <input
                  type="text"
                  id="surface_area"
                  value={data.surface_area}
                  onChange={(e) => setData('surface_area', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="7000 m²"
                />
                {errors.surface_area && <p className="text-red-600 text-sm mt-1">{errors.surface_area}</p>}
              </div>
            </div>

            {/* Client and Project Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Client / Maîtrise d'Ouvrage
                </label>
                <input
                  type="text"
                  id="client_name"
                  value={data.client_name}
                  onChange={(e) => setData('client_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="CASA AMÉNAGEMENT / CID"
                />
                {errors.client_name && <p className="text-red-600 text-sm mt-1">{errors.client_name}</p>}
              </div>

              <div>
                <label htmlFor="project_cost" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Cost / Montant des Travaux
                </label>
                <input
                  type="text"
                  id="project_cost"
                  value={data.project_cost}
                  onChange={(e) => setData('project_cost', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="21 Mdhs"
                />
                {errors.project_cost && <p className="text-red-600 text-sm mt-1">{errors.project_cost}</p>}
              </div>
            </div>

            {/* Duration */}
            <div className="mt-6">
              <label htmlFor="duration_months" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Months)
              </label>
              <input
                type="number"
                id="duration_months"
                value={data.duration_months}
                onChange={(e) => setData('duration_months', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="24"
              />
              {errors.duration_months && <p className="text-red-600 text-sm mt-1">{errors.duration_months}</p>}
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
              <div
                className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
                  isDraggingMain
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={!imagePreview ? handleMainImageAreaClick : undefined}
                onDragOver={handleMainImageDragOver}
                onDragEnter={handleMainImageDragEnter}
                onDragLeave={handleMainImageDragLeave}
                onDrop={handleMainImageDrop}
              >
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
                    <button
                      type="button"
                      onClick={handleMainImageAreaClick}
                      className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                      title="Change image"
                    >
                      <Upload className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-900">Upload a file or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
                <input
                  ref={mainImageInputRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </div>
              {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images (Optional)
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
                  isDraggingGallery
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={handleGalleryAreaClick}
                onDragOver={handleGalleryDragOver}
                onDragEnter={handleGalleryDragEnter}
                onDragLeave={handleGalleryDragLeave}
                onDrop={handleGalleryDrop}
              >
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
                          onClick={(e) => {
                            e.stopPropagation()
                            removeGalleryImage(index)
                          }}
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
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900">Upload gallery images</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Multiple files allowed</p>
                </div>
                <input
                  ref={galleryInputRef}
                  id="gallery"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="sr-only"
                />
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

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              {modalConfig.type === 'error' && (
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              )}
              {modalConfig.type === 'success' && (
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              )}
              {modalConfig.type === 'warning' && (
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {modalConfig.title}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              {modalConfig.message}
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setShowModal(false)}
                variant="outline"
              >
                Close
              </Button>
              {modalConfig.onConfirm && (
                <Button
                  onClick={() => {
                    modalConfig.onConfirm()
                    setShowModal(false)
                  }}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Confirm
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
