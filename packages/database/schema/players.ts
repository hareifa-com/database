import { pgTable, serial, text, integer, timestamp, decimal, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { evaluations } from './evaluations'
import { academies } from './academies'

export const players = pgTable('players', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique(),
  phone: text('phone'),
  birthDate: timestamp('birth_date'),
  age: integer('age'),
  position: text('position').notNull(),
  preferredFoot: text('preferred_foot'),
  height: integer('height'),
  weight: integer('weight'),
  governorate: text('governorate').notNull(),
  city: text('city'),
  address: text('address'),
  school: text('school'),
  currentTeam: text('current_team'),
  jerseyNumber: integer('jersey_number'),
  academyId: integer('academy_id').references(() => academies.id),
  isActive: boolean('is_active').default(true),
  averageRating: decimal('average_rating', { precision: 3, scale: 1 }),
  totalEvaluations: integer('total_evaluations').default(0),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const playersRelations = relations(players, ({ one, many }) => ({
  evaluations: many(evaluations),
  academy: one(academies, {
    fields: [players.academyId],
    references: [academies.id],
  }),
}))

export type Player = typeof players.$inferSelect
export type NewPlayer = typeof players.$inferInsert
