import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Award, Settings, BarChart3, FileText } from "lucide-react"

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
      title: "إدارة البرامج",
      description: "إدارة البرامج التعليمية والأكاديمية",
      icon: BookOpen,
      href: "/dashboard/programs",
      color: "bg-green-500",
      count: "قريباً",
    },
    {
      title: "إدارة هيئة التدريس",
      description: "إدارة أعضاء هيئة التدريس والمدربين",
      icon: Award,
      href: "/dashboard/faculty",
      color: "bg-purple-500",
      count: "قريباً",
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
            const isAvailable = section.href === "/dashboard/board-members"

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
