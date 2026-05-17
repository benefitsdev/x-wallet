import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onClose, 200)
      }, duration)
      return () => clearTimeout(timer)
    }
    setShow(false)
  }, [isVisible, duration, onClose])

  if (!isVisible && !show) return null

  return (
    <div
      className={`fixed top-4 right-4 z-[100] transition-all duration-200 ${
        show ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
    >
      <div className="flex items-center gap-2 bg-success text-success-foreground px-4 py-3 rounded-lg shadow-lg text-sm font-medium">
        <Check size={16} />
        {message}
      </div>
    </div>
  )
}
