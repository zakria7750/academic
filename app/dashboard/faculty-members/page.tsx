"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type FacultyMember } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, GraduationCap } from "lucide-react"
import Image from "next/image"
import { EnhancedFormModal } from "@/components/ui/enhanced-form-modal"
import { EnhancedImageUpload } from "@/components/ui/enhanced-image-upload"
import { EnhancedFormField } from "@/components/ui/enhanced-form-field"
import { EnhancedDeleteConfirmation } from "@/components/ui/enhanced-delete-confirmation"
import { EnhancedMessage } from "@/components/ui/enhanced-success-message"

export default function FacultyMembersManagement() {
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<FacultyMember | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    biography: "",
    image: null as File | null,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

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
      setMessage({ type: "error", text: "حدث خطأ في تحميل البيانات" })
    } finally {
      setIsLoading(false)
    }
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

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = "اسم العضو مطلوب"
    }
    
    if (!formData.specialization.trim()) {
      errors.specialization = "التخصص مطلوب"
    }
    
    if (!formData.biography.trim()) {
      errors.biography = "السيرة الموجزة مطلوبة"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

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
        setMessage({ type: "success", text: "تم تحديث عضو هيئة التدريس بنجاح" })
      } else {
        // Add new member
        const { error } = await supabase.from("faculty_members").insert([memberData])

        if (error) throw error
        setMessage({ type: "success", text: "تم إضافة عضو هيئة التدريس بنجاح" })
      }

      // Reset form and refresh data
      resetForm()
      fetchFacultyMembers()
    } catch (error) {
      console.error("Error saving member:", error)
      setMessage({ type: "error", text: "حدث خطأ في حفظ البيانات" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const { error } = await supabase.from("faculty_members").delete().eq("id", id)

      if (error) throw error
      setMessage({ type: "success", text: "تم حذف عضو هيئة التدريس بنجاح" })
      fetchFacultyMembers()
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting member:", error)
      setMessage({ type: "error", text: "حدث خطأ في حذف العضو" })
    } finally {
      setIsDeleting(false)
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
    setFormErrors({})
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
    setFormErrors({})
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
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
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
          <EnhancedMessage
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        </div>
      )}

      {/* Enhanced Add/Edit Form Modal */}
      <EnhancedFormModal
        isOpen={showForm}
        onClose={resetForm}
        title={editingMember ? "تعديل عضو هيئة التدريس" : "إضافة عضو جديد"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <EnhancedImageUpload
            onImageChange={(file) => {
              setFormData({ ...formData, image: file })
              if (formErrors.image) {
                setFormErrors({ ...formErrors, image: "" })
              }
            }}
            currentImageUrl={editingMember?.image_url}
            label="صورة العضو"
            error={formErrors.image}
            isOval={true}
          />

          <EnhancedFormField
            type="input"
            label="اسم العضو"
            placeholder="أدخل اسم عضو هيئة التدريس الكامل"
            value={formData.name}
            onChange={(value) => {
              setFormData({ ...formData, name: value })
              if (formErrors.name) {
                setFormErrors({ ...formErrors, name: "" })
              }
            }}
            required
            error={formErrors.name}
          />

          <EnhancedFormField
            type="input"
            label="التخصص"
            placeholder="مثال: إدارة الأعمال، التسويق، المحاسبة"
            value={formData.specialization}
            onChange={(value) => {
              setFormData({ ...formData, specialization: value })
              if (formErrors.specialization) {
                setFormErrors({ ...formErrors, specialization: "" })
              }
            }}
            required
            error={formErrors.specialization}
          />

          <EnhancedFormField
            type="textarea"
            label="السيرة الموجزة"
            placeholder="أدخل السيرة الموجزة للعضو شاملة المؤهلات الأكاديمية والخبرات المهنية"
            value={formData.biography}
            onChange={(value) => {
              setFormData({ ...formData, biography: value })
              if (formErrors.biography) {
                setFormErrors({ ...formErrors, biography: "" })
              }
            }}
            rows={6}
            required
            error={formErrors.biography}
          />

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
                editingMember ? "تحديث العضو" : "إضافة العضو"
              )}
            </Button>
            <Button
              type="button"
              onClick={resetForm}
              className="btn-secondary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl flex-1 hover:scale-105 transition-all duration-300"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </EnhancedFormModal>

      {/* Enhanced Faculty Members Grid */}
      <div className="container mx-auto px-4 py-12">
        {facultyMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((member) => (
              <Card key={member.id} className="member-card group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white rounded-2xl">
                <CardContent className="p-0">
                  {/* Enhanced Member Image - Hexagonal Shape with Improved Design */}
                  <div className="relative h-80 bg-gradient-to-br from-academy-blue-50 to-academy-gold-50 flex items-center justify-center overflow-hidden">
                    <div className="relative w-56 h-72">
                      <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-gold opacity-20 rounded-3xl transform rotate-6"></div>
                      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 bg-white">
                        <Image
                          src={member.image_url || "/placeholder.svg?height=400&width=400&text=عضو+هيئة+التدريس"}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                    </div>
                    
                    {/* Action Buttons - Improved Design */}
                    <div className="action-buttons absolute top-4 left-4 flex gap-2">
                      <Button
                        size="icon"
                        onClick={() => handleEdit(member)}
                        className="w-10 h-10 bg-academy-gold/90 text-academy-blue hover:bg-academy-gold shadow-lg backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => setShowDeleteConfirm(member.id)}
                        className="w-10 h-10 bg-red-500/90 text-white hover:bg-red-600 shadow-lg backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0"
                        style={{ transitionDelay: '50ms' }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    
                    {/* Member Name Overlay - Enhanced */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 drop-shadow-lg">{member.name}</h3>
                    </div>
                  </div>

                  {/* Enhanced Member Info */}
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 text-academy-blue px-6 py-3 rounded-full text-sm font-bold border border-academy-gold/30 shadow-sm">
                        {member.specialization}
                      </div>
                    </div>
                    <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-4 text-center">{member.biography}</p>
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
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="btn-primary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Plus size={24} className="ml-2" />
              إضافة أول عضو
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Delete Confirmation */}
      <EnhancedDeleteConfirmation
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
        itemName={facultyMembers.find(m => m.id === showDeleteConfirm)?.name}
        isLoading={isDeleting}
      />
    </div>
  )
}
