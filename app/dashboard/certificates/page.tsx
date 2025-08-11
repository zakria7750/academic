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
    <div className="min-h-screen bg-gradient-to-br from-academy-yellow/5 to-academy-yellow/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-academy-dark-gray mb-2">إدارة الشهادات</h1>
            <p className="text-xl text-academy-gray">إدارة شهادات الأكاديمية وإضافة شهادات جديدة</p>
          </div>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button
                className="mt-4 md:mt-0 bg-gradient-to-r from-academy-yellow to-academy-yellow/90 hover:from-academy-yellow/90 hover:to-academy-yellow text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
                onClick={resetForm}
              >
                <Plus className="w-5 h-5 ml-2" />
                إضافة شهادة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-academy-dark-gray text-center">إضافة شهادة جديدة</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-academy-dark-gray mb-3">رقم الشهادة *</label>
                    <div className="relative">
                      <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-yellow w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="أدخل رقم الشهادة"
                        value={formData.certificateNumber}
                        onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                        className="pr-12 h-12 border-academy-yellow/30 focus:border-academy-yellow focus:ring-academy-yellow/20"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-academy-dark-gray mb-3">صورة الشهادة *</label>
                    <div className="relative">
                      <div className="border-2 border-dashed border-academy-yellow/30 rounded-lg p-6 text-center hover:border-academy-yellow/50 transition-colors">
                        <Upload className="w-12 h-12 text-academy-yellow mx-auto mb-4" />
                        <p className="text-academy-gray mb-2">اسحب وأفلت صورة الشهادة هنا أو</p>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-academy-yellow text-academy-yellow hover:bg-academy-yellow hover:text-white bg-transparent"
                          onClick={() => document.getElementById("certificate-upload")?.click()}
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
                          <p className="text-sm text-academy-yellow mt-2">
                            تم اختيار: {formData.certificateImage.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-academy-dark-gray mb-3">تاريخ الإصدار</label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-yellow w-5 h-5" />
                      <Input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                        className="pr-12 h-12 border-academy-yellow/30 focus:border-academy-yellow focus:ring-academy-yellow/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                    disabled={isSubmitting}
                    className="px-6"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-academy-yellow to-academy-yellow/90 hover:from-academy-yellow/90 hover:to-academy-yellow text-white px-6"
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
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-yellow w-5 h-5" />
              <Input
                type="text"
                placeholder="البحث برقم الشهادة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 h-12 border-academy-yellow/30 focus:border-academy-yellow focus:ring-academy-yellow/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 bg-academy-yellow/10 rounded-xl ml-4">
                  <Hash className="w-8 h-8 text-academy-yellow" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-academy-dark-gray">{certificates.length}</p>
                  <p className="text-academy-gray font-medium">إجمالي الشهادات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl ml-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-academy-dark-gray">{certificates.length}</p>
                  <p className="text-academy-gray font-medium">الشهادات المعتمدة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl ml-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-academy-dark-gray">
                    {
                      certificates.filter(
                        (cert) => new Date(cert.issue_date).getFullYear() === new Date().getFullYear(),
                      ).length
                    }
                  </p>
                  <p className="text-academy-gray font-medium">شهادات هذا العام</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-academy-yellow mx-auto mb-4" />
              <p className="text-academy-gray">جاري تحميل الشهادات...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredCertificates.length === 0 ? (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center py-16">
                  <Hash className="w-16 h-16 text-academy-yellow mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-academy-dark-gray mb-2">
                    {searchTerm ? "لا توجد شهادات تطابق البحث" : "لا توجد شهادات مضافة بعد"}
                  </h3>
                  <p className="text-academy-gray">
                    {searchTerm ? "جرب البحث بكلمات مختلفة" : "ابدأ بإضافة أول شهادة"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredCertificates.map((certificate) => (
                <Card
                  key={certificate.id}
                  className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1 mb-4 md:mb-0">
                        <div className="flex items-center mb-3">
                          <Hash className="w-5 h-5 text-academy-yellow ml-2" />
                          <span className="font-bold text-lg text-academy-dark-gray">
                            {certificate.certificate_number}
                          </span>
                          <Badge className="mr-3 bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1">
                            معتمدة
                          </Badge>
                        </div>
                        <div className="flex items-center text-academy-gray">
                          <Calendar className="w-4 h-4 ml-2" />
                          <span>تاريخ الإصدار: {formatDate(certificate.issue_date)}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3 space-x-reverse">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(certificate)}
                          className="border-academy-yellow text-academy-yellow hover:bg-academy-yellow hover:text-white"
                        >
                          <Edit className="w-4 h-4 ml-1" />
                          تعديل
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(certificate)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-academy-dark-gray text-center">تعديل الشهادة</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-academy-dark-gray mb-3">رقم الشهادة *</label>
                  <div className="relative">
                    <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-yellow w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="أدخل رقم الشهادة"
                      value={formData.certificateNumber}
                      onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                      className="pr-12 h-12 border-academy-yellow/30 focus:border-academy-yellow focus:ring-academy-yellow/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-academy-dark-gray mb-3">
                    صورة الشهادة الجديدة (اختياري)
                  </label>
                  <div className="relative">
                    <div className="border-2 border-dashed border-academy-yellow/30 rounded-lg p-6 text-center hover:border-academy-yellow/50 transition-colors">
                      <Upload className="w-12 h-12 text-academy-yellow mx-auto mb-4" />
                      <p className="text-academy-gray mb-2">اسحب وأفلت صورة الشهادة الجديدة هنا أو</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-academy-yellow text-academy-yellow hover:bg-academy-yellow hover:text-white bg-transparent"
                        onClick={() => document.getElementById("certificate-edit-upload")?.click()}
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
                        <p className="text-sm text-academy-yellow mt-2">تم اختيار: {formData.certificateImage.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-academy-dark-gray mb-3">تاريخ الإصدار</label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-yellow w-5 h-5" />
                    <Input
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="pr-12 h-12 border-academy-yellow/30 focus:border-academy-yellow focus:ring-academy-yellow/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                  disabled={isSubmitting}
                  className="px-6"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-academy-yellow to-academy-yellow/90 hover:from-academy-yellow/90 hover:to-academy-yellow text-white px-6"
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
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl text-center text-red-600">تأكيد الحذف</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-academy-gray text-lg">هل أنت متأكد من حذف الشهادة رقم</p>
                <p className="font-bold text-academy-dark-gray text-xl mt-2">
                  "{selectedCertificate?.certificate_number}"؟
                </p>
                <p className="text-sm text-red-600 mt-4 bg-red-50 p-3 rounded-lg">⚠️ هذا الإجراء لا يمكن التراجع عنه</p>
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isSubmitting}
                  className="px-6"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white px-6"
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
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                {result?.success ? "تم بنجاح! 🎉" : "حدث خطأ ❌"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center space-x-4 space-x-reverse p-6">
              {result?.success ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-green-800 mb-2">{result?.message}</p>
                  <p className="text-green-600">تم تنفيذ العملية بنجاح</p>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-red-800 mb-2">{result?.message}</p>
                  <p className="text-red-600">يرجى المحاولة مرة أخرى</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
