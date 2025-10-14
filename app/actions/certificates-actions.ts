"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

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

    // Process the certificate data for display
    const processedCertificate = {
      ...certificate,
      certificate_image_url: certificate.certificate_image && certificate.file_type 
        ? convertFileDataToDataURL(certificate.certificate_image, certificate.file_type)
        : null,
      is_image: certificate.file_type ? isImageFile(certificate.file_type) : false
    }

    return {
      success: true,
      message: "تم العثور على الشهادة بنجاح",
      certificate: processedCertificate,
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
    let fileType = null
    let fileName = null

    if (certificateImageFile && certificateImageFile.size > 0) {
      // Convert file to Uint8Array for database storage
      const arrayBuffer = await certificateImageFile.arrayBuffer()
      certificateImageData = new Uint8Array(arrayBuffer)
      fileType = certificateImageFile.type
      fileName = certificateImageFile.name
    }

    const { error } = await supabase.from("certificates").insert({
      certificate_number: certificateNumber,
      certificate_image: certificateImageData,
      file_type: fileType,
      file_name: fileName,
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
      // Convert file to Uint8Array for database storage
      const arrayBuffer = await certificateImageFile.arrayBuffer()
      updateData.certificate_image = new Uint8Array(arrayBuffer)
      updateData.file_type = certificateImageFile.type
      updateData.file_name = certificateImageFile.name
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

// Helper function to convert Uint8Array to base64 data URL
function convertFileDataToDataURL(fileData: Uint8Array, fileType: string): string {
  if (!fileData || !fileType) return ""
  
  // Convert Uint8Array to base64
  const base64 = btoa(String.fromCharCode(...fileData))
  return `data:${fileType};base64,${base64}`
}

// Helper function to check if file type is an image
function isImageFile(fileType: string): boolean {
  return fileType?.startsWith('image/') || false
}

export async function getCertificates() {
  try {
    const supabase = createClient()

    const { data: certificates, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    // Convert file data to data URLs for display
    const processedCertificates = certificates?.map(cert => ({
      ...cert,
      certificate_image_url: cert.certificate_image && cert.file_type 
        ? convertFileDataToDataURL(cert.certificate_image, cert.file_type)
        : null,
      is_image: cert.file_type ? isImageFile(cert.file_type) : false
    })) || []

    return { success: true, certificates: processedCertificates }
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return { success: false, certificates: [] }
  }
}

// New function to get file data for download
export async function downloadCertificateFile(certificateId: string) {
  try {
    const supabase = createClient()

    const { data: certificate, error } = await supabase
      .from("certificates")
      .select("certificate_image, file_type, file_name")
      .eq("id", certificateId)
      .single()

    if (error) throw error

    if (!certificate?.certificate_image) {
      return { success: false, message: "لا يوجد ملف مرفق بهذه الشهادة" }
    }

    const dataUrl = convertFileDataToDataURL(certificate.certificate_image, certificate.file_type)
    
    return {
      success: true,
      fileData: dataUrl,
      fileName: certificate.file_name || `certificate-${certificateId}`,
      fileType: certificate.file_type
    }
  } catch (error) {
    console.error("Error downloading certificate file:", error)
    return { success: false, message: "حدث خطأ أثناء تحميل الملف" }
  }
}
