import React from 'react';
export interface MapMarker {
    id: string;
    name: string;
    lat: number;
    lng: number;
    type: 'player' | 'academy';
    count?: number;
    rating?: number;
}
export interface MapViewProps {
    markers: MapMarker[];
    center?: {
        lat: number;
        lng: number;
    };
    zoom?: number;
    onMarkerClick?: (marker: MapMarker) => void;
    className?: string;
}
export declare const MapView: React.FC<MapViewProps>;
//# sourceMappingURL=MapView.d.ts.map