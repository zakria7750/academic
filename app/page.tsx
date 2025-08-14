import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Globe, Award } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Academy Logo and Name */}
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <span className="text-academy-blue font-bold text-2xl">م</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">أكاديمية المعرفة الدولية</h1>
            </div>

            {/* Tagline */}
            <p className="text-xl lg:text-2xl mb-8 text-academy-gold font-medium">
              أكاديمية رائدة... نبني العقول ونطور المستقبل
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/admission">
                <Button className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  التسجيل الآن
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  البرامج التعليمية
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-university-campus-students.png"
            alt="أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-16 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="stats-card bg-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">+15,000</h3>
                <p className="text-academy-dark-gray font-medium">عدد الطلاب</p>
              </CardContent>
            </Card>

            <Card className="stats-card bg-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">21</h3>
                <p className="text-academy-dark-gray font-medium">عدد الأقسام</p>
              </CardContent>
            </Card>

            <Card className="stats-card bg-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">+85</h3>
                <p className="text-academy-dark-gray font-medium">عدد البرامج</p>
              </CardContent>
            </Card>

            <Card className="stats-card bg-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">+50</h3>
                <p className="text-academy-dark-gray font-medium">عدد الدول المشاركة</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/academic-excellence-background.png"
            alt="التميز الأكاديمي"
            fill
            className="object-cover opacity-10"
          />
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 z-10"></div>

        <div className="relative z-20 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6">لماذا أكاديمية المعرفة الدولية؟</h2>
            <div className="w-24 h-1 bg-academy-gold mx-auto mb-6"></div>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              نحن نقدم تعليماً متميزاً يجمع بين الأصالة والمعاصرة، مع التركيز على بناء شخصية الطالب وتطوير مهاراته العملية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Global Vision */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/global-vision.png"
                    alt="رؤية عالمية ورسالة واضحة"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors">
                    رؤية عالمية ورسالة واضحة
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed">
                    نسعى لتمكين المتعلمين والباحثين من الوصول إلى المعرفة الحديثة بأسلوب علمي متطور.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Academic Credibility */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/academic-credibility.png"
                    alt="مصداقية أكاديمية"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors">
                    مصداقية أكاديمية
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed">
                    نعتمد معايير عالية في إعداد البرامج التدريبية والبحثية، مع التزام كامل بأخلاقيات المهنة.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: International Certificates */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/international-certificates.png"
                    alt="شهادات معترف بها دولياً"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors">
                    شهادات معترف بها دولياً
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed">
                    نوفر شهادات يمكن التحقق من صحتها مباشرة عبر موقع الأكاديمية، مما يعزز مصداقيتها دولياً.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Program Diversity */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/program-diversity.png"
                    alt="تنوع البرامج"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors">
                    تنوع البرامج
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed">
                    نقدم برامج متخصصة في مجالات الإدارة، العلوم الإنسانية، الدراسات الإسلامية، والبحث العلمي.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 5: Qualified Staff */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/qualified-staff.png"
                    alt="كوادر مؤهلة"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors">
                    كوادر مؤهلة
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed">
                    نخبة من الخبراء والأكاديميين ذوي الخبرة العملية والعلمية.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 6: Motivating Environment */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/motivating-environment.png"
                    alt="بيئة تعليمية محفزة"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors">
                    بيئة تعليمية محفزة
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed">
                    نعتمد نظام تعليم مبتكر يراعي الفروق الفردية ويحفز على الإبداع والمشاركة.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 7: Accreditations and Partnerships */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/accreditations-partnerships.png"
                    alt="اعتمادات وشراكات"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors">
                    اعتمادات وشراكات
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed">
                    علاقات تعاون مع مؤسسات تعليمية وبحثية محلية ودولية.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 8: Post-Graduation Support */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/post-graduation-support.png"
                    alt="دعم المتعلم بعد التخرج"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors">
                    دعم المتعلم بعد التخرج
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed">
                    من خلال فرص النشر العلمي، والمشاركة في المؤتمرات، والتطوير المهني المستمر.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
