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

export default function EducationSystemPage() {
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
            {/* Ultra Premium Icon Section */}
            <div className="relative inline-block mb-16">
              <div className="p-8 bg-white/15 backdrop-blur-2xl rounded-[2rem] border border-white/25 shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                    <BookOpen className="text-academy-blue drop-shadow-lg" size={60} />
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
              
              {/* Enhanced Floating Elements */}
              <div className="absolute -top-6 -left-6 w-8 h-8 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-4 -right-8 w-6 h-6 bg-academy-gold-light rounded-full animate-pulse delay-700 shadow-md"></div>
              <div className="absolute top-1/2 -left-12 w-4 h-4 bg-academy-gold rounded-full animate-pulse delay-1200"></div>
              <div className="absolute -top-8 right-1/4 w-3 h-3 bg-academy-gold-light rounded-full animate-pulse delay-1600"></div>
            </div>

            {/* Ultra Premium Title Section */}
            <div className="mb-16">
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold mb-10 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light via-white to-academy-gold-light bg-clip-text text-transparent drop-shadow-2xl">
                  نظام التعليم
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
              
              <p className="text-2xl md:text-3xl lg:text-4xl text-academy-gold-light font-semibold max-w-6xl mx-auto leading-relaxed mb-8 drop-shadow-lg">
                نظام تعليمي متطور يجمع بين الأصالة والحداثة
              </p>
              <p className="text-xl md:text-2xl text-academy-gold-200 max-w-5xl mx-auto leading-relaxed font-light">
                نقدم لك تجربة تعليمية متميزة تؤهلك لمستقبل مشرق مع أحدث التقنيات التعليمية والمناهج المعاصرة
              </p>
            </div>

            {/* Ultra Premium Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-24 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-500 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                  <Brain size={32} className="text-academy-blue" />
                </div>
                <h3 className="text-academy-gold font-bold text-xl mb-3">تعليم ذكي</h3>
                <p className="text-academy-gold-200 text-lg leading-relaxed">منهجية متطورة</p>
              </div>

              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-500 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                  <Globe size={32} className="text-academy-blue" />
                </div>
                <h3 className="text-academy-gold font-bold text-xl mb-3">مناهج حديثة</h3>
                <p className="text-academy-gold-200 text-lg leading-relaxed">محتوى معاصر</p>
              </div>

              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/25 text-center group hover:scale-105 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/15 transition-all duration-500 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                  <Target size={32} className="text-academy-blue" />
                </div>
                <h3 className="text-academy-gold font-bold text-xl mb-3">تقنيات متقدمة</h3>
                <p className="text-academy-gold-200 text-lg leading-relaxed">أدوات ذكية</p>
              </div>
            </div>

            {/* Ultra Premium Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto">
              <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                <div className="text-4xl font-bold text-academy-blue mb-3 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-academy-darker-gray font-semibold text-lg">نجاح الطلاب</div>
              </div>

              <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                <div className="text-4xl font-bold text-academy-blue mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-academy-darker-gray font-semibold text-lg">دعم متاح</div>
              </div>

              <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                <div className="text-4xl font-bold text-academy-blue mb-3 group-hover:scale-110 transition-transform duration-300">∞</div>
                <div className="text-academy-darker-gray font-semibold text-lg">إمكانيات لا محدودة</div>
              </div>

              <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                <div className="text-4xl font-bold text-academy-blue mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Shield size={32} className="mx-auto" />
                </div>
                <div className="text-academy-darker-gray font-semibold text-lg">تعليم مضمون</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Premium Overview Section */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
        {/* Enhanced Background with Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-blue-50/60"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/12 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-academy-blue/8 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,31,63,0.03),transparent_50%)] bg-[radial-gradient(circle_at_75%_75%,rgba(255,215,0,0.05),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Enhanced Content Section */}
            <div className="order-2 lg:order-1">
              {/* Ultra Premium Section Header */}
              <div className="mb-16">
                <div className="relative inline-block mb-10">
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

                <div className="mb-12">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-academy-blue mb-8 tracking-tight leading-tight">
                    نظرة عامة
                  </h2>
                  <div className="flex items-center gap-6 mb-10">
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
              <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-12">
                <div className="bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 backdrop-blur-sm p-8 rounded-3xl border border-academy-blue/15 text-center group hover:scale-105 hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 bg-academy-gold/90 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Brain size={24} className="text-academy-blue" />
                  </div>
                  <h3 className="text-academy-blue font-bold text-lg mb-2">تعليم ذكي</h3>
                  <p className="text-academy-darker-gray text-sm leading-relaxed">منهجية متطورة</p>
                </div>

                <div className="bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 backdrop-blur-sm p-8 rounded-3xl border border-academy-blue/15 text-center group hover:scale-105 hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 bg-academy-gold/90 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Globe size={24} className="text-academy-blue" />
                  </div>
                  <h3 className="text-academy-blue font-bold text-lg mb-2">مناهج حديثة</h3>
                  <p className="text-academy-darker-gray text-sm leading-relaxed">محتوى معاصر</p>
                </div>

                <div className="bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 backdrop-blur-sm p-8 rounded-3xl border border-academy-blue/15 text-center group hover:scale-105 hover:shadow-xl transition-all duration-500">
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

              {/* Premium Features Badges */}
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

              {/* Premium Stats */}
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
            </div>

            {/* Enhanced Image Section */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <Image
                  src="/modern-education.png"
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
                    <Users className="text-academy-gold drop-shadow-lg" size={48} />
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
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-academy-blue mb-10 tracking-tight leading-tight">أساليب التعليم</h2>
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
              <p className="text-2xl md:text-3xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-semibold mb-8">
                نوفر طرق تعليم متنوعة ومبتكرة لتناسب جميع احتياجات الطلاب وأساليب التعلم المختلفة
              </p>
              <p className="text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed">
                نقدم تجربة تعليمية شاملة ومتكاملة تجمع بين التعليم التقليدي والحديث مع أحدث التقنيات التعليمية
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
            {/* Ultra Premium In-Person Learning */}
            <Card className="group bg-white/95 backdrop-blur-2xl border-0 shadow-[0_24px_48px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-8 hover:scale-[1.03] relative border border-slate-200/60">
              {/* Ultra Premium Status Indicator */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-academy-blue via-academy-gold via-academy-blue to-academy-gold"></div>
              
              {/* Ultra Premium Card Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white/40 to-blue-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-academy-gold/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-academy-blue/30 rounded-full animate-pulse delay-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/classroom-learning.png"
                  alt="التعليم الحضوري"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Ultra Premium Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold-dark text-academy-blue px-6 py-3 rounded-3xl text-base font-bold shadow-2xl backdrop-blur-lg border border-white/30 hover:scale-105 transition-transform duration-300">
                    <span className="flex items-center gap-2">
                      <Users size={16} />
                      حضوري
                    </span>
                  </div>
                </div>

                {/* Ultra Premium Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end p-8 transform translate-y-8 group-hover:translate-y-0">
                  <div className="text-white text-center w-full">
                    <p className="text-2xl font-bold mb-3 drop-shadow-lg">تعلم تفاعلي متطور</p>
                    <p className="text-lg opacity-90 leading-relaxed drop-shadow-md">في بيئة تعليمية حديثة مجهزة بأحدث التقنيات</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-10 relative z-10">
                {/* Ultra Premium Header */}
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/15 to-academy-gold/15 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-blue/20 backdrop-blur-sm">
                    <Users className="text-academy-blue group-hover:text-academy-gold transition-colors duration-500" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-500 mb-6">
                    التعليم الحضوري
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed font-semibold text-lg">
                    محاضرات وجلسات تفاعلية في بيئة تعليمية متطورة مع أحدث التقنيات والأدوات التعليمية
                  </p>
                </div>

                {/* Ultra Premium Features */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-lg p-6 rounded-3xl border border-slate-200/60 group-hover:shadow-lg hover:scale-[1.02] transition-all duration-500 hover:border-academy-gold/30">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/30 to-academy-gold/20 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="text-academy-gold" size={24} />
                      </div>
                      <span className="text-academy-dark-gray font-semibold text-lg">قاعات مجهزة بأحدث التقنيات</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-lg p-6 rounded-3xl border border-slate-200/60 group-hover:shadow-lg hover:scale-[1.02] transition-all duration-500 hover:border-academy-gold/30">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/30 to-academy-gold/20 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="text-academy-gold" size={24} />
                      </div>
                      <span className="text-academy-dark-gray font-semibold text-lg">ورش عمل تطبيقية متخصصة</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-lg p-6 rounded-3xl border border-slate-200/60 group-hover:shadow-lg hover:scale-[1.02] transition-all duration-500 hover:border-academy-gold/30">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/30 to-academy-gold/20 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="text-academy-gold" size={24} />
                      </div>
                      <span className="text-academy-dark-gray font-semibold text-lg">نقاشات جماعية تفاعلية</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-lg p-6 rounded-3xl border border-slate-200/60 group-hover:shadow-lg hover:scale-[1.02] transition-all duration-500 hover:border-academy-gold/30">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/30 to-academy-gold/20 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="text-academy-gold" size={24} />
                      </div>
                      <span className="text-academy-dark-gray font-semibold text-lg">مشاريع عملية متقدمة</span>
                    </div>
                  </div>
                </div>

                {/* Ultra Premium Action Button */}
                <div className="mt-10">
                  <Link href="/programs">
                    <Button className="w-full bg-gradient-to-r from-academy-blue via-academy-blue-light to-academy-blue-dark hover:from-academy-blue-dark hover:via-academy-blue hover:to-slate-900 text-white font-bold py-5 text-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border-0 group">
                      <span className="mr-3">تعرف على المزيد</span>
                      <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                    </Button>
                  </Link>
                </div>
              </CardContent>

              {/* Premium Floating Elements */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-academy-gold rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
              <div className="absolute bottom-6 right-6 w-3 h-3 bg-academy-blue rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-300 transition-opacity duration-300"></div>
            </Card>

            {/* Ultra Premium Online Learning */}
            <Card className="group bg-white/95 backdrop-blur-2xl border-0 shadow-[0_24px_48px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-8 hover:scale-[1.03] relative border border-slate-200/60">
              {/* Ultra Premium Status Indicator */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-academy-gold via-academy-blue via-academy-gold to-academy-blue"></div>
              
              {/* Ultra Premium Card Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white/40 to-slate-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-academy-blue/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-academy-gold/30 rounded-full animate-pulse delay-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/online-learning.png"
                  alt="التعليم الإلكتروني"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    إلكتروني
                  </div>
                </div>

                {/* Enhanced Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white text-center w-full">
                    <p className="text-xl font-bold mb-2">تعلم مرن</p>
                    <p className="text-base opacity-90">من أي مكان وفي أي وقت</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-8 relative z-10">
                {/* Premium Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-academy-blue/20">
                    <Monitor className="text-academy-blue group-hover:text-academy-gold transition-colors duration-300" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-300 mb-4">
                    التعليم الإلكتروني
                  </h3>
                  <p className="text-academy-dark-gray leading-relaxed font-medium">
                    منصة تعليمية متقدمة تتيح التعلم من أي مكان وفي أي وقت مع أدوات تفاعلية
                  </p>
                </div>

                {/* Premium Features */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-academy-gold/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={16} />
                      </div>
                      <span className="text-academy-dark-gray font-medium">محاضرات مباشرة</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-academy-gold/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={16} />
                      </div>
                      <span className="text-academy-dark-gray font-medium">منتديات نقاش تفاعلية</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-academy-gold/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={16} />
                      </div>
                      <span className="text-academy-dark-gray font-medium">اختبارات إلكترونية</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-academy-gold/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-academy-gold" size={16} />
                      </div>
                      <span className="text-academy-dark-gray font-medium">متابعة الأداء الفوري</span>
                    </div>
                  </div>
                </div>

                {/* Premium Action Button */}
                <div className="mt-6">
                  <Link href="/programs">
                    <Button className="w-full bg-gradient-to-r from-academy-blue to-academy-blue-dark hover:from-academy-blue-dark hover:to-slate-900 text-white font-bold py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
                      تعرف على المزيد
                    </Button>
                  </Link>
                </div>
              </CardContent>

              {/* Premium Floating Elements */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-academy-gold rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
              <div className="absolute bottom-6 right-6 w-3 h-3 bg-academy-blue rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-300 transition-opacity duration-300"></div>
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
              <div className="p-4 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl">
                  <TrendingUp className="text-academy-gold" size={32} />
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-academy-blue mb-6 tracking-tight">أساليب التقييم</h2>
            <p className="text-xl text-academy-dark-gray max-w-3xl mx-auto font-medium">
              نظام تقييم شامل ومتوازن يضمن قياس الأداء بدقة واحترافية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* التعليم المستمر */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/continuous-assessment.png"
                  alt="التقييم المستمر"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-academy-blue" />
                </div>
                <CardTitle className="text-xl text-academy-blue">التعليم المستمر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-academy-dark-gray">واجبات مدرسية</span>
                  <Badge className="bg-academy-gold text-white">15%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-academy-dark-gray">مشاركة في النقاشات</span>
                  <Badge className="bg-academy-gold text-white">20%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-academy-dark-gray">مشاريع عملية</span>
                  <Badge className="bg-academy-gold text-white">25%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* الاختبارات */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/examinations.png"
                  alt="الاختبارات"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-academy-blue" />
                </div>
                <CardTitle className="text-xl text-academy-blue">الاختبارات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="text-center">
                    <div className="text-academy-dark-gray mb-2">اختبار نهاية البرنامج</div>
                    <Badge className="bg-academy-blue text-white">اختبار شامل</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* مشروع التخرج */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold overflow-hidden group">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/graduation-project.png"
                  alt="مشروع التخرج"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <Award className="w-10 h-10 text-academy-blue" />
                </div>
                <CardTitle className="text-xl text-academy-blue">مشروع التخرج</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-academy-gold" />
                  <span className="text-sm text-academy-dark-gray">بحث علمي متقدم</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-academy-gold" />
                  <span className="text-sm text-academy-dark-gray">مشروع تطبيقي</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-academy-gold" />
                  <span className="text-sm text-academy-dark-gray">عرض ونقاش</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-academy-gold" />
                  <span className="text-sm text-academy-dark-gray">تقييم لجنة متخصصة</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* مميزات المنصة التعليمية */}
      <section className="py-20 px-4 bg-academy-gray/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-4">مميزات المنصة التعليمية</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto">تقنيات متقدمة لتجربة تعليمية متميزة</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* محاضرات فيديو */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/video-lectures.png"
                  alt="محاضرات فيديو"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-academy-gold/10 transition-colors">
                  <Play className="w-10 h-10 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl text-academy-blue">محاضرات فيديو</CardTitle>
                <CardDescription className="text-academy-dark-gray">
                  محاضرات عالية الجودة متاحة في أي وقت
                </CardDescription>
              </CardHeader>
            </Card>

            {/* منتديات نقاش */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/discussion-forums.png"
                  alt="منتديات نقاش"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-academy-gold/10 transition-colors">
                  <MessageSquare className="w-10 h-10 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl text-academy-blue">منتديات نقاش</CardTitle>
                <CardDescription className="text-academy-dark-gray">تفاعل مباشر مع الأساتذة والطلاب</CardDescription>
              </CardHeader>
            </Card>

            {/* تتبع التقدم */}
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/progress-tracking.png"
                  alt="تتبع التقدم"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-academy-gold/10 transition-colors">
                  <TrendingUp className="w-10 h-10 text-academy-blue group-hover:text-academy-gold transition-colors" />
                </div>
                <CardTitle className="text-xl text-academy-blue">تتبع التقدم</CardTitle>
                <CardDescription className="text-academy-dark-gray">متابعة مستمرة لأدائك الأكاديمي</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* الدعم الأكاديمي */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academy-blue mb-4">الدعم الأكاديمي</h2>
            <p className="text-lg text-academy-dark-gray max-w-2xl mx-auto">دعم شامل لضمان نجاحك الأكاديمي</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center space-y-4 hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/academic-advisor.png"
                  alt="مرشد أكاديمي"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <UserCheck className="w-10 h-10 text-academy-blue" />
                </div>
                <h3 className="text-xl font-semibold text-academy-blue">مرشد أكاديمي</h3>
                <p className="text-academy-dark-gray">توجيه شخصي طوال فترة الدراسة</p>
              </CardHeader>
            </Card>

            <Card className="text-center space-y-4 hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/technical-support.png"
                  alt="دعم تقني"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <Headphones className="w-10 h-10 text-academy-blue" />
                </div>
                <h3 className="text-xl font-semibold text-academy-blue">دعم تقني</h3>
                <p className="text-academy-dark-gray">مساعدة فنية على مدار 24 ساعة</p>
              </CardHeader>
            </Card>

            <Card className="text-center space-y-4 hover:shadow-xl transition-all duration-300 border-2 hover:border-academy-gold group overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/study-groups.png"
                  alt="مجموعات دراسية"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-academy-blue/20 group-hover:bg-academy-blue/10 transition-colors"></div>
              </div>
              <CardHeader>
                <div className="mx-auto p-4 bg-academy-blue/10 rounded-full w-20 h-20 flex items-center justify-center">
                  <Users2 className="w-10 h-10 text-academy-blue" />
                </div>
                <h3 className="text-xl font-semibold text-academy-blue">مجموعات دراسية</h3>
                <p className="text-academy-dark-gray">تعلم تعاوني مع زملائك</p>
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
            <div className="relative inline-block mb-12">
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
            <p className="text-xl md:text-2xl text-academy-gold-light font-medium max-w-4xl mx-auto leading-relaxed mb-12">
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
