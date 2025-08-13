"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Users, Newspaper, Calendar, Mail, Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  getNewsletterSubscriptions,
  deleteSubscription,
  addNews,
  getAllNews,
  deleteNews,
} from "@/app/actions/news-actions"
import { EnhancedFormModal } from "@/components/ui/enhanced-form-modal"
import { EnhancedImageUpload } from "@/components/ui/enhanced-image-upload"
import { EnhancedFormField } from "@/components/ui/enhanced-form-field"
import { EnhancedDeleteConfirmation } from "@/components/ui/enhanced-delete-confirmation"
import { EnhancedMessage } from "@/components/ui/enhanced-success-message"
import Image from "next/image"

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<{
    type: 'news' | 'subscription'
    id: number
    name: string
  } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // بيانات النموذج
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    publishDate: new Date().toISOString().split("T")[0],
    image: null as File | null,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

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
      setMessage({ type: "error", text: "حدث خطأ أثناء تحميل البيانات" })
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      errors.title = "عنوان الخبر مطلوب"
    }
    
    if (!formData.description.trim()) {
      errors.description = "وصف الخبر مطلوب"
    }
    
    if (!formData.image) {
      errors.image = "صورة الخبر مطلوبة"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleDeleteSubscription = async (id: number) => {
    setIsDeleting(true)
    try {
      const result = await deleteSubscription(id)
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        setSubscriptions(subscriptions.filter((sub) => sub.id !== id))
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "حدث خطأ أثناء الحذف" })
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirmation(null)
    }
  }

  const handleDeleteNews = async (id: number) => {
    setIsDeleting(true)
    try {
      const result = await deleteNews(id)
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        setNews(news.filter((item) => item.id !== id))
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "حدث خطأ أثناء الحذف" })
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirmation(null)
    }
  }

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsAddingNews(true)
    const submitFormData = new FormData()
    submitFormData.append("title", formData.title)
    submitFormData.append("description", formData.description)
    submitFormData.append("publishDate", formData.publishDate)
    if (formData.image) {
      submitFormData.append("image", formData.image)
    }

    try {
      const result = await addNews(submitFormData)
      if (result.success) {
        setMessage({ type: "success", text: result.message })
        setShowAddNewsDialog(false)
        resetForm()
        loadData()
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "حدث خطأ أثناء إضافة الخبر" })
    } finally {
      setIsAddingNews(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      publishDate: new Date().toISOString().split("T")[0],
      image: null,
    })
    setFormErrors({})
  }

  const handleConfirmDelete = () => {
    if (!showDeleteConfirmation) return
    
    if (showDeleteConfirmation.type === 'subscription') {
      handleDeleteSubscription(showDeleteConfirmation.id)
    } else {
      handleDeleteNews(showDeleteConfirmation.id)
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

      {/* Enhanced Message Display */}
      {message && (
        <div className="mb-6">
          <EnhancedMessage
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        </div>
      )}

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
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
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
                          onClick={() => setShowDeleteConfirmation({
                            type: 'subscription',
                            id: subscription.id,
                            name: subscription.email
                          })}
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
              <Button 
                className="bg-academy-blue hover:bg-academy-blue/90"
                onClick={() => {
                  resetForm()
                  setShowAddNewsDialog(true)
                }}
              >
                <Plus className="w-4 h-4 ml-2" />
                إنشاء خبر
              </Button>
            </CardHeader>
            <CardContent>
              {news.length === 0 ? (
                <div className="text-center py-8 text-gray-500">لا توجد أخبار منشورة حالياً</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.map((newsItem) => (
                    <Card key={newsItem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video">
                        <Image
                          src={newsItem.image_url || "/placeholder.svg"}
                          alt={newsItem.title}
                          fill
                          className="object-contain bg-gray-50"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => setShowDeleteConfirmation({
                              type: 'news',
                              id: newsItem.id,
                              name: newsItem.title
                            })}
                          >
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

      {/* Enhanced Add News Modal */}
      <EnhancedFormModal
        isOpen={showAddNewsDialog}
        onClose={() => setShowAddNewsDialog(false)}
        title="إضافة خبر جديد"
        size="lg"
      >
        <form onSubmit={handleAddNews} className="space-y-6">
          <EnhancedImageUpload
            onImageChange={(file) => {
              setFormData({ ...formData, image: file })
              if (formErrors.image) {
                setFormErrors({ ...formErrors, image: "" })
              }
            }}
            label="صورة الخبر"
            required
            error={formErrors.image}
          />

          <EnhancedFormField
            type="input"
            label="عنوان الخبر"
            placeholder="أدخل عنوان الخبر"
            value={formData.title}
            onChange={(value) => {
              setFormData({ ...formData, title: value })
              if (formErrors.title) {
                setFormErrors({ ...formErrors, title: "" })
              }
            }}
            required
            error={formErrors.title}
          />

          <EnhancedFormField
            type="textarea"
            label="الوصف"
            placeholder="أدخل وصف الخبر"
            value={formData.description}
            onChange={(value) => {
              setFormData({ ...formData, description: value })
              if (formErrors.description) {
                setFormErrors({ ...formErrors, description: "" })
              }
            }}
            rows={4}
            required
            error={formErrors.description}
          />

          <EnhancedFormField
            type="input"
            inputType="date"
            label="تاريخ النشر"
            value={formData.publishDate}
            onChange={(value) => setFormData({ ...formData, publishDate: value })}
            required
          />

          <div className="flex flex-col gap-3 pt-6 border-t">
            <Button
              type="submit"
              disabled={isAddingNews}
              className="w-full bg-academy-blue hover:bg-academy-blue/90 h-12"
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
              className="w-full h-12"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </EnhancedFormModal>

      {/* Enhanced Delete Confirmation */}
      <EnhancedDeleteConfirmation
        isOpen={!!showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(null)}
        onConfirm={handleConfirmDelete}
        itemName={showDeleteConfirmation?.name}
        isLoading={isDeleting}
      />
    </div>
  )
}
