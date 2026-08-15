'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { 
  Briefcase, 
  Users, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  Building,
  ShieldCheck
} from 'lucide-react';

export default function InternshipPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    fieldOfInterest: 'Digital Marketing',
    whyJoining: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tracks = [
    'Digital Marketing',
    'AI Automation',
    'Video Editing',
    'Graphic Design',
    'Python Programming',
    'Prompt Engineering',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/internship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit internship application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          {t('internship.badge')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
          {t('internship.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('internship.subtitle')}
        </p>
      </section>

      {/* Main Container: Notice Card + Application Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Transparent Cohort Rules Card */}
        <div className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-xl mb-8 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-400" />
            <span>Internship Terms & Expectations</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> 2 Months Duration
              </span>
              <p className="text-slate-400">
                Unpaid intensive agency immersion focused on real client projects and fast-paced growth.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-blue-400 font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4" /> 5 Interns Per Track
              </span>
              <p className="text-slate-400">
                Strict cohort cap to guarantee 1-on-1 mentorship with founders Imran and Mikiyas.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> No Resume Barrier
              </span>
              <p className="text-slate-400">
                We do not ask for CVs. We train you ourselves and evaluate your drive, logic, and speed.
              </p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        {submitted ? (
          <div className="p-8 rounded-2xl bg-[#0D1527] border border-emerald-500/40 shadow-2xl text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">{t('internship.successTitle')}</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              {t('internship.successMsg')}
            </p>
            <div className="pt-3">
              <Link
                href="/courses"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold inline-block"
              >
                Explore Learning Materials
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-6">
            <div className="border-b border-[#1E2D4A] pb-4">
              <h2 className="text-lg font-bold text-white">4-Question Fast Application</h2>
              <p className="text-xs text-slate-400 mt-1">
                Takes less than 2 minutes. Fill in your details below.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* Question 1: Full Name */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  1. {t('internship.formFullName')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mahlet Kebede"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Question 2: Email */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  2. {t('internship.formEmail')}
                </label>
                <input
                  type="email"
                  placeholder="e.g. yourname@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Question 3: Field of Interest */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  3. {t('internship.formTrack')}
                </label>
                <select
                  value={formData.fieldOfInterest}
                  onChange={(e) => setFormData({ ...formData, fieldOfInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                  required
                >
                  {tracks.map((track) => (
                    <option key={track} value={track}>
                      {track} Track
                    </option>
                  ))}
                </select>
              </div>

              {/* Question 4: Why Joining */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  4. {t('internship.formWhy')}
                </label>
                <textarea
                  rows={4}
                  placeholder={t('internship.formWhyPlaceholder')}
                  value={formData.whyJoining}
                  onChange={(e) => setFormData({ ...formData, whyJoining: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Optional 5: Anything Else */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">
                  {t('internship.formNotes')}
                </label>
                <textarea
                  rows={2}
                  placeholder={t('internship.formNotesPlaceholder')}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/25 transition-all text-xs disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('internship.submitBtn')}</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </section>

    </div>
  );
}
