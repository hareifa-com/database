import React from 'react'
import { User, MapPin, Calendar, Trophy } from 'lucide-react'

export interface PlayerCardProps {
  id: string
  name: string
  position: string
  age?: number
  governorate: string
  rating?: number
  academy?: string
  image?: string
  onClick?: () => void
  className?: string
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  id,
  name,
  position,
  age,
  governorate,
  rating,
  academy,
  image,
  onClick,
  className = ''
}) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'text-green-600'
    if (rating >= 8) return 'text-blue-600'
    if (rating >= 7) return 'text-yellow-600'
    if (rating >= 6) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRatingBgColor = (rating: number) => {
    if (rating >= 9) return 'bg-green-100'
    if (rating >= 8) return 'bg-blue-100'
    if (rating >= 7) return 'bg-yellow-100'
    if (rating >= 6) return 'bg-orange-100'
    return 'bg-red-100'
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
            {image ? (
              <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
            <p className="text-gray-600">{position}</p>
          </div>
          {rating && (
            <div className="text-left">
              <div className={`text-2xl font-bold ${getRatingColor(rating)}`}>
                {rating.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">تقييم</div>
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          {age && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 ml-2" />
              <span>{age} سنة</span>
            </div>
          )}
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 ml-2" />
            <span>{governorate}</span>
          </div>

          {academy && (
            <div className="flex items-center">
              <Trophy className="w-4 h-4 ml-2" />
              <span>{academy}</span>
            </div>
          )}
        </div>

        {rating && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">مستوى التقييم</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRatingBgColor(rating)} ${getRatingColor(rating)}`}>
                {rating >= 9 ? 'ممتاز' : 
                 rating >= 8 ? 'جيد جداً' : 
                 rating >= 7 ? 'جيد' : 
                 rating >= 6 ? 'متوسط' : 'ضعيف'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  rating >= 9 ? 'bg-green-600' :
                  rating >= 8 ? 'bg-blue-600' :
                  rating >= 7 ? 'bg-yellow-600' :
                  rating >= 6 ? 'bg-orange-600' : 'bg-red-600'
                }`}
                style={{ width: `${(rating / 10) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
