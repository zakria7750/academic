/**
 * مكتبة مساعدة للتعامل مع الملفات
 * تحتوي على دوال للتحقق من أنواع الملفات وتصنيفها
 */

/**
 * دالة للتحقق من نوع الملف بناءً على الامتداد
 * @param fileName اسم الملف مع الامتداد
 * @returns نوع الملف (image, pdf, document, other)
 */
export function getFileType(fileName: string): "image" | "pdf" | "document" | "other" {
  const extension = fileName.split(".").pop()?.toLowerCase() || ""
  
  // أنواع الصور المدعومة
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"]
  if (imageExtensions.includes(extension)) {
    return "image"
  }
  
  // ملفات PDF
  if (extension === "pdf") {
    return "pdf"
  }
  
  // ملفات المستندات
  const documentExtensions = ["doc", "docx", "txt", "rtf", "odt"]
  if (documentExtensions.includes(extension)) {
    return "document"
  }
  
  // أنواع أخرى
  return "other"
}

/**
 * دالة للحصول على أيقونة مناسبة لنوع الملف
 * @param fileName اسم الملف مع الامتداد
 * @returns اسم الأيقونة من lucide-react
 */
export function getFileIcon(fileName: string): string {
  const fileType = getFileType(fileName)
  
  switch (fileType) {
    case "image":
      return "ImageIcon"
    case "pdf":
      return "FileText"
    case "document":
      return "FileText"
    default:
      return "File"
  }
}

/**
 * دالة للتحقق من صحة نوع الملف المرفوع
 * @param file الملف المرفوع
 * @returns true إذا كان الملف مدعوم، false إذا لم يكن كذلك
 */
export function isValidFileType(file: File): boolean {
  const allowedExtensions = [
    // صور
    "jpg", "jpeg", "png", "gif", "webp", "svg", "bmp",
    // مستندات
    "pdf", "doc", "docx", "txt", "rtf", "odt"
  ]
  
  const extension = file.name.split(".").pop()?.toLowerCase() || ""
  return allowedExtensions.includes(extension)
}

/**
 * دالة لتنسيق حجم الملف بوحدة مناسبة
 * @param bytes حجم الملف بالبايت
 * @returns النص المنسق للحجم
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * دالة للحصول على وصف نوع الملف باللغة العربية
 * @param fileName اسم الملف مع الامتداد
 * @returns وصف نوع الملف
 */
export function getFileTypeLabel(fileName: string): string {
  const fileType = getFileType(fileName)
  
  switch (fileType) {
    case "image":
      return "صورة"
    case "pdf":
      return "ملف PDF"
    case "document":
      return "مستند"
    default:
      return "ملف"
  }
}