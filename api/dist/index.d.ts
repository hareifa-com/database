/**
 * Main exports for @hareifa/database package
 * Provides the complete database schema, types, validators, and utilities for El-Harifa
 */
export { db, pool } from './db';
export * from './schema';
export * from './relations';
export * from './types';
export * from './validators';
export { seed } from './seed';
import { eq, and, or, like, inArray, isNull, isNotNull, between, desc, asc, count, sum, avg } from 'drizzle-orm';
export { eq, and, or, like, inArray, isNull, isNotNull, between, desc, asc, count, sum, avg, };
//# sourceMappingURL=index.d.ts.map