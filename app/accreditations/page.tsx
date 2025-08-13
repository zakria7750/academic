"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import { getAllInternationalAccreditations } from "@/app/actions/international-accreditations-actions"
import { useEffect, useState } from "react"

export default function AccreditationsPage() {
  const [internationalAccreditations, setInternationalAccreditations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAccreditations = async () => {
      try {
        const accreditationsResult = await getAllInternationalAccreditations()
        setInternationalAccreditations(accreditationsResult.data || [])
      } catch (error) {
        console.error("Error fetching accreditations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAccreditations()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-academy-gray to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-academy-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold">جاري تحميل الاعتمادات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-academy-gray to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-academy-blue via-blue-800 to-academy-blue overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">الاعتمادات الدولية</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              نفخر باعتماداتنا الدولية المرموقة التي تضمن جودة التعليم وتميز الخريجين
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-semibold">اعتمادات دولية معترف بها</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-semibold">معايير جودة عالمية</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Accreditations Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-academy-gold text-academy-blue mb-4 text-lg px-6 py-2">الاعتمادات الدولية</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-6">معتمدون من أرقى المؤسسات العالمية</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto leading-relaxed">
              حصلت الأكاديمية على اعتمادات دولية مرموقة تؤكد التزامنا بأعلى معايير الجودة التعليمية والتميز الأكاديمي
            </p>
          </div>

          {internationalAccreditations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {internationalAccreditations.map((accreditation, index) => {
                const colors = [
                  "bg-gradient-to-br from-academy-blue to-blue-700",
                  "bg-gradient-to-br from-academy-gold to-yellow-600",
                  "bg-gradient-to-br from-green-600 to-emerald-700",
                  "bg-gradient-to-br from-purple-600 to-purple-700",
                  "bg-gradient-to-br from-red-600 to-red-700",
                  "bg-gradient-to-br from-teal-600 to-teal-700",
                ]
                const color = colors[index % colors.length]

                return (
                  <Card
                    key={accreditation.id}
                    className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white transform hover:scale-105"
                  >
                    <CardContent className="p-0">
                      <div className={`${color} p-6 text-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="relative">
                          <img
                            src={accreditation.image_url || "/placeholder.svg"}
                            alt={accreditation.title}
                            className="w-full h-56 mx-auto object-contain bg-white/20 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/international-accreditation-certificate.png"
                            }}
                          />
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors leading-tight">
                          {accreditation.title}
                        </h3>
                        <p className="text-academy-dark-gray leading-relaxed text-base">{accreditation.description}</p>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <Badge variant="outline" className="text-xs text-academy-blue border-academy-blue/30">
                            تاريخ الاعتماد: {new Date(accreditation.created_at).toLocaleDateString("ar-SA")}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-academy-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-12 h-12 text-academy-blue" />
                </div>
                <h3 className="text-xl font-semibold text-academy-blue mb-2">لا توجد اعتمادات متاحة حالياً</h3>
                <p className="text-academy-dark-gray">سيتم إضافة الاعتمادات الدولية قريباً</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-academy-blue via-blue-800 to-academy-blue">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">انضم إلى شبكة التميز الأكاديمي</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              استفد من اعتماداتنا الدولية المرموقة لتحقيق أهدافك الأكاديمية والمهنية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/programs"
                className="bg-academy-gold text-academy-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                استكشف البرامج
              </a>
              <a
                href="/admission"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
              >
                ابدأ التسجيل
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
