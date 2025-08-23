import { Card, CardContent } from "@/components/ui/card"
import { Award, Eye, Target, Users, Lightbulb, Handshake, CheckCircle, Star, Sparkles, Crown, Shield, Zap, BookOpen, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      title: "الجودة",
      description: "الالتزام بأعلى معايير الأداء الأكاديمي والمهني مع ضمان التميز في كل ما نقدمه",
      icon: Award,
      color: "from-blue-600 to-blue-800",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      title: "المصداقية",
      description: "الشفافية والموثوقية في جميع تعاملاتنا وبرامجنا مع ضمان أعلى مستويات الثقة",
      icon: CheckCircle,
      color: "from-green-600 to-green-800",
      bgColor: "from-green-50 to-green-100",
    },
    {
      title: "الإبداع",
      description: "تشجيع الأفكار المبتكرة والحلول الخلاقة لمواجهة تحديات المستقبل",
      icon: Lightbulb,
      color: "from-yellow-600 to-yellow-800",
      bgColor: "from-yellow-50 to-yellow-100",
    },
    {
      title: "الشراكة",
      description: "التعاون مع مؤسسات وهيئات محلية ودولية لتحقيق أهداف مشتركة ومستدامة",
      icon: Handshake,
      color: "from-purple-600 to-purple-800",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      title: "التمكين",
      description: "دعم المتعلمين والباحثين ليصبحوا عناصر فاعلة ومؤثرة في مجتمعاتهم",
      icon: Users,
      color: "from-red-600 to-red-800",
      bgColor: "from-red-50 to-red-100",
    },
  ]

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
          <div className="absolute inset-0 z-0">
          <Image
            src="/academic-advisor.png"
            alt="خريجو أكاديمية المعرفة الدولية"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/60 via-academy-blue/40 to-academy-blue-dark/80"></div>
        </div>
          <div className="text-center text-white">
            {/* Premium Title Section */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                  من
                </span>
                <br />
                <span className="bg-gradient-to-r from-academy-gold-light via-academy-gold to-academy-gold-light bg-clip-text text-transparent animate-pulse">
                  نحن
                </span>
              </h1>
            </div>
            
            {/* Premium Description */}
            <div className="mb-16">
              <p className="text-2xl lg:text-3xl mb-6 font-semibold leading-relaxed">
                <span className="bg-gradient-to-r from-academy-gold-light to-white bg-clip-text text-transparent">
                  أكاديمية المعرفة الدولية - منارة للتعليم والتميز
                </span>
              </p>
              <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                تعرف على رؤيتنا ورسالتنا وقيمنا التي تجعلنا مؤسسة رائدة في التعليم العالي
              </p>
              
              {/* Premium Stats Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">رؤية</div>
                  <div className="text-white/80">واضحة ومحددة</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">رسالة</div>
                  <div className="text-white/80">تعليمية نبيلة</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">قيم</div>
                  <div className="text-white/80">راسخة ومتميزة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Enhanced Vision Section */}
       <section className="about-section-spacing py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-academy-gray-light via-white to-academy-gray-light"></div>
                 <div className="relative z-10 container mx-auto px-4">
           <div className="about-content-grid vision-mission-grid grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
             <div className="order-2 lg:order-1">
              {/* Section Header */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 rounded-full mb-6">
                  <div className="px-6 py-2 bg-white rounded-full shadow-sm">
                    <span className="text-academy-blue font-semibold text-sm flex items-center space-x-2 space-x-reverse">
                      <Eye size={16} className="text-academy-gold" />
                      <span>رؤيتنا للمستقبل</span>
                    </span>
                  </div>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6 leading-tight">
                  رؤيتنا 
                  <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> المستقبلية</span>
                </h2>
              </div>

              {/* Enhanced Vision Content */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-white to-academy-gray-light p-8 rounded-3xl shadow-premium hover:shadow-premium-hover transition-all duration-700 border border-academy-gold/20 hover:border-academy-gold/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-academy-gold/5 to-academy-gold/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative">
                    <p className="text-lg leading-relaxed text-academy-dark-gray mb-6">
                      أن نكون منارة تعليمية وبحثية رائدة على المستويين الإقليمي والدولي، نقدم المعرفة الموثوقة، ونحفّز
                      الإبداع، ونؤهل قادة المستقبل القادرين على إحداث أثر إيجابي ومستدام في مجتمعاتهم.
                    </p>
                    
                    {/* Premium Quote */}
                    <div className="bg-academy-blue/5 border-l-4 border-academy-gold pl-6 py-4 rounded-lg">
                      <p className="text-academy-blue font-medium italic">
                        "نسعى لتكون أكاديميتنا الخيار الأول للباحثين عن التميز والجودة في التعليم"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

                             {/* Enhanced Key Points */}
               <div className="key-points-grid mt-8 grid grid-cols-3 gap-6">
                <div className="group text-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-blue-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Crown className="text-white" size={20} />
                  </div>
                  <div className="text-xl font-bold text-academy-blue group-hover:text-blue-600 transition-colors">رائدة</div>
                  <div className="text-sm text-academy-dark-gray">إقليمياً ودولياً</div>
                </div>
                <div className="group text-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-green-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="text-white" size={20} />
                  </div>
                  <div className="text-xl font-bold text-academy-blue group-hover:text-green-600 transition-colors">موثوقة</div>
                  <div className="text-sm text-academy-dark-gray">في المعرفة</div>
                </div>
                <div className="group text-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-purple-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="text-white" size={20} />
                  </div>
                  <div className="text-xl font-bold text-academy-blue group-hover:text-purple-600 transition-colors">مؤثرة</div>
                  <div className="text-sm text-academy-dark-gray">في المجتمع</div>
                </div>
              </div>
            </div>

            {/* Enhanced Image Section */}
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/vision-image.png"
                    alt="رؤية أكاديمية المعرفة الدولية"
                    width={600}
                    height={400}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/50 float-animation">
                  <Eye className="text-academy-blue" size={24} />
                </div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/50">
                  <Sparkles className="text-academy-gold" size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Enhanced Mission Section */}
       <section className="about-section-spacing py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-gray via-academy-gray-light to-white"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 50%), 
                           radial-gradient(circle at 20% 80%, rgba(0, 31, 63, 0.03) 0%, transparent 50%)`
        }}></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Enhanced Image Section */}
            <div>
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/academic-advisor.png"
                    alt="رسالة أكاديمية المعرفة الدولية"
                    width={600}
                    height={400}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academy-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/50 float-animation">
                  <Target className="text-academy-gold" size={24} />
                </div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/50">
                  <BookOpen className="text-academy-blue" size={18} />
                </div>
              </div>
            </div>

            <div>
              {/* Section Header */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-blue/20 to-academy-blue/10 rounded-full mb-6">
                  <div className="px-6 py-2 bg-white rounded-full shadow-sm">
                    <span className="text-academy-blue font-semibold text-sm flex items-center space-x-2 space-x-reverse">
                      <Target size={16} className="text-academy-gold" />
                      <span>رسالتنا التعليمية</span>
                    </span>
                  </div>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6 leading-tight">
                  رسالتنا 
                  <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> التعليمية</span>
                </h2>
              </div>

              {/* Enhanced Mission Content */}
              <div className="relative group mb-8">
                <div className="bg-white p-8 rounded-3xl shadow-premium hover:shadow-premium-hover transition-all duration-700 border border-academy-blue/20 hover:border-academy-blue/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-blue/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative">
                    <p className="text-lg leading-relaxed text-academy-dark-gray mb-6">
                      تقديم تعليم وتدريب عالي الجودة يعتمد على أحدث المعايير العالمية، ويجمع بين الأصالة والمعاصرة، لتمكين
                      المتعلمين والباحثين من تطوير مهاراتهم العلمية والمهنية، والمساهمة في إنتاج ونشر المعرفة بما يخدم
                      التنمية الشاملة.
                    </p>
                    
                    {/* Premium Quote */}
                    <div className="bg-academy-gold/5 border-l-4 border-academy-blue pl-6 py-4 rounded-lg">
                      <p className="text-academy-blue font-medium italic">
                        "نلتزم بتقديم تعليم يجمع بين العراقة والحداثة لبناء جيل مؤهل ومبدع"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

                             {/* Enhanced Feature Cards */}
               <div className="feature-cards-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-academy-gold/20 hover:border-academy-gold/40">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-academy-gold to-academy-gold-light rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="text-academy-blue" size={18} />
                    </div>
                    <div className="text-academy-blue font-bold text-lg group-hover:text-academy-gold transition-colors">جودة عالية</div>
                  </div>
                  <div className="text-sm text-academy-dark-gray">في التعليم والتدريب بأحدث المعايير</div>
                </div>
                
                <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-academy-blue/20 hover:border-academy-blue/40">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-academy-blue to-academy-blue-light rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="text-academy-gold" size={18} />
                    </div>
                    <div className="text-academy-blue font-bold text-lg group-hover:text-academy-blue-light transition-colors">معايير دولية</div>
                  </div>
                  <div className="text-sm text-academy-dark-gray">حديثة ومتطورة ومعترف بها عالمياً</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Enhanced Values Section */}
       <section className="about-section-spacing py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-academy-gray-light to-white"></div>
        <div className="relative z-10 container mx-auto px-4">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-academy-gold/20 to-academy-gold/10 rounded-full mb-8">
              <div className="px-8 py-3 bg-white rounded-full shadow-lg">
                <span className="text-academy-blue font-bold text-sm flex items-center space-x-2 space-x-reverse">
                  <Star size={18} className="text-academy-gold" />
                  <span>قيمنا الأساسية</span>
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6 leading-tight">
              قيمنا التي 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> نؤمن بها</span>
            </h2>
            
            <div className="w-32 h-1 bg-gradient-to-r from-academy-gold via-academy-gold-light to-academy-gold mx-auto mb-8 rounded-full"></div>
            
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتحدد هويتنا كمؤسسة تعليمية رائدة ومؤثرة في المجتمع
            </p>
          </div>

                     {/* Enhanced Values Grid */}
           <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-premium hover:shadow-premium-hover transition-all duration-700 hover:-translate-y-6 rounded-3xl premium-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  <CardContent className="relative p-8 text-center">
                    {/* Enhanced Icon */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto shadow-xl ring-4 ring-white/30 group-hover:ring-white/50 transition-all duration-500 group-hover:scale-110`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-academy-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse flex items-center justify-center">
                        <Sparkles className="text-academy-blue" size={12} />
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <h3 className="text-2xl font-bold text-academy-blue mb-4 group-hover:text-academy-blue-light transition-colors duration-300">
                      {value.title}
                    </h3>
                    
                    <p className="text-academy-dark-gray leading-relaxed group-hover:text-academy-darker-gray transition-colors duration-300 text-sm">
                      {value.description}
                    </p>

                    {/* Premium Indicator */}
                    <div className="mt-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className={`w-6 h-6 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center`}>
                          <Zap size={12} className="text-white" />
                        </div>
                        <span className="text-academy-blue font-semibold text-xs">قيمة أساسية</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-light to-academy-blue-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/80 to-academy-blue/90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.15) 0%, transparent 60%), 
                           radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 60%),
                           linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%)`
        }}></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto text-white">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center p-1 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <div className="px-6 py-2 bg-academy-gold rounded-full shadow-sm">
                  <span className="text-academy-blue font-bold text-sm">انضم إلينا</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              انضم إلى رحلة 
              <span className="bg-gradient-to-r from-academy-gold to-academy-gold-light bg-clip-text text-transparent"> التعلم معنا</span>
            </h2>
            
            <p className="text-xl mb-10 text-academy-gold-light leading-relaxed max-w-3xl mx-auto">
              كن جزءاً من مجتمع أكاديمي متميز يسعى لتحقيق التميز والإبداع في التعليم ويؤهل قادة المستقبل
            </p>
            
                         <div className="about-cta-buttons flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a
                href="/programs"
                                 className="about-cta-button group bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-light hover:to-academy-gold text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden min-w-[200px] inline-block"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                  <span>استكشف برامجنا</span>
                  <BookOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-academy-gold-light to-academy-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a
                href="/admission"
                                 className="about-cta-button group border-2 border-white/80 text-white hover:bg-white hover:text-academy-blue font-bold px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm min-w-[200px] inline-block"
              >
                <span className="flex items-center justify-center space-x-2 space-x-reverse">
                  <span>سجل الآن</span>
                  <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
            </div>

            {/* Additional Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 space-x-reverse text-academy-gold-light/80">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Eye className="text-academy-gold" size={16} />
                <span className="text-sm">رؤية واضحة</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Target className="text-academy-gold" size={16} />
                <span className="text-sm">أهداف محددة</span>
              </div>
              <div className="w-1 h-1 bg-academy-gold rounded-full"></div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Award className="text-academy-gold" size={16} />
                <span className="text-sm">قيم راسخة</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
