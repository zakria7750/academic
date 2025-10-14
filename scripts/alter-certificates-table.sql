-- تحديث جدول الشهادات لدعم تخزين الملفات كبايتات
-- تغيير نوع العمود من TEXT إلى BYTEA

-- إضافة عمود مؤقت جديد
ALTER TABLE certificates ADD COLUMN certificate_image_new BYTEA;

-- نسخ البيانات الموجودة (إذا كانت موجودة)
-- UPDATE certificates SET certificate_image_new = decode(certificate_image, 'base64') WHERE certificate_image IS NOT NULL;

-- حذف العمود القديم
ALTER TABLE certificates DROP COLUMN certificate_image;

-- إعادة تسمية العمود الجديد
ALTER TABLE certificates RENAME COLUMN certificate_image_new TO certificate_image;

-- إضافة قيد NOT NULL (اختياري - يمكن إزالته إذا كنت تريد السماح بقيم فارغة)
-- ALTER TABLE certificates ALTER COLUMN certificate_image SET NOT NULL;