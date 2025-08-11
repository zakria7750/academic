-- إنشاء جدول الخريجين
CREATE TABLE IF NOT EXISTS graduates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  current_position VARCHAR(255) NOT NULL,
  success_story TEXT NOT NULL,
  country VARCHAR(100) NOT NULL,
  graduation_year INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول طلبات التقديم للخريجين
CREATE TABLE IF NOT EXISTS graduate_applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  current_position VARCHAR(255) NOT NULL,
  success_story TEXT NOT NULL,
  country VARCHAR(100) NOT NULL,
  graduation_year INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  admin_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج بيانات تجريبية للخريجين
INSERT INTO graduates (name, specialization, current_position, success_story, country, graduation_year) VALUES
('د. أحمد محمد علي', 'إدارة الأعمال', 'مدير عام شركة التقنية المتقدمة', 'بعد تخرجي من الأكاديمية، تمكنت من تطوير مهاراتي الإدارية والقيادية، مما ساعدني في الحصول على منصب مدير عام في إحدى الشركات الرائدة في مجال التقنية. الأكاديمية زودتني بالأسس العلمية والعملية التي أحتاجها في مسيرتي المهنية.', 'السعودية', 2020),
('د. فاطمة أحمد', 'التسويق الرقمي', 'مؤسسة وكالة تسويق رقمي', 'الأكاديمية فتحت لي آفاقاً جديدة في عالم التسويق الرقمي. تعلمت أحدث الاستراتيجيات والتقنيات، وبعد التخرج أسست وكالتي الخاصة التي تخدم أكثر من 50 عميل في المنطقة. المناهج العملية والمشاريع التطبيقية كانت مفتاح نجاحي.', 'الإمارات', 2019),
('م. خالد السعيد', 'إدارة المشاريع', 'مدير مشاريع أول في شركة البناء الحديث', 'دراستي في الأكاديمية غيرت مسار حياتي المهنية بالكامل. انتقلت من موظف عادي إلى مدير مشاريع أول، وأدير الآن مشاريع بقيمة تزيد عن 100 مليون ريال. الشهادة المعتمدة والمهارات المكتسبة فتحت لي أبواب الترقي.', 'قطر', 2021),
('د. مريم الزهراني', 'الموارد البشرية', 'مديرة الموارد البشرية في مجموعة الأعمال الدولية', 'الأكاديمية علمتني كيف أكون قائدة فعالة في مجال الموارد البشرية. المناهج المتطورة والأساتذة المتميزون ساعدوني في تطوير رؤية استراتيجية للموارد البشرية، وأصبحت الآن مسؤولة عن أكثر من 500 موظف.', 'الكويت', 2018);
