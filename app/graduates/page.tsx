import { getGraduates } from "@/app/actions/graduates-actions"
import { GraduateCard } from "@/components/graduate-card"
import { GraduateApplicationForm } from "@/components/graduate-application-form"
import { GraduationCap, Users, Trophy, Globe, Star, Crown, Sparkles, Award } from "lucide-react"
import Image from "next/image"

export const revalidate = 300; // ISR لمدة 5 دقائق

export default async function GraduatesPage() {
  const graduates = await getGraduates()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-academy-blue/5 via-transparent to-academy-gold/5"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-academy-gold/5 to-academy-blue/5 rounded-full blur-3xl"></div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Enhanced Background with Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/70 to-academy-blue/50"></div>
        
        {/* Premium Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/graduates-hero-background.png"
            alt="خريجو أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/60 via-academy-blue/40 to-academy-blue-dark/80"></div>
        </div>
        
        {/* Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-academy-gold/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-academy-gold/15 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Premium Icon Section */}
            <div className="relative inline-block mb-12">
              <div className="p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <GraduationCap className="text-academy-blue" size={40} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-6 w-4 h-4 bg-academy-gold-light rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Premium Title Section */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                  خريجو الأكاديمية
                </span>
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={24} />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl text-academy-gold-light font-medium max-w-4xl mx-auto leading-relaxed">
                نفخر بإنجازات خريجينا المتميزين الذين يقودون التغيير في مختلف المجالات حول العالم
              </p>
            </div>

            {/* Premium Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-20">
              {/* Graduates Count */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="text-emerald-300" size={28} />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-3">{graduates.length}+</div>
                    <div className="text-emerald-300 font-semibold text-lg">خريج متميز</div>
                  </div>
                </div>
              </div>

              {/* Countries */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Globe className="text-blue-300" size={28} />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-3">15+</div>
                    <div className="text-blue-300 font-semibold text-lg">دولة</div>
                  </div>
                </div>
              </div>

              {/* Employment Rate */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-academy-gold/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-academy-gold/20 to-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="text-academy-gold-light" size={28} />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-3">95%</div>
                    <div className="text-academy-gold-light font-semibold text-lg">معدل التوظيف</div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Award className="text-purple-300" size={28} />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-3">10+</div>
                    <div className="text-purple-300 font-semibold text-lg">تخصص</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Success Stories Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <div className="p-4 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <Trophy className="text-academy-gold" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                    <Star size={12} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 w-4 h-4 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-4 w-3 h-3 bg-academy-blue rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-academy-blue mb-6 tracking-tight">
                قصص النجاح
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={20} />
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-academy-dark-gray max-w-3xl mx-auto leading-relaxed font-medium">
                اكتشف كيف غيرت أكاديمية المعرفة الدولية حياة خريجينا المهنية ومساراتهم نحو النجاح
              </p>
            </div>
          </div>

          {/* Premium Graduates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {graduates.map((graduate) => (
              <GraduateCard key={graduate.id} graduate={graduate} />
            ))}
          </div>

          {/* Premium Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-lg flex items-center justify-center shadow-lg">
                  <Users className="text-white" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">انضم إلى مجتمع النجاح</h3>
              </div>
              <p className="text-academy-dark-gray leading-relaxed">
                كن جزءاً من شبكة خريجينا المتميزين واشترك في قصص النجاح التي تلهم الأجيال القادمة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Join Network Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-academy-gold/5 to-academy-blue/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto max-w-5xl px-6 lg:px-8">
          {/* Premium Section Header */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-10">
              <div className="p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <Users className="text-academy-gold" size={36} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -right-5 w-4 h-4 bg-academy-blue rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-academy-blue mb-8 tracking-tight leading-tight">
                انضم إلى شبكة خريجي الأكاديمية
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={20} />
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-academy-dark-gray max-w-3xl mx-auto leading-relaxed font-medium">
                شارك قصة نجاحك مع المجتمع وكن مصدر إلهام للطلاب الحاليين والمستقبليين
              </p>
            </div>

            {/* Premium Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-academy-blue font-bold text-lg mb-2">شارك إنجازاتك</h3>
                <p className="text-academy-dark-gray text-sm">اعرض مسيرتك المهنية وإنجازاتك المتميزة</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="text-blue-600" size={24} />
                </div>
                <h3 className="text-academy-blue font-bold text-lg mb-2">تواصل مع الخريجين</h3>
                <p className="text-academy-dark-gray text-sm">انضم إلى شبكة مهنية قوية من الخريجين</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/20 to-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-academy-blue font-bold text-lg mb-2">ألهم الآخرين</h3>
                <p className="text-academy-dark-gray text-sm">كن مصدر إلهام للجيل القادم من الطلاب</p>
              </div>
            </div>
          </div>

          {/* Premium Form Container */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue"></div>
            <div className="bg-gradient-to-br from-white/50 via-slate-50/30 to-blue-50/30 p-8 lg:p-12">
              <GraduateApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Floating Elements */}
      <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
            <span className="text-academy-blue font-medium text-sm">شبكة الخريجين النشطة</span>
          </div>
        </div>
      </div>
    </div>
  )
}
