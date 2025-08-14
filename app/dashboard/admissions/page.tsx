"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  BookOpen,
  Calendar,
  Loader2,
  Plus,
} from "lucide-react"
import {
  getApplications,
  getStudents,
  updateApplicationStatus,
  addStudent,
  type Application,
  type Student,
} from "@/app/actions/applications-actions"

export default function AdmissionsManagement() {
  const [applications, setApplications] = useState<Application[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [statusAction, setStatusAction] = useState<"accepted" | "rejected">("accepted")
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [applicationsResult, studentsResult] = await Promise.all([getApplications(), getStudents()])

      if (applicationsResult.success) {
        setApplications(applicationsResult.data)
      }

      if (studentsResult.success) {
        setStudents(studentsResult.data)
      }
    } catch (error) {
      console.error("Load data error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!selectedApplication) return

    setActionLoading(selectedApplication.id)
    try {
      const result = await updateApplicationStatus(selectedApplication.id, statusAction, statusMessage)

      if (result.success) {
        await loadData()
        setShowStatusDialog(false)
        setStatusMessage("")
      }
    } catch (error) {
      console.error("Status update error:", error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleAddStudent = async (formData: FormData) => {
    setActionLoading(-1)
    try {
      const result = await addStudent(formData)

      if (result.success) {
        await loadData()
        setShowAddStudentDialog(false)
        // Reset form
        const form = document.getElementById("add-student-form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      console.error("Add student error:", error)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 rounded-full px-3 py-1 font-bold">
            <Clock className="w-3 h-3 ml-1" />
            قيد المراجعة
          </Badge>
        )
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300 rounded-full px-3 py-1 font-bold">
            <CheckCircle className="w-3 h-3 ml-1" />
            مقبول
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300 rounded-full px-3 py-1 font-bold">
            <XCircle className="w-3 h-3 ml-1" />
            مرفوض
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const pendingApplications = applications.filter((app) => app.status === "pending")
  const acceptedApplications = applications.filter((app) => app.status === "accepted")
  const rejectedApplications = applications.filter((app) => app.status === "rejected")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-academy-blue" />
          <p className="text-academy-blue font-semibold">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-academy-blue-dark via-academy-blue to-academy-blue-light shadow-xl border-b border-academy-gold/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-academy-gold/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Users className="text-academy-gold" size={24} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">إدارة القبول والتسجيل</h1>
                <p className="text-white/80 text-lg">إدارة طلبات التسجيل والطلاب المقبولين</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-academy-blue mb-1">إجمالي الطلبات</p>
                  <p className="text-3xl font-bold text-academy-blue">{applications.length}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-academy-blue/20 to-academy-blue/10 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-academy-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-yellow-700 mb-1">قيد المراجعة</p>
                  <p className="text-3xl font-bold text-yellow-800">{pendingApplications.length}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-200/60 to-yellow-100/40 rounded-xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">مقبول</p>
                  <p className="text-3xl font-bold text-green-800">{acceptedApplications.length}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-200/60 to-green-100/40 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-academy-blue mb-1">الطلاب المسجلين</p>
                  <p className="text-3xl font-bold text-academy-blue">{students.length}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-academy-gold/30 to-academy-gold/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-academy-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-xl shadow-md p-2 border-0">
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-academy-blue data-[state=active]:text-white rounded-lg font-bold transition-all duration-300"
            >
              <Users className="w-4 h-4 ml-2" />
              الطلبات ({applications.length})
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="data-[state=active]:bg-academy-blue data-[state=active]:text-white rounded-lg font-bold transition-all duration-300"
            >
              <GraduationCap className="w-4 h-4 ml-2" />
              الطلاب ({students.length})
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {applications.map((application) => (
                <Card key={application.id} className="border-0 shadow-lg hover:shadow-2xl bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
                  <CardHeader className="pb-3 bg-gradient-to-r from-academy-blue-50 to-academy-gold-50 border-b border-academy-blue-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-academy-blue">{application.full_name}</CardTitle>
                      {getStatusBadge(application.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 p-6 bg-white">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <Mail className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{application.email}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <Phone className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{application.phone}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <Globe className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{application.country}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <GraduationCap className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{application.desired_program}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <BookOpen className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{application.desired_specialization}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <Calendar className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{new Date(application.created_at).toLocaleDateString("ar-SA")}</span>
                      </div>
                    </div>

                    {application.status === "pending" && (
                      <div className="flex gap-3 pt-4 border-t border-academy-blue-100">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedApplication(application)
                            setStatusAction("accepted")
                            setShowStatusDialog(true)
                          }}
                          disabled={actionLoading === application.id}
                        >
                          {actionLoading === application.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 ml-1" />
                              قبول
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedApplication(application)
                            setStatusAction("rejected")
                            setShowStatusDialog(true)
                          }}
                          disabled={actionLoading === application.id}
                        >
                          {actionLoading === application.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 ml-1" />
                              رفض
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {applications.length === 0 && (
              <div className="text-center py-20 fade-in">
                <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Users className="w-16 h-16 text-academy-gold" />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-4">لا توجد طلبات</h3>
                <p className="text-academy-dark-gray text-lg">لم يتم تقديم أي طلبات تسجيل بعد</p>
              </div>
            )}
          </TabsContent>

          {/* Enhanced Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-academy-blue">الطلاب المسجلين</h2>
              <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
                <DialogTrigger asChild>
                  <Button className="btn-primary text-academy-blue font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة طالب
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto bg-white rounded-2xl border-0 shadow-2xl">
                  <DialogHeader className="pb-4 border-b border-academy-blue-100 bg-gradient-to-r from-academy-blue-50 to-academy-gold-50 -m-6 mb-6 p-6 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-academy-blue/10 rounded-lg flex items-center justify-center">
                        <UserPlus className="text-academy-blue" size={20} />
                      </div>
                      <div>
                        <DialogTitle className="text-academy-blue text-xl font-bold">إضافة طالب جديد</DialogTitle>
                        <DialogDescription className="text-academy-dark-gray">
                          املأ البيانات التالية لإضافة طالب جديد مباشرة
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  <form id="add-student-form" action={handleAddStudent} className="space-y-6 px-1 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-academy-blue font-bold">
                          الاسم الكامل *
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          required
                          className="h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                          placeholder="أدخل الاسم الكامل"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-academy-blue font-bold">
                          البريد الإلكتروني *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-academy-blue font-bold">
                          رقم الهاتف *
                        </Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          required 
                          className="h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white" 
                          placeholder="رقم الهاتف" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-academy-blue font-bold">
                          البلد *
                        </Label>
                        <Input 
                          id="country" 
                          name="country" 
                          required 
                          className="h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white" 
                          placeholder="اسم البلد" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="program" className="text-academy-blue font-bold">
                          البرنامج *
                        </Label>
                        <Select name="program" required>
                          <SelectTrigger className="h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white">
                            <SelectValue placeholder="اختر البرنامج" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="دبلوم">دبلوم</SelectItem>
                            <SelectItem value="بكالوريوس">بكالوريوس</SelectItem>
                            <SelectItem value="ماجستير">ماجستير</SelectItem>
                            <SelectItem value="دكتوراه">دكتوراه</SelectItem>
                            <SelectItem value="دورة تدريبية">دورة تدريبية</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialization" className="text-academy-blue font-bold">
                          التخصص *
                        </Label>
                        <Input
                          id="specialization"
                          name="specialization"
                          required
                          className="h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
                          placeholder="التخصص المطلوب"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentQualification" className="text-academy-blue font-bold">
                        المؤهل الحالي *
                      </Label>
                      <Textarea
                        id="currentQualification"
                        name="currentQualification"
                        required
                        className="min-h-[100px] text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold resize-none bg-white"
                        placeholder="اكتب المؤهل الحالي والخبرات"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-academy-blue-100">
                      <Button
                        type="button"
                        onClick={() => setShowAddStudentDialog(false)}
                        className="btn-secondary text-academy-blue font-bold text-lg px-8 py-3 rounded-xl flex-1 sm:flex-none hover:scale-105 transition-all duration-300"
                      >
                        إلغاء
                      </Button>
                      <Button
                        type="submit"
                        className="btn-primary text-academy-blue font-bold text-lg px-8 py-3 rounded-xl flex-1 sm:flex-none hover:scale-105 transition-all duration-300"
                        disabled={actionLoading === -1}
                      >
                        {actionLoading === -1 ? (
                          <>
                            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                            جاري الإضافة...
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 ml-2" />
                            إضافة الطالب
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {students.map((student) => (
                <Card key={student.id} className="border-0 shadow-lg hover:shadow-2xl bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
                  <CardHeader className="pb-3 bg-gradient-to-r from-academy-blue-50 to-academy-gold-50 border-b border-academy-blue-100">
                    <CardTitle className="text-lg font-bold text-academy-blue">{student.full_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-6 bg-white">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <Mail className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{student.email}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <Phone className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{student.phone}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <Globe className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{student.country}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <GraduationCap className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{student.program}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <BookOpen className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{student.specialization}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray p-2 bg-academy-gray-light rounded-lg">
                        <Calendar className="w-4 h-4 ml-2 text-academy-gold" />
                        <span className="font-medium">{new Date(student.enrollment_date).toLocaleDateString("ar-SA")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {students.length === 0 && (
              <div className="text-center py-20 fade-in">
                <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <GraduationCap className="w-16 h-16 text-academy-gold" />
                </div>
                <h3 className="text-3xl font-bold text-academy-blue mb-4">لا يوجد طلاب</h3>
                <p className="text-academy-dark-gray text-lg">لم يتم تسجيل أي طلاب بعد</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Enhanced Status Update Dialog */}
        <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
          <DialogContent className="max-w-md bg-white rounded-2xl border-0 shadow-2xl">
            <DialogHeader className="pb-4 border-b border-academy-blue-100 bg-gradient-to-r from-academy-blue-50 to-academy-gold-50 -m-6 mb-6 p-6 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  statusAction === "accepted" 
                    ? "bg-green-100" 
                    : "bg-red-100"
                }`}>
                  {statusAction === "accepted" ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                </div>
                <div>
                  <DialogTitle className="text-academy-blue text-xl font-bold">
                    {statusAction === "accepted" ? "قبول الطلب" : "رفض الطلب"}
                  </DialogTitle>
                  <DialogDescription className="text-academy-dark-gray">
                    {statusAction === "accepted"
                      ? "سيتم قبول هذا الطلب وإضافة الطالب إلى قائمة المسجلين"
                      : "سيتم رفض هذا الطلب وإرسال إشعار للمتقدم"}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-6 bg-white">
              <div className="space-y-3">
                <Label htmlFor="statusMessage" className="text-academy-blue font-bold text-lg">رسالة توضيحية (اختيارية)</Label>
                <Textarea
                  id="statusMessage"
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  placeholder={
                    statusAction === "accepted" 
                      ? "مبروك! تم قبولك في البرنامج..." 
                      : "نأسف لعدم قبول طلبك في هذا الوقت..."
                  }
                  rows={4}
                  className="text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold resize-none bg-white"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-academy-blue-100">
                <Button 
                  onClick={() => setShowStatusDialog(false)}
                  className="btn-secondary text-academy-blue font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleStatusUpdate}
                  className={`font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 ${
                    statusAction === "accepted"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                  disabled={actionLoading !== null}
                >
                  {actionLoading !== null ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      {statusAction === "accepted" ? (
                        <CheckCircle className="w-4 h-4 ml-2" />
                      ) : (
                        <XCircle className="w-4 h-4 ml-2" />
                      )}
                      {statusAction === "accepted" ? "قبول الطلب" : "رفض الطلب"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
