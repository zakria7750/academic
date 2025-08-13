"use client"

import { useState } from "react"
import { submitGraduateApplication } from "@/app/actions/graduates-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, Send, Loader2 } from "lucide-react"

export function GraduateApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string; open: boolean } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await submitGraduateApplication(formData)

      if (result.success) {
        setMessage({
          type: "success",
          text: "تم تقديم طلبكم بنجاح! سيتم التواصل معكم خلال 4-7 أيام.",
          open: true,
        })
        // Reset form
        const form = document.getElementById("graduate-form") as HTMLFormElement
        form?.reset()
      } else {
        setMessage({
          type: "error",
          text: result.error || "حدث خطأ أثناء تقديم الطلب",
          open: true,
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
        open: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue rounded-t-lg">
          <CardTitle className="text-2xl font-bold">نموذج الانضمام لشبكة الخريجين</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form id="graduate-form" action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-academy-gold font-semibold">
                  الاسم الكامل *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="border-2 border-gray-200 focus:border-academy-gold"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-academy-gold font-semibold">
                  البريد الإلكتروني *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-2 border-gray-200 focus:border-academy-gold"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="specialization" className="text-academy-gold font-semibold">
                  التخصص *
                </Label>
                <Input
                  id="specialization"
                  name="specialization"
                  required
                  className="border-2 border-gray-200 focus:border-academy-gold"
                  placeholder="مثال: إدارة الأعمال"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current_position" className="text-academy-gold font-semibold">
                  المنصب الحالي *
                </Label>
                <Input
                  id="current_position"
                  name="current_position"
                  required
                  className="border-2 border-gray-200 focus:border-academy-gold"
                  placeholder="مثال: مدير عام"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-academy-gold font-semibold">
                  البلد *
                </Label>
                <Input
                  id="country"
                  name="country"
                  required
                  className="border-2 border-gray-200 focus:border-academy-gold"
                  placeholder="مثال: السعودية"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduation_year" className="text-academy-gold font-semibold">
                  سنة التخرج *
                </Label>
                <Input
                  id="graduation_year"
                  name="graduation_year"
                  type="number"
                  min="2000"
                  max={new Date().getFullYear()}
                  required
                  className="border-2 border-gray-200 focus:border-academy-gold"
                  placeholder="2023"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="success_story" className="text-academy-gold font-semibold">
                قصة النجاح *
              </Label>
              <Textarea
                id="success_story"
                name="success_story"
                required
                rows={6}
                                 className="border-2 border-gray-200 focus:border-academy-gold resize-none"
                placeholder="شارك قصة نجاحك وكيف ساهمت الأكاديمية في تطوير مسيرتك المهنية..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-academy-gold to-academy-gold-dark hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin ml-2" />
                  جاري التقديم...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send className="w-5 h-5 ml-2" />
                  تقديم الطلب
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog
        open={message?.open || false}
        onOpenChange={(open) => setMessage((prev) => (prev ? { ...prev, open } : null))}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              {message?.type === "success" ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              )}
            </div>
            <DialogTitle
              className={`text-center text-xl ${message?.type === "success" ? "text-green-800" : "text-red-800"}`}
            >
              {message?.type === "success" ? "تم التقديم بنجاح!" : "فشل في التقديم"}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">{message?.text}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setMessage(null)}
              className={`px-8 ${
                message?.type === "success" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              } text-white`}
            >
              حسناً
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
