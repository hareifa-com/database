import { pgTable, serial, text, integer, timestamp, decimal, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { players } from './players'
import { users } from './users'

export const academies = pgTable('academies', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  vision: text('vision'),
  mission: text('mission'),
  
  // Contact information
  email: text('email'),
  phone: text('phone'),
  website: text('website'),
  
  // Location
  governorate: text('governorate').notNull(),
  city: text('city'),
  address: text('address'),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  
  // Academy details
  foundedYear: integer('founded_year'),
  directorId: integer('director_id').references(() => users.id),
  totalPlayers: integer('total_players').default(0),
  totalCoaches: integer('total_coaches').default(0),
  totalFields: integer('total_fields').default(0),
  
  // Programs
  ageGroups: text('age_groups').array(),
  trainingHours: integer('training_hours'),
  
  // Status and ratings
  isActive: boolean('is_active').default(true),
  isVerified: boolean('is_verified').default(false),
  averageRating: decimal('average_rating', { precision: 3, scale: 1 }),
  totalEvaluations: integer('total_evaluations').default(0),
  
  // Social media
  facebook: text('facebook'),
  twitter: text('twitter'),
  instagram: text('instagram'),
  
  // Additional information
  facilities: text('facilities'),
  achievements: text('achievements'),
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const academiesRelations = relations(academies, ({ one, many }) => ({
  players: many(players),
  director: one(users, {
    fields: [academies.directorId],
    references: [users.id],
  }),
}))

export type Academy = typeof academies.$inferSelect
export type NewAcademy = typeof academies.$inferInsert
