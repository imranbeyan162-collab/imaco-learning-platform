import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().nullable(),
  courseId: z.string().min(1, 'Course is required'),
  fieldOfInterest: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: validated.courseId },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Selected course does not exist' },
        { status: 404 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        courseId: validated.courseId,
        fullName: validated.fullName.trim(),
        email: validated.email.trim().toLowerCase(),
        phone: validated.phone?.trim() || null,
        fieldOfInterest: validated.fieldOfInterest?.trim() || course.title,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully registered for course!',
        registration: {
          id: registration.id,
          fullName: registration.fullName,
          email: registration.email,
          courseTitle: course.title,
        },
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
