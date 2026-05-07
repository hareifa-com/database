export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
  }
}

export interface Player {
  id: string
  name: string
  email?: string
  phone?: string
  birthDate?: string
  age?: number
  position: string
  preferredFoot?: string
  height?: number
  weight?: number
  governorate: string
  city?: string
  address?: string
  school?: string
  currentTeam?: string
  jerseyNumber?: number
  academyId?: number
  isActive: boolean
  averageRating?: number
  totalEvaluations: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Evaluation {
  id: string
  playerId: number
  evaluatorId?: number
  evaluationDate: string
  technicalSkills?: number
  ballControl?: number
  passing?: number
  shooting?: number
  dribbling?: number
  heading?: number
  physicalAttributes?: number
  speed?: number
  stamina?: number
  strength?: number
  agility?: number
  mentalAspects?: number
  concentration?: number
  decisionMaking?: number
  confidence?: number
  teamwork?: number
  tacticalUnderstanding?: number
  positioning?: number
  gameReading?: number
  overallScore: number
  potentialScore?: number
  strengths?: string
  weaknesses?: string
  recommendations?: string
  notes?: string
  isRecommended: boolean
  isTalentIdentified: boolean
  createdAt: string
  updatedAt: string
}

export interface Academy {
  id: string
  name: string
  description?: string
  vision?: string
  mission?: string
  email?: string
  phone?: string
  website?: string
  governorate: string
  city?: string
  address?: string
  latitude?: number
  longitude?: number
  foundedYear?: number
  directorId?: number
  totalPlayers: number
  totalCoaches: number
  totalFields: number
  ageGroups?: string[]
  trainingHours?: number
  isActive: boolean
  isVerified: boolean
  averageRating?: number
  totalEvaluations: number
  facebook?: string
  twitter?: string
  instagram?: string
  facilities?: string
  achievements?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  permissions?: string[]
  avatar?: string
  bio?: string
  specialization?: string
  experience?: number
  academyId?: number
  isActive: boolean
  isVerified: boolean
  emailVerified: boolean
  lastLoginAt?: string
  loginCount: number
  createdAt: string
  updatedAt: string
}

export interface CreatePlayerRequest {
  name: string
  email?: string
  phone?: string
  birthDate?: string
  position: string
  preferredFoot?: string
  height?: number
  weight?: number
  governorate: string
  city?: string
  address?: string
  school?: string
  currentTeam?: string
  jerseyNumber?: number
  academyId?: number
}

export interface CreateEvaluationRequest {
  playerId: number
  technicalSkills?: number
  ballControl?: number
  passing?: number
  shooting?: number
  dribbling?: number
  heading?: number
  physicalAttributes?: number
  speed?: number
  stamina?: number
  strength?: number
  agility?: number
  mentalAspects?: number
  concentration?: number
  decisionMaking?: number
  confidence?: number
  teamwork?: number
  tacticalUnderstanding?: number
  positioning?: number
  gameReading?: number
  potentialScore?: number
  strengths?: string
  weaknesses?: string
  recommendations?: string
  notes?: string
  isRecommended?: boolean
  isTalentIdentified?: boolean
}

export interface CreateAcademyRequest {
  name: string
  description?: string
  vision?: string
  mission?: string
  email?: string
  phone?: string
  website?: string
  governorate: string
  city?: string
  address?: string
  latitude?: number
  longitude?: number
  foundedYear?: number
  directorId?: number
  ageGroups?: string[]
  trainingHours?: number
  facebook?: string
  twitter?: string
  instagram?: string
  facilities?: string
  achievements?: string
  notes?: string
}
