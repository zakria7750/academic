import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { BoardMember } from "@/lib/supabase"

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
                <span className="text-academy-blue font-bold text-2xl">م</span>
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
      <section className="py-20 bg-gradient-to-br from-academy-gray to-white">
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
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white overflow-hidden rounded-3xl relative"
                >
                  <CardContent className="p-0 relative">
                    <div className="relative p-6 pb-0">
                      <div className="relative w-full aspect-square overflow-hidden rounded-full mx-auto mb-6 ring-4 ring-academy-gold/20 group-hover:ring-academy-gold/40 transition-all duration-500">
                        <Image
                          src={member.image_url || "/placeholder.svg?height=300&width=300&text=عضو+المجلس"}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 text-center">
                      <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                        {member.name}
                      </h3>
                      <div className="bg-gradient-to-r from-academy-gold to-academy-gold/80 text-academy-blue px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        {member.position}
                      </div>
                      <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-3 group-hover:text-academy-blue/80 transition-colors duration-300">
                        {member.experience}
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 bg-academy-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-academy-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-academy-gold text-4xl">👥</span>
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
