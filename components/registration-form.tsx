"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Send, CheckCircle, XCircle, User, Mail, Phone, Globe, GraduationCap, BookOpen } from "lucide-react"
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
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader className="bg-gradient-to-r from-academy-blue to-academy-blue/90 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <GraduationCap className="w-6 h-6 ml-3" />
            نموذج التسجيل
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form id="registration-form" action={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-academy-blue font-semibold flex items-center">
                  <User className="w-4 h-4 ml-2" />
                  الاسم الكامل *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="border-academy-blue/30 focus:border-academy-gold focus:ring-academy-gold"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-academy-blue font-semibold flex items-center">
                  <Mail className="w-4 h-4 ml-2" />
                  البريد الإلكتروني *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-academy-blue/30 focus:border-academy-gold focus:ring-academy-gold"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-academy-blue font-semibold flex items-center">
                  <Phone className="w-4 h-4 ml-2" />
                  رقم الهاتف (واتساب) *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="border-academy-blue/30 focus:border-academy-gold focus:ring-academy-gold"
                  placeholder="+966xxxxxxxxx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-academy-blue font-semibold flex items-center">
                  <Globe className="w-4 h-4 ml-2" />
                  البلد *
                </Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  required
                  className="border-academy-blue/30 focus:border-academy-gold focus:ring-academy-gold"
                  placeholder="أدخل بلد الإقامة"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentQualification" className="text-academy-blue font-semibold flex items-center">
                  <BookOpen className="w-4 h-4 ml-2" />
                  المؤهل الحالي *
                </Label>
                <Textarea
                  id="currentQualification"
                  name="currentQualification"
                  required
                  rows={3}
                  className="border-academy-blue/30 focus:border-academy-gold focus:ring-academy-gold resize-none"
                  placeholder="اذكر مؤهلك العلمي الحالي والجامعة التي ��خرجت منها"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="desiredProgram" className="text-academy-blue font-semibold flex items-center">
                    <GraduationCap className="w-4 h-4 ml-2" />
                    البرنامج المرغوب *
                  </Label>
                  <Select name="desiredProgram" required>
                    <SelectTrigger className="border-academy-blue/30 focus:border-academy-gold focus:ring-academy-gold">
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

                <div className="space-y-2">
                  <Label htmlFor="desiredSpecialization" className="text-academy-blue font-semibold flex items-center">
                    <BookOpen className="w-4 h-4 ml-2" />
                    التخصص المرغوب *
                  </Label>
                  <Input
                    id="desiredSpecialization"
                    name="desiredSpecialization"
                    type="text"
                    required
                    className="border-academy-blue/30 focus:border-academy-gold focus:ring-academy-gold"
                    placeholder="أدخل التخصص المرغوب"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold py-4 text-lg rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    جاري التقديم...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 ml-2" />
                    تقديم الطلب
                  </>
                )}
              </Button>
            </div>

            {/* Note */}
            <div className="bg-academy-blue/5 border border-academy-blue/20 rounded-lg p-4 mt-6">
              <p className="text-academy-blue text-sm text-center">
                <strong>ملاحظة:</strong> سيتم مراجعة طلبك من قبل لجنة القبول والرد عليك خلال 4-7 أيام عمل
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success/Error Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4">
              {dialogType === "success" ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              )}
            </div>
            <DialogTitle
              className={`text-xl font-bold ${dialogType === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {dialogType === "success" ? "تم التقديم بنجاح!" : "فشل في التقديم"}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">{dialogMessage}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowDialog(false)}
              className={`px-8 py-2 rounded-lg font-semibold ${
                dialogType === "success"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
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
