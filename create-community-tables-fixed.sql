-- Create community tables for El-Harifa project
-- This file creates all community-related tables directly

-- Create ENUM types first (without IF NOT EXISTS for PostgreSQL)
DO $$
BEGIN
    -- Drop types if they exist
    DROP TYPE IF EXISTS report_reason CASCADE;
    DROP TYPE IF EXISTS report_status CASCADE;
    DROP TYPE IF EXISTS badge_type CASCADE;
    DROP TYPE IF EXISTS reputation_level CASCADE;
    DROP TYPE IF EXISTS notification_type CASCADE;
    DROP TYPE IF EXISTS notification_priority CASCADE;
    DROP TYPE IF EXISTS contribution_type CASCADE;
    DROP TYPE IF EXISTS verification_status CASCADE;
    
    -- Create new types
    CREATE TYPE report_reason AS ENUM (
      'fake_info',
      'bias', 
      'inappropriate',
      'spam',
      'harassment',
      'duplicate',
      'inaccurate',
      'other'
    );

    CREATE TYPE report_status AS ENUM (
      'pending',
      'under_review', 
      'resolved',
      'dismissed',
      'escalated'
    );

    CREATE TYPE badge_type AS ENUM (
      'trusted_scout',
      'expert_evaluator',
      'community_leader',
      'verified_academy',
      'top_contributor',
      'helpful_member',
      'quality_reviewer',
      'mentor',
      'pioneer',
      'ambassador'
    );

    CREATE TYPE reputation_level AS ENUM (
      'newcomer',
      'member',
      'trusted',
      'expert',
      'leader',
      'legend'
    );

    CREATE TYPE notification_type AS ENUM (
      'evaluation_received',
      'player_discovered',
      'report_filed',
      'verification_approved',
      'badge_earned',
      'dispute_resolved',
      'community_update',
      'player_added',
      'evaluation_approved',
      'report_resolved',
      'new_follower',
      'mention',
      'system_announcement',
      'deadline_reminder',
      'achievement_unlocked'
    );

    CREATE TYPE notification_priority AS ENUM (
      'low',
      'medium',
      'high',
      'urgent'
    );

    CREATE TYPE contribution_type AS ENUM (
      'feature',
      'bug_fix',
      'documentation',
      'translation',
      'testing',
      'design',
      'community',
      'research',
      'feedback',
      'moderation'
    );

    CREATE TYPE verification_status AS ENUM (
      'pending',
      'under_review',
      'approved',
      'rejected',
      'requires_info'
    );
END $$;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS community_reports CASCADE;
DROP TABLE IF EXISTS reputation_scores CASCADE;
DROP TABLE IF EXISTS community_badges CASCADE;
DROP TABLE IF EXISTS reputation_history CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS notification_preferences CASCADE;
DROP TABLE IF EXISTS notification_delivery_logs CASCADE;
DROP TABLE IF EXISTS community_contributions CASCADE;
DROP TABLE IF EXISTS verification_requests CASCADE;
DROP TABLE IF EXISTS dispute_resolutions CASCADE;
DROP TABLE IF EXISTS community_activities CASCADE;

-- Create community_reports table
CREATE TABLE community_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL,
  reported_entity VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  reason report_reason NOT NULL,
  description TEXT NOT NULL,
  evidence TEXT[],
  status report_status DEFAULT 'pending',
  moderator_id UUID,
  resolution TEXT,
  actions_taken TEXT,
  priority VARCHAR(10) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Create reputation_scores table
CREATE TABLE reputation_scores (
  user_id UUID PRIMARY KEY,
  total_score INTEGER DEFAULT 0,
  level reputation_level DEFAULT 'newcomer',
  evaluation_quality DECIMAL(3,1) DEFAULT 0.0,
  community_contribution INTEGER DEFAULT 0,
  verification_level DECIMAL(3,1) DEFAULT 0.0,
  dispute_history INTEGER DEFAULT 0,
  tenure_days INTEGER DEFAULT 0,
  total_contributions INTEGER DEFAULT 0,
  helpful_votes INTEGER DEFAULT 0,
  accurate_reports INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create community_badges table
CREATE TABLE community_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge_type badge_type NOT NULL,
  title_ar VARCHAR(100) NOT NULL,
  description_ar TEXT NOT NULL,
  icon_url VARCHAR(255),
  earned_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  reason TEXT,
  reference_id UUID
);

-- Create reputation_history table
CREATE TABLE reputation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  score_change INTEGER NOT NULL,
  reason TEXT NOT NULL,
  reference_id UUID,
  previous_score INTEGER NOT NULL,
  new_score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type notification_type NOT NULL,
  title_ar VARCHAR(200) NOT NULL,
  message_ar TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT false,
  priority notification_priority DEFAULT 'medium',
  reference_id UUID,
  reference_type VARCHAR(50),
  action_url VARCHAR(255),
  dismissible BOOLEAN DEFAULT true,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);

-- Create notification_preferences table
CREATE TABLE notification_preferences (
  user_id UUID PRIMARY KEY,
  email_enabled BOOLEAN DEFAULT true,
  push_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT false,
  in_app_enabled BOOLEAN DEFAULT true,
  preferred_language VARCHAR(10) DEFAULT 'ar',
  quiet_hours_start VARCHAR(5),
  quiet_hours_end VARCHAR(5),
  quiet_hours_min_priority notification_priority DEFAULT 'high',
  type_preferences JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create notification_delivery_logs table
CREATE TABLE notification_delivery_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID NOT NULL,
  channel VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  recipient VARCHAR(255) NOT NULL,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  attempted_at TIMESTAMP DEFAULT NOW(),
  delivered_at TIMESTAMP,
  service_response JSONB
);

-- Create community_contributions table
CREATE TABLE community_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id UUID NOT NULL,
  contribution_type contribution_type NOT NULL,
  title_ar VARCHAR(200) NOT NULL,
  description_ar TEXT NOT NULL,
  external_url VARCHAR(255),
  reference_id UUID,
  reference_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  reviewer_id UUID,
  review_comments TEXT,
  impact_score INTEGER,
  community_votes INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Create verification_requests table
CREATE TABLE verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  verification_type VARCHAR(50) NOT NULL,
  status verification_status DEFAULT 'pending',
  documents JSONB,
  additional_info TEXT,
  reviewer_id UUID,
  review_notes TEXT,
  rejection_reason TEXT,
  verification_level INTEGER,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Create dispute_resolutions table
CREATE TABLE dispute_resolutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  related_entity_id UUID NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  parties JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'open',
  mediator_id UUID,
  description TEXT NOT NULL,
  evidence JSONB,
  resolution TEXT,
  actions_taken JSONB,
  compensation TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Create community_activities table
CREATE TABLE community_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_type VARCHAR(50) NOT NULL,
  description_ar TEXT NOT NULL,
  reference_id UUID,
  reference_type VARCHAR(50),
  metadata JSONB,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_reports_reporter ON community_reports(reporter_id);
CREATE INDEX idx_reports_entity ON community_reports(reported_entity, entity_id);
CREATE INDEX idx_reports_status ON community_reports(status);
CREATE INDEX idx_reports_priority ON community_reports(priority);
CREATE INDEX idx_reports_created_at ON community_reports(created_at);

CREATE INDEX idx_reputation_user ON reputation_scores(user_id);
CREATE INDEX idx_reputation_score ON reputation_scores(total_score);
CREATE INDEX idx_reputation_level ON reputation_scores(level);
CREATE INDEX idx_reputation_quality ON reputation_scores(evaluation_quality);

CREATE INDEX idx_badges_user ON community_badges(user_id);
CREATE INDEX idx_badges_type ON community_badges(badge_type);
CREATE INDEX idx_badges_earned_at ON community_badges(earned_at);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_priority ON notifications(priority);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

CREATE INDEX idx_contributions_contributor ON community_contributions(contributor_id);
CREATE INDEX idx_contributions_type ON community_contributions(contribution_type);
CREATE INDEX idx_contributions_status ON community_contributions(status);
CREATE INDEX idx_contributions_created_at ON community_contributions(created_at);
CREATE INDEX idx_contributions_impact ON community_contributions(impact_score);

CREATE INDEX idx_activities_user ON community_activities(user_id);
CREATE INDEX idx_activities_type ON community_activities(activity_type);
CREATE INDEX idx_activities_public ON community_activities(is_public);
CREATE INDEX idx_activities_created_at ON community_activities(created_at);

-- Add comments for documentation
COMMENT ON TABLE community_reports IS 'نظام الإبلاغ المجتمعي - يسمح للمستخدمين بالإبلاغ عن محتوى مشبوه';
COMMENT ON TABLE reputation_scores IS 'نقاط السمعة والثقة للمستخدمين - يقوم بتتبع سمعة المستخدمين';
COMMENT ON TABLE community_badges IS 'شارات المجتمع - جوائز للمستخدمين المميزين';
COMMENT ON TABLE notifications IS 'نظام الإشعارات المتقدم - إشعارات للمستخدمين';
COMMENT ON TABLE community_contributions IS 'مساهمات المجتمع - تتبع مساهمات المستخدمين';
COMMENT ON TABLE verification_requests IS 'طلبات التحقق - طلبات التحقق من هوية المستخدمين';
COMMENT ON TABLE dispute_resolutions IS 'حل النزاعات - نظام حل الخلافات';
COMMENT ON TABLE community_activities IS 'أنشطة المجتمع - سجل أنشطة المستخدمين';
