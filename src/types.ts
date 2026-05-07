import { 
  type InferSelectModel, 
  type InferInsertModel 
} from 'drizzle-orm';
import {
  users,
  academies,
  players,
  evaluations,
  coachNotes,
  playerVideos,
  playerStats
} from './schema';

/**
 * TypeScript types derived from database schema
 * These provide type safety for database operations
 */

// User types
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UserRole = User['role'];
export type UserStatus = 'active' | 'inactive';

// Academy types
export type Academy = InferSelectModel<typeof academies>;
export type NewAcademy = InferInsertModel<typeof academies>;
export type AcademyType = Academy['type'];
export type AcademyStatus = Academy['status'];

// Player types
export type Player = InferSelectModel<typeof players>;
export type NewPlayer = InferInsertModel<typeof players>;
export type PlayerStatus = Player['status'];
export type DominantFoot = Player['dominant_foot'];
export type Position = Player['primary_position'];

// Evaluation types
export type Evaluation = InferSelectModel<typeof evaluations>;
export type NewEvaluation = InferInsertModel<typeof evaluations>;
export type EvaluationType = Evaluation['evaluation_type'];
export type EvaluatorRole = Evaluation['evaluator_role'];
export type OverallPotential = Evaluation['overall_potential'];
export type EvaluationStatus = Evaluation['status'];
export type EvaluationWeight = Evaluation['weight'];

// Technical skills type
export type TechnicalSkills = NonNullable<Evaluation['technical_skills']>;
export type PhysicalAttributes = NonNullable<Evaluation['physical_attributes']>;
export type MentalAttributes = NonNullable<Evaluation['mental_attributes']>;
export type Commitment = NonNullable<Evaluation['commitment']>;

// Coach notes types
export type CoachNote = InferSelectModel<typeof coachNotes>;
export type NewCoachNote = InferInsertModel<typeof coachNotes>;
export type AttendanceStatus = CoachNote['attendance'];

// Player videos types
export type PlayerVideo = InferSelectModel<typeof playerVideos>;
export type NewPlayerVideo = InferInsertModel<typeof playerVideos>;

// Player stats types
export type PlayerStats = InferSelectModel<typeof playerStats>;
export type NewPlayerStats = InferInsertModel<typeof playerStats>;

// Governorate type (Egyptian governorates)
export type Governorate = 
  | 'القاهرة' | 'الإسكندرية' | 'الجيزة' | 'الشرقية' | 'الدقهلية' 
  | 'البحيرة' | 'المنوفية' | 'الغربية' | 'كفر الشيخ' | 'الأقصر' 
  | 'أسوان' | 'قنا' | 'سوهاج' | 'أسيوط' | 'المنيا' | 'الفيوم' 
  | 'بني سويف' | 'القليوبية' | 'الإسماعيلية' | 'السويس' | 'بورسعيد' 
  | 'دمياط' | 'شمال سيناء' | 'جنوب سيناء' | 'مطروح' | 'البحر الأحمر' 
  | 'الوادي الجديد';

// Utility types for common operations
export type PlayerWithRelations = Player & {
  academy?: Academy | null;
  creator?: User;
  evaluations?: Evaluation[];
  coachNotes?: CoachNote[];
  videos?: PlayerVideo[];
  stats?: PlayerStats | null;
};

export type AcademyWithRelations = Academy & {
  manager?: User;
  reviewer?: User | null;
  players?: Player[];
  staff?: User[];
};

export type UserWithRelations = User & {
  academy?: Academy | null;
  managedAcademies?: Academy[];
  createdPlayers?: Player[];
  evaluations?: Evaluation[];
  coachNotes?: CoachNote[];
  uploadedVideos?: PlayerVideo[];
};

export type EvaluationWithRelations = Evaluation & {
  player?: Player;
  evaluator?: User;
  reviewer?: User | null;
};

// API response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;
