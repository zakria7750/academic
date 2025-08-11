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

    let certificateImageUrl = ""

    if (certificateImageFile && certificateImageFile.size > 0) {
      const blob = await put(
        `certificates/${certificateNumber}-${Date.now()}.${certificateImageFile.name.split(".").pop()}`,
        certificateImageFile,
        {
          access: "public",
        },
      )
      certificateImageUrl = blob.url
    }

    const { error } = await supabase.from("certificates").insert({
      certificate_number: certificateNumber,
      certificate_image: certificateImageUrl,
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
      const blob = await put(
        `certificates/${certificateNumber}-${Date.now()}.${certificateImageFile.name.split(".").pop()}`,
        certificateImageFile,
        {
          access: "public",
        },
      )
      updateData.certificate_image = blob.url
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
