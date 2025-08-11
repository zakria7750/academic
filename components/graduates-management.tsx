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
      // Refresh data
      window.location.reload()
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
      // Refresh data
      window.location.reload()
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
    const result = await processGraduateApplication(id, action, adminMessage)

    if (result.success) {
      setMessage({
        type: "success",
        text: action === "approve" ? "تم قبول الطلب بنجاح" : "تم رفض الطلب",
      })
      // Refresh data
      window.location.reload()
    } else {
      setMessage({ type: "error", text: result.error || "حدث خطأ" })
    }
    setProcessingApplication(null)
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert
          className={`${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="graduates" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            الخريجون ({graduates.length})
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            طلبات التقديم ({pendingApplications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="graduates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-academy-blue">الخريجون المعتمدون</h2>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-academy-blue hover:bg-blue-600">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة خريج
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>إضافة خريج جديد</DialogTitle>
                </DialogHeader>
                <GraduateForm onSubmit={handleAddGraduate} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graduates.map((graduate) => (
              <Card key={graduate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-academy-blue">{graduate.name}</CardTitle>
                      <p className="text-sm text-academy-dark-gray">{graduate.specialization}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingGraduate(graduate)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteGraduate(graduate.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-academy-dark-gray">
                    <Briefcase className="w-4 h-4 ml-2 text-academy-blue" />
                    {graduate.current_position}
                  </div>
                  <div className="flex items-center justify-between text-sm text-academy-dark-gray">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 ml-1 text-academy-blue" />
                      {graduate.country}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 ml-1 text-academy-blue" />
                      {graduate.graduation_year}
                    </div>
                  </div>
                  <p className="text-sm text-academy-dark-gray line-clamp-3">{graduate.success_story}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <h2 className="text-2xl font-bold text-academy-blue">طلبات التقديم</h2>

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

      {/* Edit Graduate Dialog */}
      <Dialog open={!!editingGraduate} onOpenChange={() => setEditingGraduate(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تعديل بيانات الخريج</DialogTitle>
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
    <form action={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">الاسم الكامل</Label>
          <Input id="name" name="name" required defaultValue={initialData?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialization">التخصص</Label>
          <Input id="specialization" name="specialization" required defaultValue={initialData?.specialization} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="current_position">المنصب الحالي</Label>
        <Input id="current_position" name="current_position" required defaultValue={initialData?.current_position} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">البلد</Label>
          <Input id="country" name="country" required defaultValue={initialData?.country} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="graduation_year">سنة التخرج</Label>
          <Input
            id="graduation_year"
            name="graduation_year"
            type="number"
            required
            defaultValue={initialData?.graduation_year}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="success_story">قصة النجاح</Label>
        <Textarea id="success_story" name="success_story" rows={4} required defaultValue={initialData?.success_story} />
      </div>

      <Button type="submit" className="w-full bg-academy-blue hover:bg-blue-600">
        {initialData ? "تحديث" : "إضافة"} الخريج
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
    <Card className="border-r-4 border-r-yellow-400">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-academy-blue">{application.name}</CardTitle>
            <p className="text-sm text-academy-dark-gray">{application.email}</p>
          </div>
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            معلق
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-academy-blue">التخصص:</span>
            <p>{application.specialization}</p>
          </div>
          <div>
            <span className="font-semibold text-academy-blue">المنصب:</span>
            <p>{application.current_position}</p>
          </div>
          <div>
            <span className="font-semibold text-academy-blue">البلد:</span>
            <p>{application.country}</p>
          </div>
          <div>
            <span className="font-semibold text-academy-blue">سنة التخرج:</span>
            <p>{application.graduation_year}</p>
          </div>
        </div>

        <div>
          <span className="font-semibold text-academy-blue">قصة النجاح:</span>
          <p className="text-sm text-academy-dark-gray mt-1">{application.success_story}</p>
        </div>

        <div className="flex gap-2 pt-4">
          <Dialog open={showProcessDialog === "approve"} onOpenChange={() => setShowProcessDialog(null)}>
            <DialogTrigger asChild>
              <Button
                className="bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
                onClick={() => setShowProcessDialog("approve")}
              >
                <CheckCircle className="w-4 h-4 ml-2" />
                قبول
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>قبول الطلب</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="approve-message">رسالة للمتقدم (اختيارية)</Label>
                <Textarea
                  id="approve-message"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  placeholder="رسالة ترحيب أو تهنئة..."
                />
                <Button onClick={() => handleProcess("approve")} className="w-full bg-green-600 hover:bg-green-700">
                  تأكيد القبول
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showProcessDialog === "reject"} onOpenChange={() => setShowProcessDialog(null)}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                disabled={isProcessing}
                onClick={() => setShowProcessDialog("reject")}
              >
                <XCircle className="w-4 h-4 ml-2" />
                رفض
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>رفض الطلب</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="reject-message">سبب الرفض</Label>
                <Textarea
                  id="reject-message"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  placeholder="يرجى توضيح سبب الرفض..."
                  required
                />
                <Button
                  onClick={() => handleProcess("reject")}
                  className="w-full bg-red-600 hover:bg-red-700"
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
