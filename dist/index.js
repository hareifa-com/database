/**
 * Main exports for @hareifa/database package
 * Provides the complete database schema, types, validators, and utilities for El-Harifa
 */
// Database connection and schema
export { db, pool } from './db';
export * from './schema';
// Relations between tables
export * from './relations';
// TypeScript types
export * from './types';
// Zod validators
export * from './validators';
// Seed function for initial data
export { seed } from './seed';
// Re-export commonly used utilities
import { eq, and, or, like, inArray, isNull, isNotNull, between, desc, asc, count, sum, avg } from 'drizzle-orm';
export { eq, and, or, like, inArray, isNull, isNotNull, between, desc, asc, count, sum, avg, };
