export const POSITIONS = {
  GK: { value: 'GK', label: 'حارس مرمى', labelEn: 'Goalkeeper' },
  DF: { value: 'DF', label: 'مدافع', labelEn: 'Defender' },
  MF: { value: 'MF', label: 'لاعب وسط', labelEn: 'Midfielder' },
  FW: { value: 'FW', label: 'مهاجم', labelEn: 'Forward' },
} as const

export const DETAILED_POSITIONS = {
  GK: { value: 'GK', label: 'حارس مرمى', labelEn: 'Goalkeeper' },
  CB: { value: 'CB', label: 'مدافع وسط', labelEn: 'Center Back' },
  LB: { value: 'LB', label: 'مدافع أيسر', labelEn: 'Left Back' },
  RB: { value: 'RB', label: 'مدافع أيمن', labelEn: 'Right Back' },
  CDM: { value: 'CDM', label: 'لاعب وسط دفاعي', labelEn: 'Defensive Midfielder' },
  CM: { value: 'CM', label: 'لاعب وسط', labelEn: 'Central Midfielder' },
  CAM: { value: 'CAM', label: 'لاعب وسط هجومي', labelEn: 'Attacking Midfielder' },
  LW: { value: 'LW', label: 'جناح أيسر', labelEn: 'Left Winger' },
  RW: { value: 'RW', label: 'جناح أيمن', labelEn: 'Right Winger' },
  ST: { value: 'ST', label: 'مهاجم وسط', labelEn: 'Striker' },
} as const

export type Position = typeof POSITIONS[keyof typeof POSITIONS]['value']
export type DetailedPosition = typeof DETAILED_POSITIONS[keyof typeof DETAILED_POSITIONS]['value']
