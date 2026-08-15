import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const applications = await prisma.internshipApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch internship applications' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status, notes } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Application ID and status are required' },
        { status: 400 }
      );
    }

    const updated = await prisma.internshipApplication.update({
      where: { id },
      data: {
        status,
        notes: notes !== undefined ? notes : undefined,
      },
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update application status' },
      { status: 500 }
    );
  }
}
