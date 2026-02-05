-- Fix Attendance Table Foreign Key Constraint
-- Run this in your Supabase SQL Editor

-- Step 1: Drop the existing attendance table (if it exists)
DROP TABLE IF EXISTS attendance CASCADE;

-- Step 2: Recreate the attendance table with correct foreign key
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT attendance_employee_id_fkey 
        FOREIGN KEY (employee_id) 
        REFERENCES employees(id) 
        ON DELETE CASCADE
);

-- Step 3: Create index for better query performance
CREATE INDEX idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(date);

-- Step 4: Verify the fix by checking the constraint
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name='attendance';
