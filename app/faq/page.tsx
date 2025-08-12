"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, Award, Globe, CheckCircle, GraduationCap, Phone, Mail, MessageSquare, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FAQItem {
  id: number
  question: string
  answer: string | JSX.Element
  category: string
  icon: any
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "ما الفرق بين الماجستير المهني والماجستير الأكاديمي؟",
    answer: "الماجستير المهني يركز على التطبيق العملي وتنمية المهارات المهنية، بينما الماجستير الأكاديمي يركز على البحث العلمي والنظريات الأكاديمية.",
    category: "البرامج الأكاديمية",
    icon: GraduationCap
  },
  {
    id: 2,
    question: "هل الأكاديمية معتمدة؟",
    answer: (
      <div className="space-y-4">
        <p className="text-academy-slate-700">
          نعم، أكاديمية المعرفة الدولية مؤسسة تعليمية مرخصة وتعمل وفق معايير الجودة الأكاديمية المعترف بها عالميًا.
        </p>
        <div className="bg-academy-gold/10 p-4 rounded-lg space-y-3">
          <div className="flex items-start space-x-3 space-x-reverse">
            <Award className="w-5 h-5 text-academy-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-academy-blue mb-1">اعتمادات دولية:</h4>
              <p className="text-sm text-academy-slate-600">حاصلة على اعتماد من جهات ومؤسسات تعليمية دولية مرموقة، مما يمنح شهاداتها قبولًا واسعًا على مستوى العالم.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 space-x-reverse">
            <Globe className="w-5 h-5 text-academy-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-academy-blue mb-1">شراكات استراتيجية:</h4>
              <p className="text-sm text-academy-slate-600">اتفاقيات تعاون مع جامعات ومراكز بحثية ومؤسسات تدريبية في عدة دول، لضمان تبادل الخبرات واعتماد البرامج المشتركة.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 space-x-reverse">
            <CheckCircle className="w-5 h-5 text-academy-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-academy-blue mb-1">توثيق إلكتروني للشهادات:</h4>
              <p className="text-sm text-academy-slate-600">جميع الشهادات موثقة وقابلة للتحقق المباشر عبر الموقع الرسمي.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 space-x-reverse">
            <Award className="w-5 h-5 text-academy-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-academy-blue mb-1">التزام بمعايير الجودة:</h4>
              <p className="text-sm text-academy-slate-600">تصميم وتنفيذ البرامج التعليمية وفق أعلى المعايير الأكاديمية والمهنية.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    category: "الاعتماد والجودة",
    icon: Award
  },
  {
    id: 3,
    question: "هل شهادات الأكاديمية معترف بها دوليًا؟",
    answer: "نعم، الأكاديمية تمنح شهادات معترف بها دوليًا، ويمكن التحقق من صحتها عبر موقع الأكاديمية.",
    category: "الاعتماد والجودة",
    icon: Globe
  },
  {
    id: 4,
    question: "هل يشترط الحضور الشخصي للدراسة؟",
    answer: "لا، توفر الأكاديمية نظام التعليم المدمج الذي يجمع بين التعليم الإلكتروني والحضور الافتراضي، مما يتيح المرونة للمتدربين في أي مكان بالعالم.",
    category: "نظام التعليم",
    icon: GraduationCap
  },
  {
    id: 5,
    question: "كيف يمكنني أن أصبح مدربًا معتمدًا لدى الأكاديمية؟",
    answer: "استيفاء شروط الاعتماد، وتقديم المستندات المطلوبة، وسداد رسوم الاعتماد، وبعدها يحصل المدرب على شهادة مدرب معتمد ويتم تسويقه عبر منصات الأكاديمية.",
    category: "التدريب والاعتماد",
    icon: Users
  },
  {
    id: 6,
    question: "ما مدة البرامج التدريبية؟",
    answer: "تعتمد على عدد الساعات المعتمدة لكل برنامج، وعادةً تتراوح بين 220 إلى 320 ساعة تدريبية.",
    category: "البرامج الأكاديمية",
    icon: GraduationCap
  },
  {
    id: 7,
    question: "هل يمكن تقسيط الرسوم الدراسية؟",
    answer: "نعم، الأكاديمية توفر خيار تقسيط الرسوم وفق اللوائح المعتمدة.",
    category: "الرسوم والدفع",
    icon: CheckCircle
  },
  {
    id: 8,
    question: "هل توفر الأكاديمية دعمًا بعد التخرج؟",
    answer: "نعم، من خلال فرص النشر العلمي، والمشاركة في المؤتمرات، والتطوير المهني المستمر.",
    category: "الدعم والخدمات",
    icon: Award
  },
  {
    id: 9,
    question: "ما نوع البرامج والتخصصات التي تقدمها الأكاديمية؟",
    answer: "تقدم الأكاديمية برامج متنوعة تشمل الإدارة، العلوم الإنسانية، الدراسات الإسلامية، البحث العلمي، التنمية البشرية، وتخصصات أخرى تلبي احتياجات سوق العمل.",
    category: "البرامج الأكاديمية",
    icon: GraduationCap
  },
  {
    id: 10,
    question: "ما هي الدرجة العلمية التي يحملها المدربون في الأكاديمية؟",
    answer: "المدربون في الأكاديمية من نخبة الكفاءات الأكاديمية، وتتراوح درجاتهم العلمية بين أستاذ دكتور، وأستاذ مساعد، ودكتور، إضافة إلى خبراء معتمدين في مجالاتهم.",
    category: "هيئة التدريس",
    icon: Users
  },
  {
    id: 11,
    question: "كيف يمكن التواصل مع الأكاديمية؟",
    answer: (
      <div className="space-y-3">
        <p className="text-academy-slate-700 mb-4">يمكن التواصل مع الأكاديمية عبر الوسائل التالية:</p>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 space-x-reverse p-3 bg-academy-gray rounded-lg">
            <Mail className="w-5 h-5 text-academy-gold" />
            <div>
              <span className="font-medium text-academy-blue">البريد الإلكتروني:</span>
              <p className="text-sm text-academy-slate-600">info@knowledge-academy.edu</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse p-3 bg-academy-gray rounded-lg">
            <Phone className="w-5 h-5 text-academy-gold" />
            <div>
              <span className="font-medium text-academy-blue">الهاتف:</span>
              <p className="text-sm text-academy-slate-600">+966 11 123 4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse p-3 bg-academy-gray rounded-lg">
            <MessageSquare className="w-5 h-5 text-academy-gold" />
            <div>
              <span className="font-medium text-academy-blue">نموذج التواصل:</span>
              <p className="text-sm text-academy-slate-600">عبر الموقع الرسمي</p>
            </div>
          </div>
        </div>
      </div>
    ),
    category: "التواصل والدعم",
    icon: MessageSquare
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray via-white to-academy-primary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-academy-blue via-academy-primary-800 to-academy-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center shadow-lg">
                <HelpCircle className="w-8 h-8 text-academy-blue" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-academy-gold to-academy-accent-300 bg-clip-text text-transparent">
              الأسئلة الشائعة
            </h1>
            <p className="text-xl text-academy-primary-100 max-w-2xl mx-auto leading-relaxed">
              نجيب على جميع استفساراتكم حول أكاديمية المعرفة الدولية وبرامجها التعليمية
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6 space-x-reverse text-academy-gold">
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">إجابات شاملة</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Award className="w-5 h-5" />
                <span className="text-sm">معلومات محدثة</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">دعم مستمر</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
                         <div className="grid gap-6">
               {faqData.map((item) => {
                const IconComponent = item.icon
                const isOpen = openItems.includes(item.id)
                
                return (
                  <Card 
                    key={item.id} 
                    className={`overflow-hidden transition-all duration-300 hover:shadow-xl border-0 ${
                      isOpen 
                        ? "shadow-2xl bg-gradient-to-r from-academy-gold/5 to-academy-primary-50/30" 
                        : "shadow-lg hover:shadow-xl bg-white"
                    }`}
                  >
                    <CardContent className="p-0">
                                             <button
                         onClick={() => toggleItem(item.id)}
                         className="w-full p-4 sm:p-6 text-right hover:bg-academy-primary-50/50 transition-all duration-300 group"
                       >
                        <div className="flex items-center justify-between">
                                                     <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse flex-1">
                             <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                               isOpen 
                                 ? "bg-academy-gold shadow-lg scale-110" 
                                 : "bg-academy-primary-100 group-hover:bg-academy-gold/20"
                             }`}>
                               <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                                 isOpen ? "text-academy-blue" : "text-academy-primary-600 group-hover:text-academy-gold"
                               }`} />
                             </div>
                            <div className="text-right flex-1">
                                                             <div className="flex items-center justify-between">
                                 <h3 className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
                                   isOpen ? "text-academy-blue" : "text-academy-slate-800 group-hover:text-academy-blue"
                                 }`}>
                                   {item.question}
                                 </h3>
                                 <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} flex-shrink-0 mr-2`}>
                                   {isOpen ? (
                                     <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-academy-gold" />
                                   ) : (
                                     <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-academy-primary-400 group-hover:text-academy-gold" />
                                   )}
                                 </div>
                                                               </div>
                            </div>
                          </div>
                        </div>
                      </button>
                      
                             <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
         isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
       }`}>
                                                 <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                           <div className="pr-8 sm:pr-16">
                             <div className="bg-academy-slate-50 rounded-xl p-4 sm:p-6 border-r-4 border-academy-gold">
                              <div className="text-academy-slate-700 leading-relaxed">
                                {typeof item.answer === 'string' ? (
                                  <p className="text-base">{item.answer}</p>
                                ) : (
                                  item.answer
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-academy-blue to-academy-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="w-16 h-16 bg-academy-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-academy-blue" />
            </div>
            <h2 className="text-3xl font-bold mb-4">لم تجد إجابة لسؤالك؟</h2>
            <p className="text-xl text-academy-primary-100 mb-8">
              فريق الدعم الفني متاح للإجابة على جميع استفساراتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@knowledge-academy.edu"
                className="bg-academy-gold text-academy-blue px-8 py-4 rounded-xl font-bold hover:bg-academy-accent-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                تواصل عبر البريد الإلكتروني
              </a>
              <a
                href="tel:+966111234567"
                className="bg-transparent border-2 border-academy-gold text-academy-gold px-8 py-4 rounded-xl font-bold hover:bg-academy-gold hover:text-academy-blue transition-all duration-300 transform hover:scale-105"
              >
                اتصل بنا مباشرة
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}