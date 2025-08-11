"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-academy-white shadow-md border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Academy Name */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-academy-blue rounded-full flex items-center justify-center">
                <span className="text-academy-gold font-bold text-lg">م</span>
              </div>
              <h1 className="text-xl font-bold text-academy-blue hidden sm:block">أكاديمية المعرفة الدولية</h1>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-academy-blue hover:bg-gray-100"
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
            className="fixed right-0 top-0 h-full w-80 bg-academy-white shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-8 h-8 bg-academy-blue rounded-full flex items-center justify-center">
                    <span className="text-academy-gold font-bold">م</span>
                  </div>
                  <span className="font-bold text-academy-blue">أكاديمية المعرفة</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-academy-blue hover:bg-gray-100"
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
    { name: "الرئيسية", href: "/", icon: "🏠" },
    { name: "من نحن", href: "/about", icon: "ℹ️" },
    { name: "مجلس الإدارة", href: "/board", icon: "👥" },
    { name: "هيئة التدريس", href: "/faculty", icon: "👨‍🏫" },
    { name: "المدربين المعتمدين", href: "/trainers", icon: "🎓" },
    { name: "الخريجون", href: "/graduates", icon: "🎓" },
    { name: "الأقسام الأكاديمية", href: "/departments", icon: "📚" },
    { name: "البرامج التعليمية", href: "/programs", icon: "📖" },
    { name: "نظام التعليم", href: "/education-system", icon: "🎯" },
    { name: "القبول والتسجيل", href: "/admission", icon: "📝" },
    { name: "التحقق من الشهادات", href: "/verification", icon: "✅" },
    { name: "الاعتمادات والشراكات", href: "/accreditations", icon: "🤝" },
    { name: "مجلة وعي", href: "/magazine", icon: "📰" },
    { name: "المدونة والأخبار", href: "/blog", icon: "📢" },
  ]

  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              onClick={onClose}
              className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg text-academy-blue hover:bg-academy-blue hover:text-white transition-colors duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
