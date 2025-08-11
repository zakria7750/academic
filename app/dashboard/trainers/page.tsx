"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type Trainer } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Upload, X, Check, AlertCircle, Award } from "lucide-react"
import Image from "next/image"

export default function TrainersManagement() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    image: null as File | null,
  })

  useEffect(() => {
    fetchTrainers()
  }, [])

  const fetchTrainers = async () => {
    try {
      const { data, error } = await supabase.from("trainers").select("*").order("created_at", { ascending: true })

      if (error) throw error
      setTrainers(data || [])
    } catch (error) {
      console.error("Error fetching trainers:", error)
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
      const filePath = `trainers/${fileName}`

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
      let imageUrl = editingTrainer?.image_url || null

      // Upload new image if provided
      if (formData.image) {
        const uploadedUrl = await uploadImage(formData.image)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          throw new Error("فشل في رفع الصورة")
        }
      }

      const trainerData = {
        name: formData.name,
        specialization: formData.specialization,
        image_url: imageUrl,
      }

      if (editingTrainer) {
        // Update existing trainer
        const { error } = await supabase.from("trainers").update(trainerData).eq("id", editingTrainer.id)

        if (error) throw error
        showMessage("success", "تم تحديث المدرب بنجاح")
      } else {
        // Add new trainer
        const { error } = await supabase.from("trainers").insert([trainerData])

        if (error) throw error
        showMessage("success", "تم إضافة المدرب بنجاح")
      }

      // Reset form and refresh data
      resetForm()
      fetchTrainers()
    } catch (error) {
      console.error("Error saving trainer:", error)
      showMessage("error", "حدث خطأ في حفظ البيانات")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("trainers").delete().eq("id", id)

      if (error) throw error
      showMessage("success", "تم حذف المدرب بنجاح")
      fetchTrainers()
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting trainer:", error)
      showMessage("error", "حدث خطأ في حذف المدرب")
    }
  }

  const handleEdit = (trainer: Trainer) => {
    setEditingTrainer(trainer)
    setFormData({
      name: trainer.name,
      specialization: trainer.specialization,
      image: null,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      image: null,
    })
    setEditingTrainer(null)
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
              <h1 className="text-3xl font-bold text-academy-blue">إدارة المدربين المعتمدين</h1>
              <p className="text-academy-dark-gray">إضافة وتعديل وحذف المدربين المعتمدين</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold"
            >
              <Plus size={20} className="ml-2" />
              إضافة مدرب جديد
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
                هل أنت متأكد من حذف هذا المدرب؟ لا يمكن التراجع عن هذا الإجراء.
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
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-academy-blue">
                  {editingTrainer ? "تعديل المدرب" : "إضافة مدرب جديد"}
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
                {/* Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-academy-blue font-semibold">
                    صورة المدرب
                  </Label>
                  <div className="mt-2">
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-academy-gold rounded-lg cursor-pointer hover:bg-academy-gold/5 transition-colors duration-200"
                    >
                      <Upload className="text-academy-gold mb-2" size={24} />
                      <span className="text-academy-blue font-medium">
                        {formData.image ? formData.image.name : "اختر صورة المدرب"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-academy-blue font-semibold">
                    اسم المدرب *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold"
                    placeholder="أدخل اسم المدرب"
                  />
                </div>

                {/* Specialization */}
                <div>
                  <Label htmlFor="specialization" className="text-academy-blue font-semibold">
                    التخصص *
                  </Label>
                  <Input
                    id="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold"
                    placeholder="أدخل تخصص المدرب"
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
                      <>{editingTrainer ? "تحديث المدرب" : "إضافة المدرب"}</>
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

      {/* Trainers List */}
      <div className="container mx-auto px-4 py-8">
        {trainers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trainers.map((trainer) => (
              <Card key={trainer.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-0">
                  {/* Trainer Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={trainer.image_url || "/placeholder.svg?height=300&width=300&text=مدرب+معتمد"}
                      alt={trainer.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Button
                        size="icon"
                        onClick={() => handleEdit(trainer)}
                        className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 w-8 h-8"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => setShowDeleteConfirm(trainer.id)}
                        className="bg-red-500 text-white hover:bg-red-600 w-8 h-8"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2 bg-academy-gold text-academy-blue px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 space-x-reverse">
                      <Award size={10} />
                      <span>معتمد</span>
                    </div>
                  </div>

                  {/* Trainer Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-academy-blue mb-2 line-clamp-2">{trainer.name}</h3>
                    <div className="bg-academy-gray px-3 py-1 rounded-full">
                      <span className="text-academy-blue font-semibold text-sm">{trainer.specialization}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="text-academy-gold" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد مدربين</h3>
            <p className="text-academy-dark-gray mb-6">لم يتم إضافة المدربين المعتمدين بعد.</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold"
            >
              <Plus size={20} className="ml-2" />
              إضافة أول مدرب
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
