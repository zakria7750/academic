import { getGraduates } from "@/app/actions/graduates-actions"
import { GraduateCard } from "@/components/graduate-card"
import { GraduateApplicationForm } from "@/components/graduate-application-form"
import { GraduationCap, Users, Trophy, Globe } from "lucide-react"
import Image from "next/image"

export const revalidate = 300; // ISR لمدة 5 دقائق

export default async function GraduatesPage() {
  const graduates = await getGraduates()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto max-w-6xl px-4">
          <div className="text-center text-white">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center">
                <GraduationCap className="text-academy-blue text-2xl" size={32} />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">خريجو الأكاديمية</h1>
            <p className="text-xl md:text-2xl text-academy-gold font-medium max-w-3xl mx-auto leading-relaxed">
              نفخر بإنجازات خريجينا المتميزين الذين يقودون التغيير في مختلف المجالات حول العالم
            </p>

            {/* Enhanced Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-academy-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="text-academy-gold" size={24} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{graduates.length}+</div>
                <div className="text-academy-gold font-medium">خريج متميز</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-academy-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-academy-gold" size={24} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-academy-gold font-medium">دولة</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-academy-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="text-academy-gold" size={24} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-academy-gold font-medium">معدل التوظيف</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-academy-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="text-academy-gold" size={24} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-academy-gold font-medium">تخصص</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/graduates-hero-background.png"
            alt="خريجو أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-academy-gold/15 rounded-full blur-xl"></div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-br from-academy-gray-light via-academy-gray to-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-academy-blue/10 rounded-full mb-6">
              <Trophy className="text-academy-blue" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-6">قصص النجاح</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto leading-relaxed">
              اكتشف كيف غيرت أكاديمية المعرفة الدولية حياة خريجينا المهنية ومساراتهم نحو النجاح
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graduates.map((graduate) => (
              <GraduateCard key={graduate.id} graduate={graduate} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Network Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5"></div>
        <div className="relative container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-full mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-full flex items-center justify-center">
                <Users className="text-white" size={32} />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-6">انضم إلى شبكة خريجي الأكاديمية</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto leading-relaxed">
              شارك قصة نجاحك مع المجتمع وكن مصدر إلهام للطلاب الحاليين والمستقبليين
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-academy-blue/10 via-academy-gold/10 to-academy-blue/10 p-8">
              <GraduateApplicationForm />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-academy-blue/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-academy-gold/10 rounded-full blur-xl"></div>
      </section>
    </div>
  )
}
