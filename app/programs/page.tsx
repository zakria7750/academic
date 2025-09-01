import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign, GraduationCap, Award, Users, Star, Globe, Target, Brain, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Program, TrainingCourse } from "@/lib/supabase"

export const revalidate = 300; // ISR لمدة 5 دقائق

async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching programs:", error)
    return []
  }

  return data || []
}

async function getTrainingCourses(): Promise<TrainingCourse[]> {
  const { data, error } = await supabase.from("training_courses").select("*").order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching training courses:", error)
    return []
  }

  return data || []
}

export default async function ProgramsPage() {
  const programs = await getPrograms()
  const trainingCourses = await getTrainingCourses()

  const mastersPrograms = programs.filter((program) => program.type === "masters")
  const doctoratePrograms = programs.filter((program) => program.type === "doctorate")
  const diplomaPrograms = programs.filter((program) => program.type === "diploma")

  const ProgramCard = ({ program, index }: { program: Program; index: number }) => (
    <Card 
      className="group bg-white/90 backdrop-blur-sm hover:shadow-3xl border-0 shadow-2xl transition-all duration-700 hover:-translate-y-6 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Enhanced Program Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={program.image_url || "/placeholder.svg?height=300&width=300&text=برنامج+تعليمي"}
          alt={program.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Enhanced Program Type Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
          {program.type === "masters" ? "ماجستير" : program.type === "doctorate" ? "دكتوراه" : "دبلوم"}
        </div>

        {/* Enhanced Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <div className="text-white text-center w-full">
            <p className="text-lg font-semibold mb-2">اكتشف المزيد</p>
            <p className="text-sm opacity-90">انقر للتسجيل في البرنامج</p>
          </div>
        </div>
      </div>

      {/* Enhanced Program Info */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-500 leading-tight line-clamp-2">
          {program.name}
        </h3>

        {/* Enhanced Program Details */}
        <div className="space-y-4 mb-8">
          {program.duration && (
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-2xl border border-academy-blue/10">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Clock size={18} className="text-academy-gold" />
                <span className="text-academy-dark-gray text-sm font-medium">المدة</span>
              </div>
              <span className="text-academy-blue font-semibold text-sm">{program.duration}</span>
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-2xl border border-academy-blue/10">
            <div className="flex items-center space-x-3 space-x-reverse">
              <BookOpen size={18} className="text-academy-gold" />
              <span className="text-academy-dark-gray text-sm font-medium">عدد الساعات</span>
            </div>
            <span className="text-academy-blue font-semibold text-sm">{program.hours} ساعة</span>
          </div>

          {program.education_system && (
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-2xl border border-academy-blue/10">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Users size={18} className="text-academy-gold" />
                <span className="text-academy-dark-gray text-sm font-medium">نظام التعليم</span>
              </div>
              <span className="text-academy-blue font-semibold text-sm">{program.education_system}</span>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-academy-gold/10 to-academy-gold/20 rounded-2xl border border-academy-gold/20">
            <div className="flex items-center space-x-3 space-x-reverse">
              <DollarSign size={20} className="text-academy-gold" />
              <span className="text-academy-dark-gray text-sm font-medium">الرسوم الدراسية</span>
            </div>
            <span className="text-academy-gold font-bold text-xl">{program.fees.toLocaleString()} ر.س</span>
          </div>
        </div>

        {/* Enhanced Registration Button */}
        <Link href="/admission">
          <Button className="w-full bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
            التسجيل الآن
            <div className="w-2 h-2 bg-academy-blue rounded-full ml-2 animate-pulse"></div>
          </Button>
        </Link>
      </div>
    </Card>
  )

  const TrainingCourseCard = ({ course, index }: { course: TrainingCourse; index: number }) => (
    <Card 
      className="group bg-white/90 backdrop-blur-sm hover:shadow-3xl border-0 shadow-2xl transition-all duration-700 hover:-translate-y-6 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Enhanced Course Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={course.image_url || "/placeholder.svg?height=300&width=300&text=دورة+تدريبية"}
          alt={course.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Enhanced Course Type Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
          دورة تدريبية
        </div>

        {/* Enhanced Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <div className="text-white text-center w-full">
            <p className="text-lg font-semibold mb-2">اكتشف المزيد</p>
            <p className="text-sm opacity-90">انقر للتسجيل في الدورة</p>
          </div>
        </div>
      </div>

      {/* Enhanced Course Info */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-500 leading-tight line-clamp-2">
          {course.name}
        </h3>

        {/* Enhanced Course Details */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-2xl border border-academy-blue/10">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Clock size={18} className="text-academy-gold" />
              <span className="text-academy-dark-gray text-sm font-medium">مدة الدورة</span>
            </div>
            <span className="text-academy-blue font-semibold text-sm">{course.duration}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-2xl border border-academy-blue/10">
            <div className="flex items-center space-x-3 space-x-reverse">
              <BookOpen size={18} className="text-academy-gold" />
              <span className="text-academy-dark-gray text-sm font-medium">عدد الساعات</span>
            </div>
            <span className="text-academy-blue font-semibold text-sm">{course.hours} ساعة</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-2xl border border-academy-blue/10">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Users size={18} className="text-academy-gold" />
              <span className="text-academy-dark-gray text-sm font-medium">نظام التعليم</span>
            </div>
            <span className="text-academy-blue font-semibold text-sm">{course.education_system}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-academy-gold/10 to-academy-gold/20 rounded-2xl border border-academy-gold/20">
            <div className="flex items-center space-x-3 space-x-reverse">
              <DollarSign size={20} className="text-academy-gold" />
              <span className="text-academy-dark-gray text-sm font-medium">الرسوم الدراسية</span>
            </div>
            <span className="text-academy-gold font-bold text-xl">{course.fees.toLocaleString()} ر.س</span>
          </div>
        </div>

        {/* Enhanced Registration Button */}
        <Link href="/admission">
          <Button className="w-full bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
            التسجيل الآن
            <div className="w-2 h-2 bg-academy-blue rounded-full ml-2 animate-pulse"></div>
          </Button>
        </Link>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Ultra Premium Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,31,63,0.05),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]"></div>
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/10 via-academy-gold/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-br from-academy-blue/8 via-academy-blue/4 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-academy-gold/6 to-academy-blue/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-academy-gold/40 rotate-45 animate-pulse delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-academy-blue/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-academy-gold/50 rotate-45 animate-pulse delay-1100"></div>
      </div>

      {/* Ultra Premium Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="absolute inset-0 opacity-30 bg-black z-10"></div>

        {/* Multi-layered Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/80 to-academy-blue/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)]"></div>
        
        {/* Ultra Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/25 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-gold/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-academy-gold/15 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-academy-gold/25 rounded-full blur-xl animate-pulse delay-1500"></div>
          
          {/* Premium Geometric Patterns */}
          <div className="absolute top-32 left-1/3 w-6 h-6 border-2 border-academy-gold/30 rotate-45 animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-4 h-4 bg-academy-gold/20 rounded-full animate-pulse delay-2500"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-8xl px-6 lg:px-8">
          
          <div className="text-center text-white">
            {/* Premium Title Section */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                  البرامج التعليمية
                </span>
              </h1>
            </div>
            
            {/* Premium Description */}
            <div className="mb-16">
              <p className="text-2xl lg:text-3xl mb-6 font-semibold leading-relaxed">
                <span className="bg-gradient-to-r from-academy-gold-light to-white bg-clip-text text-transparent">
                  اكتشف مجموعة واسعة من البرامج التعليمية المتميزة
                </span>
              </p>
              <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                نقدم لك أفضل الفرص التعليمية لتحقيق أحلامك المهنية مع أحدث المعايير الدولية
              </p>
              
              {/* Premium Stats Preview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">{doctoratePrograms.length}</div>
                  <div className="text-white/80">برنامج دكتوراه</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">{mastersPrograms.length}</div>
                  <div className="text-white/80">برنامج ماجستير</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">{diplomaPrograms.length}</div>
                  <div className="text-white/80">دبلوم مهني</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">{trainingCourses.length}</div>
                  <div className="text-white/80">دورة تدريبية</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-university-campus-students-1440.webp"
            alt="أكاديمية المعرفة الدولية"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Enhanced Programs Stats */}
      <section className="py-20 bg-gradient-to-br from-academy-gray to-academy-gray-light relative">
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <Award className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">{doctoratePrograms.length}</h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">برامج دكتوراه</p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>
            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <GraduationCap className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">{mastersPrograms.length}</h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">برامج ماجستير</p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>
            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <BookOpen className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">{diplomaPrograms.length}</h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">دبلومات مهنية</p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <Zap className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">{trainingCourses.length}</h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">دورات تدريبية</p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Doctorate Programs Section */}
      <section className="py-24 bg-gradient-to-br from-academy-gray to-academy-gray-light relative">
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Award className="text-academy-gold text-2xl" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue">برامج الدكتوراه المهنية</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              برامج دكتوراه متقدمة تركز على البحث التطبيقي والممارسة المهنية المتخصصة
              <br />
              <span className="text-lg text-academy-darker-gray">نقدم أعلى مستويات التخصص والبحث العلمي</span>
            </p>
          </div>

          {doctoratePrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {doctoratePrograms.map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-academy-blue/20 to-academy-blue/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Award className="text-academy-blue text-6xl" />
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد برامج دكتوراه</h3>
              <p className="text-academy-dark-gray text-lg">لم يتم إضافة برامج الدكتوراه بعد.</p>
            </div>
          )}
        </div>
      </section>
        {/* Enhanced Masters Programs Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/2 to-academy-gold/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                <GraduationCap className="text-academy-blue text-2xl" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue">برامج الماجستير المهني</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              برامج ماجستير متخصصة تجمع بين الأسس النظرية والتطبيق العملي لإعداد خبراء في مختلف المجالات
              <br />
              <span className="text-lg text-academy-darker-gray">نقدم تعليماً عالي الجودة مع أحدث المناهج والتقنيات</span>
            </p>
          </div>

          {mastersPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {mastersPrograms.map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <GraduationCap className="text-academy-gold text-6xl" />
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد برامج ماجستير</h3>
              <p className="text-academy-dark-gray text-lg">لم يتم إضافة برامج الماجستير بعد.</p>
            </div>
          )}
        </div>
      </section>
      {/* Enhanced Diploma Programs Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/2 to-academy-gold/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                <BookOpen className="text-academy-blue text-2xl" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue">الدبلومات المهنية</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              دبلومات مهنية متخصصة تركز على المهارات العملية والتطبيقية في مختلف المجالات
              <br />
              <span className="text-lg text-academy-darker-gray">نقدم تدريباً عملياً مكثفاً للمهارات المهنية</span>
            </p>
          </div>

          {diplomaPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {diplomaPrograms.map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <BookOpen className="text-academy-gold text-6xl" />
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد دبلومات</h3>
              <p className="text-academy-dark-gray text-lg">لم يتم إضافة الدبلومات المهنية بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Training Courses Section */}
      <section className="py-24 bg-gradient-to-br from-academy-gray to-academy-gray-light relative">
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Zap className="text-academy-gold text-2xl" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue">الدورات التدريبية</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              دورات تدريبية متخصصة ومكثفة تركز على تطوير المهارات العملية والمعرفة التطبيقية
              <br />
              <span className="text-lg text-academy-darker-gray">نقدم تدريباً عملياً مكثفاً لتنمية المهارات المهنية</span>
            </p>
          </div>

          {trainingCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {trainingCourses.map((course, index) => (
                <TrainingCourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-academy-blue/20 to-academy-blue/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Zap className="text-academy-blue text-6xl" />
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد دورات تدريبية</h3>
              <p className="text-academy-dark-gray text-lg">لم يتم إضافة الدورات التدريبية بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-700 to-academy-blue-900">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-academy-gold/15 via-transparent to-academy-gold/10"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-academy-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-academy-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto text-white">
            <div className="inline-block mb-8">
              <div className="w-24 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-academy-gold-100 to-white bg-clip-text text-transparent">
              ابدأ رحلتك الأكاديمية اليوم
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-academy-gold-100 leading-relaxed max-w-4xl mx-auto">
              اختر البرنامج الذي يناسب أهدافك المهنية وانطلق نحو مستقبل مشرق مع أكاديمية المعرفة الدولية
              <br />
              <span className="text-lg text-academy-gold-200">نحن هنا لمساعدتك في تحقيق أحلامك التعليمية</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/admission">
                <Button className="group bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0">
                  <span className="mr-2">سجل الآن</span>
                  <div className="w-3 h-3 bg-academy-blue rounded-full group-hover:animate-pulse"></div>
                </Button>
              </Link>
              <Link href="/departments">
                <Button
                  variant="outline"
                  className="group border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:backdrop-blur-md"
                >
                  <span className="mr-2">استكشف الأقسام</span>
                  <div className="w-3 h-3 bg-white rounded-full group-hover:animate-pulse"></div>
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
                <Target className="text-academy-gold text-lg" />
                <span className="text-white font-medium">أهداف واضحة</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Brain className="text-academy-gold text-lg" />
                <span className="text-white font-medium">تطوير المهارات</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
