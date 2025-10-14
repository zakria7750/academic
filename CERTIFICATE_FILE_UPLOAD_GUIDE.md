# دليل نظام رفع ملفات الشهادات 📁

## نظرة عامة

تم تحديث نظام إدارة الشهادات ليدعم رفع أنواع مختلفة من الملفات (صور ومستندات) إلى **Vercel Blob Storage** مع حفظ روابط الملفات فقط في قاعدة البيانات.

## المميزات الجديدة ✨

### 1. دعم أنواع ملفات متعددة
- **صور**: JPG, JPEG, PNG, GIF, WebP, SVG, BMP
- **مستندات**: PDF, DOC, DOCX, TXT, RTF, ODT

### 2. عرض ذكي للملفات
- **الصور**: تظهر مباشرة مع إمكانية العرض بالحجم الكامل
- **المستندات**: تظهر كأيقونة مع زر تحميل

### 3. التحقق من صحة الملفات
- فحص نوع الملف قبل الرفع
- فحص حجم الملف (أقصى حد 10MB)
- رسائل خطأ واضحة

## الملفات المُحدثة 📝

### 1. `lib/file-utils.ts` (جديد)
```typescript
// دوال مساعدة للتعامل مع الملفات
export function getFileType(fileName: string)
export function isValidFileType(file: File)
export function formatFileSize(bytes: number)
export function getFileTypeLabel(fileName: string)
```

### 2. `app/actions/certificates-actions.ts`
- تحديث دوال `addCertificate()` و `updateCertificate()`
- دعم رفع أنواع مختلفة من الملفات
- استخدام Vercel Blob Storage مع `access: "public"`

### 3. `app/verification/page.tsx`
- دالة `renderFileDisplay()` للعرض الذكي
- دعم عرض الصور والمستندات بطرق مختلفة

### 4. `app/dashboard/certificates/page.tsx`
- واجهة رفع محسنة
- التحقق من صحة الملفات
- عرض معلومات الملف (الاسم والحجم)

## كيفية العمل 🔧

### جزء السيرفر (Server Actions)

```typescript
export async function addCertificate(formData: FormData) {
  // 1. استخراج الملف من FormData
  const certificateImageFile = formData.get("certificateImage") as File
  
  // 2. رفع الملف إلى Vercel Blob Storage
  const blob = await put(fileName, certificateImageFile, {
    access: "public" // جعل الملف متاح للعامة
  })
  
  // 3. حفظ رابط الملف في قاعدة البيانات
  const { error } = await supabase.from("certificates").insert({
    certificate_image: blob.url // حفظ الرابط فقط
  })
}
```

### جزء العميل (Client)

```tsx
// 1. حقل رفع الملف
<input 
  type="file" 
  name="certificateImage"
  accept="image/*,.pdf,.doc,.docx,.txt,.rtf,.odt"
/>

// 2. عرض الملف حسب نوعه
const renderFileDisplay = (fileUrl: string) => {
  const fileType = getFileType(fileUrl)
  
  if (fileType === "image") {
    return <img src={fileUrl} alt="صورة الشهادة" />
  } else {
    return (
      <Button onClick={() => window.open(fileUrl, "_blank")}>
        تحميل الملف
      </Button>
    )
  }
}
```

## استخدام النظام 👨‍💻

### 1. إضافة شهادة جديدة
1. انتقل إلى `/dashboard/certificates`
2. اضغط على "إضافة شهادة جديدة"
3. أدخل رقم الشهادة
4. اختر ملف الشهادة (صورة أو مستند)
5. حدد تاريخ الإصدار
6. اضغط "إضافة الشهادة"

### 2. التحقق من الشهادة
1. انتقل إلى `/verification`
2. أدخل رقم الشهادة
3. اضغط "التحقق من الشهادة"
4. ستظهر الشهادة:
   - **إذا كانت صورة**: تظهر مباشرة مع أزرار العرض والتحميل
   - **إذا كانت مستند**: تظهر أيقونة مع زر التحميل

### 3. تعديل شهادة موجودة
1. في صفحة إدارة الشهادات، اضغط "تعديل"
2. يمكنك تغيير رقم الشهادة أو تاريخ الإصدار
3. يمكنك رفع ملف جديد (اختياري)
4. اضغط "حفظ التغييرات"

## المتطلبات التقنية 🛠️

### متغيرات البيئة
```env
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### التبعيات المطلوبة
```json
{
  "@vercel/blob": "latest",
  "@supabase/supabase-js": "latest",
  "next": "15.2.4"
}
```

### هيكل قاعدة البيانات
```sql
CREATE TABLE certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  certificate_image TEXT, -- رابط الملف في Vercel Blob
  issue_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## الأمان والحدود 🔒

### التحقق من الملفات
- **الأنواع المدعومة**: صور ومستندات فقط
- **الحد الأقصى للحجم**: 10MB
- **التحقق من الامتداد**: يتم فحص امتداد الملف

### الأمان
- **الوصول العام**: الملفات متاحة للعامة عبر رابط مباشر
- **أسماء فريدة**: كل ملف له اسم فريد لتجنب التضارب
- **معالجة الأخطاء**: رسائل واضحة للمستخدم

## استكشاف الأخطاء 🔍

### مشاكل شائعة وحلولها

1. **"نوع الملف غير مدعوم"**
   - تأكد من أن الملف من الأنواع المدعومة
   - تحقق من امتداد الملف

2. **"حجم الملف كبير جداً"**
   - قم بضغط الملف أو اختر ملف أصغر
   - الحد الأقصى 10MB

3. **"لا يمكن تحميل الملف"**
   - تحقق من اتصال الإنترنت
   - تأكد من صحة رابط الملف

4. **خطأ في رفع الملف**
   - تحقق من متغيرات البيئة
   - تأكد من صحة `BLOB_READ_WRITE_TOKEN`

## الخلاصة 📋

النظام الآن يدعم:
- ✅ رفع أنواع مختلفة من الملفات
- ✅ حفظ الروابط فقط في قاعدة البيانات
- ✅ عرض ذكي حسب نوع الملف
- ✅ التحقق من صحة الملفات
- ✅ واجهة مستخدم محسنة
- ✅ معالجة شاملة للأخطاء

النظام جاهز للاستخدام في الإنتاج! 🚀