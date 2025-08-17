import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Award, GraduationCap, UserCheck, UserPlus, Newspaper, FileText, Shield, Play } from "lucide-react"

export default function DashboardPage() {
  const adminSections = [
    {
      title: "إدارة مجلس الإدارة",
      icon: Users,
      href: "/dashboard/board-members",
      description: "إضافة وتعديل أعضاء مجلس الإدارة",
      color: "from-academy-blue-500 to-academy-blue-600",
    },
    {
      title: "إدارة هيئة التدريس",
      icon: GraduationCap,
      href: "/dashboard/faculty-members",
      description: "إدارة أعضاء هيئة التدريس والمحاضرين",
      color: "from-academy-gold-500 to-academy-gold-600",
    },
    {
      title: "إدارة البرامج التعليمية",
      icon: BookOpen,
      href: "/dashboard/programs",
      description: "إضافة وتعديل البرامج التعليمية",
      color: "from-academy-blue-600 to-academy-blue-700",
    },
    {
      title: "إدارة الدورات التدريبية",
      icon: Play,
      href: "/dashboard/training-courses",
      description: "إضافة وتعديل الدورات التدريبية المتخصصة",
      color: "from-academy-gold-600 to-academy-gold-700",
    },
    {
      title: "إدارة القبول والتسجيل",
      icon: UserPlus,
      href: "/dashboard/admissions",
      description: "متابعة طلبات القبول والتسجيل",
      color: "from-academy-gold-600 to-academy-gold-700",
    },
    {
      title: "إدارة المدربين المعتمدين",
      icon: Award,
      href: "/dashboard/trainers",
      description: "إدارة المدربين والخبراء المعتمدين",
      color: "from-academy-blue-700 to-academy-blue-800",
    },
    {
      title: "إدارة طلبات الاعتماد",
      icon: Award,
      href: "/dashboard/accreditations",
      description: "مراجعة ومعالجة طلبات الاعتماد",
      color: "from-academy-gold-700 to-academy-gold-800",
    },
    {
      title: "إدارة الاعتمادات الدولية",
      icon: Shield,
      href: "/dashboard/international-accreditations",
      description: "إدارة الاعتمادات والشراكات الدولية",
      color: "from-academy-blue-800 to-academy-blue-900",
    },
    {
      title: "إدارة شبكة الخريجين",
      icon: UserCheck,
      href: "/dashboard/graduates",
      description: "متابعة الخريجين وشبكة التواصل",
      color: "from-academy-gold-800 to-academy-gold-900",
    },
    {
      title: "إدارة الشهادات",
      icon: FileText,
      href: "/dashboard/certificates",
      description: "إصدار وإدارة الشهادات الأكاديمية",
      color: "from-academy-blue-500 to-academy-blue-700",
    },
    {
      title: "إدارة الأخبار والنشرة",
      icon: Newspaper,
      href: "/dashboard/news",
      description: "نشر الأخبار والتحديثات الهامة",
      color: "from-academy-gold-500 to-academy-gold-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
      {/* Enhanced Header */}
      <div className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-academy-blue-dark/90 via-academy-blue/80 to-academy-blue-light/90"></div>
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center">
                <Users className="text-academy-blue text-2xl" size={32} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              لوحة التحكم الرئيسية
            </h1>
            <p className="text-xl text-white/90 mb-2 max-w-2xl mx-auto leading-relaxed">
              إدارة أكاديمية المعرفة الدولية
            </p>
            <p className="text-white/70 max-w-xl mx-auto">
              نظام إدارة شامل لجميع أقسام الأكاديمية
            </p>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-academy-gold/15 rounded-full blur-xl"></div>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {adminSections.map((section, index) => {
            const Icon = section.icon
            return (
              <Card
                key={index}
                className="dashboard-card group cursor-pointer fade-in border-0 shadow-lg hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0 h-full">
                  {/* Icon Header */}
                  <div className={`bg-gradient-to-br ${section.color} p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-8 -translate-y-8"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full transform -translate-x-4 translate-y-4"></div>
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm mb-4 mx-auto">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-white text-center leading-tight">
                      {section.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-academy-dark-gray text-sm leading-relaxed mb-6 flex-1">
                      {section.description}
                    </p>

                    <Link href={section.href} className="block">
                      <Button className="w-full btn-primary text-academy-blue font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300">
                        الانتقال إلى القسم
                        <svg 
                          className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Footer Statistics */}
      <div className="bg-white border-t border-academy-blue-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-academy-blue-100 rounded-lg mb-3">
                <Users className="text-academy-blue" size={24} />
              </div>
              <div className="text-2xl font-bold text-academy-blue mb-1">10+</div>
              <div className="text-sm text-academy-dark-gray">أقسام إدارية</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-academy-gold-100 rounded-lg mb-3">
                <BookOpen className="text-academy-gold-700" size={24} />
              </div>
              <div className="text-2xl font-bold text-academy-blue mb-1">50+</div>
              <div className="text-sm text-academy-dark-gray">برنامج تعليمي</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-academy-blue-100 rounded-lg mb-3">
                <GraduationCap className="text-academy-blue" size={24} />
              </div>
              <div className="text-2xl font-bold text-academy-blue mb-1">100+</div>
              <div className="text-sm text-academy-dark-gray">خريج</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-academy-gold-100 rounded-lg mb-3">
                <Award className="text-academy-gold-700" size={24} />
              </div>
              <div className="text-2xl font-bold text-academy-blue mb-1">25+</div>
              <div className="text-sm text-academy-dark-gray">اعتماد دولي</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
