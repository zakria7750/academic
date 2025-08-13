import { ReactNode, useEffect } from "react"
import { CheckCircle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EnhancedMessageProps {
  type: "success" | "error" | "warning" | "info"
  message: string | ReactNode
  onClose?: () => void
  autoClose?: boolean
  autoCloseDelay?: number
  className?: string
}

export function EnhancedMessage({
  type,
  message,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
  className = ""
}: EnhancedMessageProps) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDelay, onClose])

  const styleConfig = {
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: CheckCircle,
      iconColor: "text-green-600"
    },
    error: {
      bg: "bg-red-50 border-red-200", 
      text: "text-red-800",
      icon: AlertCircle,
      iconColor: "text-red-600"
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-800", 
      icon: AlertCircle,
      iconColor: "text-yellow-600"
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-800",
      icon: AlertCircle,
      iconColor: "text-blue-600"
    }
  }

  const config = styleConfig[type]
  const Icon = config.icon

  return (
    <div className={`relative border rounded-lg p-4 shadow-sm transition-all duration-500 animate-in slide-in-from-top-3 ${config.bg} ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-6 h-6 ${config.iconColor}`}>
          <Icon size={20} />
        </div>
        
        <div className={`flex-1 ${config.text} font-medium leading-relaxed`}>
          {message}
        </div>
        
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={`h-6 w-6 p-0 ${config.text} hover:bg-white/50 rounded-full flex-shrink-0`}
          >
            <X size={14} />
          </Button>
        )}
      </div>
      
      {autoClose && (
        <div 
          className={`absolute bottom-0 left-0 h-1 bg-current ${config.iconColor} rounded-b-lg animate-pulse`}
          style={{
            animation: `progress ${autoCloseDelay}ms linear forwards`
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}