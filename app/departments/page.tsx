import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, Target, Brain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const departments = [
  {
    id: "educational-psychological",
    title: "الأقسام التربوية والنفسية",
    description: "أقسام متخصصة في التربية وعلم النفس والإرشاد",
    programsCount: 6,
    image: "/educational-psychology-dept.png",
    icon: Brain,
    color: "bg-blue-500",
  },
  {
    id: "skills-development",
    title: "الأقسام المهارية والتطويرية",
    description: "أقسام تركز على تطوير المهارات الشخصية والمهنية",
    programsCount: 3,
    image: "/skills-development-dept.png",
    icon: Target,
    color: "bg-green-500",
  },
  {
    id: "academic-linguistic",
    title: "الأقسام الأكاديمية واللغوية",
    description: "أقسام اللغات والدراسات الإسلامية والبحوث",
    programsCount: 3,
    image: "/academic-linguistic-dept.png",
    icon: BookOpen,
    color: "bg-purple-500",
  },
  {
    id: "administrative-community",
    title: "الأقسام الإدارية والمجتمعية",
    description: "أقسام إدارة الأعمال والتنمية المستدامة والذكاء الاصطناعي",
    programsCount: 5,
    image: "/administrative-community-dept.png",
    icon: Users,
    color: "bg-orange-500",
  },
  {
    id: "health-agriculture",
    title: "الأقسام الصحية والزراعية",
    description: "أقسام التغذية العلاجية والطب البديل والزراعة",
    programsCount: 3,
    image: "/health-agriculture-dept.png",
    icon: Award,
    color: "bg-red-500",
  },
]

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <BookOpen className="text-academy-blue" size={32} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">الأقسام الأكاديمية</h1>
            </div>
            <p className="text-xl lg:text-2xl text-academy-gold font-medium">
              استكشف تشكيلة واسعة من الأقسام الأكاديمية المتخصصة والبرامج التعليمية المتميزة
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/departments-hero-background.png"
            alt="الأقسام الأكاديمية - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
      </section>

      {/* Departments Stats */}
      <section className="py-16 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden group border-2 border-academy-gold/20 hover:border-academy-gold/60shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">5</h3>
                <p className="text-academy-dark-gray font-medium">أقسام رئيسية</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden group border-2 border-academy-gold/20 hover:border-academy-gold/60 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">20</h3>
                <p className="text-academy-dark-gray font-medium">برنامج تعليمي</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden group border-2 border-academy-gold/20 hover:border-academy-gold/60 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">100%</h3>
                <p className="text-academy-dark-gray font-medium">معتمدة دولياً</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue mb-4">الأقسام</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              تضم أكاديميتنا مجموعة متنوعة من الأقسام الأكاديمية المتخصصة التي تغطي مختلف المجالات العلمية والمهنية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department) => {
              const Icon = department.icon
              return (
                <Card
                  key={department.id}
                  className="group hover:shadow-2xl bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden group border-2 border-academy-gold/20 hover:border-academy-gold/60 transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Department Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={department.image || "/placeholder.svg"}
                        alt={department.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Programs Count Badge */}
                      <div className="absolute top-4 right-4 bg-academy-gold text-academy-blue px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {department.programsCount} برامج
                      </div>

                      {/* Department Icon */}
                      <div className="absolute bottom-4 right-4">
                        <div
                          className={`w-12 h-12 ${department.color} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="text-white" size={24} />
                        </div>
                      </div>
                    </div>

                    {/* Department Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                        {department.title}
                      </h3>

                      <p className="text-academy-dark-gray text-sm leading-relaxed mb-6">{department.description}</p>

                      {/* Programs Count Display */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Target size={16} className="text-academy-gold" />
                          <span className="text-academy-blue font-semibold text-sm">
                            {department.programsCount} برامج متاحة
                          </span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Link href={`/departments/${department.id}`}>
                        <Button className="w-full bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                          عرض التفاصيل
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

      {/* Call to Action Section */}
      <section className="py-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">ابدأ رحلتك التعليمية معنا</h2>
            <p className="text-xl mb-8 text-academy-gold">
              اختر القسم الذي يناسب اهتماماتك وأهدافك المهنية وانطلق نحو مستقبل مشرق
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admission">
                <Button className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  سجل الآن
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  استكشف البرامج
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
