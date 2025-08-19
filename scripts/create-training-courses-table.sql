-- Create training_courses table
CREATE TABLE IF NOT EXISTS training_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  hours INTEGER NOT NULL,
  education_system VARCHAR(100) NOT NULL,
  fees DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE training_courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON training_courses
  FOR SELECT USING (true);

-- Allow authenticated users to insert, update, delete
CREATE POLICY "Allow authenticated insert" ON training_courses
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON training_courses
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON training_courses
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO training_courses (name, duration, hours, education_system, fees, image_url) VALUES
-- Training Courses
('دورة تطوير المهارات القيادية', 'شهر واحد', 20, 'تعليم إلكتروني', 800.00, '/placeholder.svg?height=300&width=300&text=دورة+تطوير+المهارات+القيادية'),
('دورة التسويق الرقمي', 'شهرين', 30, 'تعليم مدمج', 1200.00, '/placeholder.svg?height=300&width=300&text=دورة+التسويق+الرقمي'),
('دورة إدارة المشاريع', 'شهر ونصف', 25, 'تعليم حضوري', 1000.00, '/placeholder.svg?height=300&width=300&text=دورة+إدارة+المشاريع'),
('دورة البرمجة للمبتدئين', 'شهرين', 35, 'تعليم إلكتروني', 1500.00, '/placeholder.svg?height=300&width=300&text=دورة+البرمجة+للمبتدئين'),
('دورة التصميم الجرافيكي', 'شهر واحد', 18, 'تعليم مدمج', 700.00, '/placeholder.svg?height=300&width=300&text=دورة+التصميم+الجرافيكي'),
('دورة إدارة الموارد البشرية', 'شهرين', 28, 'تعليم حضوري', 1100.00, '/placeholder.svg?height=300&width=300&text=دورة+إدارة+الموارد+البشرية'),
('دورة المحاسبة المالية', 'شهر ونصف', 22, 'تعليم إلكتروني', 900.00, '/placeholder.svg?height=300&width=300&text=دورة+المحاسبة+المالية'),
('دورة تطوير تطبيقات الويب', 'شهرين', 40, 'تعليم مدمج', 1800.00, '/placeholder.svg?height=300&width=300&text=دورة+تطوير+تطبيقات+الويب');