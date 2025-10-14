-- =============================================================================
-- اسكربت شامل لتوسيع نظام الشهادات لدعم الملفات والصور
-- Complete Script for Extending Certificates System to Support Files and Images
-- =============================================================================

-- بدء المعاملة لضمان تطبيق جميع التعديلات أو عدم تطبيق أي منها
BEGIN;

-- =============================================================================
-- 1. إضافة الأعمدة الجديدة
-- Adding New Columns
-- =============================================================================

-- إضافة أعمدة جديدة لدعم الملفات
ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS certificate_file TEXT,
ADD COLUMN IF NOT EXISTS content_type VARCHAR(50) DEFAULT 'image',
ADD COLUMN IF NOT EXISTS file_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS file_size INTEGER;

-- =============================================================================
-- 2. إضافة التعليقات على الأعمدة
-- Adding Column Comments
-- =============================================================================

COMMENT ON COLUMN certificates.certificate_file IS 'URL للملف (PDF/DOCX) إذا كان نوع المحتوى ملف';
COMMENT ON COLUMN certificates.content_type IS 'نوع المحتوى: image أو file';
COMMENT ON COLUMN certificates.file_name IS 'اسم الملف الأصلي';
COMMENT ON COLUMN certificates.file_size IS 'حجم الملف بالبايت';

-- =============================================================================
-- 3. تعديل الأعمدة الموجودة
-- Modifying Existing Columns
-- =============================================================================

-- تحديث العمود الموجود ليكون اختياري (للملفات التي لا تحتوي على صورة)
ALTER TABLE certificates 
ALTER COLUMN certificate_image DROP NOT NULL;

-- =============================================================================
-- 4. إضافة قيود الأمان والتحقق
-- Adding Security and Validation Constraints
-- =============================================================================

-- إضافة قيد للتأكد من وجود محتوى (صورة أو ملف)
ALTER TABLE certificates 
ADD CONSTRAINT check_content_exists 
CHECK (
    (content_type = 'image' AND certificate_image IS NOT NULL) OR 
    (content_type = 'file' AND certificate_file IS NOT NULL)
);

-- إضافة قيد لنوع المحتوى
ALTER TABLE certificates 
ADD CONSTRAINT check_content_type 
CHECK (content_type IN ('image', 'file'));

-- =============================================================================
-- 5. تحديث البيانات الموجودة
-- Updating Existing Data
-- =============================================================================

-- تحديث البيانات الموجودة لتعيين نوع المحتوى كصورة
UPDATE certificates 
SET content_type = 'image' 
WHERE content_type IS NULL AND certificate_image IS NOT NULL;

-- تحديث البيانات التي لا تحتوي على صورة (إن وجدت)
UPDATE certificates 
SET content_type = 'image' 
WHERE content_type IS NULL AND certificate_image IS NULL;

-- =============================================================================
-- 6. إنشاء الفهارس لتحسين الأداء
-- Creating Indexes for Performance
-- =============================================================================

-- إنشاء فهرس لنوع المحتوى لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_certificates_content_type ON certificates(content_type);

-- إنشاء فهرس مركب لتحسين البحث
CREATE INDEX IF NOT EXISTS idx_certificates_content_search ON certificates(content_type, certificate_number);

-- =============================================================================
-- 7. إنشاء دالة للتحقق من صحة البيانات (اختياري)
-- Creating Validation Function (Optional)
-- =============================================================================

-- إنشاء دالة للتحقق من صحة نوع الملف
CREATE OR REPLACE FUNCTION validate_certificate_content()
RETURNS TRIGGER AS $$
BEGIN
    -- التحقق من وجود محتوى
    IF NEW.content_type = 'image' AND NEW.certificate_image IS NULL THEN
        RAISE EXCEPTION 'يجب توفير صورة الشهادة عند اختيار نوع المحتوى "صورة"';
    END IF;
    
    IF NEW.content_type = 'file' AND NEW.certificate_file IS NULL THEN
        RAISE EXCEPTION 'يجب توفير ملف الشهادة عند اختيار نوع المحتوى "ملف"';
    END IF;
    
    -- التحقق من صحة حجم الملف
    IF NEW.file_size IS NOT NULL AND NEW.file_size < 0 THEN
        RAISE EXCEPTION 'حجم الملف يجب أن يكون أكبر من صفر';
    END IF;
    
    -- التحقق من طول اسم الملف
    IF NEW.file_name IS NOT NULL AND LENGTH(NEW.file_name) > 255 THEN
        RAISE EXCEPTION 'اسم الملف طويل جداً (الحد الأقصى 255 حرف)';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- 8. إنشاء المحفزات (Triggers)
-- Creating Triggers
-- =============================================================================

-- إنشاء محفز للتحقق من البيانات عند الإدراج
DROP TRIGGER IF EXISTS validate_certificate_content_insert ON certificates;
CREATE TRIGGER validate_certificate_content_insert
    BEFORE INSERT ON certificates
    FOR EACH ROW
    EXECUTE FUNCTION validate_certificate_content();

-- إنشاء محفز للتحقق من البيانات عند التحديث
DROP TRIGGER IF EXISTS validate_certificate_content_update ON certificates;
CREATE TRIGGER validate_certificate_content_update
    BEFORE UPDATE ON certificates
    FOR EACH ROW
    EXECUTE FUNCTION validate_certificate_content();

-- =============================================================================
-- 9. إنشاء عرض (View) لإحصائيات الشهادات
-- Creating Statistics View
-- =============================================================================

-- إنشاء عرض للإحصائيات
CREATE OR REPLACE VIEW certificates_statistics AS
SELECT 
    COUNT(*) as total_certificates,
    COUNT(CASE WHEN content_type = 'image' THEN 1 END) as image_certificates,
    COUNT(CASE WHEN content_type = 'file' THEN 1 END) as file_certificates,
    AVG(CASE WHEN content_type = 'file' THEN file_size END) as avg_file_size,
    MAX(CASE WHEN content_type = 'file' THEN file_size END) as max_file_size,
    MIN(CASE WHEN content_type = 'file' THEN file_size END) as min_file_size,
    COUNT(CASE WHEN EXTRACT(YEAR FROM issue_date) = EXTRACT(YEAR FROM CURRENT_DATE) THEN 1 END) as current_year_certificates
FROM certificates;

-- =============================================================================
-- 10. إنشاء دالة للبحث المتقدم
-- Creating Advanced Search Function
-- =============================================================================

-- دالة للبحث في الشهادات بناءً على المعايير المختلفة
CREATE OR REPLACE FUNCTION search_certificates(
    search_number VARCHAR DEFAULT NULL,
    search_content_type VARCHAR DEFAULT NULL,
    search_year INTEGER DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    certificate_number VARCHAR,
    content_type VARCHAR,
    file_name VARCHAR,
    file_size INTEGER,
    issue_date DATE,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.certificate_number,
        c.content_type,
        c.file_name,
        c.file_size,
        c.issue_date,
        c.created_at
    FROM certificates c
    WHERE 
        (search_number IS NULL OR c.certificate_number ILIKE '%' || search_number || '%')
        AND (search_content_type IS NULL OR c.content_type = search_content_type)
        AND (search_year IS NULL OR EXTRACT(YEAR FROM c.issue_date) = search_year)
    ORDER BY c.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- 11. إنشاء سياسات الأمان (Row Level Security)
-- Creating Security Policies
-- =============================================================================

-- تفعيل Row Level Security إذا لم يكن مفعلاً
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة العامة (للتحقق من الشهادات)
DROP POLICY IF EXISTS "Allow public read access for certificates" ON certificates;
CREATE POLICY "Allow public read access for certificates" ON certificates
    FOR SELECT USING (true);

-- سياسة للإدارة الكاملة (يمكن تخصيصها حسب نظام المصادقة)
DROP POLICY IF EXISTS "Allow admin full access for certificates" ON certificates;
CREATE POLICY "Allow admin full access for certificates" ON certificates
    FOR ALL USING (true);

-- =============================================================================
-- 12. إدراج بيانات تجريبية (اختياري)
-- Inserting Sample Data (Optional)
-- =============================================================================

-- إدراج شهادة تجريبية بصورة
INSERT INTO certificates (
    certificate_number, 
    certificate_image, 
    content_type, 
    file_name, 
    file_size, 
    issue_date
) VALUES (
    'IMG-TEST-001', 
    'https://example.com/sample-certificate.jpg', 
    'image', 
    'sample-certificate.jpg', 
    245760, 
    CURRENT_DATE
) ON CONFLICT (certificate_number) DO NOTHING;

-- إدراج شهادة تجريبية بملف PDF
INSERT INTO certificates (
    certificate_number, 
    certificate_file, 
    content_type, 
    file_name, 
    file_size, 
    issue_date
) VALUES (
    'PDF-TEST-001', 
    'https://example.com/sample-certificate.pdf', 
    'file', 
    'sample-certificate.pdf', 
    1048576, 
    CURRENT_DATE
) ON CONFLICT (certificate_number) DO NOTHING;

-- =============================================================================
-- 13. التحقق من نجاح التحديثات
-- Verifying Successful Updates
-- =============================================================================

-- عرض هيكل الجدول المحدث
DO $$
BEGIN
    RAISE NOTICE 'تم تحديث جدول الشهادات بنجاح!';
    RAISE NOTICE 'الأعمدة الجديدة: certificate_file, content_type, file_name, file_size';
    RAISE NOTICE 'تم إنشاء الفهارس والقيود والمحفزات بنجاح';
END $$;

-- عرض إحصائيات سريعة
SELECT 
    'إجمالي الشهادات' as النوع,
    COUNT(*) as العدد
FROM certificates
UNION ALL
SELECT 
    'شهادات بصور' as النوع,
    COUNT(*) as العدد
FROM certificates 
WHERE content_type = 'image'
UNION ALL
SELECT 
    'شهادات بملفات' as النوع,
    COUNT(*) as العدد
FROM certificates 
WHERE content_type = 'file';

-- =============================================================================
-- إنهاء المعاملة
-- Commit Transaction
-- =============================================================================

COMMIT;

-- =============================================================================
-- رسالة النجاح النهائية
-- Final Success Message
-- =============================================================================

SELECT 'تم تطبيق جميع التحديثات على قاعدة البيانات بنجاح! ✅' as الحالة;