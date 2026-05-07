import { pgTable, uuid, varchar, text, boolean, timestamp, index } from 'drizzle-orm/pg-core';
/**
 * Users table - stores all user accounts in the El-Harifa system
 * Includes admins, regional admins, academy managers, coaches, scouts, and volunteers
 */
export const users = pgTable('users', {
    /** Primary key - auto-generated UUID */
    id: uuid('id').primaryKey().defaultRandom(),
    /** User's full name (Arabic) */
    full_name: varchar('full_name', { length: 100 }).notNull(),
    /** User's email address - must be unique */
    email: varchar('email', { length: 100 }).unique(),
    /** User's phone number - must be unique */
    phone: varchar('phone', { length: 20 }).unique(),
    /** Hashed password - never store plain text */
    password_hash: text('password_hash').notNull(),
    /** User role in the system */
    role: varchar('role', { length: 20 }).notNull().$type(),
    /** Egyptian governorate where user is located */
    governorate: varchar('governorate', { length: 50 }),
    /** Academy ID if user is associated with an academy (nullable) */
    academy_id: uuid('academy_id'),
    /** Profile avatar URL */
    avatar_url: text('avatar_url'),
    /** User bio/description */
    bio: text('bio'),
    /** Whether user account is verified */
    verified: boolean('verified').default(false),
    /** Whether user account is active */
    is_active: boolean('is_active').default(true),
    /** Account creation timestamp */
    created_at: timestamp('created_at').defaultNow(),
    /** Last update timestamp */
    updated_at: timestamp('updated_at').defaultNow(),
    /** Last login timestamp */
    last_login_at: timestamp('last_login_at'),
}, (table) => ({
    // Indexes for performance
    emailIdx: index('users_email_idx').on(table.email),
    phoneIdx: index('users_phone_idx').on(table.phone),
    roleIdx: index('users_role_idx').on(table.role),
    governorateIdx: index('users_governorate_idx').on(table.governorate),
    academyIdx: index('users_academy_idx').on(table.academy_id),
}));
//# sourceMappingURL=users.js.map