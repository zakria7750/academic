import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign, GraduationCap, Award, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Program } from "@/lib/supabase"

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

  const ProgramCard = ({ program }: { program: Program }) => (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden">
      <CardContent className="p-0">
        {/* Program Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={program.image_url || "/placeholder.svg?height=300&width=300&text=برنامج+تعليمي"}
            alt={program.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Program Type Badge */}
          <div className="absolute top-4 right-4 bg-academy-gold text-academy-blue px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {program.type === "masters" ? "ماجستير" : program.type === "doctorate" ? "دكتوراه" : "دبلوم"}
          </div>
        </div>

        {/* Program Info */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-300 line-clamp-2">
            {program.name}
          </h3>

          {/* Program Details */}
          <div className="space-y-3 mb-6">
            {program.duration && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock size={16} className="text-academy-gold" />
                  <span className="text-academy-dark-gray text-sm">المدة</span>
                </div>
                <span className="text-academy-blue font-semibold text-sm">{program.duration}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <BookOpen size={16} className="text-academy-gold" />
                <span className="text-academy-dark-gray text-sm">عدد الساعات</span>
              </div>
              <span className="text-academy-blue font-semibold text-sm">{program.hours} ساعة</span>
            </div>

            {program.education_system && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users size={16} className="text-academy-gold" />
                  <span className="text-academy-dark-gray text-sm">نظام التعليم</span>
                </div>
                <span className="text-academy-blue font-semibold text-sm">{program.education_system}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2 space-x-reverse">
                <DollarSign size={16} className="text-academy-gold" />
                <span className="text-academy-dark-gray text-sm">الرسوم الدراسية</span>
              </div>
              <span className="text-academy-gold font-bold text-lg">{program.fees.toLocaleString()} ر.س</span>
            </div>
          </div>

          {/* Registration Button */}
          <Link href="/admission">
            <Button className="w-full bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              التسجيل الآن
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <GraduationCap className="text-academy-blue" size={32} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">البرامج التعليمية</h1>
            </div>
            <p className="text-xl lg:text-2xl text-academy-gold font-medium">
              اكتشف مجموعة واسعة من البرامج التعليمية المتميزة والمعتمدة دولياً
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/programs-hero-background.png"
            alt="البرامج التعليمية - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
      </section>

      {/* Programs Stats */}
      <section className="py-16 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">{mastersPrograms.length}</h3>
                <p className="text-academy-dark-gray font-medium">برامج ماجستير</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">{doctoratePrograms.length}</h3>
                <p className="text-academy-dark-gray font-medium">برامج دكتوراه</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">{diplomaPrograms.length}</h3>
                <p className="text-academy-dark-gray font-medium">دبلومات مهنية</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Masters Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center">
                <GraduationCap className="text-academy-blue" size={24} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue">برامج الماجستير المهني</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              برامج ماجستير متخصصة تجمع بين الأسس النظرية والتطبيق العملي لإعداد خبراء في مختلف المجالات
            </p>
          </div>

          {mastersPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mastersPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد برامج ماجستير</h3>
              <p className="text-academy-dark-gray">لم يتم إضافة برامج الماجستير بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Doctorate Programs Section */}
      <section className="py-20 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center">
                <Award className="text-academy-gold" size={24} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue">برامج الدكتوراه المهنية</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              برامج دكتوراه متقدمة تركز على البحث التطبيقي والممارسة المهنية المتخصصة
            </p>
          </div>

          {doctoratePrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctoratePrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد برامج دكتوراه</h3>
              <p className="text-academy-dark-gray">لم يتم إضافة برامج الدكتوراه بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Diploma Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center">
                <BookOpen className="text-academy-blue" size={24} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue">الدبلومات المهنية</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              دبلومات مهنية متخصصة تركز على المهارات العملية والتطبيقية في مختلف المجالات
            </p>
          </div>

          {diplomaPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {diplomaPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد دبلومات</h3>
              <p className="text-academy-dark-gray">لم يتم إضافة الدبلومات المهنية بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">ابدأ رحلتك الأكاديمية اليوم</h2>
            <p className="text-xl mb-8 text-academy-gold">
              اختر البرنامج الذي يناسب أهدافك المهنية وانطلق نحو مستقبل مشرق مع أكاديمية المعرفة الدولية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admission">
                <Button className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  سجل الآن
                </Button>
              </Link>
              <Link href="/departments">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  استكشف الأقسام
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
