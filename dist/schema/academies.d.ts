/**
 * Academies table - stores football academies, youth centers, clubs, and schools
 * These are the institutions where young players are trained and discovered
 */
export declare const academies: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "academies";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "academies";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        name_ar: import("drizzle-orm/pg-core").PgColumn<{
            name: "name_ar";
            tableName: "academies";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        governorate: import("drizzle-orm/pg-core").PgColumn<{
            name: "governorate";
            tableName: "academies";
            dataType: "string";
            columnType: "PgVarchar";
            data: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        type: import("drizzle-orm/pg-core").PgColumn<{
            name: "type";
            tableName: "academies";
            dataType: "string";
            columnType: "PgVarchar";
            data: "مركز_شباب" | "اكاديمية" | "نادي" | "مدرسة";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        address: import("drizzle-orm/pg-core").PgColumn<{
            name: "address";
            tableName: "academies";
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
            tableName: "academies";
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
            tableName: "academies";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        coach_name: import("drizzle-orm/pg-core").PgColumn<{
            name: "coach_name";
            tableName: "academies";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        coach_phone: import("drizzle-orm/pg-core").PgColumn<{
            name: "coach_phone";
            tableName: "academies";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        manager_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "manager_id";
            tableName: "academies";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "academies";
            dataType: "string";
            columnType: "PgVarchar";
            data: "قيد_المراجعة" | "نشط" | "موقوف" | "مرفوض";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        verified: import("drizzle-orm/pg-core").PgColumn<{
            name: "verified";
            tableName: "academies";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        reviewer_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "reviewer_id";
            tableName: "academies";
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
            tableName: "academies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        reviewed_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "reviewed_at";
            tableName: "academies";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        created_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "academies";
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
            tableName: "academies";
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
//# sourceMappingURL=academies.d.ts.map