-- Create accreditations table
CREATE TABLE IF NOT EXISTS accreditations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE accreditations ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for form submissions)
CREATE POLICY "Allow public insert" ON accreditations
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read, update, delete
CREATE POLICY "Allow authenticated read" ON accreditations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON accreditations
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON accreditations
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample approved accreditations
INSERT INTO accreditations (full_name, email, phone, specialization, status, admin_message) VALUES
('د. أحمد محمد العلي', 'ahmed.ali@example.com', '+966501234567', 'التطوير الذاتي والقيادة', 'approved', 'تم قبول طلبكم بناءً على خبرتكم المتميزة في مجال التطوير الذاتي'),
('أ. فاطمة سالم النوري', 'fatima.nouri@example.com', '+966507654321', 'إدارة الأعمال والتسويق', 'approved', 'نرحب بانضمامكم لفريق المدربين المعتمدين'),
('د. محمد عبدالله الراشد', 'mohammed.rashid@example.com', '+966509876543', 'التكنولوجيا والذكاء الاصطناعي', 'approved', 'تم الموافقة على طلبكم نظراً لخبرتكم الواسعة في مجال التكنولوجيا');
