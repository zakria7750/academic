"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { Trainer } from "@/lib/supabase"

// Function to trigger revalidation for trainers page
export async function revalidateTrainersPage() {
  revalidatePath('/trainers')
}

export async function createTrainer(trainerData: Omit<Trainer, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("trainers").insert([trainerData])
    
    if (error) throw error
    
    revalidatePath('/trainers')
    
    return { success: true, message: "تم إضافة المدرب بنجاح" }
  } catch (error) {
    console.error("Error creating trainer:", error)
    return { success: false, message: "حدث خطأ في إضافة المدرب" }
  }
}

export async function updateTrainer(id: string, trainerData: Partial<Omit<Trainer, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("trainers").update(trainerData).eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/trainers')
    
    return { success: true, message: "تم تحديث المدرب بنجاح" }
  } catch (error) {
    console.error("Error updating trainer:", error)
    return { success: false, message: "حدث خطأ في تحديث المدرب" }
  }
}

export async function deleteTrainer(id: string) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("trainers").delete().eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/trainers')
    
    return { success: true, message: "تم حذف المدرب بنجاح" }
  } catch (error) {
    console.error("Error deleting trainer:", error)
    return { success: false, message: "حدث خطأ في حذف المدرب" }
  }
}
