-- Create Admin Table and Add Default Admin User
-- Run this in your Supabase SQL Editor

-- Step 1: Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Insert default admin user
-- Password: admin123 (hashed with bcrypt)
INSERT INTO admins (username, password_hash, full_name)
VALUES (
    'admin',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q0OHu',
    'Administrator'
)
ON CONFLICT (username) DO NOTHING;

-- Step 3: Verify the admin was created
SELECT id, username, full_name, created_at FROM admins;
