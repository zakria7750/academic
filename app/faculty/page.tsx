import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { FacultyMember } from "@/lib/supabase"
import { GraduationCap, BookOpen, Award } from "lucide-react"

export const revalidate = 300; // 5 دقائق ISR

async function getFacultyMembers(): Promise<FacultyMember[]> {
  const { data, error } = await supabase.from("faculty_members").select("*").order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching faculty members:", error)
    return []
  }

  return data || []
}

export default async function FacultyPage() {
  const facultyMembers = await getFacultyMembers()

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center">
                <GraduationCap className="text-academy-blue" size={40} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">هيئة التدريس</h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-academy-gold font-medium max-w-4xl mx-auto leading-relaxed">
              تعرف على نخبة من أفضل الأساتذة والخبراء في مختلف التخصصات
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/faculty-hero-background.png"
            alt="هيئة التدريس - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-academy-gold/15 rounded-full blur-xl"></div>
      </section>

      {/* Enhanced Faculty Stats */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-academy-gray-light via-academy-gray to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden group">
              <CardContent className="p-8 text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="text-academy-gold" size={28} />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">{facultyMembers.length}+</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">عضو هيئة تدريس</p>
                <div className="absolute top-4 right-4 w-6 h-6 bg-academy-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden group">
              <CardContent className="p-8 text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="text-academy-blue" size={28} />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">15+</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">تخصص أكاديمي</p>
                <div className="absolute top-4 right-4 w-6 h-6 bg-academy-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden group sm:col-span-2 lg:col-span-1">
              <CardContent className="p-8 text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-gold rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="text-white" size={28} />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">25+</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">سنة خبرة متوسطة</p>
                <div className="absolute top-4 right-4 w-6 h-6 bg-academy-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Faculty Members Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-block p-3 bg-academy-blue/10 rounded-full mb-6">
              <BookOpen className="text-academy-blue" size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-academy-blue mb-6">أعضاء هيئة التدريس</h2>
            <p className="text-xl lg:text-2xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              نخبة من الأساتذة المتميزين الحاصلين على أعلى الدرجات العلمية من أفضل الجامعات العالمية
            </p>
          </div>

          {facultyMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
              {facultyMembers.map((member) => (
                <Card
                  key={member.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white overflow-hidden rounded-3xl relative"
                >
                  <CardContent className="p-0 relative">
                    {/* Enhanced Member Image - Oval Shape */}
                    <div className="relative p-6 pb-0">
                      <div className="relative w-full aspect-square overflow-hidden rounded-full mx-auto mb-6 ring-4 ring-academy-gold/20 group-hover:ring-academy-gold/40 transition-all duration-500">
                        <Image
                          src={member.image_url || "/placeholder.svg?height=300&width=300&text=عضو+هيئة+التدريس"}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Enhanced Member Info */}
                    <div className="px-6 pb-6 text-center">
                      <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                        {member.name}
                      </h3>

                      {/* Enhanced Specialization Badge */}
                      <div className="bg-gradient-to-r from-academy-gold to-academy-gold/80 text-academy-blue px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        {member.specialization}
                      </div>

                      {/* Enhanced Biography */}
                      <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-3 group-hover:text-academy-blue/80 transition-colors duration-300">
                        {member.biography}
                      </p>

                      {/* Enhanced Read More Button */}
                      <button className="mt-4 text-academy-gold hover:text-academy-blue font-bold text-sm transition-all duration-300 group-hover:translate-x-1 inline-flex items-center opacity-0 group-hover:opacity-100">
                        اقرأ المزيد ←
                      </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-academy-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-academy-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 lg:py-20">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-academy-blue mb-4">لا توجد بيانات</h3>
              <p className="text-academy-dark-gray text-lg">لم يتم إضافة أعضاء هيئة التدريس بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-20 lg:py-32 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto text-white">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
              <Award className="text-academy-gold" size={40} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">تعلم من الخبراء</h2>
            <p className="text-xl lg:text-2xl mb-8 text-academy-gold leading-relaxed max-w-3xl mx-auto">
              انضم إلى برامجنا التعليمية واستفد من خبرة أفضل الأساتذة في مختلف التخصصات
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <a
                href="/programs"
                className="bg-gradient-to-r from-academy-gold to-academy-gold-600 hover:from-academy-gold-600 hover:to-academy-gold-700 text-academy-blue font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block"
              >
                استكشف البرامج
              </a>
              <a
                href="/admission"
                className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block bg-transparent"
              >
                سجل الآن
              </a>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-academy-gold/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-academy-gold/10 rounded-full blur-xl"></div>
      </section>
    </div>
  )
}
