import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Head, Link, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { ArrowLeft, Save, Palette, Eye, EyeOff } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'

export default function CategoryCreate({ category }) {
  const isEditing = !!category
  const [colorPreview, setColorPreview] = useState(category?.color || '#a3845b')

  const { data, setData, post, put, processing, errors } = useForm({
    name: category?.name || '',
    description: category?.description || '',
    color: category?.color || '#a3845b',
    sort_order: category?.sort_order || 0,
    is_active: category?.is_active ?? true
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      put(route('admin.categories.update', category.id))
    } else {
      post(route('admin.categories.store'))
    }
  }

  const handleColorChange = (e) => {
    const color = e.target.value
    setData('color', color)
    setColorPreview(color)
  }

  const predefinedColors = [
    '#a3845b', // Primary
    '#1c1c1d', // Secondary
    '#ef4444', // Red
    '#f97316', // Orange
    '#eab308', // Yellow
    '#22c55e', // Green
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#6b7280', // Gray
    '#0891b2', // Cyan
    '#84cc16'  // Lime
  ]

  return (
    <AppLayout>
      <Head title={isEditing ? `Edit Category: ${category.name}` : 'Create Category'} />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <Link href={route('admin.categories.index')}>
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Categories
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? `Edit Category: ${category.name}` : 'Create New Category'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {isEditing ? 'Update category information' : 'Add a new category for organizing projects'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g., Residential, Commercial, Industrial"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Sort Order */}
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    min="0"
                    value={data.sort_order}
                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className={errors.sort_order ? 'border-red-500' : ''}
                  />
                  {errors.sort_order && <p className="text-red-500 text-sm">{errors.sort_order}</p>}
                  <p className="text-gray-500 text-sm">Lower numbers appear first</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Brief description of this category..."
                  rows={3}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <Label>Category Color</Label>

                {/* Color Preview */}
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: colorPreview }}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Preview</p>
                    <p className="text-sm text-gray-500">{colorPreview}</p>
                  </div>
                </div>

                {/* Predefined Colors */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Quick Colors</p>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          setData('color', color)
                          setColorPreview(color)
                        }}
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          data.color === color
                            ? 'border-gray-900 scale-110'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom Color Input */}
                <div>
                  <Label htmlFor="color">Custom Color</Label>
                  <div className="flex items-center space-x-3 mt-2">
                    <Input
                      id="color"
                      type="color"
                      value={data.color}
                      onChange={handleColorChange}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={data.color}
                      onChange={handleColorChange}
                      placeholder="#a3845b"
                      className={`flex-1 ${errors.color ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setData('is_active', true)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      data.is_active
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                    <span>Active</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setData('is_active', false)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      !data.is_active
                        ? 'border-gray-500 bg-gray-50 text-gray-700'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <EyeOff className="h-4 w-4" />
                    <span>Inactive</span>
                  </button>
                </div>
              </div>

              {/* Project Count (Edit Mode) */}
              {isEditing && category.projects && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Projects in this category</h3>
                  <p className="text-sm text-gray-600">
                    This category currently has <strong>{category.projects.length}</strong> project(s).
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Link href={route('admin.categories.index')}>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {processing ? 'Saving...' : (isEditing ? 'Update Category' : 'Create Category')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
