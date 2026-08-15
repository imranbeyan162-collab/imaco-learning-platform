import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code || !code.trim()) {
      return NextResponse.json(
        { success: false, error: 'Verification code is required' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const certificate = await prisma.certificate.findUnique({
      where: { verificationCode: cleanCode },
    });

    if (!certificate) {
      return NextResponse.json(
        { success: false, error: 'Certificate not found with provided code' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      certificate: {
        id: certificate.id,
        verificationCode: certificate.verificationCode,
        recipientName: certificate.recipientName,
        courseTitle: certificate.courseTitle,
        completionDate: certificate.completionDate.toISOString(),
        issuerName: certificate.issuerName,
        issuerTitle: certificate.issuerTitle,
        grade: certificate.grade,
      },
    });
  } catch (error: any) {
    console.error('Certificate verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while verifying certificate' },
      { status: 500 }
    );
  }
}
