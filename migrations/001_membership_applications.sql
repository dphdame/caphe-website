-- Create membership_applications table
CREATE TABLE IF NOT EXISTS membership_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  profile_url TEXT,
  economics_work TEXT,
  degree_attestation BOOLEAN DEFAULT false,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  decided_at TIMESTAMP WITH TIME ZONE,
  decision TEXT DEFAULT 'pending' CHECK (decision IN ('pending', 'approved', 'declined')),
  decided_by TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_applications_email ON membership_applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_decision ON membership_applications(decision);

-- Enable Row Level Security
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (for server-side operations)
CREATE POLICY "Service role has full access" ON membership_applications
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_membership_applications_updated_at ON membership_applications;
CREATE TRIGGER update_membership_applications_updated_at
  BEFORE UPDATE ON membership_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
