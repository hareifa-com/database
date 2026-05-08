/**
 * Player stats table - stores aggregated statistics for each player
 * This table is updated periodically with calculated averages from evaluations
 */
export declare const playerStats: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "player_stats";
    schema: undefined;
    columns: {
        player_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "player_id";
            tableName: "player_stats";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        total_evaluations: import("drizzle-orm/pg-core").PgColumn<{
            name: "total_evaluations";
            tableName: "player_stats";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        avg_technical: import("drizzle-orm/pg-core").PgColumn<{
            name: "avg_technical";
            tableName: "player_stats";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        avg_physical: import("drizzle-orm/pg-core").PgColumn<{
            name: "avg_physical";
            tableName: "player_stats";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        avg_mental: import("drizzle-orm/pg-core").PgColumn<{
            name: "avg_mental";
            tableName: "player_stats";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        avg_commitment: import("drizzle-orm/pg-core").PgColumn<{
            name: "avg_commitment";
            tableName: "player_stats";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        avg_overall: import("drizzle-orm/pg-core").PgColumn<{
            name: "avg_overall";
            tableName: "player_stats";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        last_evaluation_date: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_evaluation_date";
            tableName: "player_stats";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updated_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "player_stats";
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
//# sourceMappingURL=player-stats.d.ts.map