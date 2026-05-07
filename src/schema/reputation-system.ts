import { 
  pgTable, 
  uuid, 
  text, 
  integer, 
  decimal, 
  timestamp, 
  boolean,
  index,
  pgEnum
} from 'drizzle-orm/pg-core';

/**
 * Reputation System Tables - نظام السمعة والثقة المجتمعي
 * يقوم بتتبع سمعة المستخدمين ومستوى الثقة في تقييماتهم
 */

export const badgeEnum = pgEnum('badge_type', [
  'trusted_scout',        // كشاف موثوق
  'expert_evaluator',    // خبير تقييم
  'community_leader',    // قائد مجتمعي
  'verified_academy',    // أكاديمية موثقة
  'top_contributor',     // أفضل مساهم
  'helpful_member',      // عضو مساعد
  'quality_reviewer',    // مراجع جودة
  'mentor',             // مرشد
  'pioneer',            // رائد
  'ambassador'          // سفير
]);

export const reputationLevelEnum = pgEnum('reputation_level', [
  'newcomer',    // جديد (0-100)
  'member',      // عضو (101-500)
  'trusted',     // موثوق (501-1500)
  'expert',      // خبير (1501-3000)
  'leader',      // قائد (3001-6000)
  'legend'       // أسطورة (6000+)
]);

// جدول نقاط السمعة للمستخدمين
export const reputationScores = pgTable('reputation_scores', {
  /** Primary key - user ID */
  user_id: uuid('user_id').primaryKey(),
  
  /** Total reputation score */
  total_score: integer('total_score').default(0),
  
  /** Current reputation level */
  level: reputationLevelEnum('level').default('newcomer'),
  
  /** Quality of evaluations (0-10) */
  evaluation_quality: decimal('evaluation_quality', { precision: 3, scale: 1 }).default('0'),
  
  /** Community contribution score */
  community_contribution: integer('community_contribution').default(0),
  
  /** Verification level (0-10) */
  verification_level: decimal('verification_level', { precision: 3, scale: 1 }).default('0'),
  
  /** Dispute history (negative factor) */
  dispute_history: integer('dispute_history').default(0),
  
  /** Membership tenure in days */
  tenure_days: integer('tenure_days').default(0),
  
  /** Number of contributions */
  total_contributions: integer('total_contributions').default(0),
  
  /** Number of helpful votes received */
  helpful_votes: integer('helpful_votes').default(0),
  
  /** Number of reports filed (negative if false) */
  accurate_reports: integer('accurate_reports').default(0),
  
  /** Last updated timestamp */
  updated_at: timestamp('updated_at').defaultNow(),
  
}, (table) => ({
  // Indexes for performance
  scoreIdx: index('reputation_score_idx').on(table.total_score),
  levelIdx: index('reputation_level_idx').on(table.level),
  qualityIdx: index('reputation_quality_idx').on(table.evaluation_quality),
}));

// جدول شارات المجتمع
export const communityBadges = pgTable('community_badges', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** User who earned the badge */
  user_id: uuid('user_id').notNull(),
  
  /** Type of badge */
  badge_type: badgeEnum('badge_type').notNull(),
  
  /** Badge title in Arabic */
  title_ar: text('title_ar').notNull(),
  
  /** Badge description in Arabic */
  description_ar: text('description_ar').notNull(),
  
  /** Badge icon URL */
  icon_url: text('icon_url'),
  
  /** When the badge was earned */
  earned_at: timestamp('earned_at').defaultNow(),
  
  /** Whether the badge is currently active */
  is_active: boolean('is_active').default(true),
  
  /** Reason for earning the badge */
  reason: text('reason'),
  
  /** Reference to the action that earned the badge */
  reference_id: uuid('reference_id'),
  
}, (table) => ({
  // Indexes for performance
  userBadgeIdx: index('badges_user_idx').on(table.user_id),
  typeIdx: index('badges_type_idx').on(table.badge_type),
  earnedAtIdx: index('badges_earned_at_idx').on(table.earned_at),
}));

// جدول تاريخ تغييرات السمعة
export const reputationHistory = pgTable('reputation_history', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** User whose reputation changed */
  user_id: uuid('user_id').notNull(),
  
  /** Type of action that caused the change */
  action_type: text('action_type').notNull(), // 'evaluation', 'report', 'contribution', 'badge', 'dispute'
  
  /** Score change (positive or negative) */
  score_change: integer('score_change').notNull(),
  
  /** Reason for the change */
  reason: text('reason').notNull(),
  
  /** Reference to related entity */
  reference_id: uuid('reference_id'),
  
  /** Previous score */
  previous_score: integer('previous_score').notNull(),
  
  /** New score */
  new_score: integer('new_score').notNull(),
  
  /** Timestamp of the change */
  created_at: timestamp('created_at').defaultNow(),
  
}, (table) => ({
  // Indexes for performance
  userHistoryIdx: index('reputation_history_user_idx').on(table.user_id),
  actionTypeIdx: index('reputation_action_type_idx').on(table.action_type),
  createdAtIdx: index('reputation_history_created_at_idx').on(table.created_at),
}));

export type ReputationScore = typeof reputationScores.$inferSelect;
export type NewReputationScore = typeof reputationScores.$inferInsert;
export type CommunityBadge = typeof communityBadges.$inferSelect;
export type NewCommunityBadge = typeof communityBadges.$inferInsert;
export type ReputationHistory = typeof reputationHistory.$inferSelect;
export type NewReputationHistory = typeof reputationHistory.$inferInsert;
