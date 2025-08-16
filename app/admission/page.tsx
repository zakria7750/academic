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
  Crown,
  Sparkles,
  Star,
  Zap,
  UserPlus,
  Shield,
} from "lucide-react"
import Link from "next/link"
import RegistrationForm from "@/components/registration-form"

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-academy-blue/5 via-transparent to-academy-gold/5"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-academy-gold/5 to-academy-blue/5 rounded-full blur-3xl"></div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Enhanced Background with Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/70 to-academy-blue/50"></div>
        
        {/* Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-academy-gold/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-academy-gold/15 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-academy-gold/20 rounded-full blur-xl animate-pulse delay-1500"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Premium Academy Logo and Badge */}
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-academy-blue font-bold text-3xl">أ</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                  <Crown size={16} className="text-academy-blue" />
                </div>
              </div>
              <Badge className="bg-white/10 backdrop-blur-xl text-academy-gold border-academy-gold/30 hover:bg-white/20 px-6 py-3 text-lg font-bold rounded-2xl">
                <GraduationCap className="w-5 h-5 mr-3" />
                القبول والتسجيل
              </Badge>
            </div>

            {/* Premium Title Section */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-tight">
                انضم إلى
                <br />
                <span className="bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold bg-clip-text text-transparent">
                  أكاديمية المعرفة الدولية
                </span>
              </h1>
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={28} />
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl text-academy-gold-light font-medium max-w-5xl mx-auto leading-relaxed mb-6">
                ابدأ رحلتك التعليمية معنا واحصل على شهادة معتمدة في تخصصك المفضل
              </p>
              <p className="text-lg md:text-xl text-academy-gold-200 max-w-4xl mx-auto leading-relaxed">
                انضم إلى آلاف الطلاب الذين حققوا أحلامهم الأكاديمية والمهنية معنا
              </p>
            </div>

            {/* Premium Action Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
              <Button className="group bg-gradient-to-r from-academy-gold to-academy-gold-dark hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue font-bold px-12 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0 min-w-[200px]">
                <span className="mr-3">ابدأ التقديم الآن</span>
                <UserPlus className="group-hover:rotate-12 transition-transform duration-300" size={20} />
              </Button>
              
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="group border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-12 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:backdrop-blur-md min-w-[200px]"
                >
                  <span className="mr-3">تصفح البرامج</span>
                  <BookOpen className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                </Button>
              </Link>
            </div>

            {/* Premium Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {/* قبول سريع */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Zap className="text-emerald-300" size={28} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">قبول سريع</h3>
                    <p className="text-emerald-300 text-sm">معالجة طلبك خلال 4-7 أيام عمل</p>
                  </div>
                </div>
              </div>

              {/* شهادات معتمدة */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-academy-gold/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-academy-gold/20 to-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Shield className="text-academy-gold-light" size={28} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">شهادات معتمدة</h3>
                    <p className="text-academy-gold-light text-sm">شهادات معترف بها دولياً</p>
                  </div>
                </div>
              </div>

              {/* دعم شامل */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="text-blue-300" size={28} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">دعم شامل</h3>
                    <p className="text-blue-300 text-sm">مرافقة أكاديمية متكاملة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Application Steps Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <div className="p-4 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <FileText className="text-academy-gold" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                    <Star size={12} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 w-4 h-4 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-4 w-3 h-3 bg-academy-blue rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-academy-blue mb-6 tracking-tight">
                خطوات التقديم
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={20} />
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed font-medium mb-4">
                اتبع هذه الخطوات البسيطة للتقديم والانضمام إلى برامجنا التعليمية المتميزة
              </p>
              <p className="text-lg text-academy-darker-gray max-w-3xl mx-auto">
                عملية سهلة وسريعة تستغرق دقائق قليلة فقط
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
            {applicationSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card
                  key={index}
                  className="group bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-6 hover:scale-[1.02] relative border border-slate-200/50"
                >
                  {/* Premium Status Indicator */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue"></div>
                  
                  {/* Premium Card Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Step Number Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-academy-blue font-bold text-sm">{step.step}</span>
                    </div>
                  </div>

                  <CardContent className="p-8 text-center relative z-10">
                    {/* Premium Icon */}
                    <div className="mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                        <Icon className="text-academy-blue group-hover:text-academy-gold transition-colors duration-300" size={32} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <div className="w-16 h-1 bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto mb-4"></div>
                      <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-300 mb-4 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-academy-dark-gray leading-relaxed font-medium text-lg">{step.description}</p>
                    </div>

                    {/* Premium Progress Indicator */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-academy-blue to-academy-gold rounded-full transition-all duration-1000 group-hover:w-full" style={{width: `${25 * step.step}%`}}></div>
                      </div>
                      <span className="text-academy-gold font-semibold text-sm">الخطوة {step.step}</span>
                    </div>
                  </CardContent>

                  {/* Premium Floating Elements */}
                  <div className="absolute top-6 left-6 w-2 h-2 bg-academy-gold rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
                  <div className="absolute bottom-8 left-8 w-3 h-3 bg-academy-blue rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-300 transition-opacity duration-300"></div>
                </Card>
              )
            })}
          </div>

          {/* Premium Process Summary */}
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-lg flex items-center justify-center shadow-lg">
                  <CheckCircle className="text-academy-gold" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">عملية التقديم السريعة</h3>
              </div>
              <p className="text-academy-dark-gray leading-relaxed font-medium">
                نلتزم بمعالجة جميع طلبات التقديم خلال 4-7 أيام عمل، مع إشعارك فوراً بحالة طلبك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Admission Requirements Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <div className="p-4 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl">
                  <Award className="text-academy-gold" size={32} />
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-academy-blue mb-6 tracking-tight">شروط القبول</h2>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto font-medium">
              تعرف على الشروط والمتطلبات اللازمة للالتحاق ببرامجنا التعليمية المختلفة
            </p>
          </div>

          {/* Master's Requirements */}
          <div className="mb-16">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-academy-gold text-academy-blue rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Award className="w-6 h-6 mr-3 text-academy-blue" />
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
                        className="flex items-start space-x-4 space-x-reverse p-6 rounded-lg bg-academy-gray/50 hover:bg-academy-gold/10 border border-academy-gray transition-all duration-300 hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-academy-gold rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-academy-blue" />
                        </div>
                        <div>
                          <h4 className="font-bold text-academy-gold mb-3 text-lg">{req.title}</h4>
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
              <CardHeader className="bg-academy-gold text-academy-blue rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-academy-blue" />
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
                        className="flex items-start space-x-4 space-x-reverse p-6 rounded-lg bg-academy-gray/50 hover:bg-academy-gold/10 border border-academy-gray transition-all duration-300 hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-academy-gold rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-academy-blue" />
                        </div>
                        <div>
                          <h4 className="font-bold text-academy-gold mb-3 text-lg">{req.title}</h4>
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
              <CardHeader className="bg-academy-gold text-academy-blue rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-academy-blue" />
                  الشروط العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generalRequirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 space-x-reverse p-4 rounded-lg bg-academy-gray/50 hover:bg-academy-gold/10 border border-academy-gray transition-all duration-300"
                    >
                      <div className="w-3 h-3 bg-academy-blue rounded-full flex-shrink-0"></div>
                      <p className="text-academy-gold font-medium text-lg">{req}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academy-blue mb-4">نموذج التسجيل</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              املأ النموذج التالي للتقديم والانضمام إلى برامجنا التعليمية المتميزة
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/70 to-academy-blue/50"></div>
        
        {/* Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-academy-gold/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-academy-gold/15 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-academy-gold/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto text-white">
            {/* Premium Icon Section */}
            <div className="relative inline-block mb-12">
              <div className="p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                  <UserPlus className="text-academy-blue" size={40} />
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-6 w-4 h-4 bg-academy-gold-light rounded-full animate-pulse delay-700"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                هل أنت مستعد لبدء رحلتك التعليمية؟
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-academy-gold-light font-medium max-w-4xl mx-auto leading-relaxed mb-12">
              انضم إلى آلاف الطلاب الذين حققوا أهدافهم المهنية من خلال برامجنا المتميزة
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button className="group bg-gradient-to-r from-academy-gold to-academy-gold-dark hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue font-bold px-12 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0 min-w-[250px]">
                <span className="mr-3">ابدأ التقديم الآن</span>
                <UserPlus className="group-hover:rotate-12 transition-transform duration-300" size={20} />
              </Button>
              
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="group border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-12 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:backdrop-blur-md min-w-[250px]"
                >
                  <span className="mr-3">تصفح البرامج</span>
                  <BookOpen className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Floating Elements */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
            <span className="text-academy-blue font-medium text-sm">القبول مفتوح</span>
          </div>
        </div>
      </div>
    </div>
  )
}
