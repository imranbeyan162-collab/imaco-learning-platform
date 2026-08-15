const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Imaco Academy database...');

  // 1. Clean existing records if any
  await prisma.lesson.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.internshipApplication.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.certificate.deleteMany({});

  // 2. Seed 6 Initial Courses with rich syllabus
  const coursesData = [
    {
      slug: 'digital-marketing',
      title: 'Digital Marketing Essentials & Agency Growth',
      shortDescription: 'Master modern digital advertising, Meta & Google Ads, local Ethiopian market targeting, and conversion funnels.',
      fullDescription: 'An intensive, practice-driven immersion into digital brand growth. Learn how top-tier agencies design high-converting campaigns, manage client budgets, structure Meta Ads Manager workflows, deploy Google Search & Performance Max ads, and run viral Ethiopian TikTok and Telegram growth engines. Graduates qualify to apply for the prestigious 2-month Imaco agency internship.',
      category: 'Marketing',
      level: 'Beginner to Intermediate',
      format: 'Cohort-based',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      instructorName: 'Imran Mohammedbeyan',
      instructorRole: 'Co-Founder & Growth Lead, Imaco',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isPaid: false,
      price: 0.0,
      currency: 'ETB',
      featured: true,
      durationHours: 32,
      cohortStartDate: 'October 1, 2026',
      lessons: [
        {
          title: 'Introduction to Modern Digital Marketing & the Ethiopian Market',
          description: 'Understanding consumer psychology, telebirr/CBE payment funnels, and high-growth digital channels in Addis Ababa and beyond.',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/nU-IIXBWlS4',
          videoType: 'youtube',
          durationMinutes: 25,
          isFreePreview: true,
        },
        {
          title: 'Meta Ads Architecture & Full-Funnel Targeting',
          description: 'Setting up Business Manager, Pixel events, Custom Audiences, Lookalikes, and Campaign Budget Optimization (CBO).',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/nU-IIXBWlS4',
          videoType: 'youtube',
          durationMinutes: 40,
          isFreePreview: true,
        },
        {
          title: 'High-Converting Ad Creative & Persuasive Copywriting',
          description: 'Formulas for crafting scroll-stopping hooks in English and Amharic that drive clicks and sales.',
          order: 3,
          videoUrl: 'https://www.youtube.com/embed/nU-IIXBWlS4',
          videoType: 'youtube',
          durationMinutes: 35,
          isFreePreview: false,
        },
        {
          title: 'Google Search & Performance Max Campaigns',
          description: 'Keyword intent research, bid strategies, and managing enterprise search engine marketing campaigns.',
          order: 4,
          videoUrl: 'https://www.youtube.com/embed/nU-IIXBWlS4',
          videoType: 'youtube',
          durationMinutes: 45,
          isFreePreview: false,
        },
        {
          title: 'Telegram & TikTok Viral Marketing Playbooks',
          description: 'Leveraging Ethiopia’s massive Telegram ecosystem and TikTok algorithm to generate organic brand momentum.',
          order: 5,
          videoUrl: 'https://www.youtube.com/embed/nU-IIXBWlS4',
          videoType: 'youtube',
          durationMinutes: 35,
          isFreePreview: false,
        },
        {
          title: 'Client Reporting, Analytics, and Agency Workflow',
          description: 'Building Looker Studio dashboards, ROAS tracking, and managing live brand accounts.',
          order: 6,
          videoUrl: 'https://www.youtube.com/embed/nU-IIXBWlS4',
          videoType: 'youtube',
          durationMinutes: 50,
          isFreePreview: false,
        }
      ]
    },
    {
      slug: 'ai-automation',
      title: 'AI Workflow Automation & Agentic Systems',
      shortDescription: 'Build autonomous AI agents, Make.com integrations, and LLM-powered business systems to automate operations.',
      fullDescription: 'Bridge modern AI models with enterprise workflow automation. Build production-grade agents that automate customer support, lead routing, content synthesis, document extraction, and CRM updates using Make.com, Zapier, LangChain concepts, and API connectors.',
      category: 'AI & Automation',
      level: 'Intermediate',
      format: 'Mixed',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
      instructorName: 'Mikiyas Alemu',
      instructorRole: 'Co-Founder & Head of Operations, Imaco',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      isPaid: false,
      price: 0.0,
      currency: 'ETB',
      featured: true,
      durationHours: 28,
      cohortStartDate: 'October 15, 2026',
      lessons: [
        {
          title: 'Foundations of AI Automation & Agency Workflow Mapping',
          description: 'Identifying high-leverage business bottlenecks and designing automated agent architectures.',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/jC4v5AS4RIM',
          videoType: 'youtube',
          durationMinutes: 30,
          isFreePreview: true,
        },
        {
          title: 'Connecting Webhooks & REST APIs with Make.com',
          description: 'Triggering real-time automated data pipelines between Telegram, Google Sheets, Airtable, and Slack.',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/jC4v5AS4RIM',
          videoType: 'youtube',
          durationMinutes: 45,
          isFreePreview: false,
        },
        {
          title: 'Building Autonomous AI Agents with OpenAI & Anthropic APIs',
          description: 'Function calling, tool integration, and structuring deterministic LLM output routines.',
          order: 3,
          videoUrl: 'https://www.youtube.com/embed/jC4v5AS4RIM',
          videoType: 'youtube',
          durationMinutes: 50,
          isFreePreview: false,
        },
        {
          title: 'Deploying Automated Client Onboarding & Lead Engines',
          description: 'Creating end-to-end autonomous customer acquisition workflows for service businesses.',
          order: 4,
          videoUrl: 'https://www.youtube.com/embed/jC4v5AS4RIM',
          videoType: 'youtube',
          durationMinutes: 40,
          isFreePreview: false,
        }
      ]
    },
    {
      slug: 'video-editing',
      title: 'High-Impact Video Editing & Motion Storytelling',
      shortDescription: 'Craft cinematic brand videos, viral short-form content, dynamic sound design, and color grading.',
      fullDescription: 'Transform raw footage into viral, client-ready commercial videos. Master Adobe Premiere Pro, CapCut Pro pacing, visual retention hooks, sound effect layering, and color grading that commands attention on TikTok, YouTube, and digital brand campaigns.',
      category: 'Creative & Media',
      level: 'All Levels',
      format: 'Self-paced',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      instructorName: 'Mikiyas Alemu',
      instructorRole: 'Creative Director & Co-Founder, Imaco',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      isPaid: false,
      price: 0.0,
      currency: 'ETB',
      featured: true,
      durationHours: 24,
      cohortStartDate: 'Self-Paced / Immediate',
      lessons: [
        {
          title: 'Visual Hook Theory & Viewer Retention Science',
          description: 'The first 3 seconds: crafting psychological hooks that prevent swiping.',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/2e6i5GjLrqE',
          videoType: 'youtube',
          durationMinutes: 25,
          isFreePreview: true,
        },
        {
          title: 'Fast-Paced Timeline Editing & Seamless Jump Cuts',
          description: 'Keyboard shortcut workflows, J-cuts, L-cuts, and rhythmic pacing.',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/2e6i5GjLrqE',
          videoType: 'youtube',
          durationMinutes: 40,
          isFreePreview: false,
        },
        {
          title: 'Sound Design: The Secret Weapon of High-Impact Video',
          description: 'Layering whooshes, risers, ambient textures, and voiceover ducking.',
          order: 3,
          videoUrl: 'https://www.youtube.com/embed/2e6i5GjLrqE',
          videoType: 'youtube',
          durationMinutes: 35,
          isFreePreview: false,
        },
        {
          title: 'Commercial Color Grading & Brand Film Polish',
          description: 'Color correction, LUT application, skin tone isolation, and cinematic look development.',
          order: 4,
          videoUrl: 'https://www.youtube.com/embed/2e6i5GjLrqE',
          videoType: 'youtube',
          durationMinutes: 45,
          isFreePreview: false,
        }
      ]
    },
    {
      slug: 'graphic-design',
      title: 'Brand Identity & Modern Graphic Design',
      shortDescription: 'Design world-class brand systems, vector iconography, Figma layouts, and typography for enterprise clients.',
      fullDescription: 'Go beyond basic templates and learn to build comprehensive visual design systems. Learn typography hierarchy, color psychology, vector logo craftsmanship, marketing collateral, packaging design, and client presentation decks in Figma, Illustrator, and Photoshop.',
      category: 'Design',
      level: 'Beginner',
      format: 'Cohort-based',
      thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      instructorName: 'Imran Mohammedbeyan',
      instructorRole: 'Brand Strategist & Co-Founder, Imaco',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isPaid: false,
      price: 0.0,
      currency: 'ETB',
      featured: true,
      durationHours: 30,
      cohortStartDate: 'November 1, 2026',
      lessons: [
        {
          title: 'Visual Identity Foundations & Design Token Systems',
          description: 'Core principles of balance, contrast, alignment, and modern branding systems.',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
          videoType: 'youtube',
          durationMinutes: 30,
          isFreePreview: true,
        },
        {
          title: 'Typography Mastery & Dual-Language (Ge’ez + Latin) Layouts',
          description: 'Pairing modern sans-serifs with clean Amharic typefaces for premium readability.',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
          videoType: 'youtube',
          durationMinutes: 40,
          isFreePreview: false,
        },
        {
          title: 'Vector Logo Craftsmanship in Figma & Illustrator',
          description: 'From pencil sketches to geometric vector grids and memorable brand marks.',
          order: 3,
          videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
          videoType: 'youtube',
          durationMinutes: 50,
          isFreePreview: false,
        },
        {
          title: 'Creating Brand Style Guides & Client Deliverable Kits',
          description: 'Documenting logo usage, color codes, print specifications, and social media templates.',
          order: 4,
          videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
          videoType: 'youtube',
          durationMinutes: 45,
          isFreePreview: false,
        }
      ]
    },
    {
      slug: 'python-programming',
      title: 'Python Programming for Automation & Web Backends',
      shortDescription: 'Master core Python, web scraping, REST APIs, and database engineering for real-world software applications.',
      fullDescription: 'From core syntax to production backend engineering. Learn data structures, asynchronous programming, web scraping with BeautifulSoup/Playwright, building fast REST APIs with FastAPI, and relational database management with SQLite and PostgreSQL.',
      category: 'Software & Tech',
      level: 'Beginner to Intermediate',
      format: 'Mixed',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      instructorName: 'Mikiyas Alemu',
      instructorRole: 'Technical Lead & Co-Founder, Imaco',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      isPaid: false,
      price: 0.0,
      currency: 'ETB',
      featured: true,
      durationHours: 36,
      cohortStartDate: 'November 15, 2026',
      lessons: [
        {
          title: 'Python Fundamentals, Data Types & Control Flow',
          description: 'Writing clean, idiomatic Python code from the ground up.',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
          videoType: 'youtube',
          durationMinutes: 40,
          isFreePreview: true,
        },
        {
          title: 'Automated Web Scraping & Data Extraction',
          description: 'Extracting market intelligence and pricing data from live web pages.',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
          videoType: 'youtube',
          durationMinutes: 50,
          isFreePreview: false,
        },
        {
          title: 'Building Modern REST APIs with FastAPI',
          description: 'Pydantic validation, routing, dependency injection, and interactive Swagger docs.',
          order: 3,
          videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
          videoType: 'youtube',
          durationMinutes: 55,
          isFreePreview: false,
        },
        {
          title: 'Database Persistence & Deploying Web Services',
          description: 'Connecting SQL databases, environment security, and deploying to cloud containers.',
          order: 4,
          videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
          videoType: 'youtube',
          durationMinutes: 45,
          isFreePreview: false,
        }
      ]
    },
    {
      slug: 'prompt-engineering',
      title: 'Advanced Prompt Engineering & LLM Solution Design',
      shortDescription: 'Engineer complex multi-modal prompt chains, structured JSON outputs, reasoning models, and RAG architectures.',
      fullDescription: 'Unlock the deepest capabilities of modern Frontier AI models (Gemini, Claude, GPT). Master system prompt architecture, few-shot demonstration design, Chain-of-Thought reasoning, structured schema enforcement, prompt security/jailbreak defense, and Retrieval-Augmented Generation (RAG) concepts.',
      category: 'AI & Automation',
      level: 'All Levels',
      format: 'Self-paced',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      instructorName: 'Imran Mohammedbeyan',
      instructorRole: 'AI Strategist & Co-Founder, Imaco',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isPaid: false,
      price: 0.0,
      currency: 'ETB',
      featured: true,
      durationHours: 20,
      cohortStartDate: 'Self-Paced / Immediate',
      lessons: [
        {
          title: 'Prompt Architecture & In-Context Learning Dynamics',
          description: 'How transformer context windows process tokens, attention, and instructions.',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/dOxUroR57WU',
          videoType: 'youtube',
          durationMinutes: 30,
          isFreePreview: true,
        },
        {
          title: 'Chain-of-Thought & Multi-Step Reasoning Decomposition',
          description: 'Guiding models through complex logic, calculations, and structured deductions.',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/dOxUroR57WU',
          videoType: 'youtube',
          durationMinutes: 40,
          isFreePreview: false,
        },
        {
          title: 'Schema Enforcement & Zero-Failure JSON Output Engineering',
          description: 'Ensuring 100% reliable programmatic parsing for backend application integrations.',
          order: 3,
          videoUrl: 'https://www.youtube.com/embed/dOxUroR57WU',
          videoType: 'youtube',
          durationMinutes: 45,
          isFreePreview: false,
        },
        {
          title: 'RAG Optimization & Production Evaluation Frameworks',
          description: 'Grounding LLMs with custom enterprise documents and measuring prompt accuracy.',
          order: 4,
          videoUrl: 'https://www.youtube.com/embed/dOxUroR57WU',
          videoType: 'youtube',
          durationMinutes: 50,
          isFreePreview: false,
        }
      ]
    }
  ];

  for (const c of coursesData) {
    const { lessons, ...courseInfo } = c;
    const course = await prisma.course.create({
      data: {
        ...courseInfo,
        lessons: {
          create: lessons
        }
      }
    });
    console.log(`Created course: ${course.title} (${course.slug}) with ${lessons.length} lessons`);
  }

  // 3. Seed Approved Testimonials
  const sampleTestimonials = [
    {
      fullName: 'Selamawit Tadesse',
      roleOrCourse: 'Digital Marketing Graduate',
      category: 'Internship',
      rating: 5,
      comment: 'Imaco Academy completely transformed my career. The 2-month unpaid agency internship gave me direct experience running real ad accounts in Addis Ababa. I was hired directly onto the Imaco agency team right after graduating!',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      status: 'APPROVED'
    },
    {
      fullName: 'Dawit Haile',
      roleOrCourse: 'AI Automation Track',
      category: 'Course',
      rating: 5,
      comment: 'The direct mentorship from Imran and Mikiyas is unlike any generic online tutorial. You learn how real agencies operate, automate workflows, and build systems that save hundreds of human hours.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      status: 'APPROVED'
    },
    {
      fullName: 'Bethelhem Kebede',
      roleOrCourse: 'Graphic Design Graduate',
      category: 'Agency',
      rating: 5,
      comment: 'The focus on brand identity systems and typography standard is international level. The portfolio I created during the course and internship allowed me to start signing high-paying corporate clients.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      status: 'APPROVED'
    },
    {
      fullName: 'Yared Bekele',
      roleOrCourse: 'Python Programming Graduate',
      category: 'Course',
      rating: 5,
      comment: 'Practical, concise, and focused on real building. I went from knowing basic syntax to deploying production FastAPI backends and web scrapers.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      status: 'APPROVED'
    }
  ];

  for (const t of sampleTestimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`Seeded ${sampleTestimonials.length} approved testimonials.`);

  // 4. Seed Verified Sample Certificate
  await prisma.certificate.create({
    data: {
      verificationCode: 'IMC-2026-001',
      recipientName: 'Selamawit Tadesse',
      courseTitle: 'Digital Marketing Essentials & Agency Growth',
      completionDate: new Date('2026-07-20T00:00:00Z'),
      issuerName: 'Imaco Academy',
      issuerTitle: 'Imran Mohammedbeyan & Mikiyas Alemu (Co-Founders)',
      grade: 'Distinction & Agency Honors'
    }
  });
  console.log('Seeded sample certificate: IMC-2026-001');

  // 5. Seed Sample Registration
  const firstCourse = await prisma.course.findFirst();
  if (firstCourse) {
    await prisma.registration.create({
      data: {
        courseId: firstCourse.id,
        fullName: 'Kidus Mengistu',
        email: 'kidus.mengistu@example.com',
        phone: '+251911445566',
        fieldOfInterest: 'Digital Marketing & Client Acquisition'
      }
    });
  }

  // 6. Seed Sample Internship Application
  await prisma.internshipApplication.create({
    data: {
      fullName: 'Almaz Worku',
      email: 'almaz.worku@example.com',
      fieldOfInterest: 'AI Automation',
      whyJoining: 'I want to build autonomous agency pipelines and gain real client experience inside Imaco before launching my own automation consultancy.',
      notes: 'Available for full-time commitment during the 2-month cohort.',
      status: 'NEW'
    }
  });

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
