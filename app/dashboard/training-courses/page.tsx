"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type TrainingCourse } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Upload, X, Check, AlertCircle, Play, BookOpen, Clock, Users, DollarSign } from "lucide-react"
import Image from "next/image"

// Toast notification component
const Toast = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => (
  <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border transform transition-all duration-500 ${
    type === "success" 
      ? "bg-green-50/95 border-green-200 text-green-800" 
      : "bg-red-50/95 border-red-200 text-red-800"
  }`}>
    {type === "success" ? (
      <Check size={20} className="text-green-600" />
    ) : (
      <AlertCircle size={20} className="text-red-600" />
    )}
    <span className="font-medium">{message}</span>
    <Button
      size="sm"
      variant="ghost"
      onClick={onClose}
      className="p-1 h-auto hover:bg-transparent"
    >
      <X size={16} />
    </Button>
  </div>
)

// Confirmation Modal component
const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "تأكيد", 
  cancelText = "إلغاء",
  isLoading = false 
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-academy-gold/20">
        <h3 className="text-xl font-bold text-academy-blue mb-4">{title}</h3>
        <p className="text-academy-dark-gray mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className="flex-1 border-2 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white font-bold py-2 rounded-xl transition-all duration-300"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-xl transition-all duration-300"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                جارٍ التنفيذ...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function TrainingCoursesManagement() {
  const [courses, setCourses] = useState<TrainingCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<TrainingCourse | null>(null)
  const [editingCourse, setEditingCourse] = useState<TrainingCourse | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    hours: "",
    education_system: "",
    fees: "",
    image: null as File | null,
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase.from("training_courses").select("*").order("created_at", { ascending: true })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error("Error fetching training courses:", error)
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
      const filePath = `training-courses/${fileName}`

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
    
    // Show save confirmation modal
    setShowSaveModal(true)
  }

  const confirmSave = async () => {
    setIsSubmitting(true)
    setShowSaveModal(false)

    try {
      let imageUrl = editingCourse?.image_url || null

      // Upload new image if provided
      if (formData.image) {
        const uploadedUrl = await uploadImage(formData.image)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        } else {
          throw new Error("فشل في رفع الصورة")
        }
      }

      const courseData = {
        name: formData.name,
        duration: formData.duration,
        hours: parseInt(formData.hours),
        education_system: formData.education_system,
        fees: parseFloat(formData.fees),
        image_url: imageUrl,
      }

      if (editingCourse) {
        // Update existing course
        const { error } = await supabase
          .from("training_courses")
          .update(courseData)
          .eq("id", editingCourse.id)

        if (error) throw error
        showMessage("success", "تم حفظ التعديلات بنجاح.")
      } else {
        // Create new course
        const { error } = await supabase.from("training_courses").insert([courseData])

        if (error) throw error
        showMessage("success", "تمت إضافة الدورة بنجاح.")
      }

      resetForm()
      fetchCourses()
    } catch (error) {
      console.error("Error saving course:", error)
      showMessage("error", "تعذر تنفيذ العملية. حاول لاحقًا.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (course: TrainingCourse) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      duration: course.duration,
      hours: course.hours.toString(),
      education_system: course.education_system,
      fees: course.fees.toString(),
      image: null,
    })
    setShowForm(true)
  }

  const handleDeleteClick = (course: TrainingCourse) => {
    setCourseToDelete(course)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!courseToDelete) return

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("training_courses").delete().eq("id", courseToDelete.id)

      if (error) throw error

      showMessage("success", "تم حذف الدورة بنجاح.")
      fetchCourses()
    } catch (error) {
      console.error("Error deleting course:", error)
      showMessage("error", "تعذر تنفيذ العملية. حاول لاحقًا.")
    } finally {
      setIsSubmitting(false)
      setShowDeleteModal(false)
      setCourseToDelete(null)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      duration: "",
      hours: "",
      education_system: "",
      fees: "",
      image: null,
    })
    setEditingCourse(null)
    setShowForm(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-academy-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold text-lg">جاري تحميل الدورات التدريبية...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Toast Notifications */}
      {message && (
        <Toast
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
        />
      )}

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذه الدورة؟ لا يمكن التراجع."
        confirmText="تأكيد الحذف"
        isLoading={isSubmitting}
      />

      <ConfirmModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={confirmSave}
        title="تأكيد الحفظ"
        message={editingCourse ? "هل تريد حفظ التعديلات على الدورة؟" : "هل تريد إضافة الدورة الجديدة؟"}
        confirmText="تأكيد"
        isLoading={isSubmitting}
      />

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-academy-blue via-academy-blue-600 to-academy-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-academy-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-academy-gold/15 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-right">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                  <Play className="text-academy-blue" size={28} />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">إدارة الدورات التدريبية</h1>
                  <p className="text-xl text-academy-gold-100">إدارة وتنظيم الدورات التدريبية</p>
                </div>
              </div>
              <p className="text-lg text-academy-gold-200 max-w-2xl">
                يمكنك من هنا إضافة وتعديل وحذف الدورات التدريبية المتاحة في الأكاديمية
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-8 py-4 text-lg rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Plus size={24} className="ml-2" />
                إضافة دورة جديدة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl my-8">
            <CardHeader className="bg-gradient-to-r from-academy-blue to-academy-blue-600 text-white rounded-t-2xl">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
                <Play size={28} />
                {editingCourse ? "تعديل الدورة التدريبية" : "إضافة دورة تدريبية جديدة"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-academy-blue font-bold text-lg mb-3 block">
                    صورة الدورة
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => document.getElementById("image")?.click()}
                      variant="outline"
                      className="border-2 border-academy-gold/30 hover:border-academy-gold text-academy-blue font-bold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      <Upload size={20} className="ml-2" />
                      اختر صورة
                    </Button>
                    {formData.image && (
                      <span className="text-academy-blue font-medium">{formData.image.name}</span>
                    )}
                    {editingCourse && editingCourse.image_url && !formData.image && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-academy-gold/20">
                        <Image
                          src={editingCourse.image_url}
                          alt="Current image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Course Name */}
                <div>
                  <Label htmlFor="name" className="text-academy-blue font-bold text-lg mb-3 block">
                    اسم الدورة *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                    placeholder="أدخل اسم الدورة"
                  />
                </div>

                {/* Duration */}
                <div>
                  <Label htmlFor="duration" className="text-academy-blue font-bold text-lg mb-3 block">
                    مدة الدورة *
                  </Label>
                  <Input
                    id="duration"
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                    className="mt-2 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                    placeholder="مثال: شهرين، 6 أسابيع"
                  />
                </div>

                {/* Hours */}
                <div>
                  <Label htmlFor="hours" className="text-academy-blue font-bold text-lg mb-3 block">
                    عدد الساعات *
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    required
                    className="mt-2 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                    placeholder="أدخل عدد الساعات"
                  />
                </div>

                {/* Education System */}
                <div>
                  <Label htmlFor="education_system" className="text-academy-blue font-bold text-lg mb-3 block">
                    نظام التعليم *
                  </Label>
                  <Select
                    value={formData.education_system}
                    onValueChange={(value) => setFormData({ ...formData, education_system: value })}
                  >
                    <SelectTrigger className="mt-2 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white">
                      <SelectValue placeholder="اختر نظام التعليم" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="تعليم حضوري">تعليم حضوري</SelectItem>
                      <SelectItem value="تعليم إلكتروني">تعليم إلكتروني</SelectItem>
                      <SelectItem value="تعليم مدمج">تعليم مدمج</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fees */}
                <div>
                  <Label htmlFor="fees" className="text-academy-blue font-bold text-lg mb-3 block">
                    الرسوم الدراسية (ر.س) *
                  </Label>
                  <Input
                    id="fees"
                    type="number"
                    step="0.01"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    required
                    className="mt-2 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                    placeholder="أدخل الرسوم الدراسية"
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
                        {editingCourse ? "تحديث الدورة" : "إضافة الدورة"}
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

      {/* Enhanced Courses List */}
      <div className="container mx-auto px-4 py-8">
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="group border-0 shadow-lg hover:shadow-2xl bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 relative">
                <CardContent className="p-0">
                  {/* Enhanced Course Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    <Image
                      src={course.image_url || "/placeholder.svg?height=300&width=300&text=دورة+تدريبية"}
                      alt={course.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent"></div>
                    
                    {/* Action Buttons - Always visible on mobile, hover on desktop */}
                    <div className="absolute top-3 left-3 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                      <Button
                        size="icon"
                        onClick={() => handleEdit(course)}
                        className="w-10 h-10 bg-academy-gold/95 text-academy-blue hover:bg-academy-gold shadow-lg backdrop-blur-sm rounded-xl hover:scale-110 transition-all duration-300"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => handleDeleteClick(course)}
                        className="w-10 h-10 bg-red-500/95 text-white hover:bg-red-600 shadow-lg backdrop-blur-sm rounded-xl hover:scale-110 transition-all duration-300"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    
                    {/* Course Type Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue px-3 py-1 rounded-full text-sm font-bold shadow-md">
                      دورة تدريبية
                    </div>
                  </div>

                  {/* Enhanced Course Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-300 line-clamp-2 text-center">
                      {course.name}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center p-2 bg-academy-gray-light rounded-lg">
                        <span className="text-academy-dark-gray font-medium flex items-center gap-2">
                          <Clock size={16} />
                          المدة:
                        </span>
                        <span className="text-academy-blue font-bold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-academy-gray-light rounded-lg">
                        <span className="text-academy-dark-gray font-medium flex items-center gap-2">
                          <BookOpen size={16} />
                          الساعات:
                        </span>
                        <span className="text-academy-blue font-bold">{course.hours} ساعة</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-academy-gray-light rounded-lg">
                        <span className="text-academy-dark-gray font-medium flex items-center gap-2">
                          <Users size={16} />
                          النظام:
                        </span>
                        <span className="text-academy-blue font-bold">{course.education_system}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-academy-gold/10 to-academy-gold/5 rounded-lg border border-academy-gold/30 mt-4">
                        <span className="text-academy-blue font-bold flex items-center gap-2">
                          <DollarSign size={16} />
                          الرسوم:
                        </span>
                        <span className="text-academy-gold font-bold text-lg">{course.fees.toLocaleString()} ر.س</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 fade-in">
            <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Play className="text-academy-gold" size={48} />
            </div>
            <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد دورات تدريبية</h3>
            <p className="text-academy-dark-gray text-lg mb-8 max-w-md mx-auto">
              لم يتم إضافة أي دورات تدريبية بعد.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="btn-primary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Plus size={24} className="ml-2" />
              إضافة أول دورة
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}