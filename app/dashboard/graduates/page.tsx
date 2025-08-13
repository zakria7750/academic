import { getGraduates, getGraduateApplications } from "@/app/actions/graduates-actions"
import { GraduatesManagement } from "@/components/graduates-management"

export default async function GraduatesManagementPage() {
  const [graduates, applications] = await Promise.all([getGraduates(), getGraduateApplications()])

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-blue-50 to-academy-gold-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-academy-gold/20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-blue mb-2">إدارة الخريجين</h1>
          <p className="text-academy-dark-gray text-sm sm:text-base lg:text-lg">إدارة بطاقات الخريجين وطلبات الانضمام لشبكة الخريجين</p>
        </div>

        <GraduatesManagement initialGraduates={graduates} initialApplications={applications} />
      </div>
    </div>
  )
}
