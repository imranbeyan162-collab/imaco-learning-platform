# Imaco Academy — Official Web Application

> **The Training and Talent Engine of Imaco Digital Agency**  
> Founded by **Imran Mohammedbeyan** (`+251 912 251 113`) & **Mikiyas Alemu** (`+251 921 799 925`) in Addis Ababa, Ethiopia.

---

## 🚀 Overview

Imaco Academy implements a sequential talent pipeline:
$$\text{Learn} \longrightarrow \text{Apply for Internship} \longrightarrow \text{Work on Real Projects} \longrightarrow \text{Certified \& Launched}$$

This application is built as a complete, data-driven, production-grade platform providing:
1. **Interactive Course Catalog & Player**: 6 starter courses seeded into SQLite/Postgres with embedded video previews (YouTube, Vimeo, Blob).
2. **Instant Student Registration**: Direct server-validated enrollment into courses.
3. **2-Month Agency Internship Funnel**: Capped at 5 interns per cohort with a streamlined 4-question application (no resume barrier).
4. **Moderated Community Feedback Wall**: Public review submission into an admin approval queue.
5. **PDF Certificate Generation & Public Verification**: Instant lookup by verification code (e.g. `IMC-2026-001`) with cryptographic validation and downloadable high-res PDF certificate.
6. **Multi-Language Internationalization (i18n)**: Three-language support across English, Amharic (`አማርኛ` in Ge'ez script), and Afaan Oromoo (`om`) with a persistent header language switcher.
7. **Role-Based Admin Control Center**: Manage courses, edit syllabus, transition internship applications (`NEW` → `REVIEWED` → `ACCEPTED` → `REJECTED`), export student registrations to CSV, moderate reviews, and issue certificates.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom agency design system tokens
- **ORM & Database**: Prisma ORM with SQLite for local dev & PostgreSQL compatibility (Neon / Vercel Postgres)
- **PDF Generation**: jsPDF client-side high-resolution certificate generator
- **Icons**: Lucide React
- **Validation**: Zod schema validation

---

## 📂 Project Structure

```
imaco-academy/
├── prisma/
│   ├── schema.prisma      # Normalized schema (Courses, Lessons, Registrations, Applications, Testimonials, Certificates)
│   ├── seed.js            # Initial catalog & demo certificate seeder
│   └── dev.db             # Local SQLite database
├── src/
│   ├── app/
│   │   ├── page.tsx               # Home Page (Hero, Talent Pipeline, Featured Courses, Founders, Testimonials)
│   │   ├── about/page.tsx         # About Page (Imaco Story, Why Ethiopia, Founders Bios & Direct Hotlines)
│   │   ├── courses/
│   │   │   ├── page.tsx           # Course Catalog with category, search & level filters
│   │   │   └── [slug]/page.tsx    # Single Course Detail, Syllabus Accordion & Embedded Video Player
│   │   ├── register/page.tsx      # Course Registration Form
│   │   ├── internship/page.tsx    # 2-Month Agency Internship Application
│   │   ├── feedback/page.tsx      # Public Feedback Wall & Review Submission Form
│   │   ├── verify/page.tsx        # Public Certificate Verification & PDF Download
│   │   ├── contact/page.tsx       # Contact Page with Direct Founder Lines
│   │   ├── admin/page.tsx         # Admin Dashboard (Password Protected)
│   │   ├── api/                   # REST API Endpoints (Courses, Register, Internship, Feedback, Verify, Admin)
│   │   ├── globals.css            # Agency Design System Tokens & Custom Utilities
│   │   └── layout.tsx             # Root Layout with LanguageProvider, Navbar & Footer
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   └── home/                  # Hero, PipelineStepper, FeaturedCourses, FoundersSection, TestimonialSection
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── i18n.tsx               # Client Language Context & Hook
│   │   └── pdf-generator.ts       # jsPDF Certificate Generator
│   └── locales/
│       ├── en.json                # English dictionary
│       ├── am.json                # Amharic (አማርኛ) dictionary
│       └── om.json                # Afaan Oromoo dictionary
├── .env.example
├── package.json
└── README.md
```

---

## ⚡ Getting Started (Local Development)

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database & Seed Starter Catalog
```bash
# Push schema to SQLite
npx prisma db push

# Seed 6 starter courses, approved reviews, and sample certificate IMC-2026-001
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Dashboard Credentials

- **URL**: `http://localhost:3000/admin`
- **Default Password**: `imaco-admin-2026` *(Configurable via `ADMIN_PASSWORD` in `.env`)*

---

## 🌐 Production Deployment (Vercel)

1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Under **Project Settings → Environment Variables**, add:
   ```env
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   ADMIN_PASSWORD="your-strong-password"
   NEXT_PUBLIC_SITE_URL="https://imacoacademy.com"
   ```
4. Update `prisma/schema.prisma` datasource provider from `"sqlite"` to `"postgresql"` if deploying with Neon or Supabase:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Deploy! Vercel will run `npm run build` and launch the application seamlessly.

---

## 📈 Scalability & Monetization (Phases 2 & 3)

- **Phase 2 (Monetization-Ready)**: The `Course` model includes `isPaid`, `price`, and `currency` fields. The catalog badges and course cards dynamically render prices when toggled from the Admin dashboard.
- **Phase 3 (Scale-Readiness)**:
  - Additional languages can be added simply by dropping a new `.json` dictionary in `src/locales/`.
  - Media storage is decoupled to support both third-party video embeds (YouTube/Vimeo) and direct hosted object storage (Vercel Blob / AWS S3).
  - Clean modular API routes ready for Chapa / Telebirr payment gateway webhooks.
