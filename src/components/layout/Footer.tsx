'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050811] border-t border-[#1E2D4A] text-slate-400 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E2D4A]/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">IMACO ACADEMY</span>
                <p className="text-xs text-blue-400 font-medium">Digital Agency Training & Talent Engine</p>
              </div>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {t('footer.tagline')} We train high-calibre digital talent, run intensive 2-month agency internships, and launch careers on real client projects across Africa.
            </p>

            <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E2D4A] flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-200">Verified Agency Credentialing</p>
                <p className="text-[11px] text-slate-400">All student certificates are cryptographically verifiable online.</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">{t('nav.home')}</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="/courses" className="hover:text-blue-400 transition-colors">{t('nav.courses')}</Link></li>
              <li><Link href="/internship" className="hover:text-blue-400 transition-colors">{t('nav.internship')}</Link></li>
              <li><Link href="/feedback" className="hover:text-blue-400 transition-colors">{t('nav.feedback')}</Link></li>
              <li><Link href="/verify" className="hover:text-blue-400 transition-colors">{t('nav.verify')}</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Core Programs */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              {t('footer.programs')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/courses/digital-marketing" className="hover:text-blue-400 transition-colors">Digital Marketing & Ads</Link></li>
              <li><Link href="/courses/ai-automation" className="hover:text-blue-400 transition-colors">AI Workflow Automation</Link></li>
              <li><Link href="/courses/video-editing" className="hover:text-blue-400 transition-colors">Video Editing & Storytelling</Link></li>
              <li><Link href="/courses/graphic-design" className="hover:text-blue-400 transition-colors">Brand & Graphic Design</Link></li>
              <li><Link href="/courses/python-programming" className="hover:text-blue-400 transition-colors">Python Programming</Link></li>
              <li><Link href="/courses/prompt-engineering" className="hover:text-blue-400 transition-colors">Prompt Engineering & LLMs</Link></li>
            </ul>
          </div>

          {/* Founders Direct Contacts */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              {t('footer.contactInfo')}
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-[#0D1527] border border-[#1E2D4A] space-y-1">
                <p className="font-semibold text-slate-200">Imran Mohammedbeyan</p>
                <p className="text-[10px] text-blue-400">Co-Founder & Growth Lead</p>
                <a 
                  href="tel:+251912251113" 
                  className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 font-mono transition-colors"
                >
                  <Phone className="w-3 h-3 text-blue-400" /> +251 912 251 113
                </a>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0D1527] border border-[#1E2D4A] space-y-1">
                <p className="font-semibold text-slate-200">Mikiyas Alemu</p>
                <p className="text-[10px] text-amber-400">Co-Founder & Operations Lead</p>
                <a 
                  href="tel:+251921799925" 
                  className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 font-mono transition-colors"
                >
                  <Phone className="w-3 h-3 text-amber-400" /> +251 921 799 925
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Bole, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <Link href="/verify" className="hover:text-slate-400 transition-colors">
              Certificate Lookup
            </Link>
            <Link href="/feedback" className="hover:text-slate-400 transition-colors">
              Student Reviews
            </Link>
            <Link href="/admin" className="hover:text-slate-400 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
