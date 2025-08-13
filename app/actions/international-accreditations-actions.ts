"use server"

import { supabase } from "@/lib/supabase"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export interface InternationalAccreditation {
  id: number
  title: string
  description: string
  image_url: string
  created_at: string
  updated_at: string
}

export async function getAllInternationalAccreditations() {
  try {
    const { data, error } = await supabase
      .from("international_accreditations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching international accreditations:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error in getAllInternationalAccreditations:", error)
    return { success: false, error: "حدث خطأ في جلب البيانات", data: [] }
  }
}

export async function addInternationalAccreditation(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const imageFile = formData.get("image") as File

    if (!title || !description || !imageFile) {
      return { success: false, error: "جميع الحقول مطلوبة" }
    }

    // Upload image to Vercel Blob
    const blob = await put(`accreditations/${Date.now()}-${imageFile.name}`, imageFile, {
      access: "public",
      addRandomSuffix: true,
    })

    const { data, error } = await supabase
      .from("international_accreditations")
      .insert([
        {
          title,
          description,
          image_url: blob.url,
        },
      ])
      .select()

    if (error) {
      console.error("Error adding international accreditation:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/accreditations")
    revalidatePath("/dashboard/international-accreditations")

    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error in addInternationalAccreditation:", error)
    return { success: false, error: "حدث خطأ في إضافة الاعتماد" }
  }
}

export async function updateInternationalAccreditation(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const imageFile = formData.get("image") as File

    if (!title || !description) {
      return { success: false, error: "العنوان والوصف مطلوبان" }
    }

    const updateData: any = {
      title,
      description,
      updated_at: new Date().toISOString(),
    }

    // If new image is provided, upload it
    if (imageFile && imageFile.size > 0) {
      const blob = await put(`accreditations/${Date.now()}-${imageFile.name}`, imageFile, {
        access: "public",
        addRandomSuffix: true,
      })
      updateData.image_url = blob.url
    }

    const { data, error } = await supabase.from("international_accreditations").update(updateData).eq("id", id).select()

    if (error) {
      console.error("Error updating international accreditation:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/accreditations")
    revalidatePath("/dashboard/international-accreditations")

    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error in updateInternationalAccreditation:", error)
    return { success: false, error: "حدث خطأ في تحديث الاعتماد" }
  }
}

export async function deleteInternationalAccreditation(id: number) {
  try {
    const { error } = await supabase.from("international_accreditations").delete().eq("id", id)

    if (error) {
      console.error("Error deleting international accreditation:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/accreditations")
    revalidatePath("/dashboard/international-accreditations")

    return { success: true }
  } catch (error) {
    console.error("Error in deleteInternationalAccreditation:", error)
    return { success: false, error: "حدث خطأ في حذف الاعتماد" }
  }
}
