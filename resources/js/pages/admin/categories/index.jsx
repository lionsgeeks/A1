import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Palette, Eye, EyeOff } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'
import { useModal } from '@/components/ui/modal'

export default function CategoriesIndex({ categories, filters }) {
  const [search, setSearch] = useState(filters.search || '')
  const { showConfirm, ModalComponent } = useModal()

  const handleSearch = (e) => {
    e.preventDefault()
    router.get(route('admin.categories.index'), { search }, {
      preserveState: true,
      replace: true
    })
  }

  const handleDelete = (category) => {
    showConfirm(
      'Delete Category',
      `Are you sure you want to delete the category "${category.name}"? This action cannot be undone and will affect all projects in this category.`,
      () => {
        router.delete(route('admin.categories.destroy', category.id))
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
                <Button type="submit" variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search
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
                        <Link href={route('admin.categories.edit', category.id)} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(category)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={category.projects_count > 0}
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Modal Component */}
      <ModalComponent />
    </AppLayout>
  )
}
