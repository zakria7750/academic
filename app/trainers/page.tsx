"use client"

import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Users, CheckCircle, FileText, DollarSign, Star, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Trainer } from "@/lib/supabase"
import AccreditationApplicationForm from "@/components/accreditation-application-form"
import { useEffect, useState } from "react"

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getTrainers() {
      const { data, error } = await supabase.from("trainers").select("*").order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching trainers:", error)
        setTrainers([])
      } else {
        setTrainers(data || [])
      }
      setLoading(false)
    }

    getTrainers()
  }, [])

  const requirements = [
    {
      title: "المؤهل العلمي",
      description:
        "أن يكون المتقدم حاصلاً على مؤهل علمي لا يقل عن شهادة البكالوريوس أو ما يعادلها من مؤسسة تعليمية معترف بها.",
      icon: GraduationCap,
      color: "bg-gradient-to-br from-academy-blue to-academy-blue-600",
    },
    {
      title: "الخبرة العملية والتدريبية",
      description:
        "خبرة عملية لا تقل عن سنتين في مجال التخصص، وخبرة مثبتة في تقديم الدورات أو البرامج التدريبية بسجلات أو شهادات خبرة.",
      icon: Award,
      color: "bg-gradient-to-br from-academy-gold to-academy-gold-600",
    },
    {
      title: "المهارات الشخصية والمهنية",
      description:
        "امتلاك مهارات العرض والإلقاء وإدارة القاعة التدريبية، والقدرة على إعداد الحقائب التدريبية وفق معايير الأكاديمية، والالتزام بأخلاقيات المهنة.",
      icon: Users,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "المستندات المطلوبة",
      description:
        "صورة من المؤهل العلمي، صورة من الهوية الوطنية أو جواز السفر، سيرة ذاتية محدثة، شهادات الخبرة أو الدورات ذات الصلة، وصورة شخصية حديثة.",
      icon: FileText,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      title: "الرسوم والاعتماد",
      description:
        "سداد رسوم الاعتماد المقررة 50 دولار أمريكي، والحصول على شهادة مدرب معتمد من الأكاديمية مع إدراج في قائمة المدربين الرسمية.",
      icon: DollarSign,
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-academy-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Ultra Premium Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,31,63,0.05),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]"></div>
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/10 via-academy-gold/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-br from-academy-blue/8 via-academy-blue/4 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-academy-gold/6 to-academy-blue/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-academy-gold/40 rotate-45 animate-pulse delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-academy-blue/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-academy-gold/50 rotate-45 animate-pulse delay-1100"></div>
      </div>

      {/* Ultra Premium Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-40">
        {/* Multi-layered Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/80 to-academy-blue/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)]"></div>
        
        {/* Ultra Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/25 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-gold/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-academy-gold/15 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-academy-gold/25 rounded-full blur-xl animate-pulse delay-1500"></div>
          
          {/* Premium Geometric Patterns */}
          <div className="absolute top-32 left-1/3 w-6 h-6 border-2 border-academy-gold/30 rotate-45 animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-4 h-4 bg-academy-gold/20 rounded-full animate-pulse delay-2500"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-8xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Premium Title Section */}
            <div className="absolute inset-0 z-0">
          <Image
            src="/graduates-hero-background-1440.webp"
            alt="خريجو أكاديمية المعرفة الدولية"
            fill
            className="object-contian"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/60 via-academy-blue/40 to-academy-blue-dark/80"></div>
        </div>
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                  المدربين المعتمدين
                </span>
              </h1>
            </div>
            
            {/* Premium Description */}
            <div className="mb-16">
              <p className="text-2xl lg:text-3xl mb-6 font-semibold leading-relaxed">
                <span className="bg-gradient-to-r from-academy-gold-light to-white bg-clip-text text-transparent">
                  نخبة من أفضل المدربين المعتمدين في مختلف التخصصات
                </span>
              </p>
              <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                مدربون معتمدون من أكاديمية المعرفة الدولية يقدمون تدريباً عالي الجودة ومتخصصاً
              </p>
              
              {/* Premium Stats Preview */}
              <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">{trainers.length}</div>
                  <div className="text-white/80">مدرب معتمد</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">100%</div>
                  <div className="text-white/80">اعتماد مؤكد</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">خبرة</div>
                  <div className="text-white/80">متميزة ومعتمدة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Trainers List Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-block p-3 bg-academy-gold/10 rounded-full mb-6">
              <Award className="text-academy-gold" size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-academy-blue mb-6">قائمة المدربين</h2>
            <p className="text-xl lg:text-2xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              نخبة من أفضل المدربين المعتمدين والمتخصصين في مختلف المجالات العلمية والمهنية
            </p>
          </div>

          {trainers.length > 0 ? (
            <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
              {trainers.map((trainer) => (
                <Card
                  key={trainer.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-xl bg-white overflow-hidden rounded-3xl relative border-2 border-academy-gold/30 hover:border-academy-gold"
                >
                  <CardContent className="p-0 relative">
                    {/* Enhanced Oval Image */}
                    <div className="relative p-6 pb-4">
                      <div className="relative w-full aspect-square overflow-hidden rounded-full mx-auto mb-6 ring-4 ring-academy-gold/30 group-hover:ring-academy-gold/60 transition-all duration-500 shadow-xl">
                        <Image
                          src={trainer.image_url || "/placeholder.svg?height=300&width=300&text=مدرب+معتمد"}
                          alt={trainer.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                      </div>

                      {/* Enhanced Certified Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-academy-gold to-academy-gold-600 text-academy-blue px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1 space-x-reverse transform group-hover:scale-110 transition-transform duration-300 border border-academy-gold-600">
                        <Award size={12} />
                        <span>معتمد</span>
                      </div>
                    </div>

                    <div className="px-6 pb-6 text-center relative">
                      {/* Enhanced Decorative Element */}
                      <div className="w-20 h-1 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue mx-auto mb-4 rounded-full shadow-sm"></div>

                      <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300">
                        {trainer.name}
                      </h3>

                      {/* Enhanced Specialization Badge */}
                      <div className="bg-gradient-to-r from-academy-gray/50 to-academy-gray/30 px-4 py-2 rounded-full mb-4 border-2 border-academy-gold/20 group-hover:border-academy-gold/60 transition-colors duration-300 shadow-sm">
                        <span className="text-academy-blue font-bold text-sm">{trainer.specialization}</span>
                      </div>

                      {/* Enhanced Rating Stars */}
                      <div className="flex justify-center space-x-1 space-x-reverse mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="text-academy-gold fill-current drop-shadow-md group-hover:scale-110 transition-transform duration-200"
                            style={{ transitionDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Decorative Corner Elements */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-academy-gold rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-academy-gold rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Additional Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-academy-gold/5 via-transparent to-academy-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 lg:py-20">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-academy-gold/30">
                <Award className="text-academy-gold" size={48} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-academy-blue mb-4">لا توجد بيانات</h3>
              <p className="text-academy-dark-gray text-lg">لم يتم إضافة المدربين المعتمدين بعد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Certification Requirements Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-academy-gray-light via-academy-gray to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-block p-3 bg-academy-blue/10 rounded-full mb-6">
              <CheckCircle className="text-academy-blue" size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-academy-blue mb-6">
              شروط الحصول على الاعتماد
            </h2>
            <div className="max-w-5xl mx-auto">
              <p className="text-xl lg:text-2xl text-academy-dark-gray mb-6">
                <strong className="text-academy-blue">هل ترغب أن تكون ضمن قائمة مدربي أكاديمية المعرفة الدولية؟</strong>
              </p>
              <p className="text-lg lg:text-xl text-academy-dark-gray leading-relaxed">
                تتيح أكاديمية المعرفة الدولية الفرصة للمدربين المتميزين للانضمام إلى قائمة مدربيها المعتمدين، والاستفادة
                من منصتها للتسويق للمدربين وبيان خبراتهم.
              </p>
            </div>
          </div>

          {/* Enhanced Requirements Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mb-12">
            {requirements.map((requirement, index) => {
              const Icon = requirement.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-xl bg-white overflow-hidden rounded-3xl border-2 border-academy-blue/20 hover:border-academy-blue/60"
                >
                  <CardContent className="p-8 lg:p-10">
                    {/* Enhanced Icon */}
                    <div className="text-center mb-6">
                      <div
                        className={`w-16 h-16 lg:w-20 lg:h-20 ${requirement.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="text-white" size={32} />
                      </div>
                      <div className="w-12 h-1 bg-gradient-to-r from-academy-gold to-academy-blue mx-auto rounded-full shadow-sm"></div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="text-center">
                      <h3 className="text-xl lg:text-2xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-300">
                        {requirement.title}
                      </h3>
                      <p className="text-academy-dark-gray leading-relaxed text-sm lg:text-base">
                        {requirement.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Enhanced Benefits Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-2 border-academy-gold/20">
            <div className="text-center mb-8 lg:mb-12">
              <div className="inline-block p-3 bg-academy-gold/10 rounded-full mb-6">
                <Star className="text-academy-gold" size={32} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-academy-blue mb-4">
                مزايا الانضمام لقائمة المدربين المعتمدين
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <CheckCircle className="text-academy-blue" size={16} />
                  </div>
                  <p className="text-academy-dark-gray text-lg leading-relaxed">
                    الحصول على شهادة مدرب معتمد من الأكاديمية
                  </p>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <CheckCircle className="text-academy-blue" size={16} />
                  </div>
                  <p className="text-academy-dark-gray text-lg leading-relaxed">
                    إدراج صورة المدرب وسيرته الذاتية ضمن قائمة مدربي الأكاديمية في الموقع الرسمي
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <CheckCircle className="text-academy-blue" size={16} />
                  </div>
                  <p className="text-academy-dark-gray text-lg leading-relaxed">
                    الحصول على شهادات لدوراته التدريبية برسوم رمزية
                  </p>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <CheckCircle className="text-academy-blue" size={16} />
                  </div>
                  <p className="text-academy-dark-gray text-lg leading-relaxed">
                    الاستفادة من منصة الأكاديمية للتسويق والترويج
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-20 lg:py-32 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-academy-blue/90 to-academy-blue/70"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto text-white">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-600 rounded-full flex items-center justify-center">
                <Award className="text-academy-blue" size={32} />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">انضم إلى فريق المدربين المعتمدين</h2>
            <p className="text-xl lg:text-2xl mb-8 text-academy-gold leading-relaxed max-w-3xl mx-auto">
              كن جزءاً من نخبة المدربين المعتمدين في أكاديمية المعرفة الدولية وشارك خبراتك مع آلاف المتدربين
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <Button
                onClick={() => {
                  const form = document.getElementById("accreditation-form")
                  if (form) {
                    form.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="bg-gradient-to-r from-academy-gold to-academy-gold-600 hover:from-academy-gold-600 hover:to-academy-gold-700 text-academy-blue font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                تقدم للاعتماد
              </Button>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  تعرف على الأكاديمية
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-academy-gold/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-academy-gold/10 rounded-full blur-xl"></div>
      </section>

      {/* Accreditation Application Form Section */}
      <AccreditationApplicationForm />
    </div>
  )
}
