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
  Shield,
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
    <div className="min-h-screen bg-gradient-to-br from-academy-gray via-white to-academy-blue-50/30 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="text-center md:text-right">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-academy-blue to-academy-blue-700 bg-clip-text text-transparent mb-3">
              إدارة الشهادات
            </h1>
            <p className="text-xl text-academy-dark-gray">إدارة شهادات الأكاديمية وإضافة شهادات جديدة</p>
          </div>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button
                className="mt-6 md:mt-0 bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-academy-gold-dark/20"
                onClick={resetForm}
              >
                <Plus className="w-5 h-5 mr-2" />
                إضافة شهادة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-2 border-academy-blue/10 shadow-2xl">
              <DialogHeader className="text-center">
                <DialogTitle className="text-2xl font-bold text-academy-blue flex items-center justify-center gap-3">
                  <Award className="w-8 h-8 text-academy-gold" />
                  إضافة شهادة جديدة
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-academy-blue mb-3 flex items-center gap-2">
                      <Hash className="w-4 h-4 text-academy-gold" />
                      رقم الشهادة *
                    </label>
                    <div className="relative">
                      <Hash className="absolute right-4 top-1/2 transform -translate-y-1/2 text-academy-blue/60 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="أدخل رقم الشهادة"
                        value={formData.certificateNumber}
                        onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                        className="pr-14 h-14 border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-academy-blue mb-3 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-academy-gold" />
                      صورة الشهادة *
                    </label>
                    <div className="relative">
                      <div className="border-2 border-dashed border-academy-blue/30 rounded-2xl p-8 text-center hover:border-academy-blue/50 transition-all duration-300 bg-gradient-to-br from-academy-blue-50/50 to-academy-gold-50/30">
                        <Upload className="w-16 h-16 text-academy-blue/60 mx-auto mb-4" />
                        <p className="text-academy-dark-gray mb-3 text-lg">اسحب وأفلت صورة الشهادة هنا أو</p>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-2 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white bg-transparent rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:-translate-y-1"
                          onClick={() => document.getElementById("certificate-upload")?.click()}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
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
                          <p className="text-sm text-academy-blue mt-3 font-medium">
                            تم اختيار: {formData.certificateImage.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-academy-blue mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-academy-gold" />
                      تاريخ الإصدار
                    </label>
                    <div className="relative">
                      <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-academy-blue/60 w-5 h-5" />
                      <Input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                        className="pr-14 h-14 border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 space-x-reverse pt-8 border-t border-academy-blue/20">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                    disabled={isSubmitting}
                    className="px-8 py-3 border-2 border-academy-blue/20 text-academy-blue hover:bg-academy-blue hover:text-white rounded-xl font-semibold transition-all duration-300"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-academy-blue to-academy-blue-700 hover:from-academy-blue-700 hover:to-academy-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        جاري الإضافة...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
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
        <Card className="mb-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl">
          <CardContent className="pt-8 pb-6">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-academy-blue/60 w-6 h-6" />
              <Input
                type="text"
                placeholder="البحث برقم الشهادة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-16 h-14 border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 text-lg bg-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-academy-blue to-academy-blue-700 text-white rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="pt-8 pb-6">
              <div className="flex items-center text-center">
                <div className="p-4 bg-academy-gold/20 rounded-2xl ml-4">
                  <Hash className="w-10 h-10 text-academy-gold" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-academy-gold">{certificates.length}</p>
                  <p className="text-academy-blue-100 font-medium text-lg">إجمالي الشهادات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="pt-8 pb-6">
              <div className="flex items-center text-center">
                <div className="p-4 bg-green-100/20 rounded-2xl ml-4">
                  <Shield className="w-10 h-10 text-green-100" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-green-100">{certificates.length}</p>
                  <p className="text-green-100 font-medium text-lg">الشهادات المعتمدة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-academy-gold to-academy-gold-light text-academy-blue rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="pt-8 pb-6">
              <div className="flex items-center text-center">
                <div className="p-4 bg-academy-blue/20 rounded-2xl ml-4">
                  <Calendar className="w-10 h-10 text-academy-blue" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-academy-blue">
                    {
                      certificates.filter(
                        (cert) => new Date(cert.issue_date).getFullYear() === new Date().getFullYear(),
                      ).length
                    }
                  </p>
                  <p className="text-academy-blue font-medium text-lg">شهادات هذا العام</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-16 h-16 animate-spin text-academy-blue mx-auto mb-6" />
              <p className="text-xl text-academy-dark-gray">جاري تحميل الشهادات...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredCertificates.length === 0 ? (
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl">
                <CardContent className="pt-8 pb-6 text-center py-20">
                  <FileText className="w-20 h-20 text-academy-blue/40 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-academy-blue mb-3">
                    {searchTerm ? "لا توجد شهادات تطابق البحث" : "لا توجد شهادات مضافة بعد"}
                  </h3>
                  <p className="text-lg text-academy-dark-gray">
                    {searchTerm ? "جرب البحث بكلمات مختلفة" : "ابدأ بإضافة أول شهادة"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredCertificates.map((certificate) => (
                <Card
                  key={certificate.id}
                  className="shadow-xl border-2 border-academy-blue/10 bg-white/90 backdrop-blur-sm rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-academy-gold to-academy-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"></div>
                  
                  <CardContent className="pt-8 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1 mb-6 md:mb-0">
                        <div className="flex items-center mb-4">
                          <Hash className="w-6 h-6 text-academy-gold ml-3" />
                          <span className="font-bold text-2xl text-academy-blue">
                            {certificate.certificate_number}
                          </span>
                          <Badge className="mr-4 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            معتمدة
                          </Badge>
                        </div>
                        <div className="flex items-center text-academy-dark-gray text-lg">
                          <Calendar className="w-5 h-5 ml-3 text-academy-gold" />
                          <span>تاريخ الإصدار: {formatDate(certificate.issue_date)}</span>
                        </div>
                      </div>

                      <div className="flex space-x-4 space-x-reverse">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => openEditDialog(certificate)}
                          className="border-2 border-academy-blue/20 text-academy-blue hover:bg-academy-blue hover:text-white rounded-xl font-semibold px-6 py-3 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          تعديل
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => openDeleteDialog(certificate)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-red-200 hover:border-red-300 rounded-xl font-semibold px-6 py-3 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-2 border-academy-blue/10 shadow-2xl">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold text-academy-blue flex items-center justify-center gap-3">
                <Edit className="w-8 h-8 text-academy-gold" />
                تعديل الشهادة
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-6">
              <div className="space-y-6">
                <div> 
                  <label className="block text-sm font-semibold text-academy-blue mb-3 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-academy-gold" />
                    رقم الشهادة *
                  </label>
                  <div className="relative">
                    <Hash className="absolute right-4 top-1/2 transform -translate-y-1/2 text-academy-blue/60 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="أدخل رقم الشهادة"
                      value={formData.certificateNumber}
                      onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                      className="pr-14 h-14 border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-academy-blue mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-academy-gold" />
                    صورة الشهادة الجديدة (اختياري)
                  </label>
                  <div className="relative">
                    <div className="border-2 border-dashed border-academy-blue/30 rounded-2xl p-8 text-center hover:border-academy-blue/50 transition-all duration-300 bg-gradient-to-br from-academy-blue-50/50 to-academy-gold-50/30">
                      <Upload className="w-16 h-16 text-academy-blue/60 mx-auto mb-4" />
                      <p className="text-academy-dark-gray mb-3 text-lg">اسحب وأفلت صورة الشهادة الجديدة هنا أو</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-2 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white bg-transparent rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:-translate-y-1"
                        onClick={() => document.getElementById("certificate-edit-upload")?.click()}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
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
                        <p className="text-sm text-academy-blue mt-3 font-medium">تم اختيار: {formData.certificateImage.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-academy-blue mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-academy-gold" />
                    تاريخ الإصدار
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-academy-blue/60 w-5 h-5" />
                    <Input
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="pr-14 h-14 border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white text-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse pt-8 border-t border-academy-blue/20">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                  disabled={isSubmitting}
                  className="px-8 py-3 border-2 border-academy-blue/20 text-academy-blue hover:bg-academy-blue hover:text-white rounded-xl font-semibold transition-all duration-300"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-academy-blue to-academy-blue-700 hover:from-academy-blue-700 hover:to-academy-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      جاري التحديث...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
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
          <DialogContent className="max-w-md bg-white rounded-3xl border-2 border-red-100 shadow-2xl">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold text-red-600 flex items-center justify-center gap-3">
                <XCircle className="w-8 h-8 text-red-500" />
                تأكيد الحذف
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-academy-dark-gray text-lg mb-3">هل أنت متأكد من حذف الشهادة رقم</p>
                <p className="font-bold text-academy-blue text-2xl mb-4">
                  "{selectedCertificate?.certificate_number}"؟
                </p>
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-2xl border-2 border-red-200">
                  <p className="text-sm text-red-700 font-semibold">⚠️ هذا الإجراء لا يمكن التراجع عنه</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 space-x-reverse">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isSubmitting}
                  className="px-8 py-3 border-2 border-academy-blue/20 text-academy-blue hover:bg-academy-blue hover:text-white rounded-xl font-semibold transition-all duration-300"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      جاري الحذف...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
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
          <DialogContent className="max-w-md bg-white rounded-3xl border-2 border-academy-blue/10 shadow-2xl">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold text-center">
                {result?.success ? (
                  <span className="text-green-600 flex items-center justify-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    تم بنجاح! 🎉
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center justify-center gap-3">
                    <XCircle className="w-8 h-8 text-red-500" />
                    حدث خطأ ❌
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center p-8">
              {result?.success ? (
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <p className="text-xl font-bold text-green-800 mb-3">{result?.message}</p>
                  <p className="text-green-600 text-lg">تم تنفيذ العملية بنجاح</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <p className="text-xl font-bold text-red-800 mb-3">{result?.message}</p>
                  <p className="text-red-600 text-lg">يرجى المحاولة مرة أخرى</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
