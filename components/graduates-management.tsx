"use client"

import { useState } from "react"
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
} from "lucide-react"

interface GraduatesManagementProps {
  initialGraduates: Graduate[]
  initialApplications: GraduateApplication[]
}

export function GraduatesManagement({ initialGraduates, initialApplications }: GraduatesManagementProps) {
  const [graduates, setGraduates] = useState(initialGraduates)
  const [applications, setApplications] = useState(initialApplications)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingGraduate, setEditingGraduate] = useState<Graduate | null>(null)
  const [processingApplication, setProcessingApplication] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const pendingApplications = applications.filter((app) => app.status === "pending")
  const processedApplications = applications.filter((app) => app.status !== "pending")

  async function handleAddGraduate(formData: FormData) {
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
  }

  async function handleUpdateGraduate(formData: FormData) {
    if (!editingGraduate) return

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
  }

  async function handleDeleteGraduate(id: number) {
    if (confirm("هل أنت متأكد من حذف هذا الخريج؟")) {
      const result = await deleteGraduate(id)
      if (result.success) {
        setMessage({ type: "success", text: "تم حذف الخريج بنجاح" })
        setGraduates(graduates.filter((g) => g.id !== id))
      } else {
        setMessage({ type: "error", text: result.error || "حدث خطأ" })
      }
    }
  }

  async function handleProcessApplication(id: number, action: "approve" | "reject", adminMessage: string) {
    setProcessingApplication(id)

    try {
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
      setMessage({ type: "error", text: "حدث خطأ في الاتصال" })
    }

    setProcessingApplication(null)
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert
          className={`${
            message.type === "success" 
              ? "border-green-200 bg-green-50/80 backdrop-blur-sm shadow-md" 
              : "border-red-200 bg-red-50/80 backdrop-blur-sm shadow-md"
          } rounded-xl`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="graduates" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm shadow-md">
          <TabsTrigger value="graduates" className="flex items-center gap-2 data-[state=active]:bg-academy-blue data-[state=active]:text-white font-medium">
            <Users className="w-4 h-4" />
            الخريجون ({graduates.length})
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2 data-[state=active]:bg-academy-blue data-[state=active]:text-white font-medium">
            <Clock className="w-4 h-4" />
            طلبات التقديم ({pendingApplications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="graduates" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-academy-gold/20">
            <h2 className="text-xl sm:text-2xl font-bold text-academy-blue">الخريجون المعتمدون</h2>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-6 py-3 rounded-xl shadow-lg">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة خريج
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
                <DialogHeader className="border-b border-academy-gold/20 pb-4">
                  <DialogTitle className="text-academy-blue font-bold text-lg sm:text-xl">إضافة خريج جديد</DialogTitle>
                </DialogHeader>
                <GraduateForm onSubmit={handleAddGraduate} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {graduates.map((graduate) => (
              <Card key={graduate.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base sm:text-lg text-academy-blue truncate">{graduate.name}</CardTitle>
                      <p className="text-xs sm:text-sm text-academy-dark-gray truncate">{graduate.specialization}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setEditingGraduate(graduate)}
                        className="border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-white bg-white p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteGraduate(graduate.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50 bg-white p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-xs sm:text-sm text-academy-dark-gray">
                    <Briefcase className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                    <span className="truncate">{graduate.current_position}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-academy-dark-gray">
                    <div className="flex items-center min-w-0 flex-1">
                      <MapPin className="w-4 h-4 ml-1 text-academy-gold flex-shrink-0" />
                      <span className="truncate">{graduate.country}</span>
                    </div>
                    <div className="flex items-center flex-shrink-0 ml-2">
                      <Calendar className="w-4 h-4 ml-1 text-academy-gold" />
                      <span>{graduate.graduation_year}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-academy-dark-gray line-clamp-3 leading-relaxed">{graduate.success_story}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {graduates.length === 0 && (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <Users className="w-16 h-16 text-academy-gold mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-academy-blue mb-2">لا يوجد خريجون</h3>
              <p className="text-academy-dark-gray text-sm sm:text-base">لم يتم إضافة أي خريجين بعد</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-academy-gold/20">
            <h2 className="text-xl sm:text-2xl font-bold text-academy-blue">طلبات التقديم</h2>
          </div>

          <div className="space-y-4">
            {pendingApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onProcess={handleProcessApplication}
                isProcessing={processingApplication === application.id}
              />
            ))}

            {pendingApplications.length === 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="text-center py-8">
                  <Clock className="w-12 h-12 text-academy-gold mx-auto mb-4" />
                  <p className="text-academy-dark-gray text-sm sm:text-base">لا توجد طلبات معلقة حالياً</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Graduate Dialog */}
      <Dialog open={!!editingGraduate} onOpenChange={() => setEditingGraduate(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
          <DialogHeader className="border-b border-academy-gold/20 pb-4">
            <DialogTitle className="text-academy-blue font-bold text-lg sm:text-xl">تعديل بيانات الخريج</DialogTitle>
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
    <form action={onSubmit} className="space-y-4 p-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-academy-blue font-medium">الاسم الكامل</Label>
          <Input 
            id="name" 
            name="name" 
            required 
            defaultValue={initialData?.name} 
            className="border-academy-gold/30 focus:border-academy-gold bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialization" className="text-academy-blue font-medium">التخصص</Label>
          <Input 
            id="specialization" 
            name="specialization" 
            required 
            defaultValue={initialData?.specialization} 
            className="border-academy-gold/30 focus:border-academy-gold bg-white"
          />
        </div>
      </div>

      <div className="space-y-2 bg-white">
        <Label htmlFor="current_position" className="text-academy-blue font-medium">المنصب الحالي</Label>
        <Input 
          id="current_position" 
          name="current_position" 
          required 
          defaultValue={initialData?.current_position} 
          className="border-academy-gold/30 focus:border-academy-gold bg-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
        <div className="space-y-2">
          <Label htmlFor="country" className="text-academy-blue font-medium">البلد</Label>
          <Input 
            id="country" 
            name="country" 
            required 
            defaultValue={initialData?.country} 
            className="border-academy-gold/30 focus:border-academy-gold bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="graduation_year" className="text-academy-blue font-medium">سنة التخرج</Label>
          <Input
            id="graduation_year"
            name="graduation_year"
            type="number"
            required
            defaultValue={initialData?.graduation_year}
            className="border-academy-gold/30 focus:border-academy-gold bg-white"
          />
        </div>
      </div>

      <div className="space-y-2 bg-white">
        <Label htmlFor="success_story" className="text-academy-blue font-medium">قصة النجاح</Label>
        <Textarea 
          id="success_story" 
          name="success_story" 
          rows={4} 
          required 
          defaultValue={initialData?.success_story} 
          className="border-academy-gold/30 focus:border-academy-gold bg-white resize-none"
        />
      </div>

      <div className="pt-4 border-t border-academy-gold/20">
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-2.5"
        >
          {initialData ? "تحديث" : "إضافة"} الخريج
        </Button>
      </div>
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
    <Card className="border-r-4 border-r-academy-gold bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg text-academy-blue truncate">{application.name}</CardTitle>
            <p className="text-xs sm:text-sm text-academy-dark-gray truncate">{application.email}</p>
          </div>
          <Badge variant="outline" className="text-academy-gold border-academy-gold bg-academy-gold/10 self-start sm:self-center">
            معلق
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <span className="font-semibold text-academy-blue">التخصص:</span>
            <p className="truncate">{application.specialization}</p>
          </div>
          <div>
            <span className="font-semibold text-academy-blue">المنصب:</span>
            <p className="truncate">{application.current_position}</p>
          </div>
          <div>
            <span className="font-semibold text-academy-blue">البلد:</span>
            <p className="truncate">{application.country}</p>
          </div>
          <div>
            <span className="font-semibold text-academy-blue">سنة التخرج:</span>
            <p>{application.graduation_year}</p>
          </div>
        </div>

        <div>
          <span className="font-semibold text-academy-blue">قصة النجاح:</span>
          <p className="text-xs sm:text-sm text-academy-dark-gray mt-1 line-clamp-3">{application.success_story}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Dialog open={showProcessDialog === "approve"} onOpenChange={() => setShowProcessDialog(null)}>
            <DialogTrigger asChild>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-bold flex-1 py-2"
                disabled={isProcessing}
                onClick={() => setShowProcessDialog("approve")}
              >
                <CheckCircle className="w-4 h-4 ml-2" />
                قبول
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white shadow-2xl">
              <DialogHeader className="border-b border-academy-gold/20 pb-4">
                <DialogTitle className="text-academy-blue font-bold">قبول الطلب</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-1">
                <div className="bg-white">
                  <Label htmlFor="approve-message" className="text-academy-blue font-medium">رسالة للمتقدم (اختيارية)</Label>
                  <Textarea
                    id="approve-message"
                    value={adminMessage}
                    onChange={(e) => setAdminMessage(e.target.value)}
                    placeholder="رسالة ترحيب أو تهنئة..."
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                  />
                </div>
                <Button 
                  onClick={() => handleProcess("approve")} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5"
                >
                  تأكيد القبول
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showProcessDialog === "reject"} onOpenChange={() => setShowProcessDialog(null)}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-white font-bold flex-1 py-2"
                disabled={isProcessing}
                onClick={() => setShowProcessDialog("reject")}
              >
                <XCircle className="w-4 h-4 ml-2" />
                رفض
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white shadow-2xl">
              <DialogHeader className="border-b border-red-200 pb-4">
                <DialogTitle className="text-red-600 font-bold">رفض الطلب</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-1">
                <div className="bg-white">
                  <Label htmlFor="reject-message" className="text-academy-blue font-medium">سبب الرفض</Label>
                  <Textarea
                    id="reject-message"
                    value={adminMessage}
                    onChange={(e) => setAdminMessage(e.target.value)}
                    placeholder="يرجى توضيح سبب الرفض..."
                    required
                    className="mt-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                  />
                </div>
                <Button
                  onClick={() => handleProcess("reject")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5"
                  disabled={!adminMessage.trim()}
                >
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
