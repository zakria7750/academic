"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { Program } from "@/lib/supabase"

// Function to trigger revalidation for programs page
export async function revalidateProgramsPage() {
  revalidatePath('/programs')
}

export async function createProgram(programData: Omit<Program, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("programs").insert([programData])
    
    if (error) throw error
    
    revalidatePath('/programs')
    
    return { success: true, message: "تم إضافة البرنامج بنجاح" }
  } catch (error) {
    console.error("Error creating program:", error)
    return { success: false, message: "حدث خطأ في إضافة البرنامج" }
  }
}

export async function updateProgram(id: string, programData: Partial<Omit<Program, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("programs").update(programData).eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/programs')
    
    return { success: true, message: "تم تحديث البرنامج بنجاح" }
  } catch (error) {
    console.error("Error updating program:", error)
    return { success: false, message: "حدث خطأ في تحديث البرنامج" }
  }
}

export async function deleteProgram(id: string) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("programs").delete().eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/programs')
    
    return { success: true, message: "تم حذف البرنامج بنجاح" }
  } catch (error) {
    console.error("Error deleting program:", error)
    return { success: false, message: "حدث خطأ في حذف البرنامج" }
  }
}