'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

interface CourseOption {
  id: string;
  slug: string;
  title: string;
  category: string;
}

function RegisterForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const preselectedCourseId = searchParams.get('course') || '';

  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseId: preselectedCourseId,
    fieldOfInterest: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<{
    fullName: string;
    courseTitle: string;
  } | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.success && Array.isArray(data.courses)) {
          setCourses(data.courses);
          if (preselectedCourseId) {
            setFormData((prev) => ({ ...prev, courseId: preselectedCourseId }));
          } else if (data.courses.length > 0) {
            setFormData((prev) => ({ ...prev, courseId: data.courses[0].id }));
          }
        }
      } catch (err) {
        console.error('Error fetching courses for registration:', err);
      }
    }
    loadCourses();
  }, [preselectedCourseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete registration');
      }

      setSuccessData({
        fullName: data.registration.fullName,
        courseTitle: data.registration.courseTitle,
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-2xl bg-[#0D1527] border border-emerald-500/40 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Enrollment Confirmed!</h2>
          <p className="text-sm text-slate-300">
            Welcome to Imaco Academy, <strong className="text-blue-400">{successData.fullName}</strong>! You have been successfully enrolled in:
          </p>
          <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E2D4A] font-bold text-white text-sm">
            {successData.courseTitle}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300 text-left space-y-2">
          <p className="font-semibold text-blue-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Next Steps:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Access your course syllabus and begin streaming lessons immediately.</li>
            <li>Submit course assignments to qualify for the 2-month agency internship.</li>
            <li>Download your verified completion certificate upon module finish.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/courses"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg"
          >
            Go to Course Lessons
          </Link>
          <Link
            href="/internship"
            className="px-6 py-3 rounded-xl bg-[#070B14] hover:bg-[#131E38] border border-[#1E2D4A] text-slate-300 text-xs font-semibold"
          >
            Apply for Agency Internship
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-extrabold text-white">Enroll in a Program</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Get immediate free access to lessons, syllabus projects, and agency mentoring.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Course Selector */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-300">Select Program / Course</label>
          <select
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
            required
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.category})
              </option>
            ))}
          </select>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-300">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Abebe Bikila"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-300">Email Address</label>
          <input
            type="email"
            placeholder="e.g. student@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Phone Number (Optional) */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-300">
            Phone Number <span className="text-slate-500 font-normal">(Optional, for Telegram/WhatsApp updates)</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. +251 911 223 344"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Field of interest note */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-300">
            Primary Career Goal <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Agency Marketer, Freelancer, AI Developer"
            value={formData.fieldOfInterest}
            onChange={(e) => setFormData({ ...formData, fieldOfInterest: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 transition-all text-xs disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
        >
          {loading ? (
            <span>Enrolling...</span>
          ) : (
            <>
              <GraduationCap className="w-4 h-4" />
              <span>Complete Free Registration</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="py-12 sm:py-16 px-4">
      <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading enrollment form...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
