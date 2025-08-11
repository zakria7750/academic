-- Create board_members table
CREATE TABLE IF NOT EXISTS board_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  experience TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE board_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON board_members
  FOR SELECT USING (true);

-- Allow authenticated users to insert, update, delete
CREATE POLICY "Allow authenticated insert" ON board_members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON board_members
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON board_members
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO board_members (name, position, experience, image_url) VALUES
('د. محمد أحمد الخالدي', 'رئيس مجلس الإدارة', 'أستاذ في إدارة الأعمال بجامعة الملك سعود، خبرة تزيد عن 25 عاماً في القيادة الأكاديمية والإدارية. حاصل على دكتوراه في إدارة الأعمال من جامعة هارفارد، وله العديد من المؤلفات في مجال التعليم العالي.', '/placeholder.svg?height=300&width=300&text=د.+محمد+الخالدي'),
('د. فاطمة سالم النوري', 'نائب رئيس مجلس الإدارة', 'خبيرة في التعليم الإلكتروني والتكنولوجيا التعليمية، حاصلة على دكتوراه في تقنيات التعليم من جامعة ستانفورد. شغلت مناصب قيادية في عدة جامعات دولية وتتمتع بخبرة 20 عاماً في تطوير البرامج الأكاديمية.', '/placeholder.svg?height=300&width=300&text=د.+فاطمة+النوري'),
('أ. عبدالله محمد الراشد', 'عضو مجلس الإدارة', 'رجل أعمال ومستثمر في قطاع التعليم، رئيس تنفيذي لعدة شركات تقنية. حاصل على ماجستير في إدارة الأعمال من كلية لندن للأعمال، وله اهتمام كبير بدعم التعليم والابتكار في المنطقة.', '/placeholder.svg?height=300&width=300&text=أ.+عبدالله+الراشد'),
('د. سارة أحمد المطيري', 'عضو مجلس الإدارة', 'أستاذة في علم النفس التربوي، متخصصة في تطوير المناهج وطرق التدريس الحديثة. حاصلة على دكتوراه من جامعة أكسفورد، ولها خبرة 18 عاماً في البحث الأكاديمي والتطوير التعليمي.', '/placeholder.svg?height=300&width=300&text=د.+سارة+المطيري');
