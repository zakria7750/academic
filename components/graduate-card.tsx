import type { Graduate } from "@/app/actions/graduates-actions"
import { MapPin, Calendar, Briefcase, Star } from "lucide-react"

interface GraduateCardProps {
  graduate: Graduate
}

export function GraduateCard({ graduate }: GraduateCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header with Icon */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-academy-blue to-blue-600 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="mr-4">
            <h3 className="text-xl font-bold text-academy-blue group-hover:text-blue-600 transition-colors">
              {graduate.name}
            </h3>
            <p className="text-academy-dark-gray text-sm">{graduate.specialization}</p>
          </div>
        </div>

        {/* Current Position */}
        <div className="flex items-center mb-3 text-academy-dark-gray">
          <Briefcase className="w-4 h-4 ml-2 text-academy-blue" />
          <span className="text-sm font-medium">{graduate.current_position}</span>
        </div>

        {/* Location and Year */}
        <div className="flex items-center justify-between mb-4 text-sm text-academy-dark-gray">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 ml-1 text-academy-blue" />
            <span>{graduate.country}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 ml-1 text-academy-blue" />
            <span>{graduate.graduation_year}</span>
          </div>
        </div>

        {/* Success Story */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-academy-blue mb-2">قصة النجاح</h4>
          <p className="text-academy-dark-gray text-sm leading-relaxed line-clamp-4">{graduate.success_story}</p>
        </div>
      </div>

      {/* Gradient Border Effect */}
      <div className="h-1 bg-gradient-to-r from-academy-blue to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}
