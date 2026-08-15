import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const testimonialSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  roleOrCourse: z.string().min(2, 'Role or Course is required'),
  category: z.string().default('Course'),
  rating: z.number().int().min(1).max(5).default(5),
  comment: z.string().min(10, 'Review comment must be at least 10 characters'),
  avatarUrl: z.string().optional().nullable(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = { status: 'APPROVED' };
    if (category && category !== 'All') {
      where.category = category;
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = testimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: {
        fullName: validated.fullName.trim(),
        roleOrCourse: validated.roleOrCourse.trim(),
        category: validated.category,
        rating: validated.rating,
        comment: validated.comment.trim(),
        avatarUrl: validated.avatarUrl || null,
        status: 'PENDING', // default to pending for moderation
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Feedback submitted for review. It will appear publicly once approved.',
        testimonial: { id: testimonial.id },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }
    console.error('Testimonial submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback. Please try again.' },
      { status: 500 }
    );
  }
}
