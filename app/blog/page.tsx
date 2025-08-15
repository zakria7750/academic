import { getAllNews } from "@/app/actions/news-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"

export const revalidate = 300; // ISR لمدة 5 دقائق

export default async function BlogPage() {
  const { data: news } = await getAllNews()

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray via-white to-academy-gray">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-academy-blue to-academy-gold text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">المدونة والأخبار</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            تابع آخر الأخبار والتحديثات من أكاديمية المعرفة الدولية
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-academy-blue mb-2">{news.length}</div>
              <div className="text-academy-dark-gray">مقال منشور</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-academy-gold mb-2">50+</div>
              <div className="text-academy-dark-gray">موضوع متنوع</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-academy-blue mb-2">1000+</div>
              <div className="text-academy-dark-gray">قارئ نشط</div>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-academy-blue mb-4">أحدث الأخبار</h2>
            <p className="text-xl text-academy-dark-gray max-w-2xl mx-auto">
              اكتشف آخر التطورات والأخبار من عالم التعليم والأكاديمية
            </p>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-academy-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-academy-gold" />
                </div>
                <h3 className="text-2xl font-bold text-academy-blue mb-4">لا توجد أخبار حالياً</h3>
                <p className="text-academy-dark-gray">
                  سيتم نشر الأخبار والمقالات الجديدة قريباً. تابعونا للحصول على آخر التحديثات.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white border-0 shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={article.image_url || "/placeholder.svg"}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-academy-dark-gray mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.publish_date).toLocaleDateString("ar-SA")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 دقائق قراءة</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-academy-blue mb-3 group-hover:text-academy-gold transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-academy-dark-gray line-clamp-3 leading-relaxed">{article.description}</p>
                    <div className="mt-4 pt-4 border-t border-academy-gray">
                      <button className="text-academy-gold hover:text-academy-blue font-semibold transition-colors duration-300 flex items-center gap-2">
                        قراءة المزيد
                        <span className="group-hover:translate-x-1 transition-transform duration-300">←</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="py-16 bg-gradient-to-r from-academy-blue to-academy-gold">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h3 className="text-3xl font-bold mb-4">لا تفوت أي خبر جديد</h3>
            <p className="text-xl opacity-90 mb-8">اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والتحديثات</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <p className="text-lg mb-4">يمكنك الاشتراك من خلال النموذج في أسفل الصفحة</p>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
