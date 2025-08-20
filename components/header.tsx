"use client"

import { useState } from "react"
import { Menu, X, GraduationCap, Home, Info, Users, BookOpen, UserCheck, Award, Settings, FileText, CheckCircle, Handshake, Newspaper, MessageSquare, HelpCircle } from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl border-b border-indigo-400/20 sticky top-0 z-40 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Academy Name */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-amber-300/50 transform hover:scale-105 transition-all duration-300">
                {/*<GraduationCap className="text-slate-900 w-6 h-6" />*/}
                 <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="Academy Logo" 
                    className="w-10 h-10 object-contain" 
                    />
                 </div>

              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  أكاديمية المعرفة الدولية
                </h1>
                <p className="text-xs text-indigo-200/80 mt-0.5">نبني العقول ونطور المستقبل</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-indigo-800/50 text-amber-300 hover:bg-indigo-700/70 hover:text-amber-200 transition-all duration-300 shadow-lg border border-indigo-600/30"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-indigo-400/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-indigo-400/20 bg-gradient-to-r from-indigo-900/50 to-blue-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                    <GraduationCap className="text-slate-900 w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-amber-300 text-sm">أكاديمية المعرفة</span>
                    <p className="text-xs text-indigo-200/70">الدولية</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-indigo-800/50 text-amber-300 hover:bg-indigo-700/70 transition-colors duration-200"
                >
                  <X size={18} />
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
    { name: "الخريجون", href: "/graduates", icon: GraduationCap },
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
    <nav className="p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 space-x-reverse p-3 rounded-xl text-indigo-200 hover:bg-gradient-to-r hover:from-indigo-800/50 hover:to-blue-800/50 hover:text-amber-300 transition-all duration-300 group border border-transparent hover:border-indigo-400/30"
              >
                <IconComponent className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                <span className="font-medium text-sm">{item.name}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
