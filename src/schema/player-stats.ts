import { 
  pgTable, 
  uuid, 
  integer, 
  decimal, 
  date,
  timestamp,
  index
} from 'drizzle-orm/pg-core';

/**
 * Player stats table - stores aggregated statistics for each player
 * This table is updated periodically with calculated averages from evaluations
 */
export const playerStats = pgTable('player_stats', {
  /** Player ID (primary key and foreign key to players table) */
  player_id: uuid('player_id').primaryKey(),
  
  /** Total number of evaluations received */
  total_evaluations: integer('total_evaluations').default(0),
  
  /** Average technical skills score */
  avg_technical: decimal('avg_technical', { precision: 3, scale: 1 }),
  
  /** Average physical attributes score */
  avg_physical: decimal('avg_physical', { precision: 3, scale: 1 }),
  
  /** Average mental attributes score */
  avg_mental: decimal('avg_mental', { precision: 3, scale: 1 }),
  
  /** Average commitment score */
  avg_commitment: decimal('avg_commitment', { precision: 3, scale: 1 }),
  
  /** Overall average score */
  avg_overall: decimal('avg_overall', { precision: 3, scale: 1 }),
  
  /** Date of the last evaluation */
  last_evaluation_date: date('last_evaluation_date'),
  
  /** Last update timestamp */
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  // Indexes for performance
  totalEvaluationsIdx: index('player_stats_total_evaluations_idx').on(table.total_evaluations),
  avgOverallIdx: index('player_stats_avg_overall_idx').on(table.avg_overall),
  lastEvaluationDateIdx: index('player_stats_last_evaluation_date_idx').on(table.last_evaluation_date),
  updatedAtIdx: index('player_stats_updated_at_idx').on(table.updated_at),
}));
