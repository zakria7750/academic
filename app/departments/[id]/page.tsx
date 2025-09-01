"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase, type AcademicDepartment, type AcademicProgram } from "@/lib/supabase"
import { 
  ArrowRight, 
  BookOpen, 
  Clock, 
  DollarSign, 
  Target, 
  Users, 
  Award, 
  Brain, 
  GraduationCap,
  Building2,
  Star,
  Globe,
  Image as ImageIcon
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// أيقونات الأقسام المختلفة
const departmentIcons = [Brain, Target, BookOpen, Users, Award, Building2, GraduationCap];
const departmentColors = [
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-green-500 to-green-600", 
  "bg-gradient-to-br from-purple-500 to-purple-600",
  "bg-gradient-to-br from-orange-500 to-orange-600",
  "bg-gradient-to-br from-red-500 to-red-600",
  "bg-gradient-to-br from-indigo-500 to-indigo-600",
  "bg-gradient-to-br from-pink-500 to-pink-600"
];

export default function DepartmentDetailPage() {
  const params = useParams()
  const departmentId = params.id as string

  const [department, setDepartment] = useState<AcademicDepartment | null>(null)
  const [programs, setPrograms] = useState<AcademicProgram[]>([])
  const [allDepartments, setAllDepartments] = useState<AcademicDepartment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (departmentId) {
      fetchDepartmentData()
    }
  }, [departmentId])

  const fetchDepartmentData = async () => {
    try {
      // جلب بيانات القسم المحدد
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

      // جلب جميع الأقسام للإحصائيات
      const { data: allDepartmentsData, error: allDepartmentsError } = await supabase
        .from("academic_departments")
        .select("*")

      if (allDepartmentsError) throw allDepartmentsError
      setAllDepartments(allDepartmentsData || [])
      
    } catch (error) {
      console.error("Error fetching department data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-academy-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  if (!department) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-8 text-center">
          <h3 className="text-xl font-bold text-academy-blue mb-4">القسم غير موجود</h3>
          <Link href="/departments">
            <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue">
              العودة إلى الأقسام
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  // الحصول على أيقونة ولون القسم
  const departmentIndex = allDepartments.findIndex(dept => dept.id === department.id)
  const Icon = departmentIcons[departmentIndex % departmentIcons.length] || Building2
  const color = departmentColors[departmentIndex % departmentColors.length]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Ultra Premium Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,31,63,0.05),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]"></div>
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/10 via-academy-gold/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-br from-academy-blue/8 via-academy-blue/4 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/80 to-academy-blue/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)]"></div>

        <div className="relative z-10 container mx-auto max-w-8xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-8">
            <Link href="/departments" className="text-academy-gold hover:text-academy-gold-light transition-colors">
              الأقسام الأكاديمية
            </Link>
            <ArrowRight className="text-white/60" size={16} />
            <span className="text-white/80">{department.title}</span>
          </div>

          <div className="text-center text-white">
            {/* Department Icon */}
            <div className="relative inline-block mb-16">
              <div className="p-8 bg-white/15 backdrop-blur-2xl rounded-[2rem] border border-white/25 shadow-[0_32px_64px_rgba(0,0,0,0.25)]">
                <div className="relative">
                  <div className={`w-32 h-32 ${color} rounded-3xl flex items-center justify-center shadow-2xl border border-white/20`}>
                    <Icon className="text-white drop-shadow-lg" size={60} />
                  </div>
                </div>
              </div>
            </div>

            {/* Department Title */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                  {department.title}
                </span>
              </h1>
            </div>

            {/* Department Description */}
            <div className="mb-16">
              <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                {department.description}
              </p>

              {/* Stats Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
                  <div className="text-3xl font-bold text-academy-gold mb-2">
                    {programs.length}
                  </div>
                  <div className="text-white/80">برنامج متاح</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
                  <div className="text-3xl font-bold text-academy-gold mb-2">
                    {programs.reduce((total, program) => total + program.hours, 0)}
                  </div>
                  <div className="text-white/80">إجمالي الساعات</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
                  <div className="text-3xl font-bold text-academy-gold mb-2">
                    {programs.length > 0 
                      ? Math.round(programs.reduce((total, program) => total + program.fees, 0) / programs.length)
                      : 0}$
                  </div>
                  <div className="text-white/80">متوسط الرسوم</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/2 to-academy-gold/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6">
              البرامج التعليمية
            </h2>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              استكشف البرامج التعليمية المتاحة في {department.title}
            </p>
          </div>

          {programs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-academy-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-academy-blue" size={40} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-2">لا توجد برامج في هذا القسم</h3>
              <p className="text-academy-dark-gray mb-6">لم يتم إضافة أي برامج بعد</p>
              <Link href="/departments">
                <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue">
                  العودة إلى الأقسام
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {programs.map((program, index) => (
                <Card
                  key={program.id}
                  className="group bg-white/90 backdrop-blur-sm hover:shadow-3xl border-0 shadow-2xl transition-all duration-700 hover:-translate-y-6 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Program Image */}
                  <div className="relative h-56 overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Hours Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                      {program.hours} ساعة
                    </div>

                    {/* Program Icon */}
                    <div className="absolute bottom-4 right-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                        <BookOpen className="text-academy-blue text-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Program Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-500 leading-tight">
                      {program.name}
                    </h3>

                    <p className="text-academy-dark-gray text-base leading-relaxed mb-6 line-clamp-3">
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

                    {/* Apply Button */}
                    <Link href="/admission">
                      <Button className="w-full bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                        التقديم للبرنامج
                        <div className="w-2 h-2 bg-academy-blue rounded-full ml-2 animate-pulse"></div>
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Department Stats Section */}
      <section className="py-20 bg-gradient-to-br from-academy-gray to-academy-gray-light relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-academy-blue mb-4">إحصائيات القسم</h2>
            <p className="text-academy-dark-gray">نظرة شاملة على {department.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-academy-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-academy-blue" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-academy-blue mb-2">{programs.length}</h3>
                <p className="text-academy-dark-gray text-sm">برنامج متاح</p>
              </CardContent>
            </Card>

            <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-academy-gold-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-academy-gold-700" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-academy-blue mb-2">
                  {programs.reduce((total, program) => total + program.hours, 0)}
                </h3>
                <p className="text-academy-dark-gray text-sm">إجمالي الساعات</p>
              </CardContent>
            </Card>

            <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-academy-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="text-academy-blue" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-academy-blue mb-2">
                  {programs.length > 0 
                    ? Math.round(programs.reduce((total, program) => total + program.fees, 0) / programs.length)
                    : 0}$
                </h3>
                <p className="text-academy-dark-gray text-sm">متوسط الرسوم</p>
              </CardContent>
            </Card>

            <Card className="stats-card bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-academy-gold-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="text-academy-gold-700" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-academy-blue mb-2">100%</h3>
                <p className="text-academy-dark-gray text-sm">معتمدة دولياً</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-700 to-academy-blue-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-academy-gold-100 to-white bg-clip-text text-transparent">
              ابدأ رحلتك التعليمية
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-academy-gold-100 leading-relaxed max-w-4xl mx-auto">
              اختر البرنامج الذي يناسب اهتماماتك وأهدافك المهنية
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/admission">
                <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                  سجل الآن
                </Button>
              </Link>

              <Link href="/departments">
                <Button
                  variant="outline"
                  className="border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm"
                >
                  استكشف الأقسام الأخرى
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Star className="text-academy-gold text-lg" />
                <span className="text-white font-medium">تعليم عالي الجودة</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Globe className="text-academy-gold text-lg" />
                <span className="text-white font-medium">اعتماد دولي</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Users className="text-academy-gold text-lg" />
                <span className="text-white font-medium">أساتذة متخصصون</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}