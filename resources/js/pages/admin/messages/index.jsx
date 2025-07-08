import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Mail,
  MailOpen,
  Trash2,
  Eye,
  Phone,
  Calendar,
  User,
  X
} from 'lucide-react'
import { router } from '@inertiajs/react'
import {
  DataTable,
  PageHeader,
  PageContent,
  PageContainer,
  NoMessagesFound
} from '@/components/admin'

export default function MessagesIndex({ messages, filters, stats }) {
  const breadcrumbs = [
    { title: 'Admin', href: '/admin' },
    { title: 'Messages', href: '/admin/messages' }
  ]
  const [selectedStatus, setSelectedStatus] = useState(filters?.status || 'all')
  const [selectedMessage, setSelectedMessage] = useState(null)

  // Table columns configuration
  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, message) => (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{message.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      render: (value) => (
        <div className="max-w-xs truncate">{value}</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      variant: (value) => value === 'unread' ? 'default' : 'secondary'
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ]

  // Table actions
  const actions = [
    {
      label: 'View Details',
      icon: Eye,
      onClick: (message) => {
        setSelectedMessage(message)
      }
    },
    {
      label: 'Mark as Read',
      icon: MailOpen,
      onClick: (message) => {
        router.patch(`/admin/messages/${message.id}/read`)
      },
      show: (message) => message.status === 'unread'
    },
    {
      label: 'Mark as Unread',
      icon: Mail,
      onClick: (message) => {
        router.patch(`/admin/messages/${message.id}/unread`)
      },
      show: (message) => message.status === 'read'
    },
    {
      label: 'Delete',
      icon: Trash2,
      destructive: true,
      onClick: (message) => {
        if (confirm(`Are you sure you want to delete this message from ${message.name}?`)) {
          router.delete(`/admin/messages/${message.id}`)
        }
      }
    }
  ]

  const handleCloseDetails = () => {
    setSelectedMessage(null)
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
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Contact Messages" />

      <PageContainer>
        <PageHeader
          title="Contact Messages"
          description="Manage and respond to contact form submissions"
        />

        <PageContent>
          {messages.data?.length === 0 ? (
            <NoMessagesFound />
          ) : (
            <DataTable
              data={messages.data || []}
              columns={columns}
              actions={actions.filter(action => !action.show || action.show)}
              searchable={true}
              filterable={true}
              sortable={true}
              viewModes={['list']}
              onSearch={(term) => {
                router.get('/admin/messages', {
                  search: term,
                  status: selectedStatus !== 'all' ? selectedStatus : undefined
                })
              }}
              emptyState={<NoMessagesFound />}
            />
          )}

          {/* Message Details Modal */}
          {selectedMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Message Details</h3>
                    <Button variant="ghost" size="sm" onClick={handleCloseDetails}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Name</h4>
                        <p className="text-gray-600 flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {selectedMessage.name}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                        <p className="text-gray-600 flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {selectedMessage.email}
                        </p>
                      </div>
                      {selectedMessage.phone && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                          <p className="text-gray-600 flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {selectedMessage.phone}
                          </p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Date</h4>
                        <p className="text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(selectedMessage.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Subject</h4>
                      <p className="text-gray-600">{selectedMessage.subject}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Message</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <Badge variant={selectedMessage.status === 'unread' ? 'default' : 'secondary'}>
                        {selectedMessage.status}
                      </Badge>
                      <div className="flex space-x-3">
                        {selectedMessage.status === 'unread' ? (
                          <Button
                            variant="outline"
                            onClick={() => {
                              router.patch(`/admin/messages/${selectedMessage.id}/read`)
                              handleCloseDetails()
                            }}
                          >
                            <MailOpen className="h-4 w-4 mr-2" />
                            Mark as Read
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => {
                              router.patch(`/admin/messages/${selectedMessage.id}/unread`)
                              handleCloseDetails()
                            }}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Mark as Unread
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete this message from ${selectedMessage.name}?`)) {
                              router.delete(`/admin/messages/${selectedMessage.id}`)
                              handleCloseDetails()
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PageContent>
      </PageContainer>
    </AppLayout>
  )
}
