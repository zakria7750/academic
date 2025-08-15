import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { FacultyMember } from "@/lib/supabase"
import { GraduationCap, BookOpen, Award, Users, Star, Sparkles, Shield, Brain, Target, Eye, TrendingUp, Crown } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-academy-gray via-white to-academy-gray-light">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-600"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/85 to-academy-blue/90"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                             linear-gradient(45deg, transparent 40%, rgba(255, 215, 0, 0.03) 50%, transparent 60%)`
          }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 faculty-hero-padding">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Enhanced Logo and Title */}
            <div className="flex items-center justify-center mb-10">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-2xl ring-8 ring-white/20 ring-offset-4 ring-offset-academy-blue/50 logo-glow">
                  <GraduationCap className="text-academy-blue" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                  <Brain className="text-white" size={16} />
                </div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center">
                  <BookOpen className="text-academy-blue" size={12} />
                </div>
              </div>
            </div>
            
            <h1 className="faculty-responsive-title font-bold mb-6 leading-tight">
              <span className="premium-gradient-text">هيئة التدريس</span>
            </h1>
            
            <p className="faculty-responsive-subtitle mb-8 text-academy-gold-light font-medium leading-relaxed max-w-4xl mx-auto">
              تعرف على نخبة من أفضل الأساتذة والخبراء في مختلف التخصصات - علماء ومفكرون متميزون
            </p>
            
            {/* Academic Excellence Indicators */}
            <div className="academic-indicators flex items-center justify-center space-x-8 space-x-reverse text-academy-gold-light/80">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Brain className="text-academy-gold" size={18} />
                <span className="text-sm font-medium">خبراء متخصصون</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full academic-separator"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Award className="text-academy-gold" size={18} />
                <span className="text-sm font-medium">شهادات عليا</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full academic-separator"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Star className="text-academy-gold" size={18} />
                <span className="text-sm font-medium">تميز أكاديمي</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <Image
            src="/faculty-hero-background.png"
            alt="هيئة التدريس - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-15"
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl floating-element"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-academy-gold/15 rounded-full blur-xl floating-element-delayed"></div>
      </section>

      {/* Enhanced Faculty Stats */}
      <section className="faculty-section-spacing py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-academy-gray-light to-white"></div>
        <div className="relative z-10 container mx-auto px-4">
          {/* Enhanced Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 rounded-full mb-8">
              <div className="px-8 py-3 bg-white rounded-full shadow-lg">
                <span className="text-academy-blue font-bold text-sm flex items-center space-x-2 space-x-reverse">
                  <Award size={18} className="text-academy-gold" />
                  <span>إحصائيات التميز</span>
                </span>
              </div>
            </div>
          </div>

          <div className="faculty-stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card faculty-card-premium">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-full flex items-center justify-center mx-auto shadow-xl ring-4 ring-academy-blue/20 group-hover:ring-academy-blue/50 transition-all duration-500 group-hover:scale-110">
                    <GraduationCap className="text-academy-gold" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse flex items-center justify-center">
                    <Sparkles className="text-academy-blue" size={12} />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-blue-light transition-colors duration-300">
                  {facultyMembers.length}+
                </h3>
                <p className="text-academy-dark-gray font-semibold text-lg group-hover:text-academy-darker-gray transition-colors duration-300">
                  عضو هيئة تدريس
                </p>
                <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-6 h-6 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-full flex items-center justify-center">
                      <Star size={12} className="text-academy-gold" />
                    </div>
                    <span className="text-academy-blue font-semibold text-xs">نخبة متميزة</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card faculty-card-premium">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-gold/5 to-academy-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center mx-auto shadow-xl ring-4 ring-academy-gold/20 group-hover:ring-academy-gold/50 transition-all duration-500 group-hover:scale-110">
                    <BookOpen className="text-academy-blue" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse flex items-center justify-center">
                    <Brain className="text-academy-gold" size={12} />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                  15+
                </h3>
                <p className="text-academy-dark-gray font-semibold text-lg group-hover:text-academy-darker-gray transition-colors duration-300">
                  تخصص أكاديمي
                </p>
                <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-6 h-6 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center">
                      <BookOpen size={12} className="text-academy-blue" />
                    </div>
                    <span className="text-academy-blue font-semibold text-xs">تنوع شامل</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card faculty-card-premium sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 via-academy-gold/5 to-academy-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue via-academy-gold to-academy-blue-light rounded-full flex items-center justify-center mx-auto shadow-xl ring-4 ring-academy-gold/20 group-hover:ring-academy-gold/50 transition-all duration-500 group-hover:scale-110">
                    <Award className="text-white" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse flex items-center justify-center">
                    <Crown className="text-academy-blue" size={12} />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                  25+
                </h3>
                <p className="text-academy-dark-gray font-semibold text-lg group-hover:text-academy-darker-gray transition-colors duration-300">
                  سنة خبرة متوسطة
                </p>
                <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-6 h-6 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center">
                      <Award size={12} className="text-academy-blue" />
                    </div>
                    <span className="text-academy-blue font-semibold text-xs">خبرة عميقة</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Faculty Members Section */}
      <section className="faculty-section-spacing py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-gray-light via-white to-academy-gray-light"></div>
        <div className="relative z-10 container mx-auto px-4">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-blue/20 to-academy-blue/10 rounded-full mb-8">
              <div className="px-8 py-3 bg-white rounded-full shadow-lg">
                <span className="text-academy-blue font-bold text-sm flex items-center space-x-2 space-x-reverse">
                  <GraduationCap size={18} className="text-academy-gold" />
                  <span>أعضاء هيئة التدريس</span>
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6 leading-tight">
              نخبة من 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> الأساتذة المتميزين</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold mx-auto mb-8 rounded-full"></div>
            
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              نخبة من الأساتذة المتميزين الحاصلين على أعلى الدرجات العلمية من أفضل الجامعات العالمية وذوي الخبرة العملية الواسعة
            </p>
          </div>

          {facultyMembers.length > 0 ? (
            <div className="faculty-members-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-8xl mx-auto">
              {facultyMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card faculty-member-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <CardContent className="relative p-0">
                    {/* Enhanced Member Image */}
                    <div className="relative p-8 pb-0">
                      <div className="faculty-avatar relative w-full aspect-square overflow-hidden rounded-full mx-auto mb-6 ring-4 ring-academy-gold/20 group-hover:ring-academy-gold/60 transition-all duration-700 shadow-xl">
                        <Image
                          src={member.image_url || "/placeholder.svg?height=300&width=300&text=عضو+هيئة+التدريس"}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                        
                        {/* Academic Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <GraduationCap className="text-academy-blue" size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Member Info */}
                    <div className="px-8 pb-8 text-center">
                      <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-blue-light transition-colors duration-300 leading-tight">
                        {member.name}
                      </h3>

                      {/* Enhanced Specialization Badge */}
                      <div className="specialization-badge faculty-badge-premium bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        <span className="relative z-10">{member.specialization}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-academy-gold-light to-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Enhanced Biography */}
                      <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-3 group-hover:text-academy-darker-gray transition-colors duration-300 mb-4">
                        {member.biography}
                      </p>

                      {/* Enhanced Read More Button */}
                      <button className="mt-2 text-academy-gold hover:text-academy-blue font-bold text-sm transition-all duration-300 group-hover:translate-x-1 inline-flex items-center opacity-0 group-hover:opacity-100 space-x-2 space-x-reverse">
                        <span>اقرأ المزيد</span>
                        <Eye size={14} className="group-hover:scale-110 transition-transform duration-300" />
                      </button>

                      {/* Academic Excellence Indicator */}
                      <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-3">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="w-6 h-6 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-full flex items-center justify-center">
                            <Star size={12} className="text-academy-gold" />
                          </div>
                          <span className="text-academy-blue font-semibold text-xs">خبير أكاديمي</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-academy-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Sparkles className="text-academy-gold" size={14} />
                    </div>
                    <div className="absolute bottom-6 left-4 w-6 h-6 bg-academy-blue/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                      <Brain className="text-academy-blue" size={12} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Enhanced Empty State */
            <div className="faculty-empty-state text-center py-20">
              <div className="faculty-empty-icon relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-academy-gold/10">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center">
                    <GraduationCap className="text-academy-blue" size={32} />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Brain className="text-academy-blue" size={16} />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-academy-blue mb-4">قريباً</h3>
              <p className="text-academy-dark-gray text-lg leading-relaxed max-w-md mx-auto">
                سيتم إضافة أعضاء هيئة التدريس قريباً. ترقبوا النخبة المتميزة.
              </p>
              
              <div className="mt-8 flex items-center justify-center space-x-6 space-x-reverse text-academy-gold/60">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Brain size={16} />
                  <span className="text-sm">خبرة</span>
                </div>
                <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Award size={16} />
                  <span className="text-sm">تميز</span>
                </div>
                <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Star size={16} />
                  <span className="text-sm">جودة</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/80 to-academy-blue/90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.15) 0%, transparent 60%), 
                           radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 60%),
                           linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%)`
        }}></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto text-white">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center p-1 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <div className="px-6 py-2 bg-academy-gold rounded-full shadow-sm">
                  <span className="text-academy-blue font-bold text-sm">تعلم من الخبراء</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              تعلم من 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> أفضل الخبراء</span>
            </h2>
            
            <p className="text-xl mb-10 text-academy-gold-light leading-relaxed max-w-3xl mx-auto">
              انضم إلى برامجنا التعليمية واستفد من خبرة أفضل الأساتذة في مختلف التخصصات لتحقيق أهدافك الأكاديمية والمهنية
            </p>
            
            <div className="faculty-cta-buttons flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a
                href="/programs"
                className="faculty-cta-button group bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-light hover:to-academy-gold text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden min-w-[200px] inline-block"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                  <span>استكشف البرامج</span>
                  <BookOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-academy-gold-light to-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a
                href="/admission"
                className="faculty-cta-button group border-2 border-white/80 text-white hover:bg-white hover:text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm min-w-[200px] inline-block"
              >
                <span className="flex items-center justify-center space-x-2 space-x-reverse">
                  <span>سجل الآن</span>
                  <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
            </div>

            {/* Academic Values */}
            <div className="academic-values flex items-center justify-center space-x-8 space-x-reverse text-academy-gold-light/80">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Brain className="text-academy-gold" size={16} />
                <span className="text-sm">خبرة متخصصة</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Target className="text-academy-gold" size={16} />
                <span className="text-sm">أهداف واضحة</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Award className="text-academy-gold" size={16} />
                <span className="text-sm">تميز مضمون</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-academy-gold/10 rounded-full blur-xl floating-element"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-academy-gold/10 rounded-full blur-xl floating-element-delayed"></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-academy-gold/5 rounded-full blur-lg floating-element"></div>
      </section>
    </div>
  )
}
