import { getGraduates } from "@/app/actions/graduates-actions"
import { GraduateCard } from "@/components/graduate-card"
import { GraduateApplicationForm } from "@/components/graduate-application-form"
import { GraduationCap, Users, Trophy, Globe } from "lucide-react"

export const revalidate = 300; // ISR لمدة 5 دقائق

export default async function GraduatesPage() {
  const graduates = await getGraduates()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <GraduationCap className="w-16 h-16 text-academy-blue mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-academy-blue mb-6">خريجو الأكاديمية</h1>
            <p className="text-xl md:text-2xl text-academy-dark-gray max-w-3xl mx-auto leading-relaxed">
              نفخر بإنجازات خريجينا المتميزين الذين يقودون التغيير في مختلف المجالات حول العالم
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-academy-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-academy-blue">{graduates.length}+</div>
              <div className="text-sm text-academy-dark-gray">خريج متميز</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Globe className="w-8 h-8 text-academy-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-academy-blue">15+</div>
              <div className="text-sm text-academy-dark-gray">دولة</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Trophy className="w-8 h-8 text-academy-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-academy-blue">95%</div>
              <div className="text-sm text-academy-dark-gray">معدل التوظيف</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <GraduationCap className="w-8 h-8 text-academy-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-academy-blue">10+</div>
              <div className="text-sm text-academy-dark-gray">تخصص</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-6">قصص النجاح</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto">
              اكتشف كيف غيرت أكاديمية المعرفة الدولية حياة خريجينا المهنية ومساراتهم نحو النجاح
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graduates.map((graduate) => (
              <GraduateCard key={graduate.id} graduate={graduate} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Network Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-6">انضم إلى شبكة خريجي الأكاديمية</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto">
              شارك قصة نجاحك مع المجتمع وكن مصدر إلهام للطلاب الحاليين والمستقبليين
            </p>
          </div>

          <GraduateApplicationForm />
        </div>
      </section>
    </div>
  )
}
