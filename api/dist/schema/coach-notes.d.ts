/**
 * Coach notes table - stores regular observations and feedback from coaches
 * Provides ongoing tracking of player development and attendance
 */
export declare const coachNotes: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "coach_notes";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "coach_notes";
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
            tableName: "coach_notes";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        coach_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "coach_id";
            tableName: "coach_notes";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        note_date: import("drizzle-orm/pg-core").PgColumn<{
            name: "note_date";
            tableName: "coach_notes";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        attendance: import("drizzle-orm/pg-core").PgColumn<{
            name: "attendance";
            tableName: "coach_notes";
            dataType: "string";
            columnType: "PgVarchar";
            data: "حضر" | "غائب" | "متأخر" | "مصاب";
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        performance_rating: import("drizzle-orm/pg-core").PgColumn<{
            name: "performance_rating";
            tableName: "coach_notes";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        note: import("drizzle-orm/pg-core").PgColumn<{
            name: "note";
            tableName: "coach_notes";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        created_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "coach_notes";
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
//# sourceMappingURL=coach-notes.d.ts.map