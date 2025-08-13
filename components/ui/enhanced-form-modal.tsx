import { ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface EnhancedFormModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export function EnhancedFormModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "lg" 
}: EnhancedFormModalProps) {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${sizeClasses[size]} max-h-[95vh] overflow-hidden bg-white`}>
        <DialogHeader className="relative pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-academy-blue to-academy-gold rounded-full"></div>
              <DialogTitle className="text-xl font-bold text-academy-blue">
                {title}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={18} />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-academy-gold/30 to-transparent"></div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(95vh-120px)] p-6 pt-8">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}