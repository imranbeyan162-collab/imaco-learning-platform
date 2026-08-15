'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage, Locale } from '@/lib/i18n';
import { 
  Menu, 
  X, 
  Phone, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ChevronDown,
  Sparkles,
  MessageSquareQuote
} from 'lucide-react';

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [founderMenuOpen, setFounderMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/courses', label: t('nav.courses') },
    { href: '/internship', label: t('nav.internship') },
    { href: '/feedback', label: t('nav.feedback') },
    { href: '/verify', label: t('nav.verify') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const languages: { code: Locale; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'am', label: 'Amharic', native: 'አማርኛ' },
    { code: 'om', label: 'Afaan Oromoo', native: 'Afaan Oromoo' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070B14]/90 backdrop-blur-md border-b border-[#1E2D4A]/80 transition-all">
      {/* Top Banner with Direct Founder Hotlines */}
      <div className="bg-[#0B132B] border-b border-[#1E2D4A]/60 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">{t('hero.cohortInfo')}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-slate-400 font-medium">{t('nav.callHotline')}:</span>
              <a 
                href="tel:+251912251113" 
                className="hover:text-blue-400 transition-colors flex items-center gap-1 font-mono text-slate-200"
              >
                <Phone className="w-3 h-3 text-blue-400" /> Imran: +251 912 251 113
              </a>
              <span className="text-slate-600">|</span>
              <a 
                href="tel:+251921799925" 
                className="hover:text-blue-400 transition-colors flex items-center gap-1 font-mono text-slate-200"
              >
                <Phone className="w-3 h-3 text-amber-400" /> Mikiyas: +251 921 799 925
              </a>
            </div>

            <Link 
              href="/admin" 
              className="text-slate-400 hover:text-slate-200 transition-colors text-[11px] font-medium ml-2 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700"
            >
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform border border-blue-400/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  IMACO
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  ACADEMY
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Talent Arm of Imaco Digital Agency
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Area: Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="uppercase font-semibold">{locale}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLocale(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        locale === l.code
                          ? 'bg-blue-600/20 text-blue-400 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[11px] text-slate-400 font-normal">{l.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Founder Contact Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFounderMenuOpen(!founderMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Founders</span>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </button>

              {founderMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl p-3 z-50 space-y-2.5"
                  onMouseLeave={() => setFounderMenuOpen(false)}
                >
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    Direct Founders Contact
                  </p>
                  
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-slate-100">Imran Mohammedbeyan</p>
                    <p className="text-[10px] text-blue-400">Co-Founder & Growth Lead</p>
                    <div className="flex items-center gap-2 pt-1">
                      <a 
                        href="tel:+251912251113" 
                        className="text-[11px] px-2 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" /> Call
                      </a>
                      <a 
                        href="https://wa.me/251912251113" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[11px] px-2 py-1 rounded bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-medium hover:bg-emerald-600/30"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-slate-100">Mikiyas Alemu</p>
                    <p className="text-[10px] text-amber-400">Co-Founder & Operations Lead</p>
                    <div className="flex items-center gap-2 pt-1">
                      <a 
                        href="tel:+251921799925" 
                        className="text-[11px] px-2 py-1 rounded bg-amber-600 text-white font-medium hover:bg-amber-500 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" /> Call
                      </a>
                      <a 
                        href="https://wa.me/251921799925" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[11px] px-2 py-1 rounded bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-medium hover:bg-emerald-600/30"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <Link
              href="/internship"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t('nav.applyNow')}</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Quick language toggle for mobile */}
            <button
              onClick={() => {
                const nextLang: Record<Locale, Locale> = { en: 'am', am: 'om', om: 'en' };
                setLocale(nextLang[locale]);
              }}
              className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-bold text-blue-400 uppercase"
            >
              {locale}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1527] border-b border-[#1E2D4A] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-600/20 text-blue-400 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Direct Founders Call Area */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t('contact.foundersDirect')}
            </p>
            <div className="flex flex-col gap-2">
              <a 
                href="tel:+251912251113" 
                className="flex items-center justify-between text-xs p-2 rounded bg-slate-800 text-slate-200 hover:text-blue-400"
              >
                <span>Imran Mohammedbeyan</span>
                <span className="font-mono text-blue-400">+251 912 251 113</span>
              </a>
              <a 
                href="tel:+251921799925" 
                className="flex items-center justify-between text-xs p-2 rounded bg-slate-800 text-slate-200 hover:text-amber-400"
              >
                <span>Mikiyas Alemu</span>
                <span className="font-mono text-amber-400">+251 921 799 925</span>
              </a>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/internship"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>{t('nav.applyNow')}</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-xl text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800 hover:text-slate-200"
            >
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
