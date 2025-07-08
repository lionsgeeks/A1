import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Download, Upload, Settings } from 'lucide-react'
import { Link } from '@inertiajs/react'

export function PageHeader({ 
  title, 
  description, 
  backHref,
  backLabel = 'Back',
  actions = [],
  badge,
  className = ''
}) {
  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          {backHref && (
            <Link href={backHref}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel}
              </Button>
            </Link>
          )}
          
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {badge && (
                <Badge variant={badge.variant || 'default'} className={badge.className}>
                  {badge.text}
                </Badge>
              )}
            </div>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>

        {actions.length > 0 && (
          <div className="flex items-center space-x-3">
            {actions.map((action, index) => (
              action.href ? (
                <Link key={index} href={action.href}>
                  <Button 
                    variant={action.variant || 'default'} 
                    size={action.size || 'default'}
                    className={action.className}
                  >
                    {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                    {action.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={index}
                  variant={action.variant || 'default'}
                  size={action.size || 'default'}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={action.className}
                >
                  {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                  {action.label}
                </Button>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function PageContent({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

export function PageContainer({ children, className = '' }) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {children}
    </div>
  )
}

// Predefined action types for common use cases
export const createAction = (href, label = 'Create New') => ({
  href,
  label,
  icon: Plus,
  variant: 'default'
})

export const exportAction = (onClick, label = 'Export') => ({
  onClick,
  label,
  icon: Download,
  variant: 'outline'
})

export const importAction = (onClick, label = 'Import') => ({
  onClick,
  label,
  icon: Upload,
  variant: 'outline'
})

export const settingsAction = (href, label = 'Settings') => ({
  href,
  label,
  icon: Settings,
  variant: 'ghost'
})
