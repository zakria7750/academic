import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign, CheckCircle, Users, Crown, Star, Sparkles, Award, Target, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Department data
const departmentsData = {
  "educational-psychological": {
    title: "الأقسام التربوية والنفسية",
    description:
      "يضم هذا القسم مجموعة من التخصصات المتقدمة في مجال التربية وعلم النفس، حيث نهدف إلى إعداد كوادر مؤهلة قادرة على التعامل مع التحديات التربوية والنفسية المعاصرة.",
    image: "/educational-psychology-detail.png",
    objectives: [
      "إعداد متخصصين في الإرشاد التربوي والنفسي",
      "تطوير مهارات التعامل مع ذوي الاحتياجات الخاصة",
      "تأهيل خبراء في مجال الطفولة المبكرة",
      "بناء قدرات المدربين التربويين",
    ],
    programs: [
      {
        name: "الإرشاد التربوي",
        description: "برنامج متخصص في تقديم الإرشاد والدعم النفسي للطلاب في البيئة التعليمية",
        hours: 120,
        fees: 2500,
        image: "/program-educational-guidance.png",
      },
      {
        name: "الصحة النفسية",
        description: "برنامج شامل لفهم وعلاج الاضطرابات النفسية وتعزيز الصحة النفسية",
        hours: 150,
        fees: 3000,
        image: "/program-mental-health.png",
      },
      {
        name: "التربية الخاصة",
        description: "برنامج متقدم للتعامل مع ذوي الاحتياجات الخاصة وتطوير برامج التأهيل",
        hours: 140,
        fees: 2800,
        image: "/program-special-education.png",
      },
      {
        name: "الطفولة المبكرة",
        description: "برنامج متخصص في تنمية وتطوير مهارات الأطفال في المراحل المبكرة",
        hours: 100,
        fees: 2200,
        image: "/program-early-childhood.png",
      },
      {
        name: "التدريب التربوي وإعداد المدربين",
        description: "برنامج لإعداد وتأهيل المدربين في المجال التربوي والتعليمي",
        hours: 80,
        fees: 2000,
        image: "/program-trainer-preparation.png",
      },
      {
        name: "علم النفس السلوكي والتطبيقي",
        description: "برنامج متقدم في دراسة السلوك الإنساني وتطبيقاته العملية",
        hours: 130,
        fees: 2700,
        image: "/program-behavioral-psychology.png",
      },
    ],
  },
  "skills-development": {
    title: "الأقسام المهارية والتطويرية",
    description:
      "يركز هذا القسم على تطوير المهارات الشخصية والمهنية الأساسية التي يحتاجها الأفراد في عصر التطور التكنولوجي والتواصل الرقمي.",
    image: "/skills-development-detail.png",
    objectives: [
      "تطوير المهارات الذاتية والشخصية",
      "تعزيز قدرات التواصل والإعلام التربوي",
      "إتقان تقنيات التعليم الرقمي الحديثة",
      "بناء شخصيات قيادية مؤثرة",
    ],
    programs: [
      {
        name: "المهارات الذاتية والتطوير الشخصي",
        description: "برنامج شامل لتطوير الذات وبناء الشخصية القيادية والمهارات الحياتية",
        hours: 60,
        fees: 1500,
        image: "/program-personal-development.png",
      },
      {
        name: "الإعلام التربوي والتواصل الفعال",
        description: "برنامج متخصص في تقنيات التواصل والإعلام في البيئة التعليمية",
        hours: 80,
        fees: 1800,
        image: "/program-educational-media.png",
      },
      {
        name: "التعليم الرقمي وتكنولوجيا التعليم",
        description: "برنامج حديث في استخدام التكنولوجيا والأدوات الرقمية في التعليم",
        hours: 100,
        fees: 2200,
        image: "/program-digital-education.png",
      },
    ],
  },
  "academic-linguistic": {
    title: "الأقسام الأكاديمية واللغوية",
    description:
      "يشمل هذا القسم التخصصات الأكاديمية الأساسية في اللغات والدراسات الإسلامية والبحوث المهنية، مما يوفر أساساً قوياً للمعرفة الأكاديمية.",
    image: "/academic-linguistic-detail.png",
    objectives: [
      "إتقان اللغات المختلفة وتطوير مهارات التواصل",
      "تعميق الفهم في الدراسات الإسلامية",
      "تطوير مهارات البحث العلمي والمهني",
      "بناء قاعدة معرفية أكاديمية متينة",
    ],
    programs: [
      {
        name: "قسم اللغات",
        description: "برنامج شامل لتعلم وإتقان اللغات المختلفة مع التركيز على المهارات التطبيقية",
        hours: 120,
        fees: 2000,
        image: "/program-languages.png",
      },
      {
        name: "قسم الدراسات الإسلامية",
        description: "برنامج متعمق في الدراسات الإسلامية والعلوم الشرعية المعاصرة",
        hours: 150,
        fees: 2300,
        image: "/program-islamic-studies.png",
      },
      {
        name: "قسم الدراسات والبحوث المهنية",
        description: "برنامج متقدم في منهجيات البحث العلمي والدراسات المهنية التطبيقية",
        hours: 100,
        fees: 2500,
        image: "/program-professional-research.png",
      },
    ],
  },
  "administrative-community": {
    title: "الأقسام الإدارية والمجتمعية",
    description:
      "يضم هذا القسم التخصصات الإدارية والمجتمعية الحديثة التي تلبي احتياجات سوق العمل في مجالات الأعمال والتكنولوجيا والتنمية المستدامة.",
    image: "/administrative-community-detail.png",
    objectives: [
      "إعداد قادة في مجال إدارة الأعمال",
      "تطوير مهارات ريادة الأعمال والابتكار",
      "تعزيز الوعي بالتنمية المستدامة",
      "إتقان تطبيقات الذكاء الاصطناعي المهنية",
    ],
    programs: [
      {
        name: "إدارة الأعمال",
        description: "برنامج شامل في إدارة الأعمال والقيادة الإدارية الحديثة",
        hours: 160,
        fees: 3500,
        image: "/program-business-management.png",
      },
      {
        name: "المحاسبة والتحليل المالي",
        description: "برنامج متخصص في المحاسبة والتحليل المالي وإدارة الموارد المالية",
        hours: 140,
        fees: 3200,
        image: "/program-accounting.png",
      },
      {
        name: "ريادة الأعمال",
        description: "برنامج متقدم لتطوير مهارات ريادة الأعمال والابتكار في المشاريع",
        hours: 100,
        fees: 2800,
        image: "/program-entrepreneurship.png",
      },
      {
        name: "التنمية المستدامة والعمل المناخي",
        description: "برنامج حديث في التنمية المستدامة والحلول البيئية المبتكرة",
        hours: 80,
        fees: 2400,
        image: "/program-sustainable-development.png",
      },
      {
        name: "الذكاء الاصطناعي وتطبيقاته المهنية",
        description: "برنامج متطور في الذكاء الاصطناعي وتطبيقاته في مختلف المجالات المهنية",
        hours: 120,
        fees: 4000,
        image: "/program-artificial-intelligence.png",
      },
    ],
  },
  "health-agriculture": {
    title: "الأقسام الصحية والزراعية",
    description:
      "يشمل هذا القسم التخصصات الصحية والزراعية المهمة التي تساهم في تحسين جودة الحياة والأمن الغذائي والصحي للمجتمع.",
    image: "/health-agriculture-detail.png",
    objectives: [
      "تطوير خبرات في التغذية العلاجية",
      "إتقان تقنيات الطب البديل والتكميلي",
      "تعزيز المعرفة في الزراعة المستدامة",
      "بناء قدرات في الأمن الغذائي والصحي",
    ],
    programs: [
      {
        name: "التغذية العلاجية",
        description: "برنامج متخصص في التغذية العلاجية والتداوي بالغذاء والحميات الطبية",
        hours: 120,
        fees: 2800,
        image: "/program-therapeutic-nutrition.png",
      },
      {
        name: "الطب البديل",
        description: "برنامج شامل في الطب البديل والتكميلي والعلاج بالطرق الطبيعية",
        hours: 150,
        fees: 3200,
        image: "/program-alternative-medicine.png",
      },
      {
        name: "الزراعة",
        description: "برنامج متقدم في الزراعة المستدامة والتقنيات الزراعية الحديثة",
        hours: 140,
        fees: 2600,
        image: "/program-agriculture.png",
      },
    ],
  },
}

interface PageProps {
  params: {
    id: string
  }
}

export default function DepartmentDetailPage({ params }: PageProps) {
  const department = departmentsData[params.id as keyof typeof departmentsData]

  if (!department) {
    notFound()
  }

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
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Premium Icon and Breadcrumb */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Link href="/departments" className="text-academy-gold-light hover:text-academy-gold transition-colors duration-300 font-medium">
                الأقسام الأكاديمية
              </Link>
              <span className="text-academy-gold">/</span>
              <span className="text-white font-medium">القسم الحالي</span>
            </div>

            {/* Premium Icon Section */}
            <div className="relative inline-block mb-12">
              <div className="p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <BookOpen className="text-academy-blue" size={40} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-6 w-4 h-4 bg-academy-gold-light rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Premium Title Section */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                  {department.title}
                </span>
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={24} />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl text-academy-gold-light font-medium max-w-4xl mx-auto leading-relaxed">
                استكشف البرامج المتميزة والفرص التعليمية في هذا القسم المتخصص
              </p>
            </div>

            {/* Premium Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-20 max-w-4xl mx-auto">
              {/* Programs Count */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="text-emerald-300" size={24} />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{department.programs.length}</div>
                    <div className="text-emerald-300 font-semibold">برنامج متاح</div>
                  </div>
                </div>
              </div>

              {/* Average Hours */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="text-blue-300" size={24} />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {Math.round(department.programs.reduce((sum, program) => sum + program.hours, 0) / department.programs.length)}
                    </div>
                    <div className="text-blue-300 font-semibold">ساعة متوسط</div>
                  </div>
                </div>
              </div>

              {/* Quality Badge */}
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-academy-gold/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/20 to-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Award className="text-academy-gold-light" size={24} />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">100%</div>
                    <div className="text-academy-gold-light font-semibold">معتمد دولياً</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Department Overview */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
            
            {/* Enhanced Content Section */}
            <div className="space-y-8">
              {/* Premium Section Header */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="text-academy-gold" size={20} />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue tracking-tight">نظرة عامة</h2>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mb-6"></div>
              </div>

              {/* Enhanced Description */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50">
                <p className="text-xl leading-relaxed text-academy-dark-gray font-medium">
                  {department.description}
                </p>
              </div>

              {/* Premium Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="text-emerald-600" size={20} />
                      </div>
                      <div className="text-3xl font-bold text-academy-blue mb-2">{department.programs.length}</div>
                      <div className="text-emerald-600 font-semibold">برنامج متاح</div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Clock className="text-blue-600" size={20} />
                      </div>
                      <div className="text-3xl font-bold text-academy-blue mb-2">
                        {Math.round(department.programs.reduce((sum, program) => sum + program.hours, 0) / department.programs.length)}
                      </div>
                      <div className="text-blue-600 font-semibold">ساعة متوسط</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Additional Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-4 rounded-2xl border border-academy-blue/20 text-center">
                  <div className="w-8 h-8 bg-academy-gold rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Award size={16} className="text-academy-blue" />
                  </div>
                  <span className="text-academy-blue font-semibold text-sm">معتمد دولياً</span>
                </div>

                <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-4 rounded-2xl border border-academy-blue/20 text-center">
                  <div className="w-8 h-8 bg-academy-gold rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users size={16} className="text-academy-blue" />
                  </div>
                  <span className="text-academy-blue font-semibold text-sm">أساتذة خبراء</span>
                </div>

                <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-4 rounded-2xl border border-academy-blue/20 text-center">
                  <div className="w-8 h-8 bg-academy-gold rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe size={16} className="text-academy-blue" />
                  </div>
                  <span className="text-academy-blue font-semibold text-sm">تعليم عالمي</span>
                </div>
              </div>
            </div>

            {/* Enhanced Image Section */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={department.image || "/placeholder.svg"}
                  alt={department.title}
                  width={700}
                  height={500}
                  className="object-cover w-full h-[500px] transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Premium Floating Badge */}
              <div className="absolute -bottom-8 -right-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-2xl border border-academy-gold/30">
                    <BookOpen className="text-academy-blue" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute top-1/4 -left-6 w-4 h-4 bg-academy-blue rounded-full animate-pulse delay-500"></div>
              <div className="absolute bottom-1/4 -right-6 w-5 h-5 bg-academy-gold-light rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Department Objectives */}
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
                    <Target className="text-academy-gold" size={32} />
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
                أهداف القسم
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={20} />
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed font-medium">
                نسعى لتحقيق مجموعة من الأهداف الاستراتيجية التي تضمن جودة التعليم والتطوير المهني
              </p>
            </div>
          </div>

          {/* Premium Objectives Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {department.objectives.map((objective, index) => (
              <Card 
                key={index} 
                className="group bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02] relative border border-slate-200/50"
              >
                {/* Premium Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Objective Number Badge */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-academy-blue font-bold text-sm">{index + 1}</span>
                  </div>
                </div>

                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start gap-6">
                    {/* Premium Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                        <CheckCircle className="text-academy-blue group-hover:text-academy-gold transition-colors duration-300" size={24} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mb-4"></div>
                        <h3 className="text-academy-blue font-bold text-lg mb-3">الهدف {index + 1}</h3>
                      </div>
                      <p className="text-academy-dark-gray leading-relaxed font-medium text-lg">{objective}</p>
                    </div>
                  </div>

                  {/* Premium Progress Indicator */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-academy-blue to-academy-gold rounded-full transition-all duration-1000 group-hover:w-full" style={{width: `${75 + (index * 5)}%`}}></div>
                    </div>
                    <span className="text-academy-gold font-semibold text-sm">متقدم</span>
                  </div>
                </CardContent>

                {/* Premium Floating Elements */}
                <div className="absolute top-6 left-6 w-2 h-2 bg-academy-gold rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
                <div className="absolute bottom-8 left-8 w-3 h-3 bg-academy-blue rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-300 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>

          {/* Premium Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-lg flex items-center justify-center shadow-lg">
                  <Award className="text-academy-gold" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">رؤيتنا للمستقبل</h3>
              </div>
              <p className="text-academy-dark-gray leading-relaxed font-medium">
                نهدف إلى أن نكون روّاداً في التعليم المتخصص ونساهم في بناء جيل متميز من المهنيين المؤهلين لمواجهة تحديات المستقبل
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Available Programs */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <div className="p-4 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <BookOpen className="text-academy-gold" size={32} />
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
                البرامج المتاحة
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={20} />
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed font-medium">
                اختر من بين مجموعة متنوعة من البرامج التعليمية المتخصصة والمعتمدة دولياً
              </p>
            </div>
          </div>

          {/* Premium Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {department.programs.map((program, index) => (
              <Card
                key={index}
                className="group bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-6 hover:scale-[1.02] relative border border-slate-200/50"
              >
                {/* Premium Status Indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue"></div>
                
                {/* Premium Card Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="p-0 relative z-10">
                  {/* Enhanced Program Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Premium Floating Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                        برنامج {index + 1}
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div className="text-white text-center w-full">
                        <p className="text-lg font-semibold mb-2">برنامج متميز</p>
                        <p className="text-sm opacity-90">معتمد دولياً</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Program Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-300 mb-4 leading-tight">
                      {program.name}
                    </h3>

                    <p className="text-academy-dark-gray text-base leading-relaxed mb-6 line-clamp-3 font-medium">
                      {program.description}
                    </p>

                    {/* Premium Program Details */}
                    <div className="space-y-4 mb-8">
                      <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-lg flex items-center justify-center">
                              <Clock className="text-academy-gold" size={16} />
                            </div>
                            <span className="text-academy-blue font-semibold">عدد الساعات</span>
                          </div>
                          <span className="text-academy-dark-gray font-bold text-lg">{program.hours} ساعة</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-lg flex items-center justify-center">
                              <DollarSign className="text-academy-gold" size={16} />
                            </div>
                            <span className="text-academy-blue font-semibold">الرسوم الدراسية</span>
                          </div>
                          <span className="text-academy-gold font-bold text-xl">{program.fees} ر.س</span>
                        </div>
                      </div>
                    </div>

                    {/* Premium Features */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-3 rounded-xl border border-academy-blue/20 text-center">
                        <div className="w-6 h-6 bg-academy-gold rounded-lg flex items-center justify-center mx-auto mb-1">
                          <Award size={12} className="text-academy-blue" />
                        </div>
                        <span className="text-academy-blue font-semibold text-xs">معتمد</span>
                      </div>

                      <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-3 rounded-xl border border-academy-blue/20 text-center">
                        <div className="w-6 h-6 bg-academy-gold rounded-lg flex items-center justify-center mx-auto mb-1">
                          <Users size={12} className="text-academy-blue" />
                        </div>
                        <span className="text-academy-blue font-semibold text-xs">تفاعلي</span>
                      </div>

                      <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-3 rounded-xl border border-academy-blue/20 text-center">
                        <div className="w-6 h-6 bg-academy-gold rounded-lg flex items-center justify-center mx-auto mb-1">
                          <Globe size={12} className="text-academy-blue" />
                        </div>
                        <span className="text-academy-blue font-semibold text-xs">دولي</span>
                      </div>
                    </div>

                    {/* Premium Enrollment Button */}
                    <Link href="/admission">
                      <Button className="w-full bg-gradient-to-r from-academy-blue to-academy-blue-dark hover:from-academy-blue-dark hover:to-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
                        <span className="mr-2">التسجيل في البرنامج</span>
                        <Crown size={16} className="text-academy-gold" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>

                {/* Premium Floating Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-academy-gold rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
                <div className="absolute bottom-6 right-6 w-3 h-3 bg-academy-blue rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-300 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>

          {/* Premium Programs Summary */}
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="text-emerald-600" size={24} />
                  </div>
                  <h3 className="text-academy-blue font-bold text-xl mb-2">{department.programs.length}</h3>
                  <p className="text-academy-dark-gray">برنامج متاح</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-academy-blue font-bold text-xl mb-2">
                    {department.programs.reduce((sum, program) => sum + program.hours, 0)}
                  </h3>
                  <p className="text-academy-dark-gray">ساعة تدريبية</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/20 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="text-academy-gold" size={24} />
                  </div>
                  <h3 className="text-academy-blue font-bold text-xl mb-2">100%</h3>
                  <p className="text-academy-dark-gray">معتمد دولياً</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Registration Section */}
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
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <Users className="text-academy-blue" size={36} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-6 w-4 h-4 bg-academy-gold-light rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Premium Title Section */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                  ابدأ رحلتك التعليمية الآن
                </span>
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={24} />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-gold to-transparent"></div>
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl text-academy-gold-light font-medium max-w-4xl mx-auto leading-relaxed mb-8">
                انضم إلى آلاف الطلاب الذين اختاروا أكاديمية المعرفة الدولية لتطوير مهاراتهم ومعارفهم
              </p>
              <p className="text-lg text-academy-gold-200 max-w-3xl mx-auto">
                استثمر في مستقبلك واحصل على شهادات معتمدة دولياً في {department.title}
              </p>
            </div>

            {/* Premium Action Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/admission">
                <Button className="group bg-gradient-to-r from-academy-gold to-academy-gold-dark hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue font-bold px-12 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0 min-w-[200px]">
                  <span className="mr-3">سجل الآن</span>
                  <Crown className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                </Button>
              </Link>
              
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="group border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-12 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:backdrop-blur-md min-w-[200px]"
                >
                  <span className="mr-3">استكشف المزيد</span>
                  <BookOpen className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                </Button>
              </Link>
            </div>

            {/* Premium Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Star className="text-emerald-300" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">تعليم عالي الجودة</h3>
                <p className="text-academy-gold-200 text-sm">برامج معتمدة دولياً وفق أحدث المعايير التعليمية</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="text-blue-300" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">أساتذة متخصصون</h3>
                <p className="text-academy-gold-200 text-sm">نخبة من الأساتذة والخبراء في مختلف التخصصات</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/20 to-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Globe className="text-academy-gold-light" size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">اعتماد دولي</h3>
                <p className="text-academy-gold-200 text-sm">شهادات معترف بها عالمياً تفتح آفاق المستقبل</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Floating Elements */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
            <span className="text-academy-blue font-medium text-sm">قسم نشط</span>
          </div>
        </div>
      </div>
    </div>
  )
}
