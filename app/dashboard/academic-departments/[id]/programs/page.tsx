"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase, type AcademicDepartment, type AcademicProgram } from "@/lib/supabase"
import { Plus, Edit, Trash2, ArrowRight, BookOpen, Clock, DollarSign, Upload, Image as ImageIcon, Building2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function DepartmentProgramsPage() {
  const params = useParams()
  const router = useRouter()
  const departmentId = params.id as string

  const [department, setDepartment] = useState<AcademicDepartment | null>(null)
  const [programs, setPrograms] = useState<AcademicProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<AcademicProgram | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hours: "",
    fees: "",
    image_url: ""
  })

  // جلب بيانات القسم والبرامج
  useEffect(() => {
    if (departmentId) {
      fetchDepartmentAndPrograms()
    }
  }, [departmentId])

  const fetchDepartmentAndPrograms = async () => {
    try {
      // جلب بيانات القسم
      const { data: departmentData, error: departmentError } = await supabase
        .from("academic_departments")
        .select("*")
        .eq("id", departmentId)
        .single()

      if (departmentError) throw departmentError
      setDepartment(departmentData)

      // جلب البرامج الخاصة بالقسم
      const { data: programsData, error: programsError } = await supabase
        .from("academic_programs")
        .select("*")
        .eq("department_id", departmentId)
        .order("created_at", { ascending: false })

      if (programsError) throw programsError
      setPrograms(programsData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("خطأ في جلب البيانات")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.hours || !formData.fees) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    try {
      if (editingProgram) {
        // تحديث البرنامج
        const { error } = await supabase
          .from("academic_programs")
          .update({
            name: formData.name,
            description: formData.description,
            hours: parseInt(formData.hours),
            fees: parseFloat(formData.fees),
            image_url: formData.image_url || null
          })
          .eq("id", editingProgram.id)

        if (error) throw error
        toast.success("تم تحديث البرنامج بنجاح")
        setIsEditDialogOpen(false)
      } else {
        // إضافة برنامج جديد
        const { error } = await supabase
          .from("academic_programs")
          .insert({
            department_id: departmentId,
            name: formData.name,
            description: formData.description,
            hours: parseInt(formData.hours),
            fees: parseFloat(formData.fees),
            image_url: formData.image_url || null
          })

        if (error) throw error
        toast.success("تم إضافة البرنامج بنجاح")
        setIsAddDialogOpen(false)
      }

      // إعادة تحميل البيانات
      fetchDepartmentAndPrograms()
      resetForm()
    } catch (error) {
      console.error("Error saving program:", error)
      toast.error("حدث خطأ أثناء الحفظ")
    }
  }

  const handleEdit = (program: AcademicProgram) => {
    setEditingProgram(program)
    setFormData({
      name: program.name,
      description: program.description || "",
      hours: program.hours.toString(),
      fees: program.fees.toString(),
      image_url: program.image_url || ""
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا البرنامج؟")) {
      return
    }

    try {
      const { error } = await supabase
        .from("academic_programs")
        .delete()
        .eq("id", id)

      if (error) throw error
      toast.success("تم حذف البرنامج بنجاح")
      fetchDepartmentAndPrograms()
    } catch (error) {
      console.error("Error deleting program:", error)
      toast.error("حدث خطأ أثناء الحذف")
    }
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", hours: "", fees: "", image_url: "" })
    setEditingProgram(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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

  if (!department) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-8 text-center">
          <h3 className="text-xl font-bold text-academy-blue mb-4">القسم غير موجود</h3>
          <Link href="/dashboard/academic-departments">
            <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue">
              العودة إلى الأقسام
            </Button>
          </Link>
        </Card>
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
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
              <Link href="/dashboard/academic-departments" className="text-academy-gold hover:text-academy-gold-light transition-colors">
                الأقسام الأكاديمية
              </Link>
              <ArrowRight className="text-white/60" size={16} />
              <span className="text-white/80">إدارة البرامج</span>
            </div>
            
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center">
                <BookOpen className="text-academy-blue text-2xl" size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {department.title}
            </h1>
            <p className="text-lg text-white/90 mb-2 max-w-2xl mx-auto leading-relaxed">
              إدارة البرامج التعليمية
            </p>
            <p className="text-white/70 max-w-xl mx-auto">
              {department.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-academy-dark-gray text-sm font-medium">إجمالي البرامج</p>
                  <p className="text-3xl font-bold text-academy-blue">{programs.length}</p>
                </div>
                <div className="w-12 h-12 bg-academy-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-academy-blue" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-academy-dark-gray text-sm font-medium">إجمالي الساعات</p>
                  <p className="text-3xl font-bold text-academy-blue">
                    {programs.reduce((total, program) => total + program.hours, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-academy-gold-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-academy-gold-700" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-academy-dark-gray text-sm font-medium">متوسط الرسوم</p>
                  <p className="text-3xl font-bold text-academy-blue">
                    {programs.length > 0 
                      ? Math.round(programs.reduce((total, program) => total + program.fees, 0) / programs.length)
                      : 0}$
                  </p>
                </div>
                <div className="w-12 h-12 bg-academy-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-academy-blue" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Program Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-academy-blue">البرامج التعليمية</h2>
            <p className="text-academy-dark-gray">إدارة البرامج الخاصة بـ {department.title}</p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/dashboard/academic-departments">
              <Button
                variant="outline"
                className="border-academy-blue/30 text-academy-blue hover:bg-academy-blue/5 px-4 py-2 rounded-lg"
              >
                <ArrowRight size={18} className="ml-2" />
                العودة للأقسام
              </Button>
            </Link>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus size={20} className="ml-2" />
                  إضافة برنامج
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-academy-blue text-center">
                    إضافة برنامج جديد
                  </DialogTitle>
                  <p className="text-academy-dark-gray text-center">
                    إضافة برنامج إلى {department.title}
                  </p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-academy-blue font-semibold">
                      صورة البرنامج
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

                  {/* Program Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-academy-blue font-semibold">
                      اسم البرنامج *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="أدخل اسم البرنامج"
                      className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20"
                      required
                    />
                  </div>

                  {/* Program Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-academy-blue font-semibold">
                      وصف البرنامج
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="أدخل وصف مفصل للبرنامج"
                      rows={4}
                      className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20 resize-none"
                    />
                  </div>

                  {/* Hours and Fees */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hours" className="text-academy-blue font-semibold">
                        عدد الساعات *
                      </Label>
                      <Input
                        id="hours"
                        type="number"
                        min="1"
                        value={formData.hours}
                        onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                        placeholder="عدد الساعات"
                        className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fees" className="text-academy-blue font-semibold">
                        الرسوم الدراسية ($) *
                      </Label>
                      <Input
                        id="fees"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.fees}
                        onChange={(e) => setFormData(prev => ({ ...prev, fees: e.target.value }))}
                        placeholder="الرسوم بالدولار"
                        className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {editingProgram ? "حفظ التغييرات" : "إضافة البرنامج"}
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
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-academy-blue text-center">
                تعديل البرنامج
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="edit-image" className="text-academy-blue font-semibold">
                  صورة البرنامج
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

              {/* Program Name */}
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-academy-blue font-semibold">
                  اسم البرنامج *
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="أدخل اسم البرنامج"
                  className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20"
                  required
                />
              </div>

              {/* Program Description */}
              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-academy-blue font-semibold">
                  وصف البرنامج
                </Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف مفصل للبرنامج"
                  rows={4}
                  className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20 resize-none"
                />
              </div>

              {/* Hours and Fees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-hours" className="text-academy-blue font-semibold">
                    عدد الساعات *
                  </Label>
                  <Input
                    id="edit-hours"
                    type="number"
                    min="1"
                    value={formData.hours}
                    onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                    placeholder="عدد الساعات"
                    className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-fees" className="text-academy-blue font-semibold">
                    الرسوم الدراسية ($) *
                  </Label>
                  <Input
                    id="edit-fees"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.fees}
                    onChange={(e) => setFormData(prev => ({ ...prev, fees: e.target.value }))}
                    placeholder="الرسوم بالدولار"
                    className="border-academy-blue/20 focus:border-academy-gold focus:ring-academy-gold/20"
                    required
                  />
                </div>
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

        {/* Programs Grid */}
        {programs.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-academy-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-academy-blue" size={40} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-2">لا توجد برامج في هذا القسم</h3>
              <p className="text-academy-dark-gray mb-6">ابدأ بإضافة أول برنامج تعليمي</p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus size={20} className="ml-2" />
                إضافة برنامج جديد
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card
                key={program.id}
                className="group bg-white/90 backdrop-blur-sm hover:shadow-3xl border-0 shadow-2xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Program Image */}
                <div className="relative h-48 overflow-hidden">
                  {program.image_url ? (
                    <Image
                      src={program.image_url}
                      alt={program.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 flex items-center justify-center">
                      <ImageIcon className="text-academy-blue/40" size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Program Icon */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-500">
                      <BookOpen className="text-academy-blue" size={20} />
                    </div>
                  </div>

                  {/* Hours Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {program.hours} ساعة
                  </div>
                </div>

                {/* Program Info */}
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-500 leading-tight">
                    {program.name}
                  </h3>
                  
                  <p className="text-academy-dark-gray text-sm leading-relaxed mb-4 line-clamp-2">
                    {program.description || "لا يوجد وصف متاح"}
                  </p>

                  {/* Program Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock size={16} className="text-academy-blue" />
                        <span className="text-academy-blue font-medium text-sm">المدة</span>
                      </div>
                      <span className="text-academy-dark-gray font-semibold text-sm">{program.hours} ساعة</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-academy-gold/5 to-academy-blue/5 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <DollarSign size={16} className="text-academy-gold-700" />
                        <span className="text-academy-blue font-medium text-sm">الرسوم</span>
                      </div>
                      <span className="text-academy-dark-gray font-semibold text-sm">${program.fees}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(program)}
                      variant="outline"
                      className="flex-1 border-academy-gold/30 text-academy-gold hover:bg-academy-gold/10 py-2 rounded-lg transition-all duration-300"
                    >
                      <Edit size={16} className="ml-1" />
                      تعديل
                    </Button>
                    
                    <Button
                      onClick={() => handleDelete(program.id)}
                      variant="outline"
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-all duration-300"
                    >
                      <Trash2 size={16} className="ml-1" />
                      حذف
                    </Button>
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