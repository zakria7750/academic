import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import { getAllInternationalAccreditations } from "@/app/actions/international-accreditations-actions"
import Image from "next/image"

export const revalidate = 300; // ISR لمدة 5 دقائق

export default async function AccreditationsPage() {
  const accreditationsResult = await getAllInternationalAccreditations()
  const internationalAccreditations = accreditationsResult.data || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <Shield className="text-academy-blue" size={32} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">الاعتمادات الدولية</h1>
            </div>
            <p className="text-xl lg:text-2xl text-academy-gold font-medium">
              اعتمادات دولية معترف بها عالمياً تضمن جودة التعليم والشهادات
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/accreditations-hero-background.png"
            alt="الاعتمادات الدولية - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
      </section>

      {/* International Accreditations Section */}
      <section className="py-20 bg-gradient-to-br from-academy-gray to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue mb-4">
              الاعتمادات والشراكات الدولية
            </h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              نفخر بحصولنا على اعتمادات دولية مرموقة تؤكد جودة برامجنا التعليمية والتدريبية
            </p>
          </div>

          {internationalAccreditations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {internationalAccreditations.map((accreditation: any) => (
                <Card
                  key={accreditation.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white overflow-hidden rounded-3xl"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-academy-blue/10 to-academy-gold/10">
                      <Image
                        src={accreditation.image_url || "/placeholder.svg"}
                        alt={accreditation.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-academy-gold text-academy-blue font-bold">
                          اعتماد دولي
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                        {accreditation.title}
                      </h3>
                      <p className="text-academy-dark-gray text-sm leading-relaxed">
                        {accreditation.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد اعتمادات</h3>
              <p className="text-academy-dark-gray">لم يتم إضافة اعتمادات دولية بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue mb-4">
              مميزات الاعتمادات الدولية
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-academy-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-academy-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-3">اعتراف عالمي</h3>
              <p className="text-academy-dark-gray">
                شهاداتنا معترف بها في جميع أنحاء العالم من قبل الجهات المختصة
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-academy-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-academy-gold" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-3">جودة مضمونة</h3>
              <p className="text-academy-dark-gray">
                معايير دولية صارمة تضمن أعلى مستويات الجودة في التعليم
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-academy-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-academy-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-3">ثقة متبادلة</h3>
              <p className="text-academy-dark-gray">
                شراكات استراتيجية مع أفضل المؤسسات التعليمية عالمياً
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
