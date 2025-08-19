"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { Course } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, BookOpen, Clock, DollarSign, Users, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function CoursesManagementPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    hours: "",
    education_system: "",
    fees: "",
    image_url: ""
  })

  // جلب الدورات
  const fetchCourses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error("Error fetching courses:", error)
      toast.error("تعذر تحميل الدورات التدريبية")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  // فتح نموذج التعديل
  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      duration: course.duration || "",
      hours: course.hours.toString(),
      education_system: course.education_system || "",
      fees: course.fees.toString(),
      image_url: course.image_url || ""
    })
    setIsDialogOpen(true)
  }

  // فتح نموذج الإضافة
  const handleAdd = () => {
    setEditingCourse(null)
    setFormData({
      name: "",
      duration: "",
      hours: "",
      education_system: "",
      fees: "",
      image_url: ""
    })
    setIsDialogOpen(true)
  }

  // حفظ الدورة (إضافة أو تعديل)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.hours || !formData.fees) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    try {
      setSubmitting(true)
      
      const courseData = {
        name: formData.name.trim(),
        duration: formData.duration.trim() || null,
        hours: parseInt(formData.hours),
        education_system: formData.education_system.trim() || null,
        fees: parseFloat(formData.fees),
        image_url: formData.image_url.trim() || null
      }

      if (editingCourse) {
        // تعديل دورة موجودة
        const { error } = await supabase
          .from("courses")
          .update(courseData)
          .eq("id", editingCourse.id)

        if (error) throw error
        toast.success("تم حفظ التعديلات بنجاح")
      } else {
        // إضافة دورة جديدة
        const { error } = await supabase
          .from("courses")
          .insert([courseData])

        if (error) throw error
        toast.success("تمت إضافة الدورة بنجاح")
      }

      setIsDialogOpen(false)
      fetchCourses()
    } catch (error) {
      console.error("Error saving course:", error)
      toast.error("تعذر تنفيذ العملية. حاول لاحقاً")
    } finally {
      setSubmitting(false)
    }
  }

  // حذف دورة
  const handleDelete = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", courseId)

      if (error) throw error
      
      toast.success("تم حذف الدورة بنجاح")
      fetchCourses()
    } catch (error) {
      console.error("Error deleting course:", error)
      toast.error("تعذر تنفيذ العملية. حاول لاحقاً")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-academy-blue animate-spin mx-auto mb-4" />
          <p className="text-academy-dark-gray text-lg">جارٍ تحميل الدورات التدريبية...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-academy-blue-dark via-academy-blue to-academy-blue-light">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center">
                <BookOpen className="text-academy-blue text-2xl" size={32} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              إدارة الدورات التدريبية
            </h1>
            <p className="text-xl text-white/90 mb-2 max-w-2xl mx-auto leading-relaxed">
              إضافة وتعديل وحذف الدورات التدريبية
            </p>
            <p className="text-white/70 max-w-xl mx-auto">
              إدارة شاملة لجميع الدورات التدريبية في الأكاديمية
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Add Button */}
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleAdd}
                className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-3 px-6 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="ml-2" size={20} />
                إضافة دورة تدريبية جديدة
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-academy-blue text-right">
                  {editingCourse ? "تعديل دورة تدريبية" : "إضافة دورة تدريبية جديدة"}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* اسم الدورة */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-academy-dark-gray font-semibold">
                    اسم الدورة <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسم الدورة التدريبية"
                    className="text-right"
                    required
                  />
                </div>

                {/* صورة الدورة */}
                <div className="space-y-2">
                  <Label htmlFor="image_url" className="text-academy-dark-gray font-semibold">
                    رابط صورة الدورة
                  </Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="text-right"
                    type="url"
                  />
                  {formData.image_url && (
                    <div className="mt-2">
                      <Image
                        src={formData.image_url}
                        alt="معاينة الصورة"
                        width={200}
                        height={120}
                        className="rounded-lg object-cover"
                        onError={() => toast.error("رابط الصورة غير صحيح")}
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* مدة الدورة */}
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-academy-dark-gray font-semibold">
                      مدة الدورة
                    </Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="مثال: 3 أشهر"
                      className="text-right"
                    />
                  </div>

                  {/* عدد الساعات */}
                  <div className="space-y-2">
                    <Label htmlFor="hours" className="text-academy-dark-gray font-semibold">
                      عدد الساعات <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="hours"
                      type="number"
                      min="1"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      placeholder="120"
                      className="text-right"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* نظام التعليم */}
                  <div className="space-y-2">
                    <Label htmlFor="education_system" className="text-academy-dark-gray font-semibold">
                      نظام التعليم
                    </Label>
                    <Input
                      id="education_system"
                      value={formData.education_system}
                      onChange={(e) => setFormData({ ...formData, education_system: e.target.value })}
                      placeholder="مثال: عن بُعد"
                      className="text-right"
                    />
                  </div>

                  {/* الرسوم الدراسية */}
                  <div className="space-y-2">
                    <Label htmlFor="fees" className="text-academy-dark-gray font-semibold">
                      الرسوم الدراسية (ريال سعودي) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fees"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.fees}
                      onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                      placeholder="5000"
                      className="text-right"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={submitting}
                    className="px-6 py-2"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-6 py-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="ml-2 animate-spin" size={16} />
                        جارٍ التنفيذ...
                      </>
                    ) : (
                      editingCourse ? "تأكيد التعديل" : "تأكيد الإضافة"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="group bg-white/90 backdrop-blur-sm hover:shadow-xl border-0 shadow-lg transition-all duration-500 hover:-translate-y-2 rounded-2xl overflow-hidden border border-academy-gold/20 hover:border-academy-gold/60">
                {/* Course Image */}
                {course.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image_url}
                      alt={course.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-academy-blue mb-4 line-clamp-2 leading-tight">
                    {course.name}
                  </h3>

                  {/* Course Details */}
                  <div className="space-y-3 mb-6">
                    {course.duration && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse text-academy-dark-gray">
                          <Clock size={16} className="text-academy-gold" />
                          <span>المدة</span>
                        </div>
                        <span className="text-academy-blue font-medium">{course.duration}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 space-x-reverse text-academy-dark-gray">
                        <BookOpen size={16} className="text-academy-gold" />
                        <span>الساعات</span>
                      </div>
                      <span className="text-academy-blue font-medium">{course.hours} ساعة</span>
                    </div>

                    {course.education_system && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse text-academy-dark-gray">
                          <Users size={16} className="text-academy-gold" />
                          <span>النظام</span>
                        </div>
                        <span className="text-academy-blue font-medium">{course.education_system}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm bg-academy-gold/10 p-2 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse text-academy-dark-gray">
                        <DollarSign size={16} className="text-academy-gold" />
                        <span>الرسوم</span>
                      </div>
                      <span className="text-academy-gold font-bold">{course.fees.toLocaleString()} ر.س</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      onClick={() => handleEdit(course)}
                      size="sm"
                      className="flex-1 bg-academy-blue hover:bg-academy-blue-600 text-white"
                    >
                      <Edit size={16} className="ml-1" />
                      تعديل
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                        >
                          <Trash2 size={16} className="ml-1" />
                          حذف
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent dir="rtl">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-right text-academy-blue">
                            تأكيد الحذف
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-right text-academy-dark-gray">
                            هل أنت متأكد من حذف هذه الدورة؟ لا يمكن التراجع عن هذا الإجراء.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-row-reverse">
                          <AlertDialogCancel className="ml-2">إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(course.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            تأكيد الحذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <BookOpen className="text-academy-gold text-6xl" />
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد دورات تدريبية</h3>
              <p className="text-academy-dark-gray text-lg mb-8">لم يتم إضافة أي دورة تدريبية بعد.</p>
              <Button 
                onClick={handleAdd}
                className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-3 px-8 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="ml-2" size={20} />
                إضافة أول دورة تدريبية
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}