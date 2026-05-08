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
// Community system tables
import { communityReports } from './community-reports';
import { reputationScores, communityBadges, reputationHistory } from './reputation-system';
import { notifications, notificationPreferences, notificationDeliveryLogs } from './notifications';
import { communityContributions, verificationRequests, disputeResolutions, communityActivities } from './community-features';
export { 
// Core tables
users, academies, players, evaluations, coachNotes, playerVideos, playerStats, 
// Community system tables
communityReports, reputationScores, communityBadges, reputationHistory, notifications, notificationPreferences, notificationDeliveryLogs, communityContributions, verificationRequests, disputeResolutions, communityActivities, };
/**
 * All tables object for Drizzle schema configuration
 */
export const schema = {
    // Core tables
    users,
    academies,
    players,
    evaluations,
    coachNotes,
    playerVideos,
    playerStats,
    // Community system tables
    communityReports,
    reputationScores,
    communityBadges,
    reputationHistory,
    notifications,
    notificationPreferences,
    notificationDeliveryLogs,
    communityContributions,
    verificationRequests,
    disputeResolutions,
    communityActivities,
};
