'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import FoundersSection from '@/components/home/FoundersSection';
import { 
  Building2, 
  Target, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  Zap,
  TrendingUp,
  Compass
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 sm:py-16 space-y-20">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          The Imaco Story & Mission
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
          Bridging Elite Agency Craft with <span className="imaco-gradient-text">Ethiopian Tech Talent</span>
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Imaco Academy was born directly inside Imaco Agency to solve a critical bottleneck: the gap between generic academic theory and high-performing digital marketing execution.
        </p>
      </section>

      {/* Story & Agency DNA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why We Built Imaco Academy
            </h2>
            <p>
              In Ethiopia’s rapidly evolving digital economy, businesses urgently demand measurable results: performance advertising that converts, autonomous AI workflows that eliminate operational drag, and brand identities that stand shoulder-to-shoulder with global standards.
            </p>
            <p>
              Traditional training centers teach disconnected concepts. Imaco Academy operates differently: <strong className="text-white">we train you on the exact tools, budgets, and frameworks we use daily for client brands</strong>, then immediately route you into our 2-month unpaid internship where you execute live production work.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4A]">
                <p className="text-2xl font-black text-blue-400 font-mono">$1M+ Vision</p>
                <p className="text-xs text-slate-400 mt-1">Scaling from Addis Ababa to a premier regional digital agency powerhouse.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4A]">
                <p className="text-2xl font-black text-amber-400 font-mono">100% Practical</p>
                <p className="text-xs text-slate-400 mt-1">Direct client account immersion, zero synthetic toy projects.</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#131E38] to-[#0D1527] border border-[#1E2D4A] space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-blue-400" />
              <span>Why Ethiopia? Why Now?</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white">Demographic Youth Energy</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Over 70% of the Ethiopian population is under 30 with unmatched ambition for digital careers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white">Digital Payment & Commerce Boom</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Telebirr, CBE Birr, and digital banking have unlocked immense local e-commerce and performance marketing opportunities.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white">Frontier AI Acceleration</h4>
                  <p className="text-slate-400 text-xs mt-0.5">AI automation allows Ethiopian professionals to compete globally and deliver enterprise services at 10x speed.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/internship"
                className="w-full py-3 rounded-xl text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-colors block"
              >
                Join the Agency Talent Track →
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Founders Section (Interactive direct contact cards) */}
      <FoundersSection />

      {/* Career Launch CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 via-[#0D1527] to-indigo-900/40 border border-blue-500/30 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Launch Your Digital Career with Imaco?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Choose your learning track or apply directly for our upcoming 2-month unpaid agency internship cohort.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all text-xs"
            >
              Browse Free Courses
            </Link>
            <Link
              href="/internship"
              className="px-6 py-3 rounded-xl font-semibold text-slate-200 bg-[#0D1527] border border-[#1E2D4A] hover:bg-[#131E38] transition-all text-xs"
            >
              Apply for Internship (5 Spots)
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
