-- إنشاء جداول الأقسام الأكاديمية والبرامج
-- Academic Departments and Programs Schema

-- إنشاء جدول الأقسام الأكاديمية
CREATE TABLE IF NOT EXISTS academic_departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول البرامج الأكاديمية
CREATE TABLE IF NOT EXISTS academic_programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    department_id UUID REFERENCES academic_departments(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    hours INTEGER NOT NULL DEFAULT 0,
    fees DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_academic_programs_department_id ON academic_programs(department_id);
CREATE INDEX IF NOT EXISTS idx_academic_departments_created_at ON academic_departments(created_at);
CREATE INDEX IF NOT EXISTS idx_academic_programs_created_at ON academic_programs(created_at);

-- إنشاء trigger لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- تطبيق trigger على الجداول
DROP TRIGGER IF EXISTS update_academic_departments_updated_at ON academic_departments;
CREATE TRIGGER update_academic_departments_updated_at
    BEFORE UPDATE ON academic_departments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_academic_programs_updated_at ON academic_programs;
CREATE TRIGGER update_academic_programs_updated_at
    BEFORE UPDATE ON academic_programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- إدراج بيانات تجريبية للأقسام الأكاديمية
INSERT INTO academic_departments (id, title, description, image_url) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'الأقسام التربوية والنفسية',
    'أقسام متخصصة في التربية وعلم النفس والإرشاد مع برامج حديثة ومبتكرة تواكب أحدث التطورات العالمية',
    '/educational-psychology-dept.png'
),
(
    '22222222-2222-2222-2222-222222222222',
    'الأقسام المهارية والتطويرية',
    'أقسام تركز على تطوير المهارات الشخصية والمهنية بأساليب عملية ومعاصرة',
    '/skills-development-dept.png'
),
(
    '33333333-3333-3333-3333-333333333333',
    'الأقسام الأكاديمية واللغوية',
    'أقسام اللغات والدراسات الإسلامية والبحوث بمنهجية أكاديمية رصينة ومتطورة',
    '/academic-linguistic-dept.png'
),
(
    '44444444-4444-4444-4444-444444444444',
    'الأقسام الإدارية والمجتمعية',
    'أقسام إدارة الأعمال والتنمية المستدامة والذكاء الاصطناعي بخبرات عالمية',
    '/administrative-community-dept.png'
),
(
    '55555555-5555-5555-5555-555555555555',
    'الأقسام الصحية والزراعية',
    'أقسام التغذية العلاجية والطب البديل والزراعة بأحدث المعايير الدولية',
    '/health-agriculture-dept.png'
)
ON CONFLICT (id) DO NOTHING;

-- إدراج بيانات تجريبية للبرامج الأكاديمية
INSERT INTO academic_programs (department_id, name, description, hours, fees, image_url) VALUES
-- برامج الأقسام التربوية والنفسية
('11111111-1111-1111-1111-111111111111', 'ماجستير في علم النفس التربوي', 'برنامج متخصص في دراسة السلوك التعليمي والتطوير النفسي للطلاب', 60, 2500.00, '/psychology-program.png'),
('11111111-1111-1111-1111-111111111111', 'دكتوراه في التربية الخاصة', 'برنامج متقدم لتأهيل المختصين في التعامل مع ذوي الاحتياجات الخاصة', 90, 4000.00, '/special-education-program.png'),
('11111111-1111-1111-1111-111111111111', 'دبلوم في الإرشاد النفسي', 'برنامج تدريبي مكثف لتأهيل المرشدين النفسيين', 40, 1800.00, '/counseling-program.png'),

-- برامج الأقسام المهارية والتطويرية
('22222222-2222-2222-2222-222222222222', 'دبلوم في التطوير الشخصي', 'برنامج شامل لتطوير المهارات الشخصية والقيادية', 45, 2000.00, '/personal-development-program.png'),
('22222222-2222-2222-2222-222222222222', 'ماجستير في إدارة الموارد البشرية', 'برنامج متخصص في إدارة وتطوير الموارد البشرية', 65, 3200.00, '/hr-management-program.png'),
('22222222-2222-2222-2222-222222222222', 'دبلوم في مهارات التواصل', 'برنامج تدريبي لتطوير مهارات التواصل والعرض', 30, 1500.00, '/communication-skills-program.png'),

-- برامج الأقسام الأكاديمية واللغوية
('33333333-3333-3333-3333-333333333333', 'ماجستير في اللغة العربية وآدابها', 'برنامج متخصص في دراسة اللغة العربية والأدب', 70, 2800.00, '/arabic-language-program.png'),
('33333333-3333-3333-3333-333333333333', 'دكتوراه في الدراسات الإسلامية', 'برنامج متقدم في الدراسات الإسلامية والفقه', 100, 4500.00, '/islamic-studies-program.png'),
('33333333-3333-3333-3333-333333333333', 'دبلوم في اللغة الإنجليزية', 'برنامج تدريبي لإتقان اللغة الإنجليزية', 50, 2200.00, '/english-language-program.png'),

-- برامج الأقسام الإدارية والمجتمعية
('44444444-4444-4444-4444-444444444444', 'ماجستير في إدارة الأعمال', 'برنامج شامل في إدارة الأعمال والقيادة', 75, 3500.00, '/business-management-program.png'),
('44444444-4444-4444-4444-444444444444', 'دبلوم في التنمية المستدامة', 'برنامج متخصص في مجال التنمية المستدامة والبيئة', 55, 2400.00, '/sustainable-development-program.png'),
('44444444-4444-4444-4444-444444444444', 'ماجستير في الذكاء الاصطناعي', 'برنامج متقدم في تقنيات الذكاء الاصطناعي والتعلم الآلي', 80, 4200.00, '/ai-program.png'),
('44444444-4444-4444-4444-444444444444', 'دبلوم في ريادة الأعمال', 'برنامج تدريبي لتأهيل رواد الأعمال والمبتكرين', 45, 2100.00, '/entrepreneurship-program.png'),
('44444444-4444-4444-4444-444444444444', 'ماجستير في التسويق الرقمي', 'برنامج متخصص في استراتيجيات التسويق الرقمي الحديثة', 60, 3000.00, '/digital-marketing-program.png'),

-- برامج الأقسام الصحية والزراعية
('55555555-5555-5555-5555-555555555555', 'دبلوم في التغذية العلاجية', 'برنامج متخصص في علم التغذية والعلاج الغذائي', 50, 2300.00, '/nutrition-program.png'),
('55555555-5555-5555-5555-555555555555', 'ماجستير في الطب البديل', 'برنامج متقدم في الطب البديل والعلاج الطبيعي', 70, 3400.00, '/alternative-medicine-program.png'),
('55555555-5555-5555-5555-555555555555', 'دبلوم في الزراعة المستدامة', 'برنامج تدريبي في تقنيات الزراعة المستدامة والحديثة', 40, 1900.00, '/sustainable-agriculture-program.png')
ON CONFLICT DO NOTHING;

-- إنشاء Row Level Security (RLS) للحماية
ALTER TABLE academic_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_programs ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان - السماح بالقراءة للجميع
CREATE POLICY "Allow public read access for academic_departments" ON academic_departments
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access for academic_programs" ON academic_programs
    FOR SELECT USING (true);

-- سياسات الأمان للإدارة (يمكن تخصيصها حسب نظام المصادقة)
CREATE POLICY "Allow admin full access for academic_departments" ON academic_departments
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access for academic_programs" ON academic_programs
    FOR ALL USING (true);