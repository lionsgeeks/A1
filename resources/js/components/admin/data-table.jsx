import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Search,
    Filter,
    SortAsc,
    SortDesc,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Grid,
    List,
    MapPin,
    Calendar
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function DataTable({
    data = [],
    columns = [],
    searchable = true,
    filterable = true,
    sortable = true,
    viewModes = ['grid', 'list'],
    onSearch,
    onFilter,
    onSort,
    onViewModeChange,
    actions = [],
    emptyState,
    loading = false
}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortField, setSortField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')
    const [viewMode, setViewMode] = useState(viewModes[0])

    // Helper function to get nested object values
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((current, key) => current?.[key], obj)
    }

    // Client-side filtering and searching
    const filteredData = useMemo(() => {
        if (!searchTerm) return data

        return data.filter(item => {
            // Search across all searchable fields
            const searchableFields = columns
                .filter(col => col.searchable !== false)
                .map(col => col.key)

            return searchableFields.some(field => {
                const value = getNestedValue(item, field)
                return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            })
        })
    }, [data, searchTerm, columns])

    // Client-side sorting
    const sortedData = useMemo(() => {
        if (!sortField) return filteredData

        return [...filteredData].sort((a, b) => {
            const aVal = getNestedValue(a, sortField)
            const bVal = getNestedValue(b, sortField)

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
    }, [filteredData, sortField, sortDirection])



    const handleSearch = (value) => {
        setSearchTerm(value)
        // Still call onSearch for backward compatibility, but don't rely on it
        onSearch?.(value)
    }

    const handleSort = (field) => {
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'
        setSortField(field)
        setSortDirection(direction)
        onSort?.(field, direction)
    }

    const handleViewModeChange = (mode) => {
        setViewMode(mode)
        onViewModeChange?.(mode)
    }

    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item[column.key], item)
        }

        if (column.type === 'badge') {
            return (
                <Badge variant={column.variant?.(item[column.key]) || 'default'}>
                    {item[column.key]}
                </Badge>
            )
        }

        if (column.type === 'image') {
            return (
                <img
                    src={item[column.key] || '/placeholder.svg'}
                    alt={column.alt || ''}
                    className="w-20 h-20 object-cover rounded-lg"
                />
            )
        }

        return item[column.key]
    }

    const renderActions = (item) => {
        if (actions.length === 0) return null

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {actions.map((action, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={() => action.onClick(item)}
                            className={action.destructive ? 'text-red-600' : ''}
                        >
                            {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    {searchable && (
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full sm:w-64"
                            />
                        </div>
                    )}

                    {filterable && (
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    )}
                </div>

                {viewModes.length > 1 && (
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                        {viewModes.map((mode) => (
                            <Button
                                key={mode}
                                variant={viewMode === mode ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => handleViewModeChange(mode)}
                                className="h-8 w-8 p-0"
                            >
                                {mode === 'grid' ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* Data Display */}
            {sortedData.length === 0 ? (
                <div className="text-center py-12">
                    {emptyState || (
                        <div>
                            <p className="text-gray-500 text-lg mb-2">No data found</p>
                            <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedData.map((item, index) => {
                        const cats = item.categories || (item.category ? [item.category] : []);
                        const firstCat = cats[0];
                        const remaining = Math.max(0, cats.length - 1);
                        return (
                            <a key={item.id || index} href={`/admin/projects/${item.id}/edit`} className="group block rounded-xl border border-gray-100 overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                {/* Image banner */}
                                <div className="relative">
                                    <img src={item.image_path || '/placeholder.svg'} alt="" className="h-40 w-full object-cover" />
                                    {actions.length > 0 && (
                                        <div className="absolute top-2 right-2">
                                            {renderActions(item)}
                                        </div>
                                    )}
                                </div>
                                {/* Body */}
                                <div className="p-4">
                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700">
                                        {item.title}
                                    </h3>

                                    {/* Categories */}
                                    <div className="mt-3 flex items-center gap-2">
                                        {firstCat ? (
                                            <Badge className="text-white" style={{ backgroundColor: firstCat?.color || '#a3845b' }}>
                                                {firstCat?.name || 'Sans catégorie'}
                                            </Badge>
                                        ) : (
                                            <span className="text-xs text-gray-400">—</span>
                                        )}
                                        {remaining > 0 && (
                                            <span className="text-xs text-gray-500">+{remaining}</span>
                                        )}
                                    </div>

                                    {/* Meta */}
                                    <div className="mt-3 space-y-1 text-sm">
                                        {item.location ? (
                                            <div className="flex items-center text-gray-600">
                                                <span className="mr-2"><MapPin className="h-4 w-4 text-gray-400" /></span>
                                                <span className="line-clamp-1">{item.location}</span>
                                            </div>
                                        ) : null}
                                        {item.year ? (
                                            <div className="flex items-center text-gray-600">
                                                <span className="mr-2"><Calendar className="h-4 w-4 text-gray-400" /></span>
                                                <span>{item.year}</span>
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* Status */}
                                    {item.status && (
                                        <div className="mt-3">
                                            <Badge className={`text-xs ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{item.status}</Badge>
                                        </div>
                                    )}
                                </div>
                            </a>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>{column.label}</span>
                                                {sortable && column.sortable !== false && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleSort(column.key)}
                                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                                    >
                                                        {sortField === column.key ? (
                                                            sortDirection === 'asc' ?
                                                                <SortAsc className="h-3 w-3" /> :
                                                                <SortDesc className="h-3 w-3" />
                                                        ) : (
                                                            <SortAsc className="h-3 w-3 opacity-50" />
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    {actions.length > 0 && (
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sortedData.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                                        {columns.map((column) => (
                                            <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {renderCell(item, column)}
                                            </td>
                                        ))}
                                        {actions.length > 0 && (
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                {renderActions(item)}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
