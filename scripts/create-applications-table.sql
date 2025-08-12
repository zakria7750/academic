-- Create applications table for student registration
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  country VARCHAR(100) NOT NULL,
  current_qualification TEXT NOT NULL,
  desired_program VARCHAR(100) NOT NULL CHECK (desired_program IN ('دبلوم', 'بكالوريوس', 'ماجستير', 'دكتوراه', 'دورة تدريبية')),
  desired_specialization TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create students table for accepted applications
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  application_id INTEGER REFERENCES applications(id),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  country VARCHAR(100) NOT NULL,
  current_qualification TEXT NOT NULL,
  program VARCHAR(100) NOT NULL,
  specialization TEXT NOT NULL,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
