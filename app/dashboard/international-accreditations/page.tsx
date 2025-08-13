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
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-academy-blue">العنوان</label>
        <Input
          name="title"
          defaultValue={initialData?.title || ""}
          placeholder="أدخل عنوان الاعتماد"
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-academy-blue">الوصف</label>
        <Textarea
          name="description"
          defaultValue={initialData?.description || ""}
          placeholder="أدخل وصف الاعتماد"
          required
          rows={4}
          className="w-full resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-academy-blue">صورة الاعتماد</label>
        <div className="border-2 border-dashed border-academy-blue/30 rounded-lg p-6 text-center hover:border-academy-blue/50 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-academy-blue/50 mb-4" />
          <Input type="file" name="image" accept="image/*" required={!initialData} className="w-full" />
          <p className="text-sm text-academy-dark-gray mt-2">
            {initialData ? "اختر صورة جديدة (اختياري)" : "اختر صورة الاعتماد"}
          </p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-academy-blue hover:bg-blue-700 text-white">
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
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-academy-gray to-white p-6">
      <div className="container mx-auto">
        <div className="h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mb-6"></div>
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-academy-blue mb-2">إدارة الاعتمادات الدولية</h1>
              <p className="text-academy-dark-gray">إدارة وتحديث الاعتمادات الدولية للأكاديمية</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-academy-gold hover:bg-yellow-500 text-academy-blue font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة اعتماد جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-academy-blue">إضافة اعتماد دولي جديد</DialogTitle>
                </DialogHeader>
                <AccreditationForm onSubmit={handleAdd} formRef={addFormRef} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {message && (
          <Alert
            className={`mb-6 ${message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-academy-blue/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-academy-dark-gray">إجمالي الاعتمادات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-academy-blue">{accreditations.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-academy-blue/20">
          <CardHeader>
            <CardTitle className="text-academy-blue">الاعتمادات الدولية</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-academy-blue" />
                <span className="mr-2 text-academy-dark-gray">جاري التحميل...</span>
              </div>
            ) : accreditations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-academy-dark-gray">لا توجد اعتمادات دولية</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accreditations.map((accreditation) => (
                  <Card
                    key={accreditation.id}
                    className="group hover:shadow-lg transition-all duration-300 border-academy-blue/10"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={accreditation.image_url || "/placeholder.svg"}
                          alt={accreditation.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/international-accreditation-certificate.png"
                          }}
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white text-academy-blue"
                            onClick={() => {
                              setEditingAccreditation(accreditation)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-500/90 hover:bg-red-600 text-white"
                            onClick={() => handleDelete(accreditation.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-academy-blue mb-2 line-clamp-2">{accreditation.title}</h3>
                        <p className="text-sm text-academy-dark-gray line-clamp-3 mb-3">{accreditation.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {new Date(accreditation.created_at).toLocaleDateString("ar-SA")}
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-academy-blue">تعديل الاعتماد الدولي</DialogTitle>
            </DialogHeader>
            {editingAccreditation && <AccreditationForm onSubmit={handleEdit} initialData={editingAccreditation} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
