'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Check, 
  User, 
  PlayCircle 
} from 'lucide-react';

interface CourseItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  level: string;
  format: string;
  thumbnail: string;
  instructorName: string;
  instructorRole: string;
  durationHours: number;
  cohortStartDate?: string;
  isPaid: boolean;
  price: number;
  currency: string;
  lessons?: { id: string; title: string }[];
}

export default function FeaturedCourses() {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.success && Array.isArray(data.courses)) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const categories = ['All', 'Marketing', 'AI & Automation', 'Creative & Media', 'Design', 'Software & Tech'];

  const filtered = activeCategory === 'All'
    ? courses
    : courses.filter((c) => c.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section className="py-20 bg-[#070B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
              {t('courses.title')}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curricula Built for Real-World Execution
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              {t('courses.subtitle')}
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group self-start md:self-auto"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-500'
                  : 'bg-[#0D1527] text-slate-300 border border-[#1E2D4A] hover:bg-[#131E38] hover:text-white'
              }`}
            >
              {cat === 'All' ? t('courses.filterAll') : cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-[#0D1527] border border-[#1E2D4A] hover:border-blue-500/40 shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Thumbnail Image with Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1527] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                      {course.isPaid ? `${course.price} ${course.currency}` : t('courses.freeBadge')}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-slate-200 text-[11px] font-medium border border-white/10">
                      {course.category}
                    </span>
                  </div>

                  {/* Bottom Duration & Level */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {course.durationHours} {t('courses.hours')}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      {course.lessons?.length || 5} {t('courses.lessonsCount')}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                        {course.level}
                      </span>
                      <span>•</span>
                      <span className="capitalize text-slate-400">{course.format}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                      <Link href={`/courses/${course.slug}`}>
                        {course.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Instructor & Action */}
                  <div className="pt-4 border-t border-[#1E2D4A]/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold font-mono">
                        {course.instructorName.charAt(0)}
                      </div>
                      <div className="text-[11px]">
                        <p className="font-semibold text-slate-200">{course.instructorName}</p>
                        <p className="text-slate-500 text-[10px]">{course.instructorRole.split(',')[0]}</p>
                      </div>
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 transition-all flex items-center gap-1 shrink-0"
                    >
                      <span>{t('courses.viewDetails')}</span>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
