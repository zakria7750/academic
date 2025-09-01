"use client"

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Award,
  Target,
  Brain,
  GraduationCap,
  Globe,
  Star,
  Building2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase, type AcademicDepartment, type AcademicProgram } from "@/lib/supabase";

// أيقونات الأقسام المختلفة
const departmentIcons = [Brain, Target, BookOpen, Users, Award, Building2, GraduationCap];
const departmentColors = [
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-green-500 to-green-600", 
  "bg-gradient-to-br from-purple-500 to-purple-600",
  "bg-gradient-to-br from-orange-500 to-orange-600",
  "bg-gradient-to-br from-red-500 to-red-600",
  "bg-gradient-to-br from-indigo-500 to-indigo-600",
  "bg-gradient-to-br from-pink-500 to-pink-600"
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<AcademicDepartment[]>([]);
  const [programs, setPrograms] = useState<AcademicProgram[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات من قاعدة البيانات
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // جلب الأقسام
      const { data: departmentsData, error: departmentsError } = await supabase
        .from("academic_departments")
        .select("*")
        .order("created_at", { ascending: true });

      if (departmentsError) throw departmentsError;

      // جلب البرامج
      const { data: programsData, error: programsError } = await supabase
        .from("academic_programs")
        .select("*");

      if (programsError) throw programsError;

      setDepartments(departmentsData || []);
      setPrograms(programsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // حساب عدد البرامج لكل قسم
  const getDepartmentProgramsCount = (departmentId: string) => {
    return programs.filter(program => program.department_id === departmentId).length;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Ultra Premium Background Pattern */}
      <div className="absolute inset-0 opacity-30 ">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,31,63,0.05),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]"></div>
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-academy-gold/10 via-academy-gold/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-gradient-to-br from-academy-blue/8 via-academy-blue/4 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-academy-gold/6 to-academy-blue/6 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-academy-gold/40 rotate-45 animate-pulse delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-academy-blue/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-academy-gold/50 rotate-45 animate-pulse delay-1100"></div>
      </div>

      {/* Ultra Premium Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="absolute inset-0 opacity-30 bg-black z-10"></div>

        {/* Multi-layered Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-dark to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/95 via-academy-blue/80 to-academy-blue/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)]"></div>

        {/* Ultra Premium Decorative Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-academy-gold/25 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-academy-gold/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-academy-gold/15 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-academy-gold/25 rounded-full blur-xl animate-pulse delay-1500"></div>

          {/* Premium Geometric Patterns */}
          <div className="absolute top-32 left-1/3 w-6 h-6 border-2 border-academy-gold/30 rotate-45 animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-4 h-4 bg-academy-gold/20 rounded-full animate-pulse delay-2500"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-8xl px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Ultra Premium Icon Section */}
            <div className="relative inline-block mb-16">
              <div className="p-8 bg-white/15 backdrop-blur-2xl rounded-[2rem] border border-white/25 shadow-[0_32px_64px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-700">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-academy-gold via-academy-gold-light to-academy-gold-dark rounded-3xl flex items-center justify-center shadow-2xl border border-academy-gold/20 hover:scale-110 transition-transform duration-500">
                    <BookOpen
                      className="text-academy-blue drop-shadow-lg"
                      size={60}
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-academy-gold-light to-academy-gold rounded-full flex items-center justify-center shadow-xl border border-white/20">
                    <Users size={24} className="text-academy-blue" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-academy-gold to-academy-gold-dark rounded-full flex items-center justify-center shadow-lg">
                    <Star size={20} className="text-academy-blue" />
                  </div>
                  <div className="absolute top-2 -left-6 w-8 h-8 bg-academy-gold/80 rounded-full flex items-center justify-center shadow-md">
                    <Award size={16} className="text-academy-blue" />
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-6 -left-6 w-8 h-8 bg-academy-gold rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-4 -right-8 w-6 h-6 bg-academy-gold-light rounded-full animate-pulse delay-700 shadow-md"></div>
              <div className="absolute top-1/2 -left-12 w-4 h-4 bg-academy-gold rounded-full animate-pulse delay-1200"></div>
              <div className="absolute -top-8 right-1/4 w-3 h-3 bg-academy-gold-light rounded-full animate-pulse delay-1600"></div>
            </div>

            {/* Premium Title Section */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-academy-gold-light to-white bg-clip-text text-transparent">
                  الأقسام
                </span>
                <br />
                <span className="bg-gradient-to-r from-academy-gold-light via-academy-gold to-academy-gold-light bg-clip-text text-transparent animate-pulse">
                  الأكاديمية
                </span>
              </h1>
            </div>

            {/* Premium Description */}
            <div className="mb-16">
              <p className="text-2xl lg:text-3xl mb-6 font-semibold leading-relaxed">
                <span className="bg-gradient-to-r from-academy-gold-light to-white bg-clip-text text-transparent">
                  استكشف تشكيلة واسعة من الأقسام الأكاديمية المتخصصة
                </span>
              </p>
              <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                نقدم لك أفضل الفرص التعليمية لتحقيق أحلامك المهنية مع أحدث
                المعايير الدولية
              </p>

              {/* Premium Stats Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">
                    {loading ? "..." : departments.length}
                  </div>
                  <div className="text-white/80">أقسام رئيسية</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">
                    {loading ? "..." : programs.length}
                  </div>
                  <div className="text-white/80">برنامج تعليمي</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-500">
                  <div className="text-3xl font-bold text-academy-gold mb-2">
                    100%
                  </div>
                  <div className="text-white/80">معتمدة دولياً</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Departments Stats */}
      <section className="py-20 bg-gradient-to-br from-academy-gray to-academy-gray-light relative">
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <BookOpen className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">
                  {loading ? "..." : departments.length}
                </h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">
                  أقسام رئيسية
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <Target className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">
                  {loading ? "..." : programs.length}
                </h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">
                  برنامج تعليمي
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>

            <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/5 to-academy-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-academy-blue to-academy-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                  <Award className="text-academy-gold text-2xl" />
                </div>
                <h3 className="text-4xl font-bold text-academy-blue mb-3 text-center">
                  100%
                </h3>
                <p className="text-academy-dark-gray font-semibold text-center text-lg">
                  معتمدة دولياً
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto mt-4 rounded-full"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Departments Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue/2 to-academy-gold/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-academy-blue mb-6">
              الأقسام الأكاديمية
            </h2>
            <p className="text-xl text-academy-dark-gray max-w-4xl mx-auto leading-relaxed">
              تضم أكاديميتنا مجموعة متنوعة من الأقسام الأكاديمية المتخصصة التي
              تغطي مختلف المجالات العلمية والمهنية
              <br />
              <span className="text-lg text-academy-darker-gray">
                نقدم تعليماً عالي الجودة مع أحدث المناهج والتقنيات
              </span>
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-academy-gold border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-academy-blue font-semibold">جاري تحميل الأقسام...</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-academy-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="text-academy-blue" size={40} />
              </div>
              <h3 className="text-xl font-bold text-academy-blue mb-2">لا توجد أقسام أكاديمية</h3>
              <p className="text-academy-dark-gray">لم يتم إضافة أي أقسام بعد</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {departments.map((department, index) => {
                const Icon = departmentIcons[index % departmentIcons.length];
                const color = departmentColors[index % departmentColors.length];
                const programsCount = getDepartmentProgramsCount(department.id);
                
                return (
                  <Card
                    key={department.id}
                    className="group bg-white/90 backdrop-blur-sm hover:shadow-3xl border-0 shadow-2xl transition-all duration-700 hover:-translate-y-6 rounded-3xl overflow-hidden border-2 border-academy-gold/20 hover:border-academy-gold/60 relative"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Enhanced Department Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={department.image_url || "/placeholder.svg"}
                        alt={department.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/90 via-academy-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Enhanced Programs Count Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                        {programsCount} برامج
                      </div>

                      {/* Enhanced Department Icon */}
                      <div className="absolute bottom-4 right-4">
                        <div
                          className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}
                        >
                          <Icon className="text-white text-xl" />
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-academy-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <div className="text-white text-center w-full">
                          <p className="text-lg font-semibold mb-2">
                            اكتشف المزيد
                          </p>
                          <p className="text-sm opacity-90">
                            انقر لعرض التفاصيل الكاملة
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Department Info */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-academy-blue mb-4 group-hover:text-academy-gold transition-colors duration-500 leading-tight">
                        {department.title}
                      </h3>

                      <p className="text-academy-dark-gray text-base leading-relaxed mb-6 line-clamp-3">
                        {department.description}
                      </p>

                      {/* Enhanced Programs Count Display */}
                      <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-academy-blue/5 to-academy-gold/5 rounded-2xl border border-academy-blue/10">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Target size={18} className="text-academy-gold" />
                          <span className="text-academy-blue font-semibold text-sm">
                            {programsCount} برامج متاحة
                          </span>
                        </div>
                        <div className="w-2 h-2 bg-academy-gold rounded-full animate-pulse"></div>
                      </div>

                      {/* Enhanced View Details Button */}
                      <Link href={`/departments/${department.id}`}>
                        <Button className="w-full bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                          عرض التفاصيل
                          <div className="w-2 h-2 bg-academy-blue rounded-full ml-2 animate-pulse"></div>
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-academy-blue via-academy-blue-700 to-academy-blue-900">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-academy-gold/15 via-transparent to-academy-gold/10"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-academy-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-academy-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto text-white">
            <div className="inline-block mb-8">
              <div className="w-24 h-1 bg-gradient-to-r from-academy-gold to-academy-gold-dark mx-auto rounded-full"></div>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-academy-gold-100 to-white bg-clip-text text-transparent">
              ابدأ رحلتك التعليمية معنا
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-academy-gold-100 leading-relaxed max-w-4xl mx-auto">
              اختر القسم الذي يناسب اهتماماتك وأهدافك المهنية وانطلق نحو مستقبل
              مشرق
              <br />
              <span className="text-lg text-academy-gold-200">
                نحن هنا لمساعدتك في تحقيق أحلامك التعليمية
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/admission">
                <Button className="group bg-gradient-to-r from-academy-gold to-academy-gold-dark text-academy-blue hover:from-academy-gold-dark hover:to-academy-gold font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0">
                  <span className="mr-2">سجل الآن</span>
                  <div className="w-3 h-3 bg-academy-blue rounded-full group-hover:animate-pulse"></div>
                </Button>
              </Link>

              <Link href="/programs">
                <Button
                  variant="outline"
                  className="group border-3 border-white text-white hover:bg-white hover:text-academy-blue font-bold px-10 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:backdrop-blur-md"
                >
                  <span className="mr-2">استكشف البرامج</span>
                  <div className="w-3 h-3 bg-white rounded-full group-hover:animate-pulse"></div>
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Star className="text-academy-gold text-lg" />
                <span className="text-white font-medium">
                  تعليم عالي الجودة
                </span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Globe className="text-academy-gold text-lg" />
                <span className="text-white font-medium">اعتماد دولي</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Users className="text-academy-gold text-lg" />
                <span className="text-white font-medium">أساتذة متخصصون</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
