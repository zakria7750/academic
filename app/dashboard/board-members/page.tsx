"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type BoardMember } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Users } from "lucide-react"
import Image from "next/image"
import { EnhancedFormModal } from "@/components/ui/enhanced-form-modal"
import { EnhancedImageUpload } from "@/components/ui/enhanced-image-upload"
import { EnhancedFormField } from "@/components/ui/enhanced-form-field"
import { EnhancedDeleteConfirmation } from "@/components/ui/enhanced-delete-confirmation"
import { EnhancedMessage } from "@/components/ui/enhanced-success-message"

export default function BoardMembersManagement() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    experience: "",
    image: null as File | null,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchBoardMembers()
  }, [])

  const fetchBoardMembers = async () => {
    try {
      const { data, error } = await supabase.from("board_members").select("*").order("created_at", { ascending: true })

      if (error) throw error
      setBoardMembers(data || [])
    } catch (error) {
      console.error("Error fetching board members:", error)
      setMessage({ type: "error", text: "حدث خطأ في تحميل البيانات" })
    } finally {
      setIsLoading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `board-members/${fileName}`

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
    
    if (!formData.position.trim()) {
      errors.position = "منصب العضو مطلوب"
    }
    
    if (!formData.experience.trim()) {
      errors.experience = "خبرة العضو مطلوبة"
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
        position: formData.position,
        experience: formData.experience,
        image_url: imageUrl,
      }

      if (editingMember) {
        // Update existing member
        const { error } = await supabase.from("board_members").update(memberData).eq("id", editingMember.id)

        if (error) throw error
        setMessage({ type: "success", text: "تم تحديث العضو بنجاح" })
      } else {
        // Add new member
        const { error } = await supabase.from("board_members").insert([memberData])

        if (error) throw error
        setMessage({ type: "success", text: "تم إضافة العضو بنجاح" })
      }

      // Reset form and refresh data
      resetForm()
      fetchBoardMembers()
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
      const { error } = await supabase.from("board_members").delete().eq("id", id)

      if (error) throw error
      setMessage({ type: "success", text: "تم حذف العضو بنجاح" })
      fetchBoardMembers()
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting member:", error)
      setMessage({ type: "error", text: "حدث خطأ في حذف العضو" })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = (member: BoardMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      position: member.position,
      experience: member.experience,
      image: null,
    })
    setFormErrors({})
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      experience: "",
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
                  <Users className="text-academy-gold" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">إدارة مجلس الإدارة</h1>
                  <p className="text-white/80 text-lg">إضافة وتعديل وحذف أعضاء مجلس الإدارة</p>
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
        title={editingMember ? "تعديل عضو مجلس الإدارة" : "إضافة عضو جديد"}
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
          />

          <EnhancedFormField
            type="input"
            label="اسم العضو"
            placeholder="أدخل اسم العضو الكامل"
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
            label="منصب العضو"
            placeholder="مثال: رئيس مجلس الإدارة، نائب الرئيس"
            value={formData.position}
            onChange={(value) => {
              setFormData({ ...formData, position: value })
              if (formErrors.position) {
                setFormErrors({ ...formErrors, position: "" })
              }
            }}
            required
            error={formErrors.position}
          />

          <EnhancedFormField
            type="textarea"
            label="خبرة العضو"
            placeholder="أدخل وصف مفصل لخبرة العضو ومؤهلاته الأكاديمية والمهنية"
            value={formData.experience}
            onChange={(value) => {
              setFormData({ ...formData, experience: value })
              if (formErrors.experience) {
                setFormErrors({ ...formErrors, experience: "" })
              }
            }}
            rows={5}
            required
            error={formErrors.experience}
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

      {/* Enhanced Board Members Grid */}
      <div className="container mx-auto px-4 py-12">
        {boardMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {boardMembers.map((member) => (
              <Card key={member.id} className="member-card group border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0">
                  {/* Enhanced Member Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-xl">
                    <Image
                      src={member.image_url || "/placeholder.svg?height=300&width=300&text=عضو+المجلس"}
                      alt={member.name}
                      fill
                      className="object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 25vw"
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
                      {member.position}
                    </div>
                    <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-4">{member.experience}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 fade-in">
            <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Users className="text-academy-gold" size={48} />
            </div>
            <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد أعضاء</h3>
            <p className="text-academy-dark-gray text-lg mb-8 max-w-md mx-auto">
              لم يتم إضافة أعضاء مجلس الإدارة بعد. ابدأ بإضافة أول عضو.
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
        itemName={boardMembers.find(m => m.id === showDeleteConfirm)?.name}
        isLoading={isDeleting}
      />
    </div>
  )
}
