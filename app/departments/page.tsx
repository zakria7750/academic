import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, Target, Brain, Star, Sparkles, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const departments = [
  {
    id: "educational-psychological",
    title: "الأقسام التربوية والنفسية",
    description: "أقسام متخصصة في التربية وعلم النفس والإرشاد مع برامج حديثة ومبتكرة تواكب أحدث التطورات العالمية",
    programsCount: 6,
    image: "/educational-psychology-dept.png",
    icon: Brain,
    color: "from-blue-600 to-blue-800",
    gradientBg: "from-blue-50 to-blue-100",
  },
  {
    id: "skills-development",
    title: "الأقسام المهارية والتطويرية",
    description: "أقسام تركز على تطوير المهارات الشخصية والمهنية بأساليب عملية ومعاصرة",
    programsCount: 3,
    image: "/skills-development-dept.png",
    icon: Target,
    color: "from-emerald-600 to-emerald-800",
    gradientBg: "from-emerald-50 to-emerald-100",
  },
  {
    id: "academic-linguistic",
    title: "الأقسام الأكاديمية واللغوية",
    description: "أقسام اللغات والدراسات الإسلامية والبحوث بمنهجية أكاديمية رصينة ومتطورة",
    programsCount: 3,
    image: "/academic-linguistic-dept.png",
    icon: BookOpen,
    color: "from-purple-600 to-purple-800",
    gradientBg: "from-purple-50 to-purple-100",
  },
  {
    id: "administrative-community",
    title: "الأقسام الإدارية والمجتمعية",
    description: "أقسام إدارة الأعمال والتنمية المستدامة والذكاء الاصطناعي بخبرات عالمية",
    programsCount: 5,
    image: "/administrative-community-dept.png",
    icon: Users,
    color: "from-orange-600 to-orange-800",
    gradientBg: "from-orange-50 to-orange-100",
  },
  {
    id: "health-agriculture",
    title: "الأقسام الصحية والزراعية",
    description: "أقسام التغذية العلاجية والطب البديل والزراعة بأحدث المعايير الدولية",
    programsCount: 3,
    image: "/health-agriculture-dept.png",
    icon: Award,
    color: "from-red-600 to-red-800",
    gradientBg: "from-red-50 to-red-100",
  },
]

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray via-white to-academy-gray-light">
      {/* Enhanced Hero Section */}
      <section className="hero-padding relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-600"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/60 to-academy-blue/80"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                  <BookOpen className="text-academy-blue" size={40} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={14} />
                </div>
              </div>
            </div>
            
            <h1 className="hero-title responsive-title font-bold mb-6 bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent leading-tight">
              الأقسام الأكاديمية
            </h1>
            
            <p className="hero-subtitle responsive-subtitle text-academy-gold-light font-medium mb-8 leading-relaxed max-w-4xl mx-auto">
              استكشف تشكيلة واسعة من الأقسام الأكاديمية المتخصصة والبرامج التعليمية المتميزة التي تواكب أحدث التطورات العالمية
            </p>
            
            <div className="flex items-center justify-center space-x-6 space-x-reverse text-academy-gold-light">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Star className="text-academy-gold" size={20} />
                <span className="font-medium">معتمدة دولياً</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="text-academy-gold" size={20} />
                <span className="font-medium">برامج متطورة</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/departments-hero-background.png"
            alt="الأقسام الأكاديمية - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-10"
          />
        </div>
      </section>

             {/* Enhanced Stats Section */}
       <section className="section-padding py-20 relative">
         <div className="absolute inset-0 bg-gradient-to-r from-academy-gray via-white to-academy-gray"></div>
         <div className="relative z-10 container mx-auto px-4">
           <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-academy-blue/10 group-hover:ring-academy-blue/20 transition-all duration-700">
                    <BookOpen className="text-academy-gold" size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-blue-light transition-colors duration-300">5</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">أقسام رئيسية</p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-academy-gold to-academy-gold-light rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-gold/5 to-academy-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-academy-gold/10 group-hover:ring-academy-gold/20 transition-all duration-700">
                    <Target className="text-academy-blue" size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-academy-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">20</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">برنامج تعليمي</p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-academy-blue to-academy-blue-light rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-green-500/10 group-hover:ring-green-500/20 transition-all duration-700">
                    <Award className="text-white" size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 group-hover:text-green-600 transition-colors duration-300">100%</h3>
                <p className="text-academy-dark-gray font-semibold text-lg">معتمدة دولياً</p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

             {/* Enhanced Departments Section */}
       <section className="section-padding py-24 relative">
         <div className="absolute inset-0 bg-gradient-to-br from-white via-academy-gray-light to-white"></div>
         <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 rounded-full mb-6">
              <div className="px-6 py-2 bg-white rounded-full shadow-sm">
                <span className="text-academy-blue font-semibold text-sm">الأقسام الأكاديمية</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6 leading-tight">
              تشكيلة متنوعة من 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> الأقسام المتخصصة</span>
            </h2>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              تضم أكاديميتنا مجموعة متنوعة من الأقسام الأكاديمية المتخصصة التي تغطي مختلف المجالات العلمية والمهنية بأعلى معايير الجودة العالمية
            </p>
          </div>

                     <div className="department-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {departments.map((department, index) => {
              const Icon = department.icon
              return (
                                 <Card
                   key={department.id}
                   className="department-card group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card"
                   style={{ animationDelay: `${index * 0.1}s` }}
                 >
                  <div className={`absolute inset-0 bg-gradient-to-br ${department.gradientBg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  <CardContent className="relative p-0">
                    {/* Enhanced Department Image */}
                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                      <Image
                        src={department.image || "/placeholder.svg"}
                        alt={department.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Enhanced overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                      <div className={`absolute inset-0 bg-gradient-to-t ${department.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>

                      {/* Enhanced Programs Count Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-academy-blue px-4 py-2 rounded-full text-sm font-bold shadow-xl border border-white/20 group-hover:bg-academy-gold group-hover:text-academy-blue transition-all duration-500">
                        {department.programsCount} برامج
                      </div>

                      {/* Enhanced Department Icon */}
                      <div className="absolute bottom-4 right-4 group-hover:bottom-6 transition-all duration-500">
                        <div className={`w-14 h-14 bg-gradient-to-br ${department.color} rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/30 group-hover:ring-white/50 transition-all duration-500 group-hover:scale-110`}>
                          <Icon className="text-white" size={26} />
                        </div>
                      </div>

                      {/* Quality Badge */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                        <div className="bg-academy-gold/90 backdrop-blur-sm text-academy-blue px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1 space-x-reverse">
                          <Star size={12} />
                          <span>متميز</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Department Info */}
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-blue-light transition-colors duration-300 leading-tight">
                        {department.title}
                      </h3>

                                             <p className="responsive-description text-academy-dark-gray leading-relaxed mb-6 line-clamp-3 group-hover:text-academy-darker-gray transition-colors duration-300">
                         {department.description}
                       </p>

                      {/* Enhanced Programs Count Display */}
                      <div className="flex items-center justify-between mb-6 p-3 bg-academy-gray-light rounded-xl group-hover:bg-white/80 transition-all duration-500">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className={`w-8 h-8 bg-gradient-to-br ${department.color} rounded-lg flex items-center justify-center`}>
                            <Target size={14} className="text-white" />
                          </div>
                          <span className="text-academy-blue font-semibold text-sm">
                            {department.programsCount} برامج متاحة
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Sparkles className="text-academy-gold" size={16} />
                        </div>
                      </div>

                      {/* Enhanced View Details Button */}
                      <Link href={`/departments/${department.id}`}>
                        <Button className="w-full bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-light hover:to-academy-gold text-academy-blue font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:shadow-xl relative overflow-hidden">
                          <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                            <span>عرض التفاصيل</span>
                            <BookOpen size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-academy-gold-light to-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
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
                  <span className="text-academy-blue font-bold text-sm">ابدأ الآن</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              ابدأ رحلتك التعليمية 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> معنا اليوم</span>
            </h2>
            
            <p className="text-xl mb-10 text-academy-gold-light leading-relaxed max-w-3xl mx-auto">
              اختر القسم الذي يناسب اهتماماتك وأهدافك المهنية وانطلق نحو مستقبل مشرق مع برامجنا المعتمدة دولياً
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/admission">
                <Button className="group bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-light hover:to-academy-gold text-academy-blue font-bold px-10 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <span className="relative z-10 flex items-center space-x-2 space-x-reverse">
                    <span>سجل الآن</span>
                    <Sparkles size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  </span>
                </Button>
              </Link>
              
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="group border-2 border-white/80 text-white hover:bg-white hover:text-academy-blue font-bold px-10 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm"
                >
                  <span className="flex items-center space-x-2 space-x-reverse">
                    <span>استكشف البرامج</span>
                    <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 space-x-reverse text-academy-gold-light/80">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Star className="text-academy-gold" size={16} />
                <span className="text-sm">تقييم 5 نجوم</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Award className="text-academy-gold" size={16} />
                <span className="text-sm">معتمدة دولياً</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Users className="text-academy-gold" size={16} />
                <span className="text-sm">+1000 خريج</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
