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
import { Plus, Edit, Trash2, Upload, CheckCircle, XCircle, Loader2, Calendar, Award } from "lucide-react"
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
      <div className="space-y-3">
        <label className="text-sm font-semibold text-academy-blue flex items-center gap-2">
          <Award className="w-4 h-4" />
          عنوان الاعتماد
        </label>
        <Input
          name="title"
          defaultValue={initialData?.title || ""}
          placeholder="أدخل عنوان الاعتماد"
          required
          className="w-full border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-academy-blue flex items-center gap-2">
          <Award className="w-4 h-4" />
          وصف الاعتماد
        </label>
        <Textarea
          name="description"
          defaultValue={initialData?.description || ""}
          placeholder="أدخل وصف الاعتماد"
          required
          rows={4}
          className="w-full resize-none border-2 border-academy-blue/20 focus:border-academy-blue focus:ring-2 focus:ring-academy-blue/20 rounded-xl transition-all duration-300 bg-white"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-academy-blue flex items-center gap-2">
          <Upload className="w-4 h-4" />
          صورة الاعتماد
        </label>
        <div className="border-2 border-dashed border-academy-blue/30 rounded-2xl p-8 text-center hover:border-academy-blue/50 transition-all duration-300 bg-gradient-to-br from-academy-blue-50/50 to-academy-gold-50/30">
          <Upload className="mx-auto h-16 w-16 text-academy-blue/60 mb-4" />
          <Input 
            type="file" 
            name="image" 
            accept="image/*" 
            required={!initialData} 
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-academy-blue file:text-white hover:file:bg-academy-blue-700 transition-colors" 
          />
          <p className="text-sm text-academy-dark-gray mt-3">
            {initialData ? "اختر صورة جديدة (اختياري)" : "اختر صورة الاعتماد"}
          </p>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="flex-1 bg-gradient-to-r from-academy-blue to-academy-blue-700 hover:from-academy-blue-700 hover:to-academy-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray via-white to-academy-blue-50/30 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="text-center sm:text-right">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-academy-blue to-academy-blue-700 bg-clip-text text-transparent mb-3">
                إدارة الاعتمادات الدولية
              </h1>
              <p className="text-lg text-academy-dark-gray">إدارة وتحديث الاعتمادات الدولية للأكاديمية</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-academy-gold to-academy-gold-light hover:from-academy-gold-dark hover:to-academy-gold text-academy-blue font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-academy-gold-dark/20">
                  <Plus className="w-5 h-5 mr-2" />
                  إضافة اعتماد جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-2 border-academy-blue/10 shadow-2xl">
                <DialogHeader className="text-center">
                  <DialogTitle className="text-2xl font-bold text-academy-blue">إضافة اعتماد دولي جديد</DialogTitle>
                </DialogHeader>
                <AccreditationForm onSubmit={handleAdd} formRef={addFormRef} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {message && (
          <Alert
            className={`mb-8 rounded-2xl border-2 ${
              message.type === "success" 
                ? "border-green-500 bg-gradient-to-r from-green-50 to-green-100" 
                : "border-red-500 bg-gradient-to-r from-red-50 to-red-100"
            } shadow-lg`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <AlertDescription className={`text-lg font-medium ${
              message.type === "success" ? "text-green-800" : "text-red-800"
            }`}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-academy-blue to-academy-blue-700 text-white border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="pb-3 text-center">
              <CardTitle className="text-lg font-medium text-academy-gold-100">إجمالي الاعتمادات</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-academy-gold">{accreditations.length}</div>
              <p className="text-academy-blue-100 mt-2">اعتماد دولي</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-academy-blue flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-academy-gold" />
              الاعتمادات الدولية
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-academy-blue mx-auto mb-4" />
                  <span className="text-lg text-academy-dark-gray">جاري التحميل...</span>
                </div>
              </div>
            ) : accreditations.length === 0 ? (
              <div className="text-center py-16">
                <Award className="w-16 h-16 text-academy-blue/40 mx-auto mb-4" />
                <p className="text-xl text-academy-dark-gray">لا توجد اعتمادات دولية</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accreditations.map((accreditation) => (
                  <Card
                    key={accreditation.id}
                    className="group bg-white border-2 border-academy-blue/10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-academy-gold to-academy-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={accreditation.image_url || "/placeholder.svg"}
                          alt={accreditation.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/international-accreditation-certificate.png"
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/95 hover:bg-white text-academy-blue border-2 border-academy-blue/20 hover:border-academy-blue rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                            className="bg-red-500/95 hover:bg-red-600 text-white border-2 border-red-500/20 hover:border-red-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            onClick={() => handleDelete(accreditation.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-academy-blue mb-3 line-clamp-2 group-hover:text-academy-blue-700 transition-colors duration-300">
                          {accreditation.title}
                        </h3>
                        <p className="text-sm text-academy-dark-gray line-clamp-3 mb-4 leading-relaxed">
                          {accreditation.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className="text-xs bg-academy-gold-50 text-academy-blue border-academy-gold/30 rounded-full px-3 py-1 flex items-center gap-1"
                          >
                            <Calendar className="w-3 h-3" />
                            {new Date(accreditation.created_at).toLocaleDateString("ar-SA")}
                          </Badge>
                          
                          <div className="w-3 h-3 bg-academy-gold rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-2 border-academy-blue/10 shadow-2xl">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold text-academy-blue">تعديل الاعتماد الدولي</DialogTitle>
            </DialogHeader>
            {editingAccreditation && <AccreditationForm onSubmit={handleEdit} initialData={editingAccreditation} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
