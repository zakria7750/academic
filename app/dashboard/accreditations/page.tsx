"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  Send,
  AlertCircle,
  Filter,
  Star,
  Shield,
  Crown,
  Sparkles,
} from "lucide-react"
import { updateAccreditationStatus } from "@/app/actions/accreditation-actions"

type Accreditation = {
  id: string
  full_name: string
  email: string
  phone: string
  specialization: string
  status: "pending" | "approved" | "rejected"
  admin_message: string | null
  created_at: string
  updated_at: string
}

export default function AccreditationsManagement() {
  const [accreditations, setAccreditations] = useState<Accreditation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"approved" | "pending">("pending")
  const [showActionModal, setShowActionModal] = useState<{
    accreditation: Accreditation
    action: "approve" | "reject"
  } | null>(null)
  const [adminMessage, setAdminMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchAccreditations()
  }, [])

  const fetchAccreditations = async () => {
    try {
      const { data, error } = await supabase
        .from("accreditations")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setAccreditations(data || [])
    } catch (error) {
      console.error("Error fetching accreditations:", error)
      showMessage("error", "حدث خطأ في تحميل البيانات")
    } finally {
      setIsLoading(false)
    }
  }

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleAction = async () => {
    if (!showActionModal || !adminMessage.trim()) return

    setIsSubmitting(true)
    try {
      const status = showActionModal.action === "approve" ? "approved" : "rejected"
      const result = await updateAccreditationStatus(showActionModal.accreditation.id, status, adminMessage)

      if (result.success) {
        showMessage("success", result.message)
        fetchAccreditations()
        setShowActionModal(null)
        setAdminMessage("")
      } else {
        showMessage("error", result.message)
      }
    } catch (error) {
      showMessage("error", "حدث خطأ غير متوقع")
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredAccreditations = accreditations
    .filter((acc) => acc.status === activeTab)
    .filter(
      (acc) =>
        acc.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  const pendingCount = accreditations.filter((acc) => acc.status === "pending").length
  const approvedCount = accreditations.filter((acc) => acc.status === "approved").length
  const rejectedCount = accreditations.filter((acc) => acc.status === "rejected").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200 rounded-full px-4 py-2 font-bold shadow-sm hover:shadow-md transition-shadow duration-300">
            <Clock size={14} className="ml-2" />
            قيد المراجعة
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 rounded-full px-4 py-2 font-bold shadow-sm hover:shadow-md transition-shadow duration-300">
            <Shield size={14} className="ml-2" />
            معتمد
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200 rounded-full px-4 py-2 font-bold shadow-sm hover:shadow-md transition-shadow duration-300">
            <XCircle size={14} className="ml-2" />
            مرفوض
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
        {/* Loading Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-academy-gold/20 to-academy-blue/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-academy-blue/20 to-academy-gold/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-academy-gold/30 border-t-academy-gold rounded-full animate-spin mx-auto mb-6"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-academy-gold animate-pulse" size={24} />
          </div>
          <p className="text-academy-blue font-bold text-lg">جاري التحميل...</p>
          <p className="text-academy-dark-gray mt-2">يتم تحضير بيانات المدربين المعتمدين</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-academy-blue/5 via-transparent to-academy-gold/5"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-academy-gold/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-academy-blue/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-academy-gold/5 to-academy-blue/5 rounded-full blur-3xl"></div>
      </div>

      {/* Premium Header Section */}
      <div className="relative z-10 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900 shadow-2xl border-b border-academy-gold/30 overflow-hidden">
        {/* Header Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-academy-gold/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-academy-gold/15 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
            
            {/* Enhanced Title Section */}
            <div className="text-white flex-1">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-academy-gold/30">
                    <Crown className="text-academy-blue" size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-academy-gold rounded-full flex items-center justify-center">
                    <Star size={12} className="text-academy-blue" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl xl:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-academy-gold-light bg-clip-text text-transparent mb-2">
                    إدارة الاعتمادات
                  </h1>
                  <p className="text-white/90 text-xl font-medium">
                    مراجعة طلبات الاعتماد وإدارة المدربين المعتمدين
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                    <p className="text-white/70 text-sm">
                      منصة إدارة شاملة للمدربين المحترفين
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Stats Cards */}
            <div className="flex flex-wrap gap-6 xl:gap-4">
              {/* Pending Stats Card */}
              <div className="group">
                <div className="bg-white/95 backdrop-blur-xl px-8 py-6 rounded-3xl text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-amber-200/50 hover:border-amber-300 relative overflow-hidden min-w-[140px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div className="text-amber-800 font-bold text-3xl mb-1">{pendingCount}</div>
                    <div className="text-amber-600 text-sm font-semibold">طلبات معلقة</div>
                  </div>
                </div>
              </div>

              {/* Approved Stats Card */}
              <div className="group">
                <div className="bg-white/95 backdrop-blur-xl px-8 py-6 rounded-3xl text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-emerald-200/50 hover:border-emerald-300 relative overflow-hidden min-w-[140px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Shield className="text-white" size={20} />
                    </div>
                    <div className="text-emerald-800 font-bold text-3xl mb-1">{approvedCount}</div>
                    <div className="text-emerald-600 text-sm font-semibold">معتمد</div>
                  </div>
                </div>
              </div>

              {/* Rejected Stats Card */}
              <div className="group">
                <div className="bg-white/95 backdrop-blur-xl px-8 py-6 rounded-3xl text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-red-200/50 hover:border-red-300 relative overflow-hidden min-w-[140px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <XCircle className="text-white" size={20} />
                    </div>
                    <div className="text-red-800 font-bold text-3xl mb-1">{rejectedCount}</div>
                    <div className="text-red-600 text-sm font-semibold">مرفوض</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Success/Error Messages */}
      {message && (
        <div className="container mx-auto px-6 py-6 relative z-20">
          <div
            className={`flex items-center p-6 rounded-2xl shadow-2xl backdrop-blur-xl border-2 transition-all duration-500 transform hover:scale-[1.02] ${
              message.type === "success"
                ? "bg-gradient-to-r from-emerald-50/90 to-green-50/90 border-emerald-200 text-emerald-800"
                : "bg-gradient-to-r from-red-50/90 to-rose-50/90 border-red-200 text-red-800"
            }`}
          >
            {message.type === "success" ? (
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl mr-4 shadow-lg">
                <CheckCircle size={20} className="text-white" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl mr-4 shadow-lg">
                <AlertCircle size={20} className="text-white" />
              </div>
            )}
            <div className="flex-1">
              <span className="font-bold text-lg">{message.text}</span>
              <div className="text-sm opacity-80 mt-1">
                {message.type === "success" ? "تم تنفيذ العملية بنجاح" : "يرجى المحاولة مرة أخرى"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300" style={{backdropFilter: 'blur(12px)', background: 'rgba(0, 31, 63, 0.85)'}}>
          <div className="w-full max-w-3xl max-h-[95vh] overflow-y-auto transform transition-all duration-500 scale-100 opacity-100">
            <Card className="bg-white/95 backdrop-blur-xl rounded-3xl border-0 shadow-2xl overflow-hidden">
              {/* Premium Header */}
              <CardHeader className="border-b border-gray-200/50 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5"></div>
                <CardTitle className="relative z-10 flex items-center gap-4 text-2xl font-bold">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
                    showActionModal.action === "approve" 
                      ? "bg-gradient-to-br from-emerald-400 to-green-500" 
                      : "bg-gradient-to-br from-red-400 to-rose-500"
                  }`}>
                    {showActionModal.action === "approve" ? (
                      <Shield className="text-white" size={24} />
                    ) : (
                      <XCircle className="text-white" size={24} />
                    )}
                  </div>
                  <div>
                    <span className="text-academy-blue">
                      {showActionModal.action === "approve" ? "اعتماد" : "رفض"} طلب التدريب
                    </span>
                    <p className="text-sm font-normal text-academy-dark-gray mt-1">
                      {showActionModal.action === "approve" 
                        ? "منح المدرب صلاحية التدريب المعتمد" 
                        : "رفض طلب الحصول على اعتماد التدريب"}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-8 p-8 bg-white/50 backdrop-blur-sm">
                {/* Premium Applicant Info */}
                <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-xl flex items-center justify-center shadow-lg">
                      <User className="text-white" size={20} />
                    </div>
                    <h3 className="text-academy-blue font-bold text-xl">بيانات المتقدم</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/80 p-4 rounded-xl border border-slate-200/50 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="text-academy-gold" size={18} />
                        <span className="font-semibold text-academy-blue">الاسم الكامل</span>
                      </div>
                      <span className="text-academy-dark-gray font-medium text-lg">{showActionModal.accreditation.full_name}</span>
                    </div>
                    
                    <div className="bg-white/80 p-4 rounded-xl border border-slate-200/50 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="text-academy-gold" size={18} />
                        <span className="font-semibold text-academy-blue">البريد الإلكتروني</span>
                      </div>
                      <span className="text-academy-dark-gray font-medium">{showActionModal.accreditation.email}</span>
                    </div>
                    
                    <div className="bg-white/80 p-4 rounded-xl border border-slate-200/50 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <Phone className="text-academy-gold" size={18} />
                        <span className="font-semibold text-academy-blue">رقم الهاتف</span>
                      </div>
                      <span className="text-academy-dark-gray font-medium">{showActionModal.accreditation.phone}</span>
                    </div>
                    
                    <div className="bg-white/80 p-4 rounded-xl border border-slate-200/50 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="text-academy-gold" size={18} />
                        <span className="font-semibold text-academy-blue">التخصص</span>
                      </div>
                      <span className="text-academy-dark-gray font-medium">{showActionModal.accreditation.specialization}</span>
                    </div>
                  </div>
                </div>

                {/* Premium Admin Message */}
                <div className="bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-xl flex items-center justify-center shadow-lg">
                      <MessageSquare className="text-academy-blue" size={20} />
                    </div>
                    <Label htmlFor="adminMessage" className="text-academy-blue font-bold text-xl">
                      رسالة للمتقدم *
                    </Label>
                  </div>
                  <Textarea
                    id="adminMessage"
                    value={adminMessage}
                    onChange={(e) => setAdminMessage(e.target.value)}
                    rows={5}
                    className="border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 resize-none rounded-xl bg-white/80 backdrop-blur-sm text-lg font-medium shadow-sm transition-all duration-300"
                    placeholder={
                      showActionModal.action === "approve"
                        ? "اكتب رسالة ترحيب وتوضيح الخطوات التالية للمدرب المعتمد الجديد..."
                        : "اكتب سبب الرفض والتوجيهات والمتطلبات اللازمة للتحسين..."
                    }
                  />
                  <div className="mt-3 text-sm text-academy-dark-gray">
                    {showActionModal.action === "approve" 
                      ? "ستصل هذه الرسالة للمدرب مع شهادة الاعتماد"
                      : "ستساعد هذه الرسالة المتقدم على فهم أسباب الرفض وكيفية التحسين"}
                  </div>
                </div>

                {/* Premium Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    onClick={handleAction}
                    disabled={isSubmitting || !adminMessage.trim()}
                    className={`${
                      showActionModal.action === "approve"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-emerald-200"
                        : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-red-200"
                    } text-white font-bold flex-1 text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        تأكيد {showActionModal.action === "approve" ? "الاعتماد" : "الرفض"}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowActionModal(null)
                      setAdminMessage("")
                    }}
                    className="bg-gradient-to-r from-slate-100 to-gray-100 hover:from-slate-200 hover:to-gray-200 text-academy-blue font-bold text-lg px-8 py-4 rounded-2xl flex-1 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-200"
                  >
                    إلغاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Premium Main Content */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Premium Tabs */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-200/50 mb-8">
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setActiveTab("pending")}
              className={`${
                activeTab === "pending"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-xl shadow-amber-200/50 scale-105"
                  : "bg-white/80 text-amber-700 border-2 border-amber-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:border-amber-300 hover:scale-105"
              } font-bold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 min-w-[180px] justify-center relative overflow-hidden`}
            >
              <Clock size={20} />
              <span>الطلبات المعلقة</span>
              <Badge className="bg-white/90 text-amber-800 font-bold px-2 py-1 rounded-full">
                {pendingCount}
              </Badge>
            </Button>
            
            <Button
              onClick={() => setActiveTab("approved")}
              className={`${
                activeTab === "approved"
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl shadow-emerald-200/50 scale-105"
                  : "bg-white/80 text-emerald-700 border-2 border-emerald-200 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:border-emerald-300 hover:scale-105"
              } font-bold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 min-w-[180px] justify-center relative overflow-hidden`}
            >
              <Shield size={20} />
              <span>المدربون المعتمدون</span>
              <Badge className="bg-white/90 text-emerald-800 font-bold px-2 py-1 rounded-full">
                {approvedCount}
              </Badge>
            </Button>
          </div>
        </div>

        {/* Premium Search */}
        <div className="mb-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-slate-200/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-xl flex items-center justify-center shadow-lg">
                <Filter className="text-white" size={20} />
              </div>
              <h3 className="text-academy-blue font-bold text-lg">البحث والتصفية</h3>
            </div>
            <div className="relative">
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-academy-gold z-10">
                <Filter size={22} />
              </div>
              <Input
                type="text"
                placeholder="ابحث بالاسم، البريد الإلكتروني، أو التخصص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-14 pl-6 h-14 text-lg rounded-2xl border-2 border-slate-200/50 focus:border-academy-gold focus:ring-academy-gold/20 focus:ring-4 bg-white/90 backdrop-blur-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md"
              />
              {searchTerm && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Badge className="bg-academy-gold/10 text-academy-gold border-academy-gold/20">
                    {filteredAccreditations.length} نتيجة
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium Accreditations List */}
        {filteredAccreditations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAccreditations.map((accreditation) => (
              <Card key={accreditation.id} className="group bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-6 hover:scale-[1.03] relative border border-slate-200/50">
                {/* Premium Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Premium Status Indicator */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                  accreditation.status === "approved" ? "bg-gradient-to-r from-emerald-400 to-green-500" :
                  accreditation.status === "pending" ? "bg-gradient-to-r from-amber-400 to-yellow-500" :
                  "bg-gradient-to-r from-red-400 to-rose-500"
                }`}></div>

                <CardContent className="p-8 relative z-10">
                  {/* Premium Header */}
                  <div className="mb-8">
                    <div className="flex items-start gap-6 mb-4">
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 ${
                          accreditation.status === "approved" ? "bg-gradient-to-br from-emerald-100 to-green-100 border-2 border-emerald-200" :
                          accreditation.status === "pending" ? "bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-200" :
                          "bg-gradient-to-br from-red-100 to-rose-100 border-2 border-red-200"
                        }`}>
                          {accreditation.status === "approved" ? (
                            <Shield className="text-emerald-600 group-hover:scale-110 transition-transform duration-300" size={28} />
                          ) : accreditation.status === "pending" ? (
                            <Clock className="text-amber-600 group-hover:scale-110 transition-transform duration-300" size={28} />
                          ) : (
                            <XCircle className="text-red-600 group-hover:scale-110 transition-transform duration-300" size={28} />
                          )}
                        </div>
                        {accreditation.status === "approved" && (
                          <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                            <Crown size={12} className="text-academy-blue" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-300 mb-3 leading-tight">
                          {accreditation.full_name}
                        </h3>
                        {getStatusBadge(accreditation.status)}
                      </div>
                    </div>
                  </div>

                  {/* Premium Details Grid */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-lg flex items-center justify-center">
                          <Mail className="text-academy-gold" size={16} />
                        </div>
                        <span className="text-academy-blue font-semibold text-sm">البريد الإلكتروني</span>
                      </div>
                      <span className="text-academy-dark-gray font-medium truncate block">{accreditation.email}</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-lg flex items-center justify-center">
                          <Phone className="text-academy-gold" size={16} />
                        </div>
                        <span className="text-academy-blue font-semibold text-sm">رقم الهاتف</span>
                      </div>
                      <span className="text-academy-dark-gray font-medium">{accreditation.phone}</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-lg flex items-center justify-center">
                          <Award className="text-academy-gold" size={16} />
                        </div>
                        <span className="text-academy-blue font-semibold text-sm">التخصص</span>
                      </div>
                      <span className="text-academy-dark-gray font-medium line-clamp-2">{accreditation.specialization}</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-lg flex items-center justify-center">
                          <Calendar className="text-academy-gold" size={16} />
                        </div>
                        <span className="text-academy-blue font-semibold text-sm">تاريخ التقديم</span>
                      </div>
                      <span className="text-academy-dark-gray font-medium">
                        {new Date(accreditation.created_at).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                  </div>

                  {/* Premium Admin Message */}
                  {accreditation.admin_message && (
                    <div className="bg-gradient-to-br from-academy-blue-50/80 to-academy-gold-50/80 backdrop-blur-sm p-6 rounded-2xl mb-8 border border-academy-blue-200/50 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <MessageSquare className="text-academy-gold" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-academy-blue font-semibold text-sm mb-2">رسالة الإدارة</h4>
                          <p className="text-academy-dark-gray text-sm line-clamp-3 font-medium leading-relaxed">{accreditation.admin_message}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Premium Action Buttons */}
                  {accreditation.status === "pending" && (
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setShowActionModal({ accreditation, action: "approve" })}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold flex-1 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-0"
                      >
                        <Shield size={18} className="ml-2" />
                        اعتماد
                      </Button>
                      <Button
                        onClick={() => setShowActionModal({ accreditation, action: "reject" })}
                        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold flex-1 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-0"
                      >
                        <XCircle size={18} className="ml-2" />
                        رفض
                      </Button>
                    </div>
                  )}
                  
                  {/* Premium Approved Badge */}
                  {accreditation.status === "approved" && (
                    <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm p-4 rounded-2xl border border-emerald-200/50 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                          <Shield className="text-white" size={16} />
                        </div>
                        <span className="text-emerald-700 font-bold">مدرب معتمد</span>
                        <Sparkles className="text-academy-gold animate-pulse" size={16} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 relative">
            {/* Premium Empty State Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50 rounded-3xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="relative mx-auto mb-12 w-40 h-40">
                <div className="w-40 h-40 bg-gradient-to-br from-academy-gold/10 via-academy-blue/5 to-academy-gold/20 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border border-academy-gold/20">
                  {activeTab === "pending" ? (
                    <Clock className="text-academy-gold" size={64} />
                  ) : (
                    <Shield className="text-academy-gold" size={64} />
                  )}
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-full flex items-center justify-center shadow-xl animate-pulse">
                  <Sparkles className="text-academy-gold" size={20} />
                </div>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <h3 className="text-4xl font-bold text-academy-blue mb-6 leading-tight">
                  {activeTab === "pending" ? "لا توجد طلبات معلقة" : "لا توجد مدربين معتمدين"}
                </h3>
                <p className="text-academy-dark-gray text-xl leading-relaxed mb-8">
                  {activeTab === "pending" 
                    ? "لم يتم تقديم أي طلبات اعتماد جديدة بعد. سيظهر هنا جميع الطلبات المقدمة من المدربين." 
                    : "لم يتم اعتماد أي مدربين بعد. سيظهر هنا جميع المدربين المعتمدين من الأكاديمية."}
                </p>
                
                {/* Premium Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
                  <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-slate-200/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-academy-blue/10 to-academy-blue/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <User className="text-academy-blue" size={24} />
                    </div>
                    <h4 className="text-academy-blue font-bold text-lg mb-2">إدارة شاملة</h4>
                    <p className="text-academy-dark-gray text-sm">متابعة جميع طلبات الاعتماد وإدارة المدربين بكفاءة عالية</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-slate-200/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-academy-gold/10 to-academy-gold/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Award className="text-academy-gold" size={24} />
                    </div>
                    <h4 className="text-academy-blue font-bold text-lg mb-2">معايير عالية</h4>
                    <p className="text-academy-dark-gray text-sm">ضمان جودة التدريب من خلال معايير اعتماد صارمة ومحددة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Premium Floating Elements */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-academy-blue font-medium text-sm">النظام متصل</span>
          </div>
        </div>
      </div>
    </div>
  )
}
