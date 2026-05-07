/**
 * Define relationships between tables in the El-Harifa database
 * These relationships enable powerful queries with joins and related data access
 */
export declare const usersRelations: import("drizzle-orm").Relations<"users", {
    managedAcademies: import("drizzle-orm").Many<"academies">;
    createdPlayers: import("drizzle-orm").Many<"players">;
    evaluations: import("drizzle-orm").Many<"evaluations">;
    coachNotes: import("drizzle-orm").Many<"coach_notes">;
    uploadedVideos: import("drizzle-orm").Many<"player_videos">;
    reviewedEvaluations: import("drizzle-orm").Many<"evaluations">;
    reviewedAcademies: import("drizzle-orm").Many<"academies">;
    academy: import("drizzle-orm").One<"academies", false>;
}>;
export declare const academiesRelations: import("drizzle-orm").Relations<"academies", {
    manager: import("drizzle-orm").One<"users", true>;
    reviewer: import("drizzle-orm").One<"users", false>;
    players: import("drizzle-orm").Many<"players">;
    staff: import("drizzle-orm").Many<"users">;
}>;
export declare const playersRelations: import("drizzle-orm").Relations<"players", {
    academy: import("drizzle-orm").One<"academies", false>;
    creator: import("drizzle-orm").One<"users", true>;
    evaluations: import("drizzle-orm").Many<"evaluations">;
    coachNotes: import("drizzle-orm").Many<"coach_notes">;
    videos: import("drizzle-orm").Many<"player_videos">;
    stats: import("drizzle-orm").One<"player_stats", true>;
}>;
export declare const evaluationsRelations: import("drizzle-orm").Relations<"evaluations", {
    player: import("drizzle-orm").One<"players", true>;
    evaluator: import("drizzle-orm").One<"users", true>;
    reviewer: import("drizzle-orm").One<"users", false>;
}>;
export declare const coachNotesRelations: import("drizzle-orm").Relations<"coach_notes", {
    player: import("drizzle-orm").One<"players", true>;
    coach: import("drizzle-orm").One<"users", true>;
}>;
export declare const playerVideosRelations: import("drizzle-orm").Relations<"player_videos", {
    player: import("drizzle-orm").One<"players", true>;
    uploader: import("drizzle-orm").One<"users", true>;
}>;
export declare const playerStatsRelations: import("drizzle-orm").Relations<"player_stats", {
    player: import("drizzle-orm").One<"players", true>;
}>;
//# sourceMappingURL=relations.d.ts.map