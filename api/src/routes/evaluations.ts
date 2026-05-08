/**
 * Evaluations Routes - مسارات التقييمات
 * إدارة تقييمات اللاعبين الفنية
 */

import { Router } from 'express';
import { z } from 'zod';
import { db } from '@hareifa/database';
import { evaluations, players, users, academies } from '@hareifa/database/schema';
import { eq, and, desc, count, ilike } from 'drizzle-orm';
import { authMiddleware, requirePermission } from '../middleware/auth.js';

const router = Router();

// Apply authentication to all evaluation routes
router.use(authMiddleware);

/**
 * GET /api/v1/evaluations
 * Get all evaluations (with permissions)
 */
router.get('/', async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      player_id, 
      evaluator_id, 
      status,
      min_score,
      max_score 
    } = req.query;
    
    // Build where conditions
    const where = [];
    
    if (player_id) {
      where.push(eq(evaluations.player_id, player_id as string));
    }
    
    if (evaluator_id) {
      where.push(eq(evaluations.evaluator_id, evaluator_id as string));
    }
    
    if (status) {
      where.push(eq(evaluations.status, status as string));
    }
    
    if (min_score) {
      where.push(evaluations.overall_score >= parseFloat(min_score as string));
    }
    
    if (max_score) {
      where.push(evaluations.overall_score <= parseFloat(max_score as string));
    }
    
    // Users can only see evaluations they created or have permission to view all
    if (!req.user!.permissions.includes('view_all_evaluations')) {
      where.push(eq(evaluations.evaluator_id, req.user!.id));
    }
    
    const evaluationsList = await db
      .select({
        id: evaluations.id,
        player_id: evaluations.player_id,
        evaluator_id: evaluations.evaluator_id,
        player_name: players.full_name_ar,
        evaluator_name: users.full_name_ar,
        academy_name: academies.name_ar,
        technical_score: evaluations.technical_score,
        physical_score: evaluations.physical_score,
        mental_score: evaluations.mental_score,
        commitment_score: evaluations.commitment_score,
        overall_score: evaluations.overall_score,
        status: evaluations.status,
        comments: evaluations.comments,
        evaluation_date: evaluations.evaluation_date,
        created_at: evaluations.created_at,
        updated_at: evaluations.updated_at,
      })
      .from(evaluations)
      .leftJoin(players, eq(evaluations.player_id, players.id))
      .leftJoin(users, eq(evaluations.evaluator_id, users.id))
      .leftJoin(academies, eq(players.academy_id, academies.id))
      .where(and(...where))
      .orderBy(desc(evaluations.created_at))
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));
    
    const totalCount = await db
      .select({ count: count() })
      .from(evaluations)
      .where(and(...where));
    
    res.json({
      evaluations: evaluationsList,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount[0].count,
        pages: Math.ceil(totalCount[0].count / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/evaluations/:id
 * Get specific evaluation
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const evaluation = await db
      .select({
        id: evaluations.id,
        player_id: evaluations.player_id,
        evaluator_id: evaluations.evaluator_id,
        player_name: players.full_name_ar,
        evaluator_name: users.full_name_ar,
        academy_name: academies.name_ar,
        technical_score: evaluations.technical_score,
        physical_score: evaluations.physical_score,
        mental_score: evaluations.mental_score,
        commitment_score: evaluations.commitment_score,
        overall_score: evaluations.overall_score,
        status: evaluations.status,
        comments: evaluations.comments,
        evaluation_date: evaluations.evaluation_date,
        created_at: evaluations.created_at,
        updated_at: evaluations.updated_at,
      })
      .from(evaluations)
      .leftJoin(players, eq(evaluations.player_id, players.id))
      .leftJoin(users, eq(evaluations.evaluator_id, users.id))
      .leftJoin(academies, eq(players.academy_id, academies.id))
      .where(eq(evaluations.id, id))
      .limit(1);
    
    if (!evaluation.length) {
      return res.status(404).json({
        error: 'Evaluation not found',
        message: `التقييم ${id} غير موجود`,
      });
    }
    
    // Check permissions
    if (evaluation[0].evaluator_id !== req.user!.id && 
        !req.user!.permissions.includes('view_all_evaluations')) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: 'لا تملك صلاحية عرض هذا التقييم',
      });
    }
    
    res.json({
      evaluation: evaluation[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/evaluations
 * Create new evaluation
 */
router.post('/', requirePermission(['evaluate_players']), async (req, res, next) => {
  try {
    const evaluationData = req.body;
    
    // Validate required fields
    const { player_id, technical_score, physical_score, mental_score, commitment_score } = evaluationData;
    
    if (!player_id || technical_score === undefined || physical_score === undefined || 
        mental_score === undefined || commitment_score === undefined) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'جميع الحقول المطلوبة يجب إدخالها',
      });
    }
    
    // Validate score ranges
    const scores = [technical_score, physical_score, mental_score, commitment_score];
    for (const score of scores) {
      if (score < 0 || score > 10) {
        return res.status(400).json({
          error: 'Invalid score',
          message: 'الدرجات يجب أن تكون بين 0 و 10',
        });
      }
    }
    
    // Calculate overall score
    const overall_score = (technical_score + physical_score + mental_score + commitment_score) / 4;
    
    // Check if player exists
    const player = await db
      .select()
      .from(players)
      .where(eq(players.id, player_id))
      .limit(1);
    
    if (!player.length) {
      return res.status(404).json({
        error: 'Player not found',
        message: `اللاعب ${player_id} غير موجود`,
      });
    }
    
    // Check if user already evaluated this player recently
    const existingEvaluation = await db
      .select()
      .from(evaluations)
      .where(and(
        eq(evaluations.player_id, player_id),
        eq(evaluations.evaluator_id, req.user!.id),
        eq(evaluations.status, 'approved')
      ))
      .limit(1);
    
    if (existingEvaluation.length) {
      return res.status(409).json({
        error: 'Evaluation already exists',
        message: 'لقد قمت بتقييم هذا اللاعب من قبل',
      });
    }
    
    const newEvaluation = await db.insert(evaluations).values({
      player_id,
      evaluator_id: req.user!.id,
      technical_score,
      physical_score,
      mental_score,
      commitment_score,
      overall_score,
      comments: evaluationData.comments,
      evaluation_date: evaluationData.evaluation_date || new Date(),
      status: 'pending', // Requires approval
      created_at: new Date(),
      updated_at: new Date(),
    }).returning();
    
    res.status(201).json({
      message: 'تم إنشاء التقييم بنجاح',
      evaluation: newEvaluation[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/v1/evaluations/:id
 * Update evaluation
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Check if evaluation exists
    const existingEvaluation = await db
      .select()
      .from(evaluations)
      .where(eq(evaluations.id, id))
      .limit(1);
    
    if (!existingEvaluation.length) {
      return res.status(404).json({
        error: 'Evaluation not found',
        message: `التقييم ${id} غير موجود`,
      });
    }
    
    // Check permissions
    if (existingEvaluation[0].evaluator_id !== req.user!.id && 
        !req.user!.permissions.includes('manage_evaluations')) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: 'لا تملك صلاحية تعديل هذا التقييم',
      });
    }
    
    // Calculate new overall score if scores are updated
    let overall_score = existingEvaluation[0].overall_score;
    if (updateData.technical_score !== undefined || updateData.physical_score !== undefined ||
        updateData.mental_score !== undefined || updateData.commitment_score !== undefined) {
      const technical = updateData.technical_score ?? existingEvaluation[0].technical_score;
      const physical = updateData.physical_score ?? existingEvaluation[0].physical_score;
      const mental = updateData.mental_score ?? existingEvaluation[0].mental_score;
      const commitment = updateData.commitment_score ?? existingEvaluation[0].commitment_score;
      
      overall_score = (technical + physical + mental + commitment) / 4;
    }
    
    const updatedEvaluation = await db
      .update(evaluations)
      .set({
        ...updateData,
        overall_score,
        updated_at: new Date(),
      })
      .where(eq(evaluations.id, id))
      .returning();
    
    res.json({
      message: 'تم تحديث التقييم بنجاح',
      evaluation: updatedEvaluation[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/v1/evaluations/:id
 * Delete evaluation
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if evaluation exists
    const existingEvaluation = await db
      .select()
      .from(evaluations)
      .where(eq(evaluations.id, id))
      .limit(1);
    
    if (!existingEvaluation.length) {
      return res.status(404).json({
        error: 'Evaluation not found',
        message: `التقييم ${id} غير موجود`,
      });
    }
    
    // Check permissions
    if (existingEvaluation[0].evaluator_id !== req.user!.id && 
        !req.user!.permissions.includes('manage_evaluations')) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: 'لا تملك صلاحية حذف هذا التقييم',
      });
    }
    
    await db.delete(evaluations).where(eq(evaluations.id, id));
    
    res.json({
      message: 'تم حذف التقييم بنجاح',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/evaluations/:id/approve
 * Approve evaluation (admin only)
 */
router.post('/:id/approve', requirePermission(['manage_evaluations']), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const approvedEvaluation = await db
      .update(evaluations)
      .set({ 
        status: 'approved',
        approved_by: req.user!.id,
        approved_at: new Date(),
        updated_at: new Date(),
      })
      .where(eq(evaluations.id, id))
      .returning();
    
    if (!approvedEvaluation.length) {
      return res.status(404).json({
        error: 'Evaluation not found',
        message: `التقييم ${id} غير موجود`,
      });
    }
    
    res.json({
      message: 'تم قبول التقييم بنجاح',
      evaluation: approvedEvaluation[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/evaluations/:id/reject
 * Reject evaluation (admin only)
 */
router.post('/:id/reject', requirePermission(['manage_evaluations']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const rejectedEvaluation = await db
      .update(evaluations)
      .set({ 
        status: 'rejected',
        rejection_reason: reason,
        rejected_by: req.user!.id,
        rejected_at: new Date(),
        updated_at: new Date(),
      })
      .where(eq(evaluations.id, id))
      .returning();
    
    if (!rejectedEvaluation.length) {
      return res.status(404).json({
        error: 'Evaluation not found',
        message: `التقييم ${id} غير موجود`,
      });
    }
    
    res.json({
      message: 'تم رفض التقييم بنجاح',
      evaluation: rejectedEvaluation[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/evaluations/player/:playerId
 * Get all evaluations for a specific player
 */
router.get('/player/:playerId', async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    // Check if player exists
    const player = await db
      .select()
      .from(players)
      .where(eq(players.id, playerId))
      .limit(1);
    
    if (!player.length) {
      return res.status(404).json({
        error: 'Player not found',
        message: `اللاعب ${playerId} غير موجود`,
      });
    }
    
    const playerEvaluations = await db
      .select({
        id: evaluations.id,
        evaluator_id: evaluations.evaluator_id,
        evaluator_name: users.full_name_ar,
        evaluator_role: users.role,
        technical_score: evaluations.technical_score,
        physical_score: evaluations.physical_score,
        mental_score: evaluations.mental_score,
        commitment_score: evaluations.commitment_score,
        overall_score: evaluations.overall_score,
        status: evaluations.status,
        comments: evaluations.comments,
        evaluation_date: evaluations.evaluation_date,
        created_at: evaluations.created_at,
      })
      .from(evaluations)
      .leftJoin(users, eq(evaluations.evaluator_id, users.id))
      .where(and(
        eq(evaluations.player_id, playerId),
        eq(evaluations.status, 'approved')
      ))
      .orderBy(desc(evaluations.created_at))
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));
    
    const totalCount = await db
      .select({ count: count() })
      .from(evaluations)
      .where(and(
        eq(evaluations.player_id, playerId),
        eq(evaluations.status, 'approved')
      ));
    
    // Calculate average scores
    const avgScores = await db
      .select({
        avg_technical: { avg: evaluations.technical_score },
        avg_physical: { avg: evaluations.physical_score },
        avg_mental: { avg: evaluations.mental_score },
        avg_commitment: { avg: evaluations.commitment_score },
        avg_overall: { avg: evaluations.overall_score },
        count: count(),
      })
      .from(evaluations)
      .where(and(
        eq(evaluations.player_id, playerId),
        eq(evaluations.status, 'approved')
      ));
    
    res.json({
      player: player[0],
      evaluations: playerEvaluations,
      average_scores: avgScores[0],
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount[0].count,
        pages: Math.ceil(totalCount[0].count / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/evaluations/stats
 * Get evaluation statistics (admin only)
 */
router.get('/stats', requirePermission(['view_analytics']), async (req, res, next) => {
  try {
    // Total evaluations
    const totalEvaluations = await db
      .select({ count: count() })
      .from(evaluations);
    
    // Approved evaluations
    const approvedEvaluations = await db
      .select({ count: count() })
      .from(evaluations)
      .where(eq(evaluations.status, 'approved'));
    
    // Pending evaluations
    const pendingEvaluations = await db
      .select({ count: count() })
      .from(evaluations)
      .where(eq(evaluations.status, 'pending'));
    
    // Average scores
    const avgScores = await db
      .select({
        avg_technical: { avg: evaluations.technical_score },
        avg_physical: { avg: evaluations.physical_score },
        avg_mental: { avg: evaluations.mental_score },
        avg_commitment: { avg: evaluations.commitment_score },
        avg_overall: { avg: evaluations.overall_score },
      })
      .from(evaluations)
      .where(eq(evaluations.status, 'approved'));
    
    // Evaluations by evaluator
    const evaluationsByEvaluator = await db
      .select({
        evaluator_id: evaluations.evaluator_id,
        evaluator_name: users.full_name_ar,
        count: count(),
        avg_score: { avg: evaluations.overall_score },
      })
      .from(evaluations)
      .leftJoin(users, eq(evaluations.evaluator_id, users.id))
      .where(eq(evaluations.status, 'approved'))
      .groupBy(evaluations.evaluator_id, users.full_name_ar)
      .orderBy(desc(count))
      .limit(10);
    
    // This month's evaluations
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const thisMonthEvaluations = await db
      .select({ count: count() })
      .from(evaluations)
      .where(and(
        eq(evaluations.status, 'approved'),
        evaluations.created_at >= thisMonth
      ));
    
    res.json({
      total_evaluations: totalEvaluations[0].count,
      approved_evaluations: approvedEvaluations[0].count,
      pending_evaluations: pendingEvaluations[0].count,
      this_month_evaluations: thisMonthEvaluations[0].count,
      average_scores: avgScores[0],
      top_evaluators: evaluationsByEvaluator,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
