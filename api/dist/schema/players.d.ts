/**
 * Players table - the heart of the El-Harifa system
 * Stores information about young football players being discovered and evaluated
 */
export declare const players: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "players";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "players";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        full_name_ar: import("drizzle-orm/pg-core").PgColumn<{
            name: "full_name_ar";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        birth_date: import("drizzle-orm/pg-core").PgColumn<{
            name: "birth_date";
            tableName: "players";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        birth_place: import("drizzle-orm/pg-core").PgColumn<{
            name: "birth_place";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        governorate: import("drizzle-orm/pg-core").PgColumn<{
            name: "governorate";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        academy_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "academy_id";
            tableName: "players";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        height_cm: import("drizzle-orm/pg-core").PgColumn<{
            name: "height_cm";
            tableName: "players";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        weight_kg: import("drizzle-orm/pg-core").PgColumn<{
            name: "weight_kg";
            tableName: "players";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        dominant_foot: import("drizzle-orm/pg-core").PgColumn<{
            name: "dominant_foot";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: "right" | "left" | "both";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        primary_position: import("drizzle-orm/pg-core").PgColumn<{
            name: "primary_position";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        secondary_position: import("drizzle-orm/pg-core").PgColumn<{
            name: "secondary_position";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST";
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        bio: import("drizzle-orm/pg-core").PgColumn<{
            name: "bio";
            tableName: "players";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        family_status: import("drizzle-orm/pg-core").PgColumn<{
            name: "family_status";
            tableName: "players";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        daily_travel_to_training: import("drizzle-orm/pg-core").PgColumn<{
            name: "daily_travel_to_training";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        school_performance: import("drizzle-orm/pg-core").PgColumn<{
            name: "school_performance";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        scout_story: import("drizzle-orm/pg-core").PgColumn<{
            name: "scout_story";
            tableName: "players";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        latitude: import("drizzle-orm/pg-core").PgColumn<{
            name: "latitude";
            tableName: "players";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        longitude: import("drizzle-orm/pg-core").PgColumn<{
            name: "longitude";
            tableName: "players";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "players";
            dataType: "string";
            columnType: "PgVarchar";
            data: "incomplete" | "active" | "archived";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        created_by: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_by";
            tableName: "players";
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
            tableName: "players";
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
            tableName: "players";
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
//# sourceMappingURL=players.d.ts.map