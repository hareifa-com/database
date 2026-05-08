/**
 * Players Routes - مسارات اللاعبين
 * إدارة كل العمليات المتعلقة باللاعبين
 */
import { Router } from 'express';
import { db } from '@hareifa/database';
import { players, evaluations, academies, playerStats } from '@hareifa/database/schema';
import { eq, and, desc, count, ilike } from 'drizzle-orm';
import { authMiddleware, requirePermission } from '../middleware/auth.js';
const router = Router();
// Apply authentication to all player routes
router.use(authMiddleware);
/**
 * GET /api/v1/players
 * Get all players with filtering and pagination
 */
router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 20, governorate, position, age_min, age_max, search, sort_by = 'created_at', sort_order = 'desc' } = req.query;
        // Build where conditions
        const where = [];
        if (governorate) {
            where.push(eq(players.governorate, governorate));
        }
        if (position) {
            where.push(eq(players.primary_position, position));
        }
        if (search) {
            where.push(ilike(players.full_name_ar, `%${search}%`));
        }
        // Age filtering (based on birth date)
        if (age_min || age_max) {
            const today = new Date();
            const minBirthDate = age_max ? new Date(today.getFullYear() - parseInt(age_max), today.getMonth(), today.getDate()) : undefined;
            const maxBirthDate = age_min ? new Date(today.getFullYear() - parseInt(age_min), today.getMonth(), today.getDate()) : undefined;
            if (minBirthDate)
                where.push(eq(players.birth_date, minBirthDate));
            if (maxBirthDate)
                where.push(eq(players.birth_date, maxBirthDate));
        }
        // Build order by
        let orderBy;
        switch (sort_by) {
            case 'name':
                orderBy = sort_order === 'asc' ? players.full_name_ar : desc(players.full_name_ar);
                break;
            case 'age':
                orderBy = sort_order === 'asc' ? players.birth_date : desc(players.birth_date);
                break;
            case 'created_at':
            default:
                orderBy = sort_order === 'asc' ? players.created_at : desc(players.created_at);
                break;
        }
        const playersList = await db
            .select({
            id: players.id,
            full_name_ar: players.full_name_ar,
            birth_date: players.birth_date,
            governorate: players.governorate,
            primary_position: players.primary_position,
            dominant_foot: players.dominant_foot,
            height_cm: players.height_cm,
            weight_kg: players.weight_kg,
            academy_id: players.academy_id,
            academy_name: academies.name_ar,
            created_at: players.created_at,
            updated_at: players.updated_at,
        })
            .from(players)
            .leftJoin(academies, eq(players.academy_id, academies.id))
            .leftJoin(playerStats, eq(players.id, playerStats.player_id))
            .where(and(...where))
            .orderBy(orderBy)
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(players)
            .where(and(...where));
        res.json({
            players: playersList,
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
 * GET /api/v1/players/:id
 * Get specific player with full details
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = await db
            .select({
            id: players.id,
            full_name_ar: players.full_name_ar,
            birth_date: players.birth_date,
            governorate: players.governorate,
            primary_position: players.primary_position,
            secondary_position: players.secondary_position,
            dominant_foot: players.dominant_foot,
            height_cm: players.height_cm,
            weight_kg: players.weight_kg,
            academy_id: players.academy_id,
            academy_name: academies.name_ar,
            created_at: players.created_at,
            updated_at: players.updated_at,
        })
            .from(players)
            .leftJoin(academies, eq(players.academy_id, academies.id))
            .where(eq(players.id, id))
            .limit(1);
        if (!player.length) {
            return res.status(404).json({
                error: 'Player not found',
                message: `Player with ID ${id} not found`,
            });
        }
        // Get player evaluations
        const playerEvaluations = await db
            .select()
            .from(evaluations)
            .where(eq(evaluations.player_id, id))
            .orderBy(desc(evaluations.created_at))
            .limit(10);
        // Get player stats
        const playerStatsData = await db
            .select()
            .from(playerStats)
            .where(eq(playerStats.player_id, id))
            .limit(1);
        res.json({
            player: player[0],
            evaluations: playerEvaluations,
            stats: playerStatsData[0] || null,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/players
 * Create new player
 */
router.post('/', requirePermission(['add_players']), async (req, res, next) => {
    try {
        const playerData = req.body;
        const newPlayer = await db.insert(players).values({
            ...playerData,
            created_by: req.user.id,
        }).returning();
        res.status(201).json({
            message: 'تم إضافة اللاعب بنجاح',
            player: newPlayer[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /api/v1/players/:id
 * Update player information
 */
router.put('/:id', requirePermission(['edit_players']), async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Check if player exists
        const existingPlayer = await db
            .select()
            .from(players)
            .where(eq(players.id, id))
            .limit(1);
        if (!existingPlayer.length) {
            return res.status(404).json({
                error: 'Player not found',
                message: `Player with ID ${id} not found`,
            });
        }
        const updatedPlayer = await db
            .update(players)
            .set({
            ...updateData,
            updated_at: new Date(),
        })
            .where(eq(players.id, id))
            .returning();
        res.json({
            message: 'تم تحديث بيانات اللاعب بنجاح',
            player: updatedPlayer[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * DELETE /api/v1/players/:id
 * Delete player (soft delete)
 */
router.delete('/:id', requirePermission(['delete_players']), async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPlayer = await db
            .update(players)
            .set({
            is_active: false,
            deleted_at: new Date(),
            updated_at: new Date(),
        })
            .where(eq(players.id, id))
            .returning();
        if (!deletedPlayer.length) {
            return res.status(404).json({
                error: 'Player not found',
                message: `Player with ID ${id} not found`,
            });
        }
        res.json({
            message: 'تم حذف اللاعب بنجاح',
            player: deletedPlayer[0],
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /api/v1/players/:id/evaluations
 * Get all evaluations for a specific player
 */
router.get('/:id/evaluations', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const playerEvaluations = await db
            .select()
            .from(evaluations)
            .where(eq(evaluations.player_id, id))
            .orderBy(desc(evaluations.created_at))
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(evaluations)
            .where(eq(evaluations.player_id, id));
        res.json({
            evaluations: playerEvaluations,
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
 * GET /api/v1/players/search
 * Advanced search for players
 */
router.get('/search', async (req, res, next) => {
    try {
        const { q: query, governorate, position, age_min, age_max, height_min, height_max, dominant_foot, has_academy, page = 1, limit = 20 } = req.query;
        if (!query) {
            return res.status(400).json({
                error: 'Search query required',
                message: 'Please provide a search query (q parameter)',
            });
        }
        const where = [
            ilike(players.full_name_ar, `%${query}%`)
        ];
        if (governorate) {
            where.push(eq(players.governorate, governorate));
        }
        if (position) {
            where.push(eq(players.primary_position, position));
        }
        if (dominant_foot) {
            where.push(eq(players.dominant_foot, dominant_foot));
        }
        if (has_academy === 'true') {
            where.push(eq(players.academy_id, null));
        }
        else if (has_academy === 'false') {
            where.push(eq(players.academy_id, null));
        }
        // Additional filters
        if (height_min) {
            where.push(eq(players.height_cm, parseInt(height_min)));
        }
        if (height_max) {
            where.push(eq(players.height_cm, parseInt(height_max)));
        }
        const searchResults = await db
            .select({
            id: players.id,
            full_name_ar: players.full_name_ar,
            birth_date: players.birth_date,
            governorate: players.governorate,
            primary_position: players.primary_position,
            dominant_foot: players.dominant_foot,
            height_cm: players.height_cm,
            academy_name: academies.name_ar,
        })
            .from(players)
            .leftJoin(academies, eq(players.academy_id, academies.id))
            .where(and(...where))
            .orderBy(desc(players.created_at))
            .limit(Number(limit))
            .offset((Number(page) - 1) * Number(limit));
        const totalCount = await db
            .select({ count: count() })
            .from(players)
            .where(and(...where));
        res.json({
            players: searchResults,
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
export default router;
