import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign, CheckCircle, Users } from "lucide-react"
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <BookOpen className="text-academy-blue" size={32} />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">{department.title}</h1>
            </div>
            <p className="text-lg lg:text-xl text-academy-gold font-medium">
              استكشف البرامج المتميزة والفرص التعليمية في هذا القسم
            </p>
          </div>
        </div>
      </section>

      {/* Department Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-academy-blue mb-6">نظرة عامة</h2>
              <p className="text-lg leading-relaxed text-academy-dark-gray mb-8">{department.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-academy-gray p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-academy-blue">{department.programs.length}</div>
                  <div className="text-sm text-academy-dark-gray">برنامج متاح</div>
                </div>
                <div className="bg-academy-gray p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-academy-blue">
                    {Math.round(
                      department.programs.reduce((sum, program) => sum + program.hours, 0) / department.programs.length,
                    )}
                  </div>
                  <div className="text-sm text-academy-dark-gray">ساعة متوسط</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src={department.image || "/placeholder.svg"}
                alt={department.title}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                <BookOpen className="text-academy-blue" size={32} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Objectives */}
      <section className="py-20 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-academy-blue mb-4">أهداف القسم</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              نسعى لتحقيق مجموعة من الأهداف الاستراتيجية التي تضمن جودة التعليم والتطوير المهني
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {department.objectives.map((objective, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-8 h-8 bg-academy-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="text-academy-blue" size={16} />
                    </div>
                    <p className="text-academy-dark-gray leading-relaxed">{objective}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-academy-blue mb-4">البرامج المتاحة</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              اختر من بين مجموعة متنوعة من البرامج التعليمية المتخصصة والمعتمدة دولياً
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {department.programs.map((program, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Program Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Program Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                      {program.name}
                    </h3>

                    <p className="text-academy-dark-gray text-sm leading-relaxed mb-6 line-clamp-3">
                      {program.description}
                    </p>

                    {/* Program Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Clock size={16} className="text-academy-gold" />
                          <span className="text-academy-blue font-semibold text-sm">عدد الساعات</span>
                        </div>
                        <span className="text-academy-dark-gray font-bold">{program.hours} ساعة</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <DollarSign size={16} className="text-academy-gold" />
                          <span className="text-academy-blue font-semibold text-sm">الرسوم الدراسية</span>
                        </div>
                        <span className="text-academy-gold font-bold text-lg">{program.fees} ر.س</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-academy-blue" size={32} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">ابدأ رحلتك التعليمية الآن</h2>
            <p className="text-xl mb-8 text-academy-gold">
              انضم إلى آلاف الطلاب الذين اختاروا أكاديمية المعرفة الدولية لتطوير مهاراتهم ومعارفهم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admission">
                <Button className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  سجل الآن
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  استكشف المزيد
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
