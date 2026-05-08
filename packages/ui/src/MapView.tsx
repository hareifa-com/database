import React from 'react'
import { MapPin, Users } from 'lucide-react'

export interface MapMarker {
  id: string
  name: string
  lat: number
  lng: number
  type: 'player' | 'academy'
  count?: number
  rating?: number
}

export interface MapViewProps {
  markers: MapMarker[]
  center?: { lat: number; lng: number }
  zoom?: number
  onMarkerClick?: (marker: MapMarker) => void
  className?: string
}

export const MapView: React.FC<MapViewProps> = ({
  markers,
  center = { lat: 30.0444, lng: 31.2357 }, // Cairo coordinates
  zoom = 6,
  onMarkerClick,
  className = ''
}) => {
  const getMarkerColor = (type: string, rating?: number) => {
    if (type === 'academy') {
      return 'bg-blue-500'
    }
    
    if (rating && rating >= 8) {
      return 'bg-green-500'
    }
    return 'bg-orange-500'
  }

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {/* Placeholder for actual map implementation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">خريطة تفاعلية</p>
            <p className="text-gray-500 text-sm">سيتم عرض الخريطة هنا</p>
          </div>
        </div>
        
        {/* Mock markers */}
        {markers.map((marker, index) => (
          <div
            key={marker.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${30 + (index * 10)}%`
            }}
            onClick={() => onMarkerClick?.(marker)}
          >
            <div className={`w-8 h-8 ${getMarkerColor(marker.type, marker.rating)} rounded-full flex items-center justify-center text-white shadow-lg`}>
              {marker.type === 'academy' ? (
                <Users className="w-4 h-4" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
            </div>
            {marker.count && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {marker.count}
              </div>
            )}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
              {marker.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Map controls placeholder */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 space-y-2">
        <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
          +
        </button>
        <button className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
          −
        </button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <h4 className="text-sm font-semibold mb-2">الخريطة</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full ml-2"></div>
            <span>أكاديمية</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full ml-2"></div>
            <span>لاعب مميز</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full ml-2"></div>
            <span>لاعب</span>
          </div>
        </div>
      </div>
    </div>
  )
}
