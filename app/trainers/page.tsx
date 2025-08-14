import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Users, CheckCircle, FileText, DollarSign, Star, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Trainer } from "@/lib/supabase"
import AccreditationApplicationForm from "@/components/accreditation-application-form"

async function getTrainers(): Promise<Trainer[]> {
  const { data, error } = await supabase.from("trainers").select("*").order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching trainers:", error)
    return []
  }

  return data || []
}

export default async function TrainersPage() {
  const trainers = await getTrainers()

  const requirements = [
    {
      title: "المؤهل العلمي",
      description:
        "أن يكون المتقدم حاصلاً على مؤهل علمي لا يقل عن شهادة البكالوريوس أو ما يعادلها من مؤسسة تعليمية معترف بها.",
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      title: "الخبرة العملية والتدريبية",
      description:
        "خبرة عملية لا تقل عن سنتين في مجال التخصص، وخبرة مثبتة في تقديم الدورات أو البرامج التدريبية بسجلات أو شهادات خبرة.",
      icon: Award,
      color: "bg-green-500",
    },
    {
      title: "المهارات الشخصية والمهنية",
      description:
        "امتلاك مهارات العرض والإلقاء وإدارة القاعة التدريبية، والقدرة على إعداد الحقائب التدريبية وفق معايير الأكاديمية، والالتزام بأخلاقيات المهنة.",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "المستندات المطلوبة",
      description:
        "صورة من المؤهل العلمي، صورة من الهوية الوطنية أو جواز السفر، سيرة ذاتية محدثة، شهادات الخبرة أو الدورات ذات الصلة، وصورة شخصية حديثة.",
      icon: FileText,
      color: "bg-orange-500",
    },
    {
      title: "الرسوم والاعتماد",
      description:
        "سداد رسوم الاعتماد المقررة 50 دولار أمريكي، والحصول على شهادة مدرب معتمد من الأكاديمية مع إدراج في قائمة المدربين الرسمية.",
      icon: DollarSign,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center">
                <Award className="text-academy-blue" size={32} />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">المدربين المعتمدين</h1>
            </div>
            <p className="text-xl lg:text-2xl text-academy-gold font-medium">
              تعرف على نخبة من أفضل المدربين المعتمدين في مختلف التخصصات
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/trainers-hero-background.png"
            alt="المدربين المعتمدين - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-20"
          />
        </div>
      </section>

      {/* Trainers Stats */}
      <section className="py-16 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">{trainers.length}+</h3>
                <p className="text-academy-dark-gray font-medium">مدرب معتمد</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">15+</h3>
                <p className="text-academy-dark-gray font-medium">تخصص مختلف</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-2">98%</h3>
                <p className="text-academy-dark-gray font-medium">معدل الرضا</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trainers List Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center">
                <Award className="text-academy-blue" size={24} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue">قائمة المدربين</h2>
            </div>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto">
              نخبة من أفضل المدربين المعتمدين والمتخصصين في مختلف المجالات العلمية والمهنية
            </p>
          </div>

          {trainers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {trainers.map((trainer) => (
                <Card
                  key={trainer.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white overflow-hidden relative"
                >
                  <CardContent className="p-0">
                    <div className="relative p-6 pb-4">
                      <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-academy-gold shadow-lg group-hover:border-academy-blue transition-colors duration-300">
                        <Image
                          src={trainer.image_url || "/placeholder.svg?height=300&width=300&text=مدرب+معتمد"}
                          alt={trainer.name}
                          fill
                          className="object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Certified Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-academy-gold to-yellow-400 text-academy-blue px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1 space-x-reverse transform group-hover:scale-110 transition-transform duration-300">
                        <Award size={12} />
                        <span>معتمد</span>
                      </div>
                    </div>

                    <div className="px-6 pb-6 text-center relative">
                      {/* Decorative element */}
                      <div className="w-16 h-1 bg-gradient-to-r from-academy-blue to-academy-gold mx-auto mb-4 rounded-full"></div>

                      <h3 className="text-lg font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                        {trainer.name}
                      </h3>

                      {/* Specialization */}
                      <div className="bg-gradient-to-r from-academy-gray to-gray-100 px-4 py-2 rounded-full mb-4 border border-academy-gold/20">
                        <span className="text-academy-blue font-semibold text-sm">{trainer.specialization}</span>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex justify-center space-x-1 space-x-reverse mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="text-academy-gold fill-current drop-shadow-sm" />
                        ))}
                      </div>

                      {/* Contact Button */}
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-academy-blue to-blue-700 text-white hover:from-academy-gold hover:to-yellow-500 hover:text-academy-blue font-bold px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-academy-blue"
                      >
                        تواصل معي
                      </Button>
                    </div>

                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد بيانات</h3>
              <p className="text-academy-dark-gray">لم يتم إضافة المدربين المعتمدين بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Certification Requirements Section */}
      <section className="py-20 bg-academy-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-academy-blue rounded-full flex items-center justify-center">
                <CheckCircle className="text-academy-gold" size={24} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-academy-blue">شروط الحصول على الاعتماد الأكاديمية</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-academy-dark-gray mb-6">
                <strong className="text-academy-blue">هل ترغب أن تكون ضمن قائمة مدربي أكاديمية المعرفة الدولية؟</strong>
              </p>
              <p className="text-lg text-academy-dark-gray leading-relaxed">
                تتيح أكاديمية المعرفة الدولية الفرصة للمدربين المتميزين للانضمام إلى قائمة مدربيها المعتمدين، والاستفادة
                من منصتها للتسويق للمدربين وبيان خبراتهم.
              </p>
            </div>
          </div>

          {/* Requirements Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {requirements.map((requirement, index) => {
              const Icon = requirement.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden"
                >
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className="text-center mb-6">
                      <div
                        className={`w-16 h-16 ${requirement.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="text-white" size={28} />
                      </div>
                      <div className="w-8 h-1 bg-academy-gold mx-auto rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-300">
                        {requirement.title}
                      </h3>
                      <p className="text-academy-dark-gray leading-relaxed text-sm">{requirement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-academy-blue mb-4">مزايا الانضمام لقائمة المدربين المعتمدين</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-academy-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-academy-blue" size={14} />
                  </div>
                  <p className="text-academy-dark-gray">الحصول على شهادة مدرب معتمد من الأكاديمية</p>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-academy-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-academy-blue" size={14} />
                  </div>
                  <p className="text-academy-dark-gray">
                    إدراج صورة المدرب وسيرته الذاتية ضمن قائمة مدربي الأكاديمية في الموقع الرسمي
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-academy-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-academy-blue" size={14} />
                  </div>
                  <p className="text-academy-dark-gray">الحصول على شهادات لدوراته التدريبية برسوم رمزية</p>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-academy-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-academy-blue" size={14} />
                  </div>
                  <p className="text-academy-dark-gray">الاستفادة من منصة الأكاديمية للتسويق والترويج</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="text-academy-blue" size={32} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">انضم إلى فريق المدربين المعتمدين</h2>
            <p className="text-xl mb-8 text-academy-gold">
              كن جزءاً من نخبة المدربين المعتمدين في أكاديمية المعرفة الدولية وشارك خبراتك مع آلاف المتدربين
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admission">
                <Button className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  تقدم للاعتماد
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  تعرف على الأكاديمية
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation Application Form Section */}
      <AccreditationApplicationForm />
    </div>
  )
}
