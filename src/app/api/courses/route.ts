import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = { published: true };
    if (category && category !== 'All') {
      where.category = category;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        lessons: {
          select: {
            id: true,
            title: true,
            durationMinutes: true,
            isFreePreview: true,
            order: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({ success: true, courses });
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      shortDescription,
      fullDescription,
      category,
      level,
      format,
      thumbnail,
      instructorName,
      instructorRole,
      isPaid,
      price,
      currency,
      featured,
      durationHours,
      cohortStartDate,
      lessons,
    } = body;

    if (!title || !slug || !shortDescription) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, and short description are required' },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug: slug.toLowerCase().replace(/[\s_]+/g, '-'),
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        category: category || 'General',
        level: level || 'All Levels',
        format: format || 'cohort',
        thumbnail: thumbnail || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        instructorName: instructorName || 'Imran Mohammedbeyan',
        instructorRole: instructorRole || 'Co-Founder & Mentor',
        isPaid: Boolean(isPaid),
        price: Number(price) || 0.0,
        currency: currency || 'ETB',
        featured: Boolean(featured),
        durationHours: Number(durationHours) || 20,
        cohortStartDate: cohortStartDate || 'Upcoming Cohort',
        lessons: {
          create: Array.isArray(lessons)
            ? lessons.map((l: any, idx: number) => ({
                title: l.title || `Lesson ${idx + 1}`,
                description: l.description || '',
                order: idx + 1,
                videoUrl: l.videoUrl || '',
                videoType: l.videoType || 'youtube',
                durationMinutes: Number(l.durationMinutes) || 20,
                isFreePreview: Boolean(l.isFreePreview),
              }))
            : [],
        },
      },
    });

    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create course' },
      { status: 500 }
    );
  }
}
