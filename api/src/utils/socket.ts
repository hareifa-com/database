/**
 * Socket.IO Setup - إعداد Socket.IO للتحديثات الفورية
 * يدعم الإشعارات والتحديثات الحية في الوقت الفعلي
 */

import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import logger from './logger.js';

/**
 * Setup Socket.IO with authentication and event handlers
 */
export const setupSocketIO = (io: Server) => {
  logger.info('Setting up Socket.IO server');

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return next(new Error('JWT_SECRET not configured'));
      }

      const decoded = jwt.verify(token, secret) as any;
      socket.user = decoded;
      
      logger.info(`User ${decoded.userId} connected via Socket.IO`);
      next();
    } catch (error) {
      logger.error('Socket.IO authentication error:', error);
      next(new Error('Invalid authentication token'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    const user = socket.user as any;
    logger.info(`User ${user.userId} connected to Socket.IO`);

    // Join user to their personal room
    socket.join(`user_${user.userId}`);

    // Join role-based rooms
    socket.join(`role_${user.role}`);

    // Handle new evaluation notifications
    socket.on('evaluation_created', (data) => {
      // Notify relevant users
      socket.to(`user_${data.playerId}`).emit('new_evaluation', {
        type: 'evaluation_received',
        message: `تلقيت تقييماً جديداً`,
        data,
      });
    });

    // Handle new player discovery notifications
    socket.on('player_discovered', (data) => {
      // Notify scouts and coaches
      socket.to('role_verified_scout').emit('new_player', {
        type: 'player_discovered',
        message: `تم اكتشاف لاعب جديد: ${data.playerName}`,
        data,
      });
      
      socket.to('role_coach').emit('new_player', {
        type: 'player_discovered',
        message: `تم اكتشاف لاعب جديد: ${data.playerName}`,
        data,
      });
    });

    // Handle community reports
    socket.on('report_filed', (data) => {
      // Notify moderators
      socket.to('role_admin').emit('new_report', {
        type: 'report_filed',
        message: `تم تقديم بلاغ جديد`,
        data,
      });
    });

    // Handle badge earned notifications
    socket.on('badge_earned', (data) => {
      socket.to(`user_${data.userId}`).emit('badge_awarded', {
        type: 'badge_earned',
        message: `كسبت شارة جديدة: ${data.badgeTitle}`,
        data,
      });
    });

    // Handle real-time collaboration
    socket.on('join_player_room', (playerId) => {
      socket.join(`player_${playerId}`);
      logger.info(`User ${user.userId} joined room for player ${playerId}`);
    });

    socket.on('leave_player_room', (playerId) => {
      socket.leave(`player_${playerId}`);
      logger.info(`User ${user.userId} left room for player ${playerId}`);
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      socket.to(`player_${data.playerId}`).emit('user_typing', {
        userId: user.userId,
        userName: user.email,
        isTyping: true,
      });
    });

    socket.on('typing_stop', (data) => {
      socket.to(`player_${data.playerId}`).emit('user_typing', {
        userId: user.userId,
        isTyping: false,
      });
    });

    // Handle online status
    socket.on('user_online', () => {
      socket.broadcast.emit('user_status', {
        userId: user.userId,
        status: 'online',
      });
    });

    // Disconnection handler
    socket.on('disconnect', (reason) => {
      logger.info(`User ${user.userId} disconnected from Socket.IO: ${reason}`);
      
      socket.broadcast.emit('user_status', {
        userId: user.userId,
        status: 'offline',
      });
    });

    // Error handler
    socket.on('error', (error) => {
      logger.error(`Socket.IO error for user ${user.userId}:`, error);
    });
  });

  // Global error handler
  io.on('error', (error) => {
    logger.error('Socket.IO server error:', error);
  });

  logger.info('Socket.IO server setup completed');
};

/**
 * Broadcast notification to specific users
 */
export const broadcastNotification = (
  io: Server,
  userIds: string[],
  notification: any
) => {
  userIds.forEach(userId => {
    io.to(`user_${userId}`).emit('notification', notification);
  });
};

/**
 * Broadcast to role-based rooms
 */
export const broadcastToRole = (
  io: Server,
  role: string,
  event: string,
  data: any
) => {
  io.to(`role_${role}`).emit(event, data);
};

/**
 * Broadcast to player-specific room
 */
export const broadcastToPlayer = (
  io: Server,
  playerId: string,
  event: string,
  data: any
) => {
  io.to(`player_${playerId}`).emit(event, data);
};

/**
 * Get online users count
 */
export const getOnlineUsersCount = (io: Server): number => {
  const sockets = io.sockets.sockets;
  return sockets.size;
};

/**
 * Get users in specific room
 */
export const getUsersInRoom = (io: Server, room: string): string[] => {
  const sockets = io.sockets.adapter.rooms.get(room);
  if (!sockets) return [];
  
  return Array.from(sockets).map(socketId => {
    const socket = io.sockets.sockets.get(socketId);
    return (socket as any)?.user?.userId;
  }).filter(Boolean);
};

export default setupSocketIO;
