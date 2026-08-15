import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { completionDate: 'desc' },
    });
    return NextResponse.json({ success: true, certificates });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { recipientName, courseTitle, grade, issuerName, issuerTitle } = await request.json();

    if (!recipientName || !courseTitle) {
      return NextResponse.json(
        { success: false, error: 'Recipient name and course title are required' },
        { status: 400 }
      );
    }

    // Generate unique verification code e.g. IMC-2026-XXXX
    const count = await prisma.certificate.count();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const verificationCode = `IMC-2026-${String(count + 1).padStart(3, '0')}${randomSuffix}`;

    const certificate = await prisma.certificate.create({
      data: {
        verificationCode,
        recipientName: recipientName.trim(),
        courseTitle: courseTitle.trim(),
        grade: grade || 'Honors Distinction',
        issuerName: issuerName || 'Imaco Academy',
        issuerTitle: issuerTitle || 'Imran Mohammedbeyan & Mikiyas Alemu (Co-Founders)',
        completionDate: new Date(),
      },
    });

    return NextResponse.json({ success: true, certificate }, { status: 201 });
  } catch (error: any) {
    console.error('Error issuing certificate:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to issue certificate' },
      { status: 500 }
    );
  }
}
