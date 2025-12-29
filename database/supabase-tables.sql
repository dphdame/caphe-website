-- ========================================
-- CAPHE Member Portal Database Schema
-- Run this in Supabase SQL Editor
-- ========================================

-- Enable UUID extension (should already be enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. Profiles Table (extends auth.users)
-- ========================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  organization TEXT,
  county TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- ========================================
-- 2. Recordings Table
-- ========================================
CREATE TABLE IF NOT EXISTS recordings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  date DATE,
  category TEXT DEFAULT 'webinar' CHECK (category IN ('webinar', 'workshop', 'peer-review')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 3. Peer Review Requests Table
-- ========================================
CREATE TABLE IF NOT EXISTS peer_review_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  meeting_date DATE NOT NULL,
  slots_requested INT DEFAULT 1 CHECK (slots_requested BETWEEN 1 AND 2),
  topic TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries by user and status
CREATE INDEX IF NOT EXISTS idx_peer_reviews_user ON peer_review_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_peer_reviews_status ON peer_review_requests(status);
CREATE INDEX IF NOT EXISTS idx_peer_reviews_date ON peer_review_requests(meeting_date);

-- ========================================
-- 4. Documents Table (for feedback)
-- ========================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  document_url TEXT NOT NULL,
  feedback_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 5. Document Feedback Table
-- ========================================
CREATE TABLE IF NOT EXISTS document_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_feedback_document ON document_feedback(document_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user ON document_feedback(user_id);

-- ========================================
-- Row Level Security (RLS) Policies
-- ========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE peer_review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_feedback ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles, update only their own
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Recordings: All authenticated users can read
CREATE POLICY "Recordings are viewable by authenticated users"
  ON recordings FOR SELECT
  TO authenticated
  USING (true);

-- Admins can insert/update/delete recordings
CREATE POLICY "Admins can manage recordings"
  ON recordings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Peer Review Requests: Users can see and create their own
CREATE POLICY "Users can view own peer review requests"
  ON peer_review_requests FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create peer review requests"
  ON peer_review_requests FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own pending requests"
  ON peer_review_requests FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND status = 'pending');

-- Admins can see all peer review requests
CREATE POLICY "Admins can view all peer review requests"
  ON peer_review_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update any peer review request"
  ON peer_review_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Documents: All authenticated users can read
CREATE POLICY "Documents are viewable by authenticated users"
  ON documents FOR SELECT
  TO authenticated
  USING (true);

-- Admins can manage documents
CREATE POLICY "Admins can manage documents"
  ON documents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Document Feedback: Users can read all feedback, create their own
CREATE POLICY "Feedback is viewable by authenticated users"
  ON document_feedback FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create feedback"
  ON document_feedback FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- ========================================
-- Sample Data (Optional - for testing)
-- ========================================

-- Uncomment to add sample data:

-- INSERT INTO recordings (title, description, video_url, date, category)
-- VALUES
--   ('Introduction to Health Economics', 'An overview of health economics concepts for public health professionals.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2025-02-12', 'webinar'),
--   ('Cost-Effectiveness Analysis Basics', 'Learn the fundamentals of conducting CEA studies.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2025-04-09', 'webinar');

-- INSERT INTO documents (title, description, document_url)
-- VALUES
--   ('CEA Methods Framework', 'Draft framework for standardized cost-effectiveness analysis methods.', 'https://docs.google.com/document/d/example'),
--   ('Health Economics Glossary', 'Common terms and definitions in health economics.', 'https://docs.google.com/document/d/example2');

-- ========================================
-- Make yourself an admin (run after signing up)
-- Replace YOUR_EMAIL with your email address
-- ========================================

-- UPDATE profiles
-- SET role = 'admin'
-- WHERE id = (
--   SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL@example.com'
-- );
