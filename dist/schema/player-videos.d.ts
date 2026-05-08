/**
 * Player videos table - stores video content and links for players
 * Includes YouTube videos, highlights, and training footage
 */
export declare const playerVideos: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "player_videos";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "player_videos";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        player_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "player_id";
            tableName: "player_videos";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "player_videos";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        youtube_url: import("drizzle-orm/pg-core").PgColumn<{
            name: "youtube_url";
            tableName: "player_videos";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        youtube_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "youtube_id";
            tableName: "player_videos";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        thumbnail_url: import("drizzle-orm/pg-core").PgColumn<{
            name: "thumbnail_url";
            tableName: "player_videos";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        duration_seconds: import("drizzle-orm/pg-core").PgColumn<{
            name: "duration_seconds";
            tableName: "player_videos";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        tags: import("drizzle-orm/pg-core").PgColumn<{
            name: "tags";
            tableName: "player_videos";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: import("drizzle-orm").Column<{
                name: "tags";
                tableName: "player_videos";
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
        uploaded_by: import("drizzle-orm/pg-core").PgColumn<{
            name: "uploaded_by";
            tableName: "player_videos";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        created_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "player_videos";
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
//# sourceMappingURL=player-videos.d.ts.map