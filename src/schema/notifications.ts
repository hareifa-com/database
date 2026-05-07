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
 * Notifications System - نظام الإشعارات المتقدم
 * يوفر إشعارات للمستخدمين حول الأحداث المهمة في المنصة
 */

export const notificationTypeEnum = pgEnum('notification_type', [
  'evaluation_received',     // تم استلام تقييم جديد
  'player_discovered',      // تم اكتشاف لاعب جديد
  'report_filed',           // تم تقديم بلاغ
  'verification_approved',  // تم قبول التحقق
  'badge_earned',          // تم كسب شارة جديدة
  'dispute_resolved',      // تم حل نزاع
  'community_update',      // تحديث مجتمعي
  'player_added',          // تم إضافة لاعب
  'evaluation_approved',   // تم قبول التقييم
  'report_resolved',       // تم حل بلاغ
  'new_follower',          // متابع جديد
  'mention',               // تم الإشارة إليك
  'system_announcement',    // إعلان نظامي
  'deadline_reminder',      // تذكير بموعد نهائي
  'achievement_unlocked'    // تم فتح إنجاز
]);

export const notificationPriorityEnum = pgEnum('notification_priority', [
  'low',       // منخفض
  'medium',    // متوسط
  'high',      // عالي
  'urgent'     // عاجل
]);

export const notifications = pgTable('notifications', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** User who will receive the notification */
  user_id: uuid('user_id').notNull(),
  
  /** Type of notification */
  type: notificationTypeEnum('type').notNull(),
  
  /** Notification title in Arabic */
  title_ar: text('title_ar').notNull(),
  
  /** Notification message in Arabic */
  message_ar: text('message_ar').notNull(),
  
  /** Additional data (JSON object) */
  data: json('data'),
  
  /** Whether the notification has been read */
  read: boolean('read').default(false),
  
  /** Priority level */
  priority: notificationPriorityEnum('priority').default('medium'),
  
  /** Reference to related entity */
  reference_id: uuid('reference_id'),
  
  /** Reference to related entity type */
  reference_type: text('reference_type'), // 'player', 'evaluation', 'report', 'badge'
  
  /** Action URL for the notification */
  action_url: text('action_url'),
  
  /** Whether notification can be dismissed */
  dismissible: boolean('dismissible').default(true),
  
  /** Expiration time (optional) */
  expires_at: timestamp('expires_at'),
  
  /** Notification creation timestamp */
  created_at: timestamp('created_at').defaultNow(),
  
  /** When notification was read */
  read_at: timestamp('read_at'),
  
}, (table) => ({
  // Indexes for performance
  userNotificationIdx: index('notifications_user_idx').on(table.user_id),
  typeIdx: index('notifications_type_idx').on(table.type),
  priorityIdx: index('notifications_priority_idx').on(table.priority),
  readIdx: index('notifications_read_idx').on(table.read),
  createdAtIdx: index('notifications_created_at_idx').on(table.created_at),
}));

// جدول تفضيلات الإشعارات للمستخدمين
export const notificationPreferences = pgTable('notification_preferences', {
  /** Primary key - user ID */
  user_id: uuid('user_id').primaryKey(),
  
  /** Email notifications enabled */
  email_enabled: boolean('email_enabled').default(true),
  
  /** Push notifications enabled */
  push_enabled: boolean('push_enabled').default(true),
  
  /** SMS notifications enabled */
  sms_enabled: boolean('sms_enabled').default(false),
  
  /** In-app notifications enabled */
  in_app_enabled: boolean('in_app_enabled').default(true),
  
  /** Preferred notification language */
  preferred_language: text('preferred_language').default('ar'),
  
  /** Quiet hours start (HH:MM format) */
  quiet_hours_start: text('quiet_hours_start'), // "22:00"
  
  /** Quiet hours end (HH:MM format) */
  quiet_hours_end: text('quiet_hours_end'), // "08:00"
  
  /** Minimum priority for notifications during quiet hours */
  quiet_hours_min_priority: notificationPriorityEnum('quiet_hours_min_priority').default('high'),
  
  /** Notification type preferences (JSON) */
  type_preferences: json('type_preferences'), // { "evaluation_received": true, "report_filed": false }
  
  /** Last updated timestamp */
  updated_at: timestamp('updated_at').defaultNow(),
  
}, (table) => ({
  // Index for performance
  emailEnabledIdx: index('notif_prefs_email_idx').on(table.email_enabled),
  pushEnabledIdx: index('notif_prefs_push_idx').on(table.push_enabled),
}));

// جدول سجلات إرسال الإشعارات
export const notificationDeliveryLogs = pgTable('notification_delivery_logs', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** Reference to notification */
  notification_id: uuid('notification_id').notNull(),
  
  /** Delivery channel */
  channel: text('channel').notNull(), // 'email', 'push', 'sms', 'in_app'
  
  /** Delivery status */
  status: text('status').notNull(), // 'pending', 'sent', 'delivered', 'failed', 'bounced'
  
  /** Recipient address */
  recipient: text('recipient').notNull(),
  
  /** Error message if failed */
  error_message: text('error_message'),
  
  /** Number of retry attempts */
  retry_count: integer('retry_count').default(0),
  
  /** When delivery was attempted */
  attempted_at: timestamp('attempted_at').defaultNow(),
  
  /** When delivery was completed */
  delivered_at: timestamp('delivered_at'),
  
  /** External service response */
  service_response: json('service_response'),
  
}, (table) => ({
  // Indexes for performance
  notificationIdx: index('notif_delivery_notification_idx').on(table.notification_id),
  statusIdx: index('notif_delivery_status_idx').on(table.status),
  channelIdx: index('notif_delivery_channel_idx').on(table.channel),
  attemptedAtIdx: index('notif_delivery_attempted_at_idx').on(table.attempted_at),
}));

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type NotificationPreference = typeof notificationPreferences.$inferSelect;
export type NewNotificationPreference = typeof notificationPreferences.$inferInsert;
export type NotificationDeliveryLog = typeof notificationDeliveryLogs.$inferSelect;
export type NewNotificationDeliveryLog = typeof notificationDeliveryLogs.$inferInsert;
