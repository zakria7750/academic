import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Award,
  Globe,
  Star,
  Crown,
  Sparkles,
  CheckCircle,
  Gem,
  Target,
  Users,
  Trophy,
  Infinity,
} from "lucide-react";
import { getAllInternationalAccreditations } from "@/app/actions/international-accreditations-actions";
import Image from "next/image";

export const revalidate = 300; // ISR لمدة 5 دقائق

export default async function AccreditationsPage() {
  const accreditationsResult = await getAllInternationalAccreditations();
  const internationalAccreditations = accreditationsResult.data || [];

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
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
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

        {/* Enhanced Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/certified_approval_agreement_confirmation.jpg"
            alt="الاعتمادات الدولية - أكاديمية المعرفة الدولية"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-8xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Ultra Premium Icon Section */}
            <div className="relative inline-block mb-16">
              <div className="p-8 bg-white/15 backdrop-blur-2xl rounded-[2rem] border border-white/25 shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                    <Shield
                      className="text-academy-blue drop-shadow-lg"
                      size={60}
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center shadow-xl border border-white/20">
                    <Crown size={24} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Star size={20} className="text-academy-blue" />
                  </div>
                  <div className="absolute top-2 -left-6 w-8 h-8 bg-academy-gold/80 rounded-full flex items-center justify-center shadow-md">
                    <Award size={16} className="text-academy-blue" />
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-10 tracking-tight leading-tight font-arabic">
                <span className="bg-gradient-to-r from-white via-academy-gold-light via-white to-academy-gold-light bg-clip-text text-transparent drop-shadow-2xl">
                  الاعتمادات الدولية
                </span>
              </h1>

              {/* Enhanced Decorative Separator */}
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                <div className="relative">
                  <Sparkles
                    className="text-academy-gold animate-pulse"
                    size={36}
                  />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles
                      className="text-academy-gold opacity-30"
                      size={36}
                    />
                  </div>
                </div>
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                <div className="w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-academy-gold-light font-semibold max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 lg:mb-8 drop-shadow-lg font-arabic tracking-wide">
                اعتمادات دولية معترف بها عالمياً تضمن جودة التعليم والشهادات
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-academy-gold-200 max-w-4xl mx-auto leading-relaxed font-light font-arabic">
                شراكات استراتيجية مع أرقى المؤسسات التعليمية والهيئات المعتمدة
                حول العالم
              </p>
            </div>

            {/* Ultra Premium Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto">
              <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                <div className="text-4xl font-bold text-academy-blue mb-3 group-hover:scale-110 transition-transform duration-300">
                  25+
                </div>
                <div className="text-academy-darker-gray font-semibold text-lg font-arabic">
                  اعتماد دولي
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                <div className="text-4xl font-bold text-academy-blue mb-3 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-academy-darker-gray font-semibold text-lg font-arabic">
                  شراكة عالمية
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                <div className="text-4xl font-bold text-academy-blue mb-3 group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-academy-darker-gray font-semibold text-lg font-arabic">
                  اعتراف دولي
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] text-center group hover:-translate-y-4 hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)] transition-all duration-500">
                <div className="text-4xl font-bold text-academy-blue mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Globe size={32} className="mx-auto" />
                </div>
                <div className="text-academy-darker-gray font-semibold text-lg font-arabic">
                  تغطية عالمية
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Premium International Accreditations Section */}
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
                    <Trophy
                      className="text-academy-gold drop-shadow-lg"
                      size={48}
                    />
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
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-academy-blue mb-10 tracking-tight leading-tight font-arabic">
                الاعتمادات والشراكات الدولية
              </h2>
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-academy-blue to-transparent shadow-sm"></div>
                <div className="relative">
                  <Sparkles
                    className="text-academy-gold animate-pulse"
                    size={28}
                  />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles
                      className="text-academy-gold opacity-20"
                      size={28}
                    />
                  </div>
                </div>
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-academy-blue to-transparent shadow-sm"></div>
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>
              <p className="text-2xl md:text-3xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-semibold mb-8 font-arabic tracking-wide">
                نفخر بحصولنا على اعتمادات دولية مرموقة من أعرق المؤسسات
                التعليمية العالمية
              </p>
              <p className="text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed font-arabic">
                شراكات استراتيجية تؤكد جودة برامجنا التعليمية والتدريبية وتضمن
                الاعتراف الدولي بشهاداتنا
              </p>
            </div>
          </div>

          {internationalAccreditations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {internationalAccreditations.map((accreditation: any) => (
                <Card
                  key={accreditation.id}
                  className="group bg-white/95 backdrop-blur-2xl border-0 shadow-[0_24px_48px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-8 hover:scale-[1.03] relative border border-slate-200/60"
                >
                  {/* Ultra Premium Status Indicator */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-academy-blue via-academy-gold via-academy-blue to-academy-gold"></div>

                  {/* Ultra Premium Card Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white/40 to-blue-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Floating Decorative Elements */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-academy-gold/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-academy-blue/30 rounded-full animate-pulse delay-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardContent className="p-0 relative z-10">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-academy-blue/15 to-academy-gold/15">
                      <Image
                        src={accreditation.image_url || "/placeholder.svg"}
                        alt={accreditation.title}
                        fill
                        className="object-cover group-hover:scale-115 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="absolute top-6 right-6">
                        <Badge className="bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold-dark text-academy-blue font-bold px-4 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 font-arabic">
                          <Award size={16} className="mr-2" />
                          اعتماد دولي
                        </Badge>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="mb-4">
                        <div className="w-16 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mb-4"></div>
                        <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-500 mb-4 leading-tight font-arabic tracking-wide">
                          {accreditation.title}
                        </h3>
                        <p className="text-academy-dark-gray text-lg leading-relaxed font-semibold font-arabic">
                          {accreditation.description}
                        </p>
                      </div>

                      {/* Premium Badge */}
                      <div className="flex items-center gap-2 mt-6">
                        <div className="w-8 h-8 bg-academy-gold/20 rounded-full flex items-center justify-center">
                          <CheckCircle
                            className="text-academy-gold"
                            size={16}
                          />
                        </div>
                        <span className="text-academy-blue font-semibold text-sm font-arabic">
                          معتمد دولياً
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-academy-gold/20">
                  <Shield
                    className="text-academy-gold drop-shadow-lg"
                    size={64}
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                  <Star size={20} className="text-academy-blue" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-6 font-arabic">
                لا توجد اعتمادات حالياً
              </h3>
              <p className="text-academy-dark-gray text-xl font-arabic max-w-md mx-auto leading-relaxed">
                نعمل جاهدين على إضافة المزيد من الاعتمادات الدولية المرموقة
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Ultra Premium Features Section */}
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
                    <Gem
                      className="text-academy-gold drop-shadow-lg"
                      size={48}
                    />
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
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-academy-blue mb-10 tracking-tight leading-tight font-arabic">
                مميزات الاعتمادات الدولية
              </h2>
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-academy-blue to-transparent shadow-sm"></div>
                <div className="relative">
                  <Sparkles
                    className="text-academy-gold animate-pulse"
                    size={28}
                  />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles
                      className="text-academy-gold opacity-20"
                      size={28}
                    />
                  </div>
                </div>
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-academy-blue to-transparent shadow-sm"></div>
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>
              <p className="text-2xl md:text-3xl text-academy-dark-gray max-w-5xl mx-auto leading-relaxed font-semibold mb-8 font-arabic tracking-wide">
                اكتشف المزايا الفريدة التي تحصل عليها من خلال اعتماداتنا الدولية
                المرموقة
              </p>
              <p className="text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed font-arabic">
                مميزات حصرية تضمن لك مستقبلاً مهنياً متميزاً واعترافاً عالمياً
                بمؤهلاتك
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* اعتراف عالمي */}
            <div className="group bg-white/95 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-200/60 text-center hover:scale-105 hover:shadow-[0_32px_64px_rgba(0,0,0,0.15)] transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.10)] hover:border-academy-gold/30">
              <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/15 to-academy-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-blue/20">
                <Globe size={40} className="text-academy-blue drop-shadow-md" />
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold mb-6 leading-tight font-arabic tracking-wide transition-colors duration-300">
                اعتراف عالمي
              </h3>
              <p className="text-academy-dark-gray leading-relaxed font-semibold text-lg font-arabic">
                شهاداتنا معترف بها في جميع أنحاء العالم من قبل أرقى الجهات
                المختصة والمؤسسات التعليمية
              </p>

              {/* Enhanced Badge */}
              <div className="flex items-center justify-center gap-2 mt-8 p-3 bg-academy-blue/10 rounded-2xl">
                <CheckCircle className="text-academy-blue" size={16} />
                <span className="text-academy-blue font-semibold text-sm font-arabic">
                  معترف عالمياً
                </span>
              </div>
            </div>

            {/* جودة مضمونة */}
            <div className="group bg-white/95 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-200/60 text-center hover:scale-105 hover:shadow-[0_32px_64px_rgba(0,0,0,0.15)] transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.10)] hover:border-academy-gold/30">
              <div className="w-20 h-20 bg-gradient-to-br from-academy-gold/15 to-academy-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                <Award size={40} className="text-academy-gold drop-shadow-md" />
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold mb-6 leading-tight font-arabic tracking-wide transition-colors duration-300">
                جودة مضمونة
              </h3>
              <p className="text-academy-dark-gray leading-relaxed font-semibold text-lg font-arabic">
                معايير دولية صارمة ومتطورة تضمن أعلى مستويات الجودة والتميز في
                التعليم والتدريب
              </p>

              {/* Enhanced Badge */}
              <div className="flex items-center justify-center gap-2 mt-8 p-3 bg-academy-gold/10 rounded-2xl">
                <Trophy className="text-academy-gold" size={16} />
                <span className="text-academy-gold font-semibold text-sm font-arabic">
                  جودة عالمية
                </span>
              </div>
            </div>

            {/* ثقة متبادلة */}
            <div className="group bg-white/95 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-200/60 text-center hover:scale-105 hover:shadow-[0_32px_64px_rgba(0,0,0,0.15)] transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.10)] hover:border-academy-gold/30">
              <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/15 to-academy-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-blue/20">
                <Users size={40} className="text-academy-blue drop-shadow-md" />
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold mb-6 leading-tight font-arabic tracking-wide transition-colors duration-300">
                ثقة متبادلة
              </h3>
              <p className="text-academy-dark-gray leading-relaxed font-semibold text-lg font-arabic">
                شراكات استراتيجية طويلة الأمد مع أفضل وأرقى المؤسسات التعليمية
                والأكاديمية عالمياً
              </p>

              {/* Enhanced Badge */}
              <div className="flex items-center justify-center gap-2 mt-8 p-3 bg-academy-blue/10 rounded-2xl">
                <Target className="text-academy-blue" size={16} />
                <span className="text-academy-blue font-semibold text-sm font-arabic">
                  شراكة استراتيجية
                </span>
              </div>
            </div>
          </div>

          {/* Ultra Premium Summary Card */}
          <div className="text-center mt-24">
            <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] p-12 shadow-[0_32px_64px_rgba(0,0,0,0.15)] border border-slate-200/60 max-w-4xl mx-auto hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] transition-all duration-700">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-blue/20">
                  <Crown
                    className="text-academy-gold drop-shadow-lg"
                    size={40}
                  />
                </div>
                <div className="text-center md:text-right">
                  <h3 className="text-academy-blue font-bold text-3xl mb-3 font-arabic tracking-wide">
                    التميز في كل خطوة
                  </h3>
                  <div className="w-24 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto md:mx-0"></div>
                </div>
              </div>
              <p className="text-academy-dark-gray leading-relaxed font-semibold text-xl font-arabic tracking-wide mb-8">
                مع اعتماداتنا الدولية، تحصل على ضمان الجودة والاعتراف العالمي
                الذي يفتح لك آفاقاً لا محدودة في مسيرتك المهنية
              </p>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-academy-blue mb-2 font-arabic">
                    150+
                  </div>
                  <div className="text-academy-darker-gray font-semibold font-arabic">
                    دولة معترفة
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-academy-blue mb-2">
                    99%
                  </div>
                  <div className="text-academy-darker-gray font-semibold font-arabic">
                    رضا الخريجين
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-academy-blue mb-2 font-arabic">
                    10+
                  </div>
                  <div className="text-academy-darker-gray font-semibold font-arabic">
                    سنوات خبرة
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-academy-blue mb-2">
                    <Infinity size={32} className="mx-auto" />
                  </div>
                  <div className="text-academy-darker-gray font-semibold font-arabic">
                    فرص مستقبلية
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
