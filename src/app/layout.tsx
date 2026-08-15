import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Imaco Academy | Digital Marketing, AI Automation & Agency Internships in Ethiopia',
  description: 'Learn in-demand digital skills and transition directly into a 2-month agency internship with real client projects. Founded by Imran Mohammedbeyan and Mikiyas Alemu.',
  keywords: [
    'Imaco Academy',
    'Imaco Digital Agency',
    'Ethiopia Digital Marketing',
    'AI Automation Ethiopia',
    'Video Editing Addis Ababa',
    'Tech Internship Ethiopia',
    'Imran Mohammedbeyan',
    'Mikiyas Alemu'
  ],
  authors: [{ name: 'Imaco Academy' }],
  openGraph: {
    title: 'Imaco Academy | In-Demand Digital Skills & Agency Internships',
    description: 'Learn in-demand digital skills and transition directly into a 2-month agency internship with real client projects.',
    url: 'https://imacoacademy.com',
    siteName: 'Imaco Academy',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070B14] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
