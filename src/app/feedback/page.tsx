'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { 
  Star, 
  MessageSquareQuote, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck,
  PlusCircle,
  Clock
} from 'lucide-react';

interface TestimonialItem {
  id: string;
  fullName: string;
  roleOrCourse: string;
  category: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
  createdAt: string;
}

export default function FeedbackPage() {
  const { t } = useLanguage();

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    roleOrCourse: '',
    category: 'Course',
    rating: 5,
    comment: '',
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const loadTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success && Array.isArray(data.testimonials)) {
        setTestimonials(data.testimonials);
      }
    } catch (e) {
      console.error('Error fetching feedback:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setFormSuccess(true);
      setFormData({
        fullName: '',
        roleOrCourse: '',
        category: 'Course',
        rating: 5,
        comment: '',
      });
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while submitting feedback.');
    } finally {
      setFormLoading(false);
    }
  };

  const categories = ['All', 'Course', 'Internship', 'Agency'];

  const filtered = activeCategory === 'All'
    ? testimonials
    : testimonials.filter((t) => t.category === activeCategory);

  return (
    <div className="py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          {t('feedback.badge')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
          {t('feedback.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('feedback.subtitle')}
        </p>
      </section>

      {/* Main Layout: Testimonials Wall + Submission Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left 2 Cols: Public Testimonials Wall */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Filter Category Pills */}
            <div className="flex items-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === c
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-[#0D1527] text-slate-400 border border-[#1E2D4A] hover:text-white'
                  }`}
                >
                  {c === 'All' ? 'All Reviews' : `${c} Feedback`}
                </button>
              ))}
            </div>

            {/* Testimonials List */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-32 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center bg-[#0D1527] rounded-2xl border border-[#1E2D4A] text-slate-400 text-xs">
                No reviews yet in this category. Be the first to share your experience!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filtered.map((tItem) => (
                  <div
                    key={tItem.id}
                    className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] hover:border-emerald-500/40 shadow-xl flex flex-col justify-between space-y-4 transition-all"
                  >
                    <div className="space-y-3">
                      {/* Rating Stars */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < tItem.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-slate-400 uppercase">
                          {tItem.category}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{tItem.comment}"
                      </p>
                    </div>

                    {/* Author */}
                    <div className="pt-3 border-t border-[#1E2D4A]/80 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold font-mono shrink-0">
                        {tItem.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          <span>{tItem.fullName}</span>
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        </h4>
                        <p className="text-[10px] text-slate-400">{tItem.roleOrCourse}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Col: Submit Feedback Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-5 lg:sticky lg:top-24">
            
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-400" />
                <span>{t('feedback.leaveReview')}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {t('feedback.moderationNote')}
              </p>
            </div>

            {formSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> {t('feedback.successMsg')}
                </p>
              </div>
            )}

            {formError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t('feedback.formName')}</label>
                <input
                  type="text"
                  placeholder="e.g. Dawit Haile"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Role / Course */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t('feedback.formRole')}</label>
                <input
                  type="text"
                  placeholder="e.g. AI Automation Student, Client, Intern"
                  value={formData.roleOrCourse}
                  onChange={(e) => setFormData({ ...formData, roleOrCourse: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Category & Rating */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">{t('feedback.formCategory')}</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Course">Course</option>
                    <option value="Internship">Internship</option>
                    <option value="Agency">Agency</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                  </select>
                </div>
              </div>

              {/* Review Comment */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t('feedback.formComment')}</label>
                <textarea
                  rows={4}
                  placeholder={t('feedback.formCommentPlaceholder')}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all text-xs disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {formLoading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('feedback.submitBtn')}</span>
                  </>
                )}
              </button>

            </form>

          </div>

        </div>
      </section>

    </div>
  );
}
