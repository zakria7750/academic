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
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <GraduationCap className="text-academy-blue" size={32} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">هيئة التدريس</h1>
            </div>
            <p className="text-xl lg:text-2xl text-academy-gold font-medium">
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
      </section>

      {/* Faculty Stats */}
      <section className="py-16 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">{facultyMembers.length}+</h3>
                <p className="text-academy-dark-gray font-medium">عضو هيئة تدريس</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">15+</h3>
                <p className="text-academy-dark-gray font-medium">تخصص أكاديمي</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">25+</h3>
                <p className="text-academy-dark-gray font-medium">سنة خبرة متوسطة</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Faculty Members Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue mb-4">أعضاء هيئة التدريس</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              نخبة من الأساتذة المتميزين الحاصلين على أعلى الدرجات العلمية من أفضل الجامعات العالمية
            </p>
          </div>

          {facultyMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facultyMembers.map((member) => (
                <Card
                  key={member.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Member Image */}
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={member.image_url || "/placeholder.svg?height=400&width=400&text=عضو+هيئة+التدريس"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Specialization Badge */}
                      <div className="absolute top-4 right-4 bg-academy-gold text-academy-blue px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        أستاذ
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                        {member.name}
                      </h3>

                      {/* Specialization */}
                      <div className="flex items-center space-x-2 space-x-reverse mb-4">
                        <BookOpen size={16} className="text-academy-gold flex-shrink-0" />
                        <span className="text-academy-blue font-semibold text-sm">{member.specialization}</span>
                      </div>

                      {/* Biography */}
                      <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-4">{member.biography}</p>

                      {/* Read More Button */}
                      <button className="mt-4 text-academy-gold hover:text-academy-blue font-semibold text-sm transition-colors duration-200 group-hover:translate-x-1 inline-flex items-center">
                        اقرأ المزيد ←
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد بيانات</h3>
              <p className="text-academy-dark-gray">لم يتم إضافة أعضاء هيئة التدريس بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">تعلم من الخبراء</h2>
            <p className="text-xl mb-8 text-academy-gold">
              انضم إلى برامجنا التعليمية واستفد من خبرة أفضل الأساتذة في مختلف التخصصات
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/programs"
                className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 inline-block"
              >
                استكشف البرامج
              </a>
              <a
                href="/admission"
                className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 inline-block bg-transparent"
              >
                سجل الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
