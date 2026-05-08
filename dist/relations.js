import { relations } from 'drizzle-orm';
import { users, academies, players, evaluations, coachNotes, playerVideos, playerStats } from './schema';
/**
 * Define relationships between tables in the El-Harifa database
 * These relationships enable powerful queries with joins and related data access
 */
// Users relationships
export const usersRelations = relations(users, ({ many, one }) => ({
    // User can manage many academies
    managedAcademies: many(academies),
    // User can create many players
    createdPlayers: many(players),
    // User can evaluate many players
    evaluations: many(evaluations),
    // User can write many coach notes
    coachNotes: many(coachNotes),
    // User can upload many videos
    uploadedVideos: many(playerVideos),
    // User can review many evaluations
    reviewedEvaluations: many(evaluations),
    // User can review many academies
    reviewedAcademies: many(academies),
    // User can belong to an academy (if they're a coach/staff)
    academy: one(academies, {
        fields: [users.academy_id],
        references: [academies.id],
    }),
}));
// Academies relationships
export const academiesRelations = relations(academies, ({ one, many }) => ({
    // Academy has one manager
    manager: one(users, {
        fields: [academies.manager_id],
        references: [users.id],
    }),
    // Academy has one reviewer
    reviewer: one(users, {
        fields: [academies.reviewer_id],
        references: [users.id],
    }),
    // Academy has many players
    players: many(players),
    // Academy has many staff users
    staff: many(users),
}));
// Players relationships
export const playersRelations = relations(players, ({ one, many }) => ({
    // Player belongs to one academy (nullable)
    academy: one(academies, {
        fields: [players.academy_id],
        references: [academies.id],
    }),
    // Player was created by one user
    creator: one(users, {
        fields: [players.created_by],
        references: [users.id],
    }),
    // Player has many evaluations
    evaluations: many(evaluations),
    // Player has many coach notes
    coachNotes: many(coachNotes),
    // Player has many videos
    videos: many(playerVideos),
    // Player has one stats record
    stats: one(playerStats, {
        fields: [players.id],
        references: [playerStats.player_id],
    }),
}));
// Evaluations relationships
export const evaluationsRelations = relations(evaluations, ({ one }) => ({
    // Evaluation belongs to one player
    player: one(players, {
        fields: [evaluations.player_id],
        references: [players.id],
    }),
    // Evaluation was made by one user (evaluator)
    evaluator: one(users, {
        fields: [evaluations.evaluator_id],
        references: [users.id],
    }),
    // Evaluation was reviewed by one user
    reviewer: one(users, {
        fields: [evaluations.reviewed_by],
        references: [users.id],
    }),
}));
// Coach notes relationships
export const coachNotesRelations = relations(coachNotes, ({ one }) => ({
    // Coach note belongs to one player
    player: one(players, {
        fields: [coachNotes.player_id],
        references: [players.id],
    }),
    // Coach note was written by one coach
    coach: one(users, {
        fields: [coachNotes.coach_id],
        references: [users.id],
    }),
}));
// Player videos relationships
export const playerVideosRelations = relations(playerVideos, ({ one }) => ({
    // Video belongs to one player
    player: one(players, {
        fields: [playerVideos.player_id],
        references: [players.id],
    }),
    // Video was uploaded by one user
    uploader: one(users, {
        fields: [playerVideos.uploaded_by],
        references: [users.id],
    }),
}));
// Player stats relationships
export const playerStatsRelations = relations(playerStats, ({ one }) => ({
    // Stats belong to one player
    player: one(players, {
        fields: [playerStats.player_id],
        references: [players.id],
    }),
}));
