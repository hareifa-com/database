/**
 * Validation Middleware - وسيط التحقق من المدخلات
 * يستخدم Zod للتحقق من صحة البيانات القادمة
 */
import { z } from 'zod';
/**
 * Validation middleware factory
 */
export const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Validate body
            if (schema.body) {
                const result = schema.body.safeParse(req.body);
                if (!result.success) {
                    const errors = result.error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message,
                    }));
                    res.status(400).json({
                        error: 'Validation error',
                        message: 'خطأ في التحقق من البيانات',
                        errors,
                    });
                    return;
                }
                req.body = result.data;
            }
            // Validate query parameters
            if (schema.query) {
                const result = schema.query.safeParse(req.query);
                if (!result.success) {
                    const errors = result.error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message,
                    }));
                    res.status(400).json({
                        error: 'Validation error',
                        message: 'خطأ في التحقق من المعلمات',
                        errors,
                    });
                    return;
                }
                req.query = result.data;
            }
            // Validate route parameters
            if (schema.params) {
                const result = schema.params.safeParse(req.params);
                if (!result.success) {
                    const errors = result.error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message,
                    }));
                    res.status(400).json({
                        error: 'Validation error',
                        message: 'خطأ في التحقق من المعلمات',
                        errors,
                    });
                    return;
                }
                req.params = result.data;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
/**
 * Common validation schemas
 */
export const commonSchemas = {
    // UUID validation
    uuid: z.string().uuid('معرف UUID غير صالح'),
    // Pagination
    pagination: z.object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
    }),
    // Search query
    search: z.object({
        q: z.string().min(1, 'كلمة البحث مطلوبة'),
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
    }),
    // Date range
    dateRange: z.object({
        start_date: z.string().datetime().optional(),
        end_date: z.string().datetime().optional(),
    }),
    // Egyptian governorates
    egyptianGovernorates: z.enum([
        'القاهرة', 'الإسكندرية', 'الجيزة', 'الشرقية', 'الدقهلية',
        'البحيرة', 'المنوفية', 'الغربية', 'كفر الشيخ', 'الأقصر',
        'أسوان', 'قنا', 'سوهاج', 'أسيوط', 'المنيا', 'الفيوم',
        'بني سويف', 'القليوبية', 'الإسماعيلية', 'السويس', 'بورسعيد',
        'دمياط', 'شمال سيناء', 'جنوب سيناء', 'مطروح', 'البحر الأحمر',
        'الوادي الجديد'
    ]),
    // Football positions
    footballPositions: z.enum([
        'GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST', 'CF'
    ]),
    // Dominant foot
    dominantFoot: z.enum(['right', 'left', 'both']),
    // Academy types
    academyTypes: z.enum([
        'مركز_شباب', 'اكاديمية', 'نادي', 'مدرسة'
    ]),
    // User roles
    userRoles: z.enum([
        'admin', 'regional_admin', 'academy_manager', 'coach', 'verified_scout', 'community_member', 'volunteer'
    ]),
    // Evaluation scores
    evaluationScores: z.object({
        technical_score: z.number().min(0).max(10),
        physical_score: z.number().min(0).max(10),
        mental_score: z.number().min(0).max(10),
        commitment_score: z.number().min(0).max(10),
        comments: z.string().optional(),
    }),
    // Notification types
    notificationTypes: z.enum([
        'evaluation_received', 'player_discovered', 'report_filed', 'verification_approved',
        'badge_earned', 'dispute_resolved', 'community_update', 'player_added',
        'evaluation_approved', 'report_resolved', 'new_follower', 'mention',
        'system_announcement', 'deadline_reminder', 'achievement_unlocked'
    ]),
    // Report reasons
    reportReasons: z.enum([
        'fake_info', 'bias', 'inappropriate', 'spam', 'harassment', 'duplicate', 'inaccurate', 'other'
    ]),
};
export default validateRequest;
