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
    <div className="min-h-screen bg-academy-gray">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-academy-blue to-academy-blue-light shadow-xl border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-academy-gold rounded-xl">
                    <Award className="w-8 h-8 text-academy-blue" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      إدارة الشهادات
                    </h1>
                    <p className="text-academy-gold-200 text-sm sm:text-base">
                      إدارة شهادات الأكاديمية وإضافة شهادات جديدة
                    </p>
                  </div>
                </div>

                <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full sm:w-auto bg-academy-gold hover:bg-academy-gold-dark text-academy-blue font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={resetForm}
                    >
                      <Plus className="w-5 h-5 ml-2" />
                      إضافة شهادة جديدة
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg">
                    <DialogHeader className="border-b border-gray-200 pb-4 bg-white">
                      <DialogTitle className="text-xl text-academy-blue font-bold flex items-center gap-3">
                        <FileText className="w-6 h-6 text-academy-gold" />
                        إضافة شهادة جديدة
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="p-6 bg-white">
                      <form onSubmit={handleAdd} className="space-y-6">
                        {/* Certificate Number */}
                        <div>
                          <label className="block text-sm font-bold text-academy-blue mb-2">
                            رقم الشهادة *
                          </label>
                          <div className="relative">
                            <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-5 h-5" />
                            <Input
                              type="text"
                              placeholder="أدخل رقم الشهادة"
                              value={formData.certificateNumber}
                              onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                              className="pr-12 h-12 border-2 border-academy-gold/30 focus:border-academy-gold bg-white text-academy-blue font-medium"
                              required
                            />
                          </div>
                        </div>

                        {/* Certificate Image */}
                        <div>
                          <label className="block text-sm font-bold text-academy-blue mb-2">
                            صورة الشهادة *
                          </label>
                          <div 
                            className="border-2 border-dashed border-academy-gold rounded-lg p-6 text-center bg-academy-gold/5 hover:bg-academy-gold/10 transition-colors cursor-pointer"
                            onClick={() => document.getElementById("certificate-upload")?.click()}
                          >
                            <Upload className="w-12 h-12 text-academy-gold mx-auto mb-3" />
                            <p className="text-academy-blue font-medium mb-2">
                              اسحب وأفلت صورة الشهادة هنا
                            </p>
                            <p className="text-academy-dark-gray text-sm mb-3">
                              أو انقر لتحديد ملف
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white"
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
                              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  تم اختيار: {formData.certificateImage.name}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Issue Date */}
                        <div>
                          <label className="block text-sm font-bold text-academy-blue mb-2">
                            تاريخ الإصدار
                          </label>
                          <div className="relative">
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-5 h-5" />
                            <Input
                              type="date"
                              value={formData.issueDate}
                              onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                              className="pr-12 h-12 border-2 border-academy-gold/30 focus:border-academy-gold bg-white text-academy-blue font-medium"
                            />
                          </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 bg-white">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAddDialog(false)}
                            disabled={isSubmitting}
                            className="flex-1 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white"
                          >
                            إلغاء
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-academy-gold hover:bg-academy-gold-dark text-academy-blue font-bold"
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
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <Card className="bg-white shadow-lg border-academy-gold/20">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-5 h-5" />
                <Input
                  type="text"
                  placeholder="البحث برقم الشهادة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 h-12 border-2 border-academy-gold/30 focus:border-academy-gold bg-white text-academy-blue font-medium"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-academy-blue to-academy-blue-light text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">{certificates.length}</p>
                  <p className="text-academy-gold-200 font-medium">إجمالي الشهادات</p>
                </div>
                <div className="p-3 bg-academy-gold/20 rounded-full">
                  <Hash className="w-8 h-8 text-academy-gold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">{certificates.length}</p>
                  <p className="text-green-100 font-medium">الشهادات المعتمدة</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-academy-gold to-academy-gold-dark text-academy-blue shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">
                    {
                      certificates.filter(
                        (cert) => new Date(cert.issue_date).getFullYear() === new Date().getFullYear(),
                      ).length
                    }
                  </p>
                  <p className="text-academy-blue/80 font-medium">شهادات هذا العام</p>
                </div>
                <div className="p-3 bg-academy-blue/20 rounded-full">
                  <Calendar className="w-8 h-8 text-academy-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8 text-center">
                <Loader2 className="w-16 h-16 animate-spin text-academy-gold mx-auto mb-4" />
                <p className="text-academy-blue font-bold text-lg">جاري تحميل الشهادات...</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCertificates.length === 0 ? (
              <Card className="bg-white shadow-lg">
                <CardContent className="text-center py-16">
                  <div className="w-20 h-20 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hash className="w-10 h-10 text-academy-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-academy-blue mb-2">
                    {searchTerm ? "لا توجد شهادات تطابق البحث" : "لا توجد شهادات مضافة بعد"}
                  </h3>
                  <p className="text-academy-dark-gray">
                    {searchTerm ? "جرب البحث بكلمات مختلفة" : "ابدأ بإضافة أول شهادة للأكاديمية"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredCertificates.map((certificate) => (
                <Card
                  key={certificate.id}
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-r-4 border-r-academy-gold"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      {/* Certificate Info */}
                      <div className="w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-academy-gold/20 rounded-lg">
                              <Hash className="w-5 h-5 text-academy-gold" />
                            </div>
                            <span className="font-bold text-lg text-academy-blue break-all">
                              {certificate.certificate_number}
                            </span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                            <CheckCircle className="w-3 h-3 ml-1" />
                            معتمدة
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-academy-dark-gray mb-4">
                          <Calendar className="w-4 h-4 text-academy-gold" />
                          <span className="font-medium">
                            تاريخ الإصدار: {formatDate(certificate.issue_date)}
                          </span>
                        </div>
                        
                        {/* Certificate Image Preview */}
                        {certificate.certificate_image && (
                          <div className="mt-4 mb-4">
                            <img
                              src={certificate.certificate_image}
                              alt={`شهادة رقم ${certificate.certificate_number}`}
                              className="w-full h-auto max-h-80 object-contain rounded-lg border border-academy-gold/20 bg-white shadow-sm"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row gap-3 pt-4 border-t border-gray-200">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(certificate)}
                          className="flex-1 border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white font-medium"
                        >
                          <Edit className="w-4 h-4 ml-1" />
                          تعديل
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(certificate)}
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-600 hover:text-white font-medium"
                        >
                          <Trash2 className="w-4 h-4 ml-1" />
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

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg">
            <DialogHeader className="border-b border-gray-200 pb-4 bg-white">
              <DialogTitle className="text-xl text-academy-blue font-bold flex items-center gap-3">
                <Edit className="w-6 h-6 text-academy-gold" />
                تعديل الشهادة
              </DialogTitle>
            </DialogHeader>
            
            <div className="p-6 bg-white">
              <form onSubmit={handleEdit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-academy-blue mb-2">
                    رقم الشهادة *
                  </label>
                  <div className="relative">
                    <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="أدخل رقم الشهادة"
                      value={formData.certificateNumber}
                      onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                      className="pr-12 h-12 border-2 border-academy-gold/30 focus:border-academy-gold bg-white text-academy-blue font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-academy-blue mb-2">
                    صورة الشهادة الجديدة (اختياري)
                  </label>
                  <div 
                    className="border-2 border-dashed border-academy-gold rounded-lg p-6 text-center bg-academy-gold/5 hover:bg-academy-gold/10 transition-colors cursor-pointer"
                    onClick={() => document.getElementById("certificate-edit-upload")?.click()}
                  >
                    <Upload className="w-12 h-12 text-academy-gold mx-auto mb-3" />
                    <p className="text-academy-blue font-medium mb-2">
                      اسحب وأفلت صورة الشهادة الجديدة هنا
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white"
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
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          تم اختيار: {formData.certificateImage.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-academy-blue mb-2">
                    تاريخ الإصدار
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold w-5 h-5" />
                    <Input
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="pr-12 h-12 border-2 border-academy-gold/30 focus:border-academy-gold bg-white text-academy-blue font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 bg-white">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditDialog(false)}
                    disabled={isSubmitting}
                    className="flex-1 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-academy-gold hover:bg-academy-gold-dark text-academy-blue font-bold"
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
          <DialogContent className="max-w-md bg-white rounded-lg">
            <DialogHeader className="border-b border-gray-200 pb-4 bg-white">
              <DialogTitle className="text-xl text-center text-red-600 font-bold flex items-center justify-center gap-3">
                <XCircle className="w-6 h-6" />
                تأكيد الحذف
              </DialogTitle>
            </DialogHeader>
            <div className="p-6 bg-white">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <p className="text-academy-dark-gray text-lg mb-2">
                    هل أنت متأكد من حذف الشهادة رقم
                  </p>
                  <p className="font-bold text-academy-blue text-xl break-all bg-academy-blue/10 p-3 rounded-lg">
                    "{selectedCertificate?.certificate_number}"؟
                  </p>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600 font-bold">
                    ⚠️ هذا الإجراء لا يمكن التراجع عنه
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isSubmitting}
                  className="flex-1 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold"
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
          <DialogContent className="max-w-md bg-white rounded-lg">
            <DialogHeader className="border-b border-gray-200 pb-4 bg-white">
              <DialogTitle className="text-center text-xl font-bold">
                {result?.success ? "تم بنجاح! 🎉" : "حدث خطأ ❌"}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6 bg-white">
              {result?.success ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-800 mb-2">{result?.message}</p>
                    <p className="text-green-600">تم تنفيذ العملية بنجاح</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-red-800 mb-2">{result?.message}</p>
                    <p className="text-red-600">يرجى المحاولة مرة أخرى</p>
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
