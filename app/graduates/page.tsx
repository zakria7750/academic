import { getGraduates } from "@/app/actions/graduates-actions";
import { GraduateCard } from "@/components/graduate-card";
import { GraduateApplicationForm } from "@/components/graduate-application-form";
import {
  GraduationCap,
  Users,
  Trophy,
  Globe,
  Star,
  Crown,
  Sparkles,
  Award,
} from "lucide-react";
import Image from "next/image";

export const revalidate = 300; // ISR لمدة 5 دقائق

export default async function GraduatesPage() {
  const graduates = await getGraduates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-academy-blue/5 via-transparent to-academy-gold/5"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-academy-gold/5 to-academy-blue/5 rounded-full blur-3xl"></div>
      </div>

      {/* Ultra Luxurious Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center py-20 lg:py-24">
        {/* Enhanced Background Image with Perfect Display */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/home-background-1440.webp"
            alt="الخريجين"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Enhanced Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/85 via-academy-blue-dark/80 to-slate-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-transparent to-academy-blue/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-academy-blue-dark/40 via-transparent to-academy-blue/60"></div>

          {/* Advanced Glass Morphism Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-gradient-to-br from-academy-gold/15 via-academy-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-gradient-to-bl from-white/10 via-academy-blue/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-gradient-to-tr from-academy-gold/12 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
              <div className="absolute bottom-[25%] right-[25%] w-64 h-64 bg-gradient-to-tl from-white/8 to-transparent rounded-full blur-3xl animate-pulse delay-1500"></div>
              <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-academy-gold/8 via-transparent to-academy-blue/8 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Ultra Premium Content Container */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              {/* Luxury Icon Section with Glass Morphism */}
              <div className="relative inline-block mb-16">
                <div className="group relative">
                  {/* Main Glass Container */}
                  <div className="relative p-8 bg-white/15 backdrop-blur-2xl rounded-[2rem] border border-white/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.3)] transition-all duration-700 hover:bg-white/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-academy-gold/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon Container with Enhanced Glass Effect */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-academy-gold/30 via-academy-gold/20 to-academy-gold/10 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border border-academy-gold/30 group-hover:scale-110 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                        <GraduationCap
                          className="text-white drop-shadow-lg relative z-10"
                          size={48}
                        />
                      </div>

                      {/* Premium Badge */}
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl border-2 border-white/30 group-hover:scale-125 transition-all duration-500">
                        <Crown
                          size={18}
                          className="text-academy-blue drop-shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating Decorative Elements */}
                  <div className="absolute -top-6 -left-6 w-8 h-8 bg-academy-gold/80 rounded-full animate-pulse shadow-lg backdrop-blur-sm"></div>
                  <div className="absolute -bottom-4 -right-8 w-6 h-6 bg-white/80 rounded-full animate-pulse delay-700 shadow-md backdrop-blur-sm"></div>
                  <div className="absolute top-4 -left-8 w-4 h-4 bg-academy-gold-light/70 rounded-full animate-pulse delay-300 shadow-sm backdrop-blur-sm"></div>
                </div>
              </div>

              {/* Ultra Premium Title Section */}
              <div className="mb-20">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-10 tracking-tight leading-tight px-4">
                  <span className="bg-gradient-to-r from-white via-academy-gold-light via-white to-academy-gold-light bg-clip-text text-transparent drop-shadow-2xl">
                    نخبة الخريجين المتميزين
                  </span>
                </h1>

                {/* Enhanced Decorative Separator */}
                <div className="flex items-center justify-center gap-6 mb-12">
                  <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                  <div className="relative">
                    <Sparkles
                      className="text-academy-gold animate-pulse"
                      size={32}
                    />
                    <div className="absolute inset-0 animate-ping">
                      <Sparkles
                        className="text-academy-gold opacity-30"
                        size={32}
                      />
                    </div>
                  </div>
                  <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                  <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                </div>

                <div className="max-w-5xl mx-auto px-4">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-academy-gold-light font-medium leading-relaxed">
                    رحلة نجاح استثنائية لخريجينا الذين يقودون التميز والإبداع في
                    مختلف المجالات حول العالم
                  </p>
                </div>
              </div>

              {/* Ultra Premium Statistics Grid with Advanced Glass Morphism */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-24 px-4">
                {/* Graduates Count */}
                <div className="group">
                  <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 border border-white/30 hover:border-white/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.35)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 overflow-hidden">
                    {/* Glass Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-400/25 via-green-400/20 to-emerald-300/15 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-emerald-300/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                        <Users
                          className="text-emerald-200 drop-shadow-lg relative z-10"
                          size={32}
                        />
                      </div>
                      <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                        {graduates.length}+
                      </div>
                      <div className="text-emerald-200 font-semibold text-base lg:text-lg drop-shadow-sm">
                        سيرة ذاتية
                      </div>
                    </div>
                  </div>
                </div>

                {/* Countries */}
                <div className="group">
                  <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 border border-white/30 hover:border-white/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.35)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400/25 via-indigo-400/20 to-blue-300/15 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-blue-300/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                        <Globe
                          className="text-blue-200 drop-shadow-lg relative z-10"
                          size={32}
                        />
                      </div>
                      <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                        15+
                      </div>
                      <div className="text-blue-200 font-semibold text-base lg:text-lg drop-shadow-sm">
                        دولة
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employment Rate */}
                <div className="group">
                  <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 border border-white/30 hover:border-white/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.35)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-academy-gold/15 via-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-academy-gold/25 via-yellow-400/20 to-academy-gold/15 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-academy-gold/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                        <Trophy
                          className="text-academy-gold-light drop-shadow-lg relative z-10"
                          size={32}
                        />
                      </div>
                      <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                        95%
                      </div>
                      <div className="text-academy-gold-light font-semibold text-base lg:text-lg drop-shadow-sm">
                        معدل التوظيف
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="group">
                  <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 border border-white/30 hover:border-white/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.35)] transition-all duration-700 hover:-translate-y-2 hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/15 via-pink-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-400/25 via-pink-400/20 to-purple-300/15 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-purple-300/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                        <Award
                          className="text-purple-200 drop-shadow-lg relative z-10"
                          size={32}
                        />
                      </div>
                      <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                        10+
                      </div>
                      <div className="text-purple-200 font-semibold text-base lg:text-lg drop-shadow-sm">
                        تخصص
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-6 h-6 bg-academy-gold/60 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-[30%] right-[8%] w-4 h-4 bg-white/50 rounded-full animate-pulse delay-1000 shadow-md"></div>
          <div className="absolute bottom-[20%] left-[10%] w-5 h-5 bg-academy-gold-light/60 rounded-full animate-pulse delay-500 shadow-lg"></div>
          <div className="absolute bottom-[40%] right-[5%] w-3 h-3 bg-white/70 rounded-full animate-pulse delay-1500 shadow-sm"></div>
          <div className="absolute top-[60%] left-[3%] w-2 h-2 bg-academy-gold/80 rounded-full animate-pulse delay-700 shadow-sm"></div>
          <div className="absolute top-[80%] right-[12%] w-3 h-3 bg-white/60 rounded-full animate-pulse delay-300 shadow-md"></div>
        </div>
      </section>

      {/* Premium Success Stories Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <div className="p-4 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <Trophy className="text-academy-gold" size={32} />
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
                سيرة ذاتية مختصرة
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles
                  className="text-academy-gold animate-pulse"
                  size={20}
                />
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-academy-dark-gray max-w-3xl mx-auto leading-relaxed font-medium">
                اكتشف كيف غيرت أكاديمية المعرفة الدولية حياة خريجينا المهنية
                ومساراتهم نحو النجاح
              </p>
            </div>
          </div>

          {/* Premium Graduates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {graduates.map((graduate) => (
              <GraduateCard key={graduate.id} graduate={graduate} />
            ))}
          </div>

          {/* Premium Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-lg flex items-center justify-center shadow-lg">
                  <Users className="text-white" size={16} />
                </div>
                <h3 className="text-academy-blue font-bold text-xl">
                  انضم إلى مجتمع النجاح
                </h3>
              </div>
              <p className="text-academy-dark-gray leading-relaxed">
                كن جزءاً من شبكة خريجينا المتميزين واشترك في قصص النجاح التي
                تلهم الأجيال القادمة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Join Network Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-academy-gold/5 to-academy-blue/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto max-w-5xl px-6 lg:px-8">
          {/* Premium Section Header */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-10">
              <div className="p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl">
                    <Users className="text-academy-gold" size={36} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Crown size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-academy-gold rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -right-5 w-4 h-4 bg-academy-blue rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-academy-blue mb-8 tracking-tight leading-tight">
                انضم إلى شبكة خريجي الأكاديمية
              </h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <Sparkles
                  className="text-academy-gold animate-pulse"
                  size={20}
                />
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-academy-blue to-transparent"></div>
                <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl text-academy-dark-gray max-w-3xl mx-auto leading-relaxed font-medium">
                شارك قصة نجاحك مع المجتمع وكن مصدر إلهام للطلاب الحاليين
                والمستقبليين
              </p>
            </div>

            {/* Premium Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-academy-blue font-bold text-lg mb-2">
                  شارك إنجازاتك
                </h3>
                <p className="text-academy-dark-gray text-sm">
                  اعرض مسيرتك المهنية وإنجازاتك المتميزة
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="text-blue-600" size={24} />
                </div>
                <h3 className="text-academy-blue font-bold text-lg mb-2">
                  تواصل مع الخريجين
                </h3>
                <p className="text-academy-dark-gray text-sm">
                  انضم إلى شبكة مهنية قوية من الخريجين
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/20 to-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="text-academy-gold" size={24} />
                </div>
                <h3 className="text-academy-blue font-bold text-lg mb-2">
                  ألهم الآخرين
                </h3>
                <p className="text-academy-dark-gray text-sm">
                  كن مصدر إلهام للجيل القادم من الطلاب
                </p>
              </div>
            </div>
          </div>

          {/* Premium Form Container */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue"></div>
            <div className="bg-gradient-to-br from-white/50 via-slate-50/30 to-blue-50/30 p-8 lg:p-12">
              <GraduateApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Floating Elements */}
      <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
            <span className="text-academy-blue font-medium text-sm">
              شبكة الخريجين النشطة
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
