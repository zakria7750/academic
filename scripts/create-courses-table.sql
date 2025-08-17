-- إنشاء جدول الدورات التدريبية
-- Training Courses Table Creation Script

-- إنشاء الجدول
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    duration TEXT,
    hours INTEGER NOT NULL CHECK (hours > 0),
    education_system TEXT,
    fees DECIMAL(10,2) NOT NULL CHECK (fees >= 0),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- إضافة تعليقات للجدول والأعمدة
COMMENT ON TABLE public.courses IS 'جدول الدورات التدريبية في الأكاديمية';
COMMENT ON COLUMN public.courses.id IS 'المعرف الفريد للدورة';
COMMENT ON COLUMN public.courses.name IS 'اسم الدورة التدريبية';
COMMENT ON COLUMN public.courses.duration IS 'مدة الدورة (مثل: 3 أشهر، 6 أسابيع)';
COMMENT ON COLUMN public.courses.hours IS 'عدد ساعات الدورة';
COMMENT ON COLUMN public.courses.education_system IS 'نظام التعليم (عن بُعد، حضوري، مختلط)';
COMMENT ON COLUMN public.courses.fees IS 'رسوم الدورة بالريال السعودي';
COMMENT ON COLUMN public.courses.image_url IS 'رابط صورة الدورة';
COMMENT ON COLUMN public.courses.created_at IS 'تاريخ إنشاء السجل';
COMMENT ON COLUMN public.courses.updated_at IS 'تاريخ آخر تحديث للسجل';

-- إنشاء فهرس على اسم الدورة للبحث السريع
CREATE INDEX IF NOT EXISTS idx_courses_name ON public.courses(name);

-- إنشاء فهرس على الرسوم للفلترة
CREATE INDEX IF NOT EXISTS idx_courses_fees ON public.courses(fees);

-- إنشاء فهرس على تاريخ الإنشاء للترتيب
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON public.courses(created_at);

-- إنشاء trigger لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_courses_updated_at 
    BEFORE UPDATE ON public.courses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- تمكين Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة - يمكن لأي شخص قراءة الدورات
CREATE POLICY "Anyone can view courses" ON public.courses
    FOR SELECT USING (true);

-- سياسة للإدراج والتعديل والحذف - للمصادقين فقط (يمكن تخصيصها حسب الحاجة)
CREATE POLICY "Authenticated users can manage courses" ON public.courses
    FOR ALL USING (auth.role() = 'authenticated');

-- إدراج بيانات تجريبية (اختيارية)
INSERT INTO public.courses (name, duration, hours, education_system, fees, image_url) 
VALUES 
    ('دورة إدارة المشاريع الاحترافية', '3 أشهر', 120, 'عن بُعد', 2500.00, null),
    ('دورة التسويق الرقمي المتقدم', '6 أسابيع', 80, 'مختلط', 1800.00, null),
    ('دورة تطوير المواقع الإلكترونية', '4 أشهر', 160, 'حضوري', 3200.00, null),
    ('دورة المحاسبة المالية', '2 أشهر', 60, 'عن بُعد', 1500.00, null),
    ('دورة إدارة الموارد البشرية', '10 أسابيع', 100, 'مختلط', 2200.00, null)
ON CONFLICT (id) DO NOTHING;

-- عرض معلومات الجدول المُنشأ
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'courses' AND table_schema = 'public'
ORDER BY ordinal_position;

-- عرض الفهارس المُنشأة
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'courses' AND schemaname = 'public';

COMMENT ON SCRIPT IS 'سكريبت إنشاء جدول الدورات التدريبية مع جميع الإعدادات المطلوبة';