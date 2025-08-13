"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type Trainer } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Award } from "lucide-react"
import Image from "next/image"
import { EnhancedFormModal } from "@/components/ui/enhanced-form-modal"
import { EnhancedImageUpload } from "@/components/ui/enhanced-image-upload"
import { EnhancedFormField } from "@/components/ui/enhanced-form-field"
import { EnhancedDeleteConfirmation } from "@/components/ui/enhanced-delete-confirmation"
import { EnhancedMessage } from "@/components/ui/enhanced-success-message"

export default function TrainersManagement() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    image: null as File | null,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

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
      setMessage({ type: "error", text: "حدث خطأ في تحميل البيانات" })
    } finally {
      setIsLoading(false)
    }
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

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = "اسم المدرب مطلوب"
    }
    
    if (!formData.specialization.trim()) {
      errors.specialization = "التخصص مطلوب"
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
        setMessage({ type: "success", text: "تم تحديث المدرب بنجاح" })
      } else {
        // Add new trainer
        const { error } = await supabase.from("trainers").insert([trainerData])

        if (error) throw error
        setMessage({ type: "success", text: "تم إضافة المدرب بنجاح" })
      }

      // Reset form and refresh data
      resetForm()
      fetchTrainers()
    } catch (error) {
      console.error("Error saving trainer:", error)
      setMessage({ type: "error", text: "حدث خطأ في حفظ البيانات" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const { error } = await supabase.from("trainers").delete().eq("id", id)

      if (error) throw error
      setMessage({ type: "success", text: "تم حذف المدرب بنجاح" })
      fetchTrainers()
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting trainer:", error)
      setMessage({ type: "error", text: "حدث خطأ في حذف المدرب" })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = (trainer: Trainer) => {
    setEditingTrainer(trainer)
    setFormData({
      name: trainer.name,
      specialization: trainer.specialization,
      image: null,
    })
    setFormErrors({})
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
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold"
            >
              <Plus size={20} className="ml-2" />
              إضافة مدرب جديد
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

      {/* Enhanced Add/Edit Form */}
      <EnhancedFormModal
        isOpen={showForm}
        onClose={resetForm}
        title={editingTrainer ? "تعديل المدرب" : "إضافة مدرب جديد"}
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
            currentImageUrl={editingTrainer?.image_url}
            label="صورة المدرب"
            error={formErrors.image}
            isOval={true}
          />

          <EnhancedFormField
            type="input"
            label="اسم المدرب"
            placeholder="أدخل اسم المدرب"
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
            placeholder="أدخل تخصص المدرب"
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
                editingTrainer ? "تحديث المدرب" : "إضافة المدرب"
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
      </EnhancedFormModal>

      {/* Enhanced Trainers List */}
      <div className="container mx-auto px-4 py-8">
        {trainers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trainers.map((trainer) => (
              <Card key={trainer.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden bg-white">
                <CardContent className="p-0">
                  {/* Enhanced Trainer Image - Badge Style */}
                  <div className="relative h-64 bg-gradient-to-br from-academy-gold-50 to-academy-blue-50 flex items-center justify-center overflow-hidden">
                    <div className="relative w-40 h-40">
                      {/* Certification Badge Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold opacity-80 rounded-full transform scale-110"></div>
                      <div className="absolute inset-2 bg-white rounded-full shadow-xl"></div>
                      
                      {/* Main image container */}
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg transform group-hover:scale-105 transition-all duration-300 ring-4 ring-academy-gold/50">
                        <Image
                          src={trainer.image_url || "/placeholder.svg?height=300&width=300&text=مدرب+معتمد"}
                          alt={trainer.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                      
                      {/* Certification Badge */}
                      <div className="absolute -top-2 -right-2 bg-academy-gold text-academy-blue px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 space-x-reverse shadow-lg">
                        <Award size={12} />
                        <span>معتمد</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Button
                        size="icon"
                        onClick={() => handleEdit(trainer)}
                        className="w-8 h-8 bg-academy-gold text-academy-blue hover:bg-academy-gold/90 shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => setShowDeleteConfirm(trainer.id)}
                        className="w-8 h-8 bg-red-500 text-white hover:bg-red-600 shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Trainer Info */}
                  <div className="p-6 text-center space-y-3">
                    <h3 className="text-lg font-bold text-academy-blue line-clamp-2">{trainer.name}</h3>
                    <div className="inline-flex items-center justify-center">
                      <div className="bg-academy-gray px-4 py-2 rounded-full border border-academy-gold/20">
                        <span className="text-academy-blue font-semibold text-sm">{trainer.specialization}</span>
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
              <Award className="text-academy-gold" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد مدربين</h3>
            <p className="text-academy-dark-gray mb-6">لم يتم إضافة المدربين المعتمدين بعد.</p>
            <Button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold"
            >
              <Plus size={20} className="ml-2" />
              إضافة أول مدرب
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Delete Confirmation */}
      <EnhancedDeleteConfirmation
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
        itemName={trainers.find(t => t.id === showDeleteConfirm)?.name}
        isLoading={isDeleting}
      />
    </div>
  )
}
