/**
 * Authentication Routes - مسارات المصادقة
 * إدارة تسجيل الدخول والتسجيل وJWT tokens
 */
import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@hareifa/database';
import { users } from '@hareifa/database/schema';
import { eq, and } from 'drizzle-orm';
import { generateToken } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
const router = Router();
/**
 * POST /api/v1/auth/register
 * Register a new user
 */
router.post('/register', validateRequest({
    body: z.object({
        email: z.string().email('البريد الإلكتروني غير صالح'),
        password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
        full_name_ar: z.string().min(2, 'الاسم الكامل مطلوب'),
        role: z.enum(['admin', 'regional_admin', 'academy_manager', 'coach', 'verified_scout', 'community_member', 'volunteer']).default('community_member'),
        phone: z.string().optional(),
        governorate: z.string().optional(),
    }),
}), async (req, res, next) => {
    try {
        const { email, password, full_name_ar, role, phone, governorate } = req.body;
        // Check if user already exists
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if (existingUser.length) {
            return res.status(409).json({
                error: 'User already exists',
                message: 'البريد الإلكتروني مستخدم بالفعل',
            });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create user
        const newUser = await db.insert(users).values({
            email,
            password_hash: hashedPassword,
            full_name_ar,
            role,
            phone,
            governorate,
            is_active: true,
            email_verified: false,
            created_at: new Date(),
            updated_at: new Date(),
        }).returning();
        // Remove password from response
        const { password_hash, ...userWithoutPassword } = newUser[0];
        // Generate JWT token
        const token = generateToken({
            id: userWithoutPassword.id,
            email: userWithoutPassword.email,
            role: userWithoutPassword.role,
            permissions: getPermissionsForRole(userWithoutPassword.role),
        });
        res.status(201).json({
            message: 'تم إنشاء الحساب بنجاح',
            user: userWithoutPassword,
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/auth/login
 * Login user
 */
router.post('/login', validateRequest({
    body: z.object({
        email: z.string().email('البريد الإلكتروني غير صالح'),
        password: z.string().min(1, 'كلمة المرور مطلوبة'),
    }),
}), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await db
            .select()
            .from(users)
            .where(and(eq(users.email, email), eq(users.is_active, true)))
            .limit(1);
        if (!user.length) {
            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
            });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
            });
        }
        // Remove password from response
        const { password_hash, ...userWithoutPassword } = user[0];
        // Generate JWT token
        const token = generateToken({
            id: userWithoutPassword.id,
            email: userWithoutPassword.email,
            role: userWithoutPassword.role,
            permissions: getPermissionsForRole(userWithoutPassword.role),
        });
        // Update last login
        await db
            .update(users)
            .set({
            last_login_at: new Date(),
            updated_at: new Date(),
        })
            .where(eq(users.id, userWithoutPassword.id));
        res.json({
            message: 'تم تسجيل الدخول بنجاح',
            user: userWithoutPassword,
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/auth/refresh
 * Refresh JWT token
 */
router.post('/refresh', validateRequest({
    body: z.object({
        refreshToken: z.string().min(1, 'Refresh token مطلوب'),
    }),
}), async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        // Verify refresh token (simplified - in production, store refresh tokens in database)
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({
                error: 'Server configuration error',
                message: 'JWT_SECRET not configured',
            });
        }
        const decoded = jwt.verify(refreshToken, secret);
        // Find user
        const user = await db
            .select()
            .from(users)
            .where(and(eq(users.id, decoded.userId), eq(users.is_active, true)))
            .limit(1);
        if (!user.length) {
            return res.status(401).json({
                error: 'Invalid token',
                message: 'User not found or inactive',
            });
        }
        // Generate new token
        const newToken = generateToken({
            id: user[0].id,
            email: user[0].email,
            role: user[0].role,
            permissions: getPermissionsForRole(user[0].role),
        });
        res.json({
            token: newToken,
            expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * GET /api/v1/auth/profile
 * Get current user profile
 */
router.get('/profile', async (req, res, next) => {
    try {
        // This should be protected by auth middleware
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'Token required',
            });
        }
        const token = authHeader.substring(7);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({
                error: 'Server configuration error',
                message: 'JWT_SECRET not configured',
            });
        }
        const decoded = jwt.verify(token, secret);
        // Find user
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, decoded.userId))
            .limit(1);
        if (!user.length) {
            return res.status(404).json({
                error: 'User not found',
                message: 'المستخدم غير موجود',
            });
        }
        // Remove password from response
        const { password_hash, ...userWithoutPassword } = user[0];
        res.json({
            user: userWithoutPassword,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /api/v1/auth/profile
 * Update user profile
 */
router.put('/profile', validateRequest({
    body: z.object({
        full_name_ar: z.string().min(2).optional(),
        phone: z.string().optional(),
        governorate: z.string().optional(),
        bio: z.string().optional(),
    }),
}), async (req, res, next) => {
    try {
        // This should be protected by auth middleware
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'Token required',
            });
        }
        const token = authHeader.substring(7);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({
                error: 'Server configuration error',
                message: 'JWT_SECRET not configured',
            });
        }
        const decoded = jwt.verify(token, secret);
        const updateData = req.body;
        // Update user
        const updatedUser = await db
            .update(users)
            .set({
            ...updateData,
            updated_at: new Date(),
        })
            .where(eq(users.id, decoded.userId))
            .returning();
        if (!updatedUser.length) {
            return res.status(404).json({
                error: 'User not found',
                message: 'المستخدم غير موجود',
            });
        }
        // Remove password from response
        const { password_hash, ...userWithoutPassword } = updatedUser[0];
        res.json({
            message: 'تم تحديث الملف الشخصي بنجاح',
            user: userWithoutPassword,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * POST /api/v1/auth/logout
 * Logout user (client-side token removal)
 */
router.post('/logout', (req, res) => {
    // In a real implementation, you might want to:
    // 1. Add token to blacklist
    // 2. Remove refresh token from database
    // 3. Log the logout event
    res.json({
        message: 'تم تسجيل الخروج بنجاح',
    });
});
/**
 * Helper function to get permissions based on role
 */
function getPermissionsForRole(role) {
    const rolePermissions = {
        admin: ['*'],
        regional_admin: ['manage_users', 'view_reports', 'moderate_content', 'manage_academies'],
        academy_manager: ['manage_players', 'view_evaluations', 'manage_coaches'],
        coach: ['evaluate_players', 'view_players', 'add_notes'],
        verified_scout: ['add_players', 'evaluate_players', 'view_players'],
        community_member: ['view_players', 'report_content', 'comment'],
        volunteer: ['view_players', 'help_community', 'basic_access'],
    };
    return rolePermissions[role] || [];
}
export default router;
