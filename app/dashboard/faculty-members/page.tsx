"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type FacultyMember } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Upload, X, Check, AlertCircle, GraduationCap } from "lucide-react"
import Image from "next/image"

export default function FacultyMembersManagement() {
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<FacultyMember | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    biography: "",
    image: null as File | null,
  })

  useEffect(() => {
    fetchFacultyMembers()
  }, [])

  const fetchFacultyMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("faculty_members")
        .select("*")
        .order("created_at", { ascending: true })

      if (error) throw error
      setFacultyMembers(data || [])
    } catch (error) {
      console.error("Error fetching faculty members:", error)
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
      const filePath = `faculty-members/${fileName}`

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
      let imageUrl = editingMember?.image_url || null

      // Upload new image if provided
      if (formData.image) {
        const uploadedUrl = await uploadImage(formData.image)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          throw new Error("فشل في رفع الصورة")
        }
      }

      const memberData = {
        name: formData.name,
        specialization: formData.specialization,
        biography: formData.biography,
        image_url: imageUrl,
      }

      if (editingMember) {
        // Update existing member
        const { error } = await supabase.from("faculty_members").update(memberData).eq("id", editingMember.id)

        if (error) throw error
        showMessage("success", "تم تحديث عضو هيئة التدريس بنجاح")
      } else {
        // Add new member
        const { error } = await supabase.from("faculty_members").insert([memberData])

        if (error) throw error
        showMessage("success", "تم إضافة عضو هيئة التدريس بنجاح")
      }

      // Reset form and refresh data
      resetForm()
      fetchFacultyMembers()
    } catch (error) {
      console.error("Error saving member:", error)
      showMessage("error", "حدث خطأ في حفظ البيانات")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("faculty_members").delete().eq("id", id)

      if (error) throw error
      showMessage("success", "تم حذف عضو هيئة التدريس بنجاح")
      fetchFacultyMembers()
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting member:", error)
      showMessage("error", "حدث خطأ في حذف العضو")
    }
  }

  const handleEdit = (member: FacultyMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      specialization: member.specialization,
      biography: member.biography,
      image: null,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      biography: "",
      image: null,
    })
    setEditingMember(null)
    setShowForm(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

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
    <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-academy-blue-dark via-academy-blue to-academy-blue-light shadow-xl border-b border-academy-gold/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-academy-gold/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap className="text-academy-gold" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">إدارة هيئة التدريس</h1>
                  <p className="text-white/80 text-lg">إضافة وتعديل وحذف أعضاء هيئة التدريس</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="btn-primary text-academy-blue font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus size={20} className="ml-2" />
              إضافة عضو جديد
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Success/Error Messages */}
      {message && (
        <div className="container mx-auto px-4 py-4">
          <div
            className={`flex items-center p-4 rounded-xl shadow-lg slide-up ${
              message.type === "success"
                ? "alert-success text-green-800"
                : "alert-error text-red-800"
            }`}
          >
            {message.type === "success" ? (
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                <Check size={16} className="text-green-600" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-3">
                <AlertCircle size={16} className="text-red-600" />
              </div>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Enhanced Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 delete-modal z-50 flex items-center justify-center p-4 slide-up">
          <Card className="delete-confirm-card w-full max-w-md border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-500" size={32} />
              </div>
              <CardTitle className="text-academy-blue text-2xl font-bold">تأكيد الحذف</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="text-academy-dark-gray text-lg mb-8 leading-relaxed">
                هل أنت متأكد من حذف هذا العضو؟<br />
                <span className="text-red-600 font-semibold">لا يمكن التراجع عن هذا الإجراء.</span>
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="bg-red-500 text-white hover:bg-red-600 font-bold text-lg px-6 py-3 rounded-xl flex-1 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Trash2 size={20} className="mr-2" />
                  حذف نهائياً
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn-secondary text-academy-blue font-bold text-lg px-6 py-3 rounded-xl flex-1 hover:scale-105 transition-all duration-300"
                >
                  <X size={20} className="mr-2" />
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 form-modal z-50 flex items-center justify-center p-4 slide-up">
          <Card className="form-container w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
            <CardHeader className="border-b border-academy-blue-100 bg-gradient-to-r from-academy-blue-50 to-academy-gold-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-academy-blue/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="text-academy-blue" size={20} />
                  </div>
                  <CardTitle className="text-academy-blue text-xl font-bold">
                    {editingMember ? "تعديل عضو هيئة التدريس" : "إضافة عضو جديد"}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetForm}
                  className="text-academy-dark-gray hover:text-academy-blue hover:bg-academy-blue/5 rounded-lg"
                >
                  <X size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Enhanced Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-academy-blue font-bold text-lg mb-3 block">
                    صورة العضو
                  </Label>
                  <div className="mt-2">
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <label
                      htmlFor="image"
                      className="file-upload-area flex flex-col items-center justify-center w-full h-40 rounded-xl cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-16 h-16 bg-academy-gold/20 rounded-full flex items-center justify-center mb-4">
                          <Upload className="text-academy-gold" size={24} />
                        </div>
                        <span className="text-academy-blue font-semibold text-lg mb-2">
                          {formData.image ? formData.image.name : "اختر صورة العضو"}
                        </span>
                        <span className="text-academy-dark-gray text-sm">PNG, JPG أو JPEG (الحد الأقصى 5MB)</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Enhanced Name Field */}
                <div>
                  <Label htmlFor="name" className="text-academy-blue font-bold text-lg mb-3 block">
                    اسم العضو *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="form-input mt-2 h-12 text-lg rounded-xl border-2"
                    placeholder="أدخل اسم عضو هيئة التدريس الكامل"
                  />
                </div>

                {/* Enhanced Specialization Field */}
                <div>
                  <Label htmlFor="specialization" className="text-academy-blue font-bold text-lg mb-3 block">
                    التخصص *
                  </Label>
                  <Input
                    id="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    required
                    className="form-input mt-2 h-12 text-lg rounded-xl border-2"
                    placeholder="مثال: إدارة الأعمال، التسويق، المحاسبة"
                  />
                </div>

                {/* Enhanced Biography Field */}
                <div>
                  <Label htmlFor="biography" className="text-academy-blue font-bold text-lg mb-3 block">
                    السيرة الموجزة *
                  </Label>
                  <Textarea
                    id="biography"
                    value={formData.biography}
                    onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                    required
                    rows={6}
                    className="form-input mt-2 text-lg rounded-xl border-2 resize-none"
                    placeholder="أدخل السيرة الموجزة للعضو شاملة المؤهلات الأكاديمية والخبرات المهنية"
                  />
                </div>

                {/* Enhanced Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-academy-blue-100">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl flex-1 hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner w-5 h-5 border-2 border-academy-blue border-t-transparent rounded-full mr-3"></div>
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        {editingMember ? "تحديث العضو" : "إضافة العضو"}
                        <Check size={20} className="mr-2" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl flex-1 hover:scale-105 transition-all duration-300"
                  >
                    <X size={20} className="mr-2" />
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Faculty Members Grid */}
      <div className="container mx-auto px-4 py-12">
        {facultyMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((member) => (
              <Card key={member.id} className="member-card group border-0 shadow-lg hover:shadow-2xl">
                <CardContent className="p-0">
                  {/* Enhanced Member Image */}
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <Image
                      src={member.image_url || "/placeholder.svg?height=400&width=400&text=عضو+هيئة+التدريس"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="action-buttons absolute top-3 left-3 flex gap-2">
                      <Button
                        size="icon"
                        onClick={() => handleEdit(member)}
                        className="w-10 h-10 bg-academy-gold/90 text-academy-blue hover:bg-academy-gold shadow-lg backdrop-blur-sm rounded-xl"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => setShowDeleteConfirm(member.id)}
                        className="w-10 h-10 bg-red-500/90 text-white hover:bg-red-600 shadow-lg backdrop-blur-sm rounded-xl"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{member.name}</h3>
                    </div>
                  </div>

                  {/* Enhanced Member Info */}
                  <div className="p-6">
                    <div className="bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 text-academy-blue px-4 py-2 rounded-xl text-sm font-bold mb-4 inline-block border border-academy-gold/30">
                      {member.specialization}
                    </div>
                    <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-4">{member.biography}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 fade-in">
            <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <GraduationCap className="text-academy-gold" size={48} />
            </div>
            <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد أعضاء</h3>
            <p className="text-academy-dark-gray text-lg mb-8 max-w-md mx-auto">
              لم يتم إضافة أعضاء هيئة التدريس بعد. ابدأ بإضافة أول عضو.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="btn-primary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Plus size={24} className="ml-2" />
              إضافة أول عضو
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
