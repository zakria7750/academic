import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Monitor,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Headphones,
  Users2,
  Play,
  CheckCircle,
  Award,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EducationSystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-academy-blue to-academy-blue/90">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">نظام التعليم</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              نظام تعليمي متطور يجمع بين الأصالة والحداثة
            </p>
          </div>
        </div>
      </section>

      {/* نظام التعليم */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-academy-blue">نظام التعليم</h2>
              <p className="text-lg text-academy-dark-gray leading-relaxed">
                نظام تعليمي متطور يجمع بين الأصالة والحداثة، مصمم لتلبية احتياجات العصر ومتطلبات سوق العمل.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-academy-gold/10 text-academy-blue border-academy-gold">
                  تعليم متطور
                </Badge>
                <Badge variant="secondary" className="bg-academy-gold/10 text-academy-blue border-academy-gold">
                  مناهج حديثة
                </Badge>
                <Badge variant="secondary" className="bg-academy-gold/10 text-academy-blue border-academy-gold">
                  تقنيات متقدمة
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/modern-education.png"
                alt="نظام التعليم المتطور"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* أساليب التعليم */}
      <section className="py-20 px-4 bg-academy-gray/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-4">أساليب التعليم</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto">
              نوفر طرق تعليم متنوعة لتناسب جميع احتياجات الطلاب
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* التعليم الحضوري */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-academy-gold overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/classroom-learning.png"
                  alt="التعليم الحضوري"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <Users className="w-10 h-10 text-academy-blue" />
                </div>
                <CardTitle className="text-2xl text-academy-blue">التعليم الحضوري</CardTitle>
                <CardDescription className="text-academy-dark-gray">
                  محاضرات وجلسات تفاعلية في بيئة تعليمية متطورة مع أحدث التقنيات التعليمية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-academy-gold flex-shrink-0" />
                    <span className="text-academy-dark-gray">قاعات مجهزة بأحدث التقنيات</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-academy-gold flex-shrink-0" />
                    <span className="text-academy-dark-gray">ورش عمل تطبيقية</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-academy-gold flex-shrink-0" />
                    <span className="text-academy-dark-gray">نقاشات جماعية</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-academy-gold flex-shrink-0" />
                    <span className="text-academy-dark-gray">مشاريع تعاونية</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* التعليم الإلكتروني */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-academy-gold overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/online-learning.png"
                  alt="التعليم الإلكتروني"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <Monitor className="w-10 h-10 text-academy-blue" />
                </div>
                <CardTitle className="text-2xl text-academy-blue">التعليم الإلكتروني</CardTitle>
                <CardDescription className="text-academy-dark-gray">
                  منصة تعليمية متقدمة تتيح التعلم من أي مكان وفي أي وقت مع أدوات تفاعلية متطورة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-academy-gold flex-shrink-0" />
                    <span className="text-academy-dark-gray">محاضرات مباشرة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-academy-gold flex-shrink-0" />
                    <span className="text-academy-dark-gray">منتديات نقاش تفاعلية</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-academy-gold flex-shrink-0" />
                    <span className="text-academy-dark-gray">اختبارات إلكترونية</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-academy-gold flex-shrink-0" />
                    <span className="text-academy-dark-gray">متابعة الأداء الفوري</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* أساليب التقييم */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-4">أساليب التقييم</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto">
              نظام تقييم شامل ومتوازن يضمن قياس الأداء بدقة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* التعليم المستمر */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/continuous-assessment.png"
                  alt="التقييم المستمر"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-academy-blue" />
                </div>
                <CardTitle className="text-xl text-academy-blue">التعليم المستمر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-academy-dark-gray">واجبات مدرسية</span>
                  <Badge className="bg-academy-gold text-white">15%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-academy-dark-gray">مشاركة في النقاشات</span>
                  <Badge className="bg-academy-gold text-white">20%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-academy-dark-gray">مشاريع عملية</span>
                  <Badge className="bg-academy-gold text-white">25%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* الاختبارات */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/examinations.png"
                  alt="الاختبارات"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-academy-blue" />
                </div>
                <CardTitle className="text-xl text-academy-blue">الاختبارات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="text-center">
                    <div className="text-academy-dark-gray mb-2">اختبار نهاية البرنامج</div>
                    <Badge className="bg-academy-blue text-white">اختبار شامل</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* مشروع التخرج */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/graduation-project.png"
                  alt="مشروع التخرج"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <Award className="w-10 h-10 text-academy-blue" />
                </div>
                <CardTitle className="text-xl text-academy-blue">مشروع التخرج</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-academy-gold" />
                  <span className="text-sm text-academy-dark-gray">بحث علمي متقدم</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-academy-gold" />
                  <span className="text-sm text-academy-dark-gray">مشروع تطبيقي</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-academy-gold" />
                  <span className="text-sm text-academy-dark-gray">عرض ونقاش</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-academy-gold" />
                  <span className="text-sm text-academy-dark-gray">تقييم لجنة متخصصة</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* مميزات المنصة التعليمية */}
      <section className="py-20 px-4 bg-academy-gray/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-4">مميزات المنصة التعليمية</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto">تقنيات متقدمة لتجربة تعليمية متميزة</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* محاضرات فيديو */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/video-lectures.png"
                  alt="محاضرات فيديو"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-academy-gold/10 transition-colors">
                  <Play className="w-10 h-10 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl text-academy-blue">محاضرات فيديو</CardTitle>
                <CardDescription className="text-academy-dark-gray">
                  محاضرات عالية الجودة متاحة في أي وقت
                </CardDescription>
              </CardHeader>
            </Card>

            {/* منتديات نقاش */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/discussion-forums.png"
                  alt="منتديات نقاش"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-academy-gold/10 transition-colors">
                  <MessageSquare className="w-10 h-10 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl text-academy-blue">منتديات نقاش</CardTitle>
                <CardDescription className="text-academy-dark-gray">تفاعل مباشر مع الأساتذة والطلاب</CardDescription>
              </CardHeader>
            </Card>

            {/* تتبع التقدم */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/progress-tracking.png"
                  alt="تتبع التقدم"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-academy-gold/10 transition-colors">
                  <TrendingUp className="w-10 h-10 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl text-academy-blue">تتبع التقدم</CardTitle>
                <CardDescription className="text-academy-dark-gray">متابعة مستمرة لأدائك الأكاديمي</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* الدعم الأكاديمي */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-4">الدعم الأكاديمي</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto">دعم شامل لضمان نجاحك الأكاديمي</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center space-y-4 hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/academic-advisor.png"
                  alt="مرشد أكاديمي"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <UserCheck className="w-10 h-10 text-academy-blue" />
                </div>
                <h3 className="text-xl font-semibold text-academy-blue">مرشد أكاديمي</h3>
                <p className="text-academy-dark-gray">توجيه شخصي طوال فترة الدراسة</p>
              </CardHeader>
            </Card>

            <Card className="text-center space-y-4 hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/technical-support.png"
                  alt="دعم تقني"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <Headphones className="w-10 h-10 text-academy-blue" />
                </div>
                <h3 className="text-xl font-semibold text-academy-blue">دعم تقني</h3>
                <p className="text-academy-dark-gray">مساعدة فنية على مدار 24 ساعة</p>
              </CardHeader>
            </Card>

            <Card className="text-center space-y-4 hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/study-groups.png"
                  alt="مجموعات دراسية"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <Users2 className="w-10 h-10 text-academy-blue" />
                </div>
                <h3 className="text-xl font-semibold text-academy-blue">مجموعات دراسية</h3>
                <p className="text-academy-dark-gray">تعلم تعاوني مع زملائك</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ابدأ رحلتك التعليمية اليوم */}
      <section className="py-20 px-4 bg-gradient-to-r from-academy-blue to-academy-blue/90">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">ابدأ رحلتك التعليمية اليوم</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            اكتشف نظام تعليمي متطور يؤهلك لمستقبل مهني متميز
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-academy-gold hover:bg-academy-gold/90 text-academy-blue font-semibold px-8 py-3"
            >
              <Link href="/programs" className="flex items-center gap-2">
                تصفح البرامج التعليمية
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-academy-blue px-8 py-3 bg-transparent"
            >
              <Link href="/admission" className="flex items-center gap-2">
                تقديم للالتحاق
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
