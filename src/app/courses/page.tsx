'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { 
  Search, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Filter, 
  UserCheck, 
  GraduationCap, 
  Sparkles,
  ChevronRight
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

export default function CoursesPage() {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.success && Array.isArray(data.courses)) {
          setCourses(data.courses);
        }
      } catch (e) {
        console.error('Error fetching courses:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ['All', 'Marketing', 'AI & Automation', 'Creative & Media', 'Design', 'Software & Tech'];
  const levels = ['All', 'Beginner', 'Intermediate', 'All Levels'];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || c.level.toLowerCase().includes(selectedLevel.toLowerCase());
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          {t('courses.title')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Practical Digital Programs for <span className="imaco-gradient-text">Agency Excellence</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('courses.subtitle')} All initial 6 programs are 100% free to access at launch. Complete any course to qualify for the 2-month unpaid agency internship.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses by keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-blue-500 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Filters Area */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            {/* Level Select */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
            >
              {levels.map((l) => (
                <option key={l} value={l}>{l === 'All' ? 'All Levels' : l}</option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* Course Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] animate-pulse" />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-[#0D1527] rounded-2xl border border-[#1E2D4A] p-8">
            <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No courses match your filter criteria</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting "All Categories".</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedLevel('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-[#0D1527] border border-[#1E2D4A] hover:border-blue-500/50 shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1527] via-transparent to-black/50" />

                  {/* Free / Paid Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                      {course.isPaid ? `${course.price} ${course.currency}` : t('courses.freeBadge')}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-slate-200 text-[11px] font-medium border border-white/10">
                      {course.category}
                    </span>
                  </div>

                  {/* Meta stats */}
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

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-medium">
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

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Instructor & Action */}
                  <div className="pt-4 border-t border-[#1E2D4A]/80 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{course.instructorName}</p>
                      <p className="text-[10px] text-slate-500">{course.instructorRole.split(',')[0]}</p>
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all flex items-center gap-1 shrink-0"
                    >
                      <span>{t('courses.viewDetails')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
