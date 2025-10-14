-- Migration script to update the certificates table
-- This script adds the necessary columns to support file storage in the database

-- Add new columns to the certificates table
ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS file_type VARCHAR(255),
ADD COLUMN IF NOT EXISTS file_name VARCHAR(255);

-- Update the certificate_image column to store bytea data
-- Note: If the column already exists as text/varchar, you might need to:
-- 1. Create a backup of existing data
-- 2. Drop the old column
-- 3. Create new column with bytea type
-- 4. Restore data if needed

-- For new installations, create the table with the correct structure:
/*
CREATE TABLE IF NOT EXISTS certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    certificate_number VARCHAR(255) UNIQUE NOT NULL,
    certificate_image BYTEA,
    file_type VARCHAR(255),
    file_name VARCHAR(255),
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

-- Create an index on certificate_number for faster searches
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_number 
ON certificates(certificate_number);

-- Create an index on issue_date for date-based queries
CREATE INDEX IF NOT EXISTS idx_certificates_issue_date 
ON certificates(issue_date);

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
CREATE TRIGGER update_certificates_updated_at
    BEFORE UPDATE ON certificates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();