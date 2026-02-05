-- Fix Admin Table - Drop and Recreate
-- Run this in your Supabase SQL Editor

-- Step 1: Drop the existing admins table if it exists
DROP TABLE IF EXISTS admins CASCADE;

-- Step 2: Create admins table with correct schema
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Insert default admin user
-- Username: admin
-- Password: admin123 (hashed with bcrypt)
INSERT INTO admins (username, password_hash, full_name)
VALUES (
    'admin',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q0OHu',
    'Administrator'
);

-- Step 4: Verify the admin was created
SELECT id, username, full_name, created_at FROM admins;
