-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('masters', 'doctorate', 'diploma')),
  duration VARCHAR(100),
  hours INTEGER NOT NULL,
  education_system VARCHAR(100),
  fees DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON programs
  FOR SELECT USING (true);

-- Allow authenticated users to insert, update, delete
CREATE POLICY "Allow authenticated insert" ON programs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON programs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON programs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO programs (name, type, duration, hours, education_system, fees, image_url) VALUES
-- Masters Programs
('ماجستير الإرشاد التربوي والنفسي', 'masters', 'سنتان', 60, 'تعليم مدمج', 15000.00, '/placeholder.svg?height=300&width=300&text=ماجستير+الإرشاد'),
('ماجستير إدارة الأعمال MBA', 'masters', 'سنتان', 54, 'تعليم إلكتروني', 18000.00, '/placeholder.svg?height=300&width=300&text=ماجستير+إدارة+الأعمال'),
('ماجستير التربية الخاصة', 'masters', 'سنتان', 58, 'تعليم حضوري', 16000.00, '/placeholder.svg?height=300&width=300&text=ماجستير+التربية+الخاصة'),
('ماجستير تكنولوجيا التعليم', 'masters', 'سنة ونصف', 48, 'تعليم مدمج', 14000.00, '/placeholder.svg?height=300&width=300&text=ماجستير+تكنولوجيا+التعليم'),

-- Doctorate Programs
('دكتوراه علم النفس التربوي', 'doctorate', 'ثلاث سنوات', 90, 'تعليم مدمج', 25000.00, '/placeholder.svg?height=300&width=300&text=دكتوراه+علم+النفس'),
('دكتوراه إدارة الأعمال DBA', 'doctorate', 'ثلاث سنوات', 84, 'تعليم إلكتروني', 28000.00, '/placeholder.svg?height=300&width=300&text=دكتوراه+إدارة+الأعمال'),
('دكتوراه التربية والتعليم', 'doctorate', 'أربع سنوات', 96, 'تعليم حضوري', 26000.00, '/placeholder.svg?height=300&width=300&text=دكتوراه+التربية'),

-- Diploma Programs
('دبلوم المهارات الذاتية والتطوير الشخصي', 'diploma', NULL, 30, NULL, 3000.00, '/placeholder.svg?height=300&width=300&text=دبلوم+المهارات+الذاتية'),
('دبلوم التغذية العلاجية', 'diploma', NULL, 40, NULL, 3500.00, '/placeholder.svg?height=300&width=300&text=دبلوم+التغذية'),
('دبلوم الطب البديل', 'diploma', NULL, 45, NULL, 4000.00, '/placeholder.svg?height=300&width=300&text=دبلوم+الطب+البديل'),
('دبلوم ريادة الأعمال', 'diploma', NULL, 35, NULL, 3200.00, '/placeholder.svg?height=300&width=300&text=دبلوم+ريادة+الأعمال'),
('دبلوم الذكاء الاصطناعي', 'diploma', NULL, 50, NULL, 4500.00, '/placeholder.svg?height=300&width=300&text=دبلوم+الذكاء+الاصطناعي');
