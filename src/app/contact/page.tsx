'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  MessageCircle
} from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          {t('contact.badge')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
          {t('contact.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('contact.subtitle')}
        </p>
      </section>

      {/* Main Grid: Direct Founders Cards + Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Col: Direct Founders Hotline & Agency Location */}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>{t('contact.foundersDirect')}</span>
              </h2>
              <p className="text-xs text-slate-400">
                Speak directly with the leadership team for agency collaborations, student inquiries, or enterprise talent hiring.
              </p>
            </div>

            {/* Imran Card */}
            <div className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] hover:border-blue-500/40 shadow-xl space-y-4 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-mono text-base">
                    IM
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Imran Mohammedbeyan</h3>
                    <p className="text-xs text-blue-400">Co-Founder & Growth Lead</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold">
                  Direct Line
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+251 912 251 113</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1E2D4A]/80 text-xs">
                <a
                  href="tel:+251912251113"
                  className="py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center flex items-center justify-center gap-1 shadow"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
                <a
                  href="https://wa.me/251912251113"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-center flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-400" /> WhatsApp
                </a>
                <a
                  href="https://t.me/+251912251113"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 font-semibold text-center flex items-center justify-center gap-1"
                >
                  <Send className="w-3 h-3 text-sky-400" /> Telegram
                </a>
              </div>
            </div>

            {/* Mikiyas Card */}
            <div className="p-6 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] hover:border-amber-500/40 shadow-xl space-y-4 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-base">
                    MA
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Mikiyas Alemu</h3>
                    <p className="text-xs text-amber-400">Co-Founder & Operations Lead</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold">
                  Direct Line
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+251 921 799 925</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1E2D4A]/80 text-xs">
                <a
                  href="tel:+251921799925"
                  className="py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-center flex items-center justify-center gap-1 shadow"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
                <a
                  href="https://wa.me/251921799925"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-center flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-400" /> WhatsApp
                </a>
                <a
                  href="https://t.me/+251921799925"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 font-semibold text-center flex items-center justify-center gap-1"
                >
                  <Send className="w-3 h-3 text-sky-400" /> Telegram
                </a>
              </div>
            </div>

            {/* Location & Agency Office Card */}
            <div className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-white">{t('contact.officeLocation')}</h4>
                <p className="text-slate-400">{t('contact.officeDetails')}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Operating Hours: Mon - Sat (8:30 AM - 6:30 PM EAT)</p>
              </div>
            </div>

          </div>

          {/* Right Col: Inquiry Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-5">
            <div className="space-y-1 border-b border-[#1E2D4A] pb-4">
              <h2 className="text-lg font-bold text-white">{t('contact.formTitle')}</h2>
              <p className="text-xs text-slate-400">
                Send a direct inquiry to our team. We typically respond within 2-4 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. Imran and Mikiyas will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">{t('contact.name')}</label>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">{t('contact.email')}</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">{t('contact.subject')}</label>
                  <input
                    type="text"
                    placeholder="e.g. Corporate Training, Internship Inquiry, Agency Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">{t('contact.message')}</label>
                  <textarea
                    rows={4}
                    placeholder="How can we assist your business or career goals?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 transition-all text-xs disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('contact.sendBtn')}</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
