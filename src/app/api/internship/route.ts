import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const internshipSchema = z.object({
  fullName: z.string().min(2, 'Full name is required (at least 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  fieldOfInterest: z.string().min(2, 'Please select your target field of interest'),
  whyJoining: z.string().min(10, 'Please write at least a brief explanation (10+ characters) of why you want to join'),
  notes: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = internshipSchema.parse(body);

    const application = await prisma.internshipApplication.create({
      data: {
        fullName: validated.fullName.trim(),
        email: validated.email.trim().toLowerCase(),
        fieldOfInterest: validated.fieldOfInterest.trim(),
        whyJoining: validated.whyJoining.trim(),
        notes: validated.notes?.trim() || null,
        status: 'NEW',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Internship application submitted successfully!',
        application: {
          id: application.id,
          fullName: application.fullName,
          field: application.fieldOfInterest,
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
    console.error('Internship application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}
