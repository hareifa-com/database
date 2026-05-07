import { 
  pgTable, 
  uuid, 
  text, 
  timestamp, 
  boolean,
  index,
  pgEnum
} from 'drizzle-orm/pg-core';

/**
 * Community Reports Table - نظام الإبلاغ المجتمعي
 * يسمح للمستخدمين بالإبلاغ عن محتوى مشبوه أو غير مناسب
 */

export const reportReasonEnum = pgEnum('report_reason', [
  'fake_info',        // معلومات مزيفة
  'bias',            // تحيز في التقييم
  'inappropriate',   // محتوى غير لائق
  'spam',            // رسائل مزعجة
  'harassment',      // تحرش
  'duplicate',       // محتوى مكرر
  'inaccurate',      // معلومات غير دقيقة
  'other'            // أخرى
]);

export const reportStatusEnum = pgEnum('report_status', [
  'pending',         // في انتظار المراجعة
  'under_review',    // قيد المراجعة
  'resolved',        // تم الحل
  'dismissed',       // تم الرفض
  'escalated'        // تم رفعه لمستوى أعلى
]);

export const communityReports = pgTable('community_reports', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** User who filed the report */
  reporter_id: uuid('reporter_id').notNull(),
  
  /** Type of entity being reported */
  reported_entity: text('reported_entity').notNull(), // 'player', 'evaluation', 'user', 'academy', 'video', 'note'
  
  /** ID of the reported entity */
  entity_id: uuid('entity_id').notNull(),
  
  /** Reason for the report */
  reason: reportReasonEnum('reason').notNull(),
  
  /** Detailed description of the issue */
  description: text('description').notNull(),
  
  /** Evidence links (videos, images, documents) */
  evidence: text('evidence').array(),
  
  /** Current status of the report */
  status: reportStatusEnum('status').default('pending'),
  
  /** Moderator handling the report */
  moderator_id: uuid('moderator_id'),
  
  /** Resolution details */
  resolution: text('resolution'),
  
  /** Actions taken */
  actions_taken: text('actions_taken'),
  
  /** Priority level */
  priority: text('priority').default('medium'), // 'low', 'medium', 'high', 'urgent'
  
  /** Report creation timestamp */
  created_at: timestamp('created_at').defaultNow(),
  
  /** Last update timestamp */
  updated_at: timestamp('updated_at').defaultNow(),
  
  /** When the report was resolved */
  resolved_at: timestamp('resolved_at'),
  
}, (table) => ({
  // Indexes for performance
  reporterIdx: index('reports_reporter_idx').on(table.reporter_id),
  entityIdx: index('reports_entity_idx').on(table.reported_entity, table.entity_id),
  statusIdx: index('reports_status_idx').on(table.status),
  priorityIdx: index('reports_priority_idx').on(table.priority),
  createdAtIdx: index('reports_created_at_idx').on(table.created_at),
}));

export type CommunityReport = typeof communityReports.$inferSelect;
export type NewCommunityReport = typeof communityReports.$inferInsert;
