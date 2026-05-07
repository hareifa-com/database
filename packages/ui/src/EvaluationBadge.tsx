import React from 'react'
import { Star, TrendingUp, Award } from 'lucide-react'

export interface EvaluationBadgeProps {
  score: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const EvaluationBadge: React.FC<EvaluationBadgeProps> = ({
  score,
  showLabel = true,
  size = 'md',
  className = ''
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 border-green-600 bg-green-50'
    if (score >= 8) return 'text-blue-600 border-blue-600 bg-blue-50'
    if (score >= 7) return 'text-yellow-600 border-yellow-600 bg-yellow-50'
    if (score >= 6) return 'text-orange-600 border-orange-600 bg-orange-50'
    return 'text-red-600 border-red-600 bg-red-50'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 9) return 'ممتاز'
    if (score >= 8) return 'جيد جداً'
    if (score >= 7) return 'جيد'
    if (score >= 6) return 'متوسط'
    return 'ضعيف'
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs'
      case 'lg':
        return 'px-4 py-2 text-lg'
      default:
        return 'px-3 py-1.5 text-sm'
    }
  }

  const getIconSize = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3'
      case 'lg':
        return 'w-6 h-6'
      default:
        return 'w-4 h-4'
    }
  }

  const colorClasses = getScoreColor(score)
  const sizeClasses = getSizeClasses(size)
  const iconSize = getIconSize(size)

  return (
    <div className={`inline-flex items-center border rounded-full ${colorClasses} ${sizeClasses} ${className}`}>
      {score >= 9 ? (
        <Award className={`${iconSize} ml-1`} />
      ) : score >= 8 ? (
        <TrendingUp className={`${iconSize} ml-1`} />
      ) : (
        <Star className={`${iconSize} ml-1`} />
      )}
      
      <span className="font-bold">{score.toFixed(1)}</span>
      
      {showLabel && (
        <span className="mr-1">{getScoreLabel(score)}</span>
      )}
    </div>
  )
}
