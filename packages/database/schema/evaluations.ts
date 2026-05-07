import { pgTable, serial, text, integer, timestamp, decimal, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { players } from './players'
import { users } from './users'

export const evaluations = pgTable('evaluations', {
  id: serial('id').primaryKey(),
  playerId: integer('player_id').notNull().references(() => players.id),
  evaluatorId: integer('evaluator_id').references(() => users.id),
  evaluationDate: timestamp('evaluation_date').defaultNow(),
  
  // Technical skills (1-10)
  technicalSkills: decimal('technical_skills', { precision: 3, scale: 1 }),
  ballControl: decimal('ball_control', { precision: 3, scale: 1 }),
  passing: decimal('passing', { precision: 3, scale: 1 }),
  shooting: decimal('shooting', { precision: 3, scale: 1 }),
  dribbling: decimal('dribbling', { precision: 3, scale: 1 }),
  heading: decimal('heading', { precision: 3, scale: 1 }),
  
  // Physical attributes (1-10)
  physicalAttributes: decimal('physical_attributes', { precision: 3, scale: 1 }),
  speed: decimal('speed', { precision: 3, scale: 1 }),
  stamina: decimal('stamina', { precision: 3, scale: 1 }),
  strength: decimal('strength', { precision: 3, scale: 1 }),
  agility: decimal('agility', { precision: 3, scale: 1 }),
  
  // Mental aspects (1-10)
  mentalAspects: decimal('mental_aspects', { precision: 3, scale: 1 }),
  concentration: decimal('concentration', { precision: 3, scale: 1 }),
  decisionMaking: decimal('decision_making', { precision: 3, scale: 1 }),
  confidence: decimal('confidence', { precision: 3, scale: 1 }),
  teamwork: decimal('teamwork', { precision: 3, scale: 1 }),
  
  // Tactical understanding (1-10)
  tacticalUnderstanding: decimal('tactical_understanding', { precision: 3, scale: 1 }),
  positioning: decimal('positioning', { precision: 3, scale: 1 }),
  gameReading: decimal('game_reading', { precision: 3, scale: 1 }),
  
  // Overall scores
  overallScore: decimal('overall_score', { precision: 3, scale: 1 }).notNull(),
  potentialScore: decimal('potential_score', { precision: 3, scale: 1 }),
  
  // Comments and recommendations
  strengths: text('strengths'),
  weaknesses: text('weaknesses'),
  recommendations: text('recommendations'),
  notes: text('notes'),
  
  // Status
  isRecommended: boolean('is_recommended').default(false),
  isTalentIdentified: boolean('is_talent_identified').default(false),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const evaluationsRelations = relations(evaluations, ({ one }) => ({
  player: one(players, {
    fields: [evaluations.playerId],
    references: [players.id],
  }),
  evaluator: one(users, {
    fields: [evaluations.evaluatorId],
    references: [users.id],
  }),
}))

export type Evaluation = typeof evaluations.$inferSelect
export type NewEvaluation = typeof evaluations.$inferInsert
