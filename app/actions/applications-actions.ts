"use server"

import { supabase } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface Application {
  id: number
  full_name: string
  email: string
  phone: string
  country: string
  current_qualification: string
  desired_program: string
  desired_specialization: string
  status: "pending" | "accepted" | "rejected"
  created_at: string
  updated_at: string
}

export interface Student {
  id: number
  application_id?: number
  full_name: string
  email: string
  phone: string
  country: string
  current_qualification: string
  program: string
  specialization: string
  enrollment_date: string
  created_at: string
}

export async function submitApplication(formData: FormData) {
  try {
    const applicationData = {
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      current_qualification: formData.get("currentQualification") as string,
      desired_program: formData.get("desiredProgram") as string,
      desired_specialization: formData.get("desiredSpecialization") as string,
    }

    // Insert application into database
    const { data, error } = await supabase.from("applications").insert([applicationData]).select().single()

    if (error) {
      console.error("Database error:", error)
      return { success: false, message: "حدث خطأ في حفظ البيانات" }
    }

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: applicationData.email,
        subject: "تأكيد استلام طلب التسجيل - أكاديمية المعرفة الدولية",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #001f3f 0%, #FFD700 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">أكاديمية المعرفة الدولية</h1>
              <p style="color: #FFD700; margin: 10px 0 0 0; font-size: 16px;">تأكيد استلام طلب التسجيل</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #001f3f; margin-bottom: 20px;">عزيزي/عزيزتي ${applicationData.full_name}</h2>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                نشكرك على اهتمامك بالانضمام إلى أكاديمية المعرفة الدولية. لقد تم استلام طلب التسجيل الخاص بك بنجاح.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #001f3f; margin-bottom: 15px;">تفاصيل طلبك:</h3>
                <p style="margin: 5px 0;"><strong>البرنامج المرغوب:</strong> ${applicationData.desired_program}</p>
                <p style="margin: 5px 0;"><strong>التخصص:</strong> ${applicationData.desired_specialization}</p>
                <p style="margin: 5px 0;"><strong>البلد:</strong> ${applicationData.country}</p>
              </div>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                سيتم مراجعة طلبك من قبل لجنة القبول، وسنقوم بالرد عليك في غضون <strong>4 إلى 7 أيام عمل</strong>.
              </p>
              
              <div style="background: #e8f5e8; border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #2e7d32; margin: 0; font-weight: bold;">
                  ✅ تم استلام طلبك بنجاح وهو قيد المراجعة
                </p>
              </div>
              
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                مع أطيب التحيات،<br>
                فريق أكاديمية المعرفة الدولية
              </p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
    }

    // Send notification email to supervisor
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "ali739303232@gmail.com",
        subject: "طلب تسجيل جديد - أكاديمية المعرفة الدولية",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #001f3f;">طلب تسجيل جديد</h2>
            <p>تم تقديم طلب تسجيل جديد من:</p>
            <ul>
              <li><strong>الاسم:</strong> ${applicationData.full_name}</li>
              <li><strong>البريد الإلكتروني:</strong> ${applicationData.email}</li>
              <li><strong>الهاتف:</strong> ${applicationData.phone}</li>
              <li><strong>البلد:</strong> ${applicationData.country}</li>
              <li><strong>البرنامج المرغوب:</strong> ${applicationData.desired_program}</li>
              <li><strong>التخصص:</strong> ${applicationData.desired_specialization}</li>
            </ul>
            <p>يرجى مراجعة الطلب في لوحة التحكم.</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Supervisor email error:", emailError)
    }

    return { success: true, message: "تم تقديم طلبك بنجاح! سنتواصل معك قريباً." }
  } catch (error) {
    console.error("Submit application error:", error)
    return { success: false, message: "حدث خطأ غير متوقع" }
  }
}

export async function getApplications() {
  try {
    const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Get applications error:", error)
      return { success: false, data: [] }
    }

    return { success: true, data: data as Application[] }
  } catch (error) {
    console.error("Get applications error:", error)
    return { success: false, data: [] }
  }
}

export async function getStudents() {
  try {
    const { data, error } = await supabase.from("students").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Get students error:", error)
      return { success: false, data: [] }
    }

    return { success: true, data: data as Student[] }
  } catch (error) {
    console.error("Get students error:", error)
    return { success: false, data: [] }
  }
}

export async function updateApplicationStatus(
  applicationId: number,
  status: "accepted" | "rejected",
  message?: string,
) {
  try {
    // Get application details first
    const { data: application, error: fetchError } = await supabase
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .single()

    if (fetchError || !application) {
      return { success: false, message: "لم يتم العثور على الطلب" }
    }

    // Update application status
    const { error: updateError } = await supabase
      .from("applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", applicationId)

    if (updateError) {
      console.error("Update status error:", updateError)
      return { success: false, message: "حدث خطأ في تحديث الحالة" }
    }

    // If accepted, add to students table
    if (status === "accepted") {
      const { error: studentError } = await supabase.from("students").insert([
        {
          application_id: applicationId,
          full_name: application.full_name,
          email: application.email,
          phone: application.phone,
          country: application.country,
          current_qualification: application.current_qualification,
          program: application.desired_program,
          specialization: application.desired_specialization,
        },
      ])

      if (studentError) {
        console.error("Add student error:", studentError)
      }
    }

    // Send status email to applicant
    try {
      const statusText = status === "accepted" ? "قبول" : "رفض"
      const statusColor = status === "accepted" ? "#4caf50" : "#f44336"
      const statusIcon = status === "accepted" ? "✅" : "❌"

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: application.email,
        subject: `${statusText} طلب التسجيل - أكاديمية المعرفة الدولية`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #001f3f 0%, #FFD700 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">أكاديمية المعرفة الدولية</h1>
              <p style="color: #FFD700; margin: 10px 0 0 0; font-size: 16px;">${statusText} طلب التسجيل</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #001f3f; margin-bottom: 20px;">عزيزي/عزيزتي ${application.full_name}</h2>
              
              <div style="background: ${status === "accepted" ? "#e8f5e8" : "#ffebee"}; border: 1px solid ${statusColor}; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <h3 style="color: ${statusColor}; margin: 0; font-size: 24px;">
                  ${statusIcon} تم ${statusText} طلب التسجيل الخاص بك
                </h3>
              </div>
              
              ${
                message
                  ? `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="color: #001f3f; margin-bottom: 10px;">رسالة من الإدارة:</h4>
                  <p style="color: #333; line-height: 1.6; margin: 0;">${message}</p>
                </div>
              `
                  : ""
              }
              
              ${
                status === "accepted"
                  ? `
                <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                  مبروك! لقد تم قبولك في برنامج <strong>${application.desired_program}</strong> في تخصص <strong>${application.desired_specialization}</strong>.
                  سنتواصل معك قريباً لإكمال إجراءات التسجيل.
                </p>
              `
                  : `
                <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                  نأسف لعدم قبول طلبك في هذا الوقت. نشجعك على التقديم مرة أخرى في المستقبل.
                </p>
              `
              }
              
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                مع أطيب التحيات،<br>
                فريق أكاديمية المعرفة الدولية
              </p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Status email error:", emailError)
    }

    return { success: true, message: `تم ${status === "accepted" ? "قبول" : "رفض"} الطلب بنجاح` }
  } catch (error) {
    console.error("Update application status error:", error)
    return { success: false, message: "حدث خطأ غير متوقع" }
  }
}

export async function addStudent(formData: FormData) {
  try {
    const studentData = {
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      current_qualification: formData.get("currentQualification") as string,
      program: formData.get("program") as string,
      specialization: formData.get("specialization") as string,
    }

    const { data, error } = await supabase.from("students").insert([studentData]).select().single()

    if (error) {
      console.error("Add student error:", error)
      return { success: false, message: "حدث خطأ في إضافة الطالب" }
    }

    return { success: true, message: "تم إضافة الطالب بنجاح" }
  } catch (error) {
    console.error("Add student error:", error)
    return { success: false, message: "حدث خطأ غير متوقع" }
  }
}
