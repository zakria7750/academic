import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, Target, Brain, GraduationCap, Globe, Star } from "lucide-react"
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
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: "skills-development",
    title: "الأقسام المهارية والتطويرية",
    description: "أقسام تركز على تطوير المهارات الشخصية والمهنية بأساليب عملية ومعاصرة",
    programsCount: 3,
    image: "/skills-development-dept.png",
    icon: Target,
    color: "bg-gradient-to-br from-green-500 to-green-600",
    gradient: "from-green-500/20 to-green-600/20",
  },
  {
    id: "academic-linguistic",
    title: "الأقسام الأكاديمية واللغوية",
    description: "أقسام اللغات والدراسات الإسلامية والبحوث بمنهجية أكاديمية رصينة ومتطورة",
    programsCount: 3,
    image: "/academic-linguistic-dept.png",
    icon: BookOpen,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    gradient: "from-purple-500/20 to-purple-600/20",
  },
  {
    id: "administrative-community",
    title: "الأقسام الإدارية والمجتمعية",
    description: "أقسام إدارة الأعمال والتنمية المستدامة والذكاء الاصطناعي بخبرات عالمية",
    programsCount: 5,
    image: "/administrative-community-dept.png",
    icon: Users,
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    gradient: "from-orange-500/20 to-orange-600/20",
  },
  {
    id: "health-agriculture",
    title: "الأقسام الصحية والزراعية",
    description: "أقسام التغذية العلاجية والطب البديل والزراعة بأحدث المعايير الدولية",
    programsCount: 3,
    image: "/health-agriculture-dept.png",
    icon: Award,
    color: "bg-gradient-to-br from-red-500 to-red-600",
    gradient: "from-red-500/20 to-red-600/20",
  },
]

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-600 to-academy-blue-800">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-academy-gold/10 via-transparent to-academy-gold/5"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-academy-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-academy-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-academy-gold/30 rounded-full blur-lg animate-pulse delay-2000"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Enhanced Header */}
            <div className="flex flex-col items-center justify-center space-y-6 mb-12">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-500">
                  <BookOpen className="text-academy-blue text-4xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-academy-gold rounded-full flex items-center justify-center">
                  <Star className="text-academy-blue text-sm" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-academy-gold-100 to-white bg-clip-text text-transparent">
                الأقسام الأكاديمية
              </h1>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-academy-gold-100 font-medium max-w-4xl mx-auto leading-relaxed mb-8">
              استكشف تشكيلة واسعة من الأقسام الأكاديمية المتخصصة والبرامج التعليمية المتميزة
              <br />
              <span className="text-lg text-academy-gold-200">نقدم لك أفضل الفرص التعليمية لتحقيق أحلامك المهنية</span>
            </p>
            
            {/* Enhanced Stats Preview */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <GraduationCap className="text-academy-gold text-xl" />
                <span className="text-white font-semibold">5 أقسام رئيسية</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Globe className="text-academy-gold text-xl" />
                <span className="text-white font-semibold">20 برنامج تعليمي</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Award className="text-academy-gold text-xl" />
                <span className="text-white font-semibold">100% معتمدة دولياً</span>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Departments Stats */}
      <section className="py-20 bg-gradient-to-br from-academy-gray to-academy-gray-light relative">
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <BookOpen className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">5</h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">أقسام رئيسية</p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <Target className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">20</h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">برنامج تعليمي</p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <Award className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">100%</h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">معتمدة دولياً</p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Departments Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/2 to-academy-gold/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6">الأقسام الأكاديمية</h2>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              تضم أكاديميتنا مجموعة متنوعة من الأقسام الأكاديمية المتخصصة التي تغطي مختلف المجالات العلمية والمهنية
              <br />
              <span className="text-lg text-academy-darker-gray">نقدم تعليماً عالي الجودة مع أحدث المناهج والتقنيات</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {departments.map((department, index) => {
              const Icon = department.icon
              return (
                <Card
                  key={department.id}
                  className="group bg-white/90 backdrop-blur-sm hover:shadow-3xl border-0 shadow-2xl transition-all duration-700 hover:-translate-y-6 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Enhanced Department Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={department.image || "/placeholder.svg"}
                      alt={department.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Enhanced Programs Count Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                      {department.programsCount} برامج
                    </div>

                    {/* Enhanced Department Icon */}
                    <div className="absolute bottom-4 right-4">
                      <div className={`w-14 h-14 ${department.color} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="text-white text-xl" />

                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div className="text-white text-center w-full">
                        <p className="text-lg font-semibold mb-2">اكتشف المزيد</p>
                        <p className="text-sm opacity-90">انقر لعرض التفاصيل الكاملة</p>

                      </div>
                    </div>
                  </div>

                  {/* Enhanced Department Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-500 leading-tight">
                      {department.title}
                    </h3>

                    <p className="text-academy-dark-gray text-base leading-relaxed mb-6 line-clamp-3">{department.description}</p>

                    {/* Enhanced Programs Count Display */}
                    <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-2xl border border-academy-blue/10">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Target size={18} className="text-academy-gold" />
                        <span className="text-academy-blue font-semibold text-sm">
                          {department.programsCount} برامج متاحة
                        </span>
                      </div>
                      <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
       </div>

                    {/* Enhanced View Details Button */}
                    <Link href={`/departments/${department.id}`}>
                      <Button className="w-full bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                        عرض التفاصيل
                        <div className="w-2 h-2 bg-academy-blue rounded-full ml-2 animate-pulse"></div>
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-700 to-academy-blue-900">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-academy-gold/15 via-transparent to-academy-gold/10"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-academy-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-academy-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto text-white">
            <div className="inline-block mb-8">
              <div className="w-24 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-academy-gold-100 to-white bg-clip-text text-transparent">
              ابدأ رحلتك التعليمية معنا
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-academy-gold-100 leading-relaxed max-w-4xl mx-auto">
              اختر القسم الذي يناسب اهتماماتك وأهدافك المهنية وانطلق نحو مستقبل مشرق
              <br />
              <span className="text-lg text-academy-gold-200">نحن هنا لمساعدتك في تحقيق أحلامك التعليمية</span>

            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/admission">
                <Button className="group bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0">
                  <span className="mr-2">سجل الآن</span>
                  <div className="w-3 h-3 bg-academy-blue rounded-full group-hover:animate-pulse"></div>

                </Button>
              </Link>
              
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="group border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:backdrop-blur-md"
                >
                  <span className="mr-2">استكشف البرامج</span>
                  <div className="w-3 h-3 bg-white rounded-full group-hover:animate-pulse"></div>

                </Button>
              </Link>
            </div>
            
            {/* Additional Info */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Star className="text-academy-gold text-lg" />
                <span className="text-white font-medium">تعليم عالي الجودة</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Globe className="text-academy-gold text-lg" />
                <span className="text-white font-medium">اعتماد دولي</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Users className="text-academy-gold text-lg" />
                <span className="text-white font-medium">أساتذة متخصصون</span>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
