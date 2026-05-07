import { z } from 'zod';

/**
 * Zod validation schemas for El-Harifa database operations
 * Provides runtime validation for API inputs and database operations
 */

// Base validation schemas
export const scoreSchema = z.number().min(1).max(10);
export const ratingSchema = z.number().min(1).max(10);

// Position validation
export const positionSchema = z.enum(['GK', 'CB', 'LB', 'RB', 'CM', 'AM', 'LW', 'RW', 'ST']);

// Governorate validation (all 27 Egyptian governorates)
export const governorateSchema = z.enum([
  'القاهرة', 'الإسكندرية', 'الجيزة', 'الشرقية', 'الدقهلية', 
  'البحيرة', 'المنوفية', 'الغربية', 'كفر الشيخ', 'الأقصر', 
  'أسوان', 'قنا', 'سوهاج', 'أسيوط', 'المنيا', 'الفيوم', 
  'بني سويف', 'القليوبية', 'الإسماعيلية', 'السويس', 'بورسعيد', 
  'دمياط', 'شمال سيناء', 'جنوب سيناء', 'مطروح', 'البحر الأحمر', 
  'الوادي الجديد'
]);

// User role validation
export const userRoleSchema = z.enum([
  'admin', 'regional_admin', 'academy_manager', 'coach', 'verified_scout', 'volunteer'
]);

// Academy type validation
export const academyTypeSchema = z.enum(['مركز_شباب', 'اكاديمية', 'نادي', 'مدرسة']);

// Academy status validation
export const academyStatusSchema = z.enum(['قيد_المراجعة', 'نشط', 'موقوف', 'مرفوض']);

// Player status validation
export const playerStatusSchema = z.enum(['active', 'incomplete', 'archived']);

// Dominant foot validation
export const dominantFootSchema = z.enum(['right', 'left', 'both']);

// Evaluation status validation
export const evaluationStatusSchema = z.enum(['معتمد', 'قيد_المراجعة', 'مرفوض']);

// Evaluation type validation
export const evaluationTypeSchema = z.enum(['مدرب', 'كشاف', 'متطوع']);

// Overall potential validation
export const overallPotentialSchema = z.enum(['A', 'B', 'C', 'D']);

// Attendance status validation
export const attendanceStatusSchema = z.enum(['حضر', 'غائب', 'متأخر', 'مصاب']);

// User validation schemas
export const insertUserSchema = z.object({
  full_name: z.string().min(1).max(100),
  email: z.string().email().max(100).optional(),
  phone: z.string().min(1).max(20).optional(),
  password_hash: z.string().min(1),
  role: userRoleSchema,
  governorate: governorateSchema.optional(),
  academy_id: z.string().uuid().optional(),
  avatar_url: z.string().url().optional(),
  bio: z.string().optional(),
  verified: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

export const updateUserSchema = insertUserSchema.partial();

// Academy validation schemas
export const insertAcademySchema = z.object({
  name_ar: z.string().min(1).max(100),
  governorate: governorateSchema,
  type: academyTypeSchema,
  address: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  coach_name: z.string().max(100).optional(),
  coach_phone: z.string().max(20).optional(),
  manager_id: z.string().uuid(),
  status: academyStatusSchema.default('قيد_المراجعة'),
  verified: z.boolean().default(false),
  reviewer_id: z.string().uuid().optional(),
  review_notes: z.string().optional(),
});

export const updateAcademySchema = insertAcademySchema.partial();

// Player validation schemas
export const insertPlayerSchema = z.object({
  full_name_ar: z.string().min(1).max(100),
  birth_date: z.coerce.date(),
  birth_place: z.string().max(100).optional(),
  governorate: governorateSchema,
  academy_id: z.string().uuid().optional(),
  height_cm: z.number().min(50).max(250).optional(),
  weight_kg: z.number().min(20).max(200).optional(),
  dominant_foot: dominantFootSchema,
  primary_position: positionSchema,
  secondary_position: positionSchema.optional(),
  bio: z.string().optional(),
  family_status: z.string().optional(),
  daily_travel_to_training: z.string().max(100).optional(),
  school_performance: z.string().max(50).optional(),
  scout_story: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  status: playerStatusSchema.default('incomplete'),
  created_by: z.string().uuid(),
});

export const updatePlayerSchema = insertPlayerSchema.partial();

// Evaluation validation schemas
export const technicalSkillsSchema = z.object({
  dribbling: scoreSchema,
  first_touch: scoreSchema,
  passing_short: scoreSchema,
  passing_long: scoreSchema,
  shooting: scoreSchema,
  tackling: scoreSchema,
});

export const physicalAttributesSchema = z.object({
  pace: scoreSchema,
  stamina: scoreSchema,
  strength: scoreSchema,
  agility: scoreSchema,
});

export const mentalAttributesSchema = z.object({
  decision_making: scoreSchema,
  vision: scoreSchema,
  composure: scoreSchema,
  leadership: scoreSchema,
});

export const commitmentSchema = z.object({
  training_attendance: scoreSchema,
  academic_discipline: scoreSchema,
  coachability: scoreSchema,
});

export const insertEvaluationSchema = z.object({
  player_id: z.string().uuid(),
  evaluator_id: z.string().uuid(),
  evaluator_role: evaluationTypeSchema,
  evaluation_type: evaluationTypeSchema,
  event_name: z.string().max(150).optional(),
  event_date: z.coerce.date().optional(),
  minutes_watched: z.number().min(0).optional(),
  technical_skills: technicalSkillsSchema,
  physical_attributes: physicalAttributesSchema,
  mental_attributes: mentalAttributesSchema,
  commitment: commitmentSchema,
  overall_potential: overallPotentialSchema,
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  scout_notes: z.string().optional(),
  video_url: z.string().url().max(255).optional(),
  weight: z.number().int().min(1).max(3).default(1),
  status: evaluationStatusSchema.default('قيد_المراجعة'),
  reviewed_by: z.string().uuid().optional(),
  review_notes: z.string().optional(),
});

export const updateEvaluationSchema = insertEvaluationSchema.partial();

// Coach notes validation schemas
export const insertCoachNoteSchema = z.object({
  player_id: z.string().uuid(),
  coach_id: z.string().uuid(),
  note_date: z.coerce.date().default(new Date()),
  attendance: attendanceStatusSchema.optional(),
  performance_rating: ratingSchema.min(1).max(10).optional(),
  note: z.string().optional(),
});

export const updateCoachNoteSchema = insertCoachNoteSchema.partial();

// Player videos validation schemas
export const insertPlayerVideoSchema = z.object({
  player_id: z.string().uuid(),
  title: z.string().max(200).optional(),
  youtube_url: z.string().url().max(255),
  youtube_id: z.string().max(20).optional(),
  thumbnail_url: z.string().url().max(255).optional(),
  duration_seconds: z.number().int().min(0).optional(),
  tags: z.array(z.string()).optional(),
  uploaded_by: z.string().uuid(),
});

export const updatePlayerVideoSchema = insertPlayerVideoSchema.partial();

// Player stats validation schemas
export const insertPlayerStatsSchema = z.object({
  player_id: z.string().uuid(),
  total_evaluations: z.number().int().min(0).default(0),
  avg_technical: z.number().min(0).max(10).optional(),
  avg_physical: z.number().min(0).max(10).optional(),
  avg_mental: z.number().min(0).max(10).optional(),
  avg_commitment: z.number().min(0).max(10).optional(),
  avg_overall: z.number().min(0).max(10).optional(),
  last_evaluation_date: z.coerce.date().optional(),
});

export const updatePlayerStatsSchema = insertPlayerStatsSchema.partial();

// Query parameter validation schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const playerFilterSchema = z.object({
  governorate: governorateSchema.optional(),
  primary_position: positionSchema.optional(),
  age_min: z.coerce.number().int().min(6).max(25).optional(),
  age_max: z.coerce.number().int().min(6).max(25).optional(),
  academy_id: z.string().uuid().optional(),
  status: playerStatusSchema.optional(),
  dominant_foot: dominantFootSchema.optional(),
}).merge(paginationSchema);

export const evaluationFilterSchema = z.object({
  player_id: z.string().uuid().optional(),
  evaluator_id: z.string().uuid().optional(),
  evaluation_type: evaluationTypeSchema.optional(),
  overall_potential: overallPotentialSchema.optional(),
  status: evaluationStatusSchema.optional(),
  date_from: z.coerce.date().optional(),
  date_to: z.coerce.date().optional(),
}).merge(paginationSchema);

// Export type inference
export type InsertUserInput = z.infer<typeof insertUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type InsertAcademyInput = z.infer<typeof insertAcademySchema>;
export type UpdateAcademyInput = z.infer<typeof updateAcademySchema>;
export type InsertPlayerInput = z.infer<typeof insertPlayerSchema>;
export type UpdatePlayerInput = z.infer<typeof updatePlayerSchema>;
export type InsertEvaluationInput = z.infer<typeof insertEvaluationSchema>;
export type UpdateEvaluationInput = z.infer<typeof updateEvaluationSchema>;
export type InsertCoachNoteInput = z.infer<typeof insertCoachNoteSchema>;
export type UpdateCoachNoteInput = z.infer<typeof updateCoachNoteSchema>;
export type InsertPlayerVideoInput = z.infer<typeof insertPlayerVideoSchema>;
export type UpdatePlayerVideoInput = z.infer<typeof updatePlayerVideoSchema>;
export type InsertPlayerStatsInput = z.infer<typeof insertPlayerStatsSchema>;
export type UpdatePlayerStatsInput = z.infer<typeof updatePlayerStatsSchema>;
export type PlayerFilterInput = z.infer<typeof playerFilterSchema>;
export type EvaluationFilterInput = z.infer<typeof evaluationFilterSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
