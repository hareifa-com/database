import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone'),
  password: text('password').notNull(),
  
  // Role and permissions
  role: text('role').notNull(), // 'admin', 'coach', 'scout', 'academy_director'
  permissions: text('permissions').array(),
  
  // Profile information
  avatar: text('avatar'),
  bio: text('bio'),
  specialization: text('specialization'),
  experience: integer('experience'), // years of experience
  
  // Academy affiliation (for academy directors and coaches)
  academyId: integer('academy_id'),
  
  // Status
  isActive: boolean('is_active').default(true),
  isVerified: boolean('is_verified').default(false),
  emailVerified: boolean('email_verified').default(false),
  
  // Last login tracking
  lastLoginAt: timestamp('last_login_at'),
  loginCount: integer('login_count').default(0),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  // Relations will be defined when we create the referencing tables
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
