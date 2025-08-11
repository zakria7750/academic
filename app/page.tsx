import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Globe, Award, CheckCircle, Target, Lightbulb } from "lucide-react"
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academy-blue mb-4">لماذا أكاديمية المعرفة الدولية؟</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              نحن نقدم تعليماً متميزاً يجمع بين الأصالة والمعاصرة، مع التركيز على بناء شخصية الطالب وتطوير مهاراته العملية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-academy-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-4">جودة التعليم</h3>
              <p className="text-academy-dark-gray">
                نقدم برامج تعليمية معتمدة دولياً مع أحدث المناهج والتقنيات التعليمية
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-academy-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-4">التخصص والتميز</h3>
              <p className="text-academy-dark-gray">نركز على التخصصات المطلوبة في سوق العمل مع برامج متطورة ومتخصصة</p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="text-academy-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-4">الابتكار والإبداع</h3>
              <p className="text-academy-dark-gray">
                نشجع الطلاب على الابتكار والإبداع من خلال بيئة تعليمية محفزة ومتطورة
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-academy-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-4">هيئة تدريس متميزة</h3>
              <p className="text-academy-dark-gray">نضم نخبة من أفضل الأساتذة والخبراء في مختلف التخصصات</p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-academy-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-4">الانتشار العالمي</h3>
              <p className="text-academy-dark-gray">نخدم طلاباً من أكثر من 50 دولة حول العالم مع شراكات دولية متميزة</p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-academy-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-4">الاعتماد الدولي</h3>
              <p className="text-academy-dark-gray">شهاداتنا معتمدة دولياً ومعترف بها في جميع أنحاء العالم</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
