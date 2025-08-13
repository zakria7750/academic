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
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 ml-1" />
            قيد المراجعة
          </Badge>
        )
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="w-3 h-3 ml-1" />
            مقبول
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
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
      <div className="min-h-screen bg-gradient-to-br from-academy-blue-50 to-academy-gold-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-academy-gold" />
          <p className="text-academy-blue font-semibold text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-blue-50 to-academy-gold-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-academy-gold/20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-academy-blue mb-2">إدارة القبول والتسجيل</h1>
          <p className="text-academy-dark-gray text-sm sm:text-base lg:text-lg">إدارة طلبات التسجيل والطلاب المقبولين</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-blue-600 truncate">إجمالي الطلبات</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-800">{applications.length}</p>
                </div>
                <Users className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-yellow-600 truncate">قيد المراجعة</p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-800">{pendingApplications.length}</p>
                </div>
                <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-green-600 truncate">مقبول</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-800">{acceptedApplications.length}</p>
                </div>
                <CheckCircle className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-academy-blue truncate">الطلاب المسجلين</p>
                  <p className="text-xl sm:text-2xl font-bold text-academy-blue">{students.length}</p>
                </div>
                <GraduationCap className="w-6 sm:w-8 h-6 sm:h-8 text-academy-blue flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm shadow-md">
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-academy-blue data-[state=active]:text-white font-medium"
            >
              الطلبات ({applications.length})
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="data-[state=active]:bg-academy-blue data-[state=active]:text-white font-medium"
            >
              الطلاب ({students.length})
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {applications.map((application) => (
                <Card key={application.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="text-base sm:text-lg font-bold text-academy-blue truncate">{application.full_name}</CardTitle>
                      {getStatusBadge(application.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center text-academy-dark-gray">
                        <Mail className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{application.email}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <Phone className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{application.phone}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <Globe className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{application.country}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <GraduationCap className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{application.desired_program}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <BookOpen className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{application.desired_specialization}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <Calendar className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span>{new Date(application.created_at).toLocaleDateString("ar-SA")}</span>
                      </div>
                    </div>

                    {application.status === "pending" && (
                      <div className="flex flex-col sm:flex-row gap-2 pt-3">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2"
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
                          variant="destructive"
                          className="flex-1 py-2"
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
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <Users className="w-16 h-16 text-academy-gold mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-academy-blue mb-2">لا توجد طلبات</h3>
                <p className="text-academy-dark-gray text-sm sm:text-base">لم يتم تقديم أي طلبات تسجيل بعد</p>
              </div>
            )}
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-academy-gold/20">
              <h2 className="text-xl sm:text-2xl font-bold text-academy-blue">الطلاب المسجلين</h2>
              <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-6 py-3 rounded-xl shadow-lg">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة طالب
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto bg-white shadow-2xl">
                  <DialogHeader className="pb-4 border-b border-academy-gold/20">
                    <DialogTitle className="text-academy-blue text-lg sm:text-xl font-bold">إضافة طالب جديد</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base text-academy-dark-gray">
                      املأ البيانات التالية لإضافة طالب جديد مباشرة
                    </DialogDescription>
                  </DialogHeader>
                  <form id="add-student-form" action={handleAddStudent} className="space-y-4 px-1">
                    <div className="grid grid-cols-1 bg-white sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-academy-blue">
                          الاسم الكامل *
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          required
                          className="h-10 text-sm border-academy-gold/30 focus:border-academy-gold bg-white"
                          placeholder="أدخل الاسم الكامل"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-academy-blue">
                          البريد الإلكتروني *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="h-10 text-sm border-academy-gold/30 focus:border-academy-gold bg-white"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-academy-blue">
                          رقم الهاتف *
                        </Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          required 
                          className="h-10 text-sm border-academy-gold/30 focus:border-academy-gold bg-white" 
                          placeholder="رقم الهاتف" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium text-academy-blue">
                          البلد *
                        </Label>
                        <Input 
                          id="country" 
                          name="country" 
                          required 
                          className="h-10 text-sm border-academy-gold/30 focus:border-academy-gold bg-white" 
                          placeholder="اسم البلد" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="program" className="text-sm font-medium text-academy-blue">
                          البرنامج *
                        </Label>
                        <Select name="program" required>
                          <SelectTrigger className="h-10 text-sm border-academy-gold/30 focus:border-academy-gold bg-white">
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
                        <Label htmlFor="specialization" className="text-sm font-medium text-academy-blue">
                          التخصص *
                        </Label>
                        <Input
                          id="specialization"
                          name="specialization"
                          required
                          className="h-10 text-sm border-academy-gold/30 focus:border-academy-gold bg-white"
                          placeholder="التخصص المطلوب"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentQualification" className="text-sm font-medium text-academy-blue">
                        المؤهل الحالي *
                      </Label>
                      <Textarea
                        id="currentQualification"
                        name="currentQualification"
                        required
                        className="min-h-[80px] text-sm resize-none border-academy-gold/30 focus:border-academy-gold bg-white"
                        placeholder="اكتب المؤهل الحالي والخبرات"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-academy-gold/20">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddStudentDialog(false)}
                        className="w-full sm:w-auto h-10 text-sm border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white bg-white"
                      >
                        إلغاء
                      </Button>
                      <Button
                        type="submit"
                        className="w-full sm:w-auto h-10 text-sm bg-gradient-to-r from-academy-gold to-academy-gold-light text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold"
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {students.map((student) => (
                <Card key={student.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg font-bold text-academy-blue truncate">{student.full_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center text-academy-dark-gray">
                        <Mail className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <Phone className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{student.phone}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <Globe className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{student.country}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <GraduationCap className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{student.program}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <BookOpen className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span className="truncate">{student.specialization}</span>
                      </div>
                      <div className="flex items-center text-academy-dark-gray">
                        <Calendar className="w-4 h-4 ml-2 text-academy-gold flex-shrink-0" />
                        <span>{new Date(student.enrollment_date).toLocaleDateString("ar-SA")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {students.length === 0 && (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <GraduationCap className="w-16 h-16 text-academy-gold mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-academy-blue mb-2">لا يوجد طلاب</h3>
                <p className="text-academy-dark-gray text-sm sm:text-base">لم يتم تسجيل أي طلاب بعد</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Status Update Dialog */}
        <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
          <DialogContent className="max-w-md bg-white shadow-2xl">
            <DialogHeader className="border-b border-academy-gold/20 pb-4">
              <DialogTitle className="text-academy-blue font-bold">
                {statusAction === "accepted" ? "قبول الطلب" : "رفض الطلب"}
              </DialogTitle>
              <DialogDescription className="text-academy-dark-gray">
                {statusAction === "accepted"
                  ? "سيتم قبول هذا الطلب وإضافة الطالب إلى قائمة المسجلين"
                  : "سيتم رفض هذا الطلب وإرسال إشعار للمتقدم"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 p-1">
              <div className="space-y-2 bg-white">
                <Label htmlFor="statusMessage" className="text-academy-blue font-medium">رسالة توضيحية (اختيارية)</Label>
                <Textarea
                  id="statusMessage"
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  placeholder={
                    statusAction === "accepted" ? "مبروك! تم قبولك في البرنامج..." : "نأسف لعدم قبول طلبك في هذا الوقت..."
                  }
                  rows={3}
                  className="border-academy-gold/30 focus:border-academy-gold bg-white"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowStatusDialog(false)}
                  className="border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white bg-white"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleStatusUpdate}
                  className={
                    statusAction === "accepted"
                      ? "bg-green-600 hover:bg-green-700 text-white font-bold"
                      : "bg-red-600 hover:bg-red-700 text-white font-bold"
                  }
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
