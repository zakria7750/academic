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

/**
 * دالة لإضافة شهادة جديدة مع رفع الملف إلى Vercel Blob Storage
 * تدعم رفع أنواع مختلفة من الملفات (صور، PDF، DOCX، إلخ)
 */
export async function addCertificate(formData: FormData) {
  try {
    const supabase = createClient()

    // استخراج البيانات من FormData
    const certificateNumber = formData.get("certificateNumber") as string
    const certificateImageFile = formData.get("certificateImage") as File
    const issueDate = formData.get("issueDate") as string

    let certificateImageUrl = ""

    // رفع الملف إلى Vercel Blob Storage إذا تم تحديد ملف
    if (certificateImageFile && certificateImageFile.size > 0) {
      // الحصول على امتداد الملف
      const fileExtension = certificateImageFile.name.split(".").pop()?.toLowerCase() || "unknown"
      
      // إنشاء اسم فريد للملف
      const fileName = `certificates/${certificateNumber}-${Date.now()}.${fileExtension}`
      
      // رفع الملف إلى Vercel Blob مع إعداد الوصول العام
      const blob = await put(
        fileName,
        certificateImageFile,
        {
          access: "public", // جعل الملف متاح للعامة
        },
      )
      
      // حفظ رابط الملف
      certificateImageUrl = blob.url
    }

    // إدراج البيانات في قاعدة البيانات (يتم حفظ الرابط فقط وليس محتوى الملف)
    const { error } = await supabase.from("certificates").insert({
      certificate_number: certificateNumber,
      certificate_image: certificateImageUrl, // حفظ رابط الملف في العمود certificate_image
      issue_date: issueDate || new Date().toISOString().split("T")[0],
    })

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "رقم الشهادة موجود مسبقاً" }
      }
      throw error
    }

    // إعادة تحديث الصفحة لعرض البيانات الجديدة
    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم إضافة الشهادة بنجاح" }
  } catch (error) {
    console.error("Error adding certificate:", error)
    return { success: false, message: "حدث خطأ أثناء إضافة الشهادة" }
  }
}

/**
 * دالة لتحديث شهادة موجودة مع إمكانية رفع ملف جديد
 * تدعم رفع أنواع مختلفة من الملفات (صور، PDF، DOCX، إلخ)
 */
export async function updateCertificate(id: string, formData: FormData) {
  try {
    const supabase = createClient()

    // استخراج البيانات من FormData
    const certificateNumber = formData.get("certificateNumber") as string
    const certificateImageFile = formData.get("certificateImage") as File
    const issueDate = formData.get("issueDate") as string

    // إعداد البيانات الأساسية للتحديث
    const updateData: any = {
      certificate_number: certificateNumber,
      issue_date: issueDate,
    }

    // رفع ملف جديد إذا تم تحديده
    if (certificateImageFile && certificateImageFile.size > 0) {
      // الحصول على امتداد الملف
      const fileExtension = certificateImageFile.name.split(".").pop()?.toLowerCase() || "unknown"
      
      // إنشاء اسم فريد للملف
      const fileName = `certificates/${certificateNumber}-${Date.now()}.${fileExtension}`
      
      // رفع الملف الجديد إلى Vercel Blob مع إعداد الوصول العام
      const blob = await put(
        fileName,
        certificateImageFile,
        {
          access: "public", // جعل الملف متاح للعامة
        },
      )
      
      // تحديث رابط الملف في البيانات
      updateData.certificate_image = blob.url
    }

    // تحديث البيانات في قاعدة البيانات
    const { error } = await supabase.from("certificates").update(updateData).eq("id", id)

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "رقم الشهادة موجود مسبقاً" }
      }
      throw error
    }

    // إعادة تحديث الصفحة لعرض البيانات المحدثة
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
