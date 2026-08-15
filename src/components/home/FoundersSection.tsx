'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Phone, MessageCircle, Send, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FoundersSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#070B14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
            {t('founders.badge')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('founders.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t('founders.subtitle')}
          </p>
        </div>

        {/* Founders Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Imran Mohammedbeyan Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0F1A30] to-[#0D1527] border border-[#1E2D4A] hover:border-blue-500/50 shadow-2xl transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-1 flex items-center justify-center shadow-xl shrink-0">
                <div className="w-full h-full rounded-[14px] bg-[#0A0F1D] flex items-center justify-center text-2xl font-black text-blue-400 font-mono">
                  IM
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {t('founders.imranTitle')}
                  </h3>
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mt-0.5">
                  {t('founders.imranRole')}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <span>Direct Hotline:</span>
                  <a 
                    href="tel:+251912251113" 
                    className="font-mono text-slate-200 font-bold hover:text-blue-400"
                  >
                    +251 912 251 113
                  </a>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {t('founders.imranBio')} Imran oversees high-impact digital customer acquisition, brand narrative design, and performance media campaigns for commercial clients in Addis Ababa.
            </p>

            <div className="space-y-2 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Specialist in Performance Media, Meta & Google Ads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mentors the Digital Marketing & Brand Design Cohorts</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#1E2D4A]/80">
              <a
                href="tel:+251912251113"
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-colors text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('founders.directCall')}</span>
              </a>

              <a
                href="https://wa.me/251912251113"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('founders.whatsapp')}</span>
              </a>

              <a
                href="https://t.me/+251912251113"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('founders.telegram')}</span>
              </a>
            </div>
          </div>

          {/* Mikiyas Alemu Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#1A1828] to-[#0D1527] border border-[#1E2D4A] hover:border-amber-500/50 shadow-2xl transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-1 flex items-center justify-center shadow-xl shrink-0">
                <div className="w-full h-full rounded-[14px] bg-[#0A0F1D] flex items-center justify-center text-2xl font-black text-amber-400 font-mono">
                  MA
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {t('founders.mikiyasTitle')}
                  </h3>
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5">
                  {t('founders.mikiyasRole')}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <span>Direct Hotline:</span>
                  <a 
                    href="tel:+251921799925" 
                    className="font-mono text-slate-200 font-bold hover:text-amber-400"
                  >
                    +251 921 799 925
                  </a>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {t('founders.mikiyasBio')} Mikiyas leads operational excellence, autonomous agent implementations, video media storytelling, and backend software engineering at Imaco.
            </p>

            <div className="space-y-2 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Specialist in AI Workflow Automation & Motion Production</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mentors the AI, Video Editing & Python Engineering Cohorts</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#1E2D4A]/80">
              <a
                href="tel:+251921799925"
                className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20 transition-colors text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('founders.directCall')}</span>
              </a>

              <a
                href="https://wa.me/251921799925"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('founders.whatsapp')}</span>
              </a>

              <a
                href="https://t.me/+251921799925"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('founders.telegram')}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
