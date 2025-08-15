import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign, GraduationCap, Award, Users, Star, Globe, Target, Brain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Program } from "@/lib/supabase"

export const revalidate = 300; // ISR لمدة 5 دقائق

async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching programs:", error)
    return []
  }

  return data || []
}

export default async function ProgramsPage() {
  const programs = await getPrograms()

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

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-600 to-academy-blue-800">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-academy-gold/15 via-transparent to-academy-gold/10"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-academy-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-academy-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-academy-gold/30 rounded-full blur-lg animate-pulse delay-2000"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Enhanced Header */}
            <div className="flex flex-col items-center justify-center space-y-6 mb-12">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-500">
                  <GraduationCap className="text-academy-blue text-4xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-academy-gold rounded-full flex items-center justify-center">
                  <Star className="text-academy-blue text-sm" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-academy-gold-100 to-white bg-clip-text text-transparent">
                البرامج التعليمية
              </h1>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-academy-gold-100 font-medium max-w-4xl mx-auto leading-relaxed mb-8">
              اكتشف مجموعة واسعة من البرامج التعليمية المتميزة والمعتمدة دولياً
              <br />
              <span className="text-lg text-academy-gold-200">نقدم لك أفضل الفرص التعليمية لتحقيق أحلامك المهنية</span>
            </p>
            
            {/* Enhanced Stats Preview */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <GraduationCap className="text-academy-gold text-xl" />
                <span className="text-white font-semibold">{mastersPrograms.length} برنامج ماجستير</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Award className="text-academy-gold text-xl" />
                <span className="text-white font-semibold">{doctoratePrograms.length} برنامج دكتوراه</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <BookOpen className="text-academy-gold text-xl" />
                <span className="text-white font-semibold">{diplomaPrograms.length} دبلوم مهني</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Programs Stats */}
      <section className="py-20 bg-gradient-to-br from-academy-gray to-academy-gray-light relative">
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <BookOpen className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">{diplomaPrograms.length}</h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">دبلومات مهنية</p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>
          </div>
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
