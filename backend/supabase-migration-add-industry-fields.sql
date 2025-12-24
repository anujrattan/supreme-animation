-- Migration: Add Industry-Specific Contact Form Fields Support
-- Description: Adds industry_data JSONB column and client_id column to leads table
-- Date: 2024

-- Add industry_data JSONB column for flexible industry-specific form fields
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS industry_data JSONB DEFAULT '{}'::jsonb;

-- Add client_id column to identify which industry/client the lead belongs to
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS client_id TEXT;

-- Add GIN index on industry_data for efficient JSONB queries
CREATE INDEX IF NOT EXISTS idx_leads_industry_data 
ON leads USING GIN (industry_data);

-- Add index on client_id for filtering by industry/client
CREATE INDEX IF NOT EXISTS idx_leads_client_id 
ON leads(client_id);

-- Optional: Add comment to document the column
COMMENT ON COLUMN leads.industry_data IS 'Stores industry-specific contact form fields as JSON. Structure varies by client_id.';
COMMENT ON COLUMN leads.client_id IS 'Identifies which industry/client this lead belongs to (e.g., "supreme-animation", "real-estate-client-1", "signage-client-1")';

-- Example queries for reference:
-- 
-- Real Estate leads:
-- SELECT * FROM leads 
-- WHERE client_id = 'real-estate-client-1'
--   AND industry_data->>'property_type' = 'Residential';
--
-- Animation Studio leads:
-- SELECT * FROM leads 
-- WHERE client_id = 'supreme-animation'
--   AND industry_data->>'project_type' = '3D Animation';
--
-- Signage Company leads:
-- SELECT * FROM leads 
-- WHERE client_id = 'signage-client-1'
--   AND industry_data->>'sign_type' = 'Outdoor';

