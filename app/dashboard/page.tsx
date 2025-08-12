import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  BookOpen,
  Award,
  Settings,
  BarChart3,
  FileText,
  GraduationCap,
  UserCheck,
  UserPlus,
  Newspaper,
} from "lucide-react"

export default function DashboardPage() {
  const dashboardSections = [
    {
      title: "إدارة مجلس الإدارة",
      description: "إضافة وتعديل وحذف أعضاء مجلس الإدارة",
      icon: Users,
      href: "/dashboard/board-members",
      color: "bg-blue-500",
      count: "4 أعضاء",
    },
    {
      title: "إدارة هيئة التدريس",
      description: "إضافة وتعديل وحذف أعضاء هيئة التدريس",
      icon: GraduationCap,
      href: "/dashboard/faculty-members",
      color: "bg-green-500",
      count: "6 أعضاء",
    },
    {
      title: "إدارة البرامج التعليمية",
      description: "إدارة برامج الماجستير والدكتوراه والدبلومات",
      icon: BookOpen,
      href: "/dashboard/programs",
      color: "bg-purple-500",
      count: "12 برنامج",
    },
    {
      title: "إدارة القبول والتسجيل",
      description: "مراجعة طلبات التسجيل وإدارة الطلاب المقبولين",
      icon: UserPlus,
      href: "/dashboard/admissions",
      color: "bg-academy-blue",
      count: "جديد",
    },
    {
      title: "إدارة المدربين المعتمدين",
      description: "إدارة المدربين المعتمدين والخبراء",
      icon: Award,
      href: "/dashboard/trainers",
      color: "bg-orange-500",
      count: "8 مدربين",
    },
    {
      title: "إدارة الاعتمادات",
      description: "مراجعة طلبات الاعتماد وإدارة المدربين المعتمدين",
      icon: Award,
      href: "/dashboard/accreditations",
      color: "bg-indigo-500",
      count: "جديد",
    },
    {
      title: "إدارة الخريجين",
      description: "إدارة بطاقات الخريجين وطلبات الانضمام لشبكة الخريجين",
      icon: UserCheck,
      href: "/dashboard/graduates",
      color: "bg-teal-500",
      count: "جديد",
    },
    {
      title: "إدارة الشهادات",
      description: "إدارة شهادات الأكاديمية ونظام التحقق من الشهادات",
      icon: FileText,
      href: "/dashboard/certificates",
      color: "bg-academy-yellow",
      count: "جديد",
    },
    {
      title: "إدارة الأخبار",
      description: "إدارة الأخبار والمقالات والاشتراكات في النشرة الإخبارية",
      icon: Newspaper,
      href: "/dashboard/news",
      color: "bg-academy-gold",
      count: "جديد",
    },
    {
      title: "الإحصائيات",
      description: "عرض إحصائيات الموقع والمستخدمين",
      icon: BarChart3,
      href: "/dashboard/analytics",
      color: "bg-yellow-500",
      count: "قريباً",
    },
    {
      title: "إدارة المحتوى",
      description: "إدارة المقالات والأخبار والمحتوى",
      icon: FileText,
      href: "/dashboard/content",
      color: "bg-red-500",
      count: "قريباً",
    },
    {
      title: "الإعدادات",
      description: "إعدادات الموقع والنظام العامة",
      icon: Settings,
      href: "/dashboard/settings",
      color: "bg-gray-500",
      count: "قريباً",
    },
  ]

  return (
    <div className="min-h-screen bg-academy-gray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center">
              <Settings className="text-academy-gold" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-academy-blue">لوحة التحكم</h1>
              <p className="text-academy-dark-gray">إدارة محتوى أكاديمية المعرفة الدولية</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardSections.map((section, index) => {
            const Icon = section.icon
            const isAvailable = [
              "/dashboard/board-members",
              "/dashboard/faculty-members",
              "/dashboard/programs",
              "/dashboard/admissions",
              "/dashboard/trainers",
              "/dashboard/accreditations",
              "/dashboard/graduates",
              "/dashboard/certificates",
              "/dashboard/news", // إضافة صفحة الأخبار للصفحات المتاحة
            ].includes(section.href)

            return (
              <Card
                key={index}
                className={`group transition-all duration-300 border-0 shadow-lg ${
                  isAvailable ? "hover:shadow-2xl hover:-translate-y-2 cursor-pointer" : "opacity-60 cursor-not-allowed"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 ${section.color} rounded-full flex items-center justify-center ${
                        isAvailable ? "group-hover:scale-110" : ""
                      } transition-transform duration-300`}
                    >
                      <Icon className="text-white" size={24} />
                    </div>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        isAvailable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {section.count}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle
                    className={`text-xl mb-2 ${
                      isAvailable ? "text-academy-blue group-hover:text-academy-gold" : "text-gray-500"
                    } transition-colors duration-300`}
                  >
                    {section.title}
                  </CardTitle>
                  <p className="text-academy-dark-gray text-sm mb-4">{section.description}</p>
                  {isAvailable ? (
                    <Link
                      href={section.href}
                      className="inline-flex items-center text-academy-gold hover:text-academy-blue font-semibold text-sm transition-colors duration-200"
                    >
                      إدارة الآن ←
                    </Link>
                  ) : (
                    <span className="inline-flex items-center text-gray-400 font-semibold text-sm">قريباً...</span>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
