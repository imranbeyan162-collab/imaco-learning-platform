import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [
      coursesCount,
      registrationsCount,
      applicationsCount,
      pendingApplicationsCount,
      pendingTestimonialsCount,
      certificatesCount,
    ] = await Promise.all([
      prisma.course.count(),
      prisma.registration.count(),
      prisma.internshipApplication.count(),
      prisma.internshipApplication.count({ where: { status: 'NEW' } }),
      prisma.testimonial.count({ where: { status: 'PENDING' } }),
      prisma.certificate.count(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        coursesCount,
        registrationsCount,
        applicationsCount,
        pendingApplicationsCount,
        pendingTestimonialsCount,
        certificatesCount,
      },
    });
  } catch (error: any) {
    console.error('Error loading admin stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
