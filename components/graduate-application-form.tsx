"use client"

import { useState } from "react"
import { submitGraduateApplication } from "@/app/actions/graduates-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, Send, Loader2, User, Mail, Award, MapPin, Calendar, FileText, Crown, Sparkles } from "lucide-react"

export function GraduateApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string; open: boolean } | null>(null)

  // Add debugging for message state changes
  const setMessageWithLogging = (newMessage: { type: "success" | "error"; text: string; open: boolean } | null) => {
    console.log("[DEBUG] Setting message:", newMessage)
    setMessage(newMessage)
  }

  async function handleSubmit(formData: FormData) {
    console.log("[DEBUG] Form submission started")
    setIsSubmitting(true)
    setMessageWithLogging(null)

    try {
      console.log("[DEBUG] Calling submitGraduateApplication")
      const result = await submitGraduateApplication(formData)
      console.log("[DEBUG] Server response:", result)

      if (result.success) {
        console.log("[DEBUG] Success - setting success message")
        setMessageWithLogging({
          type: "success",
          text: "تم تقديم طلبكم بنجاح! سيتم التواصل معكم خلال 4-7 أيام.",
          open: true,
        })
        // Reset form
        const form = document.getElementById("graduate-form") as HTMLFormElement
        if (form) {
          console.log("[DEBUG] Resetting form")
          // Reset form fields manually to avoid potential validation issues
          const inputs = form.querySelectorAll('input, textarea, select')
          inputs.forEach((input) => {
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
              input.value = ''
            }
          })
        }
      } else {
        console.log("[DEBUG] Error - setting error message:", result.error)
        setMessageWithLogging({
          type: "error",
          text: result.error || "حدث خطأ أثناء تقديم الطلب",
          open: true,
        })
      }
    } catch (error) {
      console.error("[DEBUG] Exception caught:", error)
      setMessageWithLogging({
        type: "error",
        text: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
        open: true,
      })
    } finally {
      console.log("[DEBUG] Form submission completed")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
        {/* Premium Header */}
        <CardHeader className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-academy-blue/80 to-academy-blue-dark/90"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-24 h-24 bg-academy-gold/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-2 left-4 w-16 h-16 bg-academy-gold/15 rounded-full blur-xl"></div>
          </div>
          
          <div className="relative z-10 text-center py-8">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl mx-auto">
                <Crown className="text-academy-blue" size={32} />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                <Sparkles size={12} className="text-academy-blue" />
              </div>
            </div>
            
            <CardTitle className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              نموذج الانضمام لشبكة الخريجين
            </CardTitle>
            <p className="text-academy-gold-light text-lg font-medium max-w-2xl mx-auto">
              انضم إلى مجتمع النخبة من خريجي أكاديمية المعرفة الدولية
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8 lg:p-12">
          <form id="graduate-form" action={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-xl flex items-center justify-center">
                  <User className="text-academy-blue" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">المعلومات الشخصية</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-academy-blue font-semibold text-lg flex items-center gap-2">
                    <User size={16} />
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="h-12 text-lg rounded-2xl border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-academy-blue font-semibold text-lg flex items-center gap-2">
                    <Mail size={16} />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-12 text-lg rounded-2xl border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-xl flex items-center justify-center">
                  <Award className="text-academy-blue" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">المعلومات الأكاديمية</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="specialization" className="text-academy-blue font-semibold text-lg flex items-center gap-2">
                    <Award size={16} />
                    التخصص *
                  </Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    required
                    className="h-12 text-lg rounded-2xl border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                    placeholder="مثال: إدارة الأعمال"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="graduation_year" className="text-academy-blue font-semibold text-lg flex items-center gap-2">
                    <Calendar size={16} />
                    سنة التخرج *
                  </Label>
                  <Input
                    id="graduation_year"
                    name="graduation_year"
                    type="number"
                    min="2000"
                    max={new Date().getFullYear()}
                    required
                    className="h-12 text-lg rounded-2xl border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                    placeholder="2023"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-xl flex items-center justify-center">
                  <FileText className="text-academy-blue" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">المعلومات المهنية</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="current_position" className="text-academy-blue font-semibold text-lg flex items-center gap-2">
                    <FileText size={16} />
                    المنصب الحالي *
                  </Label>
                  <Input
                    id="current_position"
                    name="current_position"
                    required
                    className="h-12 text-lg rounded-2xl border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                    placeholder="مثال: مدير عام"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="country" className="text-academy-blue font-semibold text-lg flex items-center gap-2">
                    <MapPin size={16} />
                    البلد *
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    required
                    className="h-12 text-lg rounded-2xl border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                    placeholder="مثال: السعودية"
                  />
                </div>
              </div>
            </div>

            {/* Success Story Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-academy-gold" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">قصة النجاح</h3>
              </div>

              <div className="space-y-3">
                <Label htmlFor="success_story" className="text-academy-blue font-semibold text-lg flex items-center gap-2">
                  <Sparkles size={16} />
                  شارك قصة نجاحك *
                </Label>
                <Textarea
                  id="success_story"
                  name="success_story"
                  required
                  rows={6}
                  className="text-lg rounded-2xl border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 bg-white/80 backdrop-blur-sm resize-none transition-all duration-300 hover:shadow-md"
                  placeholder="شارك قصة نجاحك وكيف ساهمت الأكاديمية في تطوير مسيرتك المهنية... اذكر التحديات التي واجهتها، الإنجازات التي حققتها، والتأثير الإيجابي للتعليم في الأكاديمية على مستقبلك المهني."
                />
                <p className="text-academy-dark-gray text-sm">
                  شارك قصتك الملهمة في 200-500 كلمة لتكون مصدر إلهام للطلاب القادمين
                </p>
              </div>
            </div>

            {/* Premium Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-academy-blue to-academy-blue-dark hover:from-academy-blue-dark hover:to-slate-900 text-white font-bold py-4 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-0"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>جاري التقديم...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Send className="w-6 h-6" />
                    <span>تقديم الطلب</span>
                    <Crown className="w-5 h-5 text-academy-gold" />
                  </div>
                )}
              </Button>
              
              <p className="text-center text-academy-dark-gray text-sm mt-4">
                سيتم مراجعة طلبكم بعناية والتواصل معكم خلال 4-7 أيام عمل
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Premium Success/Error Dialog */}
      <Dialog
        open={message?.open || false}
        onOpenChange={(open) => {
          if (!open) {
            setMessageWithLogging(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-center mb-6">
              {message?.type === "success" ? (
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center shadow-xl">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={12} className="text-emerald-600" />
                  </div>
                </div>
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center shadow-xl">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
              )}
            </div>
            <DialogTitle
              className={`text-center text-2xl font-bold mb-4 ${message?.type === "success" ? "text-emerald-800" : "text-red-800"}`}
            >
              {message?.type === "success" ? "تم التقديم بنجاح!" : "فشل في التقديم"}
            </DialogTitle>
            <DialogDescription className="text-center text-academy-dark-gray text-lg leading-relaxed">
              {message?.text}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-8">
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setMessageWithLogging(null)
              }}
              className={`px-8 py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                message?.type === "success" 
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700" 
                  : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
              } text-white border-0`}
            >
              حسناً
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
