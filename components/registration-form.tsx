"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Send, CheckCircle, XCircle, User, Mail, Phone, Globe, GraduationCap, BookOpen, Crown, Sparkles, Star } from "lucide-react"
import { submitApplication } from "@/app/actions/applications-actions"

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogType, setDialogType] = useState<"success" | "error">("success")
  const [dialogMessage, setDialogMessage] = useState("")

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    try {
      const result = await submitApplication(formData)

      setDialogType(result.success ? "success" : "error")
      setDialogMessage(result.message)
      setShowDialog(true)

      if (result.success) {
        // Reset form
        const form = document.getElementById("registration-form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      setDialogType("error")
      setDialogMessage("حدث خطأ غير متوقع")
      setShowDialog(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
        {/* Premium Header */}
        <CardHeader className="bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900 text-white rounded-t-3xl relative overflow-hidden">
          {/* Premium Decorative Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 right-4 w-24 h-24 bg-academy-gold/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-academy-gold/15 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 text-center py-8">
            {/* Premium Icon */}
            <div className="relative inline-block mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <GraduationCap className="text-academy-blue" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={12} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -right-3 w-3 h-3 bg-academy-gold-light rounded-full animate-pulse delay-500"></div>
            </div>

            <CardTitle className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
              نموذج التسجيل
            </CardTitle>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
              <Sparkles className="text-academy-gold animate-pulse" size={20} />
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
              <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
            </div>
            <p className="text-academy-gold-light text-lg font-medium max-w-2xl mx-auto">
              ابدأ رحلتك التعليمية معنا من خلال ملء هذا النموذج
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8 lg:p-12">
          <form id="registration-form" action={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-lg flex items-center justify-center shadow-lg">
                  <User className="text-academy-gold" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">المعلومات الشخصية</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-academy-blue font-semibold text-lg flex items-center">
                    <User className="w-5 h-5 ml-2" />
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 rounded-2xl bg-white/80 backdrop-blur-sm p-4 text-lg transition-all duration-300 hover:shadow-md"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-academy-blue font-semibold text-lg flex items-center">
                    <Mail className="w-5 h-5 ml-2" />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 rounded-2xl bg-white/80 backdrop-blur-sm p-4 text-lg transition-all duration-300 hover:shadow-md"
                    placeholder="example@email.com"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-academy-blue font-semibold text-lg flex items-center">
                    <Phone className="w-5 h-5 ml-2" />
                    رقم الهاتف (واتساب) *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 rounded-2xl bg-white/80 backdrop-blur-sm p-4 text-lg transition-all duration-300 hover:shadow-md"
                    placeholder="+966xxxxxxxxx"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="country" className="text-academy-blue font-semibold text-lg flex items-center">
                    <Globe className="w-5 h-5 ml-2" />
                    البلد *
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    type="text"
                    required
                    className="border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 rounded-2xl bg-white/80 backdrop-blur-sm p-4 text-lg transition-all duration-300 hover:shadow-md"
                    placeholder="أدخل بلد الإقامة"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen className="text-academy-gold" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">المعلومات الأكاديمية</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="currentQualification" className="text-academy-blue font-semibold text-lg flex items-center">
                    <BookOpen className="w-5 h-5 ml-2" />
                    المؤهل الحالي *
                  </Label>
                  <Textarea
                    id="currentQualification"
                    name="currentQualification"
                    required
                    rows={4}
                    className="border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 rounded-2xl bg-white/80 backdrop-blur-sm p-4 text-lg transition-all duration-300 hover:shadow-md resize-none"
                    placeholder="اذكر مؤهلك العلمي الحالي والجامعة التي تخرجت منها"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="desiredProgram" className="text-academy-blue font-semibold text-lg flex items-center">
                      <GraduationCap className="w-5 h-5 ml-2" />
                      البرنامج المرغوب *
                    </Label>
                    <Select name="desiredProgram" required>
                      <SelectTrigger className="border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 rounded-2xl bg-white/80 backdrop-blur-sm p-4 text-lg transition-all duration-300 hover:shadow-md">
                        <SelectValue placeholder="اختر البرنامج المرغوب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="دبلوم">دبلوم</SelectItem>
                        <SelectItem value="بكالوريوس">بكالوريوس</SelectItem>
                        <SelectItem value="ماجستير">ماجستير</SelectItem>
                        <SelectItem value="دكتوراه">دكتوراه</SelectItem>
                        <SelectItem value="دورة تدريبية">دورة تدريبية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="desiredSpecialization" className="text-academy-blue font-semibold text-lg flex items-center">
                      <BookOpen className="w-5 h-5 ml-2" />
                      التخصص المرغوب *
                    </Label>
                    <Input
                      id="desiredSpecialization"
                      name="desiredSpecialization"
                      type="text"
                      required
                      className="border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 rounded-2xl bg-white/80 backdrop-blur-sm p-4 text-lg transition-all duration-300 hover:shadow-md"
                      placeholder="أدخل التخصص المرغوب"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-academy-blue to-academy-blue-dark hover:from-academy-blue-dark hover:to-slate-900 text-white font-bold py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 disabled:transform-none disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 ml-3 animate-spin" />
                    جاري التقديم...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6 ml-3" />
                    تقديم الطلب
                  </>
                )}
              </Button>
            </div>

            {/* Premium Note */}
            <div className="bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 backdrop-blur-sm border-2 border-academy-blue/20 rounded-2xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-academy-gold rounded-lg flex items-center justify-center">
                  <Star size={14} className="text-academy-blue" />
                </div>
                <h4 className="text-academy-blue font-bold text-lg">ملاحظة مهمة</h4>
              </div>
              <p className="text-academy-dark-gray text-lg font-medium leading-relaxed">
                سيتم مراجعة طلبك من قبل لجنة القبول المتخصصة والرد عليك خلال <span className="text-academy-gold font-bold">4-7 أيام عمل</span>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Premium Success/Error Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg mx-auto bg-white/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-6">
              {dialogType === "success" ? (
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
              )}
            </div>
            <DialogTitle
              className={`text-2xl font-bold mb-4 ${dialogType === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {dialogType === "success" ? "تم التقديم بنجاح!" : "فشل في التقديم"}
            </DialogTitle>
            <DialogDescription className="text-center text-academy-dark-gray text-lg font-medium leading-relaxed">
              {dialogMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-8">
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowDialog(false)
              }}
              className={`px-12 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                dialogType === "success"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
              }`}
            >
              حسناً
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
