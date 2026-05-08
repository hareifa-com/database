/**
 * Evaluations table - stores detailed player evaluations by coaches, scouts, and volunteers
 * This is the core assessment mechanism for player potential and skills
 */
export declare const evaluations: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "evaluations";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "evaluations";
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
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        evaluator_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "evaluator_id";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        evaluator_role: import("drizzle-orm/pg-core").PgColumn<{
            name: "evaluator_role";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgVarchar";
            data: "مدرب" | "كشاف" | "متطوع";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        evaluation_type: import("drizzle-orm/pg-core").PgColumn<{
            name: "evaluation_type";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgVarchar";
            data: "مدرب" | "كشاف" | "متطوع";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        event_name: import("drizzle-orm/pg-core").PgColumn<{
            name: "event_name";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        event_date: import("drizzle-orm/pg-core").PgColumn<{
            name: "event_date";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        minutes_watched: import("drizzle-orm/pg-core").PgColumn<{
            name: "minutes_watched";
            tableName: "evaluations";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        technical_skills: import("drizzle-orm/pg-core").PgColumn<{
            name: "technical_skills";
            tableName: "evaluations";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                dribbling: number;
                first_touch: number;
                passing_short: number;
                passing_long: number;
                shooting: number;
                tackling: number;
            };
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        physical_attributes: import("drizzle-orm/pg-core").PgColumn<{
            name: "physical_attributes";
            tableName: "evaluations";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                pace: number;
                stamina: number;
                strength: number;
                agility: number;
            };
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        mental_attributes: import("drizzle-orm/pg-core").PgColumn<{
            name: "mental_attributes";
            tableName: "evaluations";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                decision_making: number;
                vision: number;
                composure: number;
                leadership: number;
            };
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        commitment: import("drizzle-orm/pg-core").PgColumn<{
            name: "commitment";
            tableName: "evaluations";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                training_attendance: number;
                academic_discipline: number;
                coachability: number;
            };
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        overall_potential: import("drizzle-orm/pg-core").PgColumn<{
            name: "overall_potential";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgVarchar";
            data: "A" | "B" | "C" | "D";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        strengths: import("drizzle-orm/pg-core").PgColumn<{
            name: "strengths";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        weaknesses: import("drizzle-orm/pg-core").PgColumn<{
            name: "weaknesses";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        scout_notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "scout_notes";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        video_url: import("drizzle-orm/pg-core").PgColumn<{
            name: "video_url";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        weight: import("drizzle-orm/pg-core").PgColumn<{
            name: "weight";
            tableName: "evaluations";
            dataType: "number";
            columnType: "PgInteger";
            data: 1 | 2 | 3;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgVarchar";
            data: "قيد_المراجعة" | "مرفوض" | "معتمد";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        reviewed_by: import("drizzle-orm/pg-core").PgColumn<{
            name: "reviewed_by";
            tableName: "evaluations";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        review_notes: import("drizzle-orm/pg-core").PgColumn<{
            name: "review_notes";
            tableName: "evaluations";
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
            tableName: "evaluations";
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
//# sourceMappingURL=evaluations.d.ts.map