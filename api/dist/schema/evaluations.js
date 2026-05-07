import { pgTable, uuid, varchar, text, date, integer, timestamp, jsonb, index } from 'drizzle-orm/pg-core';
/**
 * Evaluations table - stores detailed player evaluations by coaches, scouts, and volunteers
 * This is the core assessment mechanism for player potential and skills
 */
export const evaluations = pgTable('evaluations', {
    /** Primary key - auto-generated UUID */
    id: uuid('id').primaryKey().defaultRandom(),
    /** Player ID being evaluated */
    player_id: uuid('player_id').notNull(),
    /** User ID of the evaluator */
    evaluator_id: uuid('evaluator_id').notNull(),
    /** Role of the evaluator */
    evaluator_role: varchar('evaluator_role', { length: 20 }).notNull().$type(),
    /** Type of evaluation */
    evaluation_type: varchar('evaluation_type', { length: 20 }).notNull().$type(),
    /** Name of the event where evaluation took place */
    event_name: varchar('event_name', { length: 150 }),
    /** Date of the evaluation */
    event_date: date('event_date'),
    /** How many minutes the evaluator watched the player */
    minutes_watched: integer('minutes_watched'),
    /** Technical skills assessment (1-10 scale for each skill) */
    technical_skills: jsonb('technical_skills').notNull().$type(),
    /** Physical attributes assessment (1-10 scale for each attribute) */
    physical_attributes: jsonb('physical_attributes').notNull().$type(),
    /** Mental attributes assessment (1-10 scale for each attribute) */
    mental_attributes: jsonb('mental_attributes').notNull().$type(),
    /** Commitment assessment (1-10 scale for each aspect) */
    commitment: jsonb('commitment').notNull().$type(),
    /** Overall potential rating */
    overall_potential: varchar('overall_potential', { length: 1 }).notNull().$type(),
    /** Player strengths identified by evaluator */
    strengths: text('strengths'),
    /** Player weaknesses identified by evaluator */
    weaknesses: text('weaknesses'),
    /** Detailed scout notes and observations */
    scout_notes: text('scout_notes'),
    /** URL to evaluation video if available */
    video_url: varchar('video_url', { length: 255 }),
    /** Weight of evaluation (1: coach, 2: academy manager, 3: verified scout) */
    weight: integer('weight').default(1).$type(),
    /** Evaluation status in review process */
    status: varchar('status', { length: 20 }).default('قيد_المراجعة').$type(),
    /** User ID of reviewer who approved/rejected evaluation */
    reviewed_by: uuid('reviewed_by'),
    /** Reviewer notes about evaluation decision */
    review_notes: text('review_notes'),
    /** Evaluation creation timestamp */
    created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
    // Indexes for performance
    playerIdIdx: index('evaluations_player_id_idx').on(table.player_id),
    evaluatorIdIdx: index('evaluations_evaluator_id_idx').on(table.evaluator_id),
    eventDateIdx: index('evaluations_event_date_idx').on(table.event_date),
    statusIdx: index('evaluations_status_idx').on(table.status),
    overallPotentialIdx: index('evaluations_overall_potential_idx').on(table.overall_potential),
    weightIdx: index('evaluations_weight_idx').on(table.weight),
    reviewedByIdx: index('evaluations_reviewed_by_idx').on(table.reviewed_by),
}));
//# sourceMappingURL=evaluations.js.map