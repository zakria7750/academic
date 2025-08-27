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
  Star,
  Globe,
  Target,
  Brain,
  GraduationCap,
  Crown,
  Sparkles,
  Lightbulb,
  Zap,
  ChevronRight,
  Infinity,
  Shield,
  Gem,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EducationSystemPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Ultra Premium Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,31,63,0.05),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]"></div>
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-academy-gold/10 via-academy-gold/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-academy-blue/8 via-academy-blue/4 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[900px] lg:h-[900px] bg-gradient-to-br from-academy-gold/6 to-academy-blue/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-academy-gold/40 rotate-45 animate-pulse delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-academy-blue/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-academy-gold/50 rotate-45 animate-pulse delay-1100"></div>
      </div>

      {/* Ultra Premium Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
        {/* Multi-layered Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/80 to-academy-blue/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)]"></div>
        
        {/* Ultra Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-32 h-32 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-academy-gold/25 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-academy-gold/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-academy-gold/15 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-academy-gold/25 rounded-full blur-xl animate-pulse delay-1500"></div>
          
          {/* Premium Geometric Patterns */}
          <div className="absolute top-32 left-1/3 w-6 h-6 border-2 border-academy-gold/30 rotate-45 animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-4 h-4 bg-academy-gold/20 rounded-full animate-pulse delay-2500"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-8xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Ultra Premium Icon Section
            <div className="relative inline-block mb-8 sm:mb-6 sm:mb-8 lg:mb-12 lg:mb-8 sm:mb-6 sm:mb-8 lg:mb-12 lg:mb-16">
              <div className="p-4 sm:p-6 lg:p-8 bg-white/15 backdrop-blur-2xl rounded-[1.5rem] sm:rounded-[2rem] border border-white/25 shadow-[0_16px_32px_rgba(0,0,0,0.25)] sm:shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                    <BookOpen className="text-academy-blue drop-shadow-lg" size={40} />
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
              <div className="absolute -top-8 right-1/4 w-3 h-3 bg-academy-gold-light rounded-full animate-pulse delay-1600"></div>
            </div>*/} 

            {/* Premium Title Section */}
            <div className="relative z-10 text-center mx-auto mb-6 sm:mb-8 lg:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight">
                <span className="inline-block px-6 py-3 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                  نظام التعليم
                </span>
              </h1>
              
              {/* Enhanced Decorative Separator */}
              <div className="flex items-center justify-center gap-8 mb-6 sm:mb-8 lg:mb-12">
                <div className="w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                <div className="relative">
                  <Sparkles className="text-academy-gold animate-pulse" size={24} />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles className="text-academy-gold opacity-30" size={24} />
                  </div>
                </div>
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                <div className="w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div className="relative z-10 text-center mx-auto mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium max-w-4xl mx-auto leading-relaxed">
                  <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                    نظام تعليمي متطور يجمع بين الأصالة والحداثة
                  </span>
                </h2>
              </div>
              <div className="relative z-10 text-center mx-auto">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed font-light">
                  <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                    نقدم لك تجربة تعليمية متميزة تؤهلك لمستقبل مشرق مع أحدث التقنيات التعليمية والمناهج المعاصرة
                  </span>
                </p>
              </div>
            </div>

            {/* Ultra Premium Features Preview 
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 mt-12 sm:mt-16 lg:mt-24 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-500 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                  <Brain size={32} className="text-academy-blue" />
                </div>
                <h3 className="text-academy-gold font-bold text-xl mb-3">تعليم ذكي</h3>
                <p className="text-academy-gold-200 text-lg leading-relaxed">منهجية متطورة</p>
              </div>

              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-500 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                  <Globe size={32} className="text-academy-blue" />
                </div>
                <h3 className="text-academy-gold font-bold text-xl mb-3">مناهج حديثة</h3>
                <p className="text-academy-gold-200 text-lg leading-relaxed">محتوى معاصر</p>
              </div>

              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-500 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                  <Target size={32} className="text-academy-blue" />
                </div>
                <h3 className="text-academy-gold font-bold text-xl mb-3">تقنيات متقدمة</h3>
                <p className="text-academy-gold-200 text-lg leading-relaxed">أدوات ذكية</p>
              </div>
            </div>

            Ultra Premium Stats */}
            <div className="relative z-10 text-center mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20 max-w-5xl mx-auto">
                <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                      100%
                    </span>
                  </div>
                  <div className="text-academy-darker-gray font-semibold text-xs sm:text-sm lg:text-lg">
                    <span className="inline-block px-2 py-1 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                      نجاح الطلاب
                    </span>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                      24/7
                    </span>
                  </div>
                  <div className="text-academy-darker-gray font-semibold text-xs sm:text-sm lg:text-lg">
                    <span className="inline-block px-2 py-1 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                      دعم متاح
                    </span>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                      ∞
                    </span>
                  </div>
                  <div className="text-academy-darker-gray font-semibold text-xs sm:text-sm lg:text-lg">
                    <span className="inline-block px-2 py-1 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                      إمكانيات لا محدودة
                    </span>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20">
                      <Shield size={32} className="mx-auto text-academy-gold drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]" />
                    </span>
                  </div>
                  <div className="text-academy-darker-gray font-semibold text-xs sm:text-sm lg:text-lg">
                    <span className="inline-block px-2 py-1 rounded-full bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 bg-gradient-to-r from-white via-academy-gold to-academy-gold-light bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                      تعليم مضمون
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
    src="/Education-system-1440.webp"
    alt="نظام التعليم"
    fill
    sizes="(max-width: 600px) 480px,
           (max-width: 1024px) 960px,
           1440px"
    className="object-contian"
    priority
  />
        </div>
      </section>

      {/* Ultra Premium Overview Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
        {/* Enhanced Background with Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-blue-50/60"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-academy-gold/12 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-academy-blue/8 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,31,63,0.03),transparent_50%)] bg-[radial-gradient(circle_at_75%_75%,rgba(255,215,0,0.05),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Enhanced Content Section */}
            <div className="order-2 lg:order-1">
              {/* Ultra Premium Section Header */}
              <div className="mb-8 sm:mb-6 sm:mb-8 lg:mb-12 lg:mb-16">
                <div className="relative inline-block mb-6 sm:mb-8 lg:mb-10">
                  <div className="p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-2xl flex items-center justify-center shadow-lg border border-academy-blue/10">
                        <Lightbulb className="text-academy-blue" size={40} />
                      </div>
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                        <Star size={16} className="text-academy-blue" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -left-4 w-5 h-5 bg-academy-gold rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-3 -right-5 w-4 h-4 bg-academy-blue rounded-full animate-pulse delay-500"></div>
                </div>

                <div className="mb-6 sm:mb-8 lg:mb-12">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-academy-blue mb-8 tracking-tight leading-tight">
                    نظرة عامة
                  </h2>
                  <div className="flex items-center gap-6 mb-6 sm:mb-8 lg:mb-10">
                    <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                    <Sparkles className="text-academy-gold animate-pulse" size={24} />
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                    <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-2xl md:text-3xl text-academy-dark-gray max-w-4xl leading-relaxed font-semibold mb-6">
                    نقدم نظاماً تعليمياً شاملاً ومتكاملاً يجمع بين أفضل الممارسات التعليمية التقليدية والحديثة
                  </p>
                  <p className="text-xl text-academy-darker-gray max-w-3xl leading-relaxed">
                    مع التركيز على التطبيق العملي والتفكير النقدي لإعداد خريجين مؤهلين لسوق العمل المعاصر
                  </p>
                </div>
              </div>

              {/* Enhanced Mini Features Grid */}
              <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
                <div className="bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-academy-blue/15 text-center group hover:scale-105 hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 bg-academy-gold/90 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Brain size={24} className="text-academy-blue" />
                  </div>
                  <h3 className="text-academy-blue font-bold text-lg mb-2">تعليم ذكي</h3>
                  <p className="text-academy-darker-gray text-sm leading-relaxed">منهجية متطورة</p>
                </div>

                <div className="bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-academy-blue/15 text-center group hover:scale-105 hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 bg-academy-gold/90 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Globe size={24} className="text-academy-blue" />
                  </div>
                  <h3 className="text-academy-blue font-bold text-lg mb-2">مناهج حديثة</h3>
                  <p className="text-academy-darker-gray text-sm leading-relaxed">محتوى معاصر</p>
                </div>

                <div className="bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-academy-blue/15 text-center group hover:scale-105 hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 bg-academy-gold/90 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Target size={24} className="text-academy-blue" />
                  </div>
                  <h3 className="text-academy-blue font-bold text-lg mb-2">تقنيات متقدمة</h3>
                  <p className="text-academy-darker-gray text-sm leading-relaxed">أدوات ذكية</p>
                </div>
              </div>

              {/* Enhanced Description */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50">
                <p className="text-xl leading-relaxed text-academy-dark-gray font-medium mb-6">
                  نظام تعليمي متطور يجمع بين الأصالة والحداثة، مصمم لتلبية احتياجات العصر ومتطلبات سوق العمل.
                </p>
                <p className="text-lg leading-relaxed text-academy-darker-gray">
                  نحن نؤمن بأن التعليم الجيد هو المفتاح للنجاح، لذلك نقدم نظاماً تعليمياً شاملاً يدمج بين التقنيات الحديثة والمعرفة العميقة.
                </p>
              </div>

              {/* Premium Features Badges 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-6 rounded-2xl border border-academy-blue/20 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 bg-academy-gold rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain size={20} className="text-academy-blue" />
                  </div>
                  <h3 className="text-academy-blue font-bold text-sm mb-1">تعليم متطور</h3>
                  <p className="text-academy-darker-gray text-xs">منهجيات حديثة</p>
                </div>

                <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-6 rounded-2xl border border-academy-blue/20 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 bg-academy-gold rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe size={20} className="text-academy-blue" />
                  </div>
                  <h3 className="text-academy-blue font-bold text-sm mb-1">مناهج حديثة</h3>
                  <p className="text-academy-darker-gray text-xs">محتوى معاصر</p>
                </div>

                <div className="bg-gradient-to-r from-academy-blue/10 to-academy-gold/10 backdrop-blur-sm p-6 rounded-2xl border border-academy-blue/20 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 bg-academy-gold rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target size={20} className="text-academy-blue" />
                  </div>
                  <h3 className="text-academy-blue font-bold text-sm mb-1">تقنيات متقدمة</h3>
                  <p className="text-academy-darker-gray text-xs">أدوات ذكية</p>
                </div>
              </div>

              Premium Stats
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 shadow-2xl text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-3xl font-bold text-academy-blue mb-2">100%</div>
                  <div className="text-academy-darker-gray font-medium">نجاح الطلاب</div>
                </div>

                <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 shadow-2xl text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-3xl font-bold text-academy-blue mb-2">24/7</div>
                  <div className="text-academy-darker-gray font-medium">دعم متاح</div>
                </div>
              </div>

             Enhanced Image Section */}
            </div>

            {/* Enhanced Image Section */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <Image
                  src="/modern-education-1440.webp"
                  alt="نظام التعليم المتطور"
                  width={700}
                  height={500}
                  className="object-cover w-full h-[500px] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Premium Overlay Content */}
                <div className="absolute inset-0 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">نظام تعليمي متكامل</h3>
                    <p className="text-lg opacity-90">تجربة تعليمية فريدة ومتميزة</p>
                  </div>
                </div>
              </div>
              
              {/* Premium Floating Badge */}
              <div className="absolute -bottom-8 -right-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-2xl border border-academy-gold/30">
                    <Sparkles className="text-academy-blue" size={32} />
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

      {/* Ultra Premium Teaching Methods */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/70"></div>
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-20 right-20 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-academy-gold/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-academy-blue/12 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-academy-gold/8 to-academy-blue/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Enhanced Geometric Patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,31,63,0.04),transparent_50%)] bg-[radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.06),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <div className="p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-3xl flex items-center justify-center shadow-xl">
                    <Users className="text-academy-gold" size={40} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Star size={16} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={12} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-5 h-5 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -right-5 w-4 h-4 bg-academy-blue rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 -left-8 w-3 h-3 bg-academy-gold-light rounded-full animate-pulse delay-1000"></div>
            </div>

            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-academy-blue mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-academy-blue via-academy-blue-dark to-academy-blue bg-clip-text text-transparent">
                  أساليب التعليم
                </span>
              </h2>
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={24} />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-medium mb-6">
                نوفر طرق تعليم متنوعة ومتطورة لتناسب جميع احتياجات الطلاب
              </p>
              <p className="text-base sm:text-lg md:text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed">
                نقدم تجربة تعليمية شاملة ومتكاملة تجمع بين التعليم التقليدي والحديث مع أحدث التقنيات

              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Premium In-Person Learning */}
            <Card className="group bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-8 hover:scale-[1.03] relative border border-slate-200/50">
              {/* Premium Status Indicator */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue"></div>
              
              {/* Premium Card Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white/60 to-blue-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative h-72 overflow-hidden">
  <Image
                  src="/classroom-learning-1440.webp"
                  alt="التعليم الحضوري"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-6 py-3 rounded-3xl text-sm font-bold shadow-2xl backdrop-blur-sm border border-white/20">
                    حضوري
                  </div>
                </div>

                {/* Enhanced Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-white text-center w-full">
                    <p className="text-2xl font-bold mb-3">تعلم تفاعلي</p>
                    <p className="text-lg opacity-90">في بيئة تعليمية متطورة</p>

                  </div>
                </div>
              </div>

              <CardContent className="p-10 relative z-10">
                {/* Premium Header */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                    <Users className="text-academy-blue group-hover:text-academy-gold transition-colors duration-300" size={40} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-300 mb-6">
                    التعليم الحضوري
                  </h3>
                  <p className="text-base sm:text-lg text-academy-dark-gray leading-relaxed font-medium">
                    محاضرات وجلسات تفاعلية في بيئة تعليمية متطورة مع أحدث التقنيات
                  </p>
                </div>

                {/* Premium Features */}
                <div className="space-y-5">
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-academy-gold/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={20} />
                      </div>
                      <span className="text-academy-dark-gray font-medium text-base sm:text-lg">قاعات مجهزة بأحدث التقنيات</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-academy-gold/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={20} />
                      </div>
                      <span className="text-academy-dark-gray font-medium text-base sm:text-lg">ورش عمل تطبيقية</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-academy-gold/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={20} />
                      </div>
                      <span className="text-academy-dark-gray font-medium text-base sm:text-lg">نقاشات جماعية</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-academy-gold/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={20} />
                      </div>
                      <span className="text-academy-dark-gray font-medium text-base sm:text-lg">مشاريع تعاونية</span>

                    </div>
                  </div>
                </div>

                {/* Premium Action Button */}
                <div className="mt-8">
                  <Link href="/programs">
                    <Button className="w-full bg-gradient-to-r from-academy-blue to-academy-blue-dark hover:from-academy-blue-dark hover:to-slate-900 text-white font-bold py-4 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0 text-lg">
                      تعرف على المزيد

                    </Button>
                  </Link>
                </div>
              </CardContent>

              {/* Premium Floating Elements */}
              <div className="absolute top-6 left-6 w-3 h-3 bg-academy-gold rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
              <div className="absolute bottom-8 right-8 w-4 h-4 bg-academy-blue rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-300 transition-opacity duration-300"></div>
            </Card>

            {/* Premium Online Learning */}
            <Card className="group bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-8 hover:scale-[1.03] relative border border-slate-200/50">
              {/* Premium Status Indicator */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue"></div>
              
              {/* Premium Card Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white/60 to-blue-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>


              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/online-learning-1440.webp"
                  alt="التعليم الإلكتروني"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-6 py-3 rounded-3xl text-sm font-bold shadow-2xl backdrop-blur-sm border border-white/20">
                    إلكتروني
                  </div>
                </div>

                {/* Enhanced Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-white text-center w-full">
                    <p className="text-2xl font-bold mb-3">تعلم مرن</p>
                    <p className="text-lg opacity-90">من أي مكان وفي أي وقت</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-10 relative z-10">
                {/* Premium Header */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                    <Monitor className="text-academy-blue group-hover:text-academy-gold transition-colors duration-300" size={40} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-300 mb-6">
                    التعليم الإلكتروني
                  </h3>
                  <p className="text-base sm:text-lg text-academy-dark-gray leading-relaxed font-medium">
                    منصة تعليمية متقدمة تتيح التعلم من أي مكان وفي أي وقت مع أدوات تفاعلية
                  </p>
                </div>

                {/* Premium Features */}
                <div className="space-y-5">
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-academy-gold/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={20} />
                      </div>
                      <span className="text-academy-dark-gray font-medium text-base sm:text-lg">محاضرات مباشرة</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-academy-gold/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={20} />
                      </div>
                      <span className="text-academy-dark-gray font-medium text-base sm:text-lg">منتديات نقاش تفاعلية</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-academy-gold/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={20} />
                      </div>
                      <span className="text-academy-dark-gray font-medium text-base sm:text-lg">اختبارات إلكترونية</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-academy-gold/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={20} />
                      </div>
                      <span className="text-academy-dark-gray font-medium text-base sm:text-lg">متابعة الأداء الفوري</span>
                    </div>
                  </div>
                </div>

                {/* Premium Action Button */}
                <div className="mt-8">
                  <Link href="/programs">
                    <Button className="w-full bg-gradient-to-r from-academy-blue to-academy-blue-dark hover:from-academy-blue-dark hover:to-slate-900 text-white font-bold py-4 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0 text-lg">
                      تعرف على المزيد
                    </Button>
                  </Link>
                </div>
              </CardContent>

              {/* Premium Floating Elements */}
              <div className="absolute top-6 left-6 w-3 h-3 bg-academy-gold rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
              <div className="absolute bottom-8 right-8 w-4 h-4 bg-academy-blue rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-300 transition-opacity duration-300"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Assessment Methods */}
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
              <div className="p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-3xl flex items-center justify-center shadow-xl">
                    <TrendingUp className="text-academy-gold" size={40} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Star size={16} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={12} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-5 h-5 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -right-5 w-4 h-4 bg-academy-blue rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 -left-8 w-3 h-3 bg-academy-gold-light rounded-full animate-pulse delay-1000"></div>
            </div>

            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-academy-blue mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-academy-blue via-academy-blue-dark to-academy-blue bg-clip-text text-transparent">
                  أساليب التقييم
                </span>
              </h2>
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={24} />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-medium mb-6">
                نظام تقييم شامل ومتوازن يضمن قياس الأداء بدقة واحترافية
              </p>
              <p className="text-base sm:text-lg md:text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed">
                نتبع منهجية تقييم متعددة الأبعاد لضمان تقييم شامل ومحايد لقدرات الطلاب
              </p>
            </div>
          </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* التعليم المستمر */}
            <Card className="text-center hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold overflow-hidden group bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/continuous-assessment-1440.webp"
                  alt="التقييم المستمر"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    مستمر
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto mb-6 p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <TrendingUp className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-academy-blue group-hover:text-academy-gold transition-colors font-bold">التعليم المستمر</CardTitle>
                <CardDescription className="text-academy-dark-gray text-base sm:text-lg font-medium">
                  تقييم مستمر طوال فترة الدراسة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 px-8 pb-8">
                <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between items-center">
                    <span className="text-academy-dark-gray font-medium text-base sm:text-lg">واجبات مدرسية</span>
                    <Badge className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-white px-3 py-1 rounded-xl font-bold">15%</Badge>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between items-center">
                    <span className="text-academy-dark-gray font-medium text-base sm:text-lg">مشاركة في النقاشات</span>
                    <Badge className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-white px-3 py-1 rounded-xl font-bold">20%</Badge>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between items-center">
                    <span className="text-academy-dark-gray font-medium text-base sm:text-lg">مشاريع عملية</span>
                    <Badge className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-white px-3 py-1 rounded-xl font-bold">25%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* الاختبارات */}
            <Card className="text-center hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold overflow-hidden group bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/examinations-1440.webp"
                  alt="الاختبارات"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    نهائي
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto mb-6 p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <BookOpen className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-academy-blue group-hover:text-academy-gold transition-colors font-bold">الاختبارات</CardTitle>
                <CardDescription className="text-academy-dark-gray text-base sm:text-lg font-medium">
                  تقييم شامل في نهاية البرنامج
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 px-8 pb-8">
                <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="text-academy-dark-gray mb-4 text-base sm:text-lg font-medium">اختبار نهاية البرنامج</div>
                    <Badge className="bg-gradient-to-r from-academy-blue to-academy-blue-dark text-white px-6 py-2 rounded-xl font-bold text-lg">اختبار شامل</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* مشروع التخرج */}
            <Card className="text-center hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold overflow-hidden group bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/graduation-project-1440.webp"
                  alt="مشروع التخرج"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    مشروع
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto mb-6 p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <Award className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-academy-blue group-hover:text-academy-gold transition-colors font-bold">مشروع التخرج</CardTitle>
                <CardDescription className="text-academy-dark-gray text-base sm:text-lg font-medium">
                  مشروع تطبيقي شامل للتخرج
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-8 pb-8">
                <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-academy-gold/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-academy-gold" />
                    </div>
                                          <span className="text-academy-dark-gray font-medium text-base sm:text-lg">بحث علمي متقدم</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-academy-gold/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-academy-gold" />
                    </div>
                                          <span className="text-academy-dark-gray font-medium text-base sm:text-lg">مشروع تطبيقي</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-academy-gold/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-academy-gold" />
                    </div>
                                          <span className="text-academy-dark-gray font-medium text-base sm:text-lg">عرض ونقاش</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-academy-gold/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-academy-gold" />
                    </div>
                                          <span className="text-academy-dark-gray font-medium text-base sm:text-lg">تقييم لجنة متخصصة</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* مميزات المنصة التعليمية */}
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
              <div className="p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-3xl flex items-center justify-center shadow-xl">
                    <Sparkles className="text-academy-gold" size={40} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Star size={16} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={12} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-5 h-5 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -right-5 w-4 h-4 bg-academy-blue rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 -left-8 w-3 h-3 bg-academy-gold-light rounded-full animate-pulse delay-1000"></div>
            </div>

            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-academy-blue mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-academy-blue via-academy-blue-dark to-academy-blue bg-clip-text text-transparent">
                  مميزات المنصة التعليمية
                </span>
              </h2>
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={24} />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-medium mb-6">
                تقنيات متقدمة لتجربة تعليمية متميزة ومتطورة
              </p>
              <p className="text-base sm:text-lg md:text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed">
                نقدم منصة تعليمية شاملة تجمع بين أحدث التقنيات وسهولة الاستخدام
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* محاضرات فيديو */}
            <Card className="text-center hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold group overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/video-lectures-1440.webp"
                  alt="محاضرات فيديو"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    فيديو
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto mb-6 p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <Play className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-academy-blue group-hover:text-academy-gold transition-colors font-bold">محاضرات فيديو</CardTitle>
                <CardDescription className="text-academy-dark-gray text-base sm:text-lg font-medium">
                  محاضرات عالية الجودة متاحة في أي وقت
                </CardDescription>
              </CardHeader>
            </Card>

            {/* منتديات نقاش */}
            <Card className="text-center hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold group overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/discussion-forums-1440.webp"
                  alt="منتديات نقاش"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    نقاش
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto mb-6 p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <MessageSquare className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-academy-blue group-hover:text-academy-gold transition-colors font-bold">منتديات نقاش</CardTitle>
                <CardDescription className="text-academy-dark-gray text-base sm:text-lg font-medium">تفاعل مباشر مع الأساتذة والطلاب</CardDescription>
              </CardHeader>
            </Card>

            {/* تتبع التقدم */}
            <Card className="text-center hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold group overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/progress-tracking.png"
                  alt="تتبع التقدم"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    تتبع
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto mb-6 p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <TrendingUp className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-academy-blue group-hover:text-academy-gold transition-colors font-bold">تتبع التقدم</CardTitle>
                <CardDescription className="text-academy-dark-gray text-base sm:text-lg font-medium">متابعة مستمرة لأدائك الأكاديمي</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* الدعم الأكاديمي */}
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
              <div className="p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-3xl flex items-center justify-center shadow-xl">
                    <Headphones className="text-academy-gold" size={40} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Star size={16} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-academy-gold-light rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={12} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-5 h-5 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -right-5 w-4 h-4 bg-academy-blue rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 -left-8 w-3 h-3 bg-academy-gold-light rounded-full animate-pulse delay-1000"></div>
            </div>

            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-academy-blue mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-academy-blue via-academy-blue-dark to-academy-blue bg-clip-text text-transparent">
                  الدعم الأكاديمي
                </span>
              </h2>
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles className="text-academy-gold animate-pulse" size={24} />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-medium mb-6">
                دعم شامل ومتكامل لضمان نجاحك الأكاديمي
              </p>
              <p className="text-base sm:text-lg md:text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed">
                نقدم لك جميع أنواع الدعم التي تحتاجها لتحقيق أهدافك التعليمية
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="text-center space-y-4 hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold group overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/academic-advisor-1440.webp"
                  alt="مرشد أكاديمي"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    إرشاد
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <UserCheck className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors">مرشد أكاديمي</h3>
                <p className="text-academy-dark-gray text-base sm:text-lg font-medium">توجيه شخصي طوال فترة الدراسة</p>
              </CardHeader>
            </Card>

            <Card className="text-center space-y-4 hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold group overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/technical-support-1440.webp"
                  alt="دعم تقني"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    تقني
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <Headphones className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors">دعم تقني</h3>
                <p className="text-academy-dark-gray text-base sm:text-lg font-medium">مساعدة فنية على مدار 24 ساعة</p>
              </CardHeader>
            </Card>

            <Card className="text-center space-y-4 hover:shadow-2xl transition-all duration-500 border-2 hover:border-academy-gold group overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl hover:-translate-y-4 hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/study-groups-1440.webp"
                  alt="مجموعات دراسية"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/30 via-transparent to-transparent group-hover:from-academy-blue/20 transition-colors"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    مجموعات
                  </div>
                </div>
              </div>
              <CardHeader className="pb-6">
                <div className="mx-auto p-5 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                  <Users2 className="w-12 h-12 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors">مجموعات دراسية</h3>
                <p className="text-academy-dark-gray text-base sm:text-lg font-medium">تعلم تعاوني مع زملائك</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Call to Action Section */}
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
            <div className="relative inline-block mb-6 sm:mb-8 lg:mb-12">
              <div className="p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-xl">
                  <GraduationCap className="text-academy-blue" size={40} />
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-6 w-4 h-4 bg-academy-gold-light rounded-full animate-pulse delay-700"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                ابدأ رحلتك التعليمية اليوم
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-academy-gold-light font-medium max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 lg:mb-12">
              اكتشف نظام تعليمي متطور يؤهلك لمستقبل مهني متميز مع أفضل البرامج التعليمية
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="/programs">
                <Button className="group bg-gradient-to-r from-academy-gold to-academy-gold-dark hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue font-bold px-12 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0 min-w-[250px]">
                  <span className="mr-3">تصفح البرامج التعليمية</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                </Button>
              </Link>
              
              <Link href="/admission">
                <Button
                  variant="outline"
                  className="group border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-12 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:backdrop-blur-md min-w-[250px]"
                >
                  <span className="mr-3">تقديم للالتحاق</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Floating Elements */}
      <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
            <span className="text-academy-blue font-medium text-sm">نظام التعليم نشط</span>
          </div>
        </div>
      </div>
    </div>
  )
}
