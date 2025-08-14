"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Users, Newspaper, Calendar, Mail, ImageIcon, Loader2, Upload, FileText, Globe, TrendingUp } from "lucide-react"
import { toast } from "sonner"
import {
  getNewsletterSubscriptions,
  deleteSubscription,
  addNews,
  getAllNews,
  deleteNews,
} from "@/app/actions/news-actions"

interface Subscription {
  id: number
  email: string
  subscribed_at: string
  is_active: boolean
}

interface NewsItem {
  id: number
  title: string
  description: string
  image_url: string
  publish_date: string
  created_at: string
}

export default function NewsManagementPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingNews, setIsAddingNews] = useState(false)
  const [showAddNewsDialog, setShowAddNewsDialog] = useState(false)

  // بيانات النموذج
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    publishDate: new Date().toISOString().split("T")[0],
    image: null as File | null,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [subscriptionsResult, newsResult] = await Promise.all([getNewsletterSubscriptions(), getAllNews()])

      if (subscriptionsResult.success) {
        setSubscriptions(subscriptionsResult.data)
      }

      if (newsResult.success) {
        setNews(newsResult.data)
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحميل البيانات")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSubscription = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشترك؟")) return

    try {
      const result = await deleteSubscription(id)
      if (result.success) {
        toast.success(result.message)
        setSubscriptions(subscriptions.filter((sub) => sub.id !== id))
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف")
    }
  }

  const handleDeleteNews = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الخبر؟")) return

    try {
      const result = await deleteNews(id)
      if (result.success) {
        toast.success(result.message)
        setNews(news.filter((item) => item.id !== id))
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف")
    }
  }

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.image) {
      toast.error("جميع الحقول مطلوبة")
      return
    }

    setIsAddingNews(true)
    const submitFormData = new FormData()
    submitFormData.append("title", formData.title)
    submitFormData.append("description", formData.description)
    submitFormData.append("publishDate", formData.publishDate)
    submitFormData.append("image", formData.image)

    try {
      const result = await addNews(submitFormData)
      if (result.success) {
        toast.success(result.message)
        setShowAddNewsDialog(false)
        setFormData({
          title: "",
          description: "",
          publishDate: new Date().toISOString().split("T")[0],
          image: null,
        })
        loadData()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة الخبر")
    } finally {
      setIsAddingNews(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-academy-gray via-white to-academy-blue-50/30">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-academy-blue mx-auto mb-6" />
          <p className="text-xl text-academy-dark-gray">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray via-white to-academy-blue-50/30 p-6">
      <div className="container mx-auto">
        <div className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-academy-blue to-academy-blue-700 bg-clip-text text-transparent mb-3">
              إدارة الأخبار والنشرة الإخبارية
            </h1>
            <p className="text-xl text-academy-dark-gray">إدارة الأخبار والمشتركين في النشرة الإخبارية</p>
          </div>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-academy-blue to-academy-blue-700 text-white border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="pt-6 pb-4 text-center">
                <div className="p-3 bg-academy-gold/20 rounded-2xl inline-block mb-3">
                  <Users className="w-8 h-8 text-academy-gold" />
                </div>
                <div className="text-3xl font-bold text-academy-gold">{subscriptions.length}</div>
                <p className="text-academy-blue-100">المشتركون</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="pt-6 pb-4 text-center">
                <div className="p-3 bg-green-100/20 rounded-2xl inline-block mb-3">
                  <Newspaper className="w-8 h-8 text-green-100" />
                </div>
                <div className="text-3xl font-bold text-green-100">{news.length}</div>
                <p className="text-green-100">الأخبار المنشورة</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-academy-gold to-academy-gold-light text-academy-blue border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="pt-6 pb-4 text-center">
                <div className="p-3 bg-academy-blue/20 rounded-2xl inline-block mb-3">
                  <TrendingUp className="w-8 h-8 text-academy-blue" />
                </div>
                <div className="text-3xl font-bold text-academy-blue">
                  {news.filter(item => new Date(item.publish_date).getFullYear() === new Date().getFullYear()).length}
                </div>
                <p className="text-academy-blue">أخبار هذا العام</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="subscriptions" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-academy-blue/10 p-2">
            <TabsTrigger 
              value="subscriptions" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-academy-blue data-[state=active]:to-academy-blue-700 data-[state=active]:text-white rounded-xl py-3 px-6 font-semibold transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              الاشتراكات ({subscriptions.length})
            </TabsTrigger>
            <TabsTrigger 
              value="news" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-academy-blue data-[state=active]:to-academy-blue-700 data-[state=active]:text-white rounded-xl py-3 px-6 font-semibold transition-all duration-300"
            >
              <Newspaper className="w-5 h-5" />
              الأخبار ({news.length})
            </TabsTrigger>
          </TabsList>

          {/* تبويب الاشتراكات */}
          <TabsContent value="subscriptions">
            <Card className="border-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-academy-blue flex items-center justify-center gap-3">
                  <Mail className="w-8 h-8 text-academy-gold" />
                  المشتركون في النشرة الإخبارية
                </CardTitle>
              </CardHeader>
              <CardContent>
                {subscriptions.length === 0 ? (
                  <div className="text-center py-16">
                    <Mail className="w-20 h-20 text-academy-blue/40 mx-auto mb-6" />
                    <p className="text-xl text-academy-dark-gray">لا توجد اشتراكات حالياً</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscriptions.map((subscription) => (
                      <div
                        key={subscription.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-2 border-academy-blue/10 rounded-2xl hover:bg-academy-blue-50/30 transition-all duration-300 group"
                      >
                        <div className="flex-1 mb-4 sm:mb-0">
                          <p className="font-bold text-lg text-academy-blue mb-2">{subscription.email}</p>
                          <div className="flex items-center gap-2 text-academy-dark-gray">
                            <Calendar className="w-4 h-4 text-academy-gold" />
                            <span>تاريخ الاشتراك: {new Date(subscription.subscribed_at).toLocaleDateString("ar-SA")}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 rounded-full px-4 py-2 font-semibold">
                            نشط
                          </Badge>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleDeleteSubscription(subscription.id)}
                            className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            حذف
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب الأخبار */}
          <TabsContent value="news">
            <Card className="border-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <CardTitle className="text-2xl font-bold text-academy-blue flex items-center gap-3">
                  <Newspaper className="w-8 h-8 text-academy-gold" />
                  الأخبار المنشورة
                </CardTitle>
                <Dialog open={showAddNewsDialog} onOpenChange={setShowAddNewsDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-academy-gold-dark/20">
                      <Plus className="w-5 h-5 mr-2" />
                      إنشاء خبر جديد
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-2 border-academy-blue/10 shadow-2xl">
                    <DialogHeader className="text-center">
                      <DialogTitle className="text-2xl font-bold text-academy-blue flex items-center justify-center gap-3">
                        <Globe className="w-8 h-8 text-academy-gold" />
                        إضافة خبر جديد
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddNews} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="image" className="text-sm font-semibold text-academy-blue flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-academy-gold" />
                          صورة الخبر *
                        </Label>
                        <div className="border-2 border-dashed border-academy-blue/30 rounded-2xl p-8 text-center hover:border-academy-blue/50 transition-all duration-300 bg-gradient-to-br from-academy-blue-50/50 to-academy-gold-50/30">
                          <Upload className="w-16 h-16 text-academy-blue/60 mx-auto mb-4" />
                          <p className="text-academy-dark-gray mb-3 text-lg">اسحب وأفلت صورة الخبر هنا أو</p>
                          <Button
                            type="button"
                            variant="outline"
                            className="border-2 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white bg-transparent rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:-translate-y-1"
                            onClick={() => document.getElementById("image")?.click()}
                          >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            اختر صورة
                          </Button>
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                          />
                          {formData.image && (
                            <p className="text-sm text-academy-blue mt-3 font-medium">
                              تم اختيار: {formData.image.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="title" className="text-sm font-semibold text-academy-blue flex items-center gap-2">
                          <FileText className="w-4 h-4 text-academy-gold" />
                          عنوان الخبر *
                        </Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="أدخل عنوان الخبر"
                          className="w-full border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white h-14 text-lg"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="description" className="text-sm font-semibold text-academy-blue flex items-center gap-2">
                          <FileText className="w-4 h-4 text-academy-gold" />
                          الوصف *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="أدخل وصف الخبر"
                          rows={4}
                          className="w-full resize-none border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="publishDate" className="text-sm font-semibold text-academy-blue flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-academy-gold" />
                          تاريخ النشر
                        </Label>
                        <Input
                          id="publishDate"
                          type="date"
                          value={formData.publishDate}
                          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                          className="w-full border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white h-14 text-lg"
                        />
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddNewsDialog(false)}
                          className="flex-1 border-2 border-academy-blue/20 text-academy-blue hover:bg-academy-blue hover:text-white rounded-xl font-semibold py-3 transition-all duration-300"
                        >
                          إلغاء
                        </Button>
                        <Button
                          type="submit"
                          disabled={isAddingNews}
                          className="flex-1 bg-gradient-to-r from-academy-blue to-academy-blue-700 hover:from-academy-blue-700 hover:to-academy-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          {isAddingNews ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              جاري الإضافة...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              إضافة الخبر
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {news.length === 0 ? (
                  <div className="text-center py-16">
                    <Newspaper className="w-20 h-20 text-academy-blue/40 mx-auto mb-6" />
                    <p className="text-xl text-academy-dark-gray">لا توجد أخبار منشورة حالياً</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((newsItem) => (
                      <Card key={newsItem.id} className="overflow-hidden bg-white border-2 border-academy-blue/10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-academy-gold to-academy-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={newsItem.image_url || "/placeholder.svg"}
                            alt={newsItem.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-xl text-academy-blue mb-3 line-clamp-2 group-hover:text-academy-blue-700 transition-colors duration-300">
                            {newsItem.title}
                          </h3>
                          <p className="text-academy-dark-gray text-sm mb-4 line-clamp-3 leading-relaxed">
                            {newsItem.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-academy-dark-gray">
                              <Calendar className="w-4 h-4 text-academy-gold" />
                              {new Date(newsItem.publish_date).toLocaleDateString("ar-SA")}
                            </div>
                            <Button 
                              variant="outline" 
                              size="lg" 
                              onClick={() => handleDeleteNews(newsItem.id)}
                              className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              حذف
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
