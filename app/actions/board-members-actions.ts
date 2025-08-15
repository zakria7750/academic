"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { BoardMember } from "@/lib/supabase"

// Function to trigger revalidation for board page
export async function revalidateBoardPage() {
  revalidatePath('/board')
}

export async function createBoardMember(memberData: Omit<BoardMember, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("board_members").insert([memberData])
    
    if (error) throw error
    
    revalidatePath('/board')
    
    return { success: true, message: "تم إضافة العضو بنجاح" }
  } catch (error) {
    console.error("Error creating board member:", error)
    return { success: false, message: "حدث خطأ في إضافة العضو" }
  }
}

export async function updateBoardMember(id: string, memberData: Partial<Omit<BoardMember, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("board_members").update(memberData).eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/board')
    
    return { success: true, message: "تم تحديث العضو بنجاح" }
  } catch (error) {
    console.error("Error updating board member:", error)
    return { success: false, message: "حدث خطأ في تحديث العضو" }
  }
}

export async function deleteBoardMember(id: string) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("board_members").delete().eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/board')
    
    return { success: true, message: "تم حذف العضو بنجاح" }
  } catch (error) {
    console.error("Error deleting board member:", error)
    return { success: false, message: "حدث خطأ في حذف العضو" }
  }
}