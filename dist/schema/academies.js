import { pgTable, uuid, varchar, text, decimal, timestamp, boolean, integer, index } from 'drizzle-orm/pg-core';
/**
 * Academies table - stores football academies, youth centers, clubs, and schools
 * These are the institutions where young players are trained and discovered
 */
export const academies = pgTable('academies', {
    /** Primary key - auto-generated UUID */
    id: uuid('id').primaryKey().defaultRandom(),
    /** Academy name in Arabic */
    name_ar: varchar('name_ar', { length: 100 }).notNull(),
    /** Academy name in English */
    name_en: varchar('name_en', { length: 100 }),
    /** Egyptian governorate where academy is located */
    governorate: varchar('governorate', { length: 50 }).notNull().$type(),
    /** City within the governorate */
    city: varchar('city', { length: 50 }),
    /** Type of institution */
    type: varchar('type', { length: 20 }).notNull().$type(),
    /** Physical address of the academy */
    address: text('address'),
    /** Phone number */
    phone: varchar('phone', { length: 20 }),
    /** Email address */
    email: varchar('email', { length: 100 }),
    /** Website URL */
    website: varchar('website', { length: 200 }),
    /** Year the academy was established */
    established_year: integer('established_year'),
    /** Geographic latitude for location mapping */
    latitude: decimal('latitude', { precision: 10, scale: 7 }),
    /** Geographic longitude for location mapping */
    longitude: decimal('longitude', { precision: 10, scale: 7 }),
    /** Name of the head coach */
    coach_name: varchar('coach_name', { length: 100 }),
    /** Phone number of the head coach */
    coach_phone: varchar('coach_phone', { length: 20 }),
    /** User ID of the academy manager (foreign key to users) */
    manager_id: uuid('manager_id'),
    /** User ID who created this academy */
    created_by: uuid('created_by'),
    /** Whether academy is active in the system */
    is_active: boolean('is_active').default(true),
    /** Academy status in the system */
    status: varchar('status', { length: 20 }).default('قيد_المراجعة').$type(),
    /** Whether academy has been verified */
    verified: boolean('verified').default(false),
    /** User ID of the reviewer who verified/rejected the academy */
    reviewer_id: uuid('reviewer_id'),
    /** Reviewer notes about verification decision */
    review_notes: text('review_notes'),
    /** When the review was completed */
    reviewed_at: timestamp('reviewed_at'),
    /** Academy creation timestamp */
    created_at: timestamp('created_at').defaultNow(),
    /** Last update timestamp */
    updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
    // Indexes for performance
    nameIdx: index('academies_name_idx').on(table.name_ar),
    governorateIdx: index('academies_governorate_idx').on(table.governorate),
    typeIdx: index('academies_type_idx').on(table.type),
    statusIdx: index('academies_status_idx').on(table.status),
    managerIdx: index('academies_manager_idx').on(table.manager_id),
    reviewerIdx: index('academies_reviewer_idx').on(table.reviewer_id),
    verifiedIdx: index('academies_verified_idx').on(table.verified),
}));
