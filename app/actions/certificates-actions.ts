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
    const issueDate = formData.get("issueDate") as string

    // التحقق من البيانات المطلوبة
    if (!certificateNumber || !certificateNumber.trim()) {
      return { success: false, message: "رقم الشهادة مطلوب" }
    }

    if (!certificateImageFile || certificateImageFile.size === 0) {
      return { success: false, message: "صورة الشهادة مطلوبة" }
    }

    // التحقق من نوع الملف
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(certificateImageFile.type)) {
      return { success: false, message: "نوع الملف غير مدعوم. يُسمح فقط بـ JPEG, PNG, WebP" }
    }

    // التحقق من حجم الملف (5MB حد أقصى)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (certificateImageFile.size > maxSize) {
      return { success: false, message: "حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت" }
    }

    let certificateImageUrl = ""

    try {
      // التحقق من وجود متغير البيئة لـ Vercel Blob
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.error("BLOB_READ_WRITE_TOKEN is not configured")
        return { success: false, message: "خدمة رفع الملفات غير مُعدة بشكل صحيح" }
      }

      const fileExtension = certificateImageFile.name.split(".").pop() || "jpg"
      const fileName = `certificates/${certificateNumber}-${Date.now()}.${fileExtension}`
      
      const blob = await put(fileName, certificateImageFile, {
        access: "public",
      })
      certificateImageUrl = blob.url
    } catch (uploadError) {
      console.error("Error uploading file to Vercel Blob:", uploadError)
      return { success: false, message: "فشل في رفع صورة الشهادة. تأكد من اتصال الإنترنت وحاول مرة أخرى" }
    }

    const { error } = await supabase.from("certificates").insert({
      certificate_number: certificateNumber,
      certificate_image: certificateImageUrl,
      issue_date: issueDate || new Date().toISOString().split("T")[0],
    })

    if (error) {
      console.error("Database error:", error)
      if (error.code === "23505") {
        return { success: false, message: "رقم الشهادة موجود مسبقاً" }
      }
      return { success: false, message: "فشل في حفظ بيانات الشهادة في قاعدة البيانات" }
    }

    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم إضافة الشهادة بنجاح" }
  } catch (error) {
    console.error("Error adding certificate:", error)
    return { success: false, message: "حدث خطأ غير متوقع أثناء إضافة الشهادة" }
  }
}

export async function updateCertificate(id: string, formData: FormData) {
  try {
    const supabase = createClient()

    const certificateNumber = formData.get("certificateNumber") as string
    const certificateImageFile = formData.get("certificateImage") as File
    const issueDate = formData.get("issueDate") as string

    // التحقق من البيانات المطلوبة
    if (!certificateNumber || !certificateNumber.trim()) {
      return { success: false, message: "رقم الشهادة مطلوب" }
    }

    const updateData: any = {
      certificate_number: certificateNumber,
      issue_date: issueDate,
    }

    // إذا تم اختيار صورة جديدة
    if (certificateImageFile && certificateImageFile.size > 0) {
      // التحقق من نوع الملف
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(certificateImageFile.type)) {
        return { success: false, message: "نوع الملف غير مدعوم. يُسمح فقط بـ JPEG, PNG, WebP" }
      }

      // التحقق من حجم الملف (5MB حد أقصى)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (certificateImageFile.size > maxSize) {
        return { success: false, message: "حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت" }
      }

      try {
        // التحقق من وجود متغير البيئة لـ Vercel Blob
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          console.error("BLOB_READ_WRITE_TOKEN is not configured")
          return { success: false, message: "خدمة رفع الملفات غير مُعدة بشكل صحيح" }
        }

        const fileExtension = certificateImageFile.name.split(".").pop() || "jpg"
        const fileName = `certificates/${certificateNumber}-${Date.now()}.${fileExtension}`
        
        const blob = await put(fileName, certificateImageFile, {
          access: "public",
        })
        updateData.certificate_image = blob.url
      } catch (uploadError) {
        console.error("Error uploading file to Vercel Blob:", uploadError)
        return { success: false, message: "فشل في رفع صورة الشهادة الجديدة. تأكد من اتصال الإنترنت وحاول مرة أخرى" }
      }
    }

    const { error } = await supabase.from("certificates").update(updateData).eq("id", id)

    if (error) {
      console.error("Database error:", error)
      if (error.code === "23505") {
        return { success: false, message: "رقم الشهادة موجود مسبقاً" }
      }
      return { success: false, message: "فشل في تحديث بيانات الشهادة في قاعدة البيانات" }
    }

    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم تحديث الشهادة بنجاح" }
  } catch (error) {
    console.error("Error updating certificate:", error)
    return { success: false, message: "حدث خطأ غير متوقع أثناء تحديث الشهادة" }
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
