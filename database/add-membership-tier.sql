-- ========================================
-- CAPHE Membership Tier Migration
-- Run this in Supabase SQL Editor
-- ========================================

-- Add membership_tier column to profiles
-- 'affiliate' = Community members (free, can access affiliate labs)
-- 'member' = Professional members (approved economists, full access)
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS membership_tier TEXT
DEFAULT 'affiliate'
CHECK (membership_tier IN ('affiliate', 'member'));

-- Update the trigger to include membership_tier from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, membership_tier)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'membership_tier', 'affiliate')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create index for faster tier-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON profiles(membership_tier);

-- ========================================
-- Verify the changes
-- ========================================
-- Run this to check the column was added:
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'profiles';
