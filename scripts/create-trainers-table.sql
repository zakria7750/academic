-- Create trainers table
CREATE TABLE IF NOT EXISTS trainers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON trainers
  FOR SELECT USING (true);

-- Allow authenticated users to insert, update, delete
CREATE POLICY "Allow authenticated insert" ON trainers
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON trainers
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON trainers
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO trainers (name, specialization, image_url) VALUES
('د. أحمد محمد العلي', 'التطوير الذاتي والقيادة', '/placeholder.svg?height=300&width=300&text=د.+أحمد+العلي'),
('أ. فاطمة سالم النوري', 'إدارة الأعمال والتسويق', '/placeholder.svg?height=300&width=300&text=أ.+فاطمة+النوري'),
('د. محمد عبدالله الراشد', 'التكنولوجيا والذكاء الاصطناعي', '/placeholder.svg?height=300&width=300&text=د.+محمد+الراشد'),
('أ. سارة أحمد المطيري', 'علم النفس والإرشاد', '/placeholder.svg?height=300&width=300&text=أ.+سارة+المطيري'),
('د. خالد يوسف الشمري', 'الصحة والتغذية العلاجية', '/placeholder.svg?height=300&width=300&text=د.+خالد+الشمري'),
('أ. نورا سعد العتيبي', 'اللغة العربية والأدب', '/placeholder.svg?height=300&width=300&text=أ.+نورا+العتيبي'),
('د. عبدالرحمن محمد القحطاني', 'الهندسة والتكنولوجيا', '/placeholder.svg?height=300&width=300&text=د.+عبدالرحمن+القحطاني'),
('أ. مريم علي الزهراني', 'التربية والتعليم', '/placeholder.svg?height=300&width=300&text=أ.+مريم+الزهراني');
