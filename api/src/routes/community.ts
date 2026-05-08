/**
 * Community Routes - مسارات النظام المجتمعي
 * تدير جميع الوظائف المتعلقة بالمجتمع والتقييم والسمعة
 */

import { Router } from 'express';
import { z } from 'zod';
import { db } from '@hareifa/database';
import { 
  communityReports, 
  reputationScores, 
  communityBadges, 
  communityContributions,
  verificationRequests,
  disputeResolutions,
  communityActivities
} from '@hareifa/database/schema';
import { eq, desc, and, count } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';

const router = Router();

// Apply authentication to all community routes
router.use(authMiddleware);

/**
 * GET /api/v1/community/reports
 * Get all community reports (moderator access)
 */
router.get('/reports', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, priority } = req.query;
    
    const where = [];
    if (status) where.push(eq(communityReports.status, status as string));
    if (priority) where.push(eq(communityReports.priority, priority as string));
    
    const reports = await db
      .select()
      .from(communityReports)
      .where(and(...where))
      .orderBy(desc(communityReports.created_at))
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));
    
    const totalCount = await db
      .select({ count: count() })
      .from(communityReports)
      .where(and(...where));
    
    res.json({
      reports,
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
 * POST /api/v1/community/reports
 * File a new community report
 */
router.post('/reports', validateRequest({
  body: z.object({
    reported_entity: z.string(),
    entity_id: z.string().uuid(),
    reason: z.enum(['fake_info', 'bias', 'inappropriate', 'spam', 'harassment', 'duplicate', 'inaccurate', 'other']),
    description: z.string().min(10),
    evidence: z.array(z.string().url()).optional(),
  }),
}), async (req, res, next) => {
  try {
    const { reported_entity, entity_id, reason, description, evidence } = req.body;
    
    const newReport = await db.insert(communityReports).values({
      reporter_id: req.user!.id,
      reported_entity,
      entity_id,
      reason,
      description,
      evidence,
    }).returning();
    
    // Log community activity
    await db.insert(communityActivities).values({
      user_id: req.user!.id,
      activity_type: 'report_filed',
      description_ar: `قام المستخدم بتقديم بلاغ جديد`,
      reference_id: newReport[0].id,
      reference_type: 'report',
      metadata: { reason, reported_entity },
    });
    
    res.status(201).json({
      message: 'تم تقديم البلاغ بنجاح',
      report: newReport[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/community/reputation/:userId
 * Get user reputation score and badges
 */
router.get('/reputation/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const reputation = await db
      .select()
      .from(reputationScores)
      .where(eq(reputationScores.user_id, userId))
      .leftJoin(communityBadges, eq(reputationScores.user_id, communityBadges.user_id));
    
    const badges = await db
      .select()
      .from(communityBadges)
      .where(eq(communityBadges.user_id, userId))
      .orderBy(desc(communityBadges.earned_at));
    
    res.json({
      reputation: reputation[0] || null,
      badges,
      level: reputation[0]?.level || 'newcomer',
      totalScore: reputation[0]?.total_score || 0,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/community/contributions
 * Get community contributions
 */
router.get('/contributions', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, type, status } = req.query;
    
    const where = [];
    if (type) where.push(eq(communityContributions.contribution_type, type as string));
    if (status) where.push(eq(communityContributions.status, status as string));
    
    const contributions = await db
      .select()
      .from(communityContributions)
      .where(and(...where))
      .orderBy(desc(communityContributions.created_at))
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));
    
    const totalCount = await db
      .select({ count: count() })
      .from(communityContributions)
      .where(and(...where));
    
    res.json({
      contributions,
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
 * POST /api/v1/community/contributions
 * Submit a new community contribution
 */
router.post('/contributions', validateRequest({
  body: z.object({
    contribution_type: z.enum(['feature', 'bug_fix', 'documentation', 'translation', 'testing', 'design', 'community', 'research', 'feedback', 'moderation']),
    title_ar: z.string().min(5),
    description_ar: z.string().min(20),
    external_url: z.string().url().optional(),
    reference_id: z.string().uuid().optional(),
    reference_type: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
}), async (req, res, next) => {
  try {
    const { contribution_type, title_ar, description_ar, external_url, reference_id, reference_type, tags } = req.body;
    
    const newContribution = await db.insert(communityContributions).values({
      contributor_id: req.user!.id,
      contribution_type,
      title_ar,
      description_ar,
      external_url,
      reference_id,
      reference_type,
      tags,
    }).returning();
    
    // Update user reputation
    await db.insert(reputationHistory).values({
      user_id: req.user!.id,
      action_type: 'contribution',
      score_change: 10, // +10 points for contribution
      reason: `مساهمة مجتمعية: ${title_ar}`,
      reference_id: newContribution[0].id,
      previous_score: 0, // Get from reputation table
      new_score: 10, // Calculate properly
    });
    
    // Log community activity
    await db.insert(communityActivities).values({
      user_id: req.user!.id,
      activity_type: 'contribution',
      description_ar: `قدم المستخدم مساهمة جديدة: ${title_ar}`,
      reference_id: newContribution[0].id,
      reference_type: 'contribution',
      metadata: { contribution_type, title_ar },
    });
    
    res.status(201).json({
      message: 'تم تقديم المساهمة بنجاح',
      contribution: newContribution[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/community/verification-requests
 * Get verification requests
 */
router.get('/verification-requests', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const where = [];
    if (status) where.push(eq(verificationRequests.status, status as string));
    
    const requests = await db
      .select()
      .from(verificationRequests)
      .where(and(...where))
      .orderBy(desc(verificationRequests.created_at))
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));
    
    const totalCount = await db
      .select({ count: count() })
      .from(verificationRequests)
      .where(and(...where));
    
    res.json({
      requests,
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
 * POST /api/v1/community/verification-requests
 * Submit a new verification request
 */
router.post('/verification-requests', validateRequest({
  body: z.object({
    verification_type: z.string(),
    additional_info: z.string().optional(),
    documents: z.array(z.object({
      type: z.string(),
      url: z.string().url(),
    })).optional(),
  }),
}), async (req, res, next) => {
  try {
    const { verification_type, additional_info, documents } = req.body;
    
    const newRequest = await db.insert(verificationRequests).values({
      user_id: req.user!.id,
      verification_type,
      additional_info,
      documents,
    }).returning();
    
    // Log community activity
    await db.insert(communityActivities).values({
      user_id: req.user!.id,
      activity_type: 'verification_requested',
      description_ar: `طلب المستخدم تحقق جديد: ${verification_type}`,
      reference_id: newRequest[0].id,
      reference_type: 'verification_request',
      metadata: { verification_type },
    });
    
    res.status(201).json({
      message: 'تم تقديم طلب التحقق بنجاح',
      request: newRequest[0],
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/community/activities
 * Get recent community activities
 */
router.get('/activities', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, user_id } = req.query;
    
    const where = [];
    if (user_id) where.push(eq(communityActivities.user_id, user_id as string));
    where.push(eq(communityActivities.is_public, true));
    
    const activities = await db
      .select()
      .from(communityActivities)
      .where(and(...where))
      .orderBy(desc(communityActivities.created_at))
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));
    
    const totalCount = await db
      .select({ count: count() })
      .from(communityActivities)
      .where(and(...where));
    
    res.json({
      activities,
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

export default router;
