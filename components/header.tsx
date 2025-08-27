"use client"

import { useState } from "react"
import { Menu, X, GraduationCap, Home, Info, Users, BookOpen, UserCheck, Award, Settings, FileText, CheckCircle, Handshake, Newspaper, MessageSquare, HelpCircle } from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white shadow-xl border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Academy Name */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="Academy Logo" 
                    className="w-10 h-10 object-contain" 
                    />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-academy-blue">
                  أكاديمية المعرفة الدولية
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">نبني العقول ونطور المستقبل</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-academy-blue text-academy-gold hover:bg-academy-blue-light hover:text-academy-gold-light transition-all duration-300 shadow-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-academy-blue text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="bg-academy-gold text-academy-blue p-2 rounded-full">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold">أكاديمية المعرفة</h2>
                    <p className="text-sm opacity-90">القائمة الرئيسية</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-academy-gold transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <MobileSidebarContent onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

function MobileSidebarContent({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "من نحن", href: "/about", icon: Info },
    { name: "مجلس الإدارة", href: "/board", icon: Users },
    { name: "هيئة التدريس", href: "/faculty", icon: UserCheck },
    { name: "المدربين المعتمدين", href: "/trainers", icon: Award },
    { name: "هيئة التدريس والخريجين", href: "/graduates", icon: GraduationCap },
    { name: "الأقسام الأكاديمية", href: "/departments", icon: BookOpen },
    { name: "البرامج التعليمية", href: "/programs", icon: FileText },
    { name: "نظام التعليم", href: "/education-system", icon: Settings },
    { name: "القبول والتسجيل", href: "/admission", icon: FileText },
    { name: "التحقق من الشهادات", href: "/verification", icon: CheckCircle },
    { name: "الاعتمادات والشراكات", href: "/accreditations", icon: Handshake },
    { name: "الأسئلة الشائعة", href: "/faq", icon: HelpCircle },
    { name: "مجلة وعي", href: "https://journal-academy-y9yi.vercel.app/", icon: Newspaper },
    { name: "المدونة والأخبار", href: "/blog", icon: MessageSquare },
  ]

  return (
    <nav className="p-4 pb-6 max-h-[calc(100vh-120px)] overflow-y-auto">
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={onClose}
                className="nav-item flex items-center space-x-3 space-x-reverse p-3 rounded-lg text-gray-700 hover:text-white transition-all"
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
