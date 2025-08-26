"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import SocialMediaButtons from "./SocialMediaButtons"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Award,
  BookOpen,
  Users,
  ChevronUp,
  Loader2,
  HelpCircle,
  GraduationCap,
  Crown,
  UserCheck,
  Newspaper,
  Monitor,
  Building2,
  Code,
  Palette,
  Heart,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { subscribeToNewsletter } from "@/app/actions/news-actions"
import { toast } from "sonner"

export default function Footer() {
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [email, setEmail] = useState("")

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("يرجى إدخال بريدك الإلكتروني")
      return
    }

    setIsSubscribing(true)
    const formData = new FormData()
    formData.append("email", email)

    try {
      const result = await subscribeToNewsletter(formData)
      if (result.success) {
        toast.success(result.message)
        setEmail("")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع")
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-academy-blue text-white relative">
      {/* Scroll to Top Button */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={scrollToTop}
          className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 rounded-full w-12 h-12 shadow-lg"
          size="icon"
        >
          <ChevronUp size={20} />
        </Button>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-academy-gold rounded-full flex items-center justify-center">
                <span className="text-academy-blue font-bold text-xl">م</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-academy-gold">أكاديمية المعرفة</h3>
                <p className="text-sm text-gray-300">الدولية</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              أكاديمية رائدة في التعليم والتدريب، نسعى لبناء العقول وتطوير المستقبل من خلال برامج تعليمية متميزة ومعتمدة
              دولياً.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-academy-blue/50 rounded-lg">
                <div className="text-academy-gold font-bold text-lg">+15K</div>
                <div className="text-xs text-gray-300">طالب</div>
              </div>
              <div className="text-center p-3 bg-academy-blue/50 rounded-lg">
                <div className="text-academy-gold font-bold text-lg">+50</div>
                <div className="text-xs text-gray-300">دولة</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-academy-gold border-b border-academy-gold/30 pb-2">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { name: "من نحن", href: "/about", icon: Users },
                { name: "البرامج التعليمية", href: "/programs", icon: BookOpen },
                { name: "القبول والتسجيل", href: "/admission", icon: Award },
                { name: "التحقق من الشهادات", href: "/verification", icon: Award },
                { name: "الاعتمادات والشراكات", href: "/accreditations", icon: Globe },
                { name: "الأسئلة الشائعة", href: "/faq", icon: HelpCircle },
                { name: "مجلة وعي", href: "/magazine", icon: BookOpen },
              ].map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 space-x-reverse text-gray-300 hover:text-academy-gold transition-colors duration-200 group"
                    >
                      <Icon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Academic Sections */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-academy-gold border-b border-academy-gold/30 pb-2">
              الأقسام الأكاديمية
            </h4>
            <ul className="space-y-3">
              {[
                { name: "الأقسام الأكاديمية", href: "/departments", icon: Building2 },
                { name: "هيئة التدريس", href: "/faculty", icon: GraduationCap },
                { name: "المدربين المعتمدين", href: "/trainers", icon: UserCheck },
                { name: "هيئة التدريس والخريجين", href: "/graduates", icon: Crown },
                { name: "نظام التعليم", href: "/education-system", icon: Monitor },
                { name: "المدونة والأخبار", href: "/blog", icon: Newspaper },
              ].map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 space-x-reverse text-gray-300 hover:text-academy-gold transition-colors duration-200 group hover:translate-x-1"
                    >
                      <Icon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-academy-gold border-b border-academy-gold/30 pb-2">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-academy-gold/20 rounded-full flex items-center justify-center">
                  <Phone size={16} className="text-academy-gold" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">+967 730 530 992</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-academy-gold/20 rounded-full flex items-center justify-center">
                  <Mail size={16} className="text-academy-gold" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">info@knowledge-academy.edu</p>
                  <p className="text-gray-300 text-sm">admission@knowledge-academy.edu</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="text-academy-gold font-semibold mb-3">تابعنا على</h5>
              <div className="flex space-x-3 space-x-reverse">
                <SocialMediaButtons/>
                {/* {[{ icon: Youtube, href: "https://youtube.com/@almarifh2018?si=-NzMdaI7YB4H6-il", color: "hover:bg-red-600" },
      { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                  { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
                  { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                  { icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
                
                ].map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-academy-gold/20 rounded-full flex items-center justify-center text-academy-gold transition-all duration-200 ${social.color} hover:text-white hover:scale-110`}
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}*/}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-academy-gold/20">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-bold text-academy-gold mb-4">اشترك في نشرتنا الإخبارية</h4>
            <p className="text-gray-300 mb-6">احصل على آخر الأخبار والتحديثات حول البرامج والفعاليات</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-academy-gold/30 text-white placeholder-gray-400 focus:outline-none focus:border-academy-gold focus:bg-white/20 transition-all duration-200"
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-academy-gold text-academy-blue hover:bg-academy-gold/90 font-bold px-6 py-3 rounded-lg whitespace-nowrap disabled:opacity-50"
              >
                {isSubscribing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                    جاري الاشتراك...
                  </>
                ) : (
                  "اشتراك"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-academy-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-right">
              <p className="text-gray-300 text-sm">© 2018 أكاديمية المعرفة الدولية. جميع الحقوق محفوظة.</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6 space-x-reverse text-sm">
              <Link href="/#" className="text-gray-300 hover:text-academy-gold transition-colors duration-200">
                سياسة الخصوصية
              </Link>
              <Link href="/#" className="text-gray-300 hover:text-academy-gold transition-colors duration-200">
                الشروط والأحكام
              </Link>
              {/*<Link href="/#" className="text-gray-300 hover:text-academy-gold transition-colors duration-200">
                خريطة الموقع
              </Link>*/}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 pt-6 border-t border-academy-gold/10">
          <div className="flex flex-wrap justify-center items-center space-x-8 space-x-reverse opacity-60">
            <div className="text-xs text-gray-400 text-center">
              <Award size={24} className="mx-auto mb-1 text-academy-gold" />
              <span>معتمد دولياً</span>
            </div>
            <div className="text-xs text-gray-400 text-center">
              <Globe size={24} className="mx-auto mb-1 text-academy-gold" />
              <span>شراكات عالمية</span>
            </div>
            <div className="text-xs text-gray-400 text-center">
              <BookOpen size={24} className="mx-auto mb-1 text-academy-gold" />
              <span>جودة التعليم</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
