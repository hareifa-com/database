/**
 * Community Reports Table - نظام الإبلاغ المجتمعي
 * يسمح للمستخدمين بالإبلاغ عن محتوى مشبوه أو غير مناسب
 */
export declare const reportReasonEnum: import("drizzle-orm/pg-core").PgEnum<["fake_info", "bias", "inappropriate", "spam", "harassment", "duplicate", "inaccurate", "other"]>;
export declare const reportStatusEnum: import("drizzle-orm/pg-core").PgEnum<["pending", "under_review", "resolved", "dismissed", "escalated"]>;
export declare const communityReports: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "community_reports";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        reporter_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "reporter_id";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        reported_entity: import("drizzle-orm/pg-core").PgColumn<{
            name: "reported_entity";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        entity_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "entity_id";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        reason: import("drizzle-orm/pg-core").PgColumn<{
            name: "reason";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "fake_info" | "bias" | "inappropriate" | "spam" | "harassment" | "duplicate" | "inaccurate" | "other";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: ["fake_info", "bias", "inappropriate", "spam", "harassment", "duplicate", "inaccurate", "other"];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        evidence: import("drizzle-orm/pg-core").PgColumn<{
            name: "evidence";
            tableName: "community_reports";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: import("drizzle-orm").Column<{
                name: "evidence";
                tableName: "community_reports";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
            }, object, object>;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "pending" | "under_review" | "resolved" | "dismissed" | "escalated";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: ["pending", "under_review", "resolved", "dismissed", "escalated"];
            baseColumn: never;
        }, {}, {}>;
        moderator_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "moderator_id";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        resolution: import("drizzle-orm/pg-core").PgColumn<{
            name: "resolution";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        actions_taken: import("drizzle-orm/pg-core").PgColumn<{
            name: "actions_taken";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        priority: import("drizzle-orm/pg-core").PgColumn<{
            name: "priority";
            tableName: "community_reports";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        created_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "community_reports";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updated_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "community_reports";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        resolved_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "resolved_at";
            tableName: "community_reports";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export type CommunityReport = typeof communityReports.$inferSelect;
export type NewCommunityReport = typeof communityReports.$inferInsert;
//# sourceMappingURL=community-reports.d.ts.map