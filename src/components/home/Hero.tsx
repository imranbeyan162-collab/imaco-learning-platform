'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  Play, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Phone
} from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Subtle Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1527] border border-[#1E2D4A] shadow-inner text-xs font-medium text-blue-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Master In-Demand Digital Skills.{' '}
            <span className="imaco-gradient-text">
              Work on Real Agency Projects.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/courses"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
            >
              <span>{t('hero.ctaPrimary')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/internship"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-slate-200 bg-[#0D1527] hover:bg-[#131E38] border border-[#1E2D4A] hover:border-blue-500/40 shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>{t('hero.ctaSecondary')}</span>
            </Link>
          </div>

          {/* Credibility Highlights Pill */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All 6 Starter Courses Free at Launch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>2-Month Agency Internship Pipeline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Certificate Credentials</span>
            </div>
          </div>

        </div>

        {/* Hero Interactive Showcase Card */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-gradient-to-b from-[#131E38] to-[#0D1527] p-1 shadow-2xl border border-[#1E2D4A]">
          <div className="rounded-[14px] bg-[#070B14] p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              <div className="p-5 rounded-xl bg-[#0D1527] border border-[#1E2D4A]/80 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Agency-Grade Curricula</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No outdated theories. Every lesson is crafted from real marketing campaigns and automation workflows running inside Imaco Agency.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0D1527] border border-[#1E2D4A]/80 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">5 Interns Per Cohort</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strictly capped cohorts ensure intensive 1-on-1 mentorship with founders Imran and Mikiyas directly on client deliverables.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0D1527] border border-[#1E2D4A]/80 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Fast-Track Employment</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Top performing interns receive direct full-time employment offers inside Imaco or backing to launch their own independent agency.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
