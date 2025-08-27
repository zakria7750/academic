"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
  Users,
  GraduationCap,
  Award,
  BookOpen,
  Target,
  FileText,
  CheckCircle,
  Handshake,
  Newspaper,
  MessageSquare,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "من نحن", href: "/about", icon: Info },
  { name: "مجلس الإدارة", href: "/board", icon: Users },
  { name: "هيئة التدريس", href: "/faculty", icon: GraduationCap },
  { name: "المدربين المعتمدين", href: "/trainers", icon: Award },
  { name: "هيئة التدريس والخريجين", href: "/graduates", icon: GraduationCap },
  { name: "الأقسام الأكاديمية", href: "/departments", icon: BookOpen },
  { name: "البرامج التعليمية", href: "/programs", icon: BookOpen },
  { name: "نظام التعليم", href: "/education-system", icon: Target },
  { name: "القبول والتسجيل", href: "/admission", icon: FileText },
  { name: "التحقق من الشهادات", href: "/verification", icon: CheckCircle },
  { name: "الاعتمادات والشراكات", href: "/accreditations", icon: Handshake },
  { name: "الأسئلة الشائعة", href: "/faq", icon: HelpCircle },
  {
    name: "مجلة وعي",
    href: "https://journal-academy-y9yi.vercel.app/",
    target: "_blank",
    icon: Newspaper,
  },
  { name: "المدونة والأخبار", href: "/blog", icon: MessageSquare },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`${
        isExpanded ? "overflow-y-scroll" : "overflow"
      } hidden z-50 h-screen md:flex flex-col bg-white shadow-xl transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64 lg:w-80" : "w-16"
      } min-h-screen sticky top-0 fixed right-0`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo Section */}
      <div className="bg-academy-blue text-white p-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="bg-academy-gold text-academy-blue p-2 rounded-full flex-shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          {isExpanded && (
            <div>
              <h2 className="font-bold">أكاديمية المعرفة</h2>
              <p className="text-sm opacity-90">القائمة الرئيسية</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 pb-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`nav-item flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-academy-gold text-academy-blue"
                      : "text-gray-700 hover:text-white"
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0 w-5" />
                  {isExpanded && (
                    <span className="font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
