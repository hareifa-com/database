CREATE TABLE IF NOT EXISTS "academies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_ar" varchar(100) NOT NULL,
	"governorate" varchar(50) NOT NULL,
	"type" varchar(20) NOT NULL,
	"address" text,
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"coach_name" varchar(100),
	"coach_phone" varchar(20),
	"manager_id" uuid NOT NULL,
	"status" varchar(20) DEFAULT 'قيد_المراجعة',
	"verified" boolean DEFAULT false,
	"reviewer_id" uuid,
	"review_notes" text,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coach_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"coach_id" uuid NOT NULL,
	"note_date" date DEFAULT now() NOT NULL,
	"attendance" varchar(20),
	"performance_rating" integer,
	"note" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "evaluations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"evaluator_id" uuid NOT NULL,
	"evaluator_role" varchar(20) NOT NULL,
	"evaluation_type" varchar(20) NOT NULL,
	"event_name" varchar(150),
	"event_date" date,
	"minutes_watched" integer,
	"technical_skills" jsonb NOT NULL,
	"physical_attributes" jsonb NOT NULL,
	"mental_attributes" jsonb NOT NULL,
	"commitment" jsonb NOT NULL,
	"overall_potential" varchar(1) NOT NULL,
	"strengths" text,
	"weaknesses" text,
	"scout_notes" text,
	"video_url" varchar(255),
	"weight" integer DEFAULT 1,
	"status" varchar(20) DEFAULT 'قيد_المراجعة',
	"reviewed_by" uuid,
	"review_notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_stats" (
	"player_id" uuid PRIMARY KEY NOT NULL,
	"total_evaluations" integer DEFAULT 0,
	"avg_technical" numeric(3, 1),
	"avg_physical" numeric(3, 1),
	"avg_mental" numeric(3, 1),
	"avg_commitment" numeric(3, 1),
	"avg_overall" numeric(3, 1),
	"last_evaluation_date" date,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"title" varchar(200),
	"youtube_url" varchar(255) NOT NULL,
	"youtube_id" varchar(20),
	"thumbnail_url" varchar(255),
	"duration_seconds" integer,
	"tags" text[],
	"uploaded_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "player_videos_youtube_id_unique" UNIQUE("youtube_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name_ar" varchar(100) NOT NULL,
	"birth_date" date NOT NULL,
	"birth_place" varchar(100),
	"governorate" varchar(50) NOT NULL,
	"academy_id" uuid,
	"height_cm" numeric(5, 1),
	"weight_kg" numeric(4, 1),
	"dominant_foot" varchar(5) NOT NULL,
	"primary_position" varchar(3) NOT NULL,
	"secondary_position" varchar(3),
	"bio" text,
	"family_status" text,
	"daily_travel_to_training" varchar(100),
	"school_performance" varchar(50),
	"scout_story" text,
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"status" varchar(20) DEFAULT 'incomplete',
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(100),
	"phone" varchar(20),
	"password_hash" text NOT NULL,
	"role" varchar(20) NOT NULL,
	"governorate" varchar(50),
	"academy_id" uuid,
	"avatar_url" text,
	"bio" text,
	"verified" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academies_name_idx" ON "academies" ("name_ar");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academies_governorate_idx" ON "academies" ("governorate");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academies_type_idx" ON "academies" ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academies_status_idx" ON "academies" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academies_manager_idx" ON "academies" ("manager_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academies_reviewer_idx" ON "academies" ("reviewer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "academies_verified_idx" ON "academies" ("verified");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "coach_notes_player_id_idx" ON "coach_notes" ("player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "coach_notes_coach_id_idx" ON "coach_notes" ("coach_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "coach_notes_note_date_idx" ON "coach_notes" ("note_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "coach_notes_attendance_idx" ON "coach_notes" ("attendance");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "evaluations_player_id_idx" ON "evaluations" ("player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "evaluations_evaluator_id_idx" ON "evaluations" ("evaluator_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "evaluations_event_date_idx" ON "evaluations" ("event_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "evaluations_status_idx" ON "evaluations" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "evaluations_overall_potential_idx" ON "evaluations" ("overall_potential");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "evaluations_weight_idx" ON "evaluations" ("weight");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "evaluations_reviewed_by_idx" ON "evaluations" ("reviewed_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_stats_total_evaluations_idx" ON "player_stats" ("total_evaluations");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_stats_avg_overall_idx" ON "player_stats" ("avg_overall");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_stats_last_evaluation_date_idx" ON "player_stats" ("last_evaluation_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_stats_updated_at_idx" ON "player_stats" ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_videos_player_id_idx" ON "player_videos" ("player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_videos_youtube_id_idx" ON "player_videos" ("youtube_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_videos_uploaded_by_idx" ON "player_videos" ("uploaded_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_videos_created_at_idx" ON "player_videos" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_name_idx" ON "players" ("full_name_ar");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_birth_date_idx" ON "players" ("birth_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_governorate_idx" ON "players" ("governorate");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_academy_idx" ON "players" ("academy_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_primary_position_idx" ON "players" ("primary_position");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_status_idx" ON "players" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_created_by_idx" ON "players" ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "players_dominant_foot_idx" ON "players" ("dominant_foot");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_phone_idx" ON "users" ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_role_idx" ON "users" ("role");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_governorate_idx" ON "users" ("governorate");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_academy_idx" ON "users" ("academy_id");