"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  type Graduate,
  type GraduateApplication,
  addGraduate,
  updateGraduate,
  deleteGraduate,
  processGraduateApplication,
} from "@/app/actions/graduates-actions"
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Calendar,
  Briefcase,
  Award,
} from "lucide-react"

interface GraduatesManagementProps {
  initialGraduates: Graduate[]
  initialApplications: GraduateApplication[]
}

export function GraduatesManagement({ initialGraduates, initialApplications }: GraduatesManagementProps) {
  const [graduates, setGraduates] = useState(initialGraduates || [])
  const [applications, setApplications] = useState(initialApplications || [])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingGraduate, setEditingGraduate] = useState<Graduate | null>(null)
  const [processingApplication, setProcessingApplication] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log("[v0] GraduatesManagement initialized with:", {
      graduatesCount: initialGraduates?.length || 0,
      applicationsCount: initialApplications?.length || 0,
    })
  }, [initialGraduates, initialApplications])

  // إعادة تحميل البيانات عند تحديث الطلبات
  useEffect(() => {
    if (message?.type === "success") {
      // إعادة تحميل الصفحة بعد 2 ثانية من نجاح العملية
      const timer = setTimeout(() => {
        window.location.reload()
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [message])

  const pendingApplications = applications?.filter((app) => app.status === "pending") || []
  const processedApplications = applications?.filter((app) => app.status !== "pending") || []

  async function handleAddGraduate(formData: FormData) {
    try {
      setIsLoading(true)
      console.log("[v0] Adding graduate...")
      const result = await addGraduate(formData)
      if (result.success) {
        setMessage({ type: "success", text: "تم إضافة الخريج بنجاح" })
        setIsAddDialogOpen(false)
        const newGraduate: Graduate = {
          id: result.id,
          name: formData.get("name") as string,
          specialization: formData.get("specialization") as string,
          current_position: formData.get("current_position") as string,
          success_story: formData.get("success_story") as string,
          country: formData.get("country") as string,
          graduation_year: Number.parseInt(formData.get("graduation_year") as string),
          created_at: new Date().toISOString(),
        }
        setGraduates((prev) => [...prev, newGraduate])
      } else {
        setMessage({ type: "error", text: result.error || "حدث خطأ" })
      }
    } catch (error) {
      console.error("[v0] Error adding graduate:", error)
      setMessage({ type: "error", text: "حدث خطأ في الاتصال" })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateGraduate(formData: FormData) {
    if (!editingGraduate) return

    try {
      setIsLoading(true)
      console.log("[v0] Updating graduate:", editingGraduate.id)
      const result = await updateGraduate(editingGraduate.id, formData)
      if (result.success) {
        setMessage({ type: "success", text: "تم تحديث الخريج بنجاح" })
        setEditingGraduate(null)
        const updatedGraduate: Graduate = {
          id: editingGraduate.id,
          name: formData.get("name") as string,
          specialization: formData.get("specialization") as string,
          current_position: formData.get("current_position") as string,
          success_story: formData.get("success_story") as string,
          country: formData.get("country") as string,
          graduation_year: Number.parseInt(formData.get("graduation_year") as string),
          created_at: editingGraduate.created_at,
        }
        setGraduates((prev) => prev.map((g) => (g.id === editingGraduate.id ? updatedGraduate : g)))
      } else {
        setMessage({ type: "error", text: result.error || "حدث خطأ" })
      }
    } catch (error) {
      console.error("[v0] Error updating graduate:", error)
      setMessage({ type: "error", text: "حدث خطأ في الاتصال" })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteGraduate(id: number) {
    if (confirm("هل أنت متأكد من حذف هذا الخريج؟")) {
      try {
        setIsLoading(true)
        console.log("[v0] Deleting graduate:", id)
        const result = await deleteGraduate(id)
        if (result.success) {
          setMessage({ type: "success", text: "تم حذف الخريج بنجاح" })
          setGraduates(graduates.filter((g) => g.id !== id))
        } else {
          setMessage({ type: "error", text: result.error || "حدث خطأ" })
        }
      } catch (error) {
        console.error("[v0] Error deleting graduate:", error)
        setMessage({ type: "error", text: "حدث خطأ في الاتصال" })
      } finally {
        setIsLoading(false)
      }
    }
  }

  async function handleProcessApplication(id: number, action: "approve" | "reject", adminMessage: string) {
    setProcessingApplication(id)

    try {
      console.log("[v0] Processing application:", { id, action, adminMessage })
      const result = await processGraduateApplication(id, action, adminMessage)

      if (result.success) {
        setMessage({
          type: "success",
          text: action === "approve" ? "تم قبول الطلب بنجاح" : "تم رفض الطلب",
        })

        setApplications((prevApps) =>
          prevApps.map((app) =>
            app.id === id ? { ...app, status: action === "approve" ? "approved" : "rejected" } : app,
          ),
        )

        if (action === "approve") {
          const approvedApp = applications.find((app) => app.id === id)
          if (approvedApp) {
            const newGraduate: Graduate = {
              id: Date.now(), // Temporary ID, will be replaced by server
              name: approvedApp.name,
              specialization: approvedApp.specialization,
              current_position: approvedApp.current_position,
              success_story: approvedApp.success_story,
              country: approvedApp.country,
              graduation_year: approvedApp.graduation_year,
              created_at: new Date().toISOString(),
            }
            setGraduates((prev) => [...prev, newGraduate])
          }
        }
      } else {
        setMessage({ type: "error", text: result.error || "حدث خطأ" })
      }
    } catch (error) {
      console.error("[v0] Error processing application:", error)
      setMessage({ type: "error", text: "حدث خطأ في الاتصال" })
    }

    setProcessingApplication(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-blue mx-auto mb-4"></div>
          <p className="text-academy-dark-gray">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {message && (
        <Alert
          className={`${
            message.type === "success"
              ? "border-green-200 bg-gradient-to-r from-green-50 to-green-100/50 shadow-lg"
              : "border-red-200 bg-gradient-to-r from-red-50 to-red-100/50 shadow-lg"
          } rounded-xl border-l-4 ${message.type === "success" ? "border-l-green-500" : "border-l-red-500"}`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <AlertDescription className={`${message.type === "success" ? "text-green-800" : "text-red-800"} font-medium`}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="graduates" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-academy-gray/30 rounded-2xl p-2 h-auto">
          <TabsTrigger
            value="graduates"
            className="flex items-center gap-3 text-base font-semibold py-4 px-6 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-academy-blue transition-all duration-300"
          >
            <div className="w-10 h-10 bg-academy-blue/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-academy-blue" />
            </div>
            <div className="text-right">
              <div className="text-sm font-bold">الخريجون المعتمدون</div>
              <div className="text-xs text-academy-dark-gray">({graduates?.length || 0}) خريج</div>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="applications"
            className="flex items-center gap-3 text-base font-semibold py-4 px-6 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-academy-blue transition-all duration-300"
          >
            <div className="w-10 h-10 bg-academy-gold/10 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-academy-gold" />
            </div>
            <div className="text-right">
              <div className="text-sm font-bold">طلبات التقديم</div>
              <div className="text-xs text-academy-dark-gray">({pendingApplications?.length || 0}) طلب معلق</div>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="graduates" className="space-y-8 mt-8">
          <div className="flex justify-between items-center bg-gradient-to-r from-academy-blue/5 to-academy-blue/10 rounded-2xl p-6">
            <div>
              <h2 className="text-3xl font-bold text-academy-blue mb-2">الخريجون المعتمدون</h2>
              <p className="text-academy-dark-gray">إدارة بيانات الخريجين المتميزين وقصص نجاحهم</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-academy-blue to-academy-blue-600 hover:from-academy-blue-600 hover:to-academy-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Plus className="w-5 h-5 ml-2" />
                  إضافة خريج جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
                <DialogHeader className="text-center pb-4">
                  <DialogTitle className="text-2xl font-bold text-academy-blue">إضافة خريج جديد</DialogTitle>
                  <p className="text-academy-dark-gray mt-2">إضافة خريج متميز إلى شبكة الخريجين</p>
                </DialogHeader>
                <GraduateForm onSubmit={handleAddGraduate} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graduates?.map((graduate) => (
              <Card
                key={graduate.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden rounded-3xl relative"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-academy-gold/20 to-academy-blue/20 rounded-bl-3xl"></div>
                <CardHeader className="pb-4 relative">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-academy-blue mb-2 group-hover:text-academy-gold transition-colors duration-300">
                        {graduate.name}
                      </CardTitle>
                      <div className="bg-gradient-to-r from-academy-blue/10 to-academy-blue/5 text-academy-blue px-3 py-1 rounded-full text-sm font-medium inline-block">
                        {graduate.specialization}
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingGraduate(graduate)}
                        className="h-9 w-9 p-0 border-academy-blue/20 hover:border-academy-blue hover:bg-academy-blue hover:text-white rounded-xl transition-all duration-300"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteGraduate(graduate.id)}
                        className="h-9 w-9 p-0 border-red-200 hover:border-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center text-academy-dark-gray bg-academy-gray/20 rounded-xl p-3">
                    <div className="w-8 h-8 bg-academy-blue/10 rounded-lg flex items-center justify-center ml-3 flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-academy-blue" />
                    </div>
                    <span className="font-medium text-sm">{graduate.current_position}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-academy-dark-gray">
                      <div className="w-7 h-7 bg-academy-gold/10 rounded-lg flex items-center justify-center ml-2">
                        <MapPin className="w-3 h-3 text-academy-gold" />
                      </div>
                      <span className="text-sm font-medium">{graduate.country}</span>
                    </div>
                    <div className="flex items-center text-academy-dark-gray">
                      <div className="w-7 h-7 bg-academy-blue/10 rounded-lg flex items-center justify-center ml-2">
                        <Calendar className="w-3 h-3 text-academy-blue" />
                      </div>
                      <span className="text-sm font-medium">{graduate.graduation_year}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-academy-gray/10 to-academy-gray/5 rounded-xl p-4">
                    <p className="text-sm text-academy-dark-gray leading-relaxed line-clamp-3">
                      {graduate.success_story}
                    </p>
                  </div>
                </CardContent>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-academy-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </Card>
            )) || (
              <div className="col-span-full text-center py-8">
                <p className="text-academy-dark-gray">لا توجد خريجين مضافين حالياً</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-8 mt-8">
          <div className="bg-gradient-to-r from-academy-gold/5 to-academy-gold/10 rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-academy-blue mb-2">طلبات التقديم</h2>
            <p className="text-academy-dark-gray">مراجعة ومعالجة طلبات الانضمام إلى شبكة الخريجين</p>
          </div>

          <div className="space-y-4">
            {pendingApplications && pendingApplications.length > 0 ? (
              pendingApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onProcess={handleProcessApplication}
                  isProcessing={processingApplication === application.id}
                />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-academy-dark-gray">لا توجد طلبات معلقة حالياً</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingGraduate} onOpenChange={() => setEditingGraduate(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader className="text-center pb-4">
            <DialogTitle className="text-2xl font-bold text-academy-blue">تعديل بيانات الخريج</DialogTitle>
            <p className="text-academy-dark-gray mt-2">تحديث معلومات الخريج وقصة نجاحه</p>
          </DialogHeader>
          {editingGraduate && <GraduateForm onSubmit={handleUpdateGraduate} initialData={editingGraduate} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function GraduateForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (formData: FormData) => void
  initialData?: Graduate
}) {
  return (
    <form action={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-base font-semibold text-academy-blue flex items-center">
            <Users className="w-4 h-4 ml-2" />
            الاسم الكامل
          </Label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={initialData?.name}
            className="rounded-xl border-academy-blue/20 focus:border-academy-blue"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="specialization" className="text-base font-semibold text-academy-blue flex items-center">
            <Award className="w-4 h-4 ml-2" />
            التخصص
          </Label>
          <Input
            id="specialization"
            name="specialization"
            required
            defaultValue={initialData?.specialization}
            className="rounded-xl border-academy-blue/20 focus:border-academy-blue"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="current_position" className="text-base font-semibold text-academy-blue flex items-center">
          <Briefcase className="w-4 h-4 ml-2" />
          المنصب الحالي
        </Label>
        <Input
          id="current_position"
          name="current_position"
          required
          defaultValue={initialData?.current_position}
          className="rounded-xl border-academy-blue/20 focus:border-academy-blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="country" className="text-base font-semibold text-academy-blue flex items-center">
            <MapPin className="w-4 h-4 ml-2" />
            البلد
          </Label>
          <Input
            id="country"
            name="country"
            required
            defaultValue={initialData?.country}
            className="rounded-xl border-academy-blue/20 focus:border-academy-blue"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="graduation_year" className="text-base font-semibold text-academy-blue flex items-center">
            <Calendar className="w-4 h-4 ml-2" />
            سنة التخرج
          </Label>
          <Input
            id="graduation_year"
            name="graduation_year"
            type="number"
            required
            defaultValue={initialData?.graduation_year}
            className="rounded-xl border-academy-blue/20 focus:border-academy-blue"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="success_story" className="text-base font-semibold text-academy-blue flex items-center">
          <CheckCircle className="w-4 h-4 ml-2" />
          قصة النجاح
        </Label>
        <Textarea
          id="success_story"
          name="success_story"
          rows={5}
          required
          defaultValue={initialData?.success_story}
          className="rounded-xl border-academy-blue/20 focus:border-academy-blue min-h-[120px]"
          placeholder="اكتب قصة نجاح ملهمة تعكس إنجازات الخريج..."
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-academy-blue to-academy-blue-600 hover:from-academy-blue-600 hover:to-academy-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        {initialData ? (
          <>
            <Edit className="w-5 h-5 ml-2" />
            تحديث بيانات الخريج
          </>
        ) : (
          <>
            <Plus className="w-5 h-5 ml-2" />
            إضافة خريج جديد
          </>
        )}
      </Button>
    </form>
  )
}

function ApplicationCard({
  application,
  onProcess,
  isProcessing,
}: {
  application: GraduateApplication
  onProcess: (id: number, action: "approve" | "reject", message: string) => void
  isProcessing: boolean
}) {
  const [showProcessDialog, setShowProcessDialog] = useState<"approve" | "reject" | null>(null)
  const [adminMessage, setAdminMessage] = useState("")

  function handleProcess(action: "approve" | "reject") {
    onProcess(application.id, action, adminMessage)
    setShowProcessDialog(null)
    setAdminMessage("")
  }

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-gradient-to-r from-white to-academy-gold/5 relative">
      <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-academy-gold to-academy-gold-600"></div>
      <CardHeader className="bg-gradient-to-r from-academy-gold/5 to-academy-gold/10 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-academy-gold to-academy-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {application.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-academy-blue mb-1">{application.name}</CardTitle>
              <p className="text-sm text-academy-dark-gray font-medium">{application.email}</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-academy-gold to-academy-gold-600 text-academy-blue font-bold px-3 py-1 rounded-full">
            <Clock className="w-3 h-3 ml-1" />
            معلق
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-academy-blue/5 rounded-xl p-4">
            <span className="font-bold text-academy-blue text-sm block mb-2 flex items-center">
              <div className="w-6 h-6 bg-academy-blue/10 rounded-lg flex items-center justify-center ml-2">
                <Users className="w-3 h-3 text-academy-blue" />
              </div>
              التخصص
            </span>
            <p className="font-medium text-academy-dark-gray">{application.specialization}</p>
          </div>
          <div className="bg-academy-gold/5 rounded-xl p-4">
            <span className="font-bold text-academy-blue text-sm block mb-2 flex items-center">
              <div className="w-6 h-6 bg-academy-gold/10 rounded-lg flex items-center justify-center ml-2">
                <Briefcase className="w-3 h-3 text-academy-gold" />
              </div>
              المنصب الحالي
            </span>
            <p className="font-medium text-academy-dark-gray">{application.current_position}</p>
          </div>
          <div className="bg-academy-blue/5 rounded-xl p-4">
            <span className="font-bold text-academy-blue text-sm block mb-2 flex items-center">
              <div className="w-6 h-6 bg-academy-blue/10 rounded-lg flex items-center justify-center ml-2">
                <MapPin className="w-3 h-3 text-academy-blue" />
              </div>
              البلد
            </span>
            <p className="font-medium text-academy-dark-gray">{application.country}</p>
          </div>
          <div className="bg-academy-gold/5 rounded-xl p-4">
            <span className="font-bold text-academy-blue text-sm block mb-2 flex items-center">
              <div className="w-6 h-6 bg-academy-gold/10 rounded-lg flex items-center justify-center ml-2">
                <Calendar className="w-3 h-3 text-academy-gold" />
              </div>
              سنة التخرج
            </span>
            <p className="font-medium text-academy-dark-gray">{application.graduation_year}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-academy-gray/10 to-academy-gray/5 rounded-xl p-4">
          <span className="font-bold text-academy-blue text-sm block mb-3 flex items-center">
            <div className="w-6 h-6 bg-academy-blue/10 rounded-lg flex items-center justify-center ml-2">
              <Award className="w-3 h-3 text-academy-blue" />
            </div>
            قصة النجاح
          </span>
          <p className="text-sm text-academy-dark-gray leading-relaxed">{application.success_story}</p>
        </div>

        <div className="flex gap-4 pt-2">
          <Dialog open={showProcessDialog === "approve"} onOpenChange={() => setShowProcessDialog(null)}>
            <DialogTrigger asChild>
              <Button
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                disabled={isProcessing}
                onClick={() => setShowProcessDialog("approve")}
              >
                <CheckCircle className="w-5 h-5 ml-2" />
                قبول الطلب
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader className="text-center pb-4">
                <DialogTitle className="text-2xl font-bold text-green-600">قبول الطلب</DialogTitle>
                <p className="text-academy-dark-gray mt-2">إضافة المتقدم إلى شبكة الخريجين</p>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="approve-message" className="text-base font-semibold text-academy-blue">
                    رسالة ترحيب للخريج الجديد (اختيارية)
                  </Label>
                  <Textarea
                    id="approve-message"
                    value={adminMessage}
                    onChange={(e) => setAdminMessage(e.target.value)}
                    placeholder="مرحباً بك في شبكة خريجي أكاديمية المعرفة الدولية..."
                    className="mt-3 min-h-[100px] rounded-xl"
                  />
                </div>
                <Button
                  onClick={() => handleProcess("approve")}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-xl shadow-lg"
                >
                  <CheckCircle className="w-5 h-5 ml-2" />
                  تأكيد القبول
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showProcessDialog === "reject"} onOpenChange={() => setShowProcessDialog(null)}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 border-2 border-red-500 text-red-600 hover:bg-red-50 bg-transparent font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                disabled={isProcessing}
                onClick={() => setShowProcessDialog("reject")}
              >
                <XCircle className="w-5 h-5 ml-2" />
                رفض الطلب
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader className="text-center pb-4">
                <DialogTitle className="text-2xl font-bold text-red-600">رفض الطلب</DialogTitle>
                <p className="text-academy-dark-gray mt-2">يرجى توضيح أسباب عدم قبول الطلب</p>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="reject-message" className="text-base font-semibold text-academy-blue">
                    سبب الرفض
                  </Label>
                  <Textarea
                    id="reject-message"
                    value={adminMessage}
                    onChange={(e) => setAdminMessage(e.target.value)}
                    placeholder="نأسف لعدم قبول طلبكم في الوقت الحالي بسبب..."
                    required
                    className="mt-3 min-h-[100px] rounded-xl"
                  />
                </div>
                <Button
                  onClick={() => handleProcess("reject")}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl shadow-lg"
                  disabled={!adminMessage.trim()}
                >
                  <XCircle className="w-5 h-5 ml-2" />
                  تأكيد الرفض
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
