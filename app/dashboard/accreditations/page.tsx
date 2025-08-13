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
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock size={12} className="ml-1" />
            قيد المراجعة
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle size={12} className="ml-1" />
            معتمد
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
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
      <div className="min-h-screen bg-academy-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-academy-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-academy-blue font-semibold">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-academy-gray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark"></div>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-academy-blue">إدارة الاعتمادات</h1>
              <p className="text-academy-dark-gray">مراجعة طلبات الاعتماد وإدارة المدربين المعتمدين</p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-yellow-100 px-4 py-2 rounded-lg text-center">
                <div className="text-yellow-800 font-bold text-lg">{pendingCount}</div>
                <div className="text-yellow-600 text-sm">طلبات معلقة</div>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-lg text-center">
                <div className="text-green-800 font-bold text-lg">{approvedCount}</div>
                <div className="text-green-600 text-sm">معتمد</div>
              </div>
              <div className="bg-red-100 px-4 py-2 rounded-lg text-center">
                <div className="text-red-800 font-bold text-lg">{rejectedCount}</div>
                <div className="text-red-600 text-sm">مرفوض</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {message && (
        <div className="container mx-auto px-4 py-4">
          <div
            className={`flex items-center p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={20} className="ml-2" />
            ) : (
              <AlertCircle size={20} className="ml-2" />
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader>
              <CardTitle className="text-academy-blue flex items-center space-x-2 space-x-reverse">
                {showActionModal.action === "approve" ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <XCircle className="text-red-500" size={24} />
                )}
                <span>{showActionModal.action === "approve" ? "قبول" : "رفض"} طلب الاعتماد</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Applicant Info */}
              <div className="bg-academy-gray p-4 rounded-lg">
                <h3 className="text-academy-blue font-bold mb-3">بيانات المتقدم:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <strong>الاسم:</strong> {showActionModal.accreditation.full_name}
                  </div>
                  <div>
                    <strong>البريد:</strong> {showActionModal.accreditation.email}
                  </div>
                  <div>
                    <strong>الهاتف:</strong> {showActionModal.accreditation.phone}
                  </div>
                  <div>
                    <strong>التخصص:</strong> {showActionModal.accreditation.specialization}
                  </div>
                </div>
              </div>

              {/* Admin Message */}
              <div>
                <Label htmlFor="adminMessage" className="text-academy-blue font-semibold text-lg mb-3 block">
                  رسالة للمتقدم *
                </Label>
                <Textarea
                  id="adminMessage"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  rows={4}
                  className="border-academy-gold/30 focus:border-academy-gold resize-none"
                  placeholder={
                    showActionModal.action === "approve"
                      ? "اكتب رسالة ترحيب وتوضيح الخطوات التالية..."
                      : "اكتب سبب الرفض والتوجيهات للتحسين..."
                  }
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleAction}
                  disabled={isSubmitting || !adminMessage.trim()}
                  className={`${
                    showActionModal.action === "approve"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white font-bold flex-1`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="ml-2" />
                      تأكيد {showActionModal.action === "approve" ? "القبول" : "الرفض"}
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setShowActionModal(null)
                    setAdminMessage("")
                  }}
                  variant="outline"
                  className="border-academy-blue text-academy-blue hover:bg-academy-blue hover:text-white flex-1 bg-transparent"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            onClick={() => setActiveTab("pending")}
            className={`${
              activeTab === "pending"
                ? "bg-academy-blue text-white"
                : "bg-white text-academy-blue border border-academy-blue"
            } font-bold`}
          >
            <Clock size={16} className="ml-2" />
            الطلبات المعلقة ({pendingCount})
          </Button>
          <Button
            onClick={() => setActiveTab("approved")}
            className={`${
              activeTab === "approved"
                ? "bg-academy-blue text-white"
                : "bg-white text-academy-blue border border-academy-blue"
            } font-bold`}
          >
            <Award size={16} className="ml-2" />
            المعتمدون ({approvedCount})
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-academy-gold" size={20} />
            <Input
              type="text"
              placeholder="البحث بالاسم أو البريد أو التخصص..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12 border-academy-gold/30 focus:border-academy-gold"
            />
          </div>
        </div>

        {/* Accreditations List */}
        {filteredAccreditations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccreditations.map((accreditation) => (
              <Card key={accreditation.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center">
                        <User className="text-academy-blue" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-academy-blue line-clamp-1">{accreditation.full_name}</h3>
                        {getStatusBadge(accreditation.status)}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Mail className="text-academy-gold flex-shrink-0" size={16} />
                      <span className="text-academy-dark-gray truncate">{accreditation.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Phone className="text-academy-gold flex-shrink-0" size={16} />
                      <span className="text-academy-dark-gray">{accreditation.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Award className="text-academy-gold flex-shrink-0" size={16} />
                      <span className="text-academy-dark-gray line-clamp-2">{accreditation.specialization}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Calendar className="text-academy-gold flex-shrink-0" size={16} />
                      <span className="text-academy-dark-gray">
                        {new Date(accreditation.created_at).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                  </div>

                  {/* Admin Message */}
                  {accreditation.admin_message && (
                    <div className="bg-academy-gray p-3 rounded-lg mb-4">
                      <div className="flex items-start space-x-2 space-x-reverse">
                        <MessageSquare className="text-academy-gold flex-shrink-0 mt-1" size={14} />
                        <p className="text-academy-dark-gray text-sm line-clamp-3">{accreditation.admin_message}</p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {accreditation.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setShowActionModal({ accreditation, action: "approve" })}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold flex-1 text-sm py-2"
                      >
                        <CheckCircle size={14} className="ml-1" />
                        قبول
                      </Button>
                      <Button
                        onClick={() => setShowActionModal({ accreditation, action: "reject" })}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold flex-1 text-sm py-2"
                      >
                        <XCircle size={14} className="ml-1" />
                        رفض
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-academy-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {activeTab === "pending" ? (
                <Clock className="text-academy-gold" size={48} />
              ) : (
                <Award className="text-academy-gold" size={48} />
              )}
            </div>
            <h3 className="text-2xl font-bold text-academy-blue mb-4">
              {activeTab === "pending" ? "لا توجد طلبات معلقة" : "لا توجد اعتمادات"}
            </h3>
            <p className="text-academy-dark-gray">
              {activeTab === "pending" ? "لم يتم تقديم أي طلبات اعتماد جديدة بعد." : "لم يتم اعتماد أي مدربين بعد."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
