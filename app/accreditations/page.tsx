import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AccreditationsPage() {
  const internationalAccreditations = [
    {
      title: "اعتماد دولي من IACBE",
      description:
        "الاعتماد الدولي لكليات إدارة الأعمال والبرامج التجارية، مما يضمن جودة التعليم وفقاً للمعايير العالمية.",
      color: "bg-gradient-to-br from-academy-blue to-blue-700",
    },
    {
      title: "شهادة الجودة ISO 9001",
      description: "شهادة الجودة العالمية التي تؤكد التزامنا بأعلى معايير الجودة في جميع العمليات التعليمية والإدارية.",
      color: "bg-gradient-to-br from-academy-gold to-yellow-600",
    },
    {
      title: "عضوية CHEA الأمريكية",
      description: "عضوية مجلس اعتماد التعليم العالي الأمريكي، مما يعزز من مكانة الأكاديمية على المستوى الدولي.",
      color: "bg-gradient-to-br from-green-600 to-emerald-700",
    },
  ]

  const universityPartnerships = [
    {
      title: "جامعة هارفارد",
      description: "برامج التبادل الأكاديمي",
      color: "bg-gradient-to-br from-red-600 to-red-700",
    },
    {
      title: "جامعة أكسفورد",
      description: "برامج البحث المشتركة",
      color: "bg-gradient-to-br from-blue-800 to-blue-900",
    },
    {
      title: "معهد MIT",
      description: "التعاون في التكنولوجيا",
      color: "bg-gradient-to-br from-gray-700 to-gray-800",
    },
  ]

  const professionalPartnerships = [
    {
      title: "الهيئة السعودية للمحاسبين",
      description: "اعتماد برامج المحاسبة",
      color: "bg-gradient-to-br from-green-700 to-green-800",
    },
    {
      title: "الجمعية الأمريكية لعلم النفس",
      description: "شراكة في برامج علم النفس",
      color: "bg-gradient-to-br from-purple-600 to-purple-700",
    },
    {
      title: "معهد إدارة المشاريع",
      description: "اعتماد PMP",
      color: "bg-gradient-to-br from-orange-600 to-orange-700",
    },
    {
      title: "الجمعية الدولية للموارد البشرية",
      description: "شهادات HRCI",
      color: "bg-gradient-to-br from-teal-600 to-teal-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-academy-gray to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-academy-blue via-blue-800 to-academy-blue overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/placeholder-vpunx.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">الاعتمادات والشراكات</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              نفخر بشراكاتنا الدولية واعتماداتنا المرموقة التي تضمن جودة التعليم وتميز الخريجين
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-semibold">اعتمادات دولية</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-semibold">شراكات جامعية</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-semibold">شراكات مهنية</span>
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
              حصلت الأكاديمية على اعتمادات دولية مرموقة تؤكد التزامنا بأعلى معايير الجودة التعليمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalAccreditations.map((accreditation, index) => {
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white"
                >
                  <CardContent className="p-0">
                    <div className={`${accreditation.color} p-4 text-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="relative">
                        <img
                          src="/international-accreditation-certificate.png"
                          alt={accreditation.title}
                          className="w-full h-48 mx-auto object-contain bg-white/20 backdrop-blur-sm rounded-lg p-2"
                        />
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors">
                        {accreditation.title}
                      </h3>
                      <p className="text-academy-dark-gray leading-relaxed">{accreditation.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* University Partnerships Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-academy-gray to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-academy-blue text-white mb-4 text-lg px-6 py-2">الشراكات الجامعية</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-6">شراكات مع أعرق الجامعات العالمية</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto leading-relaxed">
              نتعاون مع أفضل الجامعات العالمية لتوفير فرص تعليمية وبحثية متميزة لطلابنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universityPartnerships.map((partnership, index) => {
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white"
                >
                  <CardContent className="p-0">
                    <div className={`${partnership.color} p-4 text-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="relative">
                        <img
                          src="/university-partnership-logo.png"
                          alt={partnership.title}
                          className="w-full h-48 mx-auto object-contain bg-white/20 backdrop-blur-sm rounded-lg p-2"
                        />
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors">
                        {partnership.title}
                      </h3>
                      <p className="text-academy-dark-gray leading-relaxed">{partnership.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Professional Partnerships Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-academy-gold text-academy-blue mb-4 text-lg px-6 py-2">الشراكات المهنية</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-6">
              شراكات مع المؤسسات المهنية الرائدة
            </h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto leading-relaxed">
              نتشارك مع أبرز المؤسسات المهنية لضمان حصول خريجينا على أفضل الشهادات المهنية المعتمدة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {professionalPartnerships.map((partnership, index) => {
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white"
                >
                  <CardContent className="p-0">
                    <div className={`${partnership.color} p-3 text-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="relative">
                        <img
                          src="/professional-organization-logo.png"
                          alt={partnership.title}
                          className="w-full h-40 mx-auto object-contain bg-white/20 backdrop-blur-sm rounded-lg p-2"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors leading-tight">
                        {partnership.title}
                      </h3>
                      <p className="text-academy-dark-gray text-sm leading-relaxed">{partnership.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-academy-blue via-blue-800 to-academy-blue">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">انضم إلى شبكة التميز الأكاديمي</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              استفد من شراكاتنا الدولية واعتماداتنا المرموقة لتحقيق أهدافك الأكاديمية والمهنية
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
