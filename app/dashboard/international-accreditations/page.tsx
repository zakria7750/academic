"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Upload, CheckCircle, XCircle, Loader2 } from "lucide-react"
import {
  getAllInternationalAccreditations,
  addInternationalAccreditation,
  updateInternationalAccreditation,
  deleteInternationalAccreditation,
  type InternationalAccreditation,
} from "@/app/actions/international-accreditations-actions"

export default function InternationalAccreditationsManagement() {
  const [accreditations, setAccreditations] = useState<InternationalAccreditation[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingAccreditation, setEditingAccreditation] = useState<InternationalAccreditation | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const addFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    loadAccreditations()
  }, [])

  const loadAccreditations = async () => {
    setLoading(true)
    const result = await getAllInternationalAccreditations()
    if (result.success) {
      setAccreditations(result.data)
    }
    setLoading(false)
  }

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const result = await addInternationalAccreditation(formData)

    if (result.success) {
      setMessage({ type: "success", text: "تم إضافة الاعتماد بنجاح!" })
      setIsAddDialogOpen(false)
      loadAccreditations()
      if (addFormRef.current) {
        addFormRef.current.reset()
      }
    } else {
      setMessage({ type: "error", text: result.error || "حدث خطأ في إضافة الاعتماد" })
    }

    setIsSubmitting(false)
    setTimeout(() => setMessage(null), 5000)
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingAccreditation || isSubmitting) return

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const result = await updateInternationalAccreditation(editingAccreditation.id, formData)

    if (result.success) {
      setMessage({ type: "success", text: "تم تحديث الاعتماد بنجاح!" })
      setIsEditDialogOpen(false)
      setEditingAccreditation(null)
      loadAccreditations()
    } else {
      setMessage({ type: "error", text: result.error || "حدث خطأ في تحديث الاعتماد" })
    }

    setIsSubmitting(false)
    setTimeout(() => setMessage(null), 5000)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الاعتماد؟")) return

    const result = await deleteInternationalAccreditation(id)

    if (result.success) {
      setMessage({ type: "success", text: "تم حذف الاعتماد بنجاح!" })
      loadAccreditations()
    } else {
      setMessage({ type: "error", text: result.error || "حدث خطأ في حذف الاعتماد" })
    }

    setTimeout(() => setMessage(null), 5000)
  }

  const AccreditationForm = ({
    onSubmit,
    initialData = null,
    formRef = null,
  }: {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    initialData?: InternationalAccreditation | null
    formRef?: React.RefObject<HTMLFormElement> | null
  }) => (
    <div className="bg-white p-6 rounded-lg">
      <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-bold text-academy-blue">العنوان</label>
          <Input
            name="title"
            defaultValue={initialData?.title || ""}
            placeholder="أدخل عنوان الاعتماد"
            required
            className="w-full h-12 border-2 border-academy-gold/30 focus:border-academy-gold bg-white text-academy-blue font-medium rounded-xl"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-academy-blue">الوصف</label>
          <Textarea
            name="description"
            defaultValue={initialData?.description || ""}
            placeholder="أدخل وصف الاعتماد"
            required
            rows={4}
            className="w-full resize-none border-2 border-academy-gold/30 focus:border-academy-gold bg-white text-academy-blue font-medium rounded-xl"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-academy-blue">صورة الاعتماد</label>
          <div className="border-2 border-dashed border-academy-gold rounded-xl p-6 text-center bg-academy-gold/5 hover:bg-academy-gold/10 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-academy-gold mb-4" />
            <Input 
              type="file" 
              name="image" 
              accept="image/*" 
              required={!initialData} 
              className="w-full border-academy-gold/30 focus:border-academy-gold bg-white" 
            />
            <p className="text-sm text-academy-blue font-medium mt-3">
              {initialData ? "اختر صورة جديدة (اختياري)" : "اختر صورة الاعتماد"}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              if (initialData) {
                setIsEditDialogOpen(false)
              } else {
                setIsAddDialogOpen(false)
              }
            }}
            className="flex-1 border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white rounded-xl"
          >
            إلغاء
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="flex-1 bg-academy-gold hover:bg-academy-gold-dark text-academy-blue font-bold rounded-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                جاري المعالجة...
              </>
            ) : initialData ? (
              "تحديث الاعتماد"
            ) : (
              "إضافة الاعتماد"
            )}
          </Button>
        </div>
      </form>
    </div>
  )

  return (
    <div className="min-h-screen bg-academy-gray">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-academy-blue mb-2">إدارة الاعتمادات الدولية</h1>
              <p className="text-academy-dark-gray">إدارة وتحديث الاعتمادات الدولية للأكاديمية</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-academy-gold hover:bg-academy-gold-dark text-academy-blue font-bold px-6 py-3 rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة اعتماد جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg border-0">
                <DialogHeader className="border-b border-gray-200 pb-4 bg-white">
                  <DialogTitle className="text-xl text-academy-blue font-bold">إضافة اعتماد دولي جديد</DialogTitle>
                </DialogHeader>
                <AccreditationForm onSubmit={handleAdd} formRef={addFormRef} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {message && (
          <Alert
            className={`mb-6 rounded-xl ${message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-800 font-medium" : "text-red-800 font-medium"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-academy-blue to-academy-blue-light text-white shadow-lg rounded-2xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-academy-gold-200">إجمالي الاعتمادات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{accreditations.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-academy-blue text-xl font-bold">الاعتمادات الدولية</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-academy-gold mr-3" />
                <span className="text-academy-blue font-medium">جاري التحميل...</span>
              </div>
            ) : accreditations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-academy-gold" />
                </div>
                <p className="text-academy-blue font-bold text-lg mb-2">لا توجد اعتمادات دولية</p>
                <p className="text-academy-dark-gray">ابدأ بإضافة أول اعتماد دولي للأكاديمية</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accreditations.map((accreditation) => (
                  <Card
                    key={accreditation.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={accreditation.image_url || "/placeholder.svg"}
                          alt={accreditation.title}
                          className="w-full h-48 object-contain bg-white"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/international-accreditation-certificate.png"
                          }}
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/95 hover:bg-white text-academy-blue border-0 shadow-lg rounded-xl"
                            onClick={() => {
                              setEditingAccreditation(accreditation)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500/95 hover:bg-red-600 text-white border-0 shadow-lg rounded-xl"
                            onClick={() => handleDelete(accreditation.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-academy-blue mb-3 line-clamp-2 text-lg leading-tight">
                          {accreditation.title}
                        </h3>
                        <p className="text-sm text-academy-dark-gray line-clamp-3 mb-4 leading-relaxed">
                          {accreditation.description}
                        </p>
                        <Badge className="bg-academy-gold/20 text-academy-blue border-academy-gold/30 hover:bg-academy-gold/30 rounded-lg px-3 py-1 font-medium">
                          {new Date(accreditation.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg border-0">
            <DialogHeader className="border-b border-gray-200 pb-4 bg-white">
              <DialogTitle className="text-xl text-academy-blue font-bold">تعديل الاعتماد الدولي</DialogTitle>
            </DialogHeader>
            {editingAccreditation && <AccreditationForm onSubmit={handleEdit} initialData={editingAccreditation} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
