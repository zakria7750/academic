"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase, type Program, type TrainingCourse } from "@/lib/supabase"
import { revalidateProgramsPage } from "@/app/actions/programs-actions"
import { createTrainingCourse, updateTrainingCourse, deleteTrainingCourse, getAllTrainingCourses } from "@/app/actions/training-courses-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Upload, X, Check, AlertCircle, BookOpen, Zap } from "lucide-react"
import Image from "next/image"

export default function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null)
  const [courseToDelete, setCourseToDelete] = useState<TrainingCourse | null>(null)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [editingCourse, setEditingCourse] = useState<TrainingCourse | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<"masters" | "doctorate" | "diploma" | "training">("masters")
  const [isTrainingCourse, setIsTrainingCourse] = useState(false)

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

  // Training course form state
  const [courseFormData, setCourseFormData] = useState({
    name: "",
    duration: "",
    hours: "",
    education_system: "",
    fees: "",
    image: null as File | null,
  })

  useEffect(() => {
    fetchPrograms()
    fetchTrainingCourses()
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

  const fetchTrainingCourses = async () => {
    try {
      console.log("Fetching training courses...")
      const courses = await getAllTrainingCourses()
      console.log("Training courses fetched:", courses)
      setTrainingCourses(courses)
    } catch (error) {
      console.error("Error fetching training courses:", error)
      showMessage("error", "حدث خطأ في تحميل الدورات التدريبية")
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
      if (isTrainingCourse) {
        // Handle training course submission
        let imageUrl = editingCourse?.image_url || null

        if (courseFormData.image) {
          const uploadedUrl = await uploadImage(courseFormData.image)
          if (uploadedUrl) {
            imageUrl = uploadedUrl
          } else {
            throw new Error("فشل في رفع الصورة")
          }
        }

        const courseData = {
          name: courseFormData.name,
          duration: courseFormData.duration,
          hours: Number.parseInt(courseFormData.hours),
          education_system: courseFormData.education_system,
          fees: Number.parseFloat(courseFormData.fees),
          image_url: imageUrl,
        }

        if (editingCourse) {
          // Update existing course
          const result = await updateTrainingCourse(editingCourse.id, courseData)
          if (!result.success) throw new Error(result.message)
          showMessage("success", "تم تحديث الدورة التدريبية بنجاح")
        } else {
          // Add new course
          const result = await createTrainingCourse(courseData)
          if (!result.success) throw new Error(result.message)
          showMessage("success", "تم إضافة الدورة التدريبية بنجاح")
        }

        resetCourseForm()
        fetchTrainingCourses()
      } else {
        // Handle program submission
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
          await revalidateProgramsPage()
        } else {
          // Add new program
          const { error } = await supabase.from("programs").insert([programData])

          if (error) throw error
          showMessage("success", "تم إضافة البرنامج بنجاح")
          await revalidateProgramsPage()
        }

        // Reset form and refresh data
        resetForm()
        fetchPrograms()
      }
    } catch (error) {
      console.error("Error saving:", error)
      showMessage("error", error instanceof Error ? error.message : "حدث خطأ في حفظ البيانات")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    console.log("handleDeleteConfirm called", { programToDelete, courseToDelete })
    
    if (programToDelete) {
      try {
        console.log("Deleting program:", programToDelete.id)
        const { error } = await supabase.from("programs").delete().eq("id", programToDelete.id)

        if (error) throw error
        await revalidateProgramsPage()
        showMessage("success", "تم حذف البرنامج بنجاح")
        fetchPrograms()
        setShowDeleteModal(false)
        setProgramToDelete(null)
      } catch (error) {
        console.error("Error deleting program:", error)
        showMessage("error", "حدث خطأ في حذف البرنامج")
      }
    } else if (courseToDelete) {
      try {
        console.log("Deleting training course:", courseToDelete.id)
        const result = await deleteTrainingCourse(courseToDelete.id)
        if (!result.success) throw new Error(result.message)
        showMessage("success", "تم حذف الدورة التدريبية بنجاح")
        fetchTrainingCourses()
        setShowDeleteModal(false)
        setCourseToDelete(null)
      } catch (error) {
        console.error("Error deleting training course:", error)
        showMessage("error", error instanceof Error ? error.message : "حدث خطأ في حذف الدورة التدريبية")
      }
    } else {
      console.log("No item to delete")
      showMessage("error", "لا يوجد عنصر للحذف")
    }
    
    // Log final state
    console.log("Final state after deletion:", { showDeleteModal, programToDelete, courseToDelete })
  }

  const handleDeleteClick = (program: Program) => {
    console.log("handleDeleteClick called with program:", program)
    setProgramToDelete(program)
    setCourseToDelete(null)
    setShowDeleteModal(true)
    console.log("Modal state after setting:", { showDeleteModal: true, programToDelete: program, courseToDelete: null })
  }

  const handleDeleteCourseClick = (course: TrainingCourse) => {
    console.log("handleDeleteCourseClick called with course:", course)
    setCourseToDelete(course)
    setProgramToDelete(null)
    setShowDeleteModal(true)
    console.log("Modal state after setting:", { showDeleteModal: true, courseToDelete: course, programToDelete: null })
    
    // Force a re-render to ensure the modal shows
    setTimeout(() => {
      console.log("Current state after timeout:", { showDeleteModal, courseToDelete, programToDelete })
    }, 100)
    
    // Also log the current state immediately
    console.log("Immediate state check:", { 
      showDeleteModal: true, 
      courseToDelete: course, 
      programToDelete: null 
    })
  }

  const handleEdit = (program: Program) => {
    setEditingProgram(program)
    setEditingCourse(null)
    setIsTrainingCourse(false)
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

  const handleEditCourse = (course: TrainingCourse) => {
    setEditingCourse(course)
    setEditingProgram(null)
    setIsTrainingCourse(true)
    setCourseFormData({
      name: course.name,
      duration: course.duration,
      hours: course.hours.toString(),
      education_system: course.education_system,
      fees: course.fees.toString(),
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

  const resetCourseForm = () => {
    setCourseFormData({
      name: "",
      duration: "",
      hours: "",
      education_system: "",
      fees: "",
      image: null,
    })
    setEditingCourse(null)
    setIsTrainingCourse(false)
    setShowForm(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const handleCourseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCourseFormData({ ...courseFormData, image: file })
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
    <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-academy-blue-dark via-academy-blue to-academy-blue-light shadow-xl border-b border-academy-gold/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-academy-gold/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="text-academy-gold" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">إدارة البرامج التعليمية</h1>
                  <p className="text-white/80 text-lg">إضافة وتعديل وحذف البرامج التعليمية</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setIsTrainingCourse(false)
                  setShowForm(true)
                }}
                className="btn-primary text-academy-blue font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus size={20} className="ml-2" />
                إضافة برنامج جديد
              </Button>
              <Button
                onClick={() => {
                  setIsTrainingCourse(true)
                  setShowForm(true)
                }}
                className="btn-secondary text-academy-blue font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-academy-gold"
              >
                <Zap size={20} className="ml-2" />
                إضافة دورة تدريبية
              </Button>
            </div>
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
      {showDeleteModal && (programToDelete || courseToDelete) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 slide-up" style={{backdropFilter: 'blur(12px)', background: 'rgba(0, 31, 63, 0.8)'}}>
          {/* Debug info */}
          <div className="absolute top-4 left-4 text-white text-xs bg-black/50 p-2 rounded">
            Debug: showDeleteModal={showDeleteModal.toString()}, 
            programToDelete={programToDelete ? 'exists' : 'null'}, 
            courseToDelete={courseToDelete ? 'exists' : 'null'}
          </div>
          <Card className="w-full max-w-md bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <CardTitle className="text-red-800 text-xl font-bold">تأكيد الحذف</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 relative rounded-xl overflow-hidden border-4 border-red-200 shadow-md">
                  <Image
                    src={(programToDelete?.image_url || courseToDelete?.image_url) || "/placeholder.svg?height=80&width=80&text=برنامج"}
                    alt={programToDelete?.name || courseToDelete?.name || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-academy-blue mb-2">{programToDelete?.name || courseToDelete?.name}</h3>
                <p className="text-academy-dark-gray mb-2 font-semibold">
                  {programToDelete 
                    ? (programToDelete.type === "masters" ? "ماجستير مهني" : 
                       programToDelete.type === "doctorate" ? "دكتوراه مهنية" : "دبلوم مهني")
                    : courseToDelete 
                    ? "دورة تدريبية"
                    : ""
                  }
                </p>
                <p className="text-academy-dark-gray mb-4">
                  هل أنت متأكد من حذف {programToDelete ? "هذا البرنامج" : courseToDelete ? "هذه الدورة التدريبية" : ""}؟
                </p>
                <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  تحذير: لا يمكن التراجع عن هذا الإجراء
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all duration-300"
                >
                  <Trash2 size={18} className="ml-2" />
                  تأكيد الحذف
                </Button>
                <Button
                  onClick={() => {
                    setShowDeleteModal(false); 
                    setProgramToDelete(null);
                    setCourseToDelete(null);
                  }}
                  className="flex-1 bg-academy-gray hover:bg-academy-gray-medium text-academy-blue font-bold py-3 rounded-xl transition-all duration-300"
                >
                  <X size={18} className="ml-2" />
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 slide-up" style={{backdropFilter: 'blur(8px)', background: 'rgba(0, 31, 63, 0.8)'}}>
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-white rounded-2xl">
            <CardHeader className="border-b border-academy-blue-100 bg-gradient-to-r from-academy-blue-50 to-academy-gold-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-academy-blue/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-academy-blue" size={20} />
                  </div>
                  <CardTitle className="text-academy-blue text-xl font-bold">
                    {isTrainingCourse 
                      ? (editingCourse ? "تعديل الدورة التدريبية" : "إضافة دورة تدريبية جديدة")
                      : (editingProgram ? "تعديل البرنامج" : "إضافة برنامج جديد")
                    }
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isTrainingCourse ? resetCourseForm : resetForm}
                  className="text-academy-dark-gray hover:text-academy-blue hover:bg-academy-blue/5 rounded-lg"
                >
                  <X size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isTrainingCourse ? (
                  <>
                    {/* Program Type */}
                    <div>
                      <Label htmlFor="type" className="text-academy-blue font-bold text-lg mb-3 block">
                        نوع البرنامج *
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: "masters" | "doctorate" | "diploma") =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger className="mt-2 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white">
                          <SelectValue placeholder="اختر نوع البرنامج" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="masters">ماجستير مهني</SelectItem>
                          <SelectItem value="doctorate">دكتوراه مهنية</SelectItem>
                          <SelectItem value="diploma">دبلوم مهني</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : null}

                {/* Enhanced Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-academy-blue font-bold text-lg mb-3 block">
                    {isTrainingCourse ? "صورة الدورة التدريبية" : "صورة البرنامج"}
                  </Label>
                  <div className="mt-2">
                    <input type="file" id="image" accept="image/*" onChange={isTrainingCourse ? handleCourseImageChange : handleImageChange} className="hidden" />
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-40 rounded-xl cursor-pointer bg-white border-2 border-dashed border-academy-gold/40 hover:border-academy-gold hover:bg-academy-gold/5 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-16 h-16 bg-academy-gold/20 rounded-full flex items-center justify-center mb-4">
                          <Upload className="text-academy-gold" size={24} />
                        </div>
                        <span className="text-academy-blue font-semibold text-lg mb-2">
                          {isTrainingCourse 
                            ? (courseFormData.image ? courseFormData.image.name : "اختر صورة الدورة التدريبية")
                            : (formData.image ? formData.image.name : "اختر صورة البرنامج")
                          }
                        </span>
                        <span className="text-academy-dark-gray text-sm">PNG, JPG أو JPEG (الحد الأقصى 5MB)</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Program/Course Name */}
                <div>
                  <Label htmlFor="name" className="text-academy-blue font-bold text-lg mb-3 block">
                    {isTrainingCourse ? "اسم الدورة التدريبية *" : "اسم البرنامج *"}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={isTrainingCourse ? courseFormData.name : formData.name}
                    onChange={(e) => isTrainingCourse 
                      ? setCourseFormData({ ...courseFormData, name: e.target.value })
                      : setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="mt-2 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                    placeholder={isTrainingCourse ? "أدخل اسم الدورة التدريبية" : "أدخل اسم البرنامج"}
                  />
                </div>

                {/* Duration */}
                <div>
                  <Label htmlFor="duration" className="text-academy-blue font-bold text-lg mb-3 block">
                    {isTrainingCourse ? "مدة الدورة *" : "مدة البرنامج *"}
                  </Label>
                  <Input
                    id="duration"
                    type="text"
                    value={isTrainingCourse ? courseFormData.duration : formData.duration}
                    onChange={(e) => isTrainingCourse 
                      ? setCourseFormData({ ...courseFormData, duration: e.target.value })
                      : setFormData({ ...formData, duration: e.target.value })
                    }
                    required={isTrainingCourse || formData.type !== "diploma"}
                    className="mt-2 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                    placeholder={isTrainingCourse ? "مثال: شهر واحد" : "مثال: سنتان"}
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
                    value={isTrainingCourse ? courseFormData.hours : formData.hours}
                    onChange={(e) => isTrainingCourse 
                      ? setCourseFormData({ ...courseFormData, hours: e.target.value })
                      : setFormData({ ...formData, hours: e.target.value })
                    }
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
                    value={isTrainingCourse ? courseFormData.education_system : formData.education_system}
                    onValueChange={(value) => isTrainingCourse 
                      ? setCourseFormData({ ...courseFormData, education_system: value })
                      : setFormData({ ...formData, education_system: value })
                    }
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
                    value={isTrainingCourse ? courseFormData.fees : formData.fees}
                    onChange={(e) => isTrainingCourse 
                      ? setCourseFormData({ ...courseFormData, fees: e.target.value })
                      : setFormData({ ...formData, fees: e.target.value })
                    }
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
                        {isTrainingCourse 
                          ? (editingCourse ? "تحديث الدورة التدريبية" : "إضافة الدورة التدريبية")
                          : (editingProgram ? "تحديث البرنامج" : "إضافة البرنامج")
                        }
                        <Check size={20} className="mr-2" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={isTrainingCourse ? resetCourseForm : resetForm}
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

      {/* Enhanced Programs Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            onClick={() => setActiveTab("masters")}
            className={`${
              activeTab === "masters"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white text-academy-blue border-2 border-academy-blue hover:bg-academy-blue hover:text-white"
            } font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105`}
          >
            <BookOpen size={18} className="ml-2" />
            برامج الماجستير ({programs.filter((p) => p.type === "masters").length})
          </Button>
          <Button
            onClick={() => setActiveTab("doctorate")}
            className={`${
              activeTab === "doctorate"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white text-academy-blue border-2 border-academy-blue hover:bg-academy-blue hover:text-white"
            } font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105`}
          >
            <BookOpen size={18} className="ml-2" />
            برامج الدكتوراه ({programs.filter((p) => p.type === "doctorate").length})
          </Button>
          <Button
            onClick={() => setActiveTab("diploma")}
            className={`${
              activeTab === "diploma"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white text-academy-blue border-2 border-academy-blue hover:bg-academy-blue hover:text-white"
            } font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105`}
          >
            <BookOpen size={18} className="ml-2" />
            الدبلومات ({programs.filter((p) => p.type === "diploma").length})
          </Button>
          <Button
            onClick={() => setActiveTab("training")}
            className={`${
              activeTab === "training"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white text-academy-blue border-2 border-academy-blue hover:bg-academy-blue hover:text-white"
            } font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105`}
          >
            <Zap size={18} className="ml-2" />
            الدورات التدريبية ({trainingCourses.length})
          </Button>
        </div>

        {/* Enhanced Programs List */}
        {activeTab === "training" ? (
          // Training Courses List
          trainingCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingCourses.map((course) => (
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
                          onClick={() => handleEditCourse(course)}
                          className="w-10 h-10 bg-academy-gold/95 text-academy-blue hover:bg-academy-gold shadow-lg backdrop-blur-sm rounded-xl hover:scale-110 transition-all duration-300"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => handleDeleteCourseClick(course)}
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
                          <span className="text-academy-dark-gray font-medium">المدة:</span>
                          <span className="text-academy-blue font-bold">{course.duration}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-academy-gray-light rounded-lg">
                          <span className="text-academy-dark-gray font-medium">الساعات:</span>
                          <span className="text-academy-blue font-bold">{course.hours} ساعة</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-academy-gray-light rounded-lg">
                          <span className="text-academy-dark-gray font-medium">النظام:</span>
                          <span className="text-academy-blue font-bold">{course.education_system}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-academy-gold/10 to-academy-gold/5 rounded-lg border border-academy-gold/30 mt-4">
                          <span className="text-academy-blue font-bold">الرسوم:</span>
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
                <Zap className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد دورات تدريبية</h3>
              <p className="text-academy-dark-gray text-lg mb-8 max-w-md mx-auto">
                لم يتم إضافة دورات تدريبية بعد.
              </p>
              <Button
                onClick={() => {
                  setIsTrainingCourse(true)
                  setShowForm(true)
                }}
                className="btn-primary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Zap size={24} className="ml-2" />
                إضافة أول دورة تدريبية
              </Button>
            </div>
          )
        ) : (
          // Programs List
          filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <Card key={program.id} className="group border-0 shadow-lg hover:shadow-2xl bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 relative">
                  <CardContent className="p-0">
                    {/* Enhanced Program Image */}
                    <div className="relative h-56 overflow-hidden rounded-t-2xl">
                      <Image
                        src={program.image_url || "/placeholder.svg?height=300&width=300&text=برنامج+تعليمي"}
                        alt={program.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent"></div>
                      
                      {/* Action Buttons - Always visible on mobile, hover on desktop */}
                      <div className="absolute top-3 left-3 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="icon"
                          onClick={() => handleEdit(program)}
                          className="w-10 h-10 bg-academy-gold/95 text-academy-blue hover:bg-academy-gold shadow-lg backdrop-blur-sm rounded-xl hover:scale-110 transition-all duration-300"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => handleDeleteClick(program)}
                          className="w-10 h-10 bg-red-500/95 text-white hover:bg-red-600 shadow-lg backdrop-blur-sm rounded-xl hover:scale-110 transition-all duration-300"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      
                      {/* Program Type Badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue px-3 py-1 rounded-full text-sm font-bold shadow-md">
                        {program.type === "masters" ? "ماجستير" : program.type === "doctorate" ? "دكتوراه" : "دبلوم"}
                      </div>
                    </div>

                    {/* Enhanced Program Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-300 line-clamp-2 text-center">
                        {program.name}
                      </h3>
                      <div className="space-y-3 text-sm">
                        {program.duration && (
                          <div className="flex justify-between items-center p-2 bg-academy-gray-light rounded-lg">
                            <span className="text-academy-dark-gray font-medium">المدة:</span>
                            <span className="text-academy-blue font-bold">{program.duration}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-2 bg-academy-gray-light rounded-lg">
                          <span className="text-academy-dark-gray font-medium">الساعات:</span>
                          <span className="text-academy-blue font-bold">{program.hours} ساعة</span>
                        </div>
                        {program.education_system && (
                          <div className="flex justify-between items-center p-2 bg-academy-gray-light rounded-lg">
                            <span className="text-academy-dark-gray font-medium">النظام:</span>
                            <span className="text-academy-blue font-bold">{program.education_system}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-academy-gold/10 to-academy-gold/5 rounded-lg border border-academy-gold/30 mt-4">
                          <span className="text-academy-blue font-bold">الرسوم:</span>
                          <span className="text-academy-gold font-bold text-lg">{program.fees.toLocaleString()} ر.س</span>
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
                <BookOpen className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد برامج</h3>
              <p className="text-academy-dark-gray text-lg mb-8 max-w-md mx-auto">
                لم يتم إضافة برامج{" "}
                {activeTab === "masters" ? "الماجستير" : activeTab === "doctorate" ? "الدكتوراه" : "الدبلومات"} بعد.
              </p>
              <Button
                onClick={() => {
                  setIsTrainingCourse(false)
                  setShowForm(true)
                }}
                className="btn-primary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Plus size={24} className="ml-2" />
                إضافة أول برنامج
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  )
}
