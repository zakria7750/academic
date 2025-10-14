"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { put } from "@vercel/blob"

export async function verifyCertificate(certificateNumber: string) {
  try {
    const supabase = createClient()

    const { data: certificate, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_number", certificateNumber)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return { success: false, message: "الشهادة غير موجودة" }
      }
      throw error
    }

    return {
      success: true,
      message: "تم العثور على الشهادة بنجاح",
      certificate,
    }
  } catch (error) {
    console.error("Error verifying certificate:", error)
    return { success: false, message: "حدث خطأ أثناء التحقق من الشهادة" }
  }
}

export async function addCertificate(formData: FormData) {
  try {
    const supabase = createClient()

    const certificateNumber = formData.get("certificateNumber") as string
    const certificateImageFile = formData.get("certificateImage") as File
    const certificateFile = formData.get("certificateFile") as File
    const issueDate = formData.get("issueDate") as string

    let certificateImageUrl = ""
    let certificateFileUrl = ""
    let contentType: 'image' | 'file' = 'image'
    let fileName = ""
    let fileSize = 0

    // التحقق من وجود ملف أو صورة
    if (certificateFile && certificateFile.size > 0) {
      // التحقق من نوع الملف المسموح (PDF, DOCX)
      const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedFileTypes.includes(certificateFile.type)) {
        return { success: false, message: "نوع الملف غير مدعوم. يُسمح فقط بملفات PDF و DOCX" }
      }

      const fileExtension = certificateFile.name.split(".").pop()
      const blob = await put(
        `certificates/files/${certificateNumber}-${Date.now()}.${fileExtension}`,
        certificateFile,
        {
          access: "public",
        },
      )
      certificateFileUrl = blob.url
      contentType = 'file'
      fileName = certificateFile.name
      fileSize = certificateFile.size
    } else if (certificateImageFile && certificateImageFile.size > 0) {
      // التحقق من نوع الصورة المسموح
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedImageTypes.includes(certificateImageFile.type)) {
        return { success: false, message: "نوع الصورة غير مدعوم. يُسمح فقط بصور JPEG, PNG, WebP" }
      }

      const blob = await put(
        `certificates/images/${certificateNumber}-${Date.now()}.${certificateImageFile.name.split(".").pop()}`,
        certificateImageFile,
        {
          access: "public",
        },
      )
      certificateImageUrl = blob.url
      contentType = 'image'
      fileName = certificateImageFile.name
      fileSize = certificateImageFile.size
    } else {
      return { success: false, message: "يجب رفع صورة أو ملف للشهادة" }
    }

    const { error } = await supabase.from("certificates").insert({
      certificate_number: certificateNumber,
      certificate_image: certificateImageUrl || null,
      certificate_file: certificateFileUrl || null,
      content_type: contentType,
      file_name: fileName,
      file_size: fileSize,
      issue_date: issueDate || new Date().toISOString().split("T")[0],
    })

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "رقم الشهادة موجود مسبقاً" }
      }
      throw error
    }

    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم إضافة الشهادة بنجاح" }
  } catch (error) {
    console.error("Error adding certificate:", error)
    return { success: false, message: "حدث خطأ أثناء إضافة الشهادة" }
  }
}

export async function updateCertificate(id: string, formData: FormData) {
  try {
    const supabase = createClient()

    const certificateNumber = formData.get("certificateNumber") as string
    const certificateImageFile = formData.get("certificateImage") as File
    const certificateFile = formData.get("certificateFile") as File
    const issueDate = formData.get("issueDate") as string

    const updateData: any = {
      certificate_number: certificateNumber,
      issue_date: issueDate,
    }

    // التحقق من وجود ملف جديد أو صورة جديدة
    if (certificateFile && certificateFile.size > 0) {
      // التحقق من نوع الملف المسموح (PDF, DOCX)
      const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedFileTypes.includes(certificateFile.type)) {
        return { success: false, message: "نوع الملف غير مدعوم. يُسمح فقط بملفات PDF و DOCX" }
      }

      const fileExtension = certificateFile.name.split(".").pop()
      const blob = await put(
        `certificates/files/${certificateNumber}-${Date.now()}.${fileExtension}`,
        certificateFile,
        {
          access: "public",
        },
      )
      updateData.certificate_file = blob.url
      updateData.certificate_image = null
      updateData.content_type = 'file'
      updateData.file_name = certificateFile.name
      updateData.file_size = certificateFile.size
    } else if (certificateImageFile && certificateImageFile.size > 0) {
      // التحقق من نوع الصورة المسموح
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedImageTypes.includes(certificateImageFile.type)) {
        return { success: false, message: "نوع الصورة غير مدعوم. يُسمح فقط بصور JPEG, PNG, WebP" }
      }

      const blob = await put(
        `certificates/images/${certificateNumber}-${Date.now()}.${certificateImageFile.name.split(".").pop()}`,
        certificateImageFile,
        {
          access: "public",
        },
      )
      updateData.certificate_image = blob.url
      updateData.certificate_file = null
      updateData.content_type = 'image'
      updateData.file_name = certificateImageFile.name
      updateData.file_size = certificateImageFile.size
    }

    const { error } = await supabase.from("certificates").update(updateData).eq("id", id)

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "رقم الشهادة موجود مسبقاً" }
      }
      throw error
    }

    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم تحديث الشهادة بنجاح" }
  } catch (error) {
    console.error("Error updating certificate:", error)
    return { success: false, message: "حدث خطأ أثناء تحديث الشهادة" }
  }
}

export async function deleteCertificate(id: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("certificates").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم حذف الشهادة بنجاح" }
  } catch (error) {
    console.error("Error deleting certificate:", error)
    return { success: false, message: "حدث خطأ أثناء حذف الشهادة" }
  }
}

export async function getCertificates() {
  try {
    const supabase = createClient()

    const { data: certificates, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return { success: true, certificates }
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return { success: false, certificates: [] }
  }
}

export async function downloadCertificateFile(fileUrl: string, fileName: string) {
  try {
    // إنشاء رابط تحميل مؤقت
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    return { success: true, message: "تم بدء التحميل" }
  } catch (error) {
    console.error("Error downloading file:", error)
    return { success: false, message: "حدث خطأ أثناء تحميل الملف" }
  }
}
