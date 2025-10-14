"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { fileToBytes, bytesToBase64, detectFileType } from "@/lib/file-utils"

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

    let certificateImageData = null

    if (certificateImageFile && certificateImageFile.size > 0) {
      // Convert file to bytes
      const fileBytes = await fileToBytes(certificateImageFile)
      
      // Detect file type
      const detectedMimeType = detectFileType(fileBytes)
      
      // Store file data with metadata
      const fileData = {
        data: bytesToBase64(fileBytes),
        mimeType: detectedMimeType,
        originalName: certificateImageFile.name,
        size: certificateImageFile.size
      }
      
      certificateImageData = JSON.stringify(fileData)
    }

    const { error } = await supabase.from("certificates").insert({
      certificate_number: certificateNumber,
      certificate_image: certificateImageData,
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
    const issueDate = formData.get("issueDate") as string

    const updateData: any = {
      certificate_number: certificateNumber,
      issue_date: issueDate,
    }

    if (certificateImageFile && certificateImageFile.size > 0) {
      // Convert file to bytes
      const fileBytes = await fileToBytes(certificateImageFile)
      
      // Detect file type
      const detectedMimeType = detectFileType(fileBytes)
      
      // Store file data with metadata
      const fileData = {
        data: bytesToBase64(fileBytes),
        mimeType: detectedMimeType,
        originalName: certificateImageFile.name,
        size: certificateImageFile.size
      }
      
      updateData.certificate_image = JSON.stringify(fileData)
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

export async function downloadCertificateFile(certificateId: string) {
  try {
    const supabase = createClient()

    const { data: certificate, error } = await supabase
      .from("certificates")
      .select("certificate_image, certificate_number")
      .eq("id", certificateId)
      .single()

    if (error) {
      throw error
    }

    if (!certificate?.certificate_image) {
      return { success: false, message: "لا يوجد ملف مرفق بهذه الشهادة" }
    }

    // Parse the stored file data
    const fileData = JSON.parse(certificate.certificate_image)
    
    return {
      success: true,
      fileData: {
        data: fileData.data,
        mimeType: fileData.mimeType,
        originalName: fileData.originalName || `certificate-${certificate.certificate_number}`,
        size: fileData.size
      }
    }
  } catch (error) {
    console.error("Error downloading certificate file:", error)
    return { success: false, message: "حدث خطأ أثناء تحميل الملف" }
  }
}
