import { getAllNews } from "@/app/actions/news-actions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Star,
  Crown,
  Sparkles,
  BookOpen,
  Users,
  Eye,
  TrendingUp,
  Award,
  Gem,
  ArrowRight,
  Globe,
  Target,
} from "lucide-react";
import Image from "next/image";

export const revalidate = 300; // ISR لمدة 5 دقائق

export default async function BlogPage() {
  const { data: news } = await getAllNews();

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

        <div className="relative z-10 container mx-auto max-w-8xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Ultra Premium Icon Section */}
            <div className="relative inline-block mb-16">
              <div className="p-8 bg-white/15 backdrop-blur-2xl rounded-[2rem] border border-white/25 shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                    <BookOpen
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-10 tracking-tight leading-tight font-arabic">
                <span className="bg-gradient-to-r from-white via-academy-gold-light via-white to-academy-gold-light bg-clip-text text-transparent drop-shadow-2xl">
                  المدونة والأخبار
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
                تابع آخر الأخبار والتحديثات من أكاديمية المعرفة الدولية
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-academy-gold-200 max-w-4xl mx-auto leading-relaxed font-light font-arabic">
                اكتشف عالم المعرفة من خلال مقالاتنا وأخبارنا المتنوعة والمثرية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Premium Stats Section */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
        {/* Ultra Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/70"></div>
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-academy-blue/12 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-academy-gold/8 to-academy-blue/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* مقالات منشورة */}
            <div className="group bg-white/95 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-200/60 text-center hover:scale-105 hover:shadow-[0_32px_64px_rgba(0,0,0,0.15)] transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.10)] hover:border-academy-gold/30">
              <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/15 to-academy-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-blue/20">
                <BookOpen
                  size={40}
                  className="text-academy-blue drop-shadow-md"
                />
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto mb-6"></div>
              <div className="text-4xl font-bold text-academy-blue mb-4 group-hover:scale-110 transition-transform duration-300 font-arabic">
                {news.length}
              </div>
              <div className="text-academy-darker-gray font-semibold text-lg font-arabic">
                مقال منشور
              </div>
            </div>

            {/* مواضيع متنوعة */}
            <div className="group bg-white/95 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-200/60 text-center hover:scale-105 hover:shadow-[0_32px_64px_rgba(0,0,0,0.15)] transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.10)] hover:border-academy-gold/30">
              <div className="w-20 h-20 bg-gradient-to-br from-academy-gold/15 to-academy-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-gold/20">
                <Target
                  size={40}
                  className="text-academy-gold drop-shadow-md"
                />
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto mb-6"></div>
              <div className="text-4xl font-bold text-academy-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-academy-darker-gray font-semibold text-lg font-arabic">
                موضوع متنوع
              </div>
            </div>

            {/* قراء نشطون */}
            <div className="group bg-white/95 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-200/60 text-center hover:scale-105 hover:shadow-[0_32px_64px_rgba(0,0,0,0.15)] transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.10)] hover:border-academy-gold/30">
              <div className="w-20 h-20 bg-gradient-to-br from-academy-blue/15 to-academy-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-academy-blue/20">
                <Users size={40} className="text-academy-blue drop-shadow-md" />
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mx-auto mb-6"></div>
              <div className="text-4xl font-bold text-academy-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-academy-darker-gray font-semibold text-lg font-arabic">
                قارئ نشط
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Premium News Section */}
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
                    <TrendingUp
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
                أحدث الأخبار
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
                اكتشف آخر التطورات والأخبار من عالم التعليم والأكاديمية المتميزة
              </p>
              <p className="text-xl text-academy-darker-gray max-w-4xl mx-auto leading-relaxed font-arabic">
                مقالات متنوعة وأخبار حصرية تثري معرفتك وتطلعك على أحدث
                الابتكارات التعليمية
              </p>
            </div>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-academy-gold/20">
                  <Calendar
                    className="text-academy-gold drop-shadow-lg"
                    size={64}
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                  <Star size={20} className="text-academy-blue" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-academy-blue mb-6 font-arabic">
                لا توجد أخبار حالياً
              </h3>
              <p className="text-academy-dark-gray text-xl font-arabic max-w-md mx-auto leading-relaxed">
                سيتم نشر الأخبار والمقالات الجديدة قريباً. تابعونا للحصول على
                آخر التحديثات.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {news.map((article) => (
                <Card
                  key={article.id}
                  className="group bg-white/95 backdrop-blur-2xl border-0 shadow-[0_24px_48px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-8 hover:scale-[1.03] relative border border-slate-200/60"
                >
                  {/* Ultra Premium Status Indicator */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-academy-blue via-academy-gold via-academy-blue to-academy-gold"></div>

                  {/* Ultra Premium Card Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white/40 to-blue-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Floating Decorative Elements */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-academy-gold/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-academy-blue/30 rounded-full animate-pulse delay-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={article.image_url || "/placeholder.svg"}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/60 via-academy-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Premium Reading Time Badge */}
                    <div className="absolute top-6 right-6">
                      <div className="bg-gradient-to-r from-academy-gold/90 to-academy-gold-light/90 text-academy-blue px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 font-arabic">
                        <Clock size={14} className="inline mr-1" />5 دقائق
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8 relative z-10">
                    {/* Enhanced Date Section */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-academy-blue/10 rounded-2xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-academy-blue" />
                      </div>
                      <span className="text-academy-dark-gray font-semibold text-lg font-arabic">
                        {new Date(article.publish_date).toLocaleDateString(
                          "ar-SA",
                        )}
                      </span>
                    </div>

                    {/* Enhanced Title */}
                    <div className="mb-6">
                      <div className="w-16 h-[2px] bg-gradient-to-r from-academy-blue to-academy-gold rounded-full mb-4"></div>
                      <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-500 mb-4 leading-tight font-arabic tracking-wide line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-academy-dark-gray leading-relaxed font-semibold text-lg font-arabic line-clamp-3">
                        {article.description}
                      </p>
                    </div>

                    {/* Ultra Premium Action Button */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                      <button className="group/btn bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold-dark hover:from-academy-gold-dark hover:via-academy-gold hover:to-academy-gold-light text-academy-blue font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 font-arabic">
                        قراءة المزيد
                        <ArrowRight
                          className="group-hover/btn:translate-x-1 transition-transform duration-300"
                          size={18}
                        />
                      </button>

                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-academy-dark-gray" />
                        <span className="text-academy-dark-gray text-sm font-arabic">
                          250
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ultra Premium Newsletter CTA */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
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
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Ultra Premium Icon Section */}
            <div className="relative inline-block mb-16">
              <div className="p-8 bg-white/15 backdrop-blur-2xl rounded-[2rem] border border-white/25 shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                    <Globe
                      className="text-academy-blue drop-shadow-lg"
                      size={48}
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center shadow-xl border border-white/20">
                    <Crown size={20} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Star size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-6 -left-6 w-6 h-6 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-4 -right-8 w-5 h-5 bg-academy-gold-light rounded-full animate-pulse delay-700 shadow-md"></div>
              <div className="absolute top-1/2 -left-10 w-4 h-4 bg-academy-gold rounded-full animate-pulse delay-1200"></div>
            </div>

            {/* Ultra Premium Title Section */}
            <div className="mb-16">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight font-arabic">
                <span className="bg-gradient-to-r from-white via-academy-gold-light via-white to-academy-gold-light bg-clip-text text-transparent drop-shadow-2xl">
                  لا تفوت أي خبر جديد
                </span>
              </h3>

              {/* Enhanced Decorative Separator */}
              <div className="flex items-center justify-center gap-6 mb-10">
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                <div className="relative">
                  <Sparkles
                    className="text-academy-gold animate-pulse"
                    size={24}
                  />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles
                      className="text-academy-gold opacity-30"
                      size={24}
                    />
                  </div>
                </div>
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-academy-gold to-transparent shadow-sm"></div>
                <div className="w-4 h-4 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>

              <p className="text-xl md:text-2xl text-academy-gold-light font-semibold max-w-4xl mx-auto leading-relaxed mb-8 drop-shadow-lg font-arabic tracking-wide">
                اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والتحديثات
              </p>
            </div>

            {/* Ultra Premium CTA Card */}
            <div className="bg-white/15 backdrop-blur-2xl rounded-[2rem] p-12 border border-white/25 shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shadow-xl border border-white/30 hover:scale-110 transition-transform duration-500">
                  <Calendar className="text-white drop-shadow-lg" size={40} />
                </div>
                <div className="text-center md:text-right">
                  <h4 className="text-white font-bold text-2xl mb-3 font-arabic tracking-wide">
                    ابق على اطلاع دائم
                  </h4>
                  <div className="w-20 h-[2px] bg-gradient-to-r from-academy-gold to-academy-gold-light rounded-full mx-auto md:mx-0"></div>
                </div>
              </div>

              <p className="text-academy-gold-200 leading-relaxed font-semibold text-xl font-arabic tracking-wide mb-8">
                يمكنك الاشتراك من خلال النموذج في أسفل الصفحة والحصول على محتوى
                حصري ومميز
              </p>

              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <Award className="w-8 h-8 text-academy-gold mx-auto mb-3" />
                  <div className="text-white font-semibold font-arabic">
                    محتوى حصري
                  </div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <TrendingUp className="w-8 h-8 text-academy-gold mx-auto mb-3" />
                  <div className="text-white font-semibold font-arabic">
                    آخر التحديثات
                  </div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <Target className="w-8 h-8 text-academy-gold mx-auto mb-3" />
                  <div className="text-white font-semibold font-arabic">
                    محتوى مخصص
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
