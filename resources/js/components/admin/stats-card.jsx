import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react'
import { Link } from '@inertiajs/react'

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = 'bg-blue-500',
  change,
  changeType = 'neutral',
  description,
  href,
  loading = false,
  className = ''
}) {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3" />
      case 'decrease':
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600 bg-green-50'
      case 'decrease':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-6 bg-gray-200 rounded"></div>
          </div>
          <div className="w-24 h-8 bg-gray-200 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const CardContent = () => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`${color} p-3 rounded-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        
        {href && (
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        {change && (
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className={`${getChangeColor()} px-2 py-1`}>
              {getChangeIcon()}
              <span className="ml-1 text-xs font-medium">{change}</span>
            </Badge>
          </div>
        )}
        
        {description && (
          <p className="text-xs text-gray-500 text-right">{description}</p>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}

export function StatsGrid({ stats = [], loading = false, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.key || index}
          {...stat}
          loading={loading}
        />
      ))}
    </div>
  )
}

export function MiniStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = 'text-blue-600',
  href,
  className = ''
}) {
  const CardContent = () => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex items-center space-x-3">
        <Icon className={`h-5 w-5 ${color}`} />
        <div>
          <p className="text-xs font-medium text-gray-600">{title}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}
