import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Globe, Award, Star, Sparkles, TrendingUp, Crown, Shield, Zap } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
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
        
        <div className="relative z-10 container mx-auto px-4 homepage-hero-padding">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Enhanced Academy Logo and Name */}
            <div className="flex items-center justify-center mb-10">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-2xl ring-8 ring-white/20 ring-offset-4 ring-offset-academy-blue/50 logo-glow">
                  <span className="text-academy-blue font-bold text-3xl">م</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                  <Crown className="text-white" size={16} />
                </div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center">
                  <Sparkles className="text-academy-blue" size={12} />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h1 className="homepage-hero-title mobile-responsive-title font-bold mb-4 leading-tight">
                <span className="premium-gradient-text">
                  أكاديمية المعرفة الدولية
                </span>
              </h1>
                             <div className="homepage-trust-indicators flex items-center justify-center space-x-4 space-x-reverse text-academy-gold-light/80 mb-6">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Star className="text-academy-gold" size={18} />
                  <span className="text-sm font-medium">مؤسسة رائدة</span>
                </div>
                <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Shield className="text-academy-gold" size={18} />
                  <span className="text-sm font-medium">معتمدة دولياً</span>
                </div>
                <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Zap className="text-academy-gold" size={18} />
                  <span className="text-sm font-medium">تعليم متطور</span>
                </div>
              </div>
            </div>

            {/* Enhanced Tagline */}
            <div className="mb-12">
              <p className="text-xl lg:text-2xl mb-4 text-academy-gold-light font-medium leading-relaxed">
                أكاديمية رائدة... نبني العقول ونطور المستقبل
              </p>
              <p className="text-lg text-academy-gold-light/90 max-w-3xl mx-auto leading-relaxed">
                نقدم تعليماً عالي الجودة يجمع بين الأصالة والمعاصرة مع أحدث المعايير الدولية
              </p>
            </div>

                         {/* Enhanced CTA Buttons */}
             <div className="homepage-cta-buttons flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/admission">
                <Button className="homepage-cta-button group bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-light hover:to-academy-gold text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden min-w-[200px]">
                  <span className="relative z-10 flex items-center space-x-2 space-x-reverse">
                    <span>التسجيل الآن</span>
                    <Sparkles size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-academy-gold-light to-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  variant="outline"
                                     className="homepage-cta-button group border-2 border-white/80 text-white hover:bg-white hover:text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm min-w-[200px]"
                >
                  <span className="flex items-center space-x-2 space-x-reverse">
                    <span>البرامج التعليمية</span>
                    <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 space-x-reverse text-academy-gold-light/70">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Users className="text-academy-gold" size={16} />
                <span className="text-sm">+15,000 طالب</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Award className="text-academy-gold" size={16} />
                <span className="text-sm">+85 برنامج</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Globe className="text-academy-gold" size={16} />
                <span className="text-sm">+50 دولة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-university-campus-students.png"
            alt="أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-15"
          />
        </div>
      </section>

             {/* Enhanced Statistics Cards */}
       <section className="homepage-section-padding py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-academy-gray via-white to-academy-gray"></div>
        <div className="relative z-10 container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 rounded-full mb-6">
              <div className="px-6 py-2 bg-white rounded-full shadow-sm">
                <span className="text-academy-blue font-semibold text-sm flex items-center space-x-2 space-x-reverse">
                  <Star size={16} className="text-academy-gold" />
                  <span>إنجازاتنا بالأرقام</span>
                </span>
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue mb-4">
              نفخر بما
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> حققناه معاً</span>
            </h2>
          </div>

                     <div className="homepage-stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-academy-blue/10 group-hover:ring-academy-blue/20 transition-all duration-700 group-hover:scale-110">
                    <Users className="text-academy-gold" size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-blue-light transition-colors duration-300">+15,000</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">عدد الطلاب</p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-academy-blue to-academy-blue-light rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-purple-500/10 group-hover:ring-purple-500/20 transition-all duration-700 group-hover:scale-110">
                    <BookOpen className="text-white" size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-purple-600 transition-colors duration-300">21</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">عدد الأقسام</p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-green-500/10 group-hover:ring-green-500/20 transition-all duration-700 group-hover:scale-110">
                    <Award className="text-white" size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-green-600 transition-colors duration-300">+85</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">عدد البرامج</p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-orange-500/10 group-hover:ring-orange-500/20 transition-all duration-700 group-hover:scale-110">
                    <Globe className="text-white" size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-orange-600 transition-colors duration-300">+50</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">عدد الدول المشاركة</p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

             {/* Enhanced Why Choose Us Section */}
       <section className="homepage-section-padding py-24 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/academic-excellence-background.png"
            alt="التميز الأكاديمي"
            fill
            className="object-cover opacity-8"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 via-white/95 to-academy-gold/5 z-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(0, 31, 63, 0.05) 0%, transparent 50%),
                           linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.5) 50%, transparent 60%)`
        }}></div>

        <div className="relative z-20 container mx-auto px-4">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-blue/20 to-academy-blue/10 rounded-full mb-8">
              <div className="px-8 py-3 bg-white rounded-full shadow-lg">
                <span className="text-academy-blue font-bold text-sm flex items-center space-x-2 space-x-reverse">
                  <Crown size={18} className="text-academy-gold" />
                  <span>لماذا نحن الأفضل</span>
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6 leading-tight">
              لماذا 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> أكاديمية المعرفة الدولية</span>
              ؟
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold mx-auto mb-8 rounded-full"></div>
            
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              نحن نقدم تعليماً متميزاً يجمع بين الأصالة والمعاصرة، مع التركيز على بناء شخصية الطالب وتطوير مهاراته العملية بأحدث المعايير الدولية
            </p>
          </div>

                     {/* Enhanced Cards Grid */}
           <div className="homepage-feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
            {[
              {
                title: "رؤية عالمية ورسالة واضحة",
                description: "نسعى لتمكين المتعلمين والباحثين من الوصول إلى المعرفة الحديثة بأسلوب علمي متطور ومنهجية أكاديمية رصينة.",
                image: "/global-vision.png",
                color: "from-blue-600 to-blue-800",
                bgColor: "from-blue-50 to-blue-100"
              },
              {
                title: "مصداقية أكاديمية",
                description: "نعتمد معايير عالية في إعداد البرامج التدريبية والبحثية، مع التزام كامل بأخلاقيات المهنة وأحدث المعايير الدولية.",
                image: "/academic-credibility.png",
                color: "from-green-600 to-green-800",
                bgColor: "from-green-50 to-green-100"
              },
              {
                title: "شهادات معترف بها دولياً",
                description: "نوفر شهادات يمكن التحقق من صحتها مباشرة عبر موقع الأكاديمية، مما يعزز مصداقيتها دولياً ويضمن قبولها عالمياً.",
                image: "/international-certificates.png",
                color: "from-purple-600 to-purple-800",
                bgColor: "from-purple-50 to-purple-100"
              },
              {
                title: "تنوع البرامج",
                description: "نقدم برامج متخصصة في مجالات الإدارة، العلوم الإنسانية، الدراسات الإسلامية، والبحث العلمي بأحدث المناهج.",
                image: "/program-diversity.png",
                color: "from-orange-600 to-orange-800",
                bgColor: "from-orange-50 to-orange-100"
              },
              {
                title: "كوادر مؤهلة",
                description: "نخبة من الخبراء والأكاديميين ذوي الخبرة العملية والعلمية الواسعة في مختلف التخصصات.",
                image: "/qualified-staff.png",
                color: "from-red-600 to-red-800",
                bgColor: "from-red-50 to-red-100"
              },
              {
                title: "بيئة تعليمية محفزة",
                description: "نعتمد نظام تعليم مبتكر يراعي الفروق الفردية ويحفز على الإبداع والمشاركة الفعالة والتفكير النقدي.",
                image: "/motivating-environment.png",
                color: "from-teal-600 to-teal-800",
                bgColor: "from-teal-50 to-teal-100"
              },
              {
                title: "اعتمادات وشراكات",
                description: "علاقات تعاون استراتيجي مع مؤسسات تعليمية وبحثية محلية ودولية مرموقة لضمان أعلى معايير الجودة.",
                image: "/accreditations-partnerships.png",
                color: "from-indigo-600 to-indigo-800",
                bgColor: "from-indigo-50 to-indigo-100"
              },
              {
                title: "دعم المتعلم بعد التخرج",
                description: "من خلال فرص النشر العلمي، والمشاركة في المؤتمرات، والتطوير المهني المستمر ودعم التقدم الوظيفي.",
                image: "/post-graduation-support.png",
                color: "from-pink-600 to-pink-800",
                bgColor: "from-pink-50 to-pink-100"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                <CardContent className="relative p-0">
                  {/* Enhanced Image Section */}
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>
                    
                    {/* Quality Badge */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                      <div className="bg-academy-gold/90 backdrop-blur-sm text-academy-blue px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1 space-x-reverse">
                        <Star size={12} />
                        <span>مميز</span>
                      </div>
                    </div>

                    {/* Premium Icon */}
                    <div className="absolute bottom-4 right-4 group-hover:bottom-6 transition-all duration-500">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/30 group-hover:ring-white/50 transition-all duration-500 group-hover:scale-110`}>
                        <Sparkles className="text-white" size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-blue-light transition-colors duration-300 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-academy-dark-gray leading-relaxed group-hover:text-academy-darker-gray transition-colors duration-300 text-sm">
                      {feature.description}
                    </p>
                    
                    {/* Premium Indicator */}
                    <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className={`w-6 h-6 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center`}>
                          <Zap size={12} className="text-white" />
                        </div>
                        <span className="text-academy-blue font-semibold text-xs">ميزة متقدمة</span>
                      </div>
                      <Sparkles className="text-academy-gold animate-pulse" size={16} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 rounded-full mb-6">
              <div className="px-6 py-2 bg-white rounded-full shadow-sm">
                <span className="text-academy-blue font-semibold text-sm">ابدأ رحلتك معنا</span>
              </div>
            </div>
            <p className="text-academy-dark-gray mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف الطلاب الذين اختاروا التميز وحققوا أهدافهم مع أكاديمية المعرفة الدولية
            </p>
            <Link href="/admission">
              <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-light hover:to-academy-gold text-academy-blue font-bold px-10 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center space-x-2 space-x-reverse">
                  <span>اكتشف المزيد</span>
                  <TrendingUp size={20} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
