"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { TrainingCourse } from "@/lib/supabase"

// Function to trigger revalidation for programs page
export async function revalidateProgramsPage() {
  console.log("Revalidating programs page...")
  revalidatePath('/programs')
  console.log("Programs page revalidated")
}

export async function createTrainingCourse(courseData: Omit<TrainingCourse, 'id' | 'created_at' | 'updated_at'>) {
  try {
    console.log("createTrainingCourse called with data:", courseData)
    const supabase = createClient()
    
    const { error } = await supabase.from("training_courses").insert([courseData])
    
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    
    console.log("Training course created successfully")
    revalidatePath('/programs')
    
    return { success: true, message: "تم إضافة الدورة التدريبية بنجاح" }
  } catch (error) {
    console.error("Error creating training course:", error)
    return { success: false, message: "حدث خطأ في إضافة الدورة التدريبية" }
  }
}

export async function updateTrainingCourse(id: string, courseData: Partial<Omit<TrainingCourse, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    console.log("updateTrainingCourse called with id:", id, "and data:", courseData)
    const supabase = createClient()
    
    const { error } = await supabase.from("training_courses").update(courseData).eq("id", id)
    
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    
    console.log("Training course updated successfully")
    revalidatePath('/programs')
    
    return { success: true, message: "تم تحديث الدورة التدريبية بنجاح" }
  } catch (error) {
    console.error("Error updating training course:", error)
    return { success: false, message: "حدث خطأ في تحديث الدورة التدريبية" }
  }
}

export async function deleteTrainingCourse(id: string) {
  try {
    console.log("deleteTrainingCourse called with id:", id)
    const supabase = createClient()
    
    // First, let's check if the course exists
    const { data: existingCourse, error: checkError } = await supabase
      .from("training_courses")
      .select("id")
      .eq("id", id)
      .single()
    
    if (checkError) {
      console.error("Course check error:", checkError)
      throw new Error("الدورة التدريبية غير موجودة")
    }
    
    if (!existingCourse) {
      throw new Error("الدورة التدريبية غير موجودة")
    }
    
    console.log("Course exists, proceeding with deletion...")
    
    const { error } = await supabase.from("training_courses").delete().eq("id", id)
    
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    
    console.log("Training course deleted successfully")
    revalidatePath('/programs')
    
    return { success: true, message: "تم حذف الدورة التدريبية بنجاح" }
  } catch (error) {
    console.error("Error deleting training course:", error)
    return { success: false, message: error instanceof Error ? error.message : "حدث خطأ في حذف الدورة التدريبية" }
  }
}

export async function getAllTrainingCourses(): Promise<TrainingCourse[]> {
  try {
    console.log("getAllTrainingCourses called")
    const supabase = createClient()
    
    // First, let's check if the table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from("training_courses")
      .select("id")
      .limit(1)
    
    if (tableError) {
      console.error("Table check error:", tableError)
      throw tableError
    }
    
    console.log("Table exists, fetching data...")
    
    const { data, error } = await supabase
      .from("training_courses")
      .select("*")
      .order("created_at", { ascending: true })
    
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    
    console.log("Training courses data:", data)
    return data || []
  } catch (error) {
    console.error("Error fetching training courses:", error)
    return []
  }
}