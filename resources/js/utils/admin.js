// Admin utility functions

/**
 * Format date for admin display
 */
export function formatAdminDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Get status color classes
 */
export function getStatusColor(status, type = 'badge') {
  const colors = {
    active: {
      badge: 'bg-green-100 text-green-800',
      dot: 'bg-green-500'
    },
    inactive: {
      badge: 'bg-gray-100 text-gray-800',
      dot: 'bg-gray-500'
    },
    draft: {
      badge: 'bg-yellow-100 text-yellow-800',
      dot: 'bg-yellow-500'
    },
    archived: {
      badge: 'bg-red-100 text-red-800',
      dot: 'bg-red-500'
    },
    unread: {
      badge: 'bg-blue-100 text-blue-800',
      dot: 'bg-blue-500'
    },
    read: {
      badge: 'bg-gray-100 text-gray-800',
      dot: 'bg-gray-500'
    }
  }

  return colors[status]?.[type] || colors.inactive[type]
}

/**
 * Generate breadcrumbs for admin pages
 */
export function generateAdminBreadcrumbs(path, customLabels = {}) {
  const segments = path.split('/').filter(Boolean)
  const breadcrumbs = []

  // Always start with Admin
  breadcrumbs.push({ title: 'Admin', href: '/admin' })

  let currentPath = '/admin'

  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i]
    currentPath += `/${segment}`

    // Skip numeric IDs
    if (!isNaN(segment)) continue

    const label = customLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ title: label, href: currentPath })
  }

  return breadcrumbs
}

/**
 * Debounce function for search inputs
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Sort array by multiple fields
 */
export function sortBy(array, ...fields) {
  return array.sort((a, b) => {
    for (const field of fields) {
      const [key, direction = 'asc'] = field.split(':')
      const aVal = getNestedValue(a, key)
      const bVal = getNestedValue(b, key)

      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
    }
    return 0
  })
}

/**
 * Get nested object value by dot notation
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

/**
 * Filter array by search term across multiple fields
 */
export function searchFilter(array, searchTerm, fields) {
  if (!searchTerm) return array

  const term = searchTerm.toLowerCase()

  return array.filter(item =>
    fields.some(field => {
      const value = getNestedValue(item, field)
      return value && value.toString().toLowerCase().includes(term)
    })
  )
}

/**
 * Paginate array
 */
export function paginate(array, page = 1, perPage = 10) {
  const start = (page - 1) * perPage
  const end = start + perPage

  return {
    data: array.slice(start, end),
    current_page: page,
    per_page: perPage,
    total: array.length,
    last_page: Math.ceil(array.length / perPage),
    from: start + 1,
    to: Math.min(end, array.length)
  }
}

/**
 * Generate random ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}

/**
 * Download data as JSON file
 */
export function downloadJSON(data, filename = 'data.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Download data as CSV file
 */
export function downloadCSV(data, filename = 'data.csv') {
  if (!data.length) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
