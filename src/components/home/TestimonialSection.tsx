'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Star, MessageSquareQuote, ArrowRight, ShieldCheck, PlusCircle } from 'lucide-react';

interface TestimonialItem {
  id: string;
  fullName: string;
  roleOrCourse: string;
  category: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
}

export default function TestimonialSection() {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  return (
    <section className="py-20 bg-[#060A13] border-t border-[#1E2D4A]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              {t('feedback.badge')}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('feedback.title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              {t('feedback.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href="/feedback"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t('feedback.leaveReview')}</span>
            </Link>
            <Link
              href="/feedback"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-[#0D1527] border border-[#1E2D4A] hover:bg-[#131E38] transition-colors"
            >
              <span>View All</span>
            </Link>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((tItem) => (
            <div
              key={tItem.id}
              className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] hover:border-emerald-500/40 shadow-xl flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < tItem.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{tItem.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#1E2D4A]/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white text-xs font-bold font-mono shrink-0">
                  {tItem.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{tItem.fullName}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-slate-400">{tItem.roleOrCourse}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
