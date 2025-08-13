"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Hash,
  Upload,
  Loader2,
  CheckCircle,
  XCircle,
  ImageIcon,
  Award,
  FileText,
} from "lucide-react"
import {
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "@/app/actions/certificates-actions"

interface Certificate {
  id: string
  certificate_number: string
  certificate_image: string
  issue_date: string
  created_at: string
}

export default function CertificatesManagement() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showResultDialog, setShowResultDialog] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    certificateNumber: "",
    certificateImage: null as File | null,
    issueDate: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    setIsLoading(true)
    const result = await getCertificates()
    if (result.success) {
      setCertificates(result.certificates)
    }
    setIsLoading(false)
  }

  const filteredCertificates = certificates.filter((cert) =>
    cert.certificate_number.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      certificateNumber: "",
      certificateImage: null,
      issueDate: new Date().toISOString().split("T")[0],
    })
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataObj = new FormData()
    formDataObj.append("certificateNumber", formData.certificateNumber)
    if (formData.certificateImage) {
      formDataObj.append("certificateImage", formData.certificateImage)
    }
    formDataObj.append("issueDate", formData.issueDate)

    const result = await addCertificate(formDataObj)
    setResult(result)
    setIsSubmitting(false)
    setShowAddDialog(false)
    setShowResultDialog(true)

    if (result.success) {
      resetForm()
      loadCertificates()
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCertificate) return

    setIsSubmitting(true)

    const formDataObj = new FormData()
    formDataObj.append("certificateNumber", formData.certificateNumber)
    if (formData.certificateImage) {
      formDataObj.append("certificateImage", formData.certificateImage)
    }
    formDataObj.append("issueDate", formData.issueDate)

    const result = await updateCertificate(selectedCertificate.id, formDataObj)
    setResult(result)
    setIsSubmitting(false)
    setShowEditDialog(false)
    setShowResultDialog(true)

    if (result.success) {
      resetForm()
      loadCertificates()
    }
  }

  const handleDelete = async () => {
    if (!selectedCertificate) return

    setIsSubmitting(true)
    const result = await deleteCertificate(selectedCertificate.id)
    setResult(result)
    setIsSubmitting(false)
    setShowDeleteDialog(false)
    setShowResultDialog(true)

    if (result.success) {
      loadCertificates()
    }
  }

  const openEditDialog = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setFormData({
      certificateNumber: certificate.certificate_number,
      certificateImage: null,
      issueDate: certificate.issue_date,
    })
    setShowEditDialog(true)
  }

  const openDeleteDialog = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setShowDeleteDialog(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, certificateImage: file })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-blue-50 via-white to-academy-gold-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-academy-gold/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 opacity-50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-academy-gold/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-academy-blue/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-academy-gold/20 rounded-xl">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-academy-blue" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-academy-blue leading-tight">
                      إدارة الشهادات
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-academy-dark-gray mt-1">
                      إدارة شهادات الأكاديمية وإضافة شهادات جديدة
                    </p>
                  </div>
                </div>
              </div>

              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full lg:w-auto bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold hover:from-academy-gold-dark hover:via-academy-gold hover:to-academy-gold-light text-academy-blue shadow-xl hover:shadow-2xl transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base group"
                    onClick={resetForm}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:scale-110 transition-transform duration-200" />
                    إضافة شهادة جديدة
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-0 rounded-2xl">
                  <DialogHeader className="border-b border-academy-gold/20 pb-4 sm:pb-6 bg-white sticky top-0 z-10">
                    <DialogTitle className="text-lg sm:text-xl md:text-2xl text-academy-blue text-center font-bold flex items-center justify-center gap-3">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-academy-gold" />
                      إضافة شهادة جديدة
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="p-4 sm:p-6 bg-white">
                    <form onSubmit={handleAdd} className="space-y-4 sm:space-y-6">
                      <div className="space-y-4 sm:space-y-6">
                        {/* Certificate Number */}
                        <div className="space-y-2">
                          <label className="block text-sm sm:text-base font-semibold text-academy-blue">
                            رقم الشهادة *
                          </label>
                          <div className="relative">
                            <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-4 h-4 sm:w-5 sm:h-5" />
                            <Input
                              type="text"
                              placeholder="أدخل رقم الشهادة"
                              value={formData.certificateNumber}
                              onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                              className="pr-10 sm:pr-12 h-11 sm:h-12 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 bg-white text-sm sm:text-base rounded-xl"
                              required
                            />
                          </div>
                        </div>

                        {/* Certificate Image */}
                        <div className="space-y-2">
                          <label className="block text-sm sm:text-base font-semibold text-academy-blue">
                            صورة الشهادة *
                          </label>
                          <div className="border-2 border-dashed border-academy-gold/30 rounded-xl p-4 sm:p-6 text-center hover:border-academy-gold/50 transition-all duration-300 bg-gradient-to-br from-academy-gold/5 to-transparent group cursor-pointer"
                               onClick={() => document.getElementById("certificate-upload")?.click()}>
                            <div className="space-y-3 sm:space-y-4">
                              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-academy-gold/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-academy-gold" />
                              </div>
                              <div className="space-y-2">
                                <p className="text-academy-dark-gray text-sm sm:text-base font-medium">
                                  اسحب وأفلت صورة الشهادة هنا
                                </p>
                                <p className="text-xs sm:text-sm text-academy-dark-gray/70">
                                  أو انقر لتحديد ملف
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white bg-white/80 backdrop-blur-sm"
                              >
                                <ImageIcon className="w-4 h-4 ml-2" />
                                اختر صورة
                              </Button>
                              <input
                                id="certificate-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                              />
                              {formData.certificateImage && (
                                <div className="mt-3 p-3 bg-academy-gold/10 rounded-lg border border-academy-gold/30">
                                  <p className="text-sm text-academy-blue font-medium flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    تم اختيار: {formData.certificateImage.name}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Issue Date */}
                        <div className="space-y-2">
                          <label className="block text-sm sm:text-base font-semibold text-academy-blue">
                            تاريخ الإصدار
                          </label>
                          <div className="relative">
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-4 h-4 sm:w-5 sm:h-5" />
                            <Input
                              type="date"
                              value={formData.issueDate}
                              onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                              className="pr-10 sm:pr-12 h-11 sm:h-12 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 bg-white text-sm sm:text-base rounded-xl"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t border-academy-gold/20 bg-white sticky bottom-0">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddDialog(false)}
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-6 py-2.5 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white bg-white rounded-xl"
                        >
                          إلغاء
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue px-6 py-2.5 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin ml-2" />
                              جاري الإضافة...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 ml-2" />
                              إضافة الشهادة
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6 sm:mb-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-5 h-5" />
                <Input
                  type="text"
                  placeholder="البحث برقم الشهادة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 h-12 sm:h-14 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 bg-white text-sm sm:text-base rounded-xl shadow-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Hash className="w-6 h-6 sm:w-8 sm:h-8 text-academy-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-blue group-hover:scale-105 transition-transform duration-300">
                    {certificates.length}
                  </p>
                  <p className="text-academy-dark-gray font-medium text-sm sm:text-base truncate">
                    إجمالي الشهادات
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-200/50 to-green-100/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-blue group-hover:scale-105 transition-transform duration-300">
                    {certificates.length}
                  </p>
                  <p className="text-academy-dark-gray font-medium text-sm sm:text-base truncate">
                    الشهادات المعتمدة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-200/50 to-blue-100/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-blue group-hover:scale-105 transition-transform duration-300">
                    {
                      certificates.filter(
                        (cert) => new Date(cert.issue_date).getFullYear() === new Date().getFullYear(),
                      ).length
                    }
                  </p>
                  <p className="text-academy-dark-gray font-medium text-sm sm:text-base truncate">
                    شهادات هذا العام
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16 sm:py-24">
            <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="relative">
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 animate-spin text-academy-gold mx-auto mb-4" />
                <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-academy-gold/20 rounded-full mx-auto animate-pulse"></div>
              </div>
              <p className="text-academy-blue font-semibold text-base sm:text-lg">جاري تحميل الشهادات...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredCertificates.length === 0 ? (
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="text-center py-12 sm:py-20">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-academy-gold/20 rounded-full flex items-center justify-center">
                      <Hash className="w-10 h-10 sm:w-12 sm:h-12 text-academy-gold" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-academy-blue">
                        {searchTerm ? "لا توجد شهادات تطابق البحث" : "لا توجد شهادات مضافة بعد"}
                      </h3>
                      <p className="text-academy-dark-gray text-sm sm:text-base max-w-md mx-auto">
                        {searchTerm ? "جرب البحث بكلمات مختلفة أو تأكد من رقم الشهادة" : "ابدأ بإضافة أول شهادة للأكاديمية"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredCertificates.map((certificate, index) => (
                <Card
                  key={certificate.id}
                  className="group shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
                      {/* Certificate Info */}
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="p-2 sm:p-3 bg-academy-gold/20 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-academy-gold" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-base sm:text-lg lg:text-xl text-academy-blue break-all leading-tight">
                                {certificate.certificate_number}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-full border border-green-200 font-medium self-start">
                            <CheckCircle className="w-3 h-3 ml-1" />
                            معتمدة
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 text-academy-dark-gray">
                          <Calendar className="w-4 h-4 text-academy-gold flex-shrink-0" />
                          <span className="text-sm sm:text-base">
                            تاريخ الإصدار: {formatDate(certificate.issue_date)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(certificate)}
                          className="group/btn border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg"
                        >
                          <Edit className="w-4 h-4 ml-1 group-hover/btn:scale-110 transition-transform duration-200" />
                          تعديل
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(certificate)}
                          className="group/btn text-red-600 hover:text-white hover:bg-red-600 border-red-200 hover:border-red-600 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg"
                        >
                          <Trash2 className="w-4 h-4 ml-1 group-hover/btn:scale-110 transition-transform duration-200" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Edit Dialog - Similar structure with white background */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-0 rounded-2xl">
            <DialogHeader className="border-b border-academy-gold/20 pb-4 sm:pb-6 bg-white sticky top-0 z-10">
              <DialogTitle className="text-lg sm:text-xl md:text-2xl text-academy-blue text-center font-bold flex items-center justify-center gap-3">
                <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-academy-gold" />
                تعديل الشهادة
              </DialogTitle>
            </DialogHeader>
            
            <div className="p-4 sm:p-6 bg-white">
              <form onSubmit={handleEdit} className="space-y-4 sm:space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  {/* Similar form structure as add dialog */}
                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-academy-blue">
                      رقم الشهادة *
                    </label>
                    <div className="relative">
                      <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-4 h-4 sm:w-5 sm:h-5" />
                      <Input
                        type="text"
                        placeholder="أدخل رقم الشهادة"
                        value={formData.certificateNumber}
                        onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                        className="pr-10 sm:pr-12 h-11 sm:h-12 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 bg-white text-sm sm:text-base rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-academy-blue">
                      صورة الشهادة الجديدة (اختياري)
                    </label>
                    <div className="border-2 border-dashed border-academy-gold/30 rounded-xl p-4 sm:p-6 text-center hover:border-academy-gold/50 transition-all duration-300 bg-gradient-to-br from-academy-gold/5 to-transparent group cursor-pointer"
                         onClick={() => document.getElementById("certificate-edit-upload")?.click()}>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-academy-gold/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-academy-gold" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-academy-dark-gray text-sm sm:text-base font-medium">
                            اسحب وأفلت صورة الشهادة الجديدة هنا
                          </p>
                          <p className="text-xs sm:text-sm text-academy-dark-gray/70">
                            أو انقر لتحديد ملف جديد
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white bg-white/80 backdrop-blur-sm"
                        >
                          <ImageIcon className="w-4 h-4 ml-2" />
                          اختر صورة جديدة
                        </Button>
                        <input
                          id="certificate-edit-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        {formData.certificateImage && (
                          <div className="mt-3 p-3 bg-academy-gold/10 rounded-lg border border-academy-gold/30">
                            <p className="text-sm text-academy-blue font-medium flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              تم اختيار: {formData.certificateImage.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-academy-blue">
                      تاريخ الإصدار
                    </label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-4 h-4 sm:w-5 sm:h-5" />
                      <Input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                        className="pr-10 sm:pr-12 h-11 sm:h-12 border-academy-gold/30 focus:border-academy-gold focus:ring-academy-gold/20 bg-white text-sm sm:text-base rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t border-academy-gold/20 bg-white sticky bottom-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditDialog(false)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white bg-white rounded-xl"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue px-6 py-2.5 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin ml-2" />
                        جاري التحديث...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 ml-2" />
                        حفظ التغييرات
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="max-w-md bg-white shadow-2xl border-0 rounded-2xl">
            <DialogHeader className="border-b border-red-200/50 pb-4 sm:pb-6 bg-white">
              <DialogTitle className="text-lg sm:text-xl text-center text-red-600 font-bold flex items-center justify-center gap-3">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                تأكيد الحذف
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 sm:p-6 bg-white space-y-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-academy-dark-gray text-base sm:text-lg">
                    هل أنت متأكد من حذف الشهادة رقم
                  </p>
                  <p className="font-bold text-academy-blue text-lg sm:text-xl break-all bg-academy-blue/5 p-3 rounded-lg border border-academy-blue/20">
                    "{selectedCertificate?.certificate_number}"؟
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-600 font-medium flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" />
                    هذا الإجراء لا يمكن التراجع عنه
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white bg-white rounded-xl"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-2.5 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin ml-2" />
                      جاري الحذف...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 ml-2" />
                      حذف الشهادة
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Result Dialog */}
        <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
          <DialogContent className="max-w-md bg-white shadow-2xl border-0 rounded-2xl">
            <DialogHeader className="border-b border-academy-gold/20 pb-4 sm:pb-6 bg-white">
              <DialogTitle className="text-center text-lg sm:text-xl font-bold">
                {result?.success ? "تم بنجاح! 🎉" : "حدث خطأ ❌"}
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 sm:p-6 bg-white">
              {result?.success ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-green-800">{result?.message}</p>
                    <p className="text-green-600 text-sm sm:text-base">تم تنفيذ العملية بنجاح</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-red-800">{result?.message}</p>
                    <p className="text-red-600 text-sm sm:text-base">يرجى المحاولة مرة أخرى</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
