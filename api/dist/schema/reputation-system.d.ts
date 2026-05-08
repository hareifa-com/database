/**
 * Reputation System Tables - نظام السمعة والثقة المجتمعي
 * يقوم بتتبع سمعة المستخدمين ومستوى الثقة في تقييماتهم
 */
export declare const badgeEnum: import("drizzle-orm/pg-core").PgEnum<["trusted_scout", "expert_evaluator", "community_leader", "verified_academy", "top_contributor", "helpful_member", "quality_reviewer", "mentor", "pioneer", "ambassador"]>;
export declare const reputationLevelEnum: import("drizzle-orm/pg-core").PgEnum<["newcomer", "member", "trusted", "expert", "leader", "legend"]>;
export declare const reputationScores: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "reputation_scores";
    schema: undefined;
    columns: {
        user_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "reputation_scores";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        total_score: import("drizzle-orm/pg-core").PgColumn<{
            name: "total_score";
            tableName: "reputation_scores";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        level: import("drizzle-orm/pg-core").PgColumn<{
            name: "level";
            tableName: "reputation_scores";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "newcomer" | "member" | "trusted" | "expert" | "leader" | "legend";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: ["newcomer", "member", "trusted", "expert", "leader", "legend"];
            baseColumn: never;
        }, {}, {}>;
        evaluation_quality: import("drizzle-orm/pg-core").PgColumn<{
            name: "evaluation_quality";
            tableName: "reputation_scores";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        community_contribution: import("drizzle-orm/pg-core").PgColumn<{
            name: "community_contribution";
            tableName: "reputation_scores";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        verification_level: import("drizzle-orm/pg-core").PgColumn<{
            name: "verification_level";
            tableName: "reputation_scores";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        dispute_history: import("drizzle-orm/pg-core").PgColumn<{
            name: "dispute_history";
            tableName: "reputation_scores";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        tenure_days: import("drizzle-orm/pg-core").PgColumn<{
            name: "tenure_days";
            tableName: "reputation_scores";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        total_contributions: import("drizzle-orm/pg-core").PgColumn<{
            name: "total_contributions";
            tableName: "reputation_scores";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        helpful_votes: import("drizzle-orm/pg-core").PgColumn<{
            name: "helpful_votes";
            tableName: "reputation_scores";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        accurate_reports: import("drizzle-orm/pg-core").PgColumn<{
            name: "accurate_reports";
            tableName: "reputation_scores";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updated_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "reputation_scores";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const communityBadges: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "community_badges";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "community_badges";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        user_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "community_badges";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        badge_type: import("drizzle-orm/pg-core").PgColumn<{
            name: "badge_type";
            tableName: "community_badges";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "trusted_scout" | "expert_evaluator" | "community_leader" | "verified_academy" | "top_contributor" | "helpful_member" | "quality_reviewer" | "mentor" | "pioneer" | "ambassador";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: ["trusted_scout", "expert_evaluator", "community_leader", "verified_academy", "top_contributor", "helpful_member", "quality_reviewer", "mentor", "pioneer", "ambassador"];
            baseColumn: never;
        }, {}, {}>;
        title_ar: import("drizzle-orm/pg-core").PgColumn<{
            name: "title_ar";
            tableName: "community_badges";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description_ar: import("drizzle-orm/pg-core").PgColumn<{
            name: "description_ar";
            tableName: "community_badges";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        icon_url: import("drizzle-orm/pg-core").PgColumn<{
            name: "icon_url";
            tableName: "community_badges";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        earned_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "earned_at";
            tableName: "community_badges";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        is_active: import("drizzle-orm/pg-core").PgColumn<{
            name: "is_active";
            tableName: "community_badges";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        reason: import("drizzle-orm/pg-core").PgColumn<{
            name: "reason";
            tableName: "community_badges";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        reference_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "reference_id";
            tableName: "community_badges";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const reputationHistory: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "reputation_history";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "reputation_history";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        user_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "reputation_history";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        action_type: import("drizzle-orm/pg-core").PgColumn<{
            name: "action_type";
            tableName: "reputation_history";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        score_change: import("drizzle-orm/pg-core").PgColumn<{
            name: "score_change";
            tableName: "reputation_history";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        reason: import("drizzle-orm/pg-core").PgColumn<{
            name: "reason";
            tableName: "reputation_history";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        reference_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "reference_id";
            tableName: "reputation_history";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        previous_score: import("drizzle-orm/pg-core").PgColumn<{
            name: "previous_score";
            tableName: "reputation_history";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        new_score: import("drizzle-orm/pg-core").PgColumn<{
            name: "new_score";
            tableName: "reputation_history";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        created_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "reputation_history";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export type ReputationScore = typeof reputationScores.$inferSelect;
export type NewReputationScore = typeof reputationScores.$inferInsert;
export type CommunityBadge = typeof communityBadges.$inferSelect;
export type NewCommunityBadge = typeof communityBadges.$inferInsert;
export type ReputationHistory = typeof reputationHistory.$inferSelect;
export type NewReputationHistory = typeof reputationHistory.$inferInsert;
//# sourceMappingURL=reputation-system.d.ts.map