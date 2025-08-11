import { Card, CardContent } from "@/components/ui/card"
import { Award, Eye, Target, Users, Lightbulb, Handshake, CheckCircle, Star } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      title: "الجودة",
      description: "الالتزام بأعلى معايير الأداء الأكاديمي والمهني",
      icon: Award,
      color: "bg-blue-500",
    },
    {
      title: "المصداقية",
      description: "الشفافية والموثوقية في جميع تعاملاتنا وبرامجنا",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "الإبداع",
      description: "تشجيع الأفكار المبتكرة والحلول الخلاقة",
      icon: Lightbulb,
      color: "bg-yellow-500",
    },
    {
      title: "الشراكة",
      description: "التعاون مع مؤسسات وهيئات محلية ودولية لتحقيق أهداف مشتركة",
      icon: Handshake,
      color: "bg-purple-500",
    },
    {
      title: "التمكين",
      description: "دعم المتعلمين والباحثين ليصبحوا عناصر فاعلة في مجتمعاتهم",
      icon: Users,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <span className="text-academy-blue font-bold text-2xl">م</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">من نحن</h1>
            </div>
            <p className="text-xl lg:text-2xl text-academy-gold font-medium">
              تعرف على أكاديمية المعرفة الدولية ورؤيتها ورسالتها وقيمها
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero-background.png"
            alt="من نحن - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center">
                  <Eye className="text-academy-blue" size={24} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue">رؤيتنا</h2>
              </div>
              <div className="bg-academy-gray p-8 rounded-2xl shadow-lg border-r-4 border-academy-gold">
                <p className="text-lg leading-relaxed text-academy-dark-gray">
                  أن نكون منارة تعليمية وبحثية رائدة على المستويين الإقليمي والدولي، نقدم المعرفة الموثوقة، ونحفّز
                  الإبداع، ونؤهل قادة المستقبل القادرين على إحداث أثر إيجابي ومستدام في مجتمعاتهم.
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-6 space-x-reverse">
                <div className="text-center">
                  <div className="text-2xl font-bold text-academy-blue">رائدة</div>
                  <div className="text-sm text-academy-dark-gray">إقليمياً ودولياً</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-academy-blue">موثوقة</div>
                  <div className="text-sm text-academy-dark-gray">في المعرفة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-academy-blue">مؤثرة</div>
                  <div className="text-sm text-academy-dark-gray">في المجتمع</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/vision-image.png"
                  alt="رؤية أكاديمية المعرفة الدولية"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                  <Star className="text-academy-blue" size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <Image
                  src="/mission-image.png"
                  alt="رسالة أكاديمية المعرفة الدولية"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-academy-blue rounded-full flex items-center justify-center shadow-lg">
                  <Target className="text-academy-gold" size={32} />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center">
                  <Target className="text-academy-gold" size={24} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue">رسالتنا</h2>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-r-4 border-academy-blue">
                <p className="text-lg leading-relaxed text-academy-dark-gray">
                  تقديم تعليم وتدريب عالي الجودة يعتمد على أحدث المعايير العالمية، ويجمع بين الأصالة والمعاصرة، لتمكين
                  المتعلمين والباحثين من تطوير مهاراتهم العلمية والمهنية، والمساهمة في إنتاج ونشر المعرفة بما يخدم
                  التنمية الشاملة.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="text-academy-gold font-bold text-lg">جودة عالية</div>
                  <div className="text-sm text-academy-dark-gray">في التعليم والتدريب</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="text-academy-gold font-bold text-lg">معايير دولية</div>
                  <div className="text-sm text-academy-dark-gray">حديثة ومتطورة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center">
                <Star className="text-academy-blue" size={24} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue">قيمنا</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتحدد هويتنا كمؤسسة تعليمية رائدة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-academy-dark-gray leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">انضم إلى رحلة التعلم معنا</h2>
            <p className="text-xl mb-8 text-academy-gold">
              كن جزءاً من مجتمع أكاديمي متميز يسعى لتحقيق التميز والإبداع في التعليم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/programs"
                className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 inline-block"
              >
                استكشف برامجنا
              </a>
              <a
                href="/admission"
                className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 inline-block bg-transparent"
              >
                سجل الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
