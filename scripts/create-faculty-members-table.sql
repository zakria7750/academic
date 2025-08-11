-- Create faculty_members table
CREATE TABLE IF NOT EXISTS faculty_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  biography TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE faculty_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON faculty_members
  FOR SELECT USING (true);

-- Allow authenticated users to insert, update, delete
CREATE POLICY "Allow authenticated insert" ON faculty_members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON faculty_members
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON faculty_members
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO faculty_members (name, specialization, biography, image_url) VALUES
('د. أحمد محمد السالم', 'علوم الحاسوب والذكاء الاصطناعي', 'أستاذ في علوم الحاسوب بخبرة تزيد عن 20 عاماً في مجال الذكاء الاصطناعي وتعلم الآلة. حاصل على دكتوراه من معهد ماساتشوستس للتكنولوجيا، وله أكثر من 50 بحثاً منشوراً في مجلات علمية محكمة. يقود عدة مشاريع بحثية في مجال الذكاء الاصطناعي التطبيقي.', '/placeholder.svg?height=300&width=300&text=د.+أحمد+السالم'),
('د. فاطمة علي الزهراني', 'إدارة الأعمال والتسويق الرقمي', 'أستاذة مشاركة في إدارة الأعمال متخصصة في التسويق الرقمي والتجارة الإلكترونية. حاصلة على دكتوراه من جامعة هارفارد للأعمال، ولها خبرة 15 عاماً في الاستشارات الإدارية. تدرّس مقررات ريادة الأعمال والابتكار في الأعمال.', '/placeholder.svg?height=300&width=300&text=د.+فاطمة+الزهراني'),
('د. محمد عبدالله القحطاني', 'الهندسة المعمارية والتصميم الحضري', 'أستاذ في الهندسة المعمارية والتخطيط الحضري، خبير في التصميم المستدام والعمارة الذكية. حاصل على دكتوراه من جامعة كامبريدج، وله مشاريع معمارية مميزة في عدة دول. يركز في أبحاثه على العمارة البيئية والمدن الذكية.', '/placeholder.svg?height=300&width=300&text=د.+محمد+القحطاني'),
('د. سارة أحمد المطيري', 'علم النفس التربوي والإرشاد الأكاديمي', 'أستاذة في علم النفس التربوي متخصصة في صعوبات التعلم والإرشاد الأكاديمي. حاصلة على دكتوراه من جامعة أكسفورد، ولها خبرة 18 عاماً في مجال التعليم والإرشاد النفسي. تطور برامج دعم الطلاب وتحسين البيئة التعليمية.', '/placeholder.svg?height=300&width=300&text=د.+سارة+المطيري'),
('د. خالد يوسف الشمري', 'الطب والعلوم الصحية', 'أستاذ في كلية الطب متخصص في الطب الباطني وأمراض القلب. حاصل على دكتوراه في الطب من جامعة جونز هوبكنز، وله خبرة 25 عاماً في الممارسة الطبية والتدريس. يشرف على برامج التدريب الطبي ويقود أبحاث أمراض القلب.', '/placeholder.svg?height=300&width=300&text=د.+خالد+الشمري'),
('د. نورا سعد العتيبي', 'اللغة العربية والأدب الحديث', 'أستاذة في اللغة العربية وآدابها متخصصة في الأدب الحديث والمعاصر. حاصلة على دكتوراه من جامعة السوربون، ولها مؤلفات عديدة في النقد الأدبي. تدرّس مقررات الأدب العربي والنقد الأدبي الحديث.', '/placeholder.svg?height=300&width=300&text=د.+نورا+العتيبي');
