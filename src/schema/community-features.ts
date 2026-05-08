import { 
  pgTable, 
  uuid, 
  text, 
  timestamp, 
  boolean,
  json,
  index,
  pgEnum,
  integer
} from 'drizzle-orm/pg-core';

/**
 * Community Features Tables - ميزات المجتمع المتقدمة
 * تدعم المشاركة والتعاون والنقاشات المجتمعية
 */

export const contributionTypeEnum = pgEnum('contribution_type', [
  'feature',           // إضافة ميزة جديدة
  'bug_fix',          // إصلاح خطأ
  'documentation',    // توثيق
  'translation',      // ترجمة
  'testing',          // اختبار
  'design',           // تصميم
  'community',        // بناء مجتمع
  'research',         // بحث
  'feedback',         // ملاحظات
  'moderation'        // إشراف
]);

export const verificationStatusEnum = pgEnum('verification_status', [
  'pending',           // في انتظار
  'under_review',     // قيد المراجعة
  'approved',          // مقبول
  'rejected',          // مرفوض
  'requires_info'      // يتطلب معلومات إضافية
]);

// جدول مساهمات المجتمع
export const communityContributions = pgTable('community_contributions', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** User who made the contribution */
  contributor_id: uuid('contributor_id').notNull(),
  
  /** Type of contribution */
  contribution_type: contributionTypeEnum('contribution_type').notNull(),
  
  /** Contribution title in Arabic */
  title_ar: text('title_ar').notNull(),
  
  /** Detailed description in Arabic */
  description_ar: text('description_ar').notNull(),
  
  /** GitHub URL or external link */
  external_url: text('external_url'),
  
  /** Reference to related entity */
  reference_id: uuid('reference_id'),
  
  /** Reference type */
  reference_type: text('reference_type'), // 'player', 'evaluation', 'academy'
  
  /** Status of the contribution */
  status: text('status').default('pending'), // 'pending', 'approved', 'rejected', 'merged'
  
  /** Reviewer who handled the contribution */
  reviewer_id: uuid('reviewer_id'),
  
  /** Review comments */
  review_comments: text('review_comments'),
  
  /** Impact score (1-10) */
  impact_score: integer('impact_score'),
  
  /** Community votes */
  community_votes: integer('community_votes').default(0),
  
  /** Tags for categorization */
  tags: text('tags').array(),
  
  /** Contribution creation timestamp */
  created_at: timestamp('created_at').defaultNow(),
  
  /** Last update timestamp */
  updated_at: timestamp('updated_at').defaultNow(),
  
  /** When contribution was merged/completed */
  completed_at: timestamp('completed_at'),
  
}, (table) => ({
  // Indexes for performance
  contributorIdx: index('contributions_contributor_idx').on(table.contributor_id),
  typeIdx: index('contributions_type_idx').on(table.contribution_type),
  statusIdx: index('contributions_status_idx').on(table.status),
  createdAtIdx: index('contributions_created_at_idx').on(table.created_at),
  impactScoreIdx: index('contributions_impact_idx').on(table.impact_score),
}));

// جدول طلبات التحقق
export const verificationRequests = pgTable('verification_requests', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** User requesting verification */
  user_id: uuid('user_id').notNull(),
  
  /** Type of verification */
  verification_type: text('verification_type').notNull(), // 'identity', 'academy', 'coach', 'scout'
  
  /** Verification status */
  status: verificationStatusEnum('status').default('pending'),
  
  /** Supporting documents (URLs) */
  documents: json('documents'), // [{ type: 'id_card', url: '...', verified: false }]
  
  /** Additional information */
  additional_info: text('additional_info'),
  
  /** Reviewer handling the request */
  reviewer_id: uuid('reviewer_id'),
  
  /** Review notes */
  review_notes: text('review_notes'),
  
  /** Rejection reason */
  rejection_reason: text('rejection_reason'),
  
  /** Verification level achieved */
  verification_level: integer('verification_level'), // 1-5
  
  /** When verification expires */
  expires_at: timestamp('expires_at'),
  
  /** Request creation timestamp */
  created_at: timestamp('created_at').defaultNow(),
  
  /** Last update timestamp */
  updated_at: timestamp('updated_at').defaultNow(),
  
  /** When verification was completed */
  completed_at: timestamp('completed_at'),
  
}, (table) => ({
  // Indexes for performance
  userVerificationIdx: index('verification_user_idx').on(table.user_id),
  typeIdx: index('verification_type_idx').on(table.verification_type),
  statusIdx: index('verification_status_idx').on(table.status),
  createdAtIdx: index('verification_created_at_idx').on(table.created_at),
}));

// جدول حل النزاعات
export const disputeResolutions = pgTable('dispute_resolutions', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** Related report or conflict */
  related_entity_id: uuid('related_entity_id').notNull(),
  
  /** Related entity type */
  entity_type: text('entity_type').notNull(), // 'report', 'evaluation', 'player'
  
  /** Parties involved in the dispute */
  parties: json('parties').notNull(), // [{ user_id: uuid, role: 'complainant' | 'respondent' }]
  
  /** Dispute status */
  status: text('status').default('open'), // 'open', 'under_review', 'mediation', 'resolved', 'escalated'
  
  /** Mediator handling the dispute */
  mediator_id: uuid('mediator_id'),
  
  /** Dispute description */
  description: text('description').notNull(),
  
  /** Evidence provided */
  evidence: json('evidence'),
  
  /** Resolution outcome */
  resolution: text('resolution'),
  
  /** Actions taken */
  actions_taken: json('actions_taken'),
  
  /** Compensation or restitution */
  compensation: text('compensation'),
  
  /** Dispute creation timestamp */
  created_at: timestamp('created_at').defaultNow(),
  
  /** Last update timestamp */
  updated_at: timestamp('updated_at').defaultNow(),
  
  /** When dispute was resolved */
  resolved_at: timestamp('resolved_at'),
  
}, (table) => ({
  // Indexes for performance
  entityIdx: index('dispute_entity_idx').on(table.related_entity_id, table.entity_type),
  statusIdx: index('dispute_status_idx').on(table.status),
  mediatorIdx: index('dispute_mediator_idx').on(table.mediator_id),
  createdAtIdx: index('dispute_created_at_idx').on(table.created_at),
}));

// جدول أنشطة المجتمع
export const communityActivities = pgTable('community_activities', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** User who performed the activity */
  user_id: uuid('user_id').notNull(),
  
  /** Activity type */
  activity_type: text('activity_type').notNull(), // 'login', 'evaluation', 'report', 'contribution', 'badge_earned'
  
  /** Activity description in Arabic */
  description_ar: text('description_ar').notNull(),
  
  /** Reference to related entity */
  reference_id: uuid('reference_id'),
  
  /** Reference type */
  reference_type: text('reference_type'),
  
  /** Activity metadata */
  metadata: json('metadata'),
  
  /** Public visibility */
  is_public: boolean('is_public').default(true),
  
  /** Activity creation timestamp */
  created_at: timestamp('created_at').defaultNow(),
  
}, (table) => ({
  // Indexes for performance
  userActivityIdx: index('activities_user_idx').on(table.user_id),
  typeIdx: index('activities_type_idx').on(table.activity_type),
  publicIdx: index('activities_public_idx').on(table.is_public),
  createdAtIdx: index('activities_created_at_idx').on(table.created_at),
}));

export type CommunityContribution = typeof communityContributions.$inferSelect;
export type NewCommunityContribution = typeof communityContributions.$inferInsert;
export type VerificationRequest = typeof verificationRequests.$inferSelect;
export type NewVerificationRequest = typeof verificationRequests.$inferInsert;
export type DisputeResolution = typeof disputeResolutions.$inferSelect;
export type NewDisputeResolution = typeof disputeResolutions.$inferInsert;
export type CommunityActivity = typeof communityActivities.$inferSelect;
export type NewCommunityActivity = typeof communityActivities.$inferInsert;
