-- Add social_link column to testimonials table
ALTER TABLE testimonials
ADD COLUMN IF NOT EXISTS social_link text;
