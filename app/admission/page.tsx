import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function AdmissionPage() {
  const applicationSteps = [
    {
      step: 1,
      title: "املأ الطلب",
      description: "قم بملء استمارة التقديم الإلكترونية",
      icon: FileText,
      color: "bg-academy-yellow",
    },
    {
      step: 2,
      title: "أرفق المستندات",
      description: "رفع الشهادات والمستندات المطلوبة",
      icon: CheckCircle,
      color: "bg-amber-500",
    },
    {
      step: 3,
      title: "المراجعة",
      description: "مراجعة الطلب من قبل لجنة القبول",
      icon: Search,
      color: "bg-orange-500",
    },
    {
      step: 4,
      title: "القبول",
      description: "إخطار القبول وبدء الدراسة",
      icon: GraduationCap,
      color: "bg-yellow-600",
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
    <div className="min-h-screen bg-gradient-to-br from-academy-yellow/5 via-white to-amber-50/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-academy-yellow/10 to-amber-100/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-academy-yellow/20 text-academy-yellow border-academy-yellow/30 hover:bg-academy-yellow/30">
              <GraduationCap className="w-4 h-4 mr-2" />
              القبول والتسجيل
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              انضم إلى
              <span className="text-academy-yellow"> أكاديمية المعرفة</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ابدأ رحلتك التعليمية معنا واحصل على شهادة معتمدة في تخصصك المفضل
            </p>
          </div>
        </div>
      </section>

      {/* Application Steps Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">خطوات التقديم</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اتبع هذه الخطوات البسيطة للتقديم والانضمام إلى برامجنا التعليمية المتميزة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card
                  key={index}
                  className="relative group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-academy-yellow text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Admission Requirements Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-amber-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">شروط القبول</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              تعرف على الشروط والمتطلبات اللازمة للالتحاق ببرامجنا التعليمية المختلفة
            </p>
          </div>

          {/* Master's Requirements */}
          <div className="mb-16">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-academy-yellow to-amber-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Award className="w-6 h-6 mr-3" />
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
                        className="flex items-start space-x-4 space-x-reverse p-4 rounded-lg hover:bg-academy-yellow/5 transition-colors duration-300"
                      >
                        <div className="w-12 h-12 bg-academy-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-academy-yellow" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">{req.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{req.description}</p>
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
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3" />
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
                        className="flex items-start space-x-4 space-x-reverse p-4 rounded-lg hover:bg-amber-50 transition-colors duration-300"
                      >
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">{req.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{req.description}</p>
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
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-yellow-600 to-academy-yellow text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  الشروط العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generalRequirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 space-x-reverse p-4 rounded-lg hover:bg-yellow-50 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-academy-yellow rounded-full flex-shrink-0"></div>
                      <p className="text-gray-700 font-medium">{req}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-academy-yellow to-amber-500">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لبدء رحلتك التعليمية؟</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              انضم إلى آلاف الطلاب الذين حققوا أهدافهم المهنية من خلال برامجنا المتميزة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-academy-yellow px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg">
                ابدأ التقديم الآن
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-academy-yellow transition-colors duration-300">
                تصفح البرامج
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
