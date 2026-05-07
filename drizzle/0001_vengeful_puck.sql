CREATE TABLE IF NOT EXISTS "community_activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"activity_type" text NOT NULL,
	"description_ar" text NOT NULL,
	"reference_id" uuid,
	"reference_type" text,
	"metadata" json,
	"is_public" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "community_badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"badge_type" "badge_type" NOT NULL,
	"title_ar" text NOT NULL,
	"description_ar" text NOT NULL,
	"icon_url" text,
	"earned_at" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true,
	"reason" text,
	"reference_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "community_contributions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contributor_id" uuid NOT NULL,
	"contribution_type" "contribution_type" NOT NULL,
	"title_ar" text NOT NULL,
	"description_ar" text NOT NULL,
	"external_url" text,
	"reference_id" uuid,
	"reference_type" text,
	"status" text DEFAULT 'pending',
	"reviewer_id" uuid,
	"review_comments" text,
	"impact_score" integer,
	"community_votes" integer DEFAULT 0,
	"tags" text[],
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "community_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reporter_id" uuid NOT NULL,
	"reported_entity" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"reason" "report_reason" NOT NULL,
	"description" text NOT NULL,
	"evidence" text[],
	"status" "report_status" DEFAULT 'pending',
	"moderator_id" uuid,
	"resolution" text,
	"actions_taken" text,
	"priority" text DEFAULT 'medium',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dispute_resolutions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"related_entity_id" uuid NOT NULL,
	"entity_type" text NOT NULL,
	"parties" json NOT NULL,
	"status" text DEFAULT 'open',
	"mediator_id" uuid,
	"description" text NOT NULL,
	"evidence" json,
	"resolution" text,
	"actions_taken" json,
	"compensation" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification_delivery_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"notification_id" uuid NOT NULL,
	"channel" text NOT NULL,
	"status" text NOT NULL,
	"recipient" text NOT NULL,
	"error_message" text,
	"retry_count" integer DEFAULT 0,
	"attempted_at" timestamp DEFAULT now(),
	"delivered_at" timestamp,
	"service_response" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification_preferences" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"email_enabled" boolean DEFAULT true,
	"push_enabled" boolean DEFAULT true,
	"sms_enabled" boolean DEFAULT false,
	"in_app_enabled" boolean DEFAULT true,
	"preferred_language" text DEFAULT 'ar',
	"quiet_hours_start" text,
	"quiet_hours_end" text,
	"quiet_hours_min_priority" "notification_priority" DEFAULT 'high',
	"type_preferences" json,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "notification_type" NOT NULL,
	"title_ar" text NOT NULL,
	"message_ar" text NOT NULL,
	"data" json,
	"read" boolean DEFAULT false,
	"priority" "notification_priority" DEFAULT 'medium',
	"reference_id" uuid,
	"reference_type" text,
	"action_url" text,
	"dismissible" boolean DEFAULT true,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"read_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reputation_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"action_type" text NOT NULL,
	"score_change" integer NOT NULL,
	"reason" text NOT NULL,
	"reference_id" uuid,
	"previous_score" integer NOT NULL,
	"new_score" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reputation_scores" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"total_score" integer DEFAULT 0,
	"level" "reputation_level" DEFAULT 'newcomer',
	"evaluation_quality" numeric(3, 1) DEFAULT '0',
	"community_contribution" integer DEFAULT 0,
	"verification_level" numeric(3, 1) DEFAULT '0',
	"dispute_history" integer DEFAULT 0,
	"tenure_days" integer DEFAULT 0,
	"total_contributions" integer DEFAULT 0,
	"helpful_votes" integer DEFAULT 0,
	"accurate_reports" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"verification_type" text NOT NULL,
	"status" "verification_status" DEFAULT 'pending',
	"documents" json,
	"additional_info" text,
	"reviewer_id" uuid,
	"review_notes" text,
	"rejection_reason" text,
	"verification_level" integer,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "academies" ALTER COLUMN "manager_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "name_en" varchar(100);--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "city" varchar(50);--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "email" varchar(100);--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "website" varchar(200);--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "established_year" integer;--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "created_by" uuid;--> statement-breakpoint
ALTER TABLE "academies" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "activities_user_idx" ON "community_activities" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "activities_type_idx" ON "community_activities" ("activity_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "activities_public_idx" ON "community_activities" ("is_public");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "activities_created_at_idx" ON "community_activities" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "badges_user_idx" ON "community_badges" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "badges_type_idx" ON "community_badges" ("badge_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "badges_earned_at_idx" ON "community_badges" ("earned_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contributions_contributor_idx" ON "community_contributions" ("contributor_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contributions_type_idx" ON "community_contributions" ("contribution_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contributions_status_idx" ON "community_contributions" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contributions_created_at_idx" ON "community_contributions" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contributions_impact_idx" ON "community_contributions" ("impact_score");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reports_reporter_idx" ON "community_reports" ("reporter_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reports_entity_idx" ON "community_reports" ("reported_entity","entity_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reports_status_idx" ON "community_reports" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reports_priority_idx" ON "community_reports" ("priority");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reports_created_at_idx" ON "community_reports" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dispute_entity_idx" ON "dispute_resolutions" ("related_entity_id","entity_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dispute_status_idx" ON "dispute_resolutions" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dispute_mediator_idx" ON "dispute_resolutions" ("mediator_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dispute_created_at_idx" ON "dispute_resolutions" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_delivery_notification_idx" ON "notification_delivery_logs" ("notification_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_delivery_status_idx" ON "notification_delivery_logs" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_delivery_channel_idx" ON "notification_delivery_logs" ("channel");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_delivery_attempted_at_idx" ON "notification_delivery_logs" ("attempted_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_prefs_email_idx" ON "notification_preferences" ("email_enabled");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_prefs_push_idx" ON "notification_preferences" ("push_enabled");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_user_idx" ON "notifications" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_type_idx" ON "notifications" ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_priority_idx" ON "notifications" ("priority");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_read_idx" ON "notifications" ("read");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_created_at_idx" ON "notifications" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reputation_history_user_idx" ON "reputation_history" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reputation_action_type_idx" ON "reputation_history" ("action_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reputation_history_created_at_idx" ON "reputation_history" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reputation_score_idx" ON "reputation_scores" ("total_score");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reputation_level_idx" ON "reputation_scores" ("level");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reputation_quality_idx" ON "reputation_scores" ("evaluation_quality");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_user_idx" ON "verification_requests" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_type_idx" ON "verification_requests" ("verification_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_status_idx" ON "verification_requests" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_created_at_idx" ON "verification_requests" ("created_at");