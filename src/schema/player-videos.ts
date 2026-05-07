import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  integer, 
  timestamp,
  index
} from 'drizzle-orm/pg-core';

/**
 * Player videos table - stores video content and links for players
 * Includes YouTube videos, highlights, and training footage
 */
export const playerVideos = pgTable('player_videos', {
  /** Primary key - auto-generated UUID */
  id: uuid('id').primaryKey().defaultRandom(),
  
  /** Player ID featured in the video */
  player_id: uuid('player_id').notNull(),
  
  /** Video title */
  title: varchar('title', { length: 200 }),
  
  /** Full YouTube video URL */
  youtube_url: varchar('youtube_url', { length: 255 }).notNull(),
  
  /** YouTube video ID (extracted from URL) */
  youtube_id: varchar('youtube_id', { length: 20 }).unique(),
  
  /** Thumbnail image URL */
  thumbnail_url: varchar('thumbnail_url', { length: 255 }),
  
  /** Video duration in seconds */
  duration_seconds: integer('duration_seconds'),
  
  /** Tags for categorizing and searching videos */
  tags: text('tags').array(),
  
  /** User ID of who uploaded the video */
  uploaded_by: uuid('uploaded_by').notNull(),
  
  /** Video upload timestamp */
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  // Indexes for performance
  playerIdIdx: index('player_videos_player_id_idx').on(table.player_id),
  youtubeIdIdx: index('player_videos_youtube_id_idx').on(table.youtube_id),
  uploadedByIdx: index('player_videos_uploaded_by_idx').on(table.uploaded_by),
  createdAtIdx: index('player_videos_created_at_idx').on(table.created_at),
}));
