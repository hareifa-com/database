/**
 * Schema exports for El-Harifa database
 * Exports all table definitions for use in the application
 */

import { users } from './users';
import { academies } from './academies';
import { players } from './players';
import { evaluations } from './evaluations';
import { coachNotes } from './coach-notes';
import { playerVideos } from './player-videos';
import { playerStats } from './player-stats';

export {
  users,
  academies,
  players,
  evaluations,
  coachNotes,
  playerVideos,
  playerStats,
};

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
