-- توسيع جدول الشهادات لدعم الملفات والصور
-- Extend certificates table to support files and images

-- إضافة أعمدة جديدة لدعم الملفات
ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS certificate_file TEXT,
ADD COLUMN IF NOT EXISTS content_type VARCHAR(50) DEFAULT 'image',
ADD COLUMN IF NOT EXISTS file_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS file_size INTEGER;

-- إضافة تعليق على الأعمدة الجديدة
COMMENT ON COLUMN certificates.certificate_file IS 'URL للملف (PDF/DOCX) إذا كان نوع المحتوى ملف';
COMMENT ON COLUMN certificates.content_type IS 'نوع المحتوى: image أو file';
COMMENT ON COLUMN certificates.file_name IS 'اسم الملف الأصلي';
COMMENT ON COLUMN certificates.file_size IS 'حجم الملف بالبايت';

-- تحديث العمود الموجود ليكون اختياري (للملفات التي لا تحتوي على صورة)
ALTER TABLE certificates 
ALTER COLUMN certificate_image DROP NOT NULL;

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

-- تحديث البيانات الموجودة لتعيين نوع المحتوى كصورة
UPDATE certificates 
SET content_type = 'image' 
WHERE content_type IS NULL AND certificate_image IS NOT NULL;

-- إنشاء فهرس لنوع المحتوى لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_certificates_content_type ON certificates(content_type);