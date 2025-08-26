import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { BoardMember } from "@/lib/supabase"
import { Users, Crown, Star, Sparkles, Shield, Award, BookOpen, TrendingUp, Eye, Target } from "lucide-react"

export const revalidate = 300; // ISR لمدة 5 دقائق

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
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* Enhanced Background Image with Perfect Fit */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/board-background-1440.webp"
            alt="مجلس الإدارة - أكاديمية المعرفة الدولية"
            fill
            sizes="(max-width: 480px) 480px,
                   (max-width: 768px) 768px,
                   (max-width: 1024px) 1024px,
                   1440px"
            className="object-cover w-full h-full"
            priority
            style={{ objectPosition: 'center center' }}
          />
        </div>

        {/* Multi-layered Premium Background Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-academy-blue/85 via-academy-blue-dark/80 to-slate-900/90"></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-academy-blue/90 via-academy-blue/60 to-academy-blue/40"></div>
        <div className="absolute inset-0 z-25 bg-[radial-gradient(circle_at_30%_50%,rgba(255,215,0,0.15),transparent_70%)] bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]"></div>
        
        {/* Premium Decorative Glass Elements */}
        <div className="absolute inset-0 z-30 opacity-60">
          <div className="absolute top-10 sm:top-16 lg:top-20 right-4 sm:right-8 lg:right-20 w-32 sm:w-48 lg:w-80 h-32 sm:h-48 lg:h-80 bg-gradient-to-br from-academy-gold/15 to-transparent rounded-full blur-2xl animate-pulse backdrop-blur-xl"></div>
          <div className="absolute bottom-10 sm:bottom-16 lg:bottom-20 left-4 sm:left-8 lg:left-20 w-24 sm:w-40 lg:w-64 h-24 sm:h-40 lg:h-64 bg-gradient-to-br from-academy-gold/12 to-transparent rounded-full blur-xl animate-pulse delay-1000 backdrop-blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 lg:w-40 h-16 sm:h-24 lg:h-40 bg-academy-gold/10 rounded-full blur-lg animate-pulse delay-500 backdrop-blur-lg"></div>

          {/* Glass Geometric Patterns */}
          <div className="absolute top-20 sm:top-32 left-1/3 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 border border-academy-gold/40 rotate-45 animate-pulse delay-2000 backdrop-blur-sm"></div>
          <div className="absolute bottom-20 sm:bottom-32 right-1/3 w-2 sm:w-3 lg:w-4 h-2 sm:h-3 lg:h-4 bg-academy-gold/30 rounded-full animate-pulse delay-2500 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-40 container mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center text-white">
            {/* Premium Icon Section */}
            <div className="relative inline-block mb-12 sm:mb-16 lg:mb-20">
              <div className="glass-card-premium p-6 sm:p-8 lg:p-10 bg-white/10 backdrop-blur-2xl rounded-[2rem] lg:rounded-[3rem] border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-105">
                <div className="relative">
                  <div className="w-20 sm:w-24 lg:w-32 xl:w-40 h-20 sm:h-24 lg:h-32 xl:h-40 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                    <Crown className="text-academy-blue drop-shadow-lg" size={32} />
                  </div>
                  <div className="absolute -top-2 sm:-top-3 lg:-top-4 -right-2 sm:-right-3 lg:-right-4 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center shadow-xl border border-white/20">
                    <Users size={16} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Star size={12} className="text-academy-blue" />
                  </div>
                  <div className="absolute top-1 sm:top-2 -left-4 sm:-left-6 w-6 sm:w-8 h-6 sm:h-8 bg-academy-gold/80 rounded-full flex items-center justify-center shadow-md">
                    <Shield size={12} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-6 sm:w-8 h-6 sm:h-8 bg-academy-gold rounded-full animate-pulse shadow-lg backdrop-blur-sm"></div>
              <div className="absolute -bottom-3 sm:-bottom-4 -right-6 sm:-right-8 w-4 sm:w-6 h-4 sm:h-6 bg-academy-gold-light rounded-full animate-pulse delay-700 shadow-md backdrop-blur-sm"></div>
              <div className="absolute top-1/2 -left-8 sm:-left-12 w-3 sm:w-4 h-3 sm:h-4 bg-academy-gold rounded-full animate-pulse delay-1200 backdrop-blur-sm"></div>
              <div className="absolute -top-6 sm:-top-8 right-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-academy-gold-light rounded-full animate-pulse delay-1600 backdrop-blur-sm"></div>
            </div>

            {/* Premium Title Section */}
            <div className="mb-10 sm:mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent drop-shadow-xl">
                  مجلس
                </span>
                <br />
                <span className="bg-gradient-to-r from-academy-gold-light via-academy-gold to-academy-gold-light bg-clip-text text-transparent animate-pulse drop-shadow-xl">
                  الإدارة
                </span>
              </h1>
            </div>
            
            {/* Premium Description */}
            <div className="mb-12 sm:mb-16 lg:mb-20">
              <div className="glass-card-premium p-6 sm:p-8 lg:p-10 bg-white/8 backdrop-blur-2xl rounded-3xl border border-white/15 max-w-5xl mx-auto mb-8 sm:mb-10 lg:mb-12 shadow-[0_24px_48px_rgba(0,0,0,0.2)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.3)] transition-all duration-500">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 font-semibold leading-relaxed">
                  <span className="bg-gradient-to-r from-academy-gold-light to-white bg-clip-text text-transparent">
                    نخبة من القيادات المتميزة والخبراء الاستراتيجيين
                  </span>
                </p>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed">
                  أعضاء مجلس إدارة أكاديمية المعرفة الدولية يقودون الرؤية الاستراتيجية نحو التميز والابتكار في التعليم والبحث العلمي
                </p>
              </div>
              
              {/* Premium Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                <div className="glass-card-stats bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.35)] hover:scale-105 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-gold mb-2 sm:mb-3 drop-shadow-lg">{boardMembers.length}</div>
                  <div className="text-white/90 text-xs sm:text-sm lg:text-base font-medium drop-shadow-sm">عضو مجلس إدارة</div>
                </div>
                <div className="glass-card-stats bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.35)] hover:scale-105 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-gold mb-2 sm:mb-3 drop-shadow-lg">قيادة</div>
                  <div className="text-white/90 text-xs sm:text-sm lg:text-base font-medium drop-shadow-sm">متميزة وخبيرة</div>
                </div>
                <div className="glass-card-stats bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.35)] hover:scale-105 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-gold mb-2 sm:mb-3 drop-shadow-lg">رؤية</div>
                  <div className="text-white/90 text-xs sm:text-sm lg:text-base font-medium drop-shadow-sm">واضحة ومتقدمة</div>
                </div>
              </div>
            </div>

            {/* Premium Trust Indicators */}
            <div className="glass-card-trust flex flex-col sm:flex-row items-center justify-center bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 sm:space-x-reverse shadow-[0_16px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.3)] transition-all duration-500">
              <div className="flex items-center space-x-2 space-x-reverse text-academy-gold-light">
                <Eye className="text-academy-gold" size={16} />
                <span className="text-xs sm:text-sm lg:text-base font-medium">رؤية استراتيجية</span>
              </div>
              <div className="homepage-trust-separator hidden sm:block w-1 h-1 bg-academy-gold/60 rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse text-academy-gold-light">
                <Target className="text-academy-gold" size={16} />
                <span className="text-xs sm:text-sm lg:text-base font-medium">أهداف واضحة</span>
              </div>
              <div className="homepage-trust-separator hidden sm:block w-1 h-1 bg-academy-gold/60 rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse text-academy-gold-light">
                <TrendingUp className="text-academy-gold" size={16} />
                <span className="text-xs sm:text-sm lg:text-base font-medium">نمو مستدام</span>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Enhanced Board Members Section */}
       <section className="board-section-spacing py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-academy-gray-light to-white"></div>
        <div className="relative z-10 container mx-auto px-4">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-blue/20 to-academy-blue/10 rounded-full mb-8">
              <div className="px-8 py-3 bg-white rounded-full shadow-lg">
                <span className="text-academy-blue font-bold text-sm flex items-center space-x-2 space-x-reverse">
                  <Users size={18} className="text-academy-gold" />
                  <span>مجلس الإدارة</span>
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6 leading-tight">
              أعضاء 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> مجلس الإدارة</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold mx-auto mb-8 rounded-full"></div>
            
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              نخبة من القيادات الأكاديمية والمهنية المتميزة التي تقود الأكاديمية نحو التميز والريادة في التعليم والبحث العلمي
            </p>
          </div>

          {boardMembers.length > 0 ? (
                         <div className="board-members-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-8xl mx-auto">
              {boardMembers.map((member, index) => (
                <Card
                  key={member.id}
                                     className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card member-card-premium"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <CardContent className="relative p-0">
                    {/* Enhanced Image Section */}
                    <div className="relative p-8 pb-0">
                                             <div className="member-avatar relative w-full aspect-square overflow-hidden rounded-full mx-auto mb-6 ring-4 ring-academy-gold/20 group-hover:ring-academy-gold/60 transition-all duration-700 shadow-xl">
                        <Image
                          src={member.image_url || "/placeholder.svg?height=300&width=300&text=عضو+المجلس"}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                        
                        {/* Premium Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Crown className="text-academy-blue" size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content Section */}
                    <div className="px-8 pb-8 text-center">
                      <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-blue-light transition-colors duration-300 leading-tight">
                        {member.name}
                      </h3>
                      
                                             <div className="position-badge member-badge-premium bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        <span className="relative z-10">{member.position}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-academy-gold-light to-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-3 group-hover:text-academy-darker-gray transition-colors duration-300 mb-4">
                        {member.experience}
                      </p>

                      {/* Premium Indicator */}
                      <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="w-6 h-6 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-full flex items-center justify-center">
                            <Star size={12} className="text-academy-gold" />
                          </div>
                          <span className="text-academy-blue font-semibold text-xs">عضو متميز</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-academy-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Sparkles className="text-academy-gold" size={14} />
                    </div>
                    <div className="absolute bottom-6 left-4 w-6 h-6 bg-academy-blue/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                      <Award className="text-academy-blue" size={12} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
                         /* Enhanced Empty State */
             <div className="empty-state-enhanced text-center py-20">
                             <div className="empty-state-icon relative mb-8">
                 <div className="w-32 h-32 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-academy-gold/10">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center">
                    <Users className="text-academy-blue" size={32} />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Sparkles className="text-academy-blue" size={16} />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-academy-blue mb-4">قريباً</h3>
              <p className="text-academy-dark-gray text-lg leading-relaxed max-w-md mx-auto">
                سيتم إضافة أعضاء مجلس الإدارة قريباً. ترقبوا التحديثات.
              </p>
              
              <div className="mt-8 flex items-center justify-center space-x-6 space-x-reverse text-academy-gold/60">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Crown size={16} />
                  <span className="text-sm">قيادة</span>
                </div>
                <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Shield size={16} />
                  <span className="text-sm">خبرة</span>
                </div>
                <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Star size={16} />
                  <span className="text-sm">تميز</span>
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
                  <span className="text-academy-blue font-bold text-sm">قيادة متميزة</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              قيادة متميزة 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> لمستقبل أفضل</span>
            </h2>
            
            <p className="text-xl mb-10 text-academy-gold-light leading-relaxed max-w-3xl mx-auto">
              يقود مجلس إدارتنا الأكاديمية بخبرة ورؤية واضحة نحو تحقيق التميز في التعليم والبحث العلمي وبناء جيل مؤهل للمستقبل
            </p>
            
                         <div className="board-cta-buttons flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a
                href="/about"
                                 className="board-cta-button group bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-light hover:to-academy-gold text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden min-w-[200px] inline-block"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                  <span>تعرف على رؤيتنا</span>
                  <Eye size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-academy-gold-light to-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a
                href="/programs"
                                 className="board-cta-button group border-2 border-white/80 text-white hover:bg-white hover:text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm min-w-[200px] inline-block"
              >
                <span className="flex items-center justify-center space-x-2 space-x-reverse">
                  <span>استكشف برامجنا</span>
                  <BookOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </a>
            </div>

                         {/* Leadership Values */}
             <div className="leadership-values flex items-center justify-center space-x-8 space-x-reverse text-academy-gold-light/80">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Eye className="text-academy-gold" size={16} />
                <span className="text-sm">رؤية استراتيجية</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Target className="text-academy-gold" size={16} />
                <span className="text-sm">أهداف واضحة</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="text-academy-gold" size={16} />
                <span className="text-sm">نمو مستدام</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
