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
        
        <div className="relative z-10 container mx-auto px-4 board-hero-padding">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Enhanced Logo and Title */}
            <div className="flex items-center justify-center mb-10">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-2xl ring-8 ring-white/20 ring-offset-4 ring-offset-academy-blue/50 logo-glow">
                  <span className="text-academy-blue font-bold text-3xl">م</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                  <Crown className="text-white" size={16} />
                </div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center">
                  <Users className="text-academy-blue" size={12} />
                </div>
              </div>
            </div>
            
            <h1 className="board-responsive-title font-bold mb-6 leading-tight">
              <span className="premium-gradient-text">مجلس الإدارة</span>
            </h1>
            
                         <p className="board-responsive-subtitle mb-8 text-academy-gold-light font-medium leading-relaxed max-w-4xl mx-auto">
               تعرف على أعضاء مجلس إدارة أكاديمية المعرفة الدولية - نخبة من القيادات المتميزة
             </p>
            
                         {/* Leadership Indicators */}
             <div className="leadership-indicators flex items-center justify-center space-x-8 space-x-reverse text-academy-gold-light/80">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Crown className="text-academy-gold" size={18} />
                <span className="text-sm font-medium">قيادة متميزة</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Shield className="text-academy-gold" size={18} />
                <span className="text-sm font-medium">خبرة واسعة</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Star className="text-academy-gold" size={18} />
                <span className="text-sm font-medium">رؤية واضحة</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <Image
            src="/board-hero-background.png"
            alt="مجلس الإدارة - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-15"
          />
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
