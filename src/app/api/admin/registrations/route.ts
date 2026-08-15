import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    const registrations = await prisma.registration.findMany({
      include: {
        course: {
          select: { title: true, slug: true, category: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (format === 'csv') {
      const headers = 'ID,Full Name,Email,Phone,Course,Field of Interest,Registered At\n';
      const rows = registrations
        .map((r) => {
          const escapeCsv = (val: string | null) => `"${(val || '').replace(/"/g, '""')}"`;
          return [
            escapeCsv(r.id),
            escapeCsv(r.fullName),
            escapeCsv(r.email),
            escapeCsv(r.phone),
            escapeCsv(r.course?.title || ''),
            escapeCsv(r.fieldOfInterest),
            escapeCsv(r.createdAt.toISOString()),
          ].join(',');
        })
        .join('\n');

      return new NextResponse(headers + rows, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="imaco-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({ success: true, registrations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
