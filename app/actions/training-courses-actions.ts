"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { TrainingCourse } from "@/lib/supabase"

// Function to trigger revalidation for programs page
export async function revalidateProgramsPage() {
  revalidatePath('/programs')
}

export async function createTrainingCourse(courseData: Omit<TrainingCourse, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("training_courses").insert([courseData])
    
    if (error) throw error
    
    revalidatePath('/programs')
    
    return { success: true, message: "تم إضافة الدورة التدريبية بنجاح" }
  } catch (error) {
    console.error("Error creating training course:", error)
    return { success: false, message: "حدث خطأ في إضافة الدورة التدريبية" }
  }
}

export async function updateTrainingCourse(id: string, courseData: Partial<Omit<TrainingCourse, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("training_courses").update(courseData).eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/programs')
    
    return { success: true, message: "تم تحديث الدورة التدريبية بنجاح" }
  } catch (error) {
    console.error("Error updating training course:", error)
    return { success: false, message: "حدث خطأ في تحديث الدورة التدريبية" }
  }
}

export async function deleteTrainingCourse(id: string) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.from("training_courses").delete().eq("id", id)
    
    if (error) throw error
    
    revalidatePath('/programs')
    
    return { success: true, message: "تم حذف الدورة التدريبية بنجاح" }
  } catch (error) {
    console.error("Error deleting training course:", error)
    return { success: false, message: "حدث خطأ في حذف الدورة التدريبية" }
  }
}

export async function getAllTrainingCourses(): Promise<TrainingCourse[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("training_courses")
      .select("*")
      .order("created_at", { ascending: true })
    
    if (error) throw error
    
    return data || []
  } catch (error) {
    console.error("Error fetching training courses:", error)
    return []
  }
}