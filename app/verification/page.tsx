"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, XCircle, Calendar, Hash, Loader2, Award, Shield, Download, Eye } from "lucide-react"
import { verifyCertificate } from "@/app/actions/certificates-actions"

interface Certificate {
  id: string
  certificate_number: string
  certificate_image: string
  issue_date: string
  created_at: string
}

export default function VerificationPage() {
  const [certificateNumber, setCertificateNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean
    message: string
    certificate?: Certificate
  } | null>(null)

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!certificateNumber.trim()) {
      setVerificationResult({
        success: false,
        message: "يرجى إدخال رقم الشهادة",
      })
      setShowResult(true)
      return
    }

    setIsLoading(true)

    try {
      const result = await verifyCertificate(certificateNumber.trim())
      setVerificationResult(result)
      setShowResult(true)
    } catch (error) {
      setVerificationResult({
        success: false,
        message: "حدث خطأ أثناء التحقق من الشهادة",
      })
      setShowResult(true)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-full mb-6 shadow-2xl">
              <Shield className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
              التحقق من الشهادات
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              تحقق من صحة الشهادات الصادرة عن أكاديمية المعرفة الدولية من خلال إدخال رقم الشهادة
            </p>
          </div>

          {/* Verification Form */}
          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 rounded-t-lg">
              <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-3">
                <Award className="w-6 h-6 text-amber-600" />
                أدخل رقم الشهادة للتحقق
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleVerification} className="space-y-6">
                <div className="relative">
                  <Hash className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-6 h-6" />
                  <Input
                    type="text"
                    placeholder="أدخل رقم الشهادة"
                    value={certificateNumber}
                    onChange={(e) => setCertificateNumber(e.target.value)}
                    className="pr-14 h-16 text-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-200 rounded-xl bg-amber-50/30"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 text-lg bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin ml-2" />
                      جاري التحقق...
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6 ml-2" />
                      التحقق من الشهادة
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* How it works */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Hash className="w-10 h-10 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">أدخل رقم الشهادة</h3>
              <p className="text-gray-600 leading-relaxed">أدخل رقم الشهادة الموجود على الشهادة الأصلية</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Search className="w-10 h-10 text-yellow-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">التحقق التلقائي</h3>
              <p className="text-gray-600 leading-relaxed">سيتم البحث في قاعدة البيانات للتحقق من صحة الشهادة</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CheckCircle className="w-10 h-10 text-orange-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">النتيجة الفورية</h3>
              <p className="text-gray-600 leading-relaxed">احصل على النتيجة فوراً مع عرض تفاصيل الشهادة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-bold">
              {verificationResult?.success ? (
                <div className="flex items-center justify-center gap-3 text-green-600">
                  <Shield className="w-8 h-8" />
                  تم العثور على الشهادة
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-red-600">
                  <XCircle className="w-8 h-8" />
                  نتيجة التحقق
                </div>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
            {verificationResult?.success ? (
              <>
                {/* Success Message */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-8 border-2 border-green-200">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                  <div className="relative flex items-center justify-center space-x-4 space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-green-800 font-bold text-2xl mb-2">الشهادة صحيحة ومعتمدة ✓</p>
                      <p className="text-green-700 text-lg">
                        هذه الشهادة صادرة عن أكاديمية المعرفة الدولية وموثقة رسمياً
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                {verificationResult.certificate && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full flex items-center justify-center shadow-md">
                              <Hash className="w-6 h-6 text-amber-700" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 font-medium">رقم الشهادة</p>
                              <p className="font-bold text-xl text-gray-800">
                                {verificationResult.certificate.certificate_number}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-amber-200 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full flex items-center justify-center shadow-md">
                              <Calendar className="w-6 h-6 text-yellow-700" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 font-medium">تاريخ الإصدار</p>
                              <p className="font-bold text-xl text-gray-800">
                                {formatDate(verificationResult.certificate.issue_date)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Certificate Image */}
                    {verificationResult.certificate.certificate_image && (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <Award className="w-6 h-6 text-amber-600" />
                          <h3 className="text-2xl font-bold text-gray-800">صورة الشهادة</h3>
                        </div>

                        <div className="relative inline-block group">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 to-yellow-300/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                          <div className="relative bg-white p-4 rounded-2xl shadow-2xl border-2 border-amber-200">
                            <img
                              src={verificationResult.certificate.certificate_image || "/placeholder.svg"}
                              alt="صورة الشهادة"
                              className="max-w-full h-auto rounded-xl shadow-lg max-h-96 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = "none"
                                // Show error message instead of fallback image
                                const errorDiv = document.createElement("div")
                                errorDiv.className = "flex items-center justify-center h-96 bg-gray-100 rounded-xl"
                                errorDiv.innerHTML = `
                                  <div class="text-center text-gray-500">
                                    <XCircle class="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <p class="text-lg font-medium">لا يمكن تحميل صورة الشهادة</p>
                                    <p class="text-sm">تأكد من اتصالك بالإنترنت</p>
                                  </div>
                                `
                                target.parentNode?.appendChild(errorDiv)
                              }}
                            />
                            <div className="absolute top-6 right-6">
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 text-sm font-bold shadow-lg">
                                <Shield className="w-4 h-4 ml-1" />
                                معتمدة رسمياً
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-center gap-4">
                          <Button
                            onClick={() => setShowFullImage(true)}
                            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Eye className="w-5 h-5 ml-2" />
                            عرض بالحجم الكامل
                          </Button>
                          <Button
                            onClick={() => window.open(verificationResult.certificate?.certificate_image, "_blank")}
                            variant="outline"
                            className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Download className="w-5 h-5 ml-2" />
                            تحميل الشهادة
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Error Message */
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 p-8 border-2 border-red-200">
                <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full -translate-y-16 -translate-x-16 opacity-50"></div>
                <div className="relative flex items-center justify-center space-x-4 space-x-reverse">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                      <XCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-red-800 font-bold text-2xl mb-2">{verificationResult?.message}</p>
                    <p className="text-red-700 text-lg">تأكد من صحة رقم الشهادة وحاول مرة أخرى</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Image Dialog */}
      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-2">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-center text-xl font-bold text-gray-800">عرض الشهادة بالحجم الكامل</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            {verificationResult?.certificate?.certificate_image && (
              <img
                src={verificationResult.certificate.certificate_image || "/placeholder.svg"}
                alt="صورة الشهادة بالحجم الكامل"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  // Show error message for full image view
                  const errorDiv = document.createElement("div")
                  errorDiv.className = "flex items-center justify-center h-96 bg-gray-100 rounded-lg"
                  errorDiv.innerHTML = `
                    <div class="text-center text-gray-500">
                      <div class="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                        <span class="text-2xl">⚠️</span>
                      </div>
                      <p class="text-lg font-medium">لا يمكن تحميل صورة الشهادة</p>
                    </div>
                  `
                  target.parentNode?.appendChild(errorDiv)
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
