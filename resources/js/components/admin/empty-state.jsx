import { Button } from '@/components/ui/button'
import { 
  FolderOpen, 
  MessageSquare, 
  Search, 
  Plus, 
  FileText,
  Image as ImageIcon,
  Users,
  Settings
} from 'lucide-react'
import { Link } from '@inertiajs/react'

export function EmptyState({ 
  icon: Icon = FolderOpen,
  title = 'No data found',
  description = 'Get started by creating your first item',
  action,
  secondaryAction,
  className = ''
}) {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {action && (
          action.href ? (
            <Link href={action.href}>
              <Button className={action.className || 'bg-gray-900 hover:bg-gray-800'}>
                {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button 
              onClick={action.onClick}
              className={action.className || 'bg-gray-900 hover:bg-gray-800'}
            >
              {action.icon && <action.icon className="h-4 w-4 mr-2" />}
              {action.label}
            </Button>
          )
        )}
        
        {secondaryAction && (
          secondaryAction.href ? (
            <Link href={secondaryAction.href}>
              <Button variant="outline">
                {secondaryAction.icon && <secondaryAction.icon className="h-4 w-4 mr-2" />}
                {secondaryAction.label}
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.icon && <secondaryAction.icon className="h-4 w-4 mr-2" />}
              {secondaryAction.label}
            </Button>
          )
        )}
      </div>
    </div>
  )
}

// Predefined empty states for common scenarios
export function NoProjectsFound({ createHref }) {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No projects found"
      description="You haven't created any projects yet. Start by adding your first project to showcase your work."
      action={{
        href: createHref,
        label: 'Create First Project',
        icon: Plus
      }}
      secondaryAction={{
        href: '/admin',
        label: 'Back to Dashboard'
      }}
    />
  )
}

export function NoMessagesFound() {
  return (
    <EmptyState
      icon={MessageSquare}
      title="No messages found"
      description="You don't have any contact messages yet. When visitors contact you through the website, their messages will appear here."
      secondaryAction={{
        href: '/admin',
        label: 'Back to Dashboard'
      }}
    />
  )
}

export function NoSearchResults({ searchTerm, onClearSearch }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`We couldn't find anything matching "${searchTerm}". Try adjusting your search terms or filters.`}
      action={{
        onClick: onClearSearch,
        label: 'Clear Search',
        className: 'bg-gray-900 hover:bg-gray-800'
      }}
    />
  )
}

export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="text-center py-12 px-6">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
      <p className="text-gray-600">{message}</p>
    </div>
  )
}

export function ErrorState({ 
  title = 'Something went wrong',
  description = 'We encountered an error while loading the data. Please try again.',
  onRetry
}) {
  return (
    <EmptyState
      icon={FileText}
      title={title}
      description={description}
      action={onRetry && {
        onClick: onRetry,
        label: 'Try Again',
        className: 'bg-gray-900 hover:bg-gray-800'
      }}
    />
  )
}
