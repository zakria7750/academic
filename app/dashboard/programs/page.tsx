"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type Program } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Upload, X, Check, AlertCircle, BookOpen } from "lucide-react"
import Image from "next/image"

export default function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"masters" | "doctorate" | "diploma">("masters")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "masters" as "masters" | "doctorate" | "diploma",
    duration: "",
    hours: "",
    education_system: "",
    fees: "",
    image: null as File | null,
  })

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: true })

      if (error) throw error
      setPrograms(data || [])
    } catch (error) {
      console.error("Error fetching programs:", error)
      showMessage("error", "حدث خطأ في تحميل البيانات")
    } finally {
      setIsLoading(false)
    }
  }

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `programs/${fileName}`

      const { error: uploadError } = await supabase.storage.from("images").upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("images").getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageUrl = editingProgram?.image_url || null

      // Upload new image if provided
      if (formData.image) {
        const uploadedUrl = await uploadImage(formData.image)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          throw new Error("فشل في رفع الصورة")
        }
      }

      const programData = {
        name: formData.name,
        type: formData.type,
        duration: formData.type === "diploma" ? null : formData.duration,
        hours: Number.parseInt(formData.hours),
        education_system: formData.type === "diploma" ? null : formData.education_system,
        fees: Number.parseFloat(formData.fees),
        image_url: imageUrl,
      }

      if (editingProgram) {
        // Update existing program
        const { error } = await supabase.from("programs").update(programData).eq("id", editingProgram.id)

        if (error) throw error
        showMessage("success", "تم تحديث البرنامج بنجاح")
      } else {
        // Add new program
        const { error } = await supabase.from("programs").insert([programData])

        if (error) throw error
        showMessage("success", "تم إضافة البرنامج بنجاح")
      }

      // Reset form and refresh data
      resetForm()
      fetchPrograms()
    } catch (error) {
      console.error("Error saving program:", error)
      showMessage("error", "حدث خطأ في حفظ البيانات")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("programs").delete().eq("id", id)

      if (error) throw error
      showMessage("success", "تم حذف البرنامج بنجاح")
      fetchPrograms()
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting program:", error)
      showMessage("error", "حدث خطأ في حذف البرنامج")
    }
  }

  const handleEdit = (program: Program) => {
    setEditingProgram(program)
    setFormData({
      name: program.name,
      type: program.type,
      duration: program.duration || "",
      hours: program.hours.toString(),
      education_system: program.education_system || "",
      fees: program.fees.toString(),
      image: null,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "masters",
      duration: "",
      hours: "",
      education_system: "",
      fees: "",
      image: null,
    })
    setEditingProgram(null)
    setShowForm(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const filteredPrograms = programs.filter((program) => program.type === activeTab)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-academy-blue-50 to-academy-gold-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <div className="w-16 h-16 border-4 border-academy-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold text-lg">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-blue-50 to-academy-gold-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-academy-gold/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-blue">إدارة البرامج التعليمية</h1>
              <p className="text-academy-dark-gray text-sm sm:text-base">إضافة وتعديل وحذف البرامج التعليمية</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={20} className="ml-2" />
              إضافة برنامج جديد
            </Button>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {message && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div
            className={`flex items-center p-4 rounded-xl shadow-md ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <Check size={20} className="ml-2 flex-shrink-0" />
            ) : (
              <AlertCircle size={20} className="ml-2 flex-shrink-0" />
            )}
            <span className="text-sm sm:text-base">{message.text}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-academy-blue text-xl">تأكيد الحذف</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="text-red-500" size={24} />
              </div>
              <p className="text-academy-dark-gray text-sm sm:text-base">
                هل أنت متأكد من حذف هذا البرنامج؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="bg-red-500 text-white hover:bg-red-600 flex-1 py-2.5"
                >
                  حذف
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(null)}
                  variant="outline"
                  className="border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white flex-1 bg-white py-2.5"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-academy-blue text-lg sm:text-xl">
                  {editingProgram ? "تعديل البرنامج" : "إضافة برنامج جديد"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetForm}
                  className="text-academy-dark-gray hover:text-academy-blue"
                >
                  <X size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Program Type */}
                <div>
                  <Label htmlFor="type" className="text-academy-blue font-semibold text-sm sm:text-base">
                    نوع البرنامج *
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "masters" | "doctorate" | "diploma") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger className="mt-2 border-academy-gold/30 focus:border-academy-gold h-11">
                      <SelectValue placeholder="اختر نوع البرنامج" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="masters">ماجستير مهني</SelectItem>
                      <SelectItem value="doctorate">دكتوراه مهنية</SelectItem>
                      <SelectItem value="diploma">دبلوم مهني</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-academy-blue font-semibold text-sm sm:text-base">
                    صورة البرنامج
                  </Label>
                  <div className="mt-2">
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-academy-gold/50 rounded-xl cursor-pointer hover:bg-academy-gold/5 transition-all duration-200 bg-white"
                    >
                      <Upload className="text-academy-gold mb-2" size={24} />
                      <span className="text-academy-blue font-medium text-sm sm:text-base text-center px-4">
                        {formData.image ? formData.image.name : "اختر صورة البرنامج"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Program Name */}
                <div>
                  <Label htmlFor="name" className="text-academy-blue font-semibold text-sm sm:text-base">
                    اسم البرنامج *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold h-11 bg-white"
                    placeholder="أدخل اسم البرنامج"
                  />
                </div>

                {/* Duration (not for diploma) */}
                {formData.type !== "diploma" && (
                  <div>
                    <Label htmlFor="duration" className="text-academy-blue font-semibold text-sm sm:text-base">
                      مدة البرنامج *
                    </Label>
                    <Input
                      id="duration"
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required={formData.type !== "diploma"}
                      className="mt-2 border-academy-gold/30 focus:border-academy-gold h-11 bg-white"
                      placeholder="مثال: سنتان"
                    />
                  </div>
                )}

                {/* Hours */}
                <div>
                  <Label htmlFor="hours" className="text-academy-blue font-semibold text-sm sm:text-base">
                    عدد الساعات *
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold h-11 bg-white"
                    placeholder="أدخل عدد الساعات"
                  />
                </div>

                {/* Education System (not for diploma) */}
                {formData.type !== "diploma" && (
                  <div>
                    <Label htmlFor="education_system" className="text-academy-blue font-semibold text-sm sm:text-base">
                      نظام التعليم *
                    </Label>
                    <Select
                      value={formData.education_system}
                      onValueChange={(value) => setFormData({ ...formData, education_system: value })}
                    >
                      <SelectTrigger className="mt-2 border-academy-gold/30 focus:border-academy-gold h-11">
                        <SelectValue placeholder="اختر نظام التعليم" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="تعليم حضوري">تعليم حضوري</SelectItem>
                        <SelectItem value="تعليم إلكتروني">تعليم إلكتروني</SelectItem>
                        <SelectItem value="تعليم مدمج">تعليم مدمج</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Fees */}
                <div>
                  <Label htmlFor="fees" className="text-academy-blue font-semibold text-sm sm:text-base">
                    الرسوم الدراسية (ر.س) *
                  </Label>
                  <Input
                    id="fees"
                    type="number"
                    step="0.01"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold h-11 bg-white"
                    placeholder="أدخل الرسوم الدراسية"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold flex-1 py-2.5"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-academy-blue border-t-transparent rounded-full animate-spin ml-2"></div>
                        جاري الحفظ...
                      </>
                    ) : (
                      <>{editingProgram ? "تحديث البرنامج" : "إضافة البرنامج"}</>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white flex-1 bg-white py-2.5"
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Programs Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            onClick={() => setActiveTab("masters")}
            className={`${
              activeTab === "masters"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white/80 text-academy-blue border border-academy-blue/20 hover:bg-academy-blue/5"
            } font-bold px-4 py-2.5 rounded-xl transition-all duration-300 text-sm sm:text-base`}
          >
            برامج الماجستير ({programs.filter((p) => p.type === "masters").length})
          </Button>
          <Button
            onClick={() => setActiveTab("doctorate")}
            className={`${
              activeTab === "doctorate"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white/80 text-academy-blue border border-academy-blue/20 hover:bg-academy-blue/5"
            } font-bold px-4 py-2.5 rounded-xl transition-all duration-300 text-sm sm:text-base`}
          >
            برامج الدكتوراه ({programs.filter((p) => p.type === "doctorate").length})
          </Button>
          <Button
            onClick={() => setActiveTab("diploma")}
            className={`${
              activeTab === "diploma"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white/80 text-academy-blue border border-academy-blue/20 hover:bg-academy-blue/5"
            } font-bold px-4 py-2.5 rounded-xl transition-all duration-300 text-sm sm:text-base`}
          >
            الدبلومات ({programs.filter((p) => p.type === "diploma").length})
          </Button>
        </div>

        {/* Programs List */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  {/* Program Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image_url || "/placeholder.svg?height=300&width=300&text=برنامج+تعليمي"}
                      alt={program.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="icon"
                        onClick={() => handleEdit(program)}
                        className="bg-academy-gold/90 text-academy-blue hover:bg-academy-gold w-8 h-8 shadow-lg"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => setShowDeleteConfirm(program.id)}
                        className="bg-red-500/90 text-white hover:bg-red-600 w-8 h-8 shadow-lg"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <div className="absolute top-3 right-3 bg-academy-gold text-academy-blue px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {program.type === "masters" ? "ماجستير" : program.type === "doctorate" ? "دكتوراه" : "دبلوم"}
                    </div>
                  </div>

                  {/* Program Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-academy-blue mb-2 line-clamp-2 leading-tight">{program.name}</h3>
                    <div className="space-y-2 text-xs sm:text-sm">
                      {program.duration && (
                        <div className="flex justify-between items-center">
                          <span className="text-academy-dark-gray">المدة:</span>
                          <span className="text-academy-blue font-semibold">{program.duration}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-academy-dark-gray">الساعات:</span>
                        <span className="text-academy-blue font-semibold">{program.hours} ساعة</span>
                      </div>
                      {program.education_system && (
                        <div className="flex justify-between items-center">
                          <span className="text-academy-dark-gray">النظام:</span>
                          <span className="text-academy-blue font-semibold text-right">{program.education_system}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2 border-t border-academy-gold/20">
                        <span className="text-academy-dark-gray">الرسوم:</span>
                        <span className="text-academy-gold font-bold">{program.fees.toLocaleString()} ر.س</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-academy-gold" size={48} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-academy-blue mb-4">لا توجد برامج</h3>
            <p className="text-academy-dark-gray mb-6 text-sm sm:text-base">
              لم يتم إضافة برامج{" "}
              {activeTab === "masters" ? "الماجستير" : activeTab === "doctorate" ? "الدكتوراه" : "الدبلومات"} بعد.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-6 py-3 rounded-xl shadow-lg"
            >
              <Plus size={20} className="ml-2" />
              إضافة أول برنامج
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
