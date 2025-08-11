import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Palette, Eye, EyeOff, X, Upload, ImageIcon } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'
import { useModal } from '@/components/ui/modal'

export default function CategoriesIndex({ categories, filters }) {
  const [search, setSearch] = useState(filters.search || '')
  const [deletingId, setDeletingId] = useState(null)
  const [searching, setSearching] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    color: '#a3845b',
    sort_order: 0,
    is_active: true,
    image: null
  })
  const [editLoading, setEditLoading] = useState(false)
  const { showConfirm, showSuccess, showError, ModalComponent } = useModal()

  const handleSearch = (e) => {
    e.preventDefault()
    setSearching(true)
    router.get(route('admin.categories.index'), { search }, {
      preserveState: true,
      replace: true,
      onFinish: () => setSearching(false)
    })
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setEditForm({
      name: category.name,
      description: category.description || '',
      color: category.color,
      sort_order: category.sort_order,
      is_active: category.is_active,
      image: null
    })
    setEditModalOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)

    const formData = new FormData()
    formData.append('name', editForm.name)
    formData.append('description', editForm.description)
    formData.append('color', editForm.color)
    formData.append('sort_order', editForm.sort_order)
    formData.append('is_active', editForm.is_active ? '1' : '0')
    formData.append('_method', 'PUT')

    if (editForm.image) {
      formData.append('image', editForm.image)
    }

    // Debug logging
    console.log('Form data being sent:', {
      name: editForm.name,
      description: editForm.description,
      color: editForm.color,
      sort_order: editForm.sort_order,
      is_active: editForm.is_active,
      hasImage: !!editForm.image
    })

    try {
      const response = await fetch(`/admin/categories/${editingCategory.id}/update`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      })

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
          console.error('Response error:', response.status, errorData)
        } catch (e) {
          const errorText = await response.text()
          console.error('Response error:', response.status, errorText)
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('Response data:', data)

      if (data.success) {
        setEditModalOpen(false)
        setEditingCategory(null)
        showSuccess('Category Updated!', data.message)
        // Refresh the page to show updated data
        router.reload()
      } else {
        showError('Update Failed', data.message || 'There was an error updating the category.')
      }
    } catch (error) {
      console.error('Update error:', error)
      showError('Update Failed', error.message || 'There was an error updating the category. Please try again.')
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = (category) => {
    showConfirm(
      'Delete Category',
      `Are you sure you want to delete the category "${category.name}"? This action cannot be undone and will affect all projects in this category.`,
      () => {
        setDeletingId(category.id)
        router.delete(route('admin.categories.destroy', category.id), {
          onSuccess: () => {
            setDeletingId(null)
            showSuccess(
              'Category Deleted!',
              'The category has been deleted successfully.'
            )
          },
          onError: (errors) => {
            setDeletingId(null)
            const errorMessage = errors.error || 'There was an error deleting the category. Please try again.'
            showError(
              'Delete Failed',
              errorMessage
            )
          }
        })
      }
    )
  }

  return (
    <AppLayout>
      <Head title="Categories Management" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
                  <p className="text-gray-600 mt-1">Manage project categories for better organization</p>
                </div>
                <Link href={route('admin.categories.create')}>
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </Link>
              </div>
            </div>

            {/* Search */}
            <div className="p-6">
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" variant="outline" disabled={searching}>
                  {searching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              {categories.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.data.map((category) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      {/* Category Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {/* Category Image or Color Indicator */}
                          {category.image_path ? (
                            <img
                              src={`/${category.image_path}`}
                              alt={category.name}
                              className="w-12 h-12 object-cover rounded-lg border border-gray-300"
                            />
                          ) : (
                            <div
                              className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center"
                              style={{ backgroundColor: category.color }}
                            >
                              <Palette className="h-6 w-6 text-white" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-500">#{category.slug}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {category.is_active ? (
                            <Badge variant="success" className="text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {category.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {category.description}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{category.projects_count}</span> projects
                        </div>
                        <div className="text-sm text-gray-500">
                          Order: <span className="font-medium">{category.sort_order}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(category)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={category.projects_count > 0 || deletingId === category.id}
                        >
                          {deletingId === category.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {category.projects_count > 0 && (
                        <p className="text-xs text-gray-500 mt-2">
                          Cannot delete: has {category.projects_count} project(s)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                  <p className="text-gray-500 mb-4">
                    {search ? 'No categories match your search.' : 'Get started by creating your first category.'}
                  </p>
                  <Link href={route('admin.categories.create')}>
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Category
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Pagination */}
            {categories.links && categories.links.length > 3 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-700">
                    Showing {categories.from} to {categories.to} of {categories.total} categories
                  </div>
                  <div className="flex space-x-1">
                    {categories.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-3 py-2 text-sm rounded-md ${
                          link.active
                            ? 'bg-primary-600 text-white'
                            : link.url
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Edit Category</h2>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleEditSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <Input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                    className="w-full"
                    placeholder="Enter category name"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="Enter category description"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color *
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={editForm.color}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={editForm.color}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort Order
                  </label>
                  <Input
                    type="number"
                    value={editForm.sort_order}
                    onChange={(e) => setEditForm({ ...editForm, sort_order: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={editForm.is_active}
                    onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Image
                  </label>
                  <div className="flex items-center space-x-3">
                    {editingCategory?.image_path && (
                      <img
                        src={`/${editingCategory.image_path}`}
                        alt="Current"
                        className="w-12 h-12 object-cover rounded border"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditModalOpen(false)}
                    className="flex-1"
                    disabled={editLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700"
                    disabled={editLoading}
                  >
                    {editLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      'Update Category'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Component */}
      <ModalComponent />
    </AppLayout>
  )
}
