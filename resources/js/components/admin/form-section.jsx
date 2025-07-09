import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload, X, Image as ImageIcon, File } from 'lucide-react'
import { useState } from 'react'
import { useModal } from '@/components/ui/modal'

export function FormSection({ title, description, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
      {(title || description) && (
        <div className="mb-6 pb-4 border-b border-gray-100">
          {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}

export function FormField({
  label,
  required = false,
  error,
  description,
  children,
  className = ''
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {children}
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  multiple = false,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className = ''
}) {
  const [dragActive, setDragActive] = useState(false)
  const [previews, setPreviews] = useState(value ? (Array.isArray(value) ? value : [value]) : [])
  const { showError, ModalComponent } = useModal()

  const handleFiles = (files) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(file => {
      if (file.size > maxSize) {
        showError(
          'File Too Large',
          `File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`
        )
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      const newPreviews = validFiles.map(file => URL.createObjectURL(file))

      if (multiple) {
        setPreviews(prev => [...prev, ...newPreviews])
        onChange([...previews, ...validFiles])
      } else {
        setPreviews([newPreviews[0]])
        onChange(validFiles[0])
      }
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const removePreview = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index)
    setPreviews(newPreviews)
    onRemove?.(index)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-2">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {accept.includes('image') ? 'PNG, JPG, GIF up to' : 'Files up to'} {maxSize / 1024 / 1024}MB
            </p>
          </div>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {preview.startsWith('data:') || preview.startsWith('blob:') || preview.startsWith('http') ? (
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <File className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePreview(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Component */}
      <ModalComponent />
    </div>
  )
}

export function StatusSelect({ value, onChange, options = [], className = '' }) {
  const defaultOptions = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
    { value: 'draft', label: 'Draft', color: 'bg-yellow-100 text-yellow-800' },
  ]

  const statusOptions = options.length > 0 ? options : defaultOptions
  const selectedOption = statusOptions.find(option => option.value === value)

  return (
    <div className={`space-y-2 ${className}`}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>
            {selectedOption && (
              <div className="flex items-center space-x-2">
                <Badge className={selectedOption.color}>
                  {selectedOption.label}
                </Badge>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center space-x-2">
                <Badge className={option.color}>
                  {option.label}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function FormActions({
  onCancel,
  onSubmit,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  loading = false,
  className = ''
}) {
  return (
    <div className={`flex justify-end space-x-4 pt-6 border-t border-gray-200 ${className}`}>
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}
      <Button
        type="submit"
        disabled={loading}
        onClick={onSubmit}
        className="bg-gray-900 hover:bg-gray-800"
      >
        {loading ? 'Saving...' : submitLabel}
      </Button>
    </div>
  )
}
