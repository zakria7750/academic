"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase, type AcademicDepartment } from "@/lib/supabase"
import { Plus, Edit, Trash2, Settings, Building2, Users, BookOpen, Upload, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function AcademicDepartmentsPage() {
  const [departments, setDepartments] = useState<AcademicDepartment[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<AcademicDepartment | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: ""
  })

  // جلب الأقسام من قاعدة البيانات
  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from("academic_departments")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setDepartments(data || [])
    } catch (error) {
      console.error("Error fetching departments:", error)
      toast.error("خطأ في جلب البيانات")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error("يرجى إدخال عنوان القسم")
      return
    }

    try {
      if (editingDepartment) {
        // تحديث القسم
        const { error } = await supabase
          .from("academic_departments")
          .update({
            title: formData.title,
            description: formData.description,
            image_url: formData.image_url || null
          })
          .eq("id", editingDepartment.id)

        if (error) throw error
        toast.success("تم تحديث القسم بنجاح")
        setIsEditDialogOpen(false)
      } else {
        // إضافة قسم جديد
        const { error } = await supabase
          .from("academic_departments")
          .insert({
            title: formData.title,
            description: formData.description,
            image_url: formData.image_url || null
          })

        if (error) throw error
        toast.success("تم إضافة القسم بنجاح")
        setIsAddDialogOpen(false)
      }

      // إعادة تحميل البيانات
      fetchDepartments()
      resetForm()
    } catch (error) {
      console.error("Error saving department:", error)
      toast.error("حدث خطأ أثناء الحفظ")
    }
  }

  const handleEdit = (department: AcademicDepartment) => {
    setEditingDepartment(department)
    setFormData({
      title: department.title,
      description: department.description || "",
      image_url: department.image_url || ""
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا القسم؟ سيتم حذف جميع البرامج المرتبطة به أيضاً.")) {
      return
    }

    try {
      const { error } = await supabase
        .from("academic_departments")
        .delete()
        .eq("id", id)

      if (error) throw error
      toast.success("تم حذف القسم بنجاح")
      fetchDepartments()
    } catch (error) {
      console.error("Error deleting department:", error)
      toast.error("حدث خطأ أثناء الحذف")
    }
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", image_url: "" })
    setEditingDepartment(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // في التطبيق الحقيقي، يمكن رفع الصورة إلى Supabase Storage
      // هنا سنستخدم رابط مؤقت للتوضيح
      const imageUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, image_url: imageUrl }))
      toast.success("تم تحديد الصورة")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-academy-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
      {/* Header Section */}
      <div className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-academy-blue-dark/90 via-academy-blue/80 to-academy-blue-light/90"></div>
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center">
                <Building2 className="text-academy-blue text-2xl" size={32} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              إدارة الأقسام الأكاديمية
            </h1>
            <p className="text-xl text-white/90 mb-2 max-w-2xl mx-auto leading-relaxed">
              إضافة وتعديل وحذف الأقسام الأكاديمية
            </p>
            <p className="text-white/70 max-w-xl mx-auto">
              إدارة شاملة لجميع الأقسام والبرامج التعليمية
            </p>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-academy-gold/15 rounded-full blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-academy-dark-gray text-sm font-medium">إجمالي الأقسام</p>
                  <p className="text-3xl font-bold text-academy-blue">{departments.length}</p>
                </div>
                <div className="w-12 h-12 bg-academy-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="text-academy-blue" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-academy-dark-gray text-sm font-medium">إجمالي البرامج</p>
                  <p className="text-3xl font-bold text-academy-blue">0</p>
                </div>
                <div className="w-12 h-12 bg-academy-gold-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-academy-gold-700" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-academy-dark-gray text-sm font-medium">الطلاب المسجلين</p>
                  <p className="text-3xl font-bold text-academy-blue">0</p>
                </div>
                <div className="w-12 h-12 bg-academy-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="text-academy-blue" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Department Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-academy-blue">الأقسام الأكاديمية</h2>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus size={20} className="ml-2" />
                إضافة قسم جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-academy-blue text-center">
                  إضافة قسم أكاديمي جديد
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-academy-blue font-semibold">
                    صورة القسم
                  </Label>
                  <div className="flex flex-col items-center space-y-4">
                    {formData.image_url && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-academy-gold/20">
                        <Image
                          src={formData.image_url}
                          alt="معاينة الصورة"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="w-full">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="flex items-center justify-center w-full p-4 border-2 border-dashed border-academy-gold/30 rounded-lg cursor-pointer hover:border-academy-gold/60 transition-colors duration-300 bg-academy-gold/5 hover:bg-academy-gold/10"
                      >
                        <Upload size={24} className="text-academy-gold ml-2" />
                        <span className="text-academy-blue font-medium">
                          {formData.image_url ? "تغيير الصورة" : "اختيار صورة"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Department Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-academy-blue font-semibold">
                    عنوان القسم *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان القسم"
                    className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20"
                    required
                  />
                </div>

                {/* Department Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-academy-blue font-semibold">
                    وصف القسم
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="أدخل وصف مفصل للقسم"
                    rows={4}
                    className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20 resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    إضافة القسم
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false)
                      resetForm()
                    }}
                    className="flex-1 border-academy-blue/20 text-academy-blue hover:bg-academy-blue/5 py-3 rounded-xl"
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-academy-blue text-center">
                تعديل القسم الأكاديمي
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="edit-image" className="text-academy-blue font-semibold">
                  صورة القسم
                </Label>
                <div className="flex flex-col items-center space-y-4">
                  {formData.image_url && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-academy-gold/20">
                      <Image
                        src={formData.image_url}
                        alt="معاينة الصورة"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="w-full">
                    <input
                      type="file"
                      id="edit-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="edit-image"
                      className="flex items-center justify-center w-full p-4 border-2 border-dashed border-academy-gold/30 rounded-lg cursor-pointer hover:border-academy-gold/60 transition-colors duration-300 bg-academy-gold/5 hover:bg-academy-gold/10"
                    >
                      <Upload size={24} className="text-academy-gold ml-2" />
                      <span className="text-academy-blue font-medium">
                        {formData.image_url ? "تغيير الصورة" : "اختيار صورة"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Department Title */}
              <div className="space-y-2">
                <Label htmlFor="edit-title" className="text-academy-blue font-semibold">
                  عنوان القسم *
                </Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="أدخل عنوان القسم"
                  className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20"
                  required
                />
              </div>

              {/* Department Description */}
              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-academy-blue font-semibold">
                  وصف القسم
                </Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف مفصل للقسم"
                  rows={4}
                  className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20 resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  حفظ التغييرات
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false)
                    resetForm()
                  }}
                  className="flex-1 border-academy-blue/20 text-academy-blue hover:bg-academy-blue/5 py-3 rounded-xl"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Departments Grid */}
        {departments.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-academy-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="text-academy-blue" size={40} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-2">لا توجد أقسام أكاديمية</h3>
              <p className="text-academy-dark-gray mb-6">ابدأ بإضافة أول قسم أكاديمي</p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus size={20} className="ml-2" />
                إضافة قسم جديد
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department, index) => (
              <Card
                key={department.id}
                className="group bg-white/90 backdrop-blur-sm hover:shadow-3xl border-0 shadow-2xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Department Image */}
                <div className="relative h-48 overflow-hidden">
                  {department.image_url ? (
                    <Image
                      src={department.image_url}
                      alt={department.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 flex items-center justify-center">
                      <ImageIcon className="text-academy-blue/40" size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Department Icon */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-500">
                      <Building2 className="text-academy-blue" size={20} />
                    </div>
                  </div>
                </div>

                {/* Department Info */}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-500 leading-tight">
                    {department.title}
                  </h3>
                  
                  <p className="text-academy-dark-gray text-sm leading-relaxed mb-6 line-clamp-3">
                    {department.description || "لا يوجد وصف متاح"}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Link href={`/dashboard/academic-departments/${department.id}/programs`}>
                      <Button className="w-full bg-gradient-to-r from-academy-blue to-academy-blue-600 text-white hover:from-academy-blue-600 hover:to-academy-blue font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Settings size={18} className="ml-2" />
                        إدارة البرامج
                      </Button>
                    </Link>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(department)}
                        variant="outline"
                        className="flex-1 border-academy-gold/30 text-academy-gold hover:bg-academy-gold/10 py-2 rounded-lg transition-all duration-300"
                      >
                        <Edit size={16} className="ml-1" />
                        تعديل
                      </Button>
                      
                      <Button
                        onClick={() => handleDelete(department.id)}
                        variant="outline"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-all duration-300"
                      >
                        <Trash2 size={16} className="ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}