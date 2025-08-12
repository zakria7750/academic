"use server"

import { supabase } from "@/lib/supabase"
import { put } from "@vercel/blob"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// اشتراك في النشرة الإخبارية
export async function subscribeToNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string

    if (!email) {
      return { success: false, message: "البريد الإلكتروني مطلوب" }
    }

    // التحقق من وجود الإيميل مسبقاً
    const { data: existingSubscription } = await supabase
      .from("newsletter_subscriptions")
      .select("id")
      .eq("email", email)
      .single()

    if (existingSubscription) {
      return { success: false, message: "هذا البريد الإلكتروني مشترك مسبقاً" }
    }

    // إضافة الاشتراك الجديد
    const { error } = await supabase.from("newsletter_subscriptions").insert({ email })

    if (error) {
      console.error("Error subscribing to newsletter:", error)
      return { success: false, message: "حدث خطأ أثناء الاشتراك" }
    }

    // إرسال رسالة ترحيب
    await resend.emails.send({
      from: "أكاديمية المعرفة الدولية <noreply@knowledge-academy.edu>",
      to: email,
      subject: "مرحباً بك في نشرتنا الإخبارية",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #001f3f 0%, #FFD700 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">أكاديمية المعرفة الدولية</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">مرحباً بك في نشرتنا الإخبارية</p>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #001f3f; margin-bottom: 20px;">شكراً لك على الاشتراك!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              نحن سعداء لانضمامك إلى مجتمع أكاديمية المعرفة الدولية. ستصلك أحدث الأخبار والتحديثات حول:
            </p>
            <ul style="color: #666; line-height: 1.8;">
              <li>البرامج التعليمية الجديدة</li>
              <li>الفعاليات والمؤتمرات</li>
              <li>قصص نجاح الطلاب</li>
              <li>التحديثات الأكاديمية</li>
            </ul>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}" 
                 style="background: #FFD700; color: #001f3f; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                زيارة الموقع
              </a>
            </div>
          </div>
        </div>
      `,
    })

    return { success: true, message: "تم الاشتراك بنجاح! ستصلك رسالة ترحيب قريباً" }
  } catch (error) {
    console.error("Error in subscribeToNewsletter:", error)
    return { success: false, message: "حدث خطأ غير متوقع" }
  }
}

// جلب جميع المشتركين
export async function getNewsletterSubscriptions() {
  try {
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .select("*")
      .eq("is_active", true)
      .order("subscribed_at", { ascending: false })

    if (error) {
      console.error("Error fetching subscriptions:", error)
      return { success: false, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error in getNewsletterSubscriptions:", error)
    return { success: false, data: [] }
  }
}

// حذف مشترك
export async function deleteSubscription(id: number) {
  try {
    const { error } = await supabase.from("newsletter_subscriptions").update({ is_active: false }).eq("id", id)

    if (error) {
      console.error("Error deleting subscription:", error)
      return { success: false, message: "حدث خطأ أثناء الحذف" }
    }

    return { success: true, message: "تم حذف المشترك بنجاح" }
  } catch (error) {
    console.error("Error in deleteSubscription:", error)
    return { success: false, message: "حدث خطأ غير متوقع" }
  }
}

// إضافة خبر جديد
export async function addNews(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const publishDate = formData.get("publishDate") as string
    const imageFile = formData.get("image") as File

    if (!title || !description || !publishDate || !imageFile) {
      return { success: false, message: "جميع الحقول مطلوبة" }
    }

    // رفع الصورة
    const imageBlob = await put(`news/${Date.now()}-${imageFile.name}`, imageFile, {
      access: "public",
    })

    // إضافة الخبر إلى قاعدة البيانات
    const { data: newsData, error } = await supabase
      .from("news")
      .insert({
        title,
        description,
        image_url: imageBlob.url,
        publish_date: publishDate,
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding news:", error)
      return { success: false, message: "حدث خطأ أثناء إضافة الخبر" }
    }

    // جلب المشتركين وإرسال الخبر إليهم
    const { data: subscribers } = await supabase.from("newsletter_subscriptions").select("email").eq("is_active", true)

    if (subscribers && subscribers.length > 0) {
      const emails = subscribers.map((sub) => sub.email)

      await resend.emails.send({
        from: "أكاديمية المعرفة الدولية <noreply@knowledge-academy.edu>",
        to: emails,
        subject: `خبر جديد: ${title}`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #001f3f 0%, #FFD700 100%); padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">أكاديمية المعرفة الدولية</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">خبر جديد</p>
            </div>
            <div style="padding: 30px; background: #f8f9fa;">
              <img src="${imageBlob.url}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #001f3f; margin-bottom: 15px;">${title}</h2>
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">${description}</p>
              <p style="color: #999; font-size: 14px;">تاريخ النشر: ${publishDate}</p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/blog" 
                   style="background: #FFD700; color: #001f3f; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  قراءة المزيد
                </a>
              </div>
            </div>
          </div>
        `,
      })
    }

    return { success: true, message: "تم إضافة الخبر وإرساله للمشتركين بنجاح" }
  } catch (error) {
    console.error("Error in addNews:", error)
    return { success: false, message: "حدث خطأ غير متوقع" }
  }
}

// جلب جميع الأخبار
export async function getAllNews() {
  try {
    const { data, error } = await supabase.from("news").select("*").order("publish_date", { ascending: false })

    if (error) {
      console.error("Error fetching news:", error)
      return { success: false, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error in getAllNews:", error)
    return { success: false, data: [] }
  }
}

// حذف خبر
export async function deleteNews(id: number) {
  try {
    const { error } = await supabase.from("news").delete().eq("id", id)

    if (error) {
      console.error("Error deleting news:", error)
      return { success: false, message: "حدث خطأ أثناء الحذف" }
    }

    return { success: true, message: "تم حذف الخبر بنجاح" }
  } catch (error) {
    console.error("Error in deleteNews:", error)
    return { success: false, message: "حدث خطأ غير متوقع" }
  }
}
