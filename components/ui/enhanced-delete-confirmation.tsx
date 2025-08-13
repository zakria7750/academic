import { ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle, Loader2 } from "lucide-react"

interface EnhancedDeleteConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string | ReactNode
  itemName?: string
  isLoading?: boolean
  destructive?: boolean
}

export function EnhancedDeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  title = "تأكيد الحذف",
  description,
  itemName,
  isLoading = false,
  destructive = true
}: EnhancedDeleteConfirmationProps) {
  const defaultDescription = itemName 
    ? `هل أنت متأكد من حذف "${itemName}"؟`
    : "هل أنت متأكد من تنفيذ هذا الإجراء؟"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            {destructive ? (
              <Trash2 className="w-8 h-8 text-red-600" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {description || defaultDescription}
          </p>
          
          {destructive && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700 font-medium flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                لا يمكن التراجع عن هذا الإجراء
              </p>
            </div>
          )}
          
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button
              onClick={onConfirm}
              className={`flex-1 ${
                destructive 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جاري التنفيذ...
                </>
              ) : (
                <>
                  {destructive ? (
                    <Trash2 className="w-4 h-4 ml-2" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 ml-2" />
                  )}
                  تأكيد
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}