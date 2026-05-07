/**
 * Notifications System - نظام الإشعارات المتقدم
 * يوفر إشعارات للمستخدمين حول الأحداث المهمة في المنصة
 */
export declare const notificationTypeEnum: import("drizzle-orm/pg-core").PgEnum<["evaluation_received", "player_discovered", "report_filed", "verification_approved", "badge_earned", "dispute_resolved", "community_update", "player_added", "evaluation_approved", "report_resolved", "new_follower", "mention", "system_announcement", "deadline_reminder", "achievement_unlocked"]>;
export declare const notificationPriorityEnum: import("drizzle-orm/pg-core").PgEnum<["low", "medium", "high", "urgent"]>;
export declare const notifications: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "notifications";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "notifications";
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
            tableName: "notifications";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        type: import("drizzle-orm/pg-core").PgColumn<{
            name: "type";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "evaluation_received" | "player_discovered" | "report_filed" | "verification_approved" | "badge_earned" | "dispute_resolved" | "community_update" | "player_added" | "evaluation_approved" | "report_resolved" | "new_follower" | "mention" | "system_announcement" | "deadline_reminder" | "achievement_unlocked";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: ["evaluation_received", "player_discovered", "report_filed", "verification_approved", "badge_earned", "dispute_resolved", "community_update", "player_added", "evaluation_approved", "report_resolved", "new_follower", "mention", "system_announcement", "deadline_reminder", "achievement_unlocked"];
            baseColumn: never;
        }, {}, {}>;
        title_ar: import("drizzle-orm/pg-core").PgColumn<{
            name: "title_ar";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        message_ar: import("drizzle-orm/pg-core").PgColumn<{
            name: "message_ar";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        data: import("drizzle-orm/pg-core").PgColumn<{
            name: "data";
            tableName: "notifications";
            dataType: "json";
            columnType: "PgJson";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        read: import("drizzle-orm/pg-core").PgColumn<{
            name: "read";
            tableName: "notifications";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        priority: import("drizzle-orm/pg-core").PgColumn<{
            name: "priority";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "medium" | "low" | "high" | "urgent";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: ["low", "medium", "high", "urgent"];
            baseColumn: never;
        }, {}, {}>;
        reference_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "reference_id";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        reference_type: import("drizzle-orm/pg-core").PgColumn<{
            name: "reference_type";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        action_url: import("drizzle-orm/pg-core").PgColumn<{
            name: "action_url";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        dismissible: import("drizzle-orm/pg-core").PgColumn<{
            name: "dismissible";
            tableName: "notifications";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        expires_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "expires_at";
            tableName: "notifications";
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
            tableName: "notifications";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        read_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "read_at";
            tableName: "notifications";
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
export declare const notificationPreferences: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "notification_preferences";
    schema: undefined;
    columns: {
        user_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "notification_preferences";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        email_enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "email_enabled";
            tableName: "notification_preferences";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        push_enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "push_enabled";
            tableName: "notification_preferences";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        sms_enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "sms_enabled";
            tableName: "notification_preferences";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        in_app_enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "in_app_enabled";
            tableName: "notification_preferences";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        preferred_language: import("drizzle-orm/pg-core").PgColumn<{
            name: "preferred_language";
            tableName: "notification_preferences";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        quiet_hours_start: import("drizzle-orm/pg-core").PgColumn<{
            name: "quiet_hours_start";
            tableName: "notification_preferences";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        quiet_hours_end: import("drizzle-orm/pg-core").PgColumn<{
            name: "quiet_hours_end";
            tableName: "notification_preferences";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        quiet_hours_min_priority: import("drizzle-orm/pg-core").PgColumn<{
            name: "quiet_hours_min_priority";
            tableName: "notification_preferences";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "medium" | "low" | "high" | "urgent";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: ["low", "medium", "high", "urgent"];
            baseColumn: never;
        }, {}, {}>;
        type_preferences: import("drizzle-orm/pg-core").PgColumn<{
            name: "type_preferences";
            tableName: "notification_preferences";
            dataType: "json";
            columnType: "PgJson";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updated_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "notification_preferences";
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
export declare const notificationDeliveryLogs: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "notification_delivery_logs";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "notification_delivery_logs";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notification_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "notification_id";
            tableName: "notification_delivery_logs";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        channel: import("drizzle-orm/pg-core").PgColumn<{
            name: "channel";
            tableName: "notification_delivery_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "notification_delivery_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        recipient: import("drizzle-orm/pg-core").PgColumn<{
            name: "recipient";
            tableName: "notification_delivery_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        error_message: import("drizzle-orm/pg-core").PgColumn<{
            name: "error_message";
            tableName: "notification_delivery_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        retry_count: import("drizzle-orm/pg-core").PgColumn<{
            name: "retry_count";
            tableName: "notification_delivery_logs";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        attempted_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "attempted_at";
            tableName: "notification_delivery_logs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        delivered_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "delivered_at";
            tableName: "notification_delivery_logs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        service_response: import("drizzle-orm/pg-core").PgColumn<{
            name: "service_response";
            tableName: "notification_delivery_logs";
            dataType: "json";
            columnType: "PgJson";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type NotificationPreference = typeof notificationPreferences.$inferSelect;
export type NewNotificationPreference = typeof notificationPreferences.$inferInsert;
export type NotificationDeliveryLog = typeof notificationDeliveryLogs.$inferSelect;
export type NewNotificationDeliveryLog = typeof notificationDeliveryLogs.$inferInsert;
//# sourceMappingURL=notifications.d.ts.map