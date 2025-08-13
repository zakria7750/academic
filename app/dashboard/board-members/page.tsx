"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type BoardMember } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Upload, X, Check, AlertCircle, Users } from "lucide-react"
import Image from "next/image"

export default function BoardMembersManagement() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    experience: "",
    image: null as File | null,
  })

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
        position: formData.position,
        experience: formData.experience,
        image_url: imageUrl,
      }

      if (editingMember) {
        // Update existing member
        const { error } = await supabase.from("board_members").update(memberData).eq("id", editingMember.id)

        if (error) throw error
        showMessage("success", "تم تحديث العضو بنجاح")
      } else {
        // Add new member
        const { error } = await supabase.from("board_members").insert([memberData])

        if (error) throw error
        showMessage("success", "تم إضافة العضو بنجاح")
      }

      // Reset form and refresh data
      resetForm()
      fetchBoardMembers()
    } catch (error) {
      console.error("Error saving member:", error)
      showMessage("error", "حدث خطأ في حفظ البيانات")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العضو؟")) return

    try {
      const { error } = await supabase.from("board_members").delete().eq("id", id)

      if (error) throw error
      showMessage("success", "تم حذف العضو بنجاح")
      fetchBoardMembers()
    } catch (error) {
      console.error("Error deleting member:", error)
      showMessage("error", "حدث خطأ في حذف العضو")
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
                  <Users className="text-academy-gold" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">إدارة مجلس الإدارة</h1>
                  <p className="text-white/80 text-lg">إضافة وتعديل وحذف أعضاء مجلس الإدارة</p>
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

      {/* Enhanced Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 form-modal z-50 flex items-center justify-center p-4 slide-up">
          <Card className="form-container w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
            <CardHeader className="border-b border-academy-blue-100 bg-gradient-to-r from-academy-blue-50 to-academy-gold-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-academy-blue/10 rounded-lg flex items-center justify-center">
                    <Users className="text-academy-blue" size={20} />
                  </div>
                  <CardTitle className="text-academy-blue text-xl font-bold">
                    {editingMember ? "تعديل عضو مجلس الإدارة" : "إضافة عضو جديد"}
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
                    placeholder="أدخل اسم العضو الكامل"
                  />
                </div>

                {/* Enhanced Position Field */}
                <div>
                  <Label htmlFor="position" className="text-academy-blue font-bold text-lg mb-3 block">
                    منصب العضو *
                  </Label>
                  <Input
                    id="position"
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                    className="form-input mt-2 h-12 text-lg rounded-xl border-2"
                    placeholder="مثال: رئيس مجلس الإدارة، نائب الرئيس"
                  />
                </div>

                {/* Enhanced Experience Field */}
                <div>
                  <Label htmlFor="experience" className="text-academy-blue font-bold text-lg mb-3 block">
                    خبرة العضو *
                  </Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                    rows={5}
                    className="form-input mt-2 text-lg rounded-xl border-2 resize-none"
                    placeholder="أدخل وصف مفصل لخبرة العضو ومؤهلاته الأكاديمية والمهنية"
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

      {/* Enhanced Board Members Grid */}
      <div className="container mx-auto px-4 py-12">
        {boardMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {boardMembers.map((member) => (
              <Card key={member.id} className="member-card group border-0 shadow-lg hover:shadow-2xl">
                <CardContent className="p-0">
                  {/* Enhanced Member Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-xl">
                    <Image
                      src={member.image_url || "/placeholder.svg?height=300&width=300&text=عضو+المجلس"}
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
                        onClick={() => handleDelete(member.id)}
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
