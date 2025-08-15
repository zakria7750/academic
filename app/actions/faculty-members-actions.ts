"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { FacultyMember } from "@/lib/supabase"

// Function to trigger revalidation for faculty page
export async function revalidateFacultyPage() {
  revalidatePath('/faculty')
}

export async function createFacultyMember(memberData: Omit<FacultyMember, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("faculty_members").insert([memberData])
    
    if (error) throw error
    
    revalidatePath('/faculty')
    
    return { success: true, message: "تم إضافة العضو بنجاح" }
  } catch (error) {
    console.error("Error creating faculty member:", error)
    return { success: false, message: "حدث خطأ في إضافة العضو" }
  }
}

export async function updateFacultyMember(id: string, memberData: Partial<Omit<FacultyMember, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("faculty_members").update(memberData).eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/faculty')
    
    return { success: true, message: "تم تحديث العضو بنجاح" }
  } catch (error) {
    console.error("Error updating faculty member:", error)
    return { success: false, message: "حدث خطأ في تحديث العضو" }
  }
}

export async function deleteFacultyMember(id: string) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("faculty_members").delete().eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/faculty')
    
    return { success: true, message: "تم حذف العضو بنجاح" }
  } catch (error) {
    console.error("Error deleting faculty member:", error)
    return { success: false, message: "حدث خطأ في حذف العضو" }
  }
}
