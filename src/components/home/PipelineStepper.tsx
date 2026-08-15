'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { BookOpen, UserCheck, Briefcase, Award, ArrowRight } from 'lucide-react';

export default function PipelineStepper() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500/30',
      title: t('pipeline.step1Title'),
      desc: t('pipeline.step1Desc'),
    },
    {
      num: '02',
      icon: UserCheck,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/30',
      title: t('pipeline.step2Title'),
      desc: t('pipeline.step2Desc'),
    },
    {
      num: '03',
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/30',
      title: t('pipeline.step3Title'),
      desc: t('pipeline.step3Desc'),
    },
    {
      num: '04',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500/30',
      title: t('pipeline.step4Title'),
      desc: t('pipeline.step4Desc'),
    },
  ];

  return (
    <section className="py-20 bg-[#060A13] border-y border-[#1E2D4A]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            {t('pipeline.badge')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('pipeline.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t('pipeline.subtitle')}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-2xl bg-[#0D1527] border ${step.borderColor} relative group hover:-translate-y-1 transition-all duration-300 shadow-xl`}
              >
                {/* Step Top */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-700 group-hover:text-slate-500 transition-colors font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>

                {/* Arrow indicator between steps for larger screens */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-[#131E38] border border-[#1E2D4A] flex items-center justify-center text-slate-500 shadow">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
