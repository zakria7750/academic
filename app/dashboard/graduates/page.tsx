import { getGraduates, getGraduateApplications } from "@/app/actions/graduates-actions"
import { GraduatesManagement } from "@/components/graduates-management"

export default async function GraduatesManagementPage() {
  const [graduates, applications] = await Promise.all([getGraduates(), getGraduateApplications()])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-academy-blue mb-2">إدارة الخريجين</h1>
        <p className="text-academy-dark-gray">إدارة بطاقات الخريجين وطلبات الانضمام لشبكة الخريجين</p>
      </div>

      <GraduatesManagement initialGraduates={graduates} initialApplications={applications} />
    </div>
  )
}
