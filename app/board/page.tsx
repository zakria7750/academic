import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { BoardMember } from "@/lib/supabase"
import { Users, Star, Trophy } from "lucide-react"

async function getBoardMembers(): Promise<BoardMember[]> {
  const { data, error } = await supabase.from("board_members").select("*").order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching board members:", error)
    return []
  }

  return data || []
}

export default async function BoardPage() {
  const boardMembers = await getBoardMembers()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <Users className="text-academy-blue" size={32} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">مجلس الإدارة</h1>
            </div>
            <p className="text-xl lg:text-2xl text-academy-gold font-medium">
              تعرف على أعضاء مجلس إدارة أكاديمية المعرفة الدولية
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/board-hero-background.png"
            alt="مجلس الإدارة - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-20 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue mb-4">أعضاء مجلس الإدارة</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              نخبة من القيادات الأكاديمية والمهنية المتميزة التي تقود الأكاديمية نحو التميز والريادة
            </p>
          </div>

          {boardMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {boardMembers.map((member) => (
                <Card
                  key={member.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Enhanced Member Image - Executive Circle */}
                    <div className="relative h-72 bg-gradient-to-br from-academy-blue-50 via-white to-academy-gold-50 flex items-center justify-center overflow-hidden">
                      <div className="relative w-48 h-48">
                        {/* Executive Ring Decoration */}
                        <div className="absolute inset-0 border-4 border-academy-gold/30 rounded-full animate-pulse"></div>
                        <div className="absolute inset-2 border-2 border-academy-blue/20 rounded-full"></div>
                        <div className="absolute inset-4 border border-academy-gold/40 rounded-full"></div>
                        
                        {/* Main image container */}
                        <div className="relative inset-6 absolute rounded-full overflow-hidden shadow-2xl transform group-hover:scale-110 transition-all duration-500 bg-white ring-2 ring-white">
                          <Image
                            src={member.image_url || "/placeholder.svg?height=300&width=300&text=عضو+المجلس"}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent"></div>
                        </div>

                        {/* Excellence Badge */}
                        <div className="absolute -top-2 -right-2 bg-academy-gold text-academy-blue p-2 rounded-full shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform duration-300">
                          <Star size={16} fill="currentColor" />
                        </div>

                        {/* Leadership Badge */}
                        <div className="absolute -bottom-2 -left-2 bg-academy-blue text-academy-gold p-2 rounded-full shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform duration-300">
                          <Trophy size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Member Info */}
                    <div className="p-6 text-center space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-academy-blue mb-2 line-clamp-2 group-hover:text-academy-gold transition-colors duration-300">
                          {member.name}
                        </h3>
                        <div className="inline-flex items-center justify-center">
                          <div className="bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 text-academy-blue px-4 py-2 rounded-full text-sm font-bold border border-academy-gold/30 shadow-sm">
                            {member.position}
                          </div>
                        </div>
                      </div>
                      <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-3">{member.experience}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد بيانات</h3>
              <p className="text-academy-dark-gray">لم يتم إضافة أعضاء مجلس الإدارة بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue mb-6">قيادة متميزة لمستقبل أفضل</h2>
            <p className="text-xl text-academy-dark-gray mb-8">
              يقود مجلس إدارتنا الأكاديمية بخبرة ورؤية واضحة نحو تحقيق التميز في التعليم والبحث العلمي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about"
                className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 inline-block"
              >
                تعرف على رؤيتنا
              </a>
              <a
                href="/programs"
                className="border-2 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 inline-block bg-transparent"
              >
                استكشف برامجنا
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
