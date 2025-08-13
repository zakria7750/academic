"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface EnhancedImageUploadProps {
  onImageChange: (file: File | null) => void
  currentImageUrl?: string
  label?: string
  accept?: string
  maxSize?: number // in MB
  required?: boolean
  className?: string
  preview?: boolean
}

export function EnhancedImageUpload({
  onImageChange,
  currentImageUrl,
  label = "صورة",
  accept = "image/*",
  maxSize = 5,
  required = false,
  className = "",
  preview = true
}: EnhancedImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback((file: File | null) => {
    setError(null)
    
    if (!file) {
      setSelectedFile(null)
      setPreviewUrl(null)
      onImageChange(null)
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`حجم الملف يجب أن يكون أقل من ${maxSize} ميجابايت`)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('يرجى اختيار ملف صورة صالح')
      return
    }

    setIsLoading(true)
    setSelectedFile(file)
    onImageChange(file)

    // Create preview URL
    if (preview) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
    
    setIsLoading(false)
  }, [maxSize, onImageChange, preview])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }, [handleFileChange])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }

  const clearImage = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const displayImageUrl = previewUrl || currentImageUrl

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-academy-blue font-semibold text-base">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {/* Image Preview */}
      {displayImageUrl && (
        <div className="relative w-full max-w-sm mx-auto">
          <div className="relative bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 group">
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <Image
                src={displayImageUrl}
                alt="معاينة الصورة"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 400px) 100vw, 400px"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 left-2 h-8 w-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={clearImage}
            >
              <X size={16} />
            </Button>
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            {selectedFile ? `ملف جديد: ${selectedFile.name}` : 'الصورة الحالية'}
          </p>
        </div>
      )}

      {/* Upload Area */}
      {!displayImageUrl && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragOver 
              ? 'border-academy-blue bg-academy-blue/5 scale-105' 
              : 'border-gray-300 hover:border-academy-gold hover:bg-academy-gold/5'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
            required={required}
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isDragOver ? 'bg-academy-blue/20' : 'bg-academy-gold/20'
            }`}>
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-academy-blue animate-spin" />
              ) : (
                <Upload className={`w-8 h-8 ${isDragOver ? 'text-academy-blue' : 'text-academy-gold'}`} />
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-semibold text-academy-blue">
                اسحب وأفلت الصورة هنا
              </p>
              <p className="text-gray-500">أو</p>
              <Button
                type="button"
                variant="outline"
                className="border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white transition-colors"
                disabled={isLoading}
              >
                <ImageIcon className="w-4 h-4 ml-2" />
                اختر صورة
              </Button>
            </div>
            
            <p className="text-sm text-gray-400">
              PNG, JPG أو JPEG (الحد الأقصى {maxSize} ميجابايت)
            </p>
          </div>
        </div>
      )}

      {/* Change Image Button for existing images */}
      {displayImageUrl && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white transition-colors"
          >
            <ImageIcon className="w-4 h-4 ml-2" />
            تغيير الصورة
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-center">
          {error}
        </div>
      )}
    </div>
  )
}