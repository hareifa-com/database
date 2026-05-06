import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  date,
  decimal, 
  timestamp,
  boolean,
  index
} from 'drizzle-orm/pg-core';

/**
 * Players table - the heart of the El-Harifa system
 * Stores information about young football players being discovered and evaluated
 */
export const players = pgTable('players', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** Player's full name in Arabic */
  full_name_ar: varchar('full_name_ar', { length: 100 }).notNull(),
  
  /** Player's date of birth */
  birth_date: date('birth_date').notNull(),
  
  /** Player's place of birth */
  birth_place: varchar('birth_place', { length: 100 }),
  
  /** Egyptian governorate where player is from */
  governorate: varchar('governorate', { length: 50 }).notNull(),
  
  /** Academy ID if player belongs to an academy (nullable for street players) */
  academy_id: uuid('academy_id'),
  
  /** Player height in centimeters */
  height_cm: decimal('height_cm', { precision: 5, scale: 1 }),
  
  /** Player weight in kilograms */
  weight_kg: decimal('weight_kg', { precision: 4, scale: 1 }),
  
  /** Player's dominant foot */
  dominant_foot: varchar('dominant_foot', { length: 5 }).notNull().$type<'right' | 'left' | 'both'>(),
  
  /** Player's primary position */
  primary_position: varchar('primary_position', { length: 3 }).notNull().$type<'GK' | 'CB' | 'LB' | 'RB' | 'CM' | 'AM' | 'LW' | 'RW' | 'ST'>(),
  
  /** Player's secondary position (optional) */
  secondary_position: varchar('secondary_position', { length: 3 }).$type<'GK' | 'CB' | 'LB' | 'RB' | 'CM' | 'AM' | 'LW' | 'RW' | 'ST'>(),
  
  /** Player bio and background information */
  bio: text('bio'),
  
  /** Family status and background */
  family_status: text('family_status'),
  
  /** How player travels to training daily */
  daily_travel_to_training: varchar('daily_travel_to_training', { length: 100 }),
  
  /** School performance level */
  school_performance: varchar('school_performance', { length: 50 }),
  
  /** Story of how player was discovered */
  scout_story: text('scout_story'),
  
  /** Geographic latitude for player location */
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  
  /** Geographic longitude for player location */
  longitude: decimal('longitude', { precision: 10, scale: 7 }),
  
  /** Player status in the system */
  status: varchar('status', { length: 20 }).default('incomplete').$type<'active' | 'incomplete' | 'archived'>(),
  
  /** User ID of who created this player record */
  created_by: uuid('created_by').notNull(),
  
  /** Player record creation timestamp */
  created_at: timestamp('created_at').defaultNow(),
  
  /** Last update timestamp */
  updated_at: timestamp('updated_at').defaultNow(),
}, (table) => ({
  // Indexes for performance
  nameIdx: index('players_name_idx').on(table.full_name_ar),
  birthDateIdx: index('players_birth_date_idx').on(table.birth_date),
  governorateIdx: index('players_governorate_idx').on(table.governorate),
  academyIdx: index('players_academy_idx').on(table.academy_id),
  primaryPositionIdx: index('players_primary_position_idx').on(table.primary_position),
  statusIdx: index('players_status_idx').on(table.status),
  createdByIdx: index('players_created_by_idx').on(table.created_by),
  dominantFootIdx: index('players_dominant_foot_idx').on(table.dominant_foot),
}));
