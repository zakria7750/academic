import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  FileText,
  Search,
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Award,
  CreditCard,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function AdmissionPage() {
  const applicationSteps = [
    {
      step: 1,
      title: "املأ الطلب",
      description: "قم بملء استمارة التقديم الإلكترونية",
      icon: FileText,
      color: "bg-academy-blue",
    },
    {
      step: 2,
      title: "أرفق المستندات",
      description: "رفع الشهادات والمستندات المطلوبة",
      icon: CheckCircle,
      color: "bg-academy-blue",
    },
    {
      step: 3,
      title: "المراجعة",
      description: "مراجعة الطلب من قبل لجنة القبول",
      icon: Search,
      color: "bg-academy-blue",
    },
    {
      step: 4,
      title: "القبول",
      description: "إخطار القبول وبدء الدراسة",
      icon: GraduationCap,
      color: "bg-academy-blue",
    },
  ]

  const masterRequirements = [
    {
      title: "المؤهل العلمي",
      description:
        "أن يكون المتقدم حاصلاً على شهادة الدبلوم مع خبرة عملية، أو شهادة البكالوريوس أو ما يعادلها من جامعة أو مؤسسة تعليمية معترف بها.",
      icon: Award,
    },
    {
      title: "الخبرة العملية",
      description: "تُشترط الخبرة العملية في بعض التخصصات حسب طبيعة البرنامج.",
      icon: Users,
    },
    {
      title: "المستندات المطلوبة",
      description: "صورة من المؤهل العلمي، صورة من الهوية الوطنية أو جواز السفر، صور شخصية حديثة.",
      icon: FileText,
    },
    {
      title: "الرسوم الدراسية",
      description: "سداد الرسوم المقررة وفق نظام الأكاديمية، مع إمكانية التقسيط حسب اللوائح المعتمدة.",
      icon: CreditCard,
    },
    {
      title: "المدة الزمنية",
      description: "تعتمد الأكاديمية نظام الساعات المعتمدة، وتتراوح بين 220 ساعة إلى 320 ساعة تدريبية.",
      icon: Clock,
    },
    {
      title: "متطلبات التخرج",
      description:
        "إتمام جميع المقررات الدراسية بنجاح، تقديم مشروع تخرج أو دراسة تطبيقية، تحقيق الحد الأدنى من المعدل التراكمي.",
      icon: Target,
    },
  ]

  const doctoralRequirements = [
    {
      title: "المؤهل العلمي",
      description:
        "أن يكون المتقدم حاصلاً على شهادة الماجستير المهني في نفس التخصص أو ماجستير أكاديمي أو ما يعادلها من جامعة معترف بها.",
      icon: Award,
    },
    {
      title: "المستندات المطلوبة",
      description: "صورة من المؤهل العلمي، صورة من الهوية الوطنية أو جواز السفر، صور شخصية حديثة.",
      icon: FileText,
    },
    {
      title: "الرسوم الدراسية",
      description: "سداد الرسوم المقررة وفق نظام الأكاديمية، مع إمكانية التقسيط حسب اللوائح المعتمدة.",
      icon: CreditCard,
    },
    {
      title: "المدة الزمنية",
      description: "تعتمد الأكاديمية نظام الساعات المعتمدة، وتتراوح بين 220 ساعة إلى 320 ساعة تدريبية.",
      icon: Clock,
    },
    {
      title: "متطلبات التخرج",
      description:
        "إتمام جميع المقررات الدراسية بنجاح، تقديم مشروع تخرج أو دراسة تطبيقية، تحقيق الحد الأدنى من المعدل التراكمي.",
      icon: Target,
    },
  ]

  const generalRequirements = [
    "إجادة استخدام الحاسوب والإنترنت",
    "الالتزام بحضور 80% من المحاضرات",
    "دفع الرسوم الدراسية في المواعيد",
    "الالتزام بالقوانين واللوائح",
    "إجراء مقابلة شخصية (للبعض)",
  ]

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
              <Badge className="bg-academy-gold/20 text-academy-gold border-academy-gold/30 hover:bg-academy-gold/30">
                <GraduationCap className="w-4 h-4 mr-2" />
                القبول والتسجيل
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              انضم إلى
              <span className="text-academy-gold"> أكاديمية المعرفة الدولية</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-academy-gold/90 font-medium leading-relaxed">
              ابدأ رحلتك التعليمية معنا واحصل على شهادة معتمدة في تخصصك المفضل
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                ابدأ التقديم الآن
              </Button>
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  تصفح البرامج
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Application Steps Section */}
      <section className="py-20 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academy-blue mb-4">خطوات التقديم</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              اتبع هذه الخطوات البسيطة للتقديم والانضمام إلى برامجنا التعليمية المتميزة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card
                  key={index}
                  className="stats-card bg-white border-0 shadow-lg relative group hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-academy-gold" />
                    </div>
                    <div className="w-8 h-8 bg-academy-gold text-academy-blue rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-academy-blue mb-3">{step.title}</h3>
                    <p className="text-academy-dark-gray leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Admission Requirements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academy-blue mb-4">شروط القبول</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              تعرف على الشروط والمتطلبات اللازمة للالتحاق ببرامجنا التعليمية المختلفة
            </p>
          </div>

          {/* Master's Requirements */}
          <div className="mb-16">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-academy-blue text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Award className="w-6 h-6 mr-3 text-academy-gold" />
                  شروط الحصول على الماجستير المهني
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {masterRequirements.map((req, index) => {
                    const Icon = req.icon
                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-4 space-x-reverse p-6 rounded-lg bg-academy-gray/50 hover:bg-academy-blue/10 border border-academy-gray transition-all duration-300 hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-academy-blue rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-academy-gold" />
                        </div>
                        <div>
                          <h4 className="font-bold text-academy-blue mb-3 text-lg">{req.title}</h4>
                          <p className="text-academy-dark-gray leading-relaxed">{req.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Doctoral Requirements */}
          <div className="mb-16">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-academy-blue text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-academy-gold" />
                  شروط الحصول على الدكتوراه المهنية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {doctoralRequirements.map((req, index) => {
                    const Icon = req.icon
                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-4 space-x-reverse p-6 rounded-lg bg-academy-gray/50 hover:bg-academy-blue/10 border border-academy-gray transition-all duration-300 hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-academy-blue rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-academy-gold" />
                        </div>
                        <div>
                          <h4 className="font-bold text-academy-blue mb-3 text-lg">{req.title}</h4>
                          <p className="text-academy-dark-gray leading-relaxed">{req.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* General Requirements */}
          <div>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-academy-blue text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-academy-gold" />
                  الشروط العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generalRequirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 space-x-reverse p-4 rounded-lg bg-academy-gray/50 hover:bg-academy-blue/10 border border-academy-gray transition-all duration-300"
                    >
                      <div className="w-3 h-3 bg-academy-gold rounded-full flex-shrink-0"></div>
                      <p className="text-academy-blue font-medium text-lg">{req}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لبدء رحلتك التعليمية؟</h2>
            <p className="text-xl text-academy-gold/90 mb-8 leading-relaxed">
              انضم إلى آلاف الطلاب الذين حققوا أهدافهم المهنية من خلال برامجنا المتميزة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                ابدأ التقديم الآن
              </Button>
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  تصفح البرامج
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
