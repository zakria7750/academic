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
  ArrowRight,
  ChevronRight,
  Infinity,
  Gem,
  Brain,
  Globe,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import RegistrationForm from "@/components/registration-form"

export default function AdmissionPage() {
  const applicationSteps = [
    {
      step: 1,
      title: "املأ الطلب",
      description: "قم بملء استمارة التقديم الإلكترونية بدقة",
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
      description: "مراجعة الطلب من قبل لجنة القبول المتخصصة",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Ultra Premium Background Pattern */}
      <div className="absolute inset-0 opacity-35">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,31,63,0.06),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.09),transparent_50%)]"></div>
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/12 via-academy-gold/6 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-br from-academy-blue/10 via-academy-blue/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-academy-gold/7 to-academy-blue/7 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 left-1/4 w-5 h-5 bg-academy-gold/45 rotate-45 animate-pulse delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-academy-blue/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-academy-gold/50 rotate-45 animate-pulse delay-1100"></div>
        <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-academy-blue/35 rounded-full animate-pulse delay-1400"></div>
      </div>

      {/* Ultra Premium Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-40">
        {/* Multi-layered Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/85 to-academy-blue/65"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.12),transparent_70%)]"></div>
        
        {/* Ultra Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/25 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-gold/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-academy-gold/15 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-academy-gold/25 rounded-full blur-xl animate-pulse delay-1500"></div>
          
          {/* Premium Geometric Patterns */}
          <div className="absolute top-32 left-1/3 w-6 h-6 border-2 border-academy-gold/30 rotate-45 animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-4 h-4 bg-academy-gold/20 rounded-full animate-pulse delay-2500"></div>
          <div className="absolute top-1/4 right-1/6 w-3 h-3 border border-academy-gold/25 rotate-45 animate-pulse delay-3000"></div>
        </div>
        <div className="relative z-10 container mx-auto max-w-8xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Ultra Premium Academy Logo and Badge
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
              <div className="relative">
                <div className="p-8 bg-white/15 backdrop-blur-2xl rounded-[2rem] border border-white/25 shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                      <span className="text-academy-blue font-bold text-5xl drop-shadow-lg font-arabic tracking-wider">أ</span>
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center shadow-xl border border-white/20">
                      <Crown size={24} className="text-academy-blue" />
                    </div>
                    <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                      <Star size={20} className="text-academy-blue" />
                    </div>
                    <div className="absolute top-2 -left-6 w-8 h-8 bg-academy-gold/80 rounded-full flex items-center justify-center shadow-md">
                      <Gem size={16} className="text-academy-blue" />
                    </div>
                  </div>
                </div>
                
                 Enhanced Floating Elements 
                <div className="absolute -top-6 -left-6 w-8 h-8 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute -bottom-4 -right-8 w-6 h-6 bg-academy-gold-light rounded-full animate-pulse delay-700 shadow-md"></div>
                <div className="absolute top-1/2 -left-12 w-4 h-4 bg-academy-gold rounded-full animate-pulse delay-1200"></div>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <Badge className="bg-white/20 backdrop-blur-2xl text-academy-gold border-academy-gold/40 hover:bg-white/30 px-8 py-4 text-xl font-bold rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105">
                  <GraduationCap className="w-6 h-6 mr-4" />
                  <span className="font-arabic tracking-wide">القبول والتسجيل</span>
                </Badge>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                  <div className="w-16 h-[2px] bg-academy-gold/50"></div>
                  <Sparkles className="text-academy-gold animate-pulse" size={20} />
                  <div className="w-16 h-[2px] bg-academy-gold/50"></div>
                  <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>*/} 

            {/* Ultra Premium Title Section */}
            <div className="mb-16">
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold mb-10 tracking-tight leading-tight font-arabic">
                <span className="block mb-4">انضم إلى</span>
                <span className="bg-gradient-to-r from-white via-academy-gold-light via-white to-academy-gold-light bg-clip-text text-transparent drop-shadow-2xl">
                  أكاديمية المعرفة الدولية
                </span>
              </h1>
              
              {/* Enhanced Decorative Separator */}
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                <div className="relative">
                  <Sparkles className="text-academy-gold animate-pulse" size={36} />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles className="text-academy-gold opacity-30" size={36} />
                  </div>
                </div>
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                <div className="w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>
              
              <p className="text-2xl md:text-3xl lg:text-4xl text-academy-gold-light font-semibold max-w-6xl mx-auto leading-relaxed mb-8 drop-shadow-lg font-arabic tracking-wide">
                ابدأ رحلتك التعليمية معنا واحصل على شهادة معتمدة في تخصصك المفضل
              </p>
              <p className="text-xl md:text-2xl text-academy-gold-200 max-w-5xl mx-auto leading-relaxed font-light font-arabic">
                انضم إلى آلاف الطلاب الذين حققوا أحلامهم الأكاديمية والمهنية معنا في بيئة تعليمية متميزة
              </p>
            </div>

            {/* Ultra Premium Action Buttons */}
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-20">
              <Button className="group bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold-dark hover:from-academy-gold-dark hover:via-academy-gold hover:to-academy-gold-light text-academy-blue font-bold px-16 py-6 text-2xl rounded-[2rem] shadow-[0_20px_40px_rgba(255,215,0,0.3)] hover:shadow-[0_28px_56px_rgba(255,215,0,0.4)] transform hover:scale-105 transition-all duration-500 border-0 min-w-[320px] font-arabic tracking-wide">
                <span className="mr-4">ابدأ التقديم الآن</span>
                <UserPlus className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" size={24} />
              </Button>
              
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="group border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-16 py-6 text-2xl rounded-[2rem] shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_28px_56px_rgba(255,255,255,0.3)] transform hover:scale-105 transition-all duration-500 bg-transparent backdrop-blur-lg hover:backdrop-blur-xl min-w-[320px] font-arabic tracking-wide"
                >
                  <span className="mr-4">تصفح البرامج</span>
                  <BookOpen className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" size={24} />
                </Button>
              </Link>
            </div>

            {/* Ultra Premium Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* قبول سريع */}
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-2xl p-10 rounded-[2rem] border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)]">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/30 to-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-emerald-400/20">
                  <Zap size={40} className="text-emerald-300 drop-shadow-lg" />
                </div>
                <h3 className="text-white font-bold text-2xl mb-4 font-arabic tracking-wide">قبول سريع</h3>
                <p className="text-emerald-300 text-lg leading-relaxed font-arabic">معالجة طلبك خلال 4-7 أيام عمل</p>
              </div>

              {/* شهادات معتمدة */}
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-2xl p-10 rounded-[2rem] border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)]">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-gold/30 to-academy-gold/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                  <Shield size={40} className="text-academy-gold-light drop-shadow-lg" />
                </div>
                <h3 className="text-white font-bold text-2xl mb-4 font-arabic tracking-wide">شهادات معتمدة</h3>
                <p className="text-academy-gold-light text-lg leading-relaxed font-arabic">شهادات معترف بها دولياً ومحلياً</p>
              </div>

              {/* دعم شامل */}
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-2xl p-10 rounded-[2rem] border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)]">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400/30 to-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-blue-400/20">
                  <Users size={40} className="text-blue-300 drop-shadow-lg" />
                </div>
                <h3 className="text-white font-bold text-2xl mb-4 font-arabic tracking-wide">دعم شامل</h3>
                <p className="text-blue-300 text-lg leading-relaxed font-arabic">مرافقة أكاديمية متكاملة ومتخصصة</p>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-background.jpg"
            alt="من نحن"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Ultra Premium Application Steps Section */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/70"></div>
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-academy-blue/12 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-academy-gold/8 to-academy-blue/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Enhanced Geometric Patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,31,63,0.04),transparent_50%)] bg-[radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.06),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Ultra Premium Section Header */}
          <div className="text-center mb-24">
            <div className="relative inline-block mb-12">
              <div className="p-8 bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-slate-200/60 shadow-[0_24px_48px_rgba(0,0,0,0.12)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.18)] transition-all duration-700">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-blue/15">
                    <FileText className="text-academy-gold drop-shadow-lg" size={48} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-academy-gold rounded-full flex items-center justify-center shadow-xl border border-white/30">
                    <Star size={20} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-md"></div>
              <div className="absolute -bottom-4 -right-8 w-5 h-5 bg-academy-blue rounded-full animate-pulse delay-700 shadow-sm"></div>
              <div className="absolute top-1/2 -left-10 w-4 h-4 bg-academy-gold-light rounded-full animate-pulse delay-1200"></div>
            </div>

            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-academy-blue mb-10 tracking-tight leading-tight font-arabic">خطوات التقديم</h2>
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-academy-blue to-transparent shadow-sm"></div>
                <div className="relative">
                  <Sparkles className="text-academy-gold animate-pulse" size={28} />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles className="text-academy-gold opacity-20" size={28} />
                  </div>
                </div>
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-academy-blue to-transparent shadow-sm"></div>
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>
              <p className="text-2xl md:text-3xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-semibold mb-8 font-arabic tracking-wide">
                اتبع هذه الخطوات البسيطة والمدروسة للتقديم والانضمام إلى برامجنا التعليمية المتميزة
              </p>
              <p className="text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed font-arabic">
                عملية سهلة وسريعة ومنظمة تستغرق دقائق قليلة فقط مع متابعة مستمرة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16">
            {applicationSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card
                  key={index}
                  className="group bg-white/95 backdrop-blur-2xl border-0 shadow-[0_24px_48px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-8 hover:scale-[1.03] relative border border-slate-200/60"
                >
                  {/* Ultra Premium Status Indicator */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-academy-blue via-academy-gold via-academy-blue to-academy-gold"></div>
                  
                  {/* Ultra Premium Card Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white/40 to-blue-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating Decorative Elements */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-academy-gold/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-academy-blue/30 rounded-full animate-pulse delay-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Enhanced Step Number Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                      <span className="text-academy-blue font-bold text-lg font-arabic">{step.step}</span>
                    </div>
                  </div>

                  <CardContent className="p-10 text-center relative z-10">
                    {/* Ultra Premium Icon */}
                    <div className="mb-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-academy-blue/15 to-academy-gold/15 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-blue/20 backdrop-blur-sm">
                        <Icon className="text-academy-blue group-hover:text-academy-gold transition-colors duration-500" size={40} />
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="mb-8">
                      <div className="w-20 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto mb-6"></div>
                      <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-500 mb-6 leading-tight font-arabic tracking-wide">
                        {step.title}
                      </h3>
                      <p className="text-academy-dark-gray leading-relaxed font-semibold text-lg font-arabic">{step.description}</p>
                    </div>

                    {/* Ultra Premium Progress Indicator */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue rounded-full transition-all duration-1000 group-hover:w-full shadow-sm" style={{width: `${25 * step.step}%`}}></div>
                      </div>
                      <span className="text-academy-gold font-bold text-base font-arabic">الخطوة {step.step}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Ultra Premium Process Summary */}
          <div className="text-center mt-24">
            <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] p-12 shadow-[0_32px_64px_rgba(0,0,0,0.15)] border border-slate-200/60 max-w-4xl mx-auto hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] transition-all duration-700">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl border border-academy-blue/20">
                  <CheckCircle className="text-academy-gold drop-shadow-lg" size={32} />
                </div>
                <div className="text-center md:text-right">
                  <h3 className="text-academy-blue font-bold text-3xl mb-2 font-arabic tracking-wide">عملية التقديم السريعة والموثوقة</h3>
                  <div className="w-24 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto md:mx-0"></div>
                </div>
              </div>
              <p className="text-academy-dark-gray leading-relaxed font-semibold text-xl font-arabic tracking-wide">
                نلتزم بمعالجة جميع طلبات التقديم خلال 4-7 أيام عمل كحد أقصى، مع إشعارك فوراً بحالة طلبك وتقديم الدعم اللازم في كل مرحلة
              </p>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-academy-blue mb-2 font-arabic">4-7</div>
                  <div className="text-academy-darker-gray font-semibold font-arabic">أيام عمل</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-academy-blue mb-2">24/7</div>
                  <div className="text-academy-darker-gray font-semibold font-arabic">دعم متاح</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-academy-blue mb-2">100%</div>
                  <div className="text-academy-darker-gray font-semibold font-arabic">معدل الاستجابة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Premium Admission Requirements Section */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-blue-50/60"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-academy-blue/12 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-academy-gold/8 to-academy-blue/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Enhanced Geometric Patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,31,63,0.04),transparent_50%)] bg-[radial-gradient(circle_at_75%_75%,rgba(255,215,0,0.06),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Ultra Premium Section Header */}
          <div className="text-center mb-24">
            <div className="relative inline-block mb-12">
              <div className="p-8 bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-slate-200/60 shadow-[0_24px_48px_rgba(0,0,0,0.12)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.18)] transition-all duration-700">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-blue/15">
                    <Award className="text-academy-gold drop-shadow-lg" size={48} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-academy-gold rounded-full flex items-center justify-center shadow-xl border border-white/30">
                    <Star size={20} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-md"></div>
              <div className="absolute -bottom-4 -right-8 w-5 h-5 bg-academy-blue rounded-full animate-pulse delay-700 shadow-sm"></div>
              <div className="absolute top-1/2 -left-10 w-4 h-4 bg-academy-gold-light rounded-full animate-pulse delay-1200"></div>
            </div>

            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-academy-blue mb-10 tracking-tight leading-tight font-arabic">شروط القبول</h2>
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-academy-blue to-transparent shadow-sm"></div>
                <div className="relative">
                  <Sparkles className="text-academy-gold animate-pulse" size={28} />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles className="text-academy-gold opacity-20" size={28} />
                  </div>
                </div>
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-academy-blue to-transparent shadow-sm"></div>
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>
              <p className="text-2xl md:text-3xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-semibold mb-8 font-arabic tracking-wide">
                تعرف على الشروط والمتطلبات اللازمة للالتحاق ببرامجنا التعليمية المتميزة والمعتمدة دولياً
              </p>
              <p className="text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed font-arabic">
                نحن نلتزم بمعايير أكاديمية عالية لضمان جودة التعليم وتميز الخريجين
              </p>
            </div>
          </div>

          {/* Ultra Premium Master's Requirements */}
          <div className="mb-20">
            <Card className="border-0 shadow-[0_24px_48px_rgba(0,0,0,0.12)] bg-white/95 backdrop-blur-xl rounded-[2rem] overflow-hidden hover:shadow-[0_32px_64px_rgba(0,0,0,0.18)] transition-all duration-700">
              <CardHeader className="bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold-dark text-academy-blue p-10">
                <CardTitle className="text-3xl font-bold flex items-center font-arabic tracking-wide">
                  <div className="w-12 h-12 bg-academy-blue/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg backdrop-blur-sm border border-academy-blue/30">
                    <Award className="w-8 h-8 text-academy-blue drop-shadow-md" />
                  </div>
                  شروط الحصول على الماجستير المهني
                </CardTitle>
              </CardHeader>
              <CardContent className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {masterRequirements.map((req, index) => {
                    const Icon = req.icon
                    return (
                      <div
                        key={index}
                        className="group flex items-start space-x-6 space-x-reverse p-8 rounded-3xl bg-gradient-to-br from-slate-50/80 to-blue-50/60 hover:from-academy-gold/10 hover:to-academy-gold/5 border border-slate-200/60 hover:border-academy-gold/30 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                          <Icon className="w-8 h-8 text-academy-blue drop-shadow-md" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-academy-blue group-hover:text-academy-gold mb-4 text-xl font-arabic tracking-wide transition-colors duration-300">{req.title}</h4>
                          <p className="text-academy-dark-gray leading-relaxed font-semibold text-lg font-arabic">{req.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ultra Premium Doctoral Requirements */}
          <div className="mb-20">
            <Card className="border-0 shadow-[0_24px_48px_rgba(0,0,0,0.12)] bg-white/95 backdrop-blur-xl rounded-[2rem] overflow-hidden hover:shadow-[0_32px_64px_rgba(0,0,0,0.18)] transition-all duration-700">
              <CardHeader className="bg-gradient-to-r from-academy-blue via-academy-blue-light to-academy-blue-dark text-white p-10">
                <CardTitle className="text-3xl font-bold flex items-center font-arabic tracking-wide">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg backdrop-blur-sm border border-white/30">
                    <GraduationCap className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                  شروط الحصول على الدكتوراه المهنية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {doctoralRequirements.map((req, index) => {
                    const Icon = req.icon
                    return (
                      <div
                        key={index}
                        className="group flex items-start space-x-6 space-x-reverse p-8 rounded-3xl bg-gradient-to-br from-slate-50/80 to-blue-50/60 hover:from-academy-blue/10 hover:to-academy-blue/5 border border-slate-200/60 hover:border-academy-blue/30 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-blue/20">
                          <Icon className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-academy-blue group-hover:text-academy-blue-dark mb-4 text-xl font-arabic tracking-wide transition-colors duration-300">{req.title}</h4>
                          <p className="text-academy-dark-gray leading-relaxed font-semibold text-lg font-arabic">{req.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ultra Premium General Requirements */}
          <div>
            <Card className="border-0 shadow-[0_24px_48px_rgba(0,0,0,0.12)] bg-white/95 backdrop-blur-xl rounded-[2rem] overflow-hidden hover:shadow-[0_32px_64px_rgba(0,0,0,0.18)] transition-all duration-700">
              <CardHeader className="bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold-dark text-academy-blue p-10">
                <CardTitle className="text-3xl font-bold flex items-center font-arabic tracking-wide">
                  <div className="w-12 h-12 bg-academy-blue/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg backdrop-blur-sm border border-academy-blue/30">
                    <BookOpen className="w-8 h-8 text-academy-blue drop-shadow-md" />
                  </div>
                  الشروط العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {generalRequirements.map((req, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-6 space-x-reverse p-8 rounded-3xl bg-gradient-to-br from-slate-50/80 to-blue-50/60 hover:from-academy-gold/10 hover:to-academy-gold/5 border border-slate-200/60 hover:border-academy-gold/30 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                        <CheckCircle className="w-6 h-6 text-academy-blue drop-shadow-md" />
                      </div>
                      <p className="text-academy-blue group-hover:text-academy-gold font-bold text-xl font-arabic tracking-wide transition-colors duration-300 leading-relaxed">{req}</p>
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
