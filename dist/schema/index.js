/**
 * Schema exports for El-Harifa database
 * Exports all table definitions for use in the application
 */
import { users } from './users.js';
import { academies } from './academies.js';
import { players } from './players.js';
import { evaluations } from './evaluations.js';
import { coachNotes } from './coach-notes.js';
import { playerVideos } from './player-videos.js';
import { playerStats } from './player-stats.js';
export { users, academies, players, evaluations, coachNotes, playerVideos, playerStats, };
/**
 * All tables object for Drizzle schema configuration
 */
export const schema = {
    users,
    academies,
    players,
    evaluations,
    coachNotes,
    playerVideos,
    playerStats,
};
//# sourceMappingURL=index.js.map