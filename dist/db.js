import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './schema';
/**
 * PostgreSQL connection pool for El-Harifa database
 */
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
/**
 * Drizzle ORM instance with schema
 */
export const db = drizzle(pool, {
    schema,
    logger: process.env.NODE_ENV === 'development'
});
/**
 * Export the pool for direct access if needed
 */
export { pool };
//# sourceMappingURL=db.js.map