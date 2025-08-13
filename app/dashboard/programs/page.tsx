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
      <div className="min-h-screen bg-academy-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-academy-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-academy-gray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark"></div>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-academy-blue">إدارة البرامج التعليمية</h1>
              <p className="text-academy-dark-gray">إضافة وتعديل وحذف البرامج التعليمية</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold"
            >
              <Plus size={20} className="ml-2" />
              إضافة برنامج جديد
            </Button>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {message && (
        <div className="container mx-auto px-4 py-4">
          <div
            className={`flex items-center p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <Check size={20} className="ml-2" />
            ) : (
              <AlertCircle size={20} className="ml-2" />
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-academy-blue text-center">تأكيد الحذف</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-500" size={24} />
              </div>
              <p className="text-academy-dark-gray mb-6">
                هل أنت متأكد من حذف هذا البرنامج؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="bg-red-500 text-white hover:bg-red-600 flex-1"
                >
                  حذف
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(null)}
                  variant="outline"
                  className="border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white flex-1 bg-transparent"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-academy-blue">
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
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Program Type */}
                <div>
                  <Label htmlFor="type" className="text-academy-blue font-semibold">
                    نوع البرنامج *
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "masters" | "doctorate" | "diploma") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger className="mt-2 border-academy-gold/30 focus:border-academy-gold">
                      <SelectValue placeholder="اختر نوع البرنامج" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masters">ماجستير مهني</SelectItem>
                      <SelectItem value="doctorate">دكتوراه مهنية</SelectItem>
                      <SelectItem value="diploma">دبلوم مهني</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-academy-blue font-semibold">
                    صورة البرنامج
                  </Label>
                  <div className="mt-2">
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-academy-gold rounded-lg cursor-pointer hover:bg-academy-gold/5 transition-colors duration-200"
                    >
                      <Upload className="text-academy-gold mb-2" size={24} />
                      <span className="text-academy-blue font-medium">
                        {formData.image ? formData.image.name : "اختر صورة البرنامج"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Program Name */}
                <div>
                  <Label htmlFor="name" className="text-academy-blue font-semibold">
                    اسم البرنامج *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold"
                    placeholder="أدخل اسم البرنامج"
                  />
                </div>

                {/* Duration (not for diploma) */}
                {formData.type !== "diploma" && (
                  <div>
                    <Label htmlFor="duration" className="text-academy-blue font-semibold">
                      مدة البرنامج *
                    </Label>
                    <Input
                      id="duration"
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required={formData.type !== "diploma"}
                      className="mt-2 border-academy-gold/30 focus:border-academy-gold"
                      placeholder="مثال: سنتان"
                    />
                  </div>
                )}

                {/* Hours */}
                <div>
                  <Label htmlFor="hours" className="text-academy-blue font-semibold">
                    عدد الساعات *
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold"
                    placeholder="أدخل عدد الساعات"
                  />
                </div>

                {/* Education System (not for diploma) */}
                {formData.type !== "diploma" && (
                  <div>
                    <Label htmlFor="education_system" className="text-academy-blue font-semibold">
                      نظام التعليم *
                    </Label>
                    <Select
                      value={formData.education_system}
                      onValueChange={(value) => setFormData({ ...formData, education_system: value })}
                    >
                      <SelectTrigger className="mt-2 border-academy-gold/30 focus:border-academy-gold">
                        <SelectValue placeholder="اختر نظام التعليم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="تعليم حضوري">تعليم حضوري</SelectItem>
                        <SelectItem value="تعليم إلكتروني">تعليم إلكتروني</SelectItem>
                        <SelectItem value="تعليم مدمج">تعليم مدمج</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Fees */}
                <div>
                  <Label htmlFor="fees" className="text-academy-blue font-semibold">
                    الرسوم الدراسية (ر.س) *
                  </Label>
                  <Input
                    id="fees"
                    type="number"
                    step="0.01"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold"
                    placeholder="أدخل الرسوم الدراسية"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold flex-1"
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
                    className="border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white flex-1 bg-transparent"
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            onClick={() => setActiveTab("masters")}
            className={`${
              activeTab === "masters"
                ? "bg-academy-blue text-white"
                : "bg-white text-academy-blue border border-academy-blue"
            } font-bold`}
          >
            برامج الماجستير ({programs.filter((p) => p.type === "masters").length})
          </Button>
          <Button
            onClick={() => setActiveTab("doctorate")}
            className={`${
              activeTab === "doctorate"
                ? "bg-academy-blue text-white"
                : "bg-white text-academy-blue border border-academy-blue"
            } font-bold`}
          >
            برامج الدكتوراه ({programs.filter((p) => p.type === "doctorate").length})
          </Button>
          <Button
            onClick={() => setActiveTab("diploma")}
            className={`${
              activeTab === "diploma"
                ? "bg-academy-blue text-white"
                : "bg-white text-academy-blue border border-academy-blue"
            } font-bold`}
          >
            الدبلومات ({programs.filter((p) => p.type === "diploma").length})
          </Button>
        </div>

        {/* Programs List */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-0">
                  {/* Program Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image_url || "/placeholder.svg?height=300&width=300&text=برنامج+تعليمي"}
                      alt={program.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Button
                        size="icon"
                        onClick={() => handleEdit(program)}
                        className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 w-8 h-8"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => setShowDeleteConfirm(program.id)}
                        className="bg-red-500 text-white hover:bg-red-600 w-8 h-8"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2 bg-academy-gold text-academy-blue px-2 py-1 rounded-full text-xs font-bold">
                      {program.type === "masters" ? "ماجستير" : program.type === "doctorate" ? "دكتوراه" : "دبلوم"}
                    </div>
                  </div>

                  {/* Program Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-academy-blue mb-2 line-clamp-2">{program.name}</h3>
                    <div className="space-y-2 text-sm">
                      {program.duration && (
                        <div className="flex justify-between">
                          <span className="text-academy-dark-gray">المدة:</span>
                          <span className="text-academy-blue font-semibold">{program.duration}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-academy-dark-gray">الساعات:</span>
                        <span className="text-academy-blue font-semibold">{program.hours} ساعة</span>
                      </div>
                      {program.education_system && (
                        <div className="flex justify-between">
                          <span className="text-academy-dark-gray">النظام:</span>
                          <span className="text-academy-blue font-semibold">{program.education_system}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t">
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
            <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد برامج</h3>
            <p className="text-academy-dark-gray mb-6">
              لم يتم إضافة برامج{" "}
              {activeTab === "masters" ? "الماجستير" : activeTab === "doctorate" ? "الدكتوراه" : "الدبلومات"} بعد.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold"
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
