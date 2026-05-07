import { pgTable, uuid, text, date, integer, timestamp, varchar, index } from 'drizzle-orm/pg-core';
/**
 * Coach notes table - stores regular observations and feedback from coaches
 * Provides ongoing tracking of player development and attendance
 */
export const coachNotes = pgTable('coach_notes', {
    /** Primary key - auto-generated UUID */
    id: uuid('id').primaryKey().defaultRandom(),
    /** Player ID being observed */
    player_id: uuid('player_id').notNull(),
    /** Coach ID making the observation */
    coach_id: uuid('coach_id').notNull(),
    /** Date of the observation */
    note_date: date('note_date').defaultNow().notNull(),
    /** Attendance status for training/session */
    attendance: varchar('attendance', { length: 20 }).$type(),
    /** Performance rating (1-10 scale) */
    performance_rating: integer('performance_rating'),
    /** Detailed notes and observations */
    note: text('note'),
    /** Note creation timestamp */
    created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
    // Indexes for performance
    playerIdIdx: index('coach_notes_player_id_idx').on(table.player_id),
    coachIdIdx: index('coach_notes_coach_id_idx').on(table.coach_id),
    noteDateIdx: index('coach_notes_note_date_idx').on(table.note_date),
    attendanceIdx: index('coach_notes_attendance_idx').on(table.attendance),
}));
