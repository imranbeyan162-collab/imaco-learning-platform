import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || 'imaco-admin-2026';

    if (password === correctPassword) {
      return NextResponse.json({ success: true, token: 'imaco_admin_auth_valid' });
    }

    return NextResponse.json(
      { success: false, error: 'Incorrect administrator password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication request failed' },
      { status: 500 }
    );
  }
}
