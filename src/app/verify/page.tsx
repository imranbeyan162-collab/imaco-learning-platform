'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { generateCertificatePDF, CertificateData } from '@/lib/pdf-generator';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Award, 
  GraduationCap,
  Sparkles,
  ExternalLink
} from 'lucide-react';

function VerifyCertificateContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';

  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [error, setError] = useState('');

  const handleVerify = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return;
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/verify?code=${encodeURIComponent(codeToVerify.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || t('verify.notFound'));
      }

      setCertificate(data.certificate);
    } catch (err: any) {
      setCertificate(null);
      setError(err.message || t('verify.notFound'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      handleVerify(initialCode);
    }
  }, [initialCode]);

  const handleDownloadPDF = () => {
    if (!certificate) return;
    generateCertificatePDF(certificate);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      
      {/* Search Input Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-4">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Enter Certificate Verification Code
        </label>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(code);
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('verify.placeholder')}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 transition-all text-xs disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Verifying...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>{t('verify.verifyBtn')}</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Hint Button */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <button
            type="button"
            onClick={() => {
              setCode('IMC-2026-001');
              handleVerify('IMC-2026-001');
            }}
            className="text-blue-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t('verify.sampleCodeHint')}
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-400 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Verified Certificate Card Showcase */}
      {certificate && (
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#131E38] to-[#0A0F1D] border border-blue-500/50 shadow-2xl space-y-8 animate-in zoom-in-95">
          
          {/* Certificate Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2D4A]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t('verify.verified')}
                </span>
                <p className="text-xs text-slate-400 font-mono">Code: {certificate.verificationCode}</p>
              </div>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/25 transition-all text-xs flex items-center justify-center gap-2 self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>{t('verify.downloadPdf')}</span>
            </button>
          </div>

          {/* Certificate Body Representation */}
          <div className="p-8 rounded-2xl bg-[#070B14] border border-amber-500/30 text-center space-y-6 relative overflow-hidden shadow-inner">
            <div className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">
              Imaco Academy Official Credential
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400 uppercase tracking-wider">{t('verify.recipient')}</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-serif">
                {certificate.recipientName}
              </h3>
            </div>

            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              has completed the comprehensive professional curriculum and verified agency deliverables in
            </p>

            <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E2D4A] max-w-lg mx-auto">
              <p className="text-sm font-bold text-white">{certificate.courseTitle}</p>
              {certificate.grade && (
                <p className="text-xs text-amber-400 font-semibold mt-0.5">{certificate.grade}</p>
              )}
            </div>

            {/* Signatures & Issuer */}
            <div className="pt-6 border-t border-[#1E2D4A] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400 text-left">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">{t('verify.issueDate')}</span>
                <p className="font-semibold text-slate-200">
                  {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase block">{t('verify.issuer')}</span>
                <p className="font-semibold text-slate-200">{certificate.issuerTitle || 'Imran Mohammedbeyan & Mikiyas Alemu'}</p>
                <p className="text-[10px] text-slate-400">Imaco Digital Agency Addis Ababa</p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default function VerifyPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          {t('verify.badge')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t('verify.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          {t('verify.subtitle')}
        </p>
      </section>

      <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading verification portal...</div>}>
        <VerifyCertificateContent />
      </Suspense>

    </div>
  );
}
