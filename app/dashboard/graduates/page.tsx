import { getGraduates, getGraduateApplications } from "@/app/actions/graduates-actions"
import { GraduatesManagement } from "@/components/graduates-management"
import { GraduationCap, Users, Award, TrendingUp } from "lucide-react"

export default async function GraduatesManagementPage() {
  const [graduates, applications] = await Promise.all([getGraduates(), getGraduateApplications()])

  const pendingApplications = applications.filter(app => app.status === "pending")
  const approvedGraduates = graduates.length
  const totalApplications = applications.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
      {/* Enhanced Header */}
      <div className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-academy-blue-dark/90 via-academy-blue/80 to-academy-blue-light/90"></div>
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center">
                <GraduationCap className="text-academy-blue text-2xl" size={32} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              إدارة شبكة الخريجين
            </h1>
            <p className="text-xl text-white/90 mb-2 max-w-2xl mx-auto leading-relaxed">
              إدارة شاملة لشبكة خريجي أكاديمية المعرفة الدولية
            </p>
            <p className="text-white/70 max-w-xl mx-auto">
              متابعة الخريجين المتميزين ومعالجة طلبات الانضمام الجديدة
            </p>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-academy-gold/15 rounded-full blur-xl"></div>
      </div>

      {/* Statistics Cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border-0 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-academy-dark-gray mb-1">إجمالي الخريجين</p>
                <p className="text-3xl font-bold text-academy-blue">{approvedGraduates}</p>
              </div>
              <div className="w-12 h-12 bg-academy-blue/10 rounded-xl flex items-center justify-center">
                <Users className="text-academy-blue" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-0 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-academy-dark-gray mb-1">طلبات معلقة</p>
                <p className="text-3xl font-bold text-academy-gold">{pendingApplications.length}</p>
              </div>
              <div className="w-12 h-12 bg-academy-gold/10 rounded-xl flex items-center justify-center">
                <Award className="text-academy-gold" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-0 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-academy-dark-gray mb-1">إجمالي الطلبات</p>
                <p className="text-3xl font-bold text-academy-blue-600">{totalApplications}</p>
              </div>
              <div className="w-12 h-12 bg-academy-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-academy-blue-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden">
          <div className="p-8">
            <GraduatesManagement initialGraduates={graduates} initialApplications={applications} />
          </div>
        </div>
      </div>
    </div>
  )
}
