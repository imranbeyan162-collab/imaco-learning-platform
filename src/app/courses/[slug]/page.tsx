'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  PlayCircle, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  GraduationCap, 
  Calendar,
  Lock,
  ChevronDown,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface LessonItem {
  id: string;
  title: string;
  description?: string;
  order: number;
  videoUrl?: string;
  videoType: string;
  durationMinutes: number;
  isFreePreview: boolean;
}

interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  level: string;
  format: string;
  thumbnail: string;
  instructorName: string;
  instructorRole: string;
  instructorAvatar?: string;
  isPaid: boolean;
  price: number;
  currency: string;
  durationHours: number;
  cohortStartDate?: string;
  lessons: LessonItem[];
  _count?: { registrations: number };
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { t } = useLanguage();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<LessonItem | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourse() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/courses/${slug}`);
        const data = await res.json();
        if (data.success && data.course) {
          setCourse(data.course);
          if (data.course.lessons?.length > 0) {
            setActiveLesson(data.course.lessons[0]);
            setExpandedLesson(data.course.lessons[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching course detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center max-w-4xl mx-auto px-4 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4 space-y-4">
        <GraduationCap className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Course Not Found</h2>
        <p className="text-slate-400 text-xs">The requested course could not be located in our catalog.</p>
        <Link href="/courses" className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold">
          Back to Course Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-12">
      
      {/* Top Header Breadcrumb & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/courses" className="hover:text-blue-400">Courses</Link>
            <span>/</span>
            <span className="text-blue-400 font-medium">{course.category}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left 2 Cols: Title, Video Player & Details */}
            <div className="lg:col-span-2 space-y-8">
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-emerald-500/90 text-white text-xs font-extrabold tracking-wider">
                    {course.isPaid ? `${course.price} ${course.currency}` : '100% FREE'}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-[#0D1527] border border-[#1E2D4A] text-slate-300 text-xs font-medium">
                    {course.level}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-[#0D1527] border border-[#1E2D4A] text-slate-300 text-xs font-medium capitalize">
                    {course.format}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {course.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {course.shortDescription}
                </p>
              </div>

              {/* Embedded Video Player */}
              <div className="rounded-2xl bg-[#0D1527] border border-[#1E2D4A] overflow-hidden shadow-2xl">
                <div className="aspect-video w-full bg-black relative">
                  {activeLesson?.videoUrl ? (
                    <iframe
                      src={activeLesson.videoUrl}
                      title={activeLesson.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 space-y-2 p-6 text-center">
                      <PlayCircle className="w-12 h-12 text-slate-600" />
                      <p className="text-xs text-slate-400">Lesson Video Stream Ready</p>
                    </div>
                  )}
                </div>

                {/* Active Lesson Bar */}
                <div className="p-4 bg-[#0A0F1D] border-t border-[#1E2D4A] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center font-mono">
                      {activeLesson?.order || 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{activeLesson?.title || 'Lesson Overview'}</p>
                      <p className="text-[10px] text-slate-400">{activeLesson?.durationMinutes || 20} mins • Full HD Stream</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold uppercase">
                    Active Module
                  </span>
                </div>
              </div>

              {/* Comprehensive Overview */}
              <div className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] space-y-4">
                <h3 className="text-lg font-bold text-white">Course Overview & Outcomes</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {course.fullDescription}
                </p>

                <div className="pt-4 border-t border-[#1E2D4A]/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-world client project assignments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Eligible for 2-month unpaid agency internship</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Downloadable verified PDF certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1-on-1 feedback from Imran & Mikiyas</span>
                  </div>
                </div>
              </div>

              {/* Interactive Syllabus Accordion */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>Interactive Syllabus & Curriculum</span>
                  <span className="text-xs text-slate-400 font-normal">
                    {course.lessons.length} Modules • {course.durationHours} Total Hours
                  </span>
                </h3>

                <div className="space-y-2.5">
                  {course.lessons.map((lesson) => {
                    const isExpanded = expandedLesson === lesson.id;
                    const isActive = activeLesson?.id === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`rounded-xl border transition-all ${
                          isActive
                            ? 'bg-[#131E38] border-blue-500/50'
                            : 'bg-[#0D1527] border-[#1E2D4A] hover:border-slate-600'
                        }`}
                      >
                        <button
                          onClick={() => {
                            setActiveLesson(lesson);
                            setExpandedLesson(isExpanded ? null : lesson.id);
                          }}
                          className="w-full p-4 text-left flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 font-mono">
                              {lesson.order}
                            </span>
                            <div>
                              <p className={`text-xs font-bold ${isActive ? 'text-blue-400' : 'text-white'}`}>
                                {lesson.title}
                              </p>
                              <p className="text-[11px] text-slate-400">
                                {lesson.durationMinutes} minutes • {lesson.isFreePreview ? 'Free Preview' : 'Full Lesson'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {lesson.isFreePreview ? (
                              <PlayCircle className="w-4 h-4 text-blue-400" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-slate-500" />
                            )}
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </button>

                        {isExpanded && lesson.description && (
                          <div className="px-4 pb-4 pt-1 text-xs text-slate-300 border-t border-slate-800/80">
                            {lesson.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Col: Sticky Enrollment Card & Instructor Box */}
            <div className="space-y-6 lg:sticky lg:top-24">
              
              {/* Enrollment CTA Card */}
              <div className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-6">
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-white">
                      {course.isPaid ? `${course.price} ${course.currency}` : 'Free'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase">
                      Open Enrollment
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Full lifetime access to video modules, assignments & agency internship pathway.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href={`/register?course=${course.id}`}
                    className="w-full py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 transition-all text-xs flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Register for Course (Instant)</span>
                  </Link>

                  <Link
                    href="/internship"
                    className="w-full py-3 rounded-xl font-semibold text-slate-200 bg-[#0A0F1D] hover:bg-[#131E38] border border-[#1E2D4A] transition-all text-xs flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span>Apply for 2-Month Internship</span>
                  </Link>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#1E2D4A] text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Format</span>
                    <span className="font-semibold text-slate-200 capitalize">{course.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <span className="font-semibold text-slate-200">{course.durationHours} Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cohort Start</span>
                    <span className="font-semibold text-blue-400">{course.cohortStartDate || 'Immediate'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Credential</span>
                    <span className="font-semibold text-amber-400">Verified Certificate</span>
                  </div>
                </div>

              </div>

              {/* Instructor Card */}
              <div className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] space-y-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Program Instructor & Mentor
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-base font-bold font-mono shrink-0">
                    {course.instructorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{course.instructorName}</h4>
                    <p className="text-xs text-blue-400 font-medium">{course.instructorRole}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Agency co-founder supervising real client accounts, student practical evaluations, and internship cohort placement.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
