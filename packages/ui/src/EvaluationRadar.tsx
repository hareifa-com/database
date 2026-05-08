import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

export interface EvaluationRadarProps {
  data: {
    technicalSkills?: number
    physicalAttributes?: number
    mentalAspects?: number
    tacticalUnderstanding?: number
  }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const EvaluationRadar: React.FC<EvaluationRadarProps> = ({
  data,
  size = 'md',
  className = ''
}) => {
  const chartData = [
    {
      category: 'المهارات الفنية',
      value: data.technicalSkills || 0,
      fullMark: 10
    },
    {
      category: 'الصفات البدنية',
      value: data.physicalAttributes || 0,
      fullMark: 10
    },
    {
      category: 'الجوانب الذهنية',
      value: data.mentalAspects || 0,
      fullMark: 10
    },
    {
      category: 'الفهم التكتيكي',
      value: data.tacticalUnderstanding || 0,
      fullMark: 10
    }
  ]

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'h-48 w-48'
      case 'lg':
        return 'h-96 w-96'
      default:
        return 'h-64 w-64'
    }
  }

  return (
    <div className={`${getSizeClasses(size)} ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid 
            gridType="polygon"
            stroke="#e5e7eb"
            strokeWidth={1}
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: size === 'sm' ? 10 : size === 'lg' ? 14 : 12 }}
            className="text-gray-600"
          />
          <PolarRadiusAxis
            domain={[0, 10]}
            tickCount={6}
            tick={{ fontSize: size === 'sm' ? 8 : size === 'lg' ? 12 : 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Radar
            name="التقييم"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
