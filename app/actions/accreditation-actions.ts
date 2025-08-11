"use server"

import { supabase } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitAccreditationApplication(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const specialization = formData.get("specialization") as string

    // Insert into database
    const { data, error } = await supabase
      .from("accreditations")
      .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone,
          specialization: specialization,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) throw error

    // Send confirmation email to applicant
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "تأكيد استلام طلب الاعتماد - أكاديمية المعرفة الدولية",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #001f3f; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">أكاديمية المعرفة الدولية</h1>
            <p style="margin: 10px 0 0 0; color: #FFD700;">تأكيد استلام طلب الاعتماد</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #001f3f; margin-bottom: 20px;">عزيزي/عزيزتي ${fullName}</h2>
            
            <p style="color: #6c757d; line-height: 1.6; margin-bottom: 20px;">
              نشكركم على تقديم طلب الاعتماد كمدرب معتمد في أكاديمية المعرفة الدولية.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #001f3f; margin-bottom: 15px;">تفاصيل الطلب:</h3>
              <p style="margin: 5px 0;"><strong>الاسم:</strong> ${fullName}</p>
              <p style="margin: 5px 0;"><strong>البريد الإلكتروني:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>رقم الهاتف:</strong> ${phone}</p>
              <p style="margin: 5px 0;"><strong>التخصص:</strong> ${specialization}</p>
            </div>
            
            <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; border-right: 4px solid #FFD700; margin: 20px 0;">
              <p style="color: #001f3f; margin: 0; font-weight: bold;">
                📋 حالة الطلب: قيد المراجعة
              </p>
              <p style="color: #6c757d; margin: 10px 0 0 0;">
                سيتم مراجعة طلبكم من قبل فريقنا المختص، وغالباً ما سيتم الرد عليكم خلال مدة من 4 أيام إلى أسبوع.
              </p>
            </div>
            
            <p style="color: #6c757d; line-height: 1.6; margin: 20px 0;">
              في حالة وجود أي استفسارات، يرجى التواصل معنا عبر البريد الإلكتروني أو الهاتف.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://knowledge-academy.edu" style="background-color: #FFD700; color: #001f3f; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                زيارة الموقع الرسمي
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
            <p>© 2024 أكاديمية المعرفة الدولية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      `,
    })

    // Send notification email to admin
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["ali739303232@gmail.com"],
      subject: "طلب اعتماد جديد - أكاديمية المعرفة الدولية",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #001f3f; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">أكاديمية المعرفة الدولية</h1>
            <p style="margin: 10px 0 0 0; color: #FFD700;">طلب اعتماد جديد</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #001f3f; margin-bottom: 20px;">تم تقديم طلب اعتماد جديد</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #001f3f; margin-bottom: 15px;">تفاصيل المتقدم:</h3>
              <p style="margin: 5px 0;"><strong>الاسم:</strong> ${fullName}</p>
              <p style="margin: 5px 0;"><strong>البريد الإلكتروني:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>رقم الهاتف:</strong> ${phone}</p>
              <p style="margin: 5px 0;"><strong>التخصص:</strong> ${specialization}</p>
              <p style="margin: 5px 0;"><strong>تاريخ التقديم:</strong> ${new Date().toLocaleDateString("ar-SA")}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://knowledge-academy.edu/dashboard/accreditations" style="background-color: #FFD700; color: #001f3f; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                مراجعة الطلب
              </a>
            </div>
          </div>
        </div>
      `,
    })

    return { success: true, message: "تم تقديم طلبكم بنجاح! سيتم التواصل معكم قريباً." }
  } catch (error) {
    console.error("Error submitting accreditation application:", error)
    return { success: false, message: "حدث خطأ في تقديم الطلب. يرجى المحاولة مرة أخرى." }
  }
}

export async function updateAccreditationStatus(id: string, status: "approved" | "rejected", adminMessage: string) {
  try {
    // Get the accreditation details first
    const { data: accreditation, error: fetchError } = await supabase
      .from("accreditations")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError) throw fetchError

    // Update the status
    const { error: updateError } = await supabase
      .from("accreditations")
      .update({
        status,
        admin_message: adminMessage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (updateError) throw updateError

    // Send email to applicant
    const statusText = status === "approved" ? "قبول" : "رفض"
    const statusColor = status === "approved" ? "#28a745" : "#dc3545"
    const statusIcon = status === "approved" ? "✅" : "❌"

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [accreditation.email],
      subject: `${statusText} طلب الاعتماد - أكاديمية المعرفة الدولية`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #001f3f; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">أكاديمية المعرفة الدولية</h1>
            <p style="margin: 10px 0 0 0; color: #FFD700;">${statusText} طلب الاعتماد</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #001f3f; margin-bottom: 20px;">عزيزي/عزيزتي ${accreditation.full_name}</h2>
            
            <div style="background-color: ${status === "approved" ? "#d4edda" : "#f8d7da"}; padding: 20px; border-radius: 8px; border-right: 4px solid ${statusColor}; margin: 20px 0; text-align: center;">
              <h3 style="color: ${statusColor}; margin: 0; font-size: 20px;">
                ${statusIcon} تم ${statusText} طلب الاعتماد
              </h3>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #001f3f; margin-bottom: 15px;">رسالة من إدارة الأكاديمية:</h3>
              <p style="color: #6c757d; line-height: 1.6; margin: 0;">${adminMessage}</p>
            </div>
            
            ${
              status === "approved"
                ? `
              <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #001f3f; margin-bottom: 15px;">الخطوات التالية:</h3>
                <ul style="color: #6c757d; line-height: 1.6;">
                  <li>سيتم إضافتكم إلى قائمة المدربين المعتمدين في الموقع الرسمي</li>
                  <li>ستحصلون على شهادة الاعتماد الرسمية</li>
                  <li>سيتم التواصل معكم لتحديد التفاصيل النهائية</li>
                </ul>
              </div>
            `
                : ""
            }
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://knowledge-academy.edu/trainers" style="background-color: #FFD700; color: #001f3f; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                زيارة صفحة المدربين
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
            <p>© 2024 أكاديمية المعرفة الدولية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      `,
    })

    return { success: true, message: `تم ${statusText} الطلب وإرسال إشعار للمتقدم` }
  } catch (error) {
    console.error("Error updating accreditation status:", error)
    return { success: false, message: "حدث خطأ في تحديث حالة الطلب" }
  }
}
