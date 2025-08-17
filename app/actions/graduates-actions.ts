"use server"

import { createClient } from "@/lib/supabase"
import { Resend } from "resend"
import { revalidatePath } from "next/cache"

const isEmailServiceAvailable = !!process.env.RESEND_API_KEY
const resend = isEmailServiceAvailable ? new Resend(process.env.RESEND_API_KEY) : null

export interface Graduate {
  id: number
  name: string
  specialization: string
  current_position: string
  success_story: string
  country: string
  graduation_year: number
  created_at: string
  updated_at: string
}

export interface GraduateApplication {
  id: number
  name: string
  email: string
  specialization: string
  current_position: string
  success_story: string
  country: string
  graduation_year: number
  status: "pending" | "approved" | "rejected"
  admin_message?: string
  created_at: string
  updated_at: string
}

// جلب جميع الخريجين
export async function getGraduates(): Promise<Graduate[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("graduates").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching graduates:", error)
    return []
  }

  return data || []
}

// تقديم طلب انضمام لشبكة الخريجين
export async function submitGraduateApplication(formData: FormData) {
  console.log("[v0] Starting graduate application submission")

  const supabase = createClient()

  const applicationData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    specialization: formData.get("specialization") as string,
    current_position: formData.get("current_position") as string,
    success_story: formData.get("success_story") as string,
    country: formData.get("country") as string,
    graduation_year: Number.parseInt(formData.get("graduation_year") as string),
    status: "pending" as const,
  }

  console.log("[v0] Application data prepared:", { name: applicationData.name, email: applicationData.email })

  let insertResult
  try {
    const { data, error } = await supabase.from("graduate_applications").insert([applicationData]).select().single()

    if (error) {
      console.error("[v0] Database error:", error)
      return { success: false, error: "حدث خطأ أثناء تقديم الطلب" }
    }

    insertResult = data
    console.log("[v0] Application saved successfully:", insertResult?.id)
  } catch (dbError) {
    console.error("[v0] Database exception:", dbError)
    return { success: false, error: "حدث خطأ أثناء تقديم الطلب" }
  }

  if (isEmailServiceAvailable && resend) {
    // إرسال إيميل تأكيد للمتقدم
    try {
      console.log("[v0] Sending confirmation email to:", applicationData.email)
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [applicationData.email],
        subject: "تأكيد تقديم طلب الانضمام لشبكة الخريجين",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af; text-align: center;">أكاديمية المعرفة الدولية</h2>
            <h3 style="color: #374151;">عزيزي/عزيزتي ${applicationData.name}</h3>
            <p>تم استلام طلبكم للانضمام إلى شبكة خريجي أكاديمية المعرفة الدولية بنجاح.</p>
            <p>سيتم مراجعة طلبكم من قبل فريقنا المختص، وغالباً ما سيتم الرد عليكم خلال مدة من 4 إلى 7 أيام.</p>
            <p>شكراً لكم على اهتمامكم بالانضمام إلى شبكة خريجينا المتميزين.</p>
            <hr style="margin: 20px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              أكاديمية المعرفة الدولية<br>
              البريد الإلكتروني: info@academy.com
            </p>
          </div>
        `,
      })
      console.log("[v0] Confirmation email sent successfully")
    } catch (emailError) {
      console.error("[v0] Error sending confirmation email:", emailError)
      // Don't fail the entire operation if email fails
    }

    // إرسال إيميل للمشرف
    try {
      console.log("[v0] Sending admin notification email")
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["ali739303232@gmail.com"],
        subject: "طلب انضمام جديد لشبكة الخريجين",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af; text-align: center;">طلب انضمام جديد</h2>
            <p>تم تقديم طلب انضمام جديد لشبكة الخريجين:</p>
            <ul>
              <li><strong>الاسم:</strong> ${applicationData.name}</li>
              <li><strong>البريد الإلكتروني:</strong> ${applicationData.email}</li>
              <li><strong>التخصص:</strong> ${applicationData.specialization}</li>
              <li><strong>المنصب الحالي:</strong> ${applicationData.current_position}</li>
              <li><strong>البلد:</strong> ${applicationData.country}</li>
              <li><strong>سنة التخرج:</strong> ${applicationData.graduation_year}</li>
            </ul>
            <p>يرجى مراجعة الطلب من لوحة التحكم.</p>
          </div>
        `,
      })
      console.log("[v0] Admin notification email sent successfully")
    } catch (emailError) {
      console.error("[v0] Error sending admin notification:", emailError)
      // Don't fail the entire operation if email fails
    }
  } else {
    console.log("[v0] Email service not available, skipping email notifications")
  }

  console.log("[v0] Application submission completed successfully")
  
  // إعادة التحقق من صفحات متعددة لضمان ظهور البيانات فوراً
  revalidatePath("/graduates")
  revalidatePath("/dashboard/graduates")
  revalidatePath("/dashboard")
  
  return { success: true, data: insertResult }
}

// جلب طلبات التقديم
export async function getGraduateApplications(): Promise<GraduateApplication[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("graduate_applications")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching applications:", error)
    return []
  }

  return data || []
}

// إضافة خريج جديد
export async function addGraduate(formData: FormData) {
  const supabase = createClient()

  const graduateData = {
    name: formData.get("name") as string,
    specialization: formData.get("specialization") as string,
    current_position: formData.get("current_position") as string,
    success_story: formData.get("success_story") as string,
    country: formData.get("country") as string,
    graduation_year: Number.parseInt(formData.get("graduation_year") as string),
  }

  const { error } = await supabase.from("graduates").insert([graduateData])

  if (error) {
    console.error("Error adding graduate:", error)
    return { success: false, error: "حدث خطأ أثناء إضافة الخريج" }
  }

  revalidatePath("/graduates")
  revalidatePath("/dashboard/graduates")
  return { success: true }
}

// تحديث خريج
export async function updateGraduate(id: number, formData: FormData) {
  const supabase = createClient()

  const graduateData = {
    name: formData.get("name") as string,
    specialization: formData.get("specialization") as string,
    current_position: formData.get("current_position") as string,
    success_story: formData.get("success_story") as string,
    country: formData.get("country") as string,
    graduation_year: Number.parseInt(formData.get("graduation_year") as string),
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("graduates").update(graduateData).eq("id", id)

  if (error) {
    console.error("Error updating graduate:", error)
    return { success: false, error: "حدث خطأ أثناء تحديث الخريج" }
  }

  revalidatePath("/graduates")
  revalidatePath("/dashboard/graduates")
  return { success: true }
}

// حذف خريج
export async function deleteGraduate(id: number) {
  const supabase = createClient()

  const { error } = await supabase.from("graduates").delete().eq("id", id)

  if (error) {
    console.error("Error deleting graduate:", error)
    return { success: false, error: "حدث خطأ أثناء حذف الخريج" }
  }

  revalidatePath("/graduates")
  revalidatePath("/dashboard/graduates")
  return { success: true }
}

// قبول أو رفض طلب التقديم
export async function processGraduateApplication(id: number, action: "approve" | "reject", adminMessage: string) {
  const supabase = createClient()

  // الحصول على بيانات الطلب
  const { data: application, error: fetchError } = await supabase
    .from("graduate_applications")
    .select("*")
    .eq("id", id)
    .single()

  if (fetchError || !application) {
    return { success: false, error: "لم يتم العثور على الطلب" }
  }

  // تحديث حالة الطلب
  const { error: updateError } = await supabase
    .from("graduate_applications")
    .update({
      status: action === "approve" ? "approved" : "rejected",
      admin_message: adminMessage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (updateError) {
    console.error("Error updating application:", updateError)
    return { success: false, error: "حدث خطأ أثناء تحديث الطلب" }
  }

  // إذا تم القبول، إضافة الخريج إلى قائمة الخريجين
  if (action === "approve") {
    const { error: insertError } = await supabase.from("graduates").insert([
      {
        name: application.name,
        specialization: application.specialization,
        current_position: application.current_position,
        success_story: application.success_story,
        country: application.country,
        graduation_year: application.graduation_year,
      },
    ])

    if (insertError) {
      console.error("Error adding graduate:", insertError)
    }
  }

  if (isEmailServiceAvailable && resend) {
    try {
      const isApproved = action === "approve"
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [application.email],
        subject: isApproved ? "تم قبول طلبكم للانضمام لشبكة الخريجين" : "تحديث حول طلب الانضمام لشبكة الخريجين",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af; text-align: center;">أكاديمية المعرفة الدولية</h2>
            <h3 style="color: ${isApproved ? "#059669" : "#dc2626"};">
              ${isApproved ? "مبروك! تم قبول طلبكم" : "تحديث حول طلبكم"}
            </h3>
            <p>عزيزي/عزيزتي ${application.name}</p>
            <p>
              ${
                isApproved
                  ? "نحن سعداء لإعلامكم بأنه تم قبول طلبكم للانضمام إلى شبكة خريجي أكاديمية المعرفة الدولية."
                  : "نشكركم على اهتمامكم بالانضمام إلى شبكة خريجي أكاديمية المعرفة الدولية."
              }
            </p>
            ${adminMessage ? `<p><strong>رسالة من الإدارة:</strong> ${adminMessage}</p>` : ""}
            <p>شكراً لكم على تواصلكم معنا.</p>
            <hr style="margin: 20px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              أكاديمية المعرفة الدولية<br>
              البريد الإلكتروني: info@academy.com
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Error sending response email:", emailError)
      // Don't fail the operation if email fails
    }
  }

  revalidatePath("/graduates")
  revalidatePath("/dashboard/graduates")
  return { success: true }
}
