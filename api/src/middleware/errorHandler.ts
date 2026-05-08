/**
 * Error Handler Middleware - وسيط معالجة الأخطاء
 * معالجة مركزية للأخطاء في التطبيق
 */

import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

/**
 * Custom error class
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle MongoDB duplicate key errors
 */
const handleDuplicateKeyError = (err: any) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `القيمة "${value}" مستخدمة بالفقل في حقل "${field}"`;
  return new AppError(message, 400);
};

/**
 * Handle MongoDB validation errors
 */
const handleValidationError = (err: any) => {
  const errors = Object.values(err.errors).map((error: any) => ({
    field: error.path,
    message: error.message,
  }));

  const message = 'بيانات غير صالحة';
  return new AppError(message, 400, errors);
};

/**
 * Handle JWT errors
 */
const handleJWTError = () => {
  return new AppError('Token غير صالح. الرجاء تسجيل الدخول مرة أخرى', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Token منتهي الصلاحية. الرجاء تسجيل الدخول مرة أخرى', 401);
};

/**
 * Send development error response
 */
const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Send production error response
 */
const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    logger.error('ERROR 💥', err);
    
    res.status(500).json({
      status: 'error',
      message: 'حدث خطأ في الخادم',
    });
  }
};

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(err);

  // Handle specific error types
  if (err.code === 11000) error = handleDuplicateKeyError(err);
  if (err.name === 'ValidationError') error = handleValidationError(err);
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // Handle Drizzle ORM errors
  if (err.code === '23505') {
    // Unique violation
    const message = 'بيانات مكررة. الرجاء التحقق من المدخلات';
    error = new AppError(message, 400);
  }

  if (err.code === '23503') {
    // Foreign key violation
    const message = 'البيانات المرتبطة غير موجودة';
    error = new AppError(message, 400);
  }

  if (err.code === '23502') {
    // Not null violation
    const message = 'جميع الحقول المطلوبة يجب إدخالها';
    error = new AppError(message, 400);
  }

  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    const errors = err.errors.map((error: any) => ({
      field: error.path.join('.'),
      message: error.message,
    }));
    
    error = new AppError('خطأ في التحقق من البيانات', 400);
    (error as any).errors = errors;
  }

  // Send appropriate error response based on environment
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

/**
 * Handle unhandled promise rejections
 */
export const handleUnhandledRejection = (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  
  // Graceful shutdown
  process.exit(1);
};

/**
 * Handle uncaught exceptions
 */
export const handleUncaughtException = (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  
  // Graceful shutdown
  process.exit(1);
};

export default errorHandler;
