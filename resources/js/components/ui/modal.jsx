import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react'

export function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info', // 'success', 'error', 'warning', 'info'
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm = null,
  showCancel = false
}) {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'error':
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700'
      case 'error':
        return 'bg-red-600 hover:bg-red-700'
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700'
      default:
        return 'bg-blue-600 hover:bg-blue-700'
    }
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
        <div className="p-6">
          <div className="flex items-center mb-4">
            {getIcon()}
            <h3 className="text-lg font-semibold text-gray-900 ml-3">
              {title}
            </h3>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>

          <div className="flex justify-end space-x-3">
            {showCancel && (
              <Button
                onClick={onClose}
                variant="outline"
                className="px-4 py-2"
              >
                {cancelText}
              </Button>
            )}
            <Button
              onClick={handleConfirm}
              className={`text-white px-4 py-2 ${getButtonColor()}`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for easy modal management
export function useModal() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'OK',
    cancelText: 'Cancel',
    onConfirm: null,
    showCancel: false
  })

  const showModal = (config) => {
    setModalState({
      isOpen: true,
      title: config.title || 'Notification',
      message: config.message || '',
      type: config.type || 'info',
      confirmText: config.confirmText || 'OK',
      cancelText: config.cancelText || 'Cancel',
      onConfirm: config.onConfirm || null,
      showCancel: config.showCancel || false
    })
  }

  const hideModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  const showSuccess = (title, message, onConfirm = null) => {
    showModal({ type: 'success', title, message, onConfirm })
  }

  const showError = (title, message, onConfirm = null) => {
    showModal({ type: 'error', title, message, onConfirm })
  }

  const showWarning = (title, message, onConfirm = null) => {
    showModal({ type: 'warning', title, message, onConfirm })
  }

  const showInfo = (title, message, onConfirm = null) => {
    showModal({ type: 'info', title, message, onConfirm })
  }

  const showConfirm = (title, message, onConfirm) => {
    showModal({
      type: 'warning',
      title,
      message,
      onConfirm,
      showCancel: true,
      confirmText: 'Confirm',
      cancelText: 'Cancel'
    })
  }

  const ModalComponent = () => (
    <Modal
      {...modalState}
      onClose={hideModal}
    />
  )

  return {
    showModal,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    hideModal,
    ModalComponent
  }
}
