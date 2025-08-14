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
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 rounded-full px-3 py-1 font-bold">
            <Clock size={12} className="ml-1" />
            قيد المراجعة
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full px-3 py-1 font-bold">
            <CheckCircle size={12} className="ml-1" />
            معتمد
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 rounded-full px-3 py-1 font-bold">
            <XCircle size={12} className="ml-1" />
            مرفوض
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-academy-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-academy-gray-light via-academy-gray to-academy-blue-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-academy-blue-dark via-academy-blue to-academy-blue-light shadow-xl border-b border-academy-gold/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-academy-gold/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Award className="text-academy-gold" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">إدارة الاعتمادات</h1>
                  <p className="text-white/80 text-lg">مراجعة طلبات الاعتماد وإدارة المدربين المعتمدين</p>
                </div>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-yellow-200/50">
                <div className="text-yellow-800 font-bold text-2xl">{pendingCount}</div>
                <div className="text-yellow-600 text-sm font-medium">طلبات معلقة</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-200/50">
                <div className="text-green-800 font-bold text-2xl">{approvedCount}</div>
                <div className="text-green-600 text-sm font-medium">معتمد</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-200/50">
                <div className="text-red-800 font-bold text-2xl">{rejectedCount}</div>
                <div className="text-red-600 text-sm font-medium">مرفوض</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Success/Error Messages */}
      {message && (
        <div className="container mx-auto px-4 py-4">
          <div
            className={`flex items-center p-4 rounded-xl shadow-lg slide-up ${
              message.type === "success"
                ? "alert-success text-green-800"
                : "alert-error text-red-800"
            }`}
          >
            {message.type === "success" ? (
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                <CheckCircle size={16} className="text-green-600" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-3">
                <AlertCircle size={16} className="text-red-600" />
              </div>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Enhanced Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 slide-up" style={{backdropFilter: 'blur(8px)', background: 'rgba(0, 31, 63, 0.8)'}}>
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border-0 shadow-2xl">
            <CardHeader className="border-b border-academy-blue-100 bg-gradient-to-r from-academy-blue-50 to-academy-gold-50">
              <CardTitle className="text-academy-blue flex items-center gap-3 text-xl font-bold">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  showActionModal.action === "approve" ? "bg-green-100" : "bg-red-100"
                }`}>
                  {showActionModal.action === "approve" ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                </div>
                <span>{showActionModal.action === "approve" ? "قبول" : "رفض"} طلب الاعتماد</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8 bg-white">
              {/* Enhanced Applicant Info */}
              <div className="bg-gradient-to-r from-academy-blue-50 to-academy-gold-50 p-6 rounded-xl border border-academy-blue-100">
                <h3 className="text-academy-blue font-bold mb-4 text-lg">بيانات المتقدم:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="text-academy-gold" size={16} />
                    <span className="font-medium text-academy-blue">الاسم:</span>
                    <span className="text-academy-dark-gray">{showActionModal.accreditation.full_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="text-academy-gold" size={16} />
                    <span className="font-medium text-academy-blue">البريد:</span>
                    <span className="text-academy-dark-gray">{showActionModal.accreditation.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-academy-gold" size={16} />
                    <span className="font-medium text-academy-blue">الهاتف:</span>
                    <span className="text-academy-dark-gray">{showActionModal.accreditation.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="text-academy-gold" size={16} />
                    <span className="font-medium text-academy-blue">التخصص:</span>
                    <span className="text-academy-dark-gray">{showActionModal.accreditation.specialization}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Admin Message */}
              <div>
                <Label htmlFor="adminMessage" className="text-academy-blue font-bold text-lg mb-3 block">
                  رسالة للمتقدم *
                </Label>
                <Textarea
                  id="adminMessage"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  rows={4}
                  className="border-2 border-academy-gold/30 focus:border-academy-gold resize-none rounded-xl bg-white text-lg"
                  placeholder={
                    showActionModal.action === "approve"
                      ? "اكتب رسالة ترحيب وتوضيح الخطوات التالية..."
                      : "اكتب سبب الرفض والتوجيهات للتحسين..."
                  }
                />
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-academy-blue-100">
                <Button
                  onClick={handleAction}
                  disabled={isSubmitting || !adminMessage.trim()}
                  className={`${
                    showActionModal.action === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white font-bold flex-1 text-lg px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      تأكيد {showActionModal.action === "approve" ? "القبول" : "الرفض"}
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setShowActionModal(null)
                    setAdminMessage("")
                  }}
                  className="btn-secondary text-academy-blue font-bold text-lg px-8 py-4 rounded-xl flex-1 hover:scale-105 transition-all duration-300"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            onClick={() => setActiveTab("pending")}
            className={`${
              activeTab === "pending"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white text-academy-blue border-2 border-academy-blue hover:bg-academy-blue hover:text-white"
            } font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105`}
          >
            <Clock size={18} className="ml-2" />
            الطلبات المعلقة ({pendingCount})
          </Button>
          <Button
            onClick={() => setActiveTab("approved")}
            className={`${
              activeTab === "approved"
                ? "bg-academy-blue text-white shadow-lg"
                : "bg-white text-academy-blue border-2 border-academy-blue hover:bg-academy-blue hover:text-white"
            } font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105`}
          >
            <Award size={18} className="ml-2" />
            المعتمدون ({approvedCount})
          </Button>
        </div>

        {/* Enhanced Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold" size={20} />
            <Input
              type="text"
              placeholder="البحث بالاسم أو البريد أو التخصص..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12 h-12 text-lg rounded-xl border-2 border-academy-gold/30 focus:border-academy-gold bg-white"
            />
          </div>
        </div>

        {/* Enhanced Accreditations List */}
        {filteredAccreditations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccreditations.map((accreditation) => (
              <Card key={accreditation.id} className="group border-0 shadow-lg hover:shadow-2xl bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] relative">
                <CardContent className="p-6">
                  {/* Enhanced Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-academy-gold/30 to-academy-gold/20 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <User className="text-academy-blue group-hover:scale-110 transition-transform duration-300" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-300 line-clamp-1 mb-2">
                          {accreditation.full_name}
                        </h3>
                        {getStatusBadge(accreditation.status)}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-academy-gray-light rounded-lg group-hover:bg-academy-blue-50 transition-colors duration-300">
                      <Mail className="text-academy-gold flex-shrink-0" size={18} />
                      <span className="text-academy-dark-gray font-medium truncate">{accreditation.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-academy-gray-light rounded-lg group-hover:bg-academy-blue-50 transition-colors duration-300">
                      <Phone className="text-academy-gold flex-shrink-0" size={18} />
                      <span className="text-academy-dark-gray font-medium">{accreditation.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-academy-gray-light rounded-lg group-hover:bg-academy-blue-50 transition-colors duration-300">
                      <Award className="text-academy-gold flex-shrink-0" size={18} />
                      <span className="text-academy-dark-gray font-medium line-clamp-2">{accreditation.specialization}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-academy-gray-light rounded-lg group-hover:bg-academy-blue-50 transition-colors duration-300">
                      <Calendar className="text-academy-gold flex-shrink-0" size={18} />
                      <span className="text-academy-dark-gray font-medium">
                        {new Date(accreditation.created_at).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Admin Message */}
                  {accreditation.admin_message && (
                    <div className="bg-gradient-to-r from-academy-blue-50 to-academy-gold-50 p-4 rounded-xl mb-6 border border-academy-blue-100">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="text-academy-gold flex-shrink-0 mt-1" size={16} />
                        <p className="text-academy-dark-gray text-sm line-clamp-3 font-medium">{accreditation.admin_message}</p>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Actions */}
                  {accreditation.status === "pending" && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setShowActionModal({ accreditation, action: "approve" })}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold flex-1 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                      >
                        <CheckCircle size={16} className="ml-2" />
                        قبول
                      </Button>
                      <Button
                        onClick={() => setShowActionModal({ accreditation, action: "reject" })}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold flex-1 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                      >
                        <XCircle size={16} className="ml-2" />
                        رفض
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 fade-in">
            <div className="w-32 h-32 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              {activeTab === "pending" ? (
                <Clock className="text-academy-gold" size={48} />
              ) : (
                <Award className="text-academy-gold" size={48} />
              )}
            </div>
            <h3 className="text-3xl font-bold text-academy-blue mb-4">
              {activeTab === "pending" ? "لا توجد طلبات معلقة" : "لا توجد اعتمادات"}
            </h3>
            <p className="text-academy-dark-gray text-lg">
              {activeTab === "pending" ? "لم يتم تقديم أي طلبات اعتماد جديدة بعد." : "لم يتم اعتماد أي مدربين بعد."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
