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
import { Plus, Trash2, Users, Newspaper, Calendar, Mail, ImageIcon, Loader2 } from "lucide-react"
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-academy-blue" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-academy-blue mb-2">إدارة الأخبار والنشرة الإخبارية</h1>
        <p className="text-gray-600">إدارة الأخبار والمشتركين في النشرة الإخبارية</p>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            الاشتراكات ({subscriptions.length})
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="w-4 h-4" />
            الأخبار ({news.length})
          </TabsTrigger>
        </TabsList>

        {/* تبويب الاشتراكات */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-academy-blue" />
                المشتركون في النشرة الإخبارية
              </CardTitle>
            </CardHeader>
            <CardContent>
              {subscriptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">لا توجد اشتراكات حالياً</div>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((subscription) => (
                    <div
                      key={subscription.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1 mb-2 sm:mb-0">
                        <p className="font-medium text-academy-blue">{subscription.email}</p>
                        <p className="text-sm text-gray-500">
                          تاريخ الاشتراك: {new Date(subscription.subscribed_at).toLocaleDateString("ar-SA")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          نشط
                        </Badge>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSubscription(subscription.id)}
                        >
                          <Trash2 className="w-4 h-4" />
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-academy-blue" />
                الأخبار المنشورة
              </CardTitle>
              <Dialog open={showAddNewsDialog} onOpenChange={setShowAddNewsDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-academy-blue hover:bg-academy-blue/90">
                    <Plus className="w-4 h-4 ml-2" />
                    إنشاء خبر
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>إضافة خبر جديد</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddNews} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image">صورة الخبر</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="text-sm text-gray-500">اختر صورة الخبر</p>
                          </div>
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                          />
                        </label>
                      </div>
                      {formData.image && <p className="text-sm text-green-600">تم اختيار: {formData.image.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">عنوان الخبر</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="أدخل عنوان الخبر"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">الوصف</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="أدخل وصف الخبر"
                        rows={4}
                        className="w-full resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="publishDate">تاريخ النشر</Label>
                      <Input
                        id="publishDate"
                        type="date"
                        value={formData.publishDate}
                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                      <Button
                        type="submit"
                        disabled={isAddingNews}
                        className="w-full bg-academy-blue hover:bg-academy-blue/90"
                      >
                        {isAddingNews ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin ml-2" />
                            جاري الإضافة...
                          </>
                        ) : (
                          "إضافة الخبر"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddNewsDialog(false)}
                        className="w-full"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {news.length === 0 ? (
                <div className="text-center py-8 text-gray-500">لا توجد أخبار منشورة حالياً</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.map((newsItem) => (
                    <Card key={newsItem.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={newsItem.image_url || "/placeholder.svg"}
                          alt={newsItem.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-academy-blue mb-2 line-clamp-2">{newsItem.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{newsItem.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(newsItem.publish_date).toLocaleDateString("ar-SA")}
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteNews(newsItem.id)}>
                            <Trash2 className="w-4 h-4" />
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
  )
}
