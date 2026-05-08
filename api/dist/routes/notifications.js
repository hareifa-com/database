/**
 * Notifications Routes - مسارات الإشعارات
 * إدارة نظام الإشعارات المتقدم
 */
import { Router } from 'express';
import { db } from '@hareifa/database';
import { notifications, notificationPreferences, users } from '@hareifa/database/schema';
import { eq, and, desc, count } from 'drizzle-orm';
import { authMiddleware, requirePermission } from '../middleware/auth.js';
const router = Router();
// Apply authentication to all notification routes
router.use(authMiddleware);
/**
 * GET /api/v1/notifications
 * Get user notifications
 */
router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 20, type, read, priority } = req.query;
        // Build where conditions
        const where = [eq(notifications.user_id, req.user.id)];
        if (type) {
            where.push(eq(notifications.type, type));
        }
        if (read !== undefined) {
            where.push(eq(notifications.read, read === 'true'));
        }
        if (priority) {
            where.push(eq(notifications.priority, priority));
        }
        const notificationsList = await db
            .select()
            .from(notifications)
            .where(and(...where))
            .orderBy(desc(notifications.created_at))
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(notifications)
            .where(and(...where));
        // Get unread count
        const unreadCount = await db
            .select({ count: count() })
            .from(notifications)
            .where(and(eq(notifications.user_id, req.user.id), eq(notifications.read, false)));
        res.json({
            notifications: notificationsList,
            unread_count: unreadCount[0].count,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total: totalCount[0].count,
                pages: Math.ceil(totalCount[0].count / Number(limit)),
            },
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /api/v1/notifications/:id
 * Get specific notification
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await db
            .select()
            .from(notifications)
            .where(and(eq(notifications.id, id), eq(notifications.user_id, req.user.id)))
            .limit(1);
        if (!notification.length) {
            return res.status(404).json({
                error: 'Notification not found',
                message: `الإشعار ${id} غير موجود`,
            });
        }
        res.json({
            notification: notification[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/notifications
 * Create new notification (system/admin only)
 */
router.post('/', requirePermission(['manage_notifications']), async (req, res, next) => {
    try {
        const notificationData = req.body;
        const newNotification = await db.insert(notifications).values({
            ...notificationData,
            created_at: new Date(),
        }).returning();
        res.status(201).json({
            message: 'تم إنشاء الإشعار بنجاح',
            notification: newNotification[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /api/v1/notifications/:id/read
 * Mark notification as read
 */
router.put('/:id/read', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedNotification = await db
            .update(notifications)
            .set({
            read: true,
            read_at: new Date(),
        })
            .where(and(eq(notifications.id, id), eq(notifications.user_id, req.user.id)))
            .returning();
        if (!updatedNotification.length) {
            return res.status(404).json({
                error: 'Notification not found',
                message: `الإشعار ${id} غير موجود`,
            });
        }
        res.json({
            message: 'تم تحديث حالة الإشعار بنجاح',
            notification: updatedNotification[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /api/v1/notifications/read-all
 * Mark all notifications as read
 */
router.put('/read-all', async (req, res, next) => {
    try {
        await db
            .update(notifications)
            .set({
            read: true,
            read_at: new Date(),
        })
            .where(and(eq(notifications.user_id, req.user.id), eq(notifications.read, false)));
        res.json({
            message: 'تم تحديث جميع الإشعارات كمقروءة بنجاح',
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * DELETE /api/v1/notifications/:id
 * Delete notification
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedNotification = await db
            .delete(notifications)
            .where(and(eq(notifications.id, id), eq(notifications.user_id, req.user.id)))
            .returning();
        if (!deletedNotification.length) {
            return res.status(404).json({
                error: 'Notification not found',
                message: `الإشعار ${id} غير موجود`,
            });
        }
        res.json({
            message: 'تم حذف الإشعار بنجاح',
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /api/v1/notifications/preferences
 * Get notification preferences
 */
router.get('/preferences', async (req, res, next) => {
    try {
        const preferences = await db
            .select()
            .from(notificationPreferences)
            .where(eq(notificationPreferences.user_id, req.user.id))
            .limit(1);
        res.json({
            preferences: preferences[0] || {
                user_id: req.user.id,
                email_enabled: true,
                push_enabled: true,
                sms_enabled: false,
                in_app_enabled: true,
                preferred_language: 'ar',
            },
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /api/v1/notifications/preferences
 * Update notification preferences
 */
router.put('/preferences', async (req, res, next) => {
    try {
        const preferencesData = req.body;
        const updatedPreferences = await db
            .insert(notificationPreferences)
            .values({
            user_id: req.user.id,
            ...preferencesData,
            updated_at: new Date(),
        })
            .onConflictDoUpdate({
            target: notificationPreferences.user_id,
            set: {
                ...preferencesData,
                updated_at: new Date(),
            },
        })
            .returning();
        res.json({
            message: 'تم تحديث تفضيلات الإشعارات بنجاح',
            preferences: updatedPreferences[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/notifications/broadcast
 * Send broadcast notification (admin only)
 */
router.post('/broadcast', requirePermission(['manage_notifications']), async (req, res, next) => {
    try {
        const { title_ar, message_ar, type, priority = 'medium', target_roles, target_users } = req.body;
        // Get target users
        let targetUsersList = [];
        if (target_users && Array.isArray(target_users)) {
            targetUsersList = target_users;
        }
        else if (target_roles && Array.isArray(target_roles)) {
            const usersByRole = await db
                .select({ id: users.id })
                .from(users)
                .where(and(users.role.in(target_roles), eq(users.is_active, true)));
            targetUsersList = usersByRole.map(u => u.id);
        }
        else {
            // All active users
            const allUsers = await db
                .select({ id: users.id })
                .from(users)
                .where(eq(users.is_active, true));
            targetUsersList = allUsers.map(u => u.id);
        }
        // Create notifications for all target users
        const notificationsToCreate = targetUsersList.map(userId => ({
            user_id: userId,
            type,
            title_ar,
            message_ar,
            priority,
            created_at: new Date(),
        }));
        await db.insert(notifications).values(notificationsToCreate);
        res.json({
            message: `تم إرسال الإشعار الجماعي بنجاح إلى ${targetUsersList.length} مستخدم`,
            recipients_count: targetUsersList.length,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /api/v1/notifications/stats
 * Get notification statistics (admin only)
 */
router.get('/stats', requirePermission(['view_analytics']), async (req, res, next) => {
    try {
        // Total notifications
        const totalNotifications = await db
            .select({ count: count() })
            .from(notifications);
        // Unread notifications
        const unreadNotifications = await db
            .select({ count: count() })
            .from(notifications)
            .where(eq(notifications.read, false));
        // Notifications by type
        const notificationsByType = await db
            .select({
            type: notifications.type,
            count: count(),
        })
            .from(notifications)
            .groupBy(notifications.type)
            .orderBy(desc(count));
        // Notifications by priority
        const notificationsByPriority = await db
            .select({
            priority: notifications.priority,
            count: count(),
        })
            .from(notifications)
            .groupBy(notifications.priority)
            .orderBy(desc(count));
        // This month's notifications
        const thisMonth = new Date();
        thisMonth.setDate(1);
        const thisMonthNotifications = await db
            .select({ count: count() })
            .from(notifications)
            .where(notifications.created_at >= thisMonth);
        res.json({
            total_notifications: totalNotifications[0].count,
            unread_notifications: unreadNotifications[0].count,
            this_month_notifications: thisMonthNotifications[0].count,
            notifications_by_type: notificationsByType,
            notifications_by_priority: notificationsByPriority,
        });
    }
    catch (error) {
        next(error);
    }
});
export default router;
