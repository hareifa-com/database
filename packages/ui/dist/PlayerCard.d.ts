import React from 'react';
export interface PlayerCardProps {
    id: string;
    name: string;
    position: string;
    age?: number;
    governorate: string;
    rating?: number;
    academy?: string;
    image?: string;
    onClick?: () => void;
    className?: string;
}
export declare const PlayerCard: React.FC<PlayerCardProps>;
//# sourceMappingURL=PlayerCard.d.ts.map