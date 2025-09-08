import type { Graduate } from "@/app/actions/graduates-actions"
import { MapPin, Calendar, Briefcase, Star, Crown, Award, Sparkles, Quote } from "lucide-react"

interface GraduateCardProps {
  graduate: Graduate
}

export function GraduateCard({ graduate }: GraduateCardProps) {
  return (
    <div className="group bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-6 hover:scale-[1.02] relative border border-slate-200/50">
      {/* Premium Status Indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue"></div>
      
      {/* Premium Card Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="p-8 relative z-10">
        {/* Premium Header Section */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            {/* Premium Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-dark rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 border-2 border-academy-gold/20">
                <Star className="text-academy-gold group-hover:scale-110 transition-transform duration-300" size={28} />
              </div>
              {/* Crown Badge */}
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                <Crown size={12} className="text-academy-blue" />
              </div>
              {/* Sparkle Effect */}
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-academy-gold rounded-full opacity-60 animate-pulse"></div>
            </div>

            {/* Graduate Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-academy-blue group-hover:text-academy-gold transition-colors duration-300 mb-2 leading-tight">
                {graduate.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-lg flex items-center justify-center">
                  <Award className="text-academy-blue" size={14} />
                </div>
                <span className="text-academy-blue font-semibold text-lg">{graduate.specialization}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Details Section */}
        <div className="space-y-4 mb-8">
          {/* Current Position */}
          <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-academy-blue/20 to-academy-blue/10 rounded-lg flex items-center justify-center">
                <Briefcase className="text-academy-blue" size={16} />
              </div>
              <span className="text-academy-blue font-semibold text-sm">الدرجة العلمية</span>
            </div>
            <span className="text-academy-dark-gray font-medium text-lg">{graduate.current_position}</span>
          </div>

          {/* Location and Year */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-lg flex items-center justify-center">
                  <MapPin className="text-academy-gold" size={14} />
                </div>
                <span className="text-academy-blue font-semibold text-xs">البلد</span>
              </div>
              <span className="text-academy-dark-gray font-medium text-sm">{graduate.country}</span>
            </div>

            <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 group-hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-academy-gold/20 to-academy-gold/10 rounded-lg flex items-center justify-center">
                  <Calendar className="text-academy-gold" size={14} />
                </div>
                <span className="text-academy-blue font-semibold text-xs">عدد سنوات العمل</span>
              </div>
              <span className="text-academy-dark-gray font-medium text-sm">{graduate.graduation_year}</span>
            </div>
          </div>
        </div>

        {/* Premium Success Story Section */}
        <div className="bg-gradient-to-br from-academy-blue-50/80 to-academy-gold-50/80 backdrop-blur-sm p-6 rounded-2xl border border-academy-blue-200/50 shadow-sm relative overflow-hidden">
          {/* Quote Icon */}
          <div className="absolute top-4 right-4 opacity-20">
            <Quote size={24} className="text-academy-blue" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-academy-blue/10 to-academy-gold/10 rounded-lg flex items-center justify-center">
                <Sparkles className="text-academy-gold" size={16} />
              </div>
              <h4 className="text-academy-blue font-bold text-lg">السيرة الذاتية</h4>
            </div>
            <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-4 font-medium">
              {graduate.success_story}
            </p>
          </div>
        </div>
      </div>

      {/* Premium Gradient Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-academy-blue via-academy-gold to-academy-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      {/* Premium Floating Elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-academy-gold rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
      <div className="absolute bottom-6 right-6 w-3 h-3 bg-academy-blue rounded-full opacity-0 group-hover:opacity-40 animate-pulse delay-300 transition-opacity duration-300"></div>
    </div>
  )
}
