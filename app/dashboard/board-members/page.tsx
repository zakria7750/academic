"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type BoardMember } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Upload, X, Check, AlertCircle } from "lucide-react"
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
    <div className="min-h-screen bg-academy-gray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-academy-blue">إدارة مجلس الإدارة</h1>
              <p className="text-academy-dark-gray">إضافة وتعديل وحذف أعضاء مجلس الإدارة</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold"
            >
              <Plus size={20} className="ml-2" />
              إضافة عضو جديد
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

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0  z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-academy-blue">{editingMember ? "تعديل العضو" : "إضافة عضو جديد"}</CardTitle>
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
                {/* Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-academy-blue font-semibold">
                    صورة العضو
                  </Label>
                  <div className="mt-2">
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-academy-gold rounded-lg cursor-pointer hover:bg-academy-gold/5 transition-colors duration-200"
                    >
                      <Upload className="text-academy-gold mb-2" size={24} />
                      <span className="text-academy-blue font-medium">
                        {formData.image ? formData.image.name : "اختر صورة العضو"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-academy-blue font-semibold">
                    اسم العضو *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold"
                    placeholder="أدخل اسم العضو"
                  />
                </div>

                {/* Position */}
                <div>
                  <Label htmlFor="position" className="text-academy-blue font-semibold">
                    منصب العضو *
                  </Label>
                  <Input
                    id="position"
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold"
                    placeholder="أدخل منصب العضو"
                  />
                </div>

                {/* Experience */}
                <div>
                  <Label htmlFor="experience" className="text-academy-blue font-semibold">
                    خبرة العضو *
                  </Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                    rows={4}
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold resize-none"
                    placeholder="أدخل وصف خبرة العضو"
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
                      <>{editingMember ? "تحديث العضو" : "إضافة العضو"}</>
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

      {/* Board Members List */}
      <div className="container mx-auto px-4 py-8">
        {boardMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {boardMembers.map((member) => (
              <Card key={member.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-0">
                  {/* Member Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={member.image_url || "/placeholder.svg?height=300&width=300&text=عضو+المجلس"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Button
                        size="icon"
                        onClick={() => handleEdit(member)}
                        className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 w-8 h-8"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => handleDelete(member.id)}
                        className="bg-red-500 text-white hover:bg-red-600 w-8 h-8"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-academy-blue mb-2 line-clamp-2">{member.name}</h3>
                    <div className="bg-academy-gold text-academy-blue px-2 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                      {member.position}
                    </div>
                    <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-3">{member.experience}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-academy-gold text-4xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد أعضاء</h3>
            <p className="text-academy-dark-gray mb-6">لم يتم إضافة أعضاء مجلس الإدارة بعد.</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold"
            >
              <Plus size={20} className="ml-2" />
              إضافة أول عضو
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
