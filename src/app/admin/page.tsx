'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateCertificatePDF } from '@/lib/pdf-generator';
import { 
  ShieldCheck, 
  Lock, 
  BookOpen, 
  Users, 
  Briefcase, 
  MessageSquareQuote, 
  Award, 
  Download, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  Search, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Pencil
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'courses' | 'applications' | 'registrations' | 'testimonials' | 'certificates'>('applications');

  const [stats, setStats] = useState<any>({});
  const [courses, setCourses] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Edit Course State
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // New Course Form State
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    category: 'Marketing',
    level: 'Beginner',
    format: 'cohort',
    durationHours: 24,
    isPaid: false,
    price: 0,
    currency: 'ETB',
    instructorName: 'Imran Mohammedbeyan',
    instructorRole: 'Co-Founder & Lead Mentor',
  });

  // New Certificate Form State
  const [showCertModal, setShowCertModal] = useState(false);
  const [certForm, setCertForm] = useState({
    recipientName: '',
    courseTitle: 'Digital Marketing Essentials & Agency Growth',
    grade: 'Distinction & Agency Honors',
    issuerTitle: 'Imran Mohammedbeyan & Mikiyas Alemu (Co-Founders)',
  });

  // Check login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthenticated(true);
        loadAllData();
      } else {
        setAuthError(data.error || 'Invalid password');
      }
    } catch (err) {
      setAuthError('Authentication error');
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [sRes, cRes, aRes, rRes, tRes, certRes] = await Promise.all([
        fetch('/api/admin/stats').then((r) => r.json()),
        fetch('/api/courses').then((r) => r.json()),
        fetch('/api/admin/applications').then((r) => r.json()),
        fetch('/api/admin/registrations').then((r) => r.json()),
        fetch('/api/admin/testimonials').then((r) => r.json()),
        fetch('/api/admin/certificates').then((r) => r.json()),
      ]);

      if (sRes.success) setStats(sRes.stats);
      if (cRes.success) setCourses(cRes.courses);
      if (aRes.success) setApplications(aRes.applications);
      if (rRes.success) setRegistrations(rRes.registrations);
      if (tRes.success) setTestimonials(tRes.testimonials);
      if (certRes.success) setCertificates(certRes.certificates);
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error('Error updating application status:', err);
    }
  };

  const handleModerateTestimonial = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/testimonials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t))
      );
    } catch (err) {
      console.error('Error updating testimonial:', err);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm),
      });
      const data = await res.json();
      if (data.success) {
        setShowCourseModal(false);
        loadAllData();
      } else {
        alert(data.error || 'Failed to create course');
      }
    } catch (err) {
      alert('Error creating course');
    }
  };

  const handleDeleteCourse = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`/api/courses/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.slug !== slug));
      }
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certForm),
      });
      const data = await res.json();
      if (data.success) {
        setShowCertModal(false);
        setCertificates((prev) => [data.certificate, ...prev]);
        generateCertificatePDF(data.certificate);
      }
    } catch (err) {
      alert('Error issuing certificate');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white">Imaco Staff Portal</h1>
            <p className="text-xs text-slate-400">
              Enter the administrator key to manage courses, candidates, and certificates.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <input
              type="password"
              placeholder="Admin Password (imaco-admin-2026)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none text-center tracking-wider"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl transition-all"
            >
              Unlock Dashboard
            </button>
          </form>

          <p className="text-[11px] text-slate-500">
            Default pass: <code className="text-slate-300 font-mono">imaco-admin-2026</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2D4A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase">
              Authenticated Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Imaco Academy Control Center
          </h1>
          <p className="text-xs text-slate-400">
            Founders: Imran Mohammedbeyan (+251912251113) & Mikiyas Alemu (+251921799925)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadAllData()}
            className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            Refresh Data
          </button>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold hover:bg-red-500/20"
          >
            Lock Out
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] space-y-1">
          <p className="text-xs text-slate-400">Total Courses</p>
          <p className="text-2xl font-black text-white font-mono">{stats.coursesCount || courses.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] space-y-1">
          <p className="text-xs text-slate-400">Total Registrations</p>
          <p className="text-2xl font-black text-blue-400 font-mono">{stats.registrationsCount || registrations.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] space-y-1">
          <p className="text-xs text-slate-400">Internship Inquiries</p>
          <p className="text-2xl font-black text-amber-400 font-mono">{stats.applicationsCount || applications.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] space-y-1">
          <p className="text-xs text-slate-400">Pending Reviews</p>
          <p className="text-2xl font-black text-emerald-400 font-mono">
            {testimonials.filter((t) => t.status === 'PENDING').length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] space-y-1">
          <p className="text-xs text-slate-400">Issued Certificates</p>
          <p className="text-2xl font-black text-purple-400 font-mono">{stats.certificatesCount || certificates.length}</p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1E2D4A] pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'applications'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Internship Applications ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('registrations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'registrations'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registrations ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'courses'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Courses ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'testimonials'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquareQuote className="w-4 h-4" />
          <span>Testimonials Moderation ({testimonials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'certificates'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificates ({certificates.length})</span>
        </button>
      </div>

      {/* TAB 1: INTERNSHIP APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">2-Month Internship Candidate Queue</h2>
            <span className="text-xs text-slate-400">Remember: 5 Interns Accepted Per Cohort</span>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{app.fullName}</h3>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold">
                        {app.fieldOfInterest}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{app.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">Status:</span>
                    <select
                      value={app.status}
                      onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold focus:outline-none ${
                        app.status === 'ACCEPTED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : app.status === 'REVIEWED'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : app.status === 'REJECTED'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      <option value="NEW">NEW</option>
                      <option value="REVIEWED">REVIEWED</option>
                      <option value="ACCEPTED">ACCEPTED (Cohort Selected)</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p className="font-semibold text-slate-400 text-[11px]">Why Joining Pitch:</p>
                  <p className="italic">"{app.whyJoining}"</p>
                </div>

                {app.notes && (
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Notes:</strong> {app.notes}
                  </p>
                )}

                <div className="text-[10px] text-slate-500">
                  Applied on: {new Date(app.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COURSE REGISTRATIONS */}
      {activeTab === 'registrations' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-white">Student Enrollment Records</h2>
            <a
              href="/api/admin/registrations?format=csv"
              download
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export All Registrations (CSV)</span>
            </a>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#1E2D4A] bg-[#0D1527]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0F1D] text-slate-400 border-b border-[#1E2D4A]">
                <tr>
                  <th className="p-3.5 font-semibold">Student Name</th>
                  <th className="p-3.5 font-semibold">Email</th>
                  <th className="p-3.5 font-semibold">Phone</th>
                  <th className="p-3.5 font-semibold">Enrolled Course</th>
                  <th className="p-3.5 font-semibold">Enrolled At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2D4A]/60 text-slate-300">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-white">{reg.fullName}</td>
                    <td className="p-3.5 font-mono text-slate-400">{reg.email}</td>
                    <td className="p-3.5 font-mono">{reg.phone || 'N/A'}</td>
                    <td className="p-3.5 text-blue-400 font-medium">{reg.course?.title || reg.fieldOfInterest}</td>
                    <td className="p-3.5 text-slate-500">{new Date(reg.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COURSES MANAGER */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Course Catalog & Pricing Controls</h2>
            <button
              onClick={() => setShowCourseModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] space-y-3 relative flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                      {c.isPaid ? `${c.price} ${c.currency}` : 'Free'}
                    </span>
                    <span className="text-[11px] text-slate-400">{c.category}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">{c.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{c.shortDescription}</p>
                </div>

                <div className="pt-3 border-t border-[#1E2D4A] flex items-center justify-between text-xs">
                  <Link
                    href={`/courses/${c.slug}`}
                    target="_blank"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => handleDeleteCourse(c.slug)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TESTIMONIALS MODERATION */}
      {activeTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Review & Feedback Moderation Queue</h2>
            <span className="text-xs text-slate-400">Only APPROVED reviews appear on the live website.</span>
          </div>

          <div className="space-y-3">
            {testimonials.map((tItem) => (
              <div
                key={tItem.id}
                className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] shadow-xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">{tItem.fullName}</h3>
                    <p className="text-xs text-slate-400">{tItem.roleOrCourse} • {tItem.rating} Stars ({tItem.category})</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                      tItem.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : tItem.status === 'REJECTED'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {tItem.status}
                    </span>

                    <button
                      onClick={() => handleModerateTestimonial(tItem.id, 'APPROVED')}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>

                    <button
                      onClick={() => handleModerateTestimonial(tItem.id, 'REJECTED')}
                      className="px-3 py-1 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 text-xs font-semibold flex items-center gap-1 border border-red-500/30"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  "{tItem.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CERTIFICATE ISSUER */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Issued Credentials & Certificates</h2>
            <button
              onClick={() => setShowCertModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Certificate</span>
            </button>
          </div>

          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-[#0D1527] border border-[#1E2D4A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{cert.recipientName}</h3>
                    <span className="font-mono text-xs text-blue-400 font-bold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                      {cert.verificationCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{cert.courseTitle} • {cert.grade}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Issued on: {new Date(cert.completionDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Link
                    href={`/verify?code=${cert.verificationCode}`}
                    target="_blank"
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => generateCertificatePDF(cert)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE COURSE MODAL */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2D4A]">
              <h3 className="text-base font-bold text-white">Create New Course</h3>
              <button onClick={() => setShowCourseModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Next-Gen Prompt Engineering"
                  value={courseForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    setCourseForm({ ...courseForm, title, slug });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Slug</label>
                <input
                  type="text"
                  value={courseForm.slug}
                  onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Creative & Media">Creative & Media</option>
                    <option value="Design">Design</option>
                    <option value="Software & Tech">Software & Tech</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Level</label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Short Summary</label>
                <textarea
                  rows={2}
                  value={courseForm.shortDescription}
                  onChange={(e) => setCourseForm({ ...courseForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md mt-2"
              >
                Publish Course
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ISSUE CERTIFICATE MODAL */}
      {showCertModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#0D1527] border border-[#1E2D4A] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2D4A]">
              <h3 className="text-base font-bold text-white">Issue Official Certificate</h3>
              <button onClick={() => setShowCertModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="space-y-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Student Recipient Name</label>
                <input
                  type="text"
                  placeholder="e.g. Selamawit Tadesse"
                  value={certForm.recipientName}
                  onChange={(e) => setCertForm({ ...certForm, recipientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Course Title</label>
                <select
                  value={certForm.courseTitle}
                  onChange={(e) => setCertForm({ ...certForm, courseTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Honors / Grade</label>
                <input
                  type="text"
                  value={certForm.grade}
                  onChange={(e) => setCertForm({ ...certForm, grade: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-md mt-2"
              >
                Generate & Issue Certificate
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
