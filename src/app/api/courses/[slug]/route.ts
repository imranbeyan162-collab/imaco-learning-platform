import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve course details' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const {
      title,
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
      published,
      durationHours,
      cohortStartDate,
    } = body;

    const updated = await prisma.course.update({
      where: { slug },
      data: {
        title,
        shortDescription,
        fullDescription,
        category,
        level,
        format,
        thumbnail,
        instructorName,
        instructorRole,
        isPaid: isPaid !== undefined ? Boolean(isPaid) : undefined,
        price: price !== undefined ? Number(price) : undefined,
        currency,
        featured: featured !== undefined ? Boolean(featured) : undefined,
        published: published !== undefined ? Boolean(published) : undefined,
        durationHours: durationHours !== undefined ? Number(durationHours) : undefined,
        cohortStartDate,
      },
    });

    return NextResponse.json({ success: true, course: updated });
  } catch (error: any) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await prisma.course.delete({
      where: { slug },
    });
    return NextResponse.json({ success: true, message: 'Course deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete course' },
      { status: 500 }
    );
  }
}
