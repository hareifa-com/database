/**
 * Academies Routes - مسارات الأكاديميات والنوادي
 * إدارة الأكاديميات والمراكز الرياضية
 */
import { Router } from 'express';
import { db } from '@hareifa/database';
import { academies, users, players } from '@hareifa/database/schema';
import { eq, and, desc, count, ilike, gte, sql } from 'drizzle-orm';
import { authMiddleware, requirePermission } from '../middleware/auth.js';
const router = Router();
// Apply authentication to all academy routes
router.use(authMiddleware);
/**
 * GET /api/v1/academies
 * Get all academies
 */
router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 20, governorate, type, search, is_active } = req.query;
        // Build where conditions
        const where = [];
        if (governorate) {
            where.push(eq(academies.governorate, governorate));
        }
        if (type) {
            where.push(eq(academies.type, type));
        }
        if (is_active !== undefined) {
            where.push(eq(academies.status, is_active === 'true' ? 'نشط' : 'موقوف'));
        }
        if (search) {
            where.push(ilike(academies.name_ar, `%${search}%`));
        }
        const academiesList = await db
            .select({
            id: academies.id,
            name_ar: academies.name_ar,
            name_en: academies.name_en,
            type: academies.type,
            governorate: academies.governorate,
            city: academies.city,
            address: academies.address,
            phone: academies.phone,
            email: academies.email,
            website: academies.website,
            established_year: academies.established_year,
            status: academies.status,
            verified: academies.verified,
            created_at: academies.created_at,
            updated_at: academies.updated_at,
        })
            .from(academies)
            .where(and(...where))
            .orderBy(desc(academies.created_at))
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(academies)
            .where(and(...where));
        res.json({
            academies: academiesList,
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
 * GET /api/v1/academies/:id
 * Get specific academy details
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const academy = await db
            .select()
            .from(academies)
            .where(eq(academies.id, id))
            .limit(1);
        if (!academy.length) {
            return res.status(404).json({
                error: 'Academy not found',
                message: `الأكاديمية ${id} غير موجودة`,
            });
        }
        // Get academy manager
        const manager = await db
            .select({
            id: users.id,
            full_name: users.full_name,
            email: users.email,
            phone: users.phone,
        })
            .from(users)
            .where(and(eq(users.academy_id, id), eq(users.role, 'academy_manager'), eq(users.is_active, true)))
            .limit(1);
        // Get players count
        const playersCount = await db
            .select({ count: count() })
            .from(players)
            .where(and(eq(players.academy_id, id), eq(players.status, 'active')));
        res.json({
            academy: academy[0],
            manager: manager[0] || null,
            players_count: playersCount[0].count,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/academies
 * Create new academy
 */
router.post('/', requirePermission(['manage_academies']), async (req, res, next) => {
    try {
        const academyData = req.body;
        // Check if academy with same email already exists
        if (academyData.email) {
            const existingAcademy = await db
                .select()
                .from(academies)
                .where(eq(academies.email, academyData.email))
                .limit(1);
            if (existingAcademy.length) {
                return res.status(409).json({
                    error: 'Academy already exists',
                    message: 'الأكاديمية بهذا البريد الإلكتروني موجودة بالفعل',
                });
            }
        }
        const newAcademy = await db.insert(academies).values({
            ...academyData,
            created_by: req.user.id,
            status: 'نشط',
            verified: false,
            created_at: new Date(),
            updated_at: new Date(),
        }).returning();
        res.status(201).json({
            message: 'تم إنشاء الأكاديمية بنجاح',
            academy: newAcademy[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /api/v1/academies/:id
 * Update academy
 */
router.put('/:id', requirePermission(['manage_academies']), async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Check if academy exists
        const existingAcademy = await db
            .select()
            .from(academies)
            .where(eq(academies.id, id))
            .limit(1);
        if (!existingAcademy.length) {
            return res.status(404).json({
                error: 'Academy not found',
                message: `الأكاديمية ${id} غير موجودة`,
            });
        }
        const updatedAcademy = await db
            .update(academies)
            .set({
            ...updateData,
            updated_at: new Date(),
        })
            .where(eq(academies.id, id))
            .returning();
        res.json({
            message: 'تم تحديث بيانات الأكاديمية بنجاح',
            academy: updatedAcademy[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * DELETE /api/v1/academies/:id
 * Deactivate academy (admin only)
 */
router.delete('/:id', requirePermission(['manage_academies']), async (req, res, next) => {
    try {
        const { id } = req.params;
        const deactivatedAcademy = await db
            .update(academies)
            .set({
            status: 'موقوف',
            updated_at: new Date(),
        })
            .where(eq(academies.id, id))
            .returning();
        if (!deactivatedAcademy.length) {
            return res.status(404).json({
                error: 'Academy not found',
                message: `الأكاديمية ${id} غير موجودة`,
            });
        }
        res.json({
            message: 'تم إلغاء تنشيط الأكاديمية بنجاح',
            academy: deactivatedAcademy[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/academies/:id/verify
 * Verify academy (admin only)
 */
router.post('/:id/verify', requirePermission(['verify_academies']), async (req, res, next) => {
    try {
        const { id } = req.params;
        const verifiedAcademy = await db
            .update(academies)
            .set({
            verified: true,
            reviewed_at: new Date(),
            reviewer_id: req.user.id,
            updated_at: new Date(),
        })
            .where(eq(academies.id, id))
            .returning();
        if (!verifiedAcademy.length) {
            return res.status(404).json({
                error: 'Academy not found',
                message: `الأكاديمية ${id} غير موجودة`,
            });
        }
        res.json({
            message: 'تم التحقق من الأكاديمية بنجاح',
            academy: verifiedAcademy[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /api/v1/academies/:id/players
 * Get players in specific academy
 */
router.get('/:id/players', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 20 } = req.query;
        // Check if academy exists
        const academy = await db
            .select()
            .from(academies)
            .where(eq(academies.id, id))
            .limit(1);
        if (!academy.length) {
            return res.status(404).json({
                error: 'Academy not found',
                message: `الأكاديمية ${id} غير موجودة`,
            });
        }
        const academyPlayers = await db
            .select({
            id: players.id,
            full_name_ar: players.full_name_ar,
            birth_date: players.birth_date,
            primary_position: players.primary_position,
            dominant_foot: players.dominant_foot,
            height_cm: players.height_cm,
            weight_kg: players.weight_kg,
            created_at: players.created_at,
            updated_at: players.updated_at,
        })
            .from(players)
            .where(and(eq(players.academy_id, id), eq(players.status, 'active')))
            .orderBy(desc(players.created_at))
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(players)
            .where(and(eq(players.academy_id, id), eq(players.status, 'active')));
        res.json({
            academy: academy[0],
            players: academyPlayers,
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
 * GET /api/v1/academies/search
 * Search academies
 */
router.get('/search', async (req, res, next) => {
    try {
        const { q: query, governorate, type, page = 1, limit = 20 } = req.query;
        if (!query) {
            return res.status(400).json({
                error: 'Search query required',
                message: 'الرجاء إدخال كلمة بحث',
            });
        }
        const where = [
            ilike(academies.name_ar, `%${query}%`),
            eq(academies.status, 'نشط')
        ];
        if (governorate) {
            where.push(eq(academies.governorate, governorate));
        }
        if (type) {
            where.push(eq(academies.type, type));
        }
        const searchResults = await db
            .select({
            id: academies.id,
            name_ar: academies.name_ar,
            type: academies.type,
            governorate: academies.governorate,
            city: academies.city,
            verified: academies.verified,
            established_year: academies.established_year,
        })
            .from(academies)
            .where(and(...where))
            .orderBy(desc(academies.verified))
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(academies)
            .where(and(...where));
        res.json({
            academies: searchResults,
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
 * GET /api/v1/academies/stats
 * Get academy statistics (admin only)
 */
router.get('/stats', requirePermission(['view_analytics']), async (req, res, next) => {
    try {
        // Total academies
        const totalAcademies = await db
            .select({ count: count() })
            .from(academies);
        // Active academies
        const activeAcademies = await db
            .select({ count: count() })
            .from(academies)
            .where(eq(academies.status, 'نشط'));
        // Verified academies
        const verifiedAcademies = await db
            .select({ count: count() })
            .from(academies)
            .where(eq(academies.verified, true));
        // Academies by type
        const academiesByType = await db
            .select({
            type: academies.type,
            count: count(),
        })
            .from(academies)
            .where(eq(academies.is_active, true))
            .groupBy(academies.type);
        // Academies by governorate
        const academiesByGovernorate = await db
            .select({
            governorate: academies.governorate,
            count: count(),
        })
            .from(academies)
            .where(and(eq(academies.status, 'نشط'), eq(academies.governorate, academies.governorate)))
            .groupBy(academies.governorate)
            .orderBy(desc(sql `count`))
            .limit(10);
        // New academies this month
        const thisMonth = new Date();
        thisMonth.setDate(1);
        const newAcademiesThisMonth = await db
            .select({ count: count() })
            .from(academies)
            .where(and(eq(academies.status, 'نشط'), gte(academies.created_at, thisMonth)));
        res.json({
            total_academies: totalAcademies[0].count,
            active_academies: activeAcademies[0].count,
            verified_academies: verifiedAcademies[0].count,
            new_academies_this_month: newAcademiesThisMonth[0].count,
            academies_by_type: academiesByType,
            academies_by_governorate: academiesByGovernorate,
        });
    }
    catch (error) {
        next(error);
    }
});
export default router;
