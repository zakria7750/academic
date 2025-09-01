# سكريبت قاعدة البيانات للأقسام الأكاديمية

## تعليمات التشغيل

### 1. تشغيل سكريبت إنشاء الجداول
قم بتشغيل الملف `departments_schema.sql` في قاعدة بيانات Supabase الخاصة بك:

```sql
-- نسخ محتوى ملف departments_schema.sql وتنفيذه في SQL Editor في Supabase
```

### 2. إعداد متغيرات البيئة
تأكد من إعداد متغيرات البيئة التالية في ملف `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. الجداول المنشأة

#### جدول `academic_departments`
- `id`: معرف فريد للقسم
- `title`: عنوان القسم
- `description`: وصف القسم
- `image_url`: رابط صورة القسم
- `created_at`: تاريخ الإنشاء
- `updated_at`: تاريخ آخر تحديث

#### جدول `academic_programs`
- `id`: معرف فريد للبرنامج
- `department_id`: معرف القسم المرتبط
- `name`: اسم البرنامج
- `description`: وصف البرنامج
- `hours`: عدد الساعات
- `fees`: الرسوم الدراسية
- `image_url`: رابط صورة البرنامج
- `created_at`: تاريخ الإنشاء
- `updated_at`: تاريخ آخر تحديث

### 4. الميزات المتاحة

#### لوحة التحكم
- إدارة الأقسام الأكاديمية: `/dashboard/academic-departments`
- إدارة البرامج لكل قسم: `/dashboard/academic-departments/[id]/programs`

#### الواجهة العامة
- عرض الأقسام: `/departments`
- تفاصيل القسم: `/departments/[id]`

### 5. إعدادات الأمان (RLS)
تم تفعيل Row Level Security مع السياسات التالية:
- قراءة عامة للجميع
- إدارة كاملة للمشرفين

### 6. البيانات التجريبية
يتضمن السكريبت بيانات تجريبية لـ:
- 5 أقسام أكاديمية
- 17 برنامج تعليمي موزع على الأقسام

## ملاحظات مهمة
- تأكد من تشغيل السكريبت في بيئة Supabase
- يمكن تخصيص سياسات الأمان حسب نظام المصادقة المستخدم
- يمكن إضافة المزيد من الحقول حسب الحاجة