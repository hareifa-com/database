/**
 * Authentication Middleware - وسيط المصادقة
 * يتحقق من هوية المستخدم وصلاحياته
 */
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '@hareifa/database';
import { users } from '@hareifa/database/schema';
import { eq } from 'drizzle-orm';
/**
 * JWT Token validation schema
 */
const tokenSchema = z.object({
    token: z.string().min(1),
});
/**
 * Extract token from Authorization header
 */
const extractToken = (authHeader) => {
    if (!authHeader)
        return null;
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer')
        return null;
    return parts[1];
};
/**
 * Verify JWT token
 */
const verifyToken = (token) => {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error('JWT_SECRET not configured');
        const decoded = jwt.verify(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
/**
 * Authentication middleware
 */
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = extractToken(authHeader);
        if (!token) {
            res.status(401).json({
                error: 'Authentication required',
                message: 'No token provided',
            });
            return;
        }
        const payload = verifyToken(token);
        if (!payload) {
            res.status(401).json({
                error: 'Invalid token',
                message: 'Token is invalid or expired',
            });
            return;
        }
        // Verify user still exists and is active
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, payload.userId))
            .limit(1);
        if (!user.length) {
            res.status(401).json({
                error: 'User not found',
                message: 'User account not found or deleted',
            });
            return;
        }
        if (!user[0].is_active) {
            res.status(401).json({
                error: 'Account inactive',
                message: 'User account is deactivated',
            });
            return;
        }
        // Attach user info to request
        req.user = {
            id: payload.userId,
            email: payload.email,
            role: payload.role,
            permissions: payload.permissions,
        };
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            error: 'Authentication error',
            message: 'Internal server error during authentication',
        });
    }
};
/**
 * Role-based authorization middleware factory
 */
export const requireRole = (roles) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                error: 'Authentication required',
                message: 'User not authenticated',
            });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                error: 'Insufficient permissions',
                message: `Required role: ${allowedRoles.join(' or ')}`,
                currentRole: req.user.role,
            });
            return;
        }
        next();
    };
};
/**
 * Permission-based authorization middleware factory
 */
export const requirePermission = (permissions) => {
    const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                error: 'Authentication required',
                message: 'User not authenticated',
            });
            return;
        }
        const userPermissions = req.user.permissions;
        const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission) || userPermissions.includes('*'));
        if (!hasPermission) {
            res.status(403).json({
                error: 'Insufficient permissions',
                message: `Required permissions: ${requiredPermissions.join(', ')}`,
                userPermissions,
            });
            return;
        }
        next();
    };
};
/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = extractToken(authHeader);
        if (token) {
            const payload = verifyToken(token);
            if (payload) {
                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, payload.userId))
                    .limit(1);
                if (user.length && user[0].is_active) {
                    req.user = {
                        id: payload.userId,
                        email: payload.email,
                        role: payload.role,
                        permissions: payload.permissions,
                    };
                }
            }
        }
        next();
    }
    catch (error) {
        // Don't fail the request, just continue without auth
        next();
    }
};
/**
 * Generate JWT token for user
 */
export const generateToken = (user) => {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions || [],
    };
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET not configured');
    return jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        issuer: 'hareifa-api',
        audience: 'hareifa-users',
    });
};
/**
 * Refresh token middleware
 */
export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).json({
                error: 'Refresh token required',
                message: 'No refresh token provided',
            });
            return;
        }
        // Verify refresh token (you might want to store refresh tokens in database)
        const payload = verifyToken(refreshToken);
        if (!payload) {
            res.status(401).json({
                error: 'Invalid refresh token',
                message: 'Refresh token is invalid or expired',
            });
            return;
        }
        // Generate new access token
        const newToken = generateToken({
            id: payload.userId,
            email: payload.email,
            role: payload.role,
            permissions: payload.permissions,
        });
        res.json({
            token: newToken,
            expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        });
    }
    catch (error) {
        next(error);
    }
};
