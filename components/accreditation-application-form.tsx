"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Send, CheckCircle, AlertCircle, Phone, Mail, User, Award } from "lucide-react"
import { submitAccreditationApplication } from "@/app/actions/accreditation-actions"

export default function AccreditationApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialization: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const form = new FormData()
    form.append("fullName", formData.fullName)
    form.append("email", formData.email)
    form.append("phone", formData.phone)
    form.append("specialization", formData.specialization)

    try {
      const result = await submitAccreditationApplication(form)

      if (result.success) {
        setMessage({ type: "success", text: result.message })
        setFormData({ fullName: "", email: "", phone: "", specialization: "" })
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-academy-blue via-academy-blue to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-academy-gold rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-academy-gold rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-academy-gold rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border-2 border-academy-gold rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                <FileText className="text-academy-blue" size={32} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">تقدم للحصول على الاعتماد</h2>
            </div>
            <p className="text-xl text-academy-gold max-w-3xl mx-auto leading-relaxed">
              انضم إلى نخبة المدربين المعتمدين في أكاديمية المعرفة الدولية وشارك خبراتك مع آلاف المتدربين حول العالم
            </p>
          </div>

          {/* Application Form */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-academy-gold to-yellow-400 p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="text-academy-blue" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-academy-blue mb-2">نموذج طلب الاعتماد</h3>
                <p className="text-academy-blue/80">املأ البيانات التالية للتقدم للحصول على اعتماد الأكاديمية</p>
              </div>

              {/* Success/Error Messages */}
              {message && (
                <div className="p-6 border-b">
                  <div
                    className={`flex items-center p-4 rounded-lg ${
                      message.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {message.type === "success" ? (
                      <CheckCircle size={20} className="ml-3 flex-shrink-0" />
                    ) : (
                      <AlertCircle size={20} className="ml-3 flex-shrink-0" />
                    )}
                    <span className="font-medium">{message.text}</span>
                  </div>
                </div>
              )}

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="fullName"
                        className="text-academy-blue font-bold text-lg flex items-center space-x-2 space-x-reverse"
                      >
                        <User className="text-academy-gold" size={20} />
                        <span>الاسم الكامل *</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                        className="h-14 text-lg border-2 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 rounded-xl transition-all duration-200"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-academy-blue font-bold text-lg flex items-center space-x-2 space-x-reverse"
                      >
                        <Mail className="text-academy-gold" size={20} />
                        <span>البريد الإلكتروني *</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="h-14 text-lg border-2 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 rounded-xl transition-all duration-200"
                        placeholder="example@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="phone"
                        className="text-academy-blue font-bold text-lg flex items-center space-x-2 space-x-reverse"
                      >
                        <Phone className="text-academy-gold" size={20} />
                        <span>رقم الهاتف (واتساب) *</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="h-14 text-lg border-2 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 rounded-xl transition-all duration-200"
                        placeholder="+966501234567"
                      />
                    </div>

                    {/* Specialization */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="specialization"
                        className="text-academy-blue font-bold text-lg flex items-center space-x-2 space-x-reverse"
                      >
                        <Award className="text-academy-gold" size={20} />
                        <span>التخصص *</span>
                      </Label>
                      <Input
                        id="specialization"
                        type="text"
                        value={formData.specialization}
                        onChange={(e) => handleInputChange("specialization", e.target.value)}
                        required
                        className="h-14 text-lg border-2 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 rounded-xl transition-all duration-200"
                        placeholder="مثال: التطوير الذاتي والقيادة"
                      />
                    </div>
                  </div>

                  {/* Important Note */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-r-4 border-academy-gold">
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="w-8 h-8 bg-academy-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="text-academy-blue" size={16} />
                      </div>
                      <div>
                        <h4 className="text-academy-blue font-bold text-lg mb-2">ملاحظة مهمة:</h4>
                        <p className="text-academy-dark-gray leading-relaxed">
                          بعد تقديم طلبكم، ستتلقون رسالة تأكيد على البريد الإلكتروني المسجل. سيتم مراجعة طلبكم من قبل
                          فريقنا المختص، وغالباً ما سيتم الرد عليكم خلال مدة من 4 أيام إلى أسبوع واحد.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-academy-gold to-yellow-400 hover:from-yellow-400 hover:to-academy-gold text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-academy-blue border-t-transparent rounded-full animate-spin ml-3"></div>
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="ml-3" />
                          تقديم طلب الاعتماد
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Reminder */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="text-academy-blue" size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2">شهادة معتمدة</h4>
              <p className="text-academy-gold/80 text-sm">احصل على شهادة اعتماد رسمية من الأكاديمية</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="text-academy-blue" size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2">ملف شخصي</h4>
              <p className="text-academy-gold/80 text-sm">إدراج ملفك الشخصي في قائمة المدربين المعتمدين</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Send className="text-academy-blue" size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2">منصة تسويقية</h4>
              <p className="text-academy-gold/80 text-sm">استفد من منصة الأكاديمية للتسويق والترويج</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
