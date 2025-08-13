import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Award, GraduationCap, UserCheck, UserPlus, Newspaper, FileText, Shield } from "lucide-react"

export default function DashboardPage() {
  const adminSections = [
    {
      title: "إدارة مجلس الإدارة",
      icon: Users,
      href: "/dashboard/board-members",
    },
    {
      title: "إدارة هيئة التدريس",
      icon: GraduationCap,
      href: "/dashboard/faculty-members",
    },
    {
      title: "إدارة البرامج التعليمية",
      icon: BookOpen,
      href: "/dashboard/programs",
    },
    {
      title: "إدارة القبول والتسجيل",
      icon: UserPlus,
      href: "/dashboard/admissions",
    },
    {
      title: "إدارة المدربين المعتمدين",
      icon: Award,
      href: "/dashboard/trainers",
    },
    {
      title: "إدارة طلبات الاعتماد",
      icon: Award,
      href: "/dashboard/accreditations",
    },
    {
      title: "إدارة الاعتمادات الدولية",
      icon: Shield,
      href: "/dashboard/international-accreditations",
    },
    {
      title: "إدارة شبكة الخريجين",
      icon: UserCheck,
      href: "/dashboard/graduates",
    },
    {
      title: "إدارة الشهادات",
      icon: FileText,
      href: "/dashboard/certificates",
    },
    {
      title: "إدارة الأخبار والنشرة",
      icon: Newspaper,
      href: "/dashboard/news",
    },
  ]

  return (
    <div className="min-h-screen bg-academy-gray">
      <div className="bg-gradient-to-r from-academy-blue to-academy-gold shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">لوحة التحكم</h1>
            <p className="text-white/90">إدارة أكاديمية المعرفة الدولية</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => {
            const Icon = section.icon
            return (
              <Card
                key={index}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-academy-blue rounded-lg flex items-center justify-center">
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-academy-blue mb-4">{section.title}</h3>

                  <Link href={section.href}>
                    <Button className="w-full bg-academy-gold hover:bg-academy-gold/90 text-academy-blue font-semibold">
                      الانتقال إلى القسم
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
