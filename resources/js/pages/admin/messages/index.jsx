import { useState } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Mail,
  MailOpen,
  Trash2,
  Eye,
  Search,
  Filter,
  Phone,
  Calendar,
  User,
  X
} from 'lucide-react'
import { router } from '@inertiajs/react'

export default function MessagesIndex({ messages, filters, stats }) {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '')
  const [selectedStatus, setSelectedStatus] = useState(filters?.status || 'all')
  const [selectedMessage, setSelectedMessage] = useState(null)

  const statuses = ['all', 'unread', 'read']

  const handleSearch = (e) => {
    e.preventDefault()
    router.get('/admin/messages', {
      search: searchTerm,
      status: selectedStatus !== 'all' ? selectedStatus : undefined
    })
  }

  const markAsRead = (message) => {
    router.patch(`/admin/messages/${message.id}/read`)
  }

  const markAsUnread = (message) => {
    router.patch(`/admin/messages/${message.id}/unread`)
  }

  const deleteMessage = (message) => {
    if (confirm(`Are you sure you want to delete this message from ${message.name}?`)) {
      router.delete(`/admin/messages/${message.id}`)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800'
      case 'read': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AdminLayout title="Contact Messages">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{stats?.total || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-3 rounded-lg">
                <MailOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{stats?.unread || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Read Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{stats?.read || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
            <p className="text-gray-600">Manage incoming contact form submissions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Messages' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </form>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {messages.data?.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {messages.data.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    message.status === 'unread' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{message.name}</h3>
                        <Badge className={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                        <Badge variant="outline">{message.project_type}</Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{message.email}</span>
                        </div>
                        {message.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{message.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(message.created_at)}</span>
                        </div>
                      </div>

                      {message.budget && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Budget:</strong> {message.budget}
                        </p>
                      )}

                      <p className="text-gray-700 line-clamp-3">{message.message}</p>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>

                      {message.status === 'unread' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(message)}
                        >
                          <MailOpen className="h-3 w-3 mr-1" />
                          Mark Read
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsUnread(message)}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Mark Unread
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMessage(message)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">No contact messages match your current filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {messages.links && (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {messages.from} to {messages.to} of {messages.total} results
              </div>
              <div className="flex space-x-2">
                {messages.links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => link.url && router.get(link.url)}
                    disabled={!link.url}
                    className={`px-3 py-1 text-sm rounded ${
                      link.active
                        ? 'bg-gray-900 text-white'
                        : link.url
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedMessage(null)} />

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Message Details</h3>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Project Type</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.project_type}</p>
                      </div>
                    </div>

                    {selectedMessage.budget && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Budget</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.budget}</p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Message</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Received</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(selectedMessage.created_at)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <div className="flex space-x-3">
                    {selectedMessage.status === 'unread' ? (
                      <Button
                        onClick={() => {
                          markAsRead(selectedMessage)
                          setSelectedMessage(null)
                        }}
                        className="bg-gray-900 hover:bg-gray-800"
                      >
                        Mark as Read
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          markAsUnread(selectedMessage)
                          setSelectedMessage(null)
                        }}
                        variant="outline"
                      >
                        Mark as Unread
                      </Button>
                    )}
                    <Button
                      onClick={() => setSelectedMessage(null)}
                      variant="outline"
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
    </AdminLayout>
  )
}
