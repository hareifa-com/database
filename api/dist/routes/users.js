/**
 * Users Routes - مسارات المستخدمين
 * إدارة المستخدمين والأدوار والصلاحيات
 */
import { Router } from 'express';
import { db } from '@hareifa/database';
import { users, reputationScores, communityBadges } from '@hareifa/database/schema';
import { eq, and, desc, count, ilike } from 'drizzle-orm';
import { authMiddleware, requireRole, requirePermission } from '../middleware/auth.js';
const router = Router();
// Apply authentication to all user routes
router.use(authMiddleware);
/**
 * GET /api/v1/users
 * Get all users (admin only)
 */
router.get('/', requireRole(['admin', 'regional_admin']), async (req, res, next) => {
    try {
        const { page = 1, limit = 20, role, governorate, search, is_active } = req.query;
        // Build where conditions
        const where = [];
        if (role) {
            where.push(eq(users.role, role));
        }
        if (governorate) {
            where.push(eq(users.governorate, governorate));
        }
        if (is_active !== undefined) {
            where.push(eq(users.is_active, is_active === 'true'));
        }
        if (search) {
            where.push(ilike(users.full_name_ar, `%${search}%`));
        }
        const usersList = await db
            .select({
            id: users.id,
            email: users.email,
            full_name_ar: users.full_name_ar,
            role: users.role,
            phone: users.phone,
            governorate: users.governorate,
            is_active: users.is_active,
            email_verified: users.email_verified,
            created_at: users.created_at,
            last_login_at: users.last_login_at,
        })
            .from(users)
            .leftJoin(reputationScores, eq(users.id, reputationScores.user_id))
            .where(and(...where))
            .orderBy(desc(users.created_at))
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(users)
            .where(and(...where));
        res.json({
            users: usersList,
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
 * GET /api/v1/users/:id
 * Get specific user details
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        // Users can only view their own profile unless they have permission
        if (req.user.id !== id && !req.user.permissions.includes('view_users')) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                message: 'لا تملك صلاحية عرض هذا الملف الشخصي',
            });
        }
        const user = await db
            .select({
            id: users.id,
            email: users.email,
            full_name_ar: users.full_name_ar,
            role: users.role,
            phone: users.phone,
            governorate: users.governorate,
            bio: users.bio,
            is_active: users.is_active,
            email_verified: users.email_verified,
            created_at: users.created_at,
            last_login_at: users.last_login_at,
            updated_at: users.updated_at,
        })
            .from(users)
            .leftJoin(reputationScores, eq(users.id, reputationScores.user_id))
            .where(eq(users.id, id))
            .limit(1);
        if (!user.length) {
            return res.status(404).json({
                error: 'User not found',
                message: `المستخدم ${id} غير موجود`,
            });
        }
        // Get user badges
        const userBadges = await db
            .select()
            .from(communityBadges)
            .where(eq(communityBadges.user_id, id))
            .orderBy(desc(communityBadges.earned_at))
            .limit(10);
        res.json({
            user: user[0],
            badges: userBadges,
            reputation: {
                total_score: user[0].total_score || 0,
                level: user[0].level || 'newcomer',
            },
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /api/v1/users/:id
 * Update user (admin or self)
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Users can only update their own profile unless they have permission
        if (req.user.id !== id && !req.user.permissions.includes('manage_users')) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                message: 'لا تملك صلاحية تعديل هذا الملف الشخصي',
            });
        }
        // Remove sensitive fields that shouldn't be updated via this endpoint
        const { password_hash, email, created_at, ...safeUpdateData } = updateData;
        const updatedUser = await db
            .update(users)
            .set({
            ...safeUpdateData,
            updated_at: new Date(),
        })
            .where(eq(users.id, id))
            .returning();
        if (!updatedUser.length) {
            return res.status(404).json({
                error: 'User not found',
                message: `المستخدم ${id} غير موجود`,
            });
        }
        // Remove password from response
        const { password_hash: _, ...userWithoutPassword } = updatedUser[0];
        res.json({
            message: 'تم تحديث بيانات المستخدم بنجاح',
            user: userWithoutPassword,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * DELETE /api/v1/users/:id
 * Deactivate user (admin only)
 */
router.delete('/:id', requirePermission(['manage_users']), async (req, res, next) => {
    try {
        const { id } = req.params;
        // Prevent self-deactivation
        if (req.user.id === id) {
            return res.status(400).json({
                error: 'Cannot deactivate self',
                message: 'لا يمكنك إلغاء تنشيط حسابك الخاص',
            });
        }
        const deactivatedUser = await db
            .update(users)
            .set({
            is_active: false,
            updated_at: new Date(),
        })
            .where(eq(users.id, id))
            .returning();
        if (!deactivatedUser.length) {
            return res.status(404).json({
                error: 'User not found',
                message: `المستخدم ${id} غير موجود`,
            });
        }
        res.json({
            message: 'تم إلغاء تنشيط المستخدم بنجاح',
            user: deactivatedUser[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/users/:id/activate
 * Activate user (admin only)
 */
router.post('/:id/activate', requirePermission(['manage_users']), async (req, res, next) => {
    try {
        const { id } = req.params;
        const activatedUser = await db
            .update(users)
            .set({
            is_active: true,
            updated_at: new Date(),
        })
            .where(eq(users.id, id))
            .returning();
        if (!activatedUser.length) {
            return res.status(404).json({
                error: 'User not found',
                message: `المستخدم ${id} غير موجود`,
            });
        }
        res.json({
            message: 'تم تفعيل المستخدم بنجاح',
            user: activatedUser[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /api/v1/users/:id/role
 * Update user role (admin only)
 */
router.put('/:id/role', requirePermission(['manage_users']), async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!role || !['admin', 'regional_admin', 'academy_manager', 'coach', 'verified_scout', 'community_member', 'volunteer'].includes(role)) {
            return res.status(400).json({
                error: 'Invalid role',
                message: 'الدور غير صالح',
            });
        }
        // Prevent role change for self
        if (req.user.id === id) {
            return res.status(400).json({
                error: 'Cannot change own role',
                message: 'لا يمكنك تغيير دورك الخاص',
            });
        }
        const updatedUser = await db
            .update(users)
            .set({
            role,
            updated_at: new Date(),
        })
            .where(eq(users.id, id))
            .returning();
        if (!updatedUser.length) {
            return res.status(404).json({
                error: 'User not found',
                message: `المستخدم ${id} غير موجود`,
            });
        }
        res.json({
            message: 'تم تحديث دور المستخدم بنجاح',
            user: updatedUser[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /api/v1/users/search
 * Search users (with permissions)
 */
router.get('/search', async (req, res, next) => {
    try {
        const { q: query, role, governorate, page = 1, limit = 20 } = req.query;
        if (!query) {
            return res.status(400).json({
                error: 'Search query required',
                message: 'الرجاء إدخال كلمة بحث',
            });
        }
        const where = [
            ilike(users.full_name_ar, `%${query}%`),
            eq(users.is_active, true)
        ];
        if (role) {
            where.push(eq(users.role, role));
        }
        if (governorate) {
            where.push(eq(users.governorate, governorate));
        }
        const searchResults = await db
            .select({
            id: users.id,
            full_name_ar: users.full_name_ar,
            role: users.role,
            governorate: users.governorate,
            created_at: users.created_at,
        })
            .from(users)
            .leftJoin(reputationScores, eq(users.id, reputationScores.user_id))
            .where(and(...where))
            .orderBy(desc(users.created_at))
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(users)
            .where(and(...where));
        res.json({
            users: searchResults,
            query,
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
 * GET /api/v1/users/stats
 * Get user statistics (admin only)
 */
router.get('/stats', requirePermission(['view_analytics']), async (req, res, next) => {
    try {
        // Total users
        const totalUsers = await db
            .select({ count: count() })
            .from(users);
        // Active users
        const activeUsers = await db
            .select({ count: count() })
            .from(users)
            .where(eq(users.is_active, true));
        // Users by role
        const usersByRole = await db
            .select({
            role: users.role,
            count: count(),
        })
            .from(users)
            .groupBy(users.role);
        // Users by governorate
        const usersByGovernorate = await db
            .select({
            governorate: users.governorate,
            count: count(),
        })
            .from(users)
            .where(and(eq(users.is_active, true), eq(users.governorate, users.governorate)))
            .groupBy(users.governorate)
            .orderBy(desc(count))
            .limit(10);
        // New users this month
        const thisMonth = new Date();
        thisMonth.setDate(1);
        const newUsersThisMonth = await db
            .select({ count: count() })
            .from(users)
            .where(and(eq(users.is_active, true), users.created_at >= thisMonth));
        res.json({
            total_users: totalUsers[0].count,
            active_users: activeUsers[0].count,
            new_users_this_month: newUsersThisMonth[0].count,
            users_by_role: usersByRole,
            users_by_governorate: usersByGovernorate,
        });
    }
    catch (error) {
        next(error);
    }
});
export default router;
